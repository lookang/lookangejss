// Build a static manifest.json for launch_page to use on static hosting
// Usage: node launch_page/build-manifest.js
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

const baseDir = path.resolve(process.cwd());
const hubDir = path.join(baseDir, 'launch_page');
const metricsPath = path.join(hubDir, 'metrics.json');

function loadJSONSafe(p, fallback) {
  try { if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, 'utf8') || 'null') || fallback; } catch(e) {}
  return fallback;
}

let metrics = loadJSONSafe(metricsPath, {});

function sanitizeTitle(str) {
  return (str || '')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b([a-z])/g, (m, c) => c.toUpperCase());
}

function isExcludedDir(dirName) {
  const lower = dirName.toLowerCase();
  return (
    lower === 'node_modules' ||
    lower === 'launch_page' ||
    lower === '.git' ||
    lower === 'build' ||
    lower === 'dist' ||
    lower === 'web'
  );
}

async function listDirSafe(dir) {
  try { return await fsp.readdir(dir, { withFileTypes: true }); } catch { return []; }
}
async function statSafe(p) {
  try { return await fsp.stat(p); } catch { return null; }
}

async function readTitleFromHTML(filePath) {
  try {
    const buf = await fsp.readFile(filePath, 'utf8');
    const m = buf.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    if (m) return m[1].replace(/\s+/g, ' ').trim();
  } catch {}
  return null;
}

async function walkForInteractives() {
  const results = [];
  async function walk(currentDir, depth) {
    if (depth > 2) return;
    const entries = await listDirSafe(currentDir);
    for (const entry of entries) {
      const full = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        if (isExcludedDir(entry.name)) continue;
        await walk(full, depth + 1);
      } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.html')) {
        const fileName = entry.name.toLowerCase();
        const include = (fileName === 'index.html') || (depth <= 1);
        const notViewer = fileName !== 'viewer.html';
        if (include && notViewer) results.push(full);
      }
    }
  }
  await walk(baseDir, 0);
  return results;
}

async function findZipForInteractive(htmlPath) {
  const dir = path.dirname(htmlPath);
  const base = path.basename(htmlPath, '.html');
  if (path.basename(htmlPath).toLowerCase() !== 'index.html') {
    const candidate = path.join(dir, `${base}.zip`);
    if (fs.existsSync(candidate)) return candidate;
  }
  if (path.basename(htmlPath).toLowerCase() === 'index.html') {
    const folder = path.basename(dir);
    const sameDirZip = path.join(dir, `${folder}.zip`);
    if (fs.existsSync(sameDirZip)) return sameDirZip;
    const rootZip = path.join(baseDir, `${folder}.zip`);
    if (fs.existsSync(rootZip)) return rootZip;
  }
  const rootHtmlNamedZip = path.join(baseDir, `${base}.zip`);
  if (fs.existsSync(rootHtmlNamedZip)) return rootHtmlNamedZip;
  return null;
}

async function findThumbnailForInteractive(htmlPath) {
  const dir = path.dirname(htmlPath);
  const candidates = ['thumbnail.png', 'thumbnail.jpg', 'thumbnail.jpeg', 'thumbnail.webp'];
  for (const name of candidates) {
    const p = path.join(dir, name);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function toId(relPath) {
  return relPath.replace(/[^a-zA-Z0-9/_.-]/g, '_');
}

async function buildManifest() {
  const htmlFiles = await walkForInteractives();
  const items = [];
  for (const abs of htmlFiles) {
    const relPath = path.relative(baseDir, abs).replace(/\\/g, '/');
    const st = await statSafe(abs);
    const parent = path.dirname(relPath).replace(/\\/g, '/');
    const fileName = path.basename(abs);
    let title = await readTitleFromHTML(abs);
    if (!title) {
      title = fileName.toLowerCase() === 'index.html'
        ? sanitizeTitle(path.basename(path.dirname(abs)))
        : sanitizeTitle(path.basename(abs, '.html'));
    }
    const zipAbs = await findZipForInteractive(abs);
    let zipRel = null, zipSize = null;
    const thumbAbs = await findThumbnailForInteractive(abs);
    let thumbRel = null;
    if (zipAbs) {
      zipRel = path.relative(baseDir, zipAbs).replace(/\\/g, '/');
      const zst = await statSafe(zipAbs);
      if (zst) zipSize = zst.size;
    }
    if (thumbAbs) {
      thumbRel = path.relative(baseDir, thumbAbs).replace(/\\/g, '/');
    }
    const id = toId(relPath);
    const m = metrics[id] || { views: 0, downloads: 0 };
    items.push({
      id,
      title,
      relPath,
      parent,
      hasZip: !!zipRel,
      zipRelPath: zipRel,
      zipSize,
      thumbnailRelPath: thumbRel,
      lastModified: st ? st.mtimeMs : null,
      views: m.views || 0,
      downloads: m.downloads || 0,
      type: fileName.toLowerCase() === 'index.html' ? 'Folder Index' : 'Single HTML'
    });
  }
  items.sort((a,b)=> (a.title||'').localeCompare(b.title||'', 'en'));
  return { items };
}

(async () => {
  try {
    const manifest = await buildManifest();
    const outPath = path.join(hubDir, 'manifest.json');
    await fsp.writeFile(outPath, JSON.stringify(manifest, null, 2), 'utf8');
    console.log('Wrote', outPath, 'with', manifest.items.length, 'items');
  } catch (e) {
    console.error('Failed to build manifest:', e);
    process.exit(1);
  }
})();
