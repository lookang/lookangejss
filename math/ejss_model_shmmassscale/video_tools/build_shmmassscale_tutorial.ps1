param(
  [ValidateSet('edge', 'kokoro', 'sapi')]
  [string]$TtsEngine = 'kokoro',
  [string]$KokoroVoice = 'af_bella',
  [double]$KokoroSpeed = 0.95
)

$ErrorActionPreference = 'Stop'

$simDir = Split-Path -Parent $PSScriptRoot
$outputDir = Join-Path $simDir 'video_output'
$screensDir = Join-Path $outputDir 'screens'
$audioDir = Join-Path $outputDir 'audio'
$textDir = Join-Path $outputDir 'text'
$sceneDir = Join-Path $outputDir 'scene_clips'
$manifestPath = Join-Path $outputDir 'scene_manifest.json'
$captureScript = Join-Path $PSScriptRoot 'capture_shmmassscale_tutorial.js'
$kokoroScript = 'C:\Users\weelo\.codex\skills\kokoro-narration\scripts\kokoro_narrate.py'
$edgeVoice = 'en-US-AndrewMultilingualNeural'
$edgeRate = '-5%'

switch ($TtsEngine) {
  'kokoro' { $finalVideo = Join-Path $simDir 'shmmassscale_tutorial_hd_1280x720_kokoro.mp4' }
  'sapi' { $finalVideo = Join-Path $simDir 'shmmassscale_tutorial_hd_1280x720.mp4' }
  default { $finalVideo = Join-Path $simDir 'shmmassscale_tutorial_hd_1280x720_neural.mp4' }
}

if ($TtsEngine -eq 'edge') {
  try {
    & python -c "import edge_tts" | Out-Null
    if ($LASTEXITCODE -ne 0) {
      throw 'edge-tts is not available'
    }
  } catch {
    throw 'TtsEngine=edge was requested, but edge-tts is not installed.'
  }
}

if ($TtsEngine -eq 'kokoro' -and -not (Test-Path $kokoroScript)) {
  throw "Kokoro narration script not found: $kokoroScript"
}

New-Item -ItemType Directory -Force -Path $outputDir, $screensDir, $audioDir, $textDir, $sceneDir | Out-Null

Write-Host 'Capturing tutorial screenshots from the live sim...'
npx -p playwright node $captureScript

if (-not (Test-Path $manifestPath)) {
  throw "Scene manifest was not created: $manifestPath"
}

Add-Type -AssemblyName System.Speech
$synth = $null
if ($TtsEngine -eq 'sapi') {
  $synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
  $synth.SelectVoice('Microsoft Zira Desktop')
  $synth.Rate = -1
  $synth.Volume = 100
}

function Convert-ToFfmpegPath([string]$path) {
  return (($path -replace '\\', '/') -replace ':', '\:')
}

function Get-AudioDuration([string]$path) {
  $duration = & ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 $path
  return [double]::Parse($duration, [System.Globalization.CultureInfo]::InvariantCulture)
}

function Invoke-Ffmpeg([string[]]$arguments) {
  & ffmpeg @arguments
  if ($LASTEXITCODE -ne 0) {
    throw "ffmpeg failed with exit code $LASTEXITCODE"
  }
}

$manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json
$clipPaths = @()

