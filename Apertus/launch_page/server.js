// Simple zero-dependency learning hub server for listing and tracking interactives
// Works both locally and when mounted under a subfolder by Passenger/cPanel

const http = require('http');
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');
// Using WHATWG URL API (no url.parse)

const PORT = process.env.PORT ? Number(process.env.PORT) : 3030;

// Resolve directories based on where the app is started from
// If the app root IS the launch_page folder, scan content one level up
const baseDir = path.resolve(process.cwd());
const looksLikeHubRoot = fs.existsSync(path.join(baseDir, 'index.html')) && path.basename(baseDir) === 'launch_page';
const hubDir = looksLikeHubRoot ? baseDir : path.join(baseDir, 'launch_page');
const contentRoot = looksLikeHubRoot ? path.dirname(baseDir) : baseDir;
const metricsPath = path.join(hubDir, 'metrics.json');

// Ensure hubDir exists
if (!fs.existsSync(hubDir)) {
  fs.mkdirSync(hubDir, { recursive: true });
}

function loadJSONSafe(filePath, fallback) {
  try {
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(raw || '{}');
    }
  } catch (e) {
    console.error('Failed to read JSON', filePath, e);
  }
  return fallback;
}

let metrics = loadJSONSafe(metricsPath, {});

async function saveMetrics() {
  try {
    await fsp.writeFile(metricsPath, JSON.stringify(metrics, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to save metrics', e);
  }
}

function withinBase(resolved) {
  const rel = path.relative(contentRoot, resolved);
  return !!rel && !rel.startsWith('..') && !path.isAbsolute(rel);
}

function sanitizeTitle(str) {
  return (str || '')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b([a-z])/g, (m, c) => c.toUpperCase());
}

function isExcludedDir(dirName) {
  const lower = dirName.toLowerCase();
  // Exclude common dependency/viewer/build folders from scanning
  return (
    lower === 'node_modules' ||
    lower === 'launch_page' ||
    lower === '.git' ||
    lower === 'build' ||
    lower === 'dist' ||
    lower === 'web'
  );
}

async function readTitleFromHTML(filePath) {
  try {
    const buf = await fsp.readFile(filePath, 'utf8');
    const m = buf.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    if (m) {
      return m[1].replace(/\s+/g, ' ').trim();
    }
  } catch {}
  return null;
}

async function listDirSafe(dir) {
  try {
    return await fsp.readdir(dir, { withFileTypes: true });
  } catch {
    return [];
  }
}

async function statSafe(p) {
  try {
    return await fsp.stat(p);
  } catch {
    return null;
  }
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
        // Heuristics: include index.html anywhere up to depth 2, and other .html only if at depth <= 1
        const include = (fileName === 'index.html') || (depth <= 1);
        // Also exclude viewer.html (common in pdf.js bundles)
        const notViewer = fileName !== 'viewer.html';
        if (include && notViewer) {
          results.push(full);
        }
      }
    }
  }

  await walk(contentRoot, 0);
  return results;
}

async function findZipForInteractive(htmlPath) {
  const dir = path.dirname(htmlPath);
  const base = path.basename(htmlPath, '.html');
  // Prefer a zip with the same base name in the same directory (for non-index files)
  if (path.basename(htmlPath).toLowerCase() !== 'index.html') {
    const candidate = path.join(dir, `${base}.zip`);
    if (fs.existsSync(candidate)) return candidate;
  }
  // If index.html inside a folder, try a zip named after the folder either in same dir or root
  if (path.basename(htmlPath).toLowerCase() === 'index.html') {
    const folder = path.basename(dir);
    const sameDirZip = path.join(dir, `${folder}.zip`);
    if (fs.existsSync(sameDirZip)) return sameDirZip;
    const rootZip = path.join(contentRoot, `${folder}.zip`);
    if (fs.existsSync(rootZip)) return rootZip;
  }
  // Also try a zip matching the exact html base name at root
  const rootHtmlNamedZip = path.join(contentRoot, `${base}.zip`);
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
    const relPath = path.relative(contentRoot, abs).replace(/\\/g, '/');
    const st = await statSafe(abs);
    const parent = path.dirname(relPath).replace(/\\/g, '/');
    const fileName = path.basename(abs);
    let title = await readTitleFromHTML(abs);
    if (!title) {
      if (fileName.toLowerCase() === 'index.html') {
        title = sanitizeTitle(path.basename(path.dirname(abs)));
      } else {
        title = sanitizeTitle(path.basename(abs, '.html'));
      }
    }
    const zipAbs = await findZipForInteractive(abs);
    let zipRel = null;
    let zipSize = null;
    const thumbAbs = await findThumbnailForInteractive(abs);
    let thumbRel = null;
    if (zipAbs) {
      zipRel = path.relative(contentRoot, zipAbs).replace(/\\/g, '/');
      const zst = await statSafe(zipAbs);
      if (zst) zipSize = zst.size;
    }
    if (thumbAbs) {
      thumbRel = path.relative(contentRoot, thumbAbs).replace(/\\/g, '/');
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
  // Sort by title ascending by default
  items.sort((a, b) => a.title.localeCompare(b.title, 'en'));
  return items;
}

function sendJSON(res, obj) {
  const data = JSON.stringify(obj);
  res.writeHead(200, { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) });
  res.end(data);
}

