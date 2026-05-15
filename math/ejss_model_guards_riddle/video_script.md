# Guards Riddle — Video Narration Script
# Total runtime: ~5 minutes
# File: index.html (open in browser, set zoom to 100%, full-window)

---

## PRE-RECORDING CHECKLIST
- [ ] Open index.html in Chrome/Edge, zoom = 100%
- [ ] Window maximised (or 1920×1080)
- [ ] Speed slider set to "Slow" (position 3) for n=3,4,5; "Fast" (position 7) for n=6,7,8
- [ ] Step log closed (collapsed)
- [ ] OBS / Windows Game Bar (Win+G) recording ready
- [ ] Audio: use generated MP3 (narration_full.mp3) played back while recording screen

---

## SECTION 1 — INTRODUCTION  [0:00 – 0:30]
**Screen action:** Show full simulation, n=3 selected (default)

> "Welcome to the Guard's Riddle — an interactive puzzle that teaches one of the
> most fundamental ideas in computer science: backtracking search.
>
> In this video, we'll watch a computer solve this puzzle step by step,
> from the simplest level all the way up to level eight. Along the way,
> you'll see exactly how a computer thinks when it's tackling a problem
> that has no obvious shortcut."

---

## SECTION 2 — HOW THE PUZZLE WORKS  [0:30 – 1:15]
**Screen action:** Point to guards in top row, then to yellow boxes, then to the instruction table

> "Here's how the puzzle works. The guards standing in the top row are
> numbered by rank. Each rank appears exactly twice.
>
> Your goal is to drag them into the yellow boxes at the bottom. But
> there is one rule — two guards of the same rank must be placed exactly
> that many boxes apart.
>
> Rank one guards: one box apart.
> Rank two guards: two boxes apart.
> Rank three: three apart. And so on.
>
> The instruction table here shows a complete solution for n equals four:
> four, one, one, three, four, two, three, two.
> Check rank one: positions two and three — gap of one. Correct.
> Check rank four: positions one and five — gap of four. Correct.
> Every pair satisfies the rule."

---

## SECTION 3 — n = 3 : NO SOLUTION  [1:15 – 2:00]
**Screen action:**
1. Dropdown → select 3 (already selected)
2. Click 🤖 Auto-Solve
3. Let animation run at Slow speed
4. Point to step counter, backtrack count, pink flashes
5. Wait for NO SOLUTION result

> "Let's start with n equals three. Three pairs of guards, six boxes.
>
> I'll click Auto-Solve. Watch the colour coding:
> green boxes are being tested right now,
> blue boxes are confirmed placements on the current path,
> and pink means the computer just backtracked — it gave up on that choice.
>
> Rank one locks in — green flash. Now rank two tries different
> positions. Rank three needs to fit... it can't. Pink flash.
> Backtrack, try the next option. Still can't fit rank three. Pink again.
>
> After exhausting every possibility — no solution exists for n equals three.
> The computer didn't just fail to find one; it mathematically proved
> that none can exist."

---

## SECTION 4 — n = 4 : FIRST SOLUTION  [2:00 – 2:45]
**Screen action:**
1. Dropdown → select 4
2. Speed → position 3 (Slow)
3. Click 🤖 Auto-Solve
4. Let run — highlight when solution is found, all boxes turn gold

> "Level four. Eight boxes, four ranks.
>
> Watch rank one snap in — blue. Rank two tries its first option...
> works so far. Rank three... rank four is searching...
>
> There! The board reads four, one, one, three, four, two, three, two.
> All boxes light up gold. The dialog confirms: solution found.
>
> Notice the tries and backtracks counters. The computer explored only
> a small fraction of all possible arrangements before succeeding.
> That's the power of backtracking — it abandons dead ends early.
> For eight positions, brute force would require checking over
> forty thousand combinations. Backtracking finds it in far fewer steps."

---

