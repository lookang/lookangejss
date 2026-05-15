"""
generate_narration_kokoro.py — Guards Riddle narration using Kokoro-ONNX
Fully offline, no API key, neural quality.

Requires:
  pip install kokoro-onnx soundfile
  Model files in the same folder as this script:
    kokoro-v1.0.onnx   (310 MB)
    voices-v1.0.bin    (27 MB)

Voices (American English): am_adam, am_echo, am_eric, am_fenrir,
  am_liam, am_michael, am_onyx, am_puck, am_santa
Voices (British English):  bf_alice, bf_emma, bm_daniel, bm_george

Run:    python generate_narration_kokoro.py
Output: narration_full.mp3  (in the same folder)
"""

import os
import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

SCRIPT_DIR  = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH  = os.path.join(SCRIPT_DIR, "kokoro-v1.0.onnx")
VOICES_PATH = os.path.join(SCRIPT_DIR, "voices-v1.0.bin")
OUT_WAV     = os.path.join(SCRIPT_DIR, "narration_kokoro.wav")
OUT_MP3     = os.path.join(SCRIPT_DIR, "narration_full.mp3")

VOICE   = "am_michael"   # clear, authoritative American male
SPEED   = 1.0            # 0.8 = slower, 1.2 = faster
LANG    = "en-us"

# ---------------------------------------------------------------------------
SECTIONS = [
    ("01_intro", """\
Welcome to the Guard's Riddle — an interactive puzzle that teaches one of the
most fundamental ideas in computer science: backtracking search.

In this video, we'll watch a computer solve this puzzle step by step,
from the simplest level all the way up to level eight. Along the way,
you'll see exactly how a computer thinks when it's tackling a problem
that has no obvious shortcut.\
"""),
    ("02_rules", """\
Here's how the puzzle works. The guards standing in the top row are
numbered by rank. Each rank appears exactly twice.

Your goal is to drag them into the yellow boxes at the bottom. But
there is one rule — two guards of the same rank must be placed exactly
that many boxes apart.

Rank one guards: one box apart.
Rank two guards: two boxes apart.
Rank three: three apart. And so on.

The instruction table shows a complete solution for n equals four:
four, one, one, three, four, two, three, two.
Check rank one: positions two and three — gap of one. Correct.
Check rank four: positions one and five — gap of four. Correct.
Every pair satisfies the rule.\
"""),
    ("03_n3", """\
Let's start with n equals three. Three pairs of guards, six boxes.

I'll click Auto-Solve. Watch the colour coding:
green boxes are being tested right now,
blue boxes are confirmed placements on the current path,
and pink means the computer just backtracked — it gave up on that choice.

Rank one locks in — green flash. Now rank two tries different
positions. Rank three needs to fit — it can't. Pink flash.
Backtrack, try the next option. Still can't fit rank three. Pink again.

After exhausting every possibility — no solution exists for n equals three.
The computer didn't just fail to find one; it mathematically proved
that none can exist.\
"""),
    ("04_n4", """\
Level four. Eight boxes, four ranks.

Watch rank one snap in — blue. Rank two tries its first option —
works so far. Rank three — rank four is searching —

There! The board reads four, one, one, three, four, two, three, two.
All boxes light up gold. The dialog confirms: solution found.

Notice the tries and backtracks counters. The computer explored only
a small fraction of all possible arrangements before succeeding.
That's the power of backtracking — it abandons dead ends early.
For eight positions, brute force would require checking over
forty thousand combinations. Backtracking finds it in far fewer steps.\
"""),
    ("05_n5", """\
Level five — ten boxes, five ranks. A bigger search space.

Notice how much more backtracking happens now. The computer places
the first few ranks confidently, then hits a wall fitting the next
rank, and has to unwind its choices — sometimes several levels back.
Each pink flash is the computer saying: this path leads nowhere,
I'll try something else.

The solution: two, three, two, five, three, four, one, one, five, four.
Rank five at positions four and nine — gap of five. Verified.\
"""),
    ("06_n6_n7", """\
For n equals six — no solution. Watch the backtrack counter climb
much higher than before. The search space is larger, the computer
works harder, but the answer is the same: no valid arrangement exists.

For n equals seven — no solution again. An even larger search, even
more backtracks. The computer proves impossibility by exhaustively
checking every branch of the decision tree.

Here's a pattern worth noticing: solutions at three through eight
only appear at n equals four, five, and eight.
What do those numbers have in common? Pause the video and think
before we reveal it.\
"""),
    ("07_n8", """\
Level eight — sixteen boxes, the most complex level in this puzzle.
I'll run this at high speed so we can see the full process.

Watch the step counter. Hundreds of steps — green, blue, pink, green
again. The solver is navigating a tree of decisions, pruning branches
that can't possibly lead anywhere useful.

And — solution found! Look at the backtrack count compared to level four.
The search was far more expensive, showing how computational cost
grows with problem size.

The full arrangement: one, one, two, eight, two, three, seven,
five, three, six, four, five, eight, four, seven, six.\
"""),
    ("08_conclusion", """\
The solutions appear at n equals four, five, and eight — all leave
remainder zero or three when divided by four.

Backtracking is the same core algorithm that powers Sudoku solvers,
chess engines, and constraint-satisfaction problems across computer science.

Now it's your turn — use One Step to explore each decision by hand,
or try dragging the guards yourself. Can you solve level eight
before the computer does? Good luck!\
"""),
]

# ---------------------------------------------------------------------------

def synthesize_all():
    print(f"\nLoading Kokoro model …")
    kokoro = Kokoro(MODEL_PATH, VOICES_PATH)
    print(f"Voice: {VOICE}  |  Speed: {SPEED}  |  Lang: {LANG}")
    print("=" * 60)

    chunks = []
    sample_rate = None

    for sid, text in SECTIONS:
        print(f"  Synthesizing {sid} …", end="", flush=True)
        samples, sr = kokoro.create(text, voice=VOICE, speed=SPEED, lang=LANG)
        chunks.append(samples)
        sample_rate = sr
        print(f" {len(samples)/sr:.1f}s")

    # 0.5-second silence between sections
    silence = np.zeros(int(sample_rate * 0.5), dtype=np.float32)
    combined = np.concatenate([x for chunk in chunks for x in (chunk, silence)])

    print("\nSaving WAV: " + OUT_WAV)
    sf.write(OUT_WAV, combined, sample_rate)
    total = len(combined) / sample_rate
    print(f"Total duration: {int(total//60)}:{int(total%60):02d}")

    # Convert to MP3 with ffmpeg if available
    try:
        import subprocess
        result = subprocess.run(
            ["ffmpeg", "-y", "-i", OUT_WAV, "-codec:a", "libmp3lame", "-q:a", "3", OUT_MP3],
            capture_output=True, text=True
        )
        if result.returncode == 0:
            mp3_size = os.path.getsize(OUT_MP3) / 1024
            print(f"MP3 saved: {OUT_MP3}  ({mp3_size:.0f} KB)")
        else:
            print("ffmpeg not found - WAV saved, convert manually if needed.")
    except FileNotFoundError:
        print("ffmpeg not found - WAV saved. Convert with: ffmpeg -i narration_kokoro.wav narration_full.mp3")

    print("\nDone! Use narration_full.mp3 for the video recording.")


if __name__ == "__main__":
    synthesize_all()
