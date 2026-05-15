# Deployment Steps for iwant2study.org

## Current Issue
Your app is currently accessible at:
- https://iwant2study.org/lookangejss/appBuilder/dist/#/

But it should be at:
- https://iwant2study.org/lookangejss/appBuilder/

## Correct Deployment Structure

### ❌ WRONG (Current):
```
/lookangejss/appBuilder/
├── dist/
│   ├── index.html
│   ├── index.css
│   └── assets/
│       └── index-sa5xvFOG.js
```

### ✅ CORRECT (Should be):
```
/lookangejss/appBuilder/
├── index.html
├── index.css
└── assets/
    └── index-sa5xvFOG.js
```

## Manual Deployment Steps

1. **Delete everything** in `/lookangejss/appBuilder/` on your server

2. **Upload ONLY the contents** of the `dist` folder (not the folder itself):
   - Upload `dist/index.html` → `/lookangejss/appBuilder/index.html`
   - Upload `dist/index.css` → `/lookangejss/appBuilder/index.css`
   - Upload `dist/assets/` folder → `/lookangejss/appBuilder/assets/`
   - Upload `dist/03 html5-dynamic-input-score-is-text-field/` → `/lookangejss/appBuilder/03 html5-dynamic-input-score-is-text-field/`

3. **Verify** the app loads at: https://iwant2study.org/lookangejss/appBuilder/

## Using FTP/File Manager

If using cPanel File Manager or FTP:
1. Navigate to `/lookangejss/appBuilder/`
2. Delete all existing files
3. Upload the contents of your local `dist` folder
4. Do NOT create a `dist` subfolder on the server

## Important Notes

- The `dist` folder is your BUILD OUTPUT folder locally
- Its CONTENTS should go directly into `/lookangejss/appBuilder/` on the server
- Do NOT upload the `dist` folder itself, only what's inside it
- After correct deployment, the URL should be: https://iwant2study.org/lookangejss/appBuilder/ (without `/dist/`)

## Quick Check
After deployment, these URLs should work:
- ✅ https://iwant2study.org/lookangejss/appBuilder/index.html
- ✅ https://iwant2study.org/lookangejss/appBuilder/index.css
- ✅ https://iwant2study.org/lookangejss/appBuilder/assets/index-sa5xvFOG.js

These should NOT exist:
- ❌ https://iwant2study.org/lookangejss/appBuilder/dist/index.html
