# Sun Game YouTube Tutorial Package

## Suggested Video Title
How to Play and Solve Sun Game | Teacher Mode, Hints, and Puzzle Strategies

## Short Description
This video shows how to play Sun Game, what each button does, and how to think through the four built-in puzzles. We start with the basic rules, then use Teacher Mode to model the solving process, and finally look at when the computer solver needs to take over.

## Tutorial Goal
By the end of the video, viewers should be able to:

- understand what the numbers mean
- click and mark edges correctly
- use `Hint`, `Next Step`, `Play Thinking`, and `Solve Now`
- recognize easy forced moves
- know when a puzzle can no longer be finished by simple local deduction alone

## Suggested Chapters
00:00 Introduction  
00:20 How the Sun Game works  
01:00 How to click and mark edges  
01:30 What the buttons do  
02:30 Puzzle 1 walkthrough  
03:40 Puzzle 2 walkthrough  
04:40 Puzzle 3 and Puzzle 4  
05:35 Recap and challenge to viewers

## On-Screen Sequence

1. Open `puzzle 1`.
2. Show one edge and click it three times:
   active black line -> flagged impossible -> undecided dashed line.
3. Turn `Teacher: On`.
4. Demonstrate `Hint`.
5. Demonstrate `Next Step`.
6. Demonstrate `Play Thinking`.
7. Demonstrate `Solve Now`.
8. Reset and move through puzzles 2, 3, and 4.

## Narration Script

### 00:00 Introduction
In this video, we are going to learn how to play Sun Game, how to use the teacher tools, and how to solve the different puzzles step by step. This is not just about getting the answer. The main idea is to understand the thinking process, so that when you meet a similar puzzle later, you know what to look for.

### 00:20 How the Sun Game works
Each circle has a number inside it. That number tells us how many active edges must touch that circle. Active edges are the solid black lines. If the number is 4, then exactly 4 touching edges must end up active. If the number is 1, then only 1 touching edge should be active.

So the whole goal of the game is simple to say: make the number of active edges around every circle match the clue shown on that circle.

### 01:00 How to click and mark edges
When I click an edge once, it becomes active. That means I am saying this edge should count toward the number.

When I click the same edge a second time, it becomes flagged as impossible. That is my way of saying this edge should not be active.

When I click a third time, it goes back to undecided.

That three-state cycle is very useful, because in these puzzles we do not only need to find what must be on. We also need to mark what must stay off.

### 01:30 What the buttons do
Now let’s look at the controls across the top.

The puzzle menu lets us switch between the four built-in puzzles.

`Reset` clears the current puzzle and starts that puzzle again from the beginning.

`Teacher: On` shows the teaching tools. These are the most helpful buttons if you want to learn strategy rather than just see the final answer.

`Hint` points out the next logical observation without making the move for you.

`Next Step` actually performs that logical move, so you can compare the explanation with the board change.

`Play Thinking` keeps applying teacher-style steps one at a time. This is useful when you want to watch the reasoning unfold.

`Solve Now` lets the computer finish the puzzle. This is helpful after you have explored the puzzle yourself or when the local deductions run out.

One important teaching point: `Play Thinking` does not pretend to know everything. If the puzzle reaches a point where there are no more forced local deductions, it stops and tells you that it has reached a search boundary. That is a good feature, because it shows students the difference between explainable logic and full computer search.

### 02:30 Puzzle 1 walkthrough
Let’s start with `puzzle 1`, because this is the best introduction.

The first thing to notice is the clue `8` at row 3, column 4. On this board, that clue touches 8 possible edges. If the clue is 8, then every one of those touching edges must be active. That is a perfect example of an `all-needed` move.

So if I use `Hint`, the sim should point me to that area. If I press `Next Step`, all 8 surrounding edges are turned on.

Right after that, the `1` next to it becomes very interesting, because too many active edges would break that clue. Once enough has already been decided around it, the remaining undecided edges there must stay off. This is the opposite pattern: not all needed, but `already full`, so the rest must be inactive.

This is a good place to pause and tell students the two core patterns:

If a clue already has enough active edges, all other undecided edges around it must stay off.

If a clue still needs exactly the same number of edges as the number of undecided edges left, then all of those undecided edges must turn on.

Those two ideas solve a lot of the early moves in Sun Game.

Now I can press `Play Thinking` and let the sim continue with the local deductions. Viewers will see the board move step by step instead of jumping straight to the end.

### 03:40 Puzzle 2 walkthrough
Now let’s move to `puzzle 2`.

This one also has a strong opening move. The clue `5` at row 3, column 5 touches 5 possible edges, so again every one of those edges must be active.

That immediately creates follow-up information nearby. Once those edges are active, some neighboring clues become full, so their remaining undecided edges must be marked off.

This is a nice puzzle for showing the rhythm of solving:

First, find a clue that forces edges on.

Then, check the neighboring clues to see whether any of them are now complete.

Then, mark the extra edges off.

That back-and-forth is what makes the puzzle feel like a chain of consequences instead of random guessing.

### 04:40 Puzzle 3 and Puzzle 4
Now let’s look at `puzzle 3` and `puzzle 4`.

These are useful from a teaching point of view because the simple local rule set does not immediately produce a forced opening move. If I turn on Teacher Mode and ask for a hint right at the start, I may get a message saying there is no single forced move from this position.

That is actually a valuable lesson. Not every puzzle begins with an obvious move. Sometimes a student has to:

- scan for the most constrained clues
- test a promising region
- or use the teacher tools to compare human logic with computer solving

If `Play Thinking` stops at a search boundary, that is not a failure. It is telling us that the easy local deductions have run out. At that point, we can either continue exploring ourselves or press `Solve Now` and let the computer finish.

When using this in class, I would present puzzle 3 and puzzle 4 as discussion puzzles. Ask students where they would start, which clues look most restrictive, and why a solver might need stronger reasoning than the first two local rules.

### 05:35 Recap and challenge to viewers
Let’s recap the main ideas.

The number in each circle tells us how many active edges must touch it.

Each edge can be active, flagged off, or undecided.

The two most important patterns are:

- if a clue is already full, the remaining undecided edges around it must stay off
- if a clue still needs all of its remaining undecided edges, then all of them must turn on

Teacher Mode helps us slow the reasoning down.

`Hint` points.

`Next Step` demonstrates.

`Play Thinking` shows a chain of logical moves.

`Solve Now` finishes the puzzle when we want the computer to continue.

Try puzzle 1 first, then puzzle 2, and after that challenge yourself with puzzle 3 and puzzle 4. See how far you can go before you need the solver.

## Suggested Teacher Notes

- Use `puzzle 1` as the main live demo because it has the clearest opening move.
- Use `puzzle 2` to reinforce chain reactions between neighboring clues.
- Use `puzzle 3` and `puzzle 4` to explain that not all puzzles begin with an obvious forced move.
- Emphasize that the teaching value is in the reasoning, not only the final solved board.

## Optional Closing Line
If you want, pause the video after each hint and try the next step yourself before letting the sim reveal it.