## SECTION 5 — n = 5 : MORE COMPLEX  [2:45 – 3:20]
**Screen action:**
1. Dropdown → select 5
2. Speed → position 4 (Medium)
3. Click 🤖 Auto-Solve
4. Point out more frequent pink flashes compared to n=4

> "Level five — ten boxes, five ranks. A bigger search space.
>
> Notice how much more backtracking happens now. The computer places
> the first few ranks confidently, then hits a wall fitting the next
> rank, and has to unwind its choices — sometimes several levels back.
> Each pink flash is the computer saying: this path leads nowhere,
> I'll try something else.
>
> The solution: two, three, two, five, three, four, one, one, five, four.
> Rank five at positions four and nine — gap of five. Verified."

---

## SECTION 6 — n = 6 AND n = 7 : NO SOLUTIONS  [3:20 – 4:05]
**Screen action:**
1. Dropdown → select 6, Speed → position 6 (Fast), click Auto-Solve, wait for NO SOLUTION
2. Then select 7, click Auto-Solve, wait for NO SOLUTION
3. Point to rising backtrack count

> "For n equals six — no solution. Watch the backtrack counter climb
> much higher than before. The search space is larger, the computer
> works harder, but the answer is the same: no valid arrangement exists.
>
> For n equals seven — no solution again. An even larger search, even
> more backtracks. The computer proves impossibility by exhaustively
> checking every branch of the decision tree.
>
> Here's a pattern worth noticing: solutions at three through eight
> only appear at n equals four, five, and eight.
> What do those numbers have in common? Pause the video and think
> before we reveal it."

---

## SECTION 7 — n = 8 : THE HARDEST LEVEL  [4:05 – 4:45]
**Screen action:**
1. Dropdown → select 8
2. Speed → position 7 (Very Fast)
3. Click 🤖 Auto-Solve
4. Watch the step counter — it will be in the hundreds
5. Wait for solution, gold boxes

> "Level eight — sixteen boxes, the most complex level in this puzzle.
> I'll run this at high speed so we can see the full process.
>
> Watch the step counter. Hundreds of steps — green, blue, pink, green
> again. The solver is navigating a tree of decisions, pruning branches
> that can't possibly lead anywhere useful.
>
> And — solution found! Look at the backtrack count compared to level four.
> The search was far more expensive, showing how computational cost
> grows with problem size.
>
> The full arrangement: one, one, two, eight, two, three, seven,
> five, three, six, four, five, eight, four, seven, six."

---

## SECTION 8 — CONCLUSION  [4:45 – 5:00]
**Screen action:** Show full simulation, dropdown visible

> "The solutions appear at n equals four, five, and eight — all leave
> remainder zero or three when divided by four.
>
> Backtracking is the same core algorithm that powers Sudoku solvers,
> chess engines, and constraint-satisfaction problems across computer science.
>
> Now it's your turn — use One Step to explore each decision by hand,
> or try dragging the guards yourself. Can you solve level eight
> before the computer does? Good luck!"

---

## SCREEN RECORDING WORKFLOW

### Option A — Windows Game Bar (no extra software)
1. Open index.html in Edge/Chrome
2. Press  Win+G  → check "Record audio"
3. Press  Win+Alt+R  to start recording
4. Play the generated audio file (narration_full.mp3) through speakers/headphones
5. Press  Win+Alt+R  again to stop

### Option B — OBS Studio (recommended, free)
1. Add "Window Capture" source → select your browser window
2. Add "Media Source" → narration_full.mp3
3. Arm both tracks, hit Record

### Option C — Record voice live (best sync)
Read this script aloud while screen-recording.
Use the timestamps as pacing guides.
Record audio separately with Audacity → sync in any video editor.

---

## POST-PRODUCTION (optional, 10 min with DaVinci Resolve free)
1. Import screen recording + audio
2. Add title card at 0:00: "Guard's Riddle — Backtracking Search"
3. Zoom in on step counter / status bar at key moments
4. Export as 1080p MP4
