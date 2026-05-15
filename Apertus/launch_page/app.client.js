const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

const state = {
  all: [],
  filtered: [],
  search: '',
  folder: '',
  sortBy: 'title',
  type: '',
  hasZipOnly: false,
  hasServer: false, // true when /api/manifest is available
};

function humanBytes(n) {
  if (!n && n !== 0) return '—';
  const units = ['B','KB','MB','GB','TB'];
  let idx = 0, v = n;
  while (v >= 1024 && idx < units.length - 1) { v /= 1024; idx++; }
  return `${v.toFixed(v >= 10 || idx === 0 ? 0 : 1)} ${units[idx]}`;
}

function humanDate(ms) {
  if (!ms) return '—';
  const d = new Date(ms);
  return d.toLocaleString();
}

// Guard against obviously incorrect sizes (e.g., OneDrive placeholder reports)
function isUnrealisticSize(n) {
  // Hide sizes above 20 GB as likely incorrect for classroom interactives
  return typeof n === 'number' && n > 20 * 1024 * 1024 * 1024;
}

function updateGlobalStats(items) {
  const total = items.length;
  const views = items.reduce((a, b) => a + (b.views || 0), 0);
  const downloads = items.reduce((a, b) => a + (b.downloads || 0), 0);
  $('#stat-count').textContent = total.toString();
  $('#stat-views').textContent = views.toString();
  $('#stat-downloads').textContent = downloads.toString();
}

function buildFolderFilter(items) {
  const select = $('#folderFilter');
  const folders = new Set(items.map(x => x.parent || ''));
  const sorted = Array.from(folders).filter(Boolean).sort((a,b)=>a.localeCompare(b));
  for (const f of sorted) {
    const opt = document.createElement('option');
    opt.value = f;
    const parts = f.split('/');
    opt.textContent = parts[parts.length - 1];
    select.appendChild(opt);
  }
}

function applyFilters() {
  const s = state.search.trim().toLowerCase();
  let items = state.all.slice();
  if (s) {
    items = items.filter(it =>
      (it.title || '').toLowerCase().includes(s) ||
      (it.parent || '').toLowerCase().includes(s)
    );
  }
  if (state.folder) items = items.filter(it => it.parent === state.folder);
  if (state.type) items = items.filter(it => it.type === state.type);
  if (state.hasZipOnly) items = items.filter(it => it.hasZip);

  switch (state.sortBy) {
    case 'modified':
      items.sort((a,b)=> (b.lastModified||0) - (a.lastModified||0));
      break;
    case 'views':
      items.sort((a,b)=> (b.views||0) - (a.views||0));
      break;
    case 'downloads':
      items.sort((a,b)=> (b.downloads||0) - (a.downloads||0));
      break;
    default:
      items.sort((a,b)=> (a.title||'').localeCompare(b.title||'', 'en'));
  }
  state.filtered = items;
  renderGrid();
}

