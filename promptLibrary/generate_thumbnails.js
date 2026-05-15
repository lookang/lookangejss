// generate_thumbnails.js
// Walk the repo, find every folder containing prompt.txt, map it to the relevant HTML file,
// and create a 320x180 PNG thumbnail (thumbnail_320x180.png) next to the prompt.txt.

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');

const THUMB_NAME = 'thumbnail_320x180.png';

function walkForPromptDirs(baseDir) {
  const promptDirs = [];

  function walk(dir) {
    // Skip heavy / irrelevant dirs
    const basename = path.basename(dir);
    if (['node_modules', '.git', 'Library', 'playwright-report'].includes(basename)) {
      return;
    }

    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (e) {
      return;
    }

    const hasPrompt = entries.some((ent) => !ent.isDirectory() && ent.name === 'prompt.txt');
    if (hasPrompt) {
      promptDirs.push(dir);
    }

    for (const ent of entries) {
      if (ent.isDirectory()) {
        walk(path.join(dir, ent.name));
      }
    }
  }

  walk(baseDir);
  return promptDirs;
}

function findHtmlForPromptDir(promptDir) {
  // 1. index.html in the same folder
  const indexPath = path.join(promptDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    return indexPath;
  }

  const dirName = path.basename(promptDir);
  const parentDir = path.dirname(promptDir);

  // 2. For *_files folders, try matching "BaseName.html" in the parent directory
  if (dirName.endsWith('_files')) {
    const base = dirName.slice(0, -'_files'.length);
    const candidate = path.join(parentDir, base + '.html');
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  // 3. If there is exactly one .html file in this folder, use it
  try {
    const htmls = fs
      .readdirSync(promptDir)
      .filter((name) => name.toLowerCase().endsWith('.html'));
    if (htmls.length === 1) {
      return path.join(promptDir, htmls[0]);
    }
  } catch (e) {
    // ignore
  }

  return null;
}

async function main() {
  const baseDir = process.cwd();
  console.log('Scanning for prompt.txt folders under', baseDir);

  const promptDirs = walkForPromptDirs(baseDir);
  console.log('Found', promptDirs.length, 'folders containing prompt.txt');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 320, height: 180 },
    deviceScaleFactor: 1,
  });

  let created = 0;
  let skippedExisting = 0;
  const noHtml = [];
  const errors = [];

  for (const dir of promptDirs) {
    const thumbPath = path.join(dir, THUMB_NAME);
    if (fs.existsSync(thumbPath)) {
      skippedExisting++;
      continue;
    }

    const htmlPath = findHtmlForPromptDir(dir);
    if (!htmlPath) {
      noHtml.push(dir);
      continue;
    }

    const fileUrl = pathToFileURL(htmlPath).href;
    const relDir = path.relative(baseDir, dir) || '.';
    console.log('Generating thumbnail for', relDir, 'from', path.relative(baseDir, htmlPath));

    const page = await context.newPage();
    try {
      await page.goto(fileUrl, { waitUntil: 'load', timeout: 30000 });
      // Small delay to allow layout / animations / fonts to settle
      await page.waitForTimeout(1000);
      await page.screenshot({ path: thumbPath, fullPage: false });
      created++;
    } catch (e) {
      console.error('Error generating thumbnail for', relDir, e.message);
      errors.push({ dir: relDir, error: e.message });
    } finally {
      await page.close();
    }
  }

  await browser.close();

  console.log('\nSummary:');
  console.log('  Thumbnails created:', created);
  console.log('  Folders skipped (thumbnail already existed):', skippedExisting);
  console.log('  Folders skipped (no HTML found):', noHtml.length);
  if (noHtml.length) {
    console.log('  No-HTML folders:');
    for (const d of noHtml) {
      console.log('   -', path.relative(baseDir, d));
    }
  }
  console.log('  Folders with errors:', errors.length);
  if (errors.length) {
    console.log('  Error details:');
    for (const { dir, error } of errors) {
      console.log('   -', dir, '=>', error);
    }
  }
}

main().catch((err) => {
  console.error('Fatal error in generate_thumbnails:', err);
  process.exit(1);
});
