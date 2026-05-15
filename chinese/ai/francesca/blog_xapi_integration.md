# Building xAPI Score Reporting into Chinese Handwriting Learning Tools

**Author:** Claude (Anthropic)
**Date:** 2026-02-27
**Project:** Chinese Handwriting Practice Tools — SLS xAPI Integration

---

## Overview

This post documents the detailed technical steps taken to integrate xAPI (Experience API / Tin Can API) score reporting into three Chinese handwriting learning tools built with the [Hanzi Writer](https://hanziwriter.org/) library. The goal was to ensure that a student's progress (e.g. "3 out of 15 characters completed") is reliably submitted to the Singapore Student Learning Space (SLS) Learning Management System, along with a rich analytics log of every interaction during the session.

The three tools integrated are:

1. **Chinese Handwriting Practice** (`Chinese_Handwriting_Practice_20260225 claudesimple2/`)
2. **Chinese Handwriting Mastery Tool** (`Chinese_Handwriting_Mastery_Tool_20260226/`)
3. **Chinese Handwriting Practice & Recognition** (`Chinese_Handwriting_Practice_&_Recognition_20260226/`)

---

## Step 1: Start from the Right Foundation

The first and most important decision was to use the existing scorable zip file —
`scorable_newTab_timeline_Chinese_Handwriting_Practice_20260225_claudesimple2.zip` — as the foundation, rather than building a custom xAPI integration from scratch.

This zip already contained:

- `lib/xapiwrapper.min.js` — the ADL xAPI JavaScript wrapper
- `lib/xAPI.js` — an SLS-specific glue layer that reads `endpoint`, `auth`, and `agent` from URL parameters (injected by SLS), persists them to `localStorage` for new-tab support, and exposes `window.storeState()` and `window.getState()`
- An inline xAPI Timeline `<script>` block in `index.html` that auto-tracks user interactions, reads the score from the DOM, and submits a rich payload on click, page unload, or visibility change

**Key lesson:** SLS interactives must never make direct XHR/fetch calls to the LRS endpoint. All submissions must go through `window.storeState()` (provided by `lib/xAPI.js`). Direct calls fail with CORS errors.

The `lib/` folder was extracted from the scorable zip and copied into each of the three tool folders.

---

## Step 2: Add the xAPI Infrastructure to Each `index.html`

Each tool's `index.html` received two `<script>` tags added in `<head>`:

```html
<!-- xAPI libraries (SLS integration) -->
<script src="./lib/xapiwrapper.min.js"></script>
<script src="./lib/xAPI.js"></script>
```

And a full inline xAPI Timeline `<script>` block was also added in `<head>` — containing the complete session tracker. This block is identical across all three tools (with only minor ID adaptations).

Two hidden score holder elements were added just before `</body>` in each tool:

```html
<!-- xAPI score holders — read by the timeline tracker -->
<span id="xapi-score" style="display:none">0</span>
<span id="xapi-total" style="display:none">15</span>
```

These act as a clean DOM bridge: `script.js` writes integer values here whenever a character is completed, and the timeline tracker reads them with `extractScoreFromDom()`. This avoids fragile regex parsing against styled score displays.

---

## Step 3: Replace Hand-Rolled xAPI with `updateXapiScore()`

Each tool's `script.js` previously contained (or had been given) a large hand-rolled `xapi` object that attempted direct ADL.XAPIWrapper calls. These were replaced with a single lightweight helper function:

```javascript
function updateXapiScore(completedCount, totalCount) {
    var scoreEl = document.getElementById('xapi-score');
    var totalEl = document.getElementById('xapi-total');
    if (scoreEl) scoreEl.textContent = completedCount;
    if (totalEl) totalEl.textContent = totalCount;
    try {
        if (typeof window.storeState === 'function') {
            window.storeState({
                score: completedCount,
                max: totalCount,
                feedback: 'Characters completed: ' + completedCount + '/' + totalCount +
                          ' | Mode: ' + (typeof currentMode !== 'undefined' ? currentMode : 'unknown'),
                reason: 'character-complete'
            });
        }
    } catch (e) {}
    console.log('[xAPI] Score updated:', completedCount + '/' + totalCount);
}
```

This function does three things:
1. Updates the hidden DOM elements so the timeline tracker's `extractScoreFromDom()` always has current values
2. Calls `window.storeState()` directly for an immediate flush — so the score is submitted even if the student closes the tab right after completing a character
3. Logs to the browser console for debugging

The function is called from each tool's character completion handler. Score = number of **unique** characters successfully completed (tracked with a JavaScript `Set`), Max = total vocabulary list length. This gives a meaningful progress-based score (e.g. 0.2 = 3/15) rather than a raw accuracy percentage.

---

## Step 4: Restore the Full Rich Analytics Feedback

After the initial integration, the feedback submitted to SLS was reduced to just five lines:

```
Feedback
Chinese Handwriting Practice
2/27/2026, 9:52:29 AM
Characters completed: 1/15
Elapsed: 26s
```

This happened because a simplified version of the inline timeline script was initially used, which stripped out the rich analytics functions. The fix was to restore the full set of functions from the original scorable zip.

### `hookLearningAnalyticsLog()` — The Critical Bridge

This is the most important function in the architecture. It uses a `MutationObserver` to watch the `#analyticsLog` element (the on-screen analytics panel present in all three tools) and mirrors every `.log-entry` element into the xAPI action timeline as it is created:

```javascript
function hookLearningAnalyticsLog() {
    var logContainer = document.getElementById('analyticsLog');
    if (!logContainer) return;
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1 && node.classList.contains('log-entry')) {
                    var parsed = parseAnalyticsEntry(node);
                    logAction('learning-analytics', parsed);
                }
            });
        });
    });
    observer.observe(logContainer, { childList: true });
}
```

Every time `script.js` logs a stroke, navigation event, or mode change to the on-screen panel, it is automatically captured and forwarded to the xAPI timeline — no additional changes to `script.js` are required beyond the single `updateXapiScore()` call.

### `parseAnalyticsEntry()` — Reading the Analytics Panel

This function reads the structured child spans within each log entry:

```javascript
function parseAnalyticsEntry(entry) {
    var timeSpan   = entry.querySelector('.log-time');
    var iconSpan   = entry.querySelector('.log-icon');
    var actionSpan = entry.querySelector('.log-action');
    var stateSpan  = entry.querySelector('.log-state');
    return {
        t:      timeSpan   ? timeSpan.textContent.trim()   : '',
        icon:   iconSpan   ? iconSpan.textContent.trim()   : '',
        action: actionSpan ? actionSpan.textContent.trim() : '',
        state:  stateSpan  ? stateSpan.textContent.trim()  : ''
    };
}
```

The class names were updated from the original zip template (`.log-value`) to match those actually used in these three tools (`.log-state`).

### `buildFeedback()` — Rich Session Report

The restored `buildFeedback()` function produces a detailed session report including:

- **Interactions** — total number of logged actions in the session
- **Elapsed Time** — seconds from session start to submission
- **Score** — characters completed / total (e.g. 3/15)
- **Unique Explorations** — number of distinct characters interacted with
- **Diversity** — breakdown of action types: nav, correct, mistake, control, complete, learning-analytics
- **Sequence Changes** — how many times the student switched between characters or modes
- **Scenarios** — a derived label (e.g. "focused-practice", "exploratory", "struggling")
- **Full Action Log** — every timestamped interaction from `t=0s` to end of session

---

## Step 5: Fix the Truncated Action Log

After restoring the full feedback, the action log was still truncated — it started at `t=34s` instead of `t=0s`. Three hard limits in the timeline script were responsible:

| Location | Original Limit | Problem |
|---|---|---|
| `logAction()` buffer cap | `if (actions.length > 120) actions.shift()` | Dropped oldest actions once buffer filled |
| `buildPayload()` raw actions | `const actions = xapiState.actions.slice(-80)` | Sent only last 80 events |
| `buildPayload()` action log | `actions.slice(-12).map(...)` | Formatted only last 12 events |

All three limits were removed:

```javascript
// Buffer cap raised to 2000 (effectively unlimited for a single session)
if (xapiState.actions.length > 2000) xapiState.actions.shift();

// Full session log — no slice
const actions = xapiState.actions;

// All actions mapped to formatted log entries — no slice
const actionLog = actions.map(a => { ... });
```

This ensures every interaction from the moment the page loads is captured and included in the SLS feedback — providing a complete, untruncated picture of the student's full learning session.

---

## Architecture Summary

```
SLS (LMS)
    │
    ▼
lib/xAPI.js               ← reads endpoint/auth from URL params, exposes window.storeState()
lib/xapiwrapper.min.js    ← ADL xAPI wrapper
    │
    ▼
xAPI Timeline Script (inline in <head>)
    ├── logAction()                ← buffer up to 2000 events
    ├── hookLearningAnalyticsLog() ← MutationObserver on #analyticsLog
    ├── extractScoreFromDom()      ← reads #xapi-score and #xapi-total
    ├── buildFeedback()            ← rich session report with all metrics
    └── buildPayload()             ← full action log (no slice)
            │
            ▼
    window.storeState()            ← submits to LRS via lib/xAPI.js
            ▲
script.js
    ├── updateXapiScore()          ← updates hidden DOM spans + calls storeState()
    └── analytics.log()            ← writes to #analyticsLog → picked up by MutationObserver
```

The data flows upward: `script.js` → `#analyticsLog` DOM → MutationObserver → `logAction()` buffer → `buildPayload()` → `window.storeState()` → SLS LRS.

---

## Reusing This Pattern for Other Interactives

This architecture is designed to be reusable across any SLS interactive that needs xAPI integration. For any new tool:

1. **Copy `lib/xapiwrapper.min.js` and `lib/xAPI.js`** into the tool folder
2. **Add the two `<script>` tags** in `<head>` pointing to those files
3. **Paste the xAPI Timeline inline script** into `<head>` (adjust the `#analyticsLog` element ID if different)
4. **Add hidden score holders** (`<span id="xapi-score">` and `<span id="xapi-total">`) before `</body>`
5. **Add `updateXapiScore(score, max)`** to the tool's `script.js` and call it from the completion handler
6. **Ensure the on-screen analytics panel uses `id="analyticsLog"`** with child elements using `class="log-entry"` and inner spans `class="log-time"`, `class="log-icon"`, `class="log-action"`, `class="log-state"`

The `MutationObserver` approach means the xAPI timeline automatically captures every interaction logged to the analytics panel — no further instrumentation of `script.js` is needed.

---

## Files Modified

| File | Changes |
|---|---|
| `*/lib/xapiwrapper.min.js` | Added — copied from scorable zip |
| `*/lib/xAPI.js` | Added — copied from scorable zip |
| `*/index.html` | Added lib script tags; added full xAPI Timeline inline script; added hidden score holders |
| `*/script.js` | Replaced hand-rolled xapi object with `updateXapiScore()`; hooked into character completion callback; added `completedCharacters` Set for unique-score tracking |

All three tools were updated identically following this pattern.

---

## Key Takeaways

- **Use the scorable zip as your foundation** — it already has SLS-compatible xAPI wiring. Never build from scratch.
- **Never call the LRS directly** — always go through `window.storeState()`.
- **Use hidden DOM elements as a score bridge** — clean integers are easier to read than styled UI text.
- **`MutationObserver` is the analytics bridge** — it connects the in-page analytics panel to the xAPI timeline without modifying the core learning logic.
- **Remove all buffer/slice limits** for a full session log — the default limits discard early interactions, hiding the student's initial exploration behaviour.

---

*This blog post documents the xAPI integration work performed on 2026-02-27 for the SLS Chinese Handwriting Practice Tools project.*
