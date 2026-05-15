// generate_thumbnails_sdcd2026.js
// Generate a 320x180 PNG thumbnail for each *.html in SDCDworkshop2026/
// and save it into the corresponding "*_files" folder, e.g.
//   SDCDworkshop2026/My Interactive.html
//   -> SDCDworkshop2026/My Interactive_files/thumbnail_320x180.png
//
// This follows the style used elsewhere in this repo (e.g. ACPcookout2025/*_files/thumbnail_320x180.png).

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');

const TARGET_DIR = path.join(process.cwd(), 'SDCDworkshop2026');
const THUMB_NAME = 'thumbnail_320x180.png';

function listRootHtmlFiles(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((ent) => ent.isFile() && ent.name.toLowerCase().endsWith('.html'))
    .map((ent) => path.join(dir, ent.name))
    .sort((a, b) => a.localeCompare(b));
}

function getFilesFolderForHtml(htmlPath) {
  const dir = path.dirname(htmlPath);
  const baseName = path.basename(htmlPath, path.extname(htmlPath));
  return path.join(dir, baseName + '_files');
}

async function main() {
  if (!fs.existsSync(TARGET_DIR)) {
    console.error('Target directory not found:', TARGET_DIR);
    process.exit(1);
  }

  const htmlFiles = listRootHtmlFiles(TARGET_DIR);
  console.log('Found', htmlFiles.length, 'HTML files under', TARGET_DIR);

  // Prefer system browsers (Edge/Chrome) so this works even if Playwright-managed
  // browser binaries haven't been downloaded yet.
  async function launchBrowser() {
    const candidates = [
      { label: 'msedge', options: { headless: true, channel: 'msedge' } },
      { label: 'chrome', options: { headless: true, channel: 'chrome' } },
      { label: 'chromium (playwright-managed)', options: { headless: true } },
    ];

    for (const c of candidates) {
      try {
        const b = await chromium.launch(c.options);
        console.log('Launched browser via:', c.label);
        return b;
      } catch (e) {
        console.warn('Failed to launch via', c.label, '-', e && e.message ? e.message : String(e));
      }
    }

    throw new Error(
      'Unable to launch any Chromium browser. Try installing browsers with: npx playwright install chromium'
    );
  }

  const browser = await launchBrowser();
  const context = await browser.newContext({
    viewport: { width: 320, height: 180 },
    deviceScaleFactor: 1,
  });

  let created = 0;
  let skippedExisting = 0;
  const missingFilesFolder = [];
  const errors = [];

  for (const htmlPath of htmlFiles) {
    const filesFolder = getFilesFolderForHtml(htmlPath);
    const thumbPath = path.join(filesFolder, THUMB_NAME);

    if (!fs.existsSync(filesFolder)) {
      missingFilesFolder.push(path.relative(process.cwd(), filesFolder));
      continue;
    }

    if (fs.existsSync(thumbPath)) {
      skippedExisting++;
      continue;
    }

    const page = await context.newPage();
    try {
      const fileUrl = pathToFileURL(htmlPath).href;
      console.log('Generating thumbnail for', path.relative(process.cwd(), htmlPath));

      await page.goto(fileUrl, { waitUntil: 'load', timeout: 45000 });

      // Hide attribution footer (we added it) so thumbnails focus on the interactive UI.
      await page.addStyleTag({ content: '#aiz-footer{display:none!important;}' });

      // Small delay to allow layout / fonts / first render to settle.
      await page.waitForTimeout(1200);
      await page.screenshot({ path: thumbPath, fullPage: false });
      created++;
    } catch (e) {
      errors.push({
        html: path.relative(process.cwd(), htmlPath),
        error: e && e.message ? e.message : String(e),
      });
      console.error('Error:', path.relative(process.cwd(), htmlPath), '=>', errors[errors.length - 1].error);
    } finally {
      await page.close();
    }
  }

  await browser.close();

  console.log('\nSummary:');
  console.log('  Thumbnails created:', created);
  console.log('  Skipped (already existed):', skippedExisting);
  console.log('  Missing *_files folder:', missingFilesFolder.length);
  if (missingFilesFolder.length) {
    for (const f of missingFilesFolder) console.log('   -', f);
  }
  console.log('  Errors:', errors.length);
  if (errors.length) {
    for (const e of errors) console.log('   -', e.html, '=>', e.error);
  }

  // Exit non-zero only if there are unexpected problems
  if (errors.length) process.exitCode = 2;
}

main().catch((err) => {
  console.error('Fatal error in generate_thumbnails_sdcd2026:', err);
  process.exit(1);
});
