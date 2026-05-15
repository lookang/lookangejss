# YouTube Upload Details — Guards Riddle / Backtracking Search

Channel: https://www.youtube.com/@lookang
File:    guards_riddle_video.mp4  (4:49, 1280×720, 12 MB)

---

## Title (pick one — under 100 chars)

**Recommended (SEO-friendly, primary keyword first):**
```
Backtracking Search Visualised — Guards Riddle (Langford Pairing) Auto-Solver | EJSS Sim
```

**Shorter alternative:**
```
How a Computer Solves the Guards Riddle — Backtracking Search Step-by-Step
```

**Catchier alternative:**
```
Watch a Computer Think: The Guards Riddle Solved by Backtracking (n=3 to 8)
```

---

## Description (paste into YouTube description box)

```
Watch a computer solve the Guards Riddle — a Langford-pairing puzzle — step by step,
from n=3 all the way up to n=8. Along the way you'll see exactly how backtracking
search works: trying placements, hitting dead ends, unwinding choices, and proving
when no solution exists.

🧩 The Puzzle
Place 2n guards (n pairs, ranks 1…n) into 2n boxes so that the two guards of rank k
are exactly k positions apart. Solutions exist for n = 4, 5, 8 (in this 3–8 range).

🤖 What you'll see
• Green flash — the algorithm is testing a candidate placement
• Blue   — confirmed placement on the current path
• Pink   — the algorithm just backtracked (gave up on that choice)
• Gold   — solved!

📚 The Big Idea
Backtracking is the same core algorithm that powers Sudoku solvers, chess engines,
n-queens, and constraint-satisfaction problems across computer science. Instead of
brute-forcing every arrangement, it abandons dead ends early — exploring only a
small fraction of the search space.

🎮 Try it yourself (free, runs in browser)
https://iwant2study.org/lookangejss/cardgame/ejss_model_guards_riddle/

🔧 Built with
• Easy JavaScript Simulations (EJSS) — Open Source Physics @ Singapore
• Custom auto-solver + step visualiser (added by lookang)
• Narration: Kokoro-82M neural TTS (open source)

⏱ Chapters
0:00  Introduction
0:30  How the Puzzle Works
1:15  n=3 — No Solution Exists (proof by exhaustion)
2:00  n=4 — First Solution Found
2:45  n=5 — Larger Search Space
3:20  n=6 and n=7 — No Solutions
3:59  n=8 — Hardest Level (93 tries, 85 backtracks)
4:18  Conclusion — When Do Solutions Exist?

🔗 More EJSS simulations
https://iwant2study.org/lookangejss/

📜 Credits
Original Guards Riddle simulation: Shaun Quek, Loo Kang Wee, Francisco Esquembre,
Felix Jesús García Clemente — based on an idea by Theresa Hoag.
Released under Creative Commons Attribution-ShareAlike (CC BY-SA).

#ComputerScience #Algorithms #Backtracking #PuzzleSolving #EducationalVideo
#STEM #LangfordPairing #CSEducation #InteractiveSimulation #EJSS
```

---

## Tags (paste into Tags box, max 500 chars total — comma-separated)

```
backtracking, backtracking algorithm, backtracking search, computer science, algorithms,
langford pairing, langford sequence, guards riddle, puzzle solver, recursive algorithm,
constraint satisfaction, depth first search, dfs, sudoku algorithm, n-queens, csp,
algorithm visualization, algorithm visualisation, educational, stem, computer thinking,
ejss, easy javascript simulations, open source physics, lookang, iwant2study,
o level computing, a level computing, ip computing, sec 3 computing, secondary computing,
discrete math, combinatorics, recursion, problem solving, computational thinking
```

---

## Hashtags (max 15 in description; YouTube uses first 3 above title)

Pinned to title (use the first 3 — these display above the title):
```
#Backtracking #Algorithms #ComputerScience
```

Full list for end of description:
```
#Backtracking #Algorithms #ComputerScience #PuzzleSolving #LangfordPairing
#STEM #CSEducation #InteractiveSimulation #EJSS #lookang #iwant2study
#OpenSourcePhysics #ComputationalThinking #AlgorithmVisualisation #Recursion
```

---

## Thumbnail Suggestions (1280×720, JPG/PNG <2 MB)

Pick a frame from the video as a starting point:
1. **n=8 solved frame** (~4:30) — 16 gold boxes, dramatic finish
2. **n=7 backtracking** (~3:40) — pink + yellow chaos, "in the act of thinking"
3. **n=4 result** (~2:10) — clean solution, easiest to read

Add a **bold overlay text** on the thumbnail:
```
HOW DOES A COMPUTER
   THINK?
```
or
```
BACKTRACKING
EXPLAINED
```

Keep text huge — readable on phones (the platform where most YouTube watching happens).
Bright contrasting colours: yellow text on dark navy, or red text with white outline.

---

## Privacy / Visibility
- **Visibility:** Public
- **Audience:** "No, it's not Made for Kids" (educational but not COPPA-targeted)
- **Category:** Education
- **Language:** English
- **Subtitles:** Auto-caption on upload, then edit (the script in video_script.md is the verbatim transcript — you can paste it as a manual SRT)

