# Deployment Instructions for iwant2study.org/lookangejss/appBuilder/

## Problem Solved
Your app wasn't showing because the build was configured for root deployment (`/`) instead of the subdirectory `/lookangejss/appBuilder/`. The 404 errors occurred because the browser was looking for:
- `/index.css` instead of `/lookangejss/appBuilder/index.css`
- `/assets/index-DmXyQGhu.js` instead of `/lookangejss/appBuilder/assets/index-DmXyQGhu.js`

## What Was Fixed
1. Updated `vite.config.ts` to set `base: '/lookangejss/appBuilder/'`
2. Rebuilt the application with the correct base path
3. All asset paths in `dist/index.html` now correctly point to `/lookangejss/appBuilder/`

## Files to Upload
Upload the entire contents of the `dist` folder to your server at `/lookangejss/appBuilder/`:

```
dist/
├── index.html
├── index.css
├── assets/
│   └── index-sa5xvFOG.js
└── 03 html5-dynamic-input-score-is-text-field/
    ├── index.html
    ├── index.js
    └── xapiwrapper.min.js
```

## Upload Instructions
1. Delete all existing files in `/lookangejss/appBuilder/` on your server
2. Upload all files from the `dist` folder, maintaining the folder structure:
   - `dist/index.html` → `/lookangejss/appBuilder/index.html`
   - `dist/index.css` → `/lookangejss/appBuilder/index.css`
   - `dist/assets/index-sa5xvFOG.js` → `/lookangejss/appBuilder/assets/index-sa5xvFOG.js`
   - `dist/03 html5-dynamic-input-score-is-text-field/` → `/lookangejss/appBuilder/03 html5-dynamic-input-score-is-text-field/`

## Important Notes
- The JavaScript file name has changed from `index-DmXyQGhu.js` to `index-sa5xvFOG.js` (this is normal - Vite generates new hashes on each build)
- Make sure to upload the `assets` folder with the new JavaScript file
- The app should now load correctly at https://iwant2study.org/lookangejss/appBuilder/

## For Future Builds
Whenever you need to rebuild the application:
1. Run `npm run build`
2. Upload the entire `dist` folder contents to your server

The base path is now permanently configured in `vite.config.ts`, so all future builds will have the correct paths.
