# Leitner Maths Arena - Game Design Plan

## Product Fantasy

Leitner Maths Arena should feel like chess.com for primary mathematics fluency: short daily sessions, visible rating-like progress, safe class competition, and coaching that helps students know exactly what to practise next.

## Core Loop

1. Log in or continue as a local player.
2. Enter the Daily Arena.
3. Warm up with due Pack A cards.
4. Push Pack B/C review cards on scheduled days.
5. Finish with a boss-style word problem.
6. Earn XP, streak progress, league placement, and milestone progress.
7. The next session is generated from due cards, weak facts, and recent mistakes.

## Session Shape

- Target length: 3 to 7 minutes.
- Daily goal: 20 cards.
- Reward rhythm: XP every answer, quest completion every session, league movement weekly.
- Failure state: no hard game over; mistakes demote facts, add hints, and create targeted comeback quests.

## Current Browser Implementation

- Static HTML/CSS/JS remains easy to host and open locally.
- Local profile login stores a player name, handle, XP, league, streak, badges, and daily progress in `localStorage`.
- Existing topic pages now feed XP and streak progress through the shared Leitner engine.
- The home page is now the game lobby: Daily Arena, quick play, quests, leaderboard-style rivals, milestone campaign, and roadmap.

## Login And Account Roadmap

Phase 1 is already implemented as local browser login. Phase 2 should introduce real accounts:

- Student login: class code + display name, or school SSO where available.
- Teacher login: create classes, assign decks, view misconceptions, export progress.
- Parent view: weekly progress, streaks, badges, and suggested home practice.
- Data model: users, classes, memberships, decks, attempts, cards, quests, ratings, achievements.
- Safety: no open chat, teacher-controlled class leagues, display-name moderation, private-by-default progress.

## Chess.com-Inspired Systems

- Daily Puzzle: one generated word problem after fact practice.
- Puzzle Rush: timed mixed facts with accuracy gating.
- Leagues: weekly class-safe XP competition.
- Ratings: separate skill ratings for addition, subtraction, multiplication, division, word problems, speed, and consistency.
- Lessons: short coach cards unlocked when repeated errors are detected.
- Review Queue: due cards are prioritized by pack schedule, errors, and time since last attempt.

## Next Implementation Steps

1. Add a dedicated Daily Arena page that chains warm-up, tactics, and boss puzzle in one flow.
2. Add a teacher setup screen for class name, student roster, and weekly goal.
3. Persist word-problem attempts into the same profile stats as fact cards.
4. Replace simulated rivals with a real class leaderboard once backend accounts exist.
5. Add accessibility polish: keyboard shortcuts, reduced-motion pass, and clearer screen-reader labels.
