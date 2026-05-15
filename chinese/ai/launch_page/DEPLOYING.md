Deploying the Learning Hub

This page can run in two modes: static (no Node server needed) and server mode (Node.js + Passenger on cPanel). Use static mode if you only need a gallery; use server mode for auto-crawling and live metrics.

Static hosting (simple upload, no Node server)
- Upload to your web host folder: /lookangejss/chinese/ai/launch_page/
  - index.html
  - styles.css
  - app.js
  - manifest.json (generated locally; see below)
- Generate or refresh manifest.json locally at the project root:
  - node launch_page/build-manifest.js
- Re-upload manifest.json whenever you add/edit interactives so the live page updates.
- How links resolve on a static host:
  - Open buttons go directly to relPath (e.g., francesca/hawker.html)
  - Download buttons link directly to zipRelPath
  - The page computes a root prefix as the parent of launch_page/ so a relPath like francesca/hawker.html resolves to /lookangejss/chinese/ai/francesca/hawker.html
  - Ensure target files exist on the server under /lookangejss/chinese/ai/ in the same structure as your local folder
- Troubleshooting (static):
  - Grid empty → Network shows GET launch_page/manifest.json 404 → upload manifest.json
  - CSS/JS 404s → ensure index.html uses href="styles.css" and src="app.js". Re-upload and hard refresh (Ctrl+F5)
  - New content not appearing → rebuild and re-upload manifest.json and new files
- Notes (static):
  - Metrics are frozen values captured at build time; no live incrementing

Server mode on cPanel (Node.js + Passenger)
Purpose: auto-crawl the parent content folder and track views/downloads live via API endpoints.

Files to upload to /public_html/lookangejss/chinese/ai/launch_page/
- index.html, styles.css, app.js (client)
- server.js (Node server)
- package.json (declares main and start script)
- server_hello.js (tiny smoke-test server)
- metrics.json (optional; created automatically)

Folder layout on the server
/public_html/lookangejss/chinese/ai/
  francesca/
  liyan/
  Interactive_Chinese_Reader/
  好词好句练习-(idiom-practice-canvas)/
  launch_page/
    index.html
    app.js
    styles.css
    server.js
    server_hello.js
    package.json
    manifest.json (static fallback, optional)

Register the Node app in cPanel (Passenger)
1) Open cPanel → Application Manager → Edit the app with Base URL /lookangejss/chinese/ai/launch_page.
2) Set these values exactly:
   - Application Path (directory): /public_html/lookangejss/chinese/ai/launch_page
     (This must be the folder, not a file path.)
   - Startup file: server_hello.js
     (Type only the filename, no path; case-sensitive.)
   - Node.js version: 22 (nodejs22)
   - Environment: Production (optional)
   - Click Save/Update if shown, then Restart App. If there is a "Run NPM Install" button, you may click it once (no deps required).

Smoke test (verifies Passenger can launch anything)
- Visit: https://iwant2study.org/lookangejss/chinese/ai/launch_page/healthz
  Expected: HTTP 200 JSON like { ok: true, node: "v22.x", cwd: "…/launch_page" }
- Using File Manager, check a hello_boot.log file was created under launch_page/ (proves process booted)

Switch to the real server after smoke passes
- Change Startup file to: server.js (filename only) and Restart App
- Verify endpoints:
  - /api/manifest → 200 JSON { items: [...] }
  - /open?path=francesca/hawker.html → 302 redirect to /lookangejss/chinese/ai/francesca/hawker.html and views++
  - /download?zip=francesca/hawker.zip&id=francesca/hawker.html → ZIP response and downloads++
- UI check: https://iwant2study.org/lookangejss/chinese/ai/launch_page/ → DevTools Network shows api/manifest 200 (server mode)

Common Passenger misconfigurations
- Application Path set to a file (e.g., …/server.js) instead of the directory (…/launch_page)
- Startup file includes a path; must be just server.js or server_hello.js (filename only)
- Wrong filename case (Linux hosting is case-sensitive)
- App not restarted after changing settings
- Node version mismatch; use 18/20/22

If you still see "Web application could not be started"
- In Application Manager, click View Logs and search for the Error ID shown on the error page.
- Copy the first 20–30 lines of the stack from the application log and use it to fix the specific issue (or share that snippet with the maintainer for help).
