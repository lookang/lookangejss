param(
  [string]$KokoroVoice = 'am_michael',
  [double]$KokoroSpeed = 0.88,
  [switch]$ReuseExistingRecording
)

$ErrorActionPreference = 'Stop'

$simDir = Split-Path -Parent $PSScriptRoot
$outputDir = Join-Path $simDir 'video_output_live'
$rawDir = Join-Path $outputDir 'raw'
$audioDir = Join-Path $outputDir 'audio'
$textDir = Join-Path $outputDir 'text'
$recordScript = Join-Path $PSScriptRoot 'record_archimedes_live_tutorial.js'
$kokoroScript = 'C:\Users\weelo\.codex\skills\kokoro-narration\scripts\kokoro_narrate.py'
$rawVideo = Join-Path $rawDir 'archimedes_live_recording.webm'
$narrationPath = Join-Path $audioDir 'archimedes_lesson_male.wav'
$narrationTextPath = Join-Path $textDir 'archimedes_lesson_male.txt'
$finalVideo = Join-Path $simDir 'archimedes_tutorial_hd_1920x1080_kokoro_live.mp4'

if (-not (Test-Path $kokoroScript)) {
  throw "Kokoro narration script not found: $kokoroScript"
}

New-Item -ItemType Directory -Force -Path $outputDir, $rawDir, $audioDir, $textDir | Out-Null

$narration = @'
Welcome to this short guided lesson on how to use the Archimedes interactive.

This model is helpful because it connects three things at the same time. The motion of the cube, the force arrows, and the changing scale readings.

Start with the controls at the top. The first slider changes the density of the solution. The second changes cube volume. The third changes cube mass. Since density is mass divided by volume, the last two sliders also change cube density.

Now turn on show weight and show upthrust. These arrows help students see why the cube rises, sinks, or stays suspended. Teacher mode gives short explanations at key moments. Equation mode shows the comparison panel, so it is a good idea to leave both on while learning.

Let us begin with the default case. The solution density is one point zero grams per cubic centimetre. The cube mass is eight hundred grams and the volume is one thousand cubic centimetres, so the cube density is zero point eight. Because the solution is denser than the cube, the cube floats. As it settles, the upthrust increases until it balances the weight.

Now lower the solution density to zero point six. Here the fluid is less dense than the cube, so the buoyant force is weaker. The cube sinks deeper, becomes fully immersed, and finally rests on the lower scale. This is the case where students can clearly see how the lower scale reading grows while the spring scale loses load.

Next, make the equal density case. Keep the solution at one point zero and move the cube mass to one thousand grams while the volume stays at one thousand cubic centimetres. Now the cube density also becomes one point zero. The cube reaches neutral buoyancy. It does not float high and it does not sink to the bottom. It stays suspended because upthrust equals weight.

Finally, raise the solution density to two point zero. Now the fluid is much denser than the cube, so a strong upthrust builds quickly. The cube reaches a higher floating position faster than before.

The best habit with this interactive is simple. First compare solution density with cube density. Then watch the arrows during motion. After that, read the teacher note and the equation panel together.

If this lesson helped you, please subscribe and leave a comment below. I read the comments, and I will do my best to answer them like a real teacher.
'@

[System.IO.File]::WriteAllText($narrationTextPath, $narration, [System.Text.Encoding]::UTF8)

if ($ReuseExistingRecording -and (Test-Path $rawVideo)) {
  Write-Host "Reusing existing raw recording: $rawVideo"
}
else {
  Write-Host 'Recording a continuous live walkthrough from the sim...'
  npx -p playwright node $recordScript
  if ($LASTEXITCODE -ne 0) {
    throw "Live recording failed with exit code $LASTEXITCODE"
  }
}

if (-not (Test-Path $rawVideo)) {
  throw "Raw live recording not found: $rawVideo"
}

Write-Host "Generating Kokoro narration with voice $KokoroVoice..."
& python $kokoroScript --input-file $narrationTextPath --voice $KokoroVoice --speed $KokoroSpeed --output $narrationPath
if ($LASTEXITCODE -ne 0) {
  throw "Kokoro narration failed with exit code $LASTEXITCODE"
}

function Get-MediaDuration([string]$path) {
  $duration = & ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 $path
  return [double]::Parse($duration, [System.Globalization.CultureInfo]::InvariantCulture)
}

function Invoke-Ffmpeg([string[]]$arguments) {
  & ffmpeg @arguments
  if ($LASTEXITCODE -ne 0) {
    throw "ffmpeg failed with exit code $LASTEXITCODE"
  }
}

$videoDuration = Get-MediaDuration $rawVideo
$audioDuration = Get-MediaDuration $narrationPath
$padDuration = [Math]::Max(0.0, $audioDuration - $videoDuration + 0.5)
$padDurationText = $padDuration.ToString([System.Globalization.CultureInfo]::InvariantCulture)

$filterParts = @()
$videoMap = '0:v'

if ($padDuration -gt 0.01) {
  $filterParts += "[0:v]tpad=stop_mode=clone:stop_duration=$padDurationText[vpad]"
  $videoMap = '[vpad]'
}

$filterParts += '[1:a]apad[aout]'
$filterGraph = $filterParts -join ';'

Write-Host 'Rendering the narrated 1920x1080 MP4...'
Invoke-Ffmpeg @(
  '-y',
  '-i', $rawVideo,
  '-i', $narrationPath,
  '-filter_complex', $filterGraph,
  '-map', $videoMap,
  '-map', '[aout]',
  '-shortest',
  '-c:v', 'libx264',
  '-preset', 'slow',
  '-crf', '18',
  '-pix_fmt', 'yuv420p',
  '-profile:v', 'high',
  '-movflags', '+faststart',
  '-c:a', 'aac',
  '-b:a', '192k',
  $finalVideo
)

Write-Host "Built live tutorial video: $finalVideo"
