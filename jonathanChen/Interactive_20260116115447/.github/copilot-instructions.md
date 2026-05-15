# Tamil Word Game - Copilot Instructions

## Project Overview
An interactive word-formation game for Primary 2 Tamil learners. Players form Tamil words from shuffled letter tiles, earn points, and complete 5 target words per session. The game emphasizes Tamil text rendering, immediate feedback, and gamified learning.

## Critical Architecture Pattern: Tamil Grapheme Cluster Representation

**The Core Challenge**: Tamil characters must be grouped as **complete grapheme clusters**, not individual Unicode components.

```javascript
// ✓ CORRECT: Grouped as complete clusters
{ word: ['அம்', 'மா'], meaning: 'Mother', points: 10 }

// ✗ WRONG: Split into components (breaks display and word matching)
{ word: ['அ', 'ம்', 'மா'], meaning: 'Mother', points: 10 }
```

- Each array element represents one **complete** consonant-vowel or consonant-virama unit
- This affects: word database entries, hint logic, letter tile selection, and display rendering
- See [wordDatabase](script.js#L24) in script.js for the pattern
- CSS sizing must accommodate: `.letter-tile` and `.letter-slot` both set to `width: 90px` to prevent overflow

## State Management & Game Flow

`gameState` object (script.js) tracks:
- `currentWord`: Array of `{letter, index}` objects being formed
- `completedWords`: Array with `{word, meaning, indices}` of found words
- `usedLetterIndices`: Tracks which letters are in use (prevents duplicates)

**Key Pattern**: When a word is completed, letters remain visually disabled but only remove from usable pool after restart. See [clearWord](script.js#L216) logic filtering by `completedWords.some()`.

## Feature Architecture: Hint System

Hints highlight the first letter of a random uncompleted word and display its meaning + character count.

**Implementation Details**:
- `gameState.currentHintWord` stores the hinted word
- [highlightHintLetter()](script.js#L287) finds unused letters matching the target
- Auto-hides after 8 seconds (configurable timeout)
- Keyboard shortcut: 'H' key (see [keydown listener](script.js#L417))
- When a hinted word is found, [hideHint()](script.js#L273) clears highlights

## UI Patterns & CSS Organization

**Responsive Container**: 
- Fixed 450px in iframe mode (embedded)
- 90vh in fullscreen (detected via `window.self === window.top`)
- Controlled by `.game-container` and `body.fullscreen` selector

**Feedback System**:
- [showFeedback()](script.js#L357) displays messages with type-based styling (`success`/`error`)
- 2-second auto-hide timeout
- Success messages show point values: `✓ Correct! +{points} points`

**Letter Selection Flow**:
1. [selectLetter()](script.js#L169) adds to `currentWord` and marks index as used
2. [updateWordDisplay()](script.js#L192) renders 5 slots (empty/filled)
3. Clicking filled slots removes letters via [removeLetter()](script.js#L215)

## Game Completion & Restart

- Victory condition: `gameState.wordsFound >= gameState.targetWords` (5 words)
- [showCelebration()](script.js#L366) displays overlay with confetti emoji (🎉)
- [hideCelebration()](script.js#L372) calls `initGame()` to reset all state and shuffle new word set

## When Extending This Game

**Adding New Words**: 
- Update [wordDatabase](script.js#L24-L32) array only
- Verify Tamil grouping: each element must be a complete cluster
- No CSS or layout changes needed (90px slots accommodate up to ~4-5 clusters)

**Modifying Difficulty**:
- Change `gameState.targetWords` (default 5)
- Adjust word length range by filtering in [initGame()](script.js#L49)
- Alter `numExtra` random letters ratio (line 61)

**Styling Changes**:
- Gradient colors: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- Font size for Tamil text: 28px (`.letter-tile`, `.letter-slot`) - sufficient for clarity
- Maintain `width: 90px` on slots to prevent Tamil overflow

## Known Integration Points

- **Fullscreen Detection**: `window.self === window.top` (line 7) - add `fullscreen` class to body for responsive behavior
- **Keyboard Support**: Enter (submit), Escape (clear), H (hint) - see [keydown handler](script.js#L408)
- **Touch Feedback**: [selectLetter()](script.js#L177) includes `touchstart`/`touchend` for mobile scaling
- **Tooltip UI**: Info icon (ℹ️) toggles modal instructions - controlled by `tooltip.show` class
