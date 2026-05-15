# ECG Pathfinder

An interactive career guidance web application that leads students through a structured self-discovery journey — from understanding personal purpose to building a career mindmap and exploring purposeful pathways.

---

## Overview

The Pathfinder is a multi-step, single-page application (SPA) built with vanilla JavaScript and SCSS, bundled with Webpack. Student responses are persisted in `localStorage` between steps, and the completed journey can be exported as a PDF. The app ships a standalone offline/PWA build for use without internet access.

---

## User Journey

The app guides users through the following sequential steps:

| Step | Route | Description |
|------|-------|-------------|
| 1 | *(splash)* | Auto-advancing splash screen (5 s fade, then 3 s redirect) |
| 2 | `#intro` | Welcome screen — starts a 30-day session |
| 3 | `#discovering-purpose` | 3 self-reflection questions (100-char limit each) |
| 4 | `#setting-targets-1` | 3 target areas: Education, Wellbeing, Social (200-char each) |
| 5 | `#setting-targets-2` | Personal strengths statement (300-char) |
| 6 | `#explore-opportunities-1` | Drag-and-drop purpose statements into 3 drop zones |
| 7 | `#explore-opportunities-2` | Review selected purpose statements |
| 8 | `#brainstorming-new-possibilities` | Transition / reflection page |
| 9 | `#create-mind-map-selector` | Select one purpose statement for the mindmap |
| 10 | `#create-mind-map` | Fill 8 job-role nodes around a central purpose node |
| 11 | `#explore-multiple-pathways-1` | 3 action plans (200-char each) with example tips |
| 12 | `#explore-multiple-pathways-2` | 3 reflection cards (300-char each) |
| 13 | `#export-conclusion` | Download full PDF report or restart the session |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Language | Vanilla JavaScript (ES Modules) |
| Styling | SCSS → CSS (sass-loader) |
| Bundler | Webpack 5 |
| PDF export | html2pdf.js (html2canvas + jsPDF) |
| Fonts | Rubik (self-hosted, woff/woff2) |
| Dev server | webpack-dev-server |
| Static server | http-server (npm run dist) |
| Offline / PWA | workbox-webpack-plugin (auto-generated service worker + manifest) |

---

## Project Structure

```
ecg-pathfinder/
├── src/
│   ├── index.html                  # App shell — single <div id="app">
│   ├── manifest.webmanifest        # PWA install metadata (name, icons, theme)
│   ├── data/
│   │   └── data.json               # Application data
│   ├── pages/                      # HTML partials fetched by the router
│   │   ├── partials/
│   │   │   ├── header.html
│   │   │   └── footer.html
│   │   ├── intro.html
│   │   ├── discovering-purpose.html
│   │   ├── setting-targets-1.html
│   │   ├── setting-targets-2.html
│   │   ├── explore-opportunities-1.html
│   │   ├── explore-opportunities-2.html
│   │   ├── brainstorming-new-possibilities.html
│   │   ├── create-mind-map-selector.html
│   │   ├── create-mind-map.html
│   │   ├── explore-multiple-pathways-1.html
│   │   ├── explore-multiple-pathways-2.html
│   │   ├── export-conclusion.html
│   │   ├── export-file.html        # PDF export template (full report)
│   │   ├── export-file-mind-map.html  # PDF export template (mindmap page)
│   │   └── 404.html
│   ├── js/
│   │   ├── app.js                  # Entry point — imports SCSS and router
│   │   ├── router.js               # Hash-based SPA router
│   │   ├── common.js               # localStorage read/write helpers + PDF data generator
│   │   ├── data.js                 # Fetches data.json
│   │   ├── session.js              # 30-day session manager
│   │   ├── splash.js
│   │   ├── intro.js
│   │   ├── header.js               # Dynamic header loader (title, subtitle, nav image)
│   │   ├── footer.js
│   │   ├── mobile-detect.js        # window.isMobile / window.isTouchDevice helpers
│   │   ├── sw-register.js          # Registers the generated service worker
│   │   ├── discovering-purpose/index.js
│   │   ├── setting-targets-1/index.js
│   │   ├── setting-targets-2/index.js
│   │   ├── explore-opportunities-1/index.js
│   │   ├── explore-opportunities-2/index.js
│   │   ├── brainstorming-new-possibilities/index.js
│   │   ├── create-mind-map-selector/index.js
│   │   ├── create-mind-map/index.js
│   │   ├── explore-multiple-pathways-1/index.js
│   │   ├── explore-multiple-pathways-2/index.js
│   │   └── export-conclusion/index.js
│   ├── css/
│   │   ├── style.scss              # Global styles, variables, animations
│   │   ├── header-footer.scss
│   │   ├── export-file.scss        # PDF export template styles
│   │   ├── font/
│   │   │   ├── stylesheet.css
│   │   │   └── Rubik-*.woff/woff2  # Self-hosted Rubik font (all weights)
│   │   └── pages/                  # Per-page SCSS files
│   └── img/                        # Static image assets
├── dist/                           # Webpack build output (generated, PWA-ready)
│   ├── index.html
│   ├── manifest.webmanifest
│   ├── service-worker.js           # Generated by Workbox at build time
│   └── …                           # js/, css/, img/, data/, pages/, fonts
├── webpack.config.js
└── package.json
```

---

## Architecture

### Routing
The router (`src/js/router.js`) is hash-based. On every `hashchange` or `popstate`, it fetches the matching HTML partial into `<div id="app">`, then calls the corresponding JS module to initialise that page's interactivity.

```
URL hash  →  fetch HTML partial  →  inject into #app  →  run page module
```

Navigation is performed globally via `window.navigateTo(hash)` — a wrapper around `history.pushState` that triggers `handleLocation`.

