# generate_narration_sapi.ps1
# Windows built-in SAPI TTS fallback (no Python required).
# Quality is lower than edge-tts but works offline with zero setup.
#
# Usage:  Right-click → "Run with PowerShell"   (or: powershell -File generate_narration_sapi.ps1)
# Output: narration_full.wav  (in the same folder as this script)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$outFile   = Join-Path $scriptDir "narration_full.wav"

$narration = @"
Welcome to the Guard's Riddle — an interactive puzzle that teaches one of the
most fundamental ideas in computer science: backtracking search.

In this video, we'll watch a computer solve this puzzle step by step,
from the simplest level all the way up to level eight. Along the way,
you'll see exactly how a computer thinks when it's tackling a problem
that has no obvious shortcut.

Here's how the puzzle works. The guards standing in the top row are
numbered by rank. Each rank appears exactly twice.

Your goal is to drag them into the yellow boxes at the bottom. But
there is one rule — two guards of the same rank must be placed exactly
that many boxes apart.

Rank one guards: one box apart.
Rank two guards: two boxes apart.
Rank three: three apart. And so on.

The instruction table here shows a complete solution for n equals four:
four, one, one, three, four, two, three, two.
Check rank one: positions two and three — gap of one. Correct.
Check rank four: positions one and five — gap of four. Correct.
Every pair satisfies the rule.

Let's start with n equals three. Three pairs of guards, six boxes.

I'll click Auto-Solve. Watch the colour coding:
green boxes are being tested right now,
blue boxes are confirmed placements on the current path,
and pink means the computer just backtracked — it gave up on that choice.

Rank one locks in — green flash. Now rank two tries different
positions. Rank three needs to fit... it can't. Pink flash.
Backtrack, try the next option. Still can't fit rank three. Pink again.

After exhausting every possibility — no solution exists for n equals three.
The computer didn't just fail to find one; it mathematically proved
that none can exist.

Level four. Eight boxes, four ranks.

Watch rank one snap in — blue. Rank two tries its first option...
works so far. Rank three... rank four is searching...

There! The board reads four, one, one, three, four, two, three, two.
All boxes light up gold. The dialog confirms: solution found.

Notice the tries and backtracks counters. The computer explored only
a small fraction of all possible arrangements before succeeding.
That's the power of backtracking — it abandons dead ends early.
For eight positions, brute force would require checking over
forty thousand combinations. Backtracking finds it in far fewer steps.

Level five — ten boxes, five ranks. A bigger search space.

Notice how much more backtracking happens now. The computer places
the first few ranks confidently, then hits a wall fitting the next
rank, and has to unwind its choices — sometimes several levels back.
Each pink flash is the computer saying: this path leads nowhere,
I'll try something else.

The solution: two, three, two, five, three, four, one, one, five, four.
Rank five at positions four and nine — gap of five. Verified.

For n equals six — no solution. Watch the backtrack counter climb
much higher than before. The search space is larger, the computer
works harder, but the answer is the same: no valid arrangement exists.

For n equals seven — no solution again. An even larger search, even
more backtracks. The computer proves impossibility by exhaustively
checking every branch of the decision tree.

Here's a pattern worth noticing: solutions at three through eight
only appear at n equals four, five, and eight.
What do those numbers have in common? Pause the video and think
before we reveal it.

Level eight — sixteen boxes, the most complex level in this puzzle.
I'll run this at high speed so we can see the full process.

Watch the step counter. Hundreds of steps — green, blue, pink, green
again. The solver is navigating a tree of decisions, pruning branches
that can't possibly lead anywhere useful.

And — solution found! Look at the backtrack count compared to level four.
The search was far more expensive, showing how computational cost
grows with problem size.

The full arrangement: one, one, two, eight, two, three, seven,
five, three, six, four, five, eight, four, seven, six.

The solutions appear at n equals four, five, and eight — all leave
remainder zero or three when divided by four.

Backtracking is the same core algorithm that powers Sudoku solvers,
chess engines, and constraint-satisfaction problems across computer science.

Now it's your turn — use One Step to explore each decision by hand,
or try dragging the guards yourself. Can you solve level eight
before the computer does? Good luck!
"@

Write-Host ""
Write-Host "Generating narration with Windows SAPI TTS ..."
Write-Host "Output: $outFile"
Write-Host ""

Add-Type -AssemblyName System.Speech
$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer

# List available voices so user can pick
Write-Host "Available voices on this system:"
$synth.GetInstalledVoices() | ForEach-Object {
    $info = $_.VoiceInfo
    Write-Host "  $($info.Name)  [$($info.Gender), $($info.Culture)]"
}
Write-Host ""

# Pick the best available English voice
$preferredVoices = @(
    "Microsoft David Desktop",
    "Microsoft Mark",
    "Microsoft Zira Desktop",
    "Microsoft George",
    "Microsoft Hazel"
)
$chosenVoice = $null
foreach ($pv in $preferredVoices) {
    $match = $synth.GetInstalledVoices() | Where-Object { $_.VoiceInfo.Name -like "*$pv*" }
    if ($match) { $chosenVoice = $match[0].VoiceInfo.Name; break }
}
if (-not $chosenVoice) {
    # fall back to first English voice
    $engVoice = $synth.GetInstalledVoices() | Where-Object { $_.VoiceInfo.Culture -like "en-*" } | Select-Object -First 1
    if ($engVoice) { $chosenVoice = $engVoice.VoiceInfo.Name }
}
if ($chosenVoice) {
    $synth.SelectVoice($chosenVoice)
    Write-Host "Selected voice: $chosenVoice"
}

$synth.Rate   = 1      # -10 (slowest) to 10 (fastest); 0 is normal; 1 is slightly faster
$synth.Volume = 100

$synth.SetOutputToWaveFile($outFile)
$synth.Speak($narration)
$synth.SetOutputToDefaultAudioDevice()
$synth.Dispose()

Write-Host ""
Write-Host "Done!  Saved to: $outFile"
Write-Host ""
Write-Host "Note: SAPI voice quality is lower than edge-tts."
Write-Host "For neural TTS quality, install Python and run:"
Write-Host "  pip install edge-tts"
Write-Host "  python generate_narration.py"
Write-Host ""