function send404(res, message = 'Not Found') {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end(message);
}

function send400(res, message = 'Bad Request') {
  res.writeHead(400, { 'Content-Type': 'text/plain' });
  res.end(message);
}

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.json': 'application/json; charset=utf-8',
  '.zip': 'application/zip',
  '.mp3': 'audio/mpeg',
  '.pdf': 'application/pdf'
};

function serveFile(res, absPath, asDownloadName = null) {
  fs.stat(absPath, (err, st) => {
    if (err || !st.isFile()) {
      return send404(res);
    }
    const ext = path.extname(absPath).toLowerCase();
    const headers = { 'Content-Type': mime[ext] || 'application/octet-stream' };
    if (asDownloadName) {
      headers['Content-Disposition'] = `attachment; filename="${asDownloadName}"`;
    }
    res.writeHead(200, headers);
    fs.createReadStream(absPath).pipe(res);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const parsedUrl = new URL(req.url, 'http://localhost');
    const pathname = decodeURIComponent(parsedUrl.pathname || '/');
    const matchPath = (p) => pathname === p || pathname.endsWith('/launch_page' + p);

    // API: manifest
    if (matchPath('/api/manifest')) {
      const items = await buildManifest();
      return sendJSON(res, { items });
    }

    // API: track view explicitly (optional)
    if (matchPath('/api/track-view') && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', async () => {
        try {
          const data = JSON.parse(body || '{}');
          const id = data.id;
          if (!id) return send400(res, 'Missing id');
          metrics[id] = metrics[id] || { views: 0, downloads: 0 };
          metrics[id].views++;
          await saveMetrics();
          sendJSON(res, { ok: true, views: metrics[id].views });
        } catch (e) {
          return send400(res, 'Invalid JSON');
        }
      });
      return;
    }

    // Open: increment views and redirect to the interactive under the content base path
    if (matchPath('/open')) {
      const relPath = parsedUrl.searchParams.get('path');
      const id = toId(relPath || '');
      if (!relPath) return send400(res, 'Missing path');
      const abs = path.resolve(contentRoot, relPath);
      if (!withinBase(abs) || !fs.existsSync(abs)) return send404(res);
      metrics[id] = metrics[id] || { views: 0, downloads: 0 };
      metrics[id].views++;
      await saveMetrics();
      // Compute mount base: strip trailing segment from current path and then remove 'launch_page/'
      let base = pathname.replace(/[^/]*$/, ''); // ensure it ends with '/'
      const m = base.match(/^(.*\/)launch_page\/$/);
      const contentBase = m ? m[1] : '/';
      const redirectTo = contentBase + relPath.replace(/\\/g, '/');
      res.writeHead(302, { Location: redirectTo });
      return res.end();
    }

    // Download: increment downloads and stream the zip
    if (matchPath('/download')) {
      const relZip = parsedUrl.searchParams.get('zip');
      const id = parsedUrl.searchParams.get('id') ? String(parsedUrl.searchParams.get('id')) : null;
      if (!relZip || !id) return send400(res, 'Missing zip or id');
      const absZip = path.resolve(contentRoot, relZip);
      if (!withinBase(absZip) || !fs.existsSync(absZip)) return send404(res);
      metrics[id] = metrics[id] || { views: 0, downloads: 0 };
      metrics[id].downloads++;
      await saveMetrics();
      const downloadName = path.basename(absZip);
      return serveFile(res, absZip, downloadName);
    }

    // Health check
    if (matchPath('/healthz')) {
      return sendJSON(res, { ok: true, hubDir, contentRoot });
    }

    // Serve the learning hub UI at the app mount root
    if (pathname === '/' || pathname.endsWith('/index.html') || pathname.endsWith('/launch_page/')) {
      const indexPath = path.join(hubDir, 'index.html');
      return serveFile(res, indexPath);
    }

    // Serve hub static assets (support both direct and prefixed paths)
    if (
      pathname.endsWith('/styles.css') || pathname.endsWith('/app.js') || pathname.endsWith('/manifest.json') ||
      pathname.endsWith('/launch_page/styles.css') || pathname.endsWith('/launch_page/app.js') || pathname.endsWith('/launch_page/manifest.json')
    ) {
      const fileName = pathname.split('/').pop();
      const abs = path.join(hubDir, fileName);
      return serveFile(res, abs);
    }

    // Serve any static file under contentRoot (so interactives work)
    const abs = path.resolve(contentRoot, '.' + pathname);
    if (!withinBase(abs)) return send404(res);
    return serveFile(res, abs);
  } catch (e) {
    console.error('Server error', e);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`Learning Hub server running on port ${PORT}`);
});