---

## Playlist suggestions
Add to playlists if you have them:
- "Computer Science / Algorithms"
- "EJSS Simulations"
- "Educational Animations"

---

## Cards & End Screen
**Card at 1:15** ("Let's start with n=3"):
→ Link to playable simulation https://iwant2study.org/lookangejss/cardgame/ejss_model_guards_riddle/

**End screen (last 20s, 4:29–4:49):**
→ Subscribe button
→ Recommended video (your most-related EJSS upload)
→ Playlist link

---

## SRT Subtitle File
The full narration in video_script.md is the verbatim transcript.
To create captions:

1. In YouTube Studio → Subtitles → Add language → English
2. Click "Auto-sync" — paste the plain narration text below
3. YouTube aligns it to the audio automatically

```
Welcome to the Guard's Riddle — an interactive puzzle that teaches one of the most fundamental ideas in computer science: backtracking search.

In this video, we'll watch a computer solve this puzzle step by step, from the simplest level all the way up to level eight. Along the way, you'll see exactly how a computer thinks when it's tackling a problem that has no obvious shortcut.

Here's how the puzzle works. The guards standing in the top row are numbered by rank. Each rank appears exactly twice.

Your goal is to drag them into the yellow boxes at the bottom. But there is one rule — two guards of the same rank must be placed exactly that many boxes apart.

Rank one guards: one box apart. Rank two guards: two boxes apart. Rank three: three apart. And so on.

The instruction table shows a complete solution for n equals four: four, one, one, three, four, two, three, two. Check rank one: positions two and three — gap of one. Correct. Check rank four: positions one and five — gap of four. Correct. Every pair satisfies the rule.

Let's start with n equals three. Three pairs of guards, six boxes.

I'll click Auto-Solve. Watch the colour coding: green boxes are being tested right now, blue boxes are confirmed placements on the current path, and pink means the computer just backtracked — it gave up on that choice.

Rank one locks in — green flash. Now rank two tries different positions. Rank three needs to fit — it can't. Pink flash. Backtrack, try the next option. Still can't fit rank three. Pink again.

After exhausting every possibility — no solution exists for n equals three. The computer didn't just fail to find one; it mathematically proved that none can exist.

Level four. Eight boxes, four ranks.

Watch rank one snap in — blue. Rank two tries its first option — works so far. Rank three — rank four is searching —

There! The board reads four, one, one, three, four, two, three, two. All boxes light up gold. The dialog confirms: solution found.

Notice the tries and backtracks counters. The computer explored only a small fraction of all possible arrangements before succeeding. That's the power of backtracking — it abandons dead ends early. For eight positions, brute force would require checking over forty thousand combinations. Backtracking finds it in far fewer steps.

Level five — ten boxes, five ranks. A bigger search space.

Notice how much more backtracking happens now. The computer places the first few ranks confidently, then hits a wall fitting the next rank, and has to unwind its choices — sometimes several levels back. Each pink flash is the computer saying: this path leads nowhere, I'll try something else.

The solution: two, three, two, five, three, four, one, one, five, four. Rank five at positions four and nine — gap of five. Verified.

For n equals six — no solution. Watch the backtrack counter climb much higher than before. The search space is larger, the computer works harder, but the answer is the same: no valid arrangement exists.

For n equals seven — no solution again. An even larger search, even more backtracks. The computer proves impossibility by exhaustively checking every branch of the decision tree.

Here's a pattern worth noticing: solutions at three through eight only appear at n equals four, five, and eight. What do those numbers have in common? Pause the video and think before we reveal it.

Level eight — sixteen boxes, the most complex level in this puzzle. I'll run this at high speed so we can see the full process.

Watch the step counter. Hundreds of steps — green, blue, pink, green again. The solver is navigating a tree of decisions, pruning branches that can't possibly lead anywhere useful.

And — solution found! Look at the backtrack count compared to level four. The search was far more expensive, showing how computational cost grows with problem size.

The full arrangement: one, one, two, eight, two, three, seven, five, three, six, four, five, eight, four, seven, six.

The solutions appear at n equals four, five, and eight — all leave remainder zero or three when divided by four.

Backtracking is the same core algorithm that powers Sudoku solvers, chess engines, and constraint-satisfaction problems across computer science.

Now it's your turn — use One Step to explore each decision by hand, or try dragging the guards yourself. Can you solve level eight before the computer does? Good luck!
```

---

## Pinned Comment (post immediately after upload)
```
🎮 Try the simulation yourself (free, runs in browser, mobile-friendly):
https://iwant2study.org/lookangejss/cardgame/ejss_model_guards_riddle/

📥 Download the full source (EJSS, open source):
https://iwant2study.org/lookangejss/math/ejss_model_guards_riddle/

Did you spot the pattern? Solutions exist when n mod 4 ≡ 0 or 3.
This is a known result for Langford pairings (Skolem 1957).

What other puzzle should I visualise next? 👇
```