function renderGrid() {
  const grid = $('#grid');
  grid.innerHTML = '';
  const tmpl = $('#card-template');
  if (state.filtered.length === 0) {
    const div = document.createElement('div');
    div.style.color = '#a9b1d6';
    div.style.padding = '16px';
    div.textContent = 'No results. Try adjusting your search or filters.';
    grid.appendChild(div);
    return;
  }

  // Compute paths relative to current location so app works under a subfolder
  // rootPrefix points one level up from launch_page/ for static assets
  let rootPrefix = '/';
  try {
    const up = new URL('..', window.location.href);
    rootPrefix = up.pathname.endsWith('/') ? up.pathname : up.pathname + '/';
  } catch {}
  // appBase is the folder containing index.html (usually .../launch_page/)
  let appBase = '/';
  try {
    const base = new URL('.', window.location.href);
    appBase = base.pathname.endsWith('/') ? base.pathname : base.pathname + '/';
  } catch {}

  for (const it of state.filtered) {
    const node = tmpl.content.firstElementChild.cloneNode(true);
    const type = node.querySelector('.badge.type');
    const folder = node.querySelector('.badge.folder');
    const title = node.querySelector('.title');
    const views = node.querySelector('.views');
    const downloads = node.querySelector('.downloads');
    const modified = node.querySelector('.modified');
    const zipMeta = node.querySelector('.meta-item.zip');
    const zipSize = node.querySelector('.zip-size');
    const thumb = node.querySelector('.thumb');
    const thumbImg = node.querySelector('.thumb img');
    const openBtn = node.querySelector('.btn.open');
    const dlBtn = node.querySelector('.btn.download');

    type.dataset.type = it.type;
    type.textContent = it.type;
    folder.textContent = it.parent ? it.parent.split('/').slice(-1)[0] : '—';
    title.textContent = it.title || '(Untitled)';
    views.textContent = (it.views || 0).toString();
    downloads.textContent = (it.downloads || 0).toString();
    modified.textContent = humanDate(it.lastModified);

    // Thumbnail image if available
    if (thumbImg) {
      // Hide on error
      if (thumb) thumbImg.onerror = () => { thumb.style.display = 'none'; };
      if (it.thumbnailRelPath) {
        thumbImg.src = rootPrefix + it.thumbnailRelPath;
      } else {
        // Fallback: try common thumbnail names next to the HTML file
        const baseDir = (it.relPath || '').split('/').slice(0, -1).join('/');
        const candidates = ['thumbnail.png','thumbnail.jpg','thumbnail.jpeg','thumbnail.webp'];
        for (const name of candidates) {
          const p = rootPrefix + baseDir + '/' + name;
          const img = new Image();
          img.onload = () => { thumbImg.src = p; };
          img.onerror = () => {};
          img.src = p;
        }
      }
    }

    if (it.hasZip && it.zipRelPath) {
      dlBtn.hidden = false;
      dlBtn.href = state.hasServer
        ? appBase + `download?zip=${encodeURIComponent(it.zipRelPath)}&id=${encodeURIComponent(it.id)}`
        : rootPrefix + it.zipRelPath;
      if (it.zipSize && !isUnrealisticSize(it.zipSize)) {
        zipMeta.hidden = false;
        zipSize.textContent = humanBytes(it.zipSize);
      } else {
        // Hide unrealistic or unknown sizes to avoid confusing numbers
        zipMeta.hidden = true;
      }
    } else {
      zipMeta.hidden = true;
      dlBtn.hidden = true;
    }

    openBtn.href = state.hasServer
      ? appBase + `open?path=${encodeURIComponent(it.relPath)}`
      : rootPrefix + it.relPath;

    grid.appendChild(node);
  }
}

async function load() {
  $('#year').textContent = String(new Date().getFullYear());
  let data = null;
  try {
    const appBase = new URL('.', window.location.href).pathname;
    const res = await fetch(appBase + 'api/manifest');
    if (res.ok) {
      state.hasServer = true;
      data = await res.json();
    }
  } catch {}

  if (!data) {
    // Fallback for static hosting
    try {
      const res2 = await fetch('manifest.json', { cache: 'no-cache' });
      if (res2.ok) {
        data = await res2.json();
      }
    } catch {}
  }

  if (data && Array.isArray(data.items)) {
    state.all = data.items;
    updateGlobalStats(state.all);
    buildFolderFilter(state.all);
    applyFilters();
  } else {
    const grid = $('#grid');
    grid.innerHTML = '<div style="color:#ffb4b4; padding:16px">No manifest available. On a static host, upload manifest.json generated from your local server.</div>';
  }
}

function bindControls() {
  const search = $('#search');
  const clear = $('#clearSearch');
  const folder = $('#folderFilter');
  const sortBy = $('#sortBy');
  const type = $('#typeFilter');
  const hasZipOnly = $('#hasZipOnly');

  search.addEventListener('input', () => { state.search = search.value; applyFilters(); });
  clear.addEventListener('click', () => { search.value=''; state.search=''; applyFilters(); });
  folder.addEventListener('change', () => { state.folder = folder.value; applyFilters(); });
  sortBy.addEventListener('change', () => { state.sortBy = sortBy.value; applyFilters(); });
  type.addEventListener('change', () => { state.type = type.value; applyFilters(); });
  hasZipOnly.addEventListener('change', () => { state.hasZipOnly = hasZipOnly.checked; applyFilters(); });
}

bindControls();
load();
