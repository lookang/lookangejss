param(
  [string]$KokoroVoice = 'af_bella',
  [double]$KokoroSpeed = 0.92,
  [switch]$ReuseExistingRecording
)

$ErrorActionPreference = 'Stop'

$simDir = Split-Path -Parent $PSScriptRoot
$outputDir = Join-Path $simDir 'video_output_live'
$rawDir = Join-Path $outputDir 'raw'
$audioDir = Join-Path $outputDir 'audio'
$textDir = Join-Path $outputDir 'text'
$recordScript = Join-Path $PSScriptRoot 'record_shmmassscale_live_tutorial.js'
$kokoroScript = 'C:\Users\weelo\.codex\skills\kokoro-narration\scripts\kokoro_narrate.py'
$rawVideo = Join-Path $rawDir 'shmmassscale_live_recording.webm'
$narrationPath = Join-Path $audioDir 'shmmassscale_student_lesson.wav'
$narrationTextPath = Join-Path $textDir 'shmmassscale_student_lesson.txt'
$finalVideo = Join-Path $simDir 'shmmassscale_tutorial_hd_1920x1080_kokoro_live.mp4'

if (-not (Test-Path $kokoroScript)) {
  throw "Kokoro narration script not found: $kokoroScript"
}

New-Item -ItemType Directory -Force -Path $outputDir, $rawDir, $audioDir, $textDir | Out-Null

$narration = @'
Welcome to this guided lesson on how to use the mass scale interactive in a calm and productive way.

If you are using this for the first time, begin with the one kilogram scale and keep the answer in grams. That is the easiest place to start because the divisions are regular, the numbers are familiar, and the child can focus on understanding the pointer rather than switching between too many ideas at once.

Before answering, let the eyes go to the pointer first. The pointer is the most important clue on the screen. We want to notice where it lands, which labelled numbers it sits between, and whether it is a little past a mark or exactly on a mark.

Now watch one reading settle. When the motion has stopped, it is often helpful to switch to still mode. Still mode lowers cognitive load because the child no longer has to track a moving pointer. Instead, the student can study one fixed position and think carefully.

Once the pointer is still, ask three simple questions. First, what is the full scale range? Second, what is one small division worth? Third, what reading does the pointer show? On the one kilogram face, each small division is worth twenty grams. That means students can count in equal steps from one labelled value to the next.

If the learner is ready, the answer can be entered directly. The interactive supports both the answer menu and a typed answer. I like to use the typed answer later, after the child already understands the reading process, because typing encourages independent recall instead of recognition from a list.

Hints are most useful when they are used sparingly. Try to answer before pressing the hint button. Then use the first hint to check the scale range and the unit. Use the second hint to work out the value of each small division. In this way, the hint supports thinking instead of replacing thinking.

It is also important to compare grams and kilograms. The mass does not change. Only the way we write the number changes. For example, one hundred forty grams is the same mass as zero point one four kilograms. This helps students connect place value with measurement in a meaningful context.

Replay is a very helpful teaching button. If a child says, I want to see that again, replay shows the same reading without changing the problem. That gives the student another chance to observe the motion, notice the final position, and explain the answer more clearly. Reset has a different purpose. Reset keeps the same scale face but generates a fresh reading, so it is useful for repeated practice at the same difficulty level.

When students are comfortable with the one kilogram scale, move to the four kilogram scale. On this face, each small division is worth fifty grams, or zero point zero five kilograms. The child should pause and say that division value aloud before counting. That short spoken routine strengthens the connection between the marks and the quantity they represent.

Next, try the five kilogram scale. Here each small division is worth one hundred grams, or zero point one kilograms. Again, the best habit is not to rush to the answer. First identify the range. Then identify the division value. Then count carefully to the pointer.

The object examples add a useful estimation step. With something like an apple, ask the student to guess the mass before looking for the exact answer. Estimation makes the activity feel more real, and it helps the child judge whether a final reading is sensible.

A productive classroom or home routine can be very simple. Choose one scale face. Read in grams first. Let the student attempt the answer. Use hints only when needed. Replay the same reading if more discussion is useful. Then press reset for a new question on the same face. After a few successful questions, change the scale face or switch from grams to kilograms.

So the big strategy is this. Start simple. Freeze the reading when needed. Work out the value of each small division. Count carefully to the pointer. Write the correct unit. Then use replay and reset for more practice. If students follow that routine, this interactive becomes much more than a guessing activity. It becomes a tool for building confident, explainable scale reading.

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

Write-Host 'Generating Kokoro narration...'
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

Write-Host 'Rendering the narrated HD MP4...'
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