foreach ($scene in $manifest) {
  $audioExt = if ($TtsEngine -eq 'edge') { '.mp3' } else { '.wav' }
  $audioPath = Join-Path $audioDir ($scene.slug + $audioExt)
  $narrationPath = Join-Path $textDir ($scene.slug + '_narration.txt')
  $titlePath = Join-Path $textDir ($scene.slug + '_title.txt')
  $subtitlePath = Join-Path $textDir ($scene.slug + '_subtitle.txt')
  $clipPath = Join-Path $sceneDir ($scene.slug + '.mp4')

  [System.IO.File]::WriteAllText($narrationPath, $scene.narration, [System.Text.Encoding]::UTF8)
  [System.IO.File]::WriteAllText($titlePath, $scene.title, [System.Text.Encoding]::UTF8)
  [System.IO.File]::WriteAllText($subtitlePath, $scene.subtitle, [System.Text.Encoding]::UTF8)

  Write-Host "Generating narration for $($scene.slug)..."
  if ($TtsEngine -eq 'edge') {
    & python -m edge_tts --voice $edgeVoice "--rate=$edgeRate" --text $scene.narration --write-media $audioPath
    if ($LASTEXITCODE -ne 0) {
      throw "edge-tts failed for $($scene.slug)"
    }
  } elseif ($TtsEngine -eq 'kokoro') {
    & python $kokoroScript --input-file $narrationPath --voice $KokoroVoice --speed $KokoroSpeed --output $audioPath
    if ($LASTEXITCODE -ne 0) {
      throw "Kokoro narration failed for $($scene.slug)"
    }
  } else {
    $synth.SetOutputToWaveFile($audioPath)
    $synth.Speak($scene.narration)
    $synth.SetOutputToNull()
  }

  $audioDuration = Get-AudioDuration $audioPath
  $sceneDuration = [Math]::Round($audioDuration + 0.5, 3)
  $fadeOutStart = [Math]::Max(0.1, $sceneDuration - 0.3)
  $fadeOutStartText = $fadeOutStart.ToString([System.Globalization.CultureInfo]::InvariantCulture)

  $titlePathFf = Convert-ToFfmpegPath $titlePath
  $subtitlePathFf = Convert-ToFfmpegPath $subtitlePath
  $fontTitle = Convert-ToFfmpegPath 'C:\Windows\Fonts\georgiab.ttf'
  $fontBody = Convert-ToFfmpegPath 'C:\Windows\Fonts\georgia.ttf'

  $filter = @(
    "[0:v]scale=1280:720:force_original_aspect_ratio=decrease"
    "pad=1280:720:(ow-iw)/2:(oh-ih)/2:color=0xf3efe6"
    "drawbox=x=0:y=540:w=1280:h=180:color=0xf3efe6@0.94:t=fill"
    "drawtext=fontfile='$fontTitle':textfile='$titlePathFf':x=56:y=566:fontsize=36:fontcolor=0x181818"
    "drawtext=fontfile='$fontBody':textfile='$subtitlePathFf':x=56:y=620:fontsize=24:fontcolor=0x303030"
    "fade=t=in:st=0:d=0.25"
    "fade=t=out:st=$($fadeOutStartText):d=0.25[v]"
  ) -join ','

  $audioFilter = "[1:a]adelay=180|180,apad[a]"

  Write-Host "Rendering clip for $($scene.slug)..."
  Invoke-Ffmpeg @(
    '-y',
    '-loop', '1',
    '-i', $scene.image,
    '-i', $audioPath,
    '-filter_complex', "$filter;$audioFilter",
    '-map', '[v]',
    '-map', '[a]',
    '-t', $sceneDuration.ToString([System.Globalization.CultureInfo]::InvariantCulture),
    '-r', '30',
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-profile:v', 'high',
    '-movflags', '+faststart',
    '-c:a', 'aac',
    '-b:a', '192k',
    $clipPath
  )

  $clipPaths += $clipPath
}

if ($synth) {
  $synth.Dispose()
}

$concatPath = Join-Path $outputDir 'concat.txt'
$concatLines = $clipPaths | ForEach-Object { "file '$($_ -replace '''','''''')'" }
[System.IO.File]::WriteAllLines($concatPath, $concatLines, [System.Text.Encoding]::ASCII)

Write-Host 'Concatenating final video...'
Invoke-Ffmpeg @(
  '-y',
  '-f', 'concat',
  '-safe', '0',
  '-i', $concatPath,
  '-c', 'copy',
  $finalVideo
)

Write-Host "Built tutorial video: $finalVideo"