### Data persistence
Every form answer is written to `localStorage` keyed by the page's `factorId` (e.g. `discovering-purpose`, `setting-targets-1`). The `common.js` helpers `saveAnswer` and `loadAnswer` handle reads and writes. Answers are pre-populated on page load, so the user can navigate back and forth without losing input.

### Session management
`session.js` records a session start timestamp in `localStorage`. Sessions expire after **30 days**. On the intro page, `SessionManager.validate()` is called; on the export page, `SessionManager.reset()` restarts it.

### PDF export
Both `export-conclusion` and `create-mind-map` use `html2pdf.js`. The flow is:

1. Fetch the export HTML template (e.g. `export-file.html`) into a hidden `#export-canvas` div.
2. Call `generateExportData()` (from `common.js`) to populate all answer placeholders from `localStorage`.
3. Render to PDF with `html2pdf().from(pdfContent).set(options).save()`.
4. After save, hide the canvas and reload the page.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or later
- npm (bundled with Node.js)

### Local development

```bash
npm install
npm run serve
# App available at http://localhost:9000
```

Webpack watches for changes and live-reloads.

### Production build

```bash
npm install
npm run build
# Output written to dist/
```

Serve the `dist/` folder from any static file server:

```bash
npm run dist
# Serves dist/ at http://localhost:8080
```

---

## Offline / PWA Build

The production build is PWA-ready out of the box — `npm run build` emits a service worker and web app manifest into `dist/` alongside the rest of the static assets.

What gets generated:

| File | Source | Role |
|------|--------|------|
| `dist/service-worker.js` | Generated by `workbox-webpack-plugin` (GenerateSW mode) | Precaches the app shell and runtime-caches pages, data, images, and fonts |
| `dist/manifest.webmanifest` | `src/manifest.webmanifest` | App name, icons, theme color, `display: standalone` |

Caching strategy (configured in `webpack.config.js`):

- **HTML & JSON** → `StaleWhileRevalidate` (offline fallback to last-known copy)
- **Images & video** → `CacheFirst` (30-day expiry)
- **Fonts** → `CacheFirst` (1-year expiry)
- **JS / CSS bundles** → precached at install time

Serving `dist/` over **HTTPS** (or `http://localhost`) is required for the service worker to register. Once installed, the app continues to work fully offline. On iOS, *Share → Add to Home Screen* in Safari installs it as a standalone app via the manifest.

---

## Security Notes

`npm audit` reports **9 residual advisories**, all transitive dependencies of `html2pdf.js`:

```
html2pdf.js → jspdf, canvg → xmldom, jsdom → request, tough-cookie, form-data, qs
```

These are **accepted risk** for this project. The reasoning:

- `html2pdf.js` is pinned to `github:eKoopmans/html2pdf.js#bugfix/clone-nodes-BUILD` for a specific PDF-rendering fix and ships with `jspdf@2.x`, which carries published CVEs. There is no semver-compatible fix (`npm audit fix` reports `fixAvailable: false` for the entire chain).
- All advisories are **client-side** vectors (XSS in PDF construction, ReDoS, XML injection) that require **attacker-controlled input** to exploit.
- In this app, the only input to the PDF pipeline is the user's own `localStorage` content — their own typed answers, limited to 100–300 characters per field. There is no URL-parameter, third-party content, or multi-tenant context flowing into the PDF generator.

If a future change introduces external/untrusted input into the PDF flow, the html2pdf.js dependency must be revisited (either bumped to a newer fork, or replaced with `html2canvas` + `jspdf@3` directly).

---

## Key Files Reference

| File | Role |
|------|------|
| `src/js/router.js` | Central router — maps hashes to HTML partials and JS modules |
| `src/js/common.js` | `saveAnswer`, `loadAnswer`, `generateExportData` |
| `src/js/session.js` | `SessionManager` — init, validate, reset, 30-day expiry |
| `src/js/header.js` | Fetches and injects header partial; sets title, subtitle, nav image |
| `src/css/style.scss` | Global variables (`$primary`, `$secondary`, `$text`, `$bg`), mixins, animations |
| `src/manifest.webmanifest` | PWA install metadata (name, icons, theme color, `display: standalone`) |
| `src/js/sw-register.js` | Registers `service-worker.js` after window load |
| `webpack.config.js` | Entry: `src/js/app.js`; output: `dist/`; SCSS / image / font loaders + Workbox SW generation |

---

## SCSS Variables (Global)

Defined in `src/css/style.scss`:

```scss
$text:           #333333;
$primary:        #007dbc;
$secondary:      #30458e;
$bg:             #f5fcff;
$bg-secondary:   #fafafa;
```

---

## localStorage Keys

| Key | Stored by | Content |
|-----|-----------|---------|
| `discovering-purpose` | discovering-purpose page | `{ answer-q1, answer-q2, answer-q3 }` |
| `setting-targets-1` | setting-targets-1 page | `{ answer-q1, answer-q2, answer-q3 }` |
| `setting-targets-2` | setting-targets-2 page | `{ answer-q1 }` |
| `explore-opportunities-1` | explore-opportunities-1 page | `{ answer-q1, answer-q2, answer-q3 }` |
| `brainstorming-new-possibilities` | brainstorming page | form answers |
| `create-mind-map` | create-mind-map page | `{ answer-q1 … answer-q8 }` |
| `create-mindmap-datastore` | create-mind-map-selector page | `{ mindmap-selected-purpose }` |
| `explore-multiple-pathways-1` | pathways-1 page | `{ answer-q1, answer-q2, answer-q3 }` |
| `explore-multiple-pathways-2` | pathways-2 page | `{ answer-q1, answer-q2, answer-q3 }` |
| `form-information` | common.js on save | `{ completion-date }` |
| `session_start_time` | session.js | Unix timestamp (ms) |
