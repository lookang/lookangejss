# Engineering Context — `ai-prompt-library.html`

Last updated: 2026-02-20

This note preserves the active engineering context for continuing edits to the single-file HTML app:

**File:** `ai-prompt-library.html` (inline CSS + inline JS)

## 1) Current intent / goal

Primary user intent (current): **aggressively reduce vertical whitespace and border thickness** so the **“🚀 Generate Prompt”** button becomes visible sooner on initial page load (less scrolling).

Secondary / previously completed intent: At ~**900px viewport width** (Puppeteer default 900x600), keep **“Grade Level” + “Subject Area”** side-by-side (2 columns). Only stack on smaller phone sizes.

## 2) Key layout / responsiveness decisions

### 2.1 Grade Level + Subject Area should stay 2-col at 900px

Markup pattern:

```html
<div class="form-row">
  <div class="form-group">... Grade Level ...</div>
  <div class="form-group">... Subject Area ...</div>
</div>
```

CSS rule: use CSS grid for 2 columns by default; stack only at `<= 768px`:

```css
.form-row { display: grid; grid-template-columns: 1fr 1fr; }
@media (max-width: 768px) {
  .form-row { grid-template-columns: 1fr; }
}
```

**Important:** Avoid stacking at `<= 968px` because that hits the 900px “tablet-ish” target.

## 3) Bugs/regressions found + fixed

### 3.1 JS syntax error accidentally introduced in `initHelpVideoEmbed()`

Issue: A fuzzed patch inserted invalid JS inside the `<details>` toggle handler:

```js
} else {
  padding: 12px;
}
```

This caused a parse error like: **“An identifier or keyword cannot immediately follow a numeric literal.”**

Fix: restore correct unmount call:

```js
detailsEl.addEventListener('toggle', () => {
  if (detailsEl.open) {
    mount();
  } else {
    unmount();
  }
  syncSummaryLabel();
});
```

### 3.2 900px regression: “hidden copy buttons” became visible

Symptom at ~900px: output card showed the big “Forum / Prompt / Full” buttons even though their inline style is `display: none;`.

Root cause: inside `@media (max-width: 968px)` there was a **“Fix button display on mobile”** CSS block that included:

```css
.btn { display: flex !important; }
```

Because of `!important`, it overrode inline `display:none` (yes, `!important` overrides inline styles that are not `!important`).

Fix: **remove the entire “Fix button display on mobile” block** from the `968px` media query. Leave mobile stacking/touch sizing to the `<= 768px` media query.

## 4) Space compaction changes already applied (keep going carefully)

Compaction was applied primarily to reduce gaps/paddings/min-heights/border thickness while preserving usability.

Examples of applied reductions (not exhaustive):

- `.content` gap/padding: `16 → 12`
- `.card` padding: `16 → 12`
- `.card h2` margin-bottom: `10 → 8`
- `.form-group` margin-bottom: `12 → 10`
- `.form-row` gap: `14 → 10`
- `.form-row` margin-bottom: `20 → 12`
- `label` margin-bottom: `6 → 4`
- `input/select/textarea` padding: `10px 12px → 9px 10px`
- `textarea` min-height: `70 → 60`
- `.btn` padding: `12px 18px → 11px 16px`
- `.btn-secondary` margin-top: `6 → 4`
- `#output` padding: `14 → 12`, line-height: `1.6 → 1.55`
- `.rat-btn` min-height: `64 → 56`
- `.help-video-card` border: `2px → 1px`

In `@media (max-width: 968px)`:

- reduced form control padding `12 → 10`
- removed 968px-only `.btn` min-height + “make generate button prominent” rules (to keep 900px compact and avoid overriding button visibility)

## 5) Functional UI components to avoid breaking

- **Quick Examples** uses `<details>/<summary>` to save space.
  - Expected behavior: open on desktop, closed at `<= 968px`.
- **Help video** uses `<details>` and mounts/unmounts a YouTube iframe:
  - Opening mounts iframe
  - Closing unmounts iframe (stops playback)
- **Tooltip system** via small `.info-btn` popover buttons (should remain clickable even after compaction)

## 6) Local dev/testing commands

Serve locally:

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000/ai-prompt-library.html
```

Note: `netstat -ano | findstr :8000` previously showed multiple LISTENING PIDs; page still loaded. If confusion occurs, kill extra python processes or change port.

## 7) Pending verification (do these after any compaction patch)

### 7.1 Smoke test (layout @ ~900px wide)

At ~900px viewport width:

1. **Generate button visible sooner** (less vertical scroll).
2. **Grade Level + Subject Area** are still side-by-side (2 columns).
3. Hidden copy buttons remain hidden until prompt generation.
4. `.info-btn` popovers still open/close and are tappable.
5. Help video `<details>` mounts/unmounts iframe and stops playback on close.
6. Quick Examples collapse behavior still matches intended breakpoints.

### 7.2 “Reliable JS parse check” (recommended)

Previous node-based checks were flaky/slow due to regex across the full HTML.

Recommended approach (fast + reliable): use a small **Python HTML parser** to extract inline `<script>` blocks and ask Node to parse each block with `new Function()`.

This repo now includes a helper script:

```bash
python scripts/check_js_syntax.py ai-prompt-library.html
```

It will:

- parse HTML and collect inline `<script>` blocks
- run Node parse check for each block
- report the first syntax error with the block index (and stop with a non-zero exit code)

If it prints `PASS`, the inline JS is syntactically valid.


## 8) Known pitfall / rule of thumb

Avoid writing CSS in JS blocks (and vice versa). The earlier `padding: 12px;` inserted into JS looked like CSS and caused a hard parse failure.

Avoid `!important` `display` rules in breakpoint CSS on shared `.btn` classes; it can override inline `display:none` and break conditional visibility.
