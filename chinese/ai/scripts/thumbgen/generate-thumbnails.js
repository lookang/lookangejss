// Generate 320x180 thumbnails and package zips for interactives
// Usage: from project root: npm --prefix scripts/thumbgen run gen
// Requirements: a local server serving the project root at http://localhost:3030/
// (we already have learning-hub/server.js for this)

import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve project root (two levels up from scripts/thumbgen)
const projectRoot = path.resolve(__dirname, '..', '..');
const baseURL = process.env.BASE_URL || 'http://localhost:3030/';

function log(...args){ console.log('[thumbgen]', ...args); }

async function listDirSafe(dir){ try { return await fsp.readdir(dir, { withFileTypes: true }); } catch { return []; } }
async function statSafe(p){ try { return await fsp.stat(p); } catch { return null; } }

function isExcludedDir(name){
  const lower = name.toLowerCase();
  return lower === 'node_modules' || lower === '.git' || lower === 'dist' || lower === 'build' || lower === 'web' || lower === 'learning-hub' || lower === 'launch_page' || lower === 'scripts';
}

async function walkHTML(){
  const results = [];
  async function walk(current, depth){
    if (depth > 2) return;
    const entries = await listDirSafe(current);
    for (const entry of entries){
      const full = path.join(current, entry.name);
      if (entry.isDirectory()){
        if (isExcludedDir(entry.name)) continue;
        await walk(full, depth+1);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')){
        const fn = entry.name.toLowerCase();
        if (fn === 'viewer.html') continue;
        const include = fn === 'index.html' || depth <= 1;
        if (include) results.push(full);
      }
    }
  }
  await walk(projectRoot, 0);
  return results;
}

function computeSimPaths(htmlAbs){
  const htmlRel = path.relative(projectRoot, htmlAbs).replace(/\\/g, '/');
  const dir = path.dirname(htmlAbs);
  const file = path.basename(htmlAbs);
  let simName, simDir, indexAbs;
  if (file.toLowerCase() === 'index.html'){
    simName = path.basename(dir);
    simDir = dir;
    indexAbs = htmlAbs;
  } else {
    simName = path.basename(htmlAbs, '.html');
    simDir = path.join(dir, simName);
    indexAbs = path.join(simDir, 'index.html');
  }
  const thumbPath = path.join(simDir, 'thumbnail.png');
  const infoPath = path.join(simDir, 'info.txt');
  const zipDest = path.join(dir, `${simName}.zip`);
  return { htmlAbs, htmlRel, simName, simDir, indexAbs, thumbPath, infoPath, zipDest };
}

async function ensureSimFolderAndIndex(paths){
  const { htmlAbs, simDir, indexAbs } = paths;
  const htmlName = path.basename(htmlAbs).toLowerCase();
  if (htmlName === 'index.html'){
    await fsp.mkdir(simDir, { recursive: true });
    return;
  }
  // Create folder and copy single HTML to index.html if needed
  await fsp.mkdir(simDir, { recursive: true });
  const exists = await statSafe(indexAbs);
  if (!exists){
    await fsp.copyFile(htmlAbs, indexAbs);
  }
}

async function takeThumbnail(browser, url, thumbPath){
  const page = await browser.newPage();
  await page.setViewport({ width: 320, height: 180, deviceScaleFactor: 1 });
  try {
    await page.goto(url, { waitUntil: ['domcontentloaded', 'networkidle0'], timeout: 45000 });
  } catch (e) {
    // Some pages may never reach networkidle; fallback to domcontentloaded
    try { await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }); } catch {}
  }
  await new Promise(r => setTimeout(r, 1200));
  await fsp.mkdir(path.dirname(thumbPath), { recursive: true });
  await page.screenshot({ path: thumbPath, type: 'png' });
  await page.close();
}

async function writeInfo(paths){
  const { infoPath, htmlRel } = paths;
  const content = `Title: ${path.basename(infoPath, '.txt')}\nSource: ${htmlRel}\nGenerated: ${new Date().toISOString()}\nThumbnail: thumbnail.png (320x180)\n`;
  await fsp.writeFile(infoPath, content, 'utf8');
}

async function zipFolderContents(simDir, zipDest){
  await new Promise((resolve, reject) => {
    const output = fs.createWriteStream(zipDest);
    const archive = archiver('zip', { zlib: { level: 9 } });
    output.on('close', resolve);
    archive.on('error', reject);
    archive.pipe(output);
    // Add the folder contents (not the folder itself) so unzip has index.html at the root
    archive.directory(simDir + '/', false);
    archive.finalize();
  });
}

async function main(){
  log('Scanning for interactives...');
  const htmlFiles = await walkHTML();
  log('Found', htmlFiles.length, 'HTML entries');

  const browser = await puppeteer.launch({ headless: true });
  let generated = 0;
  for (const htmlAbs of htmlFiles){
    const P = computeSimPaths(htmlAbs);
    const url = new URL(P.htmlRel, baseURL).toString();

    await ensureSimFolderAndIndex(P);

    const needThumb = !(await statSafe(P.thumbPath));
    if (needThumb){
      log('Thumbnail:', P.thumbPath);
      await takeThumbnail(browser, url, P.thumbPath);
      await writeInfo(P);
      generated++;
    } else {
      log('Exists:', P.thumbPath);
    }

    // Always (re)make zip to ensure packaging rule
    await zipFolderContents(P.simDir, P.zipDest);
    log('Zipped →', path.relative(projectRoot, P.zipDest));
  }
  await browser.close();
  log('Done. Thumbnails generated:', generated);
}

main().catch(e => { console.error(e); process.exit(1); });
