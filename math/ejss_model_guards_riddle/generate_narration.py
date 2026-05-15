"""
generate_narration.py — Guards Riddle video narration audio generator
Uses Microsoft Edge's free neural TTS via edge-tts (no API key required).

Install:  pip install edge-tts
Run:      python generate_narration.py
Output:   narration_full.mp3  (and optional per-section files)

Recommended voice: en-US-AndrewMultilingualNeural (clear, warm, authoritative)
Alternatives:      en-US-GuyNeural, en-US-DavisNeural, en-GB-RyanNeural
"""

import asyncio
import edge_tts
import os

VOICE = "en-US-AndrewMultilingualNeural"
RATE  = "+0%"   # adjust: "+10%" = faster, "-10%" = slower
PITCH = "+0Hz"  # adjust: "+5Hz" = slightly higher

# ---------------------------------------------------------------------------
# Narration sections — each maps to a video timestamp
# ---------------------------------------------------------------------------
SECTIONS = [
    {
        "id":    "01_intro",
        "label": "Section 1 — Introduction [0:00–0:30]",
        "text":  """\
Welcome to the Guard's Riddle — an interactive puzzle that teaches one of the
most fundamental ideas in computer science: backtracking search.

In this video, we'll watch a computer solve this puzzle step by step,
from the simplest level all the way up to level eight. Along the way,
you'll see exactly how a computer thinks when it's tackling a problem
that has no obvious shortcut.\
"""
    },
    {
        "id":    "02_how_it_works",
        "label": "Section 2 — How the puzzle works [0:30–1:15]",
        "text":  """\
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
Every pair satisfies the rule.\
"""
    },
    {
        "id":    "03_n3_no_solution",
        "label": "Section 3 — n=3: No solution [1:15–2:00]",
        "text":  """\
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
that none can exist.\
"""
    },
    {
        "id":    "04_n4_solution",
        "label": "Section 4 — n=4: First solution [2:00–2:45]",
        "text":  """\
Level four. Eight boxes, four ranks.

Watch rank one snap in — blue. Rank two tries its first option...
works so far. Rank three... rank four is searching...

There! The board reads four, one, one, three, four, two, three, two.
All boxes light up gold. The dialog confirms: solution found.

Notice the tries and backtracks counters. The computer explored only
a small fraction of all possible arrangements before succeeding.
That's the power of backtracking — it abandons dead ends early.
For eight positions, brute force would require checking over
forty thousand combinations. Backtracking finds it in far fewer steps.\
"""
    },
    {
        "id":    "05_n5_solution",
        "label": "Section 5 — n=5: More complex [2:45–3:20]",
        "text":  """\
Level five — ten boxes, five ranks. A bigger search space.

Notice how much more backtracking happens now. The computer places
the first few ranks confidently, then hits a wall fitting the next
rank, and has to unwind its choices — sometimes several levels back.
Each pink flash is the computer saying: this path leads nowhere,
I'll try something else.

The solution: two, three, two, five, three, four, one, one, five, four.
Rank five at positions four and nine — gap of five. Verified.\
"""
    },
    {
        "id":    "06_n6_n7_no_solution",
        "label": "Section 6 — n=6 and n=7: No solutions [3:20–4:05]",
        "text":  """\
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
"""
    },
    {
        "id":    "07_n8_hardest",
        "label": "Section 7 — n=8: The hardest level [4:05–4:45]",
        "text":  """\
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
"""
    },
    {
        "id":    "08_conclusion",
        "label": "Section 8 — Conclusion [4:45–5:00]",
        "text":  """\
The solutions appear at n equals four, five, and eight — all leave
remainder zero or three when divided by four.

Backtracking is the same core algorithm that powers Sudoku solvers,
chess engines, and constraint-satisfaction problems across computer science.

Now it's your turn — use One Step to explore each decision by hand,
or try dragging the guards yourself. Can you solve level eight
before the computer does? Good luck!\
"""
    },
]

# ---------------------------------------------------------------------------
# Audio generation
# ---------------------------------------------------------------------------

async def stream_to_file(text: str, path: str) -> None:
    """Save TTS audio by streaming chunks — avoids the save() NoAudioReceived bug in edge-tts 7.x."""
    tts = edge_tts.Communicate(text, voice=VOICE, rate=RATE, pitch=PITCH)
    with open(path, "wb") as f:
        async for chunk in tts.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])


async def generate_section(section: dict, out_dir: str) -> str:
    path = os.path.join(out_dir, f"{section['id']}.mp3")
    await stream_to_file(section["text"], path)
    print(f"  ✓  {section['label']}  →  {path}")
    return path


async def generate_full(out_dir: str) -> str:
    """Concatenate all sections into one audio file using a single TTS call."""
    full_text = "\n\n".join(s["text"] for s in SECTIONS)
    path = os.path.join(out_dir, "narration_full.mp3")
    await stream_to_file(full_text, path)
    print(f"  ✓  Full narration  →  {path}")
    return path


async def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))

    print(f"\nVoice: {VOICE}  |  Rate: {RATE}  |  Pitch: {PITCH}")
    print("=" * 60)

    # --- 1. Generate full combined narration ---
    print("\n[1/2] Generating full narration audio …")
    full_path = await generate_full(script_dir)

    # --- 2. Generate per-section files (useful for editing sync) ---
    sections_dir = os.path.join(script_dir, "narration_sections")
    os.makedirs(sections_dir, exist_ok=True)
    print(f"\n[2/2] Generating per-section files in  {sections_dir}  …")
    for section in SECTIONS:
        await generate_section(section, sections_dir)

    print("\n" + "=" * 60)
    print("Done!  Files created:")
    print(f"  • {full_path}   ← use this for the video")
    print(f"  • {sections_dir}/*.mp3  ← use these for fine editing")
    print()
    print("Next steps:")
    print("  1. Open index.html in Chrome/Edge (zoom 100%, maximised)")
    print("  2. Start OBS or Windows Game Bar (Win+G)")
    print("  3. Play narration_full.mp3 and record the screen simultaneously")
    print("  4. Follow the timestamps in video_script.md to sync actions")


if __name__ == "__main__":
    asyncio.run(main())
