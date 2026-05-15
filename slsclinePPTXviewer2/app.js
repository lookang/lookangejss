/*
  PPTX Viewer Packager
  - Upload .pptx (file input or drag/drop)
  - Render slides in a Google Slides–like shell (HTML/CSS via PPTXjs)
  - Package a self-contained ZIP with:
      /index.html
      /styles.css
      /viewer.js
      /libs/* (all third-party libs)
      /presentation.pptx      (the uploaded file)
  Replace presentation.pptx in the ZIP later to render a different deck.
*/

(function(){
  // DOM
  const $viewer = $("#viewer");
  const $thumbs = $("#thumbs");
  const $fileInput = $("#file-input");
  const $filename = $("#filename");
  const $prevBtn = $("#prev-btn");
  const $nextBtn = $("#next-btn");
  const $downloadBtn = $("#download-zip-btn");
  const $slideIndex = $("#slide-index");
  const $slideTotal = $("#slide-total");
  const dropZone = document.getElementById("drop-zone");
  const $loadSample = $("#load-sample-btn");

  // State
  let selectedFile = null;
  let deckBuilt = false;
  let currentIndex = 0;
  let slides = []; // Array<HTMLElement>

  // Constants: CDN library URLs to embed inside ZIP as ./libs/*
  const LIBS = {
    "jquery.min.js": "https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js",
    // PPTXjs requires JSZip v2 for parsing .pptx
    "jszip.min.js": "https://cdn.jsdelivr.net/npm/jszip@2.7.0/dist/jszip.min.js",
    "filereader.js": "https://cdn.jsdelivr.net/gh/meshesha/PPTXjs/filereader.js",
    "pptxjs.min.js": "https://cdn.jsdelivr.net/gh/meshesha/PPTXjs/js/pptxjs.min.js",
    "divs2slides.min.js": "https://cdn.jsdelivr.net/gh/meshesha/PPTXjs/js/divs2slides.min.js",
    "dingbat.js": "https://cdn.jsdelivr.net/gh/meshesha/PPTXjs/js/dingbat.js",
    "pptxjs.css": "https://cdn.jsdelivr.net/gh/meshesha/PPTXjs/css/pptxjs.css",
    "d3.min.js": "https://cdn.jsdelivr.net/npm/d3@3.5.17/d3.min.js",
    "nv.d3.min.js": "https://cdn.jsdelivr.net/npm/nvd3@1.8.6/build/nv.d3.min.js",
    "nv.d3.min.css": "https://cdn.jsdelivr.net/npm/nvd3@1.8.6/build/nv.d3.min.css"
  };

  // Fallback styles used when packaging on file:// where fetch('./styles.css') may be blocked.
  const fallbackStyles = `:root{--toolbar-h:56px;--stage-bg:#0b0c0f;--border:#e6e8ee;}
body{margin:0;font:14px/1.4 system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;background:#f6f7f9;color:#111;}
.toolbar{height:56px;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:8px 12px;background:#fff;border-bottom:1px solid var(--border);}
.viewer-shell{height:calc(100vh - var(--toolbar-h));display:flex;}
.thumbs{width:240px;background:#fff;border-right:1px solid var(--border);overflow:auto;padding:8px;}
.stage{flex:1;display:grid;place-items:center;background:var(--stage-bg);overflow:auto;padding:16px;}
.pptx-viewer{background:transparent;border-radius:6px;box-shadow:0 10px 30px rgba(0,0,0,.25);}
#viewer, #viewer .deck{background:transparent !important;}
#viewer .slide, #viewer .singleSlide, #viewer .slide-page{background:transparent !important;max-width:none;height:auto;}
`;

  // Initialize PPTXjs binding once. It will listen to file input changes.
  function bindPPTX() {
    $viewer.pptxToHtml({
      fileInputId: "file-input",
      // We control slideshow navigation ourselves to mimic Google Slides
      slideMode: false,
      keyBoardShortCut: false,
      mediaProcess: true,
      themeProcess: true,
      // explicitly pass jszip v2 path (even though it is already loaded) to keep lib happy in some environments
      jsZipV2: "https://cdn.jsdelivr.net/npm/jszip@2.7.0/dist/jszip.min.js",
      // make slides slightly crisper on HiDPI if author scales
      slidesScale: ""
    });
  }

  // Debounce helper
  function debounce(fn, ms=100){
    let t; return function(...args){ clearTimeout(t); t=setTimeout(()=>fn.apply(this,args), ms); };
  }

  // Build deck (collect slides from PPTXjs output and set up UI)
  function buildDeckIfReady() {
    const candidates = $viewer[0].querySelectorAll(".slide, .slide-page, .singleSlide");
    if (!candidates || candidates.length === 0) return;

    // Wrap everything in a .deck once
    let deck = $viewer[0].querySelector(".deck");
    if (!deck) {
      deck = document.createElement("div");
      deck.className = "deck";
      // Move all children into the deck container
      const frag = document.createDocumentFragment();
      while ($viewer[0].firstChild) frag.appendChild($viewer[0].firstChild);
      deck.appendChild(frag);
      $viewer[0].appendChild(deck);
    }

    slides = Array.from(deck.querySelectorAll(".slide, .slide-page, .singleSlide"));
    if (slides.length === 0) return;
    deckBuilt = true;

    // Hide all but first
    slides.forEach((el, i) => {
      el.style.display = i === 0 ? "block" : "none";
      el.dataset.index = String(i);
    });
    currentIndex = 0;

    // Build thumbnails (if thumbs pane exists)
    if ($thumbs.length) buildThumbnails();

    // Update counters
    updateNavUI();

    // Fit stage
    fitStage();
    // Enable nav + packaging
    $prevBtn.prop("disabled", false);
    $nextBtn.prop("disabled", false);
    $downloadBtn.prop("disabled", !selectedFile);
  }

  function buildThumbnails() {
    if (!$thumbs.length) return;
    $thumbs.empty();
    const thumbPane = $thumbs[0];

    slides.forEach((slideEl, i) => {
      const item = document.createElement("div");
      item.className = "thumb" + (i === currentIndex ? " active" : "");
      item.dataset.index = String(i);

      const num = document.createElement("div");
      num.className = "num";
      num.textContent = String(i + 1);
      item.appendChild(num);

      const canvas = document.createElement("div");
      canvas.className = "canvas";
      item.appendChild(canvas);

      // Clone the slide for thumbnail
      const cloneWrap = document.createElement("div");
      cloneWrap.className = "clone";
      const clone = slideEl.cloneNode(true);
      // try to read natural dimensions from inline style
      const naturalW = parseFloat(slideEl.style.width) || 960;
      const naturalH = parseFloat(slideEl.style.height) || 540;

      // Fit clone inside the thumbnail canvas width
      const thumbW = canvas.clientWidth || 224; // fallback
      const scale = Math.min(thumbW / naturalW, (thumbW * 9/16) / naturalH);
      cloneWrap.style.transform = `scale(${scale})`;
      cloneWrap.style.width = `${naturalW}px`;
      cloneWrap.style.height = `${naturalH}px`;
      cloneWrap.appendChild(clone);
      canvas.appendChild(cloneWrap);

      item.addEventListener("click", () => jumpTo(i));
      thumbPane.appendChild(item);
    });
  }

  function updateThumbActive() {
    if (!$thumbs.length) return;
    const all = $thumbs[0].querySelectorAll(".thumb");
    all.forEach(el => el.classList.remove("active"));
    const active = $thumbs[0].querySelector(`.thumb[data-index="${currentIndex}"]`);
    if (active) active.classList.add("active");
  }

  function updateNavUI() {
    $slideIndex.text(String(currentIndex + 1));
    $slideTotal.text(String(slides.length));
    $prevBtn.prop("disabled", currentIndex <= 0);
    $nextBtn.prop("disabled", currentIndex >= slides.length - 1);
  }

  function jumpTo(idx) {
    if (!deckBuilt) return;
    if (idx < 0 || idx >= slides.length) return;
    slides.forEach((el, i) => el.style.display = i === idx ? "block" : "none");
    currentIndex = idx;
    updateNavUI();
    updateThumbActive();
    fitStage();
  }

  function nextSlide(){ jumpTo(currentIndex + 1); }
  function prevSlide(){ jumpTo(currentIndex - 1); }

  function fitStage() {
    // Scale deck to fit available stage area
    const stage = document.querySelector(".stage");
    const deck = $viewer[0].querySelector(".deck");
    if (!stage || !deck || !slides.length) return;

    const slideEl = slides[currentIndex];
    const naturalW = parseFloat(slideEl.style.width) || 960;
    const naturalH = parseFloat(slideEl.style.height) || 540;

    const stageRect = stage.getBoundingClientRect();
    const pad = 24; // safety padding
    const availW = Math.max(100, stageRect.width - pad);
    const availH = Math.max(100, stageRect.height - pad);

    const scale = Math.min(availW / naturalW, availH / naturalH);

    deck.style.transform = `scale(${scale})`;
    deck.style.transformOrigin = "top left";

    // Ensure the centering box matches scaled size for layout
    $viewer.css({
      width: `${naturalW * scale}px`,
      height: `${naturalH * scale}px`
    });
  }

  // Observe #viewer for slide content creation from PPTXjs
  const observer = new MutationObserver(debounce(buildDeckIfReady, 150));
  observer.observe($viewer[0], { childList: true, subtree: true });

  // Events
  $prevBtn.on("click", prevSlide);
  $nextBtn.on("click", nextSlide);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); prevSlide(); }
    if (e.key === "ArrowRight") { e.preventDefault(); nextSlide(); }
  });

  window.addEventListener("resize", debounce(fitStage, 100));

  $fileInput.on("change", (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    selectedFile = f;
    $filename.text(f.name);
    $downloadBtn.prop("disabled", false);

    // Reset viewer state for fresh render
    deckBuilt = false;
    slides = [];
    $viewer.empty();
    // PPTXjs binding is already in place; it reacts to input change and will render
  });

  // Drag & drop support on whole main area
  ;["dragenter","dragover","dragleave","drop"].forEach(evt => {
    dropZone.addEventListener(evt, (e) => { e.preventDefault(); e.stopPropagation(); }, false);
  });
  dropZone.addEventListener("dragover", () => dropZone.classList.add("drag"), false);
  dropZone.addEventListener("dragleave", () => dropZone.classList.remove("drag"), false);
  dropZone.addEventListener("drop", (e) => {
    dropZone.classList.remove("drag");
    const dt = e.dataTransfer;
    if (!dt || !dt.files || !dt.files.length) return;
    const f = Array.from(dt.files).find(x => /\.pptx$/i.test(x.name)) || dt.files[0];
    if (!f) return;

    // Programmatically set on file input via DataTransfer to let PPTXjs handle it
    const newDT = new DataTransfer();
    newDT.items.add(f);
    $fileInput[0].files = newDT.files;
    const evt = new Event("change", { bubbles: true });
    $fileInput[0].dispatchEvent(evt);
  }, false);

  // Sample loader (use local PPTX in project root)
  $loadSample.on("click", async () => {
    try {
      $loadSample.prop("disabled", true).text("Loading...");
      const localName = "InspireX2025 AI-Generated Interactives with SLS and in SLS.v2pptx.pptx";
      const localUrl = "./" + encodeURIComponent(localName);

      let res;
      try {
        // Will work when served over http(s). If opened via file:// this may fail due to browser restrictions.
        res = await fetch(localUrl);
      } catch (err) {
        throw new Error("Unable to fetch local PPTX. If opening via file://, please run a local server (e.g., `npx http-server .`) and reload.");
      }
      if (!res.ok) {
        throw new Error("Failed to fetch local PPTX at " + localUrl + " (status " + res.status + ")");
      }

      const blob = await res.blob();
      const file = new File([blob], localName, {
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      });

      // Programmatically set file input to trigger PPTXjs
      const dt = new DataTransfer();
      dt.items.add(file);
      $fileInput[0].files = dt.files;
      const evt = new Event("change", { bubbles: true });
      $fileInput[0].dispatchEvent(evt);

      selectedFile = file;
      $filename.text(file.name);
      $downloadBtn.prop("disabled", false);
    } catch (e) {
      console.error(e);
      alert("Failed to load sample: " + (e && e.message ? e.message : e));
    } finally {
      $loadSample.text("Load Sample").prop("disabled", false);
    }
  });

  // Download ZIP click
  $downloadBtn.on("click", async () => {
    if (!selectedFile) return;
    try {
      $downloadBtn.prop("disabled", true).text("Preparing...");
      await buildZipPackage(selectedFile);
    } catch (err) {
      console.error(err);
      alert("Failed to build ZIP: " + (err && err.message ? err.message : err));
    } finally {
      $downloadBtn.text("Download Package").prop("disabled", !selectedFile);
    }
  });

  // Build ZIP with fflate (keeps JSZip v2 exclusively for PPTXjs runtime)
  async function buildZipPackage(file) {
    if (!window.fflate) throw new Error("fflate not loaded");
    const { zipSync, strToU8 } = window.fflate;

    // Fetch current styles.css from our app to reuse in packaged viewer
    let stylesText;
    try {
      stylesText = await fetchLocalText("./styles.css");
    } catch (e) {
      stylesText = fallbackStyles;
    }

    // Prepare offline index.html
    const offlineHtml = buildOfflineIndexHtml();

    // Prepare viewer.js (viewer-only logic, no upload/packaging)
    const viewerJs = buildOfflineViewerJs();

    // Fetch libs
    const files = Object.create(null);

    // Text-based files
    files["index.html"] = strToU8(offlineHtml);
    files["styles.css"] = strToU8(stylesText);
    files["viewer.js"] = strToU8(viewerJs);
    files["README.txt"] = strToU8([
      "pptx-viewer",
      "",
      "How to use:",
      "1) Open index.html in a browser (served over HTTP/HTTPS is recommended).",
      "2) The viewer automatically loads 'presentation.pptx'.",
      "3) To swap content, replace 'presentation.pptx' with another PPTX file (keep the same name).",
      "",
      "Notes:",
      "- Rendering is client-side using PPTXjs.",
      "- For best results, host these files on a simple web server.",
      "- Some browsers restrict reading local files (file://). If index.html does not load the PPTX",
      "  when opened directly, run a simple local server instead."
    ].join("\n"));

    // Binary libs and CSS
    await addBinary("libs/jquery.min.js", LIBS["jquery.min.js"], files);
    await addBinary("libs/jszip.min.js", LIBS["jszip.min.js"], files);
    await addBinary("libs/filereader.js", LIBS["filereader.js"], files);
    await addBinary("libs/pptxjs.min.js", LIBS["pptxjs.min.js"], files);
    await addBinary("libs/divs2slides.min.js", LIBS["divs2slides.min.js"], files);
    await addBinary("libs/dingbat.js", LIBS["dingbat.js"], files);
    files["libs/pptxjs.css"] = strToU8(await fetchText(LIBS["pptxjs.css"]));
    await addBinary("libs/d3.min.js", LIBS["d3.min.js"], files);
    await addBinary("libs/nv.d3.min.js", LIBS["nv.d3.min.js"], files);
    files["libs/nv.d3.min.css"] = strToU8(await fetchText(LIBS["nv.d3.min.css"]));

    // Add the PPTX as presentation.pptx
    files["presentation.pptx"] = new Uint8Array(await file.arrayBuffer());

    // Create the ZIP
    const zipped = zipSync(files, { level: 6 });
    const blob = new Blob([zipped], { type: "application/zip" });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = toZipName(file.name);
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 1000);
  }

  async function addBinary(path, url, filesObj) {
    const buf = await fetchBinary(url);
    filesObj[path] = buf;
  }

  async function fetchText(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Fetch failed: " + url);
    return res.text();
  }
  async function fetchBinary(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Fetch failed: " + url);
    const ab = await res.arrayBuffer();
    return new Uint8Array(ab);
  }
  async function fetchLocalText(url) {
    // Works when served over http(s). Some browsers restrict file:// fetch.
    const res = await fetch(url);
    if (!res.ok) throw new Error("Fetch failed: " + url);
    return res.text();
  }

  function toZipName(filename) {
    const dot = filename.lastIndexOf(".");
    const base = dot > 0 ? filename.slice(0, dot) : filename;
    return base + ".zip";
  }

  function buildOfflineIndexHtml() {
    // Minimal viewer that auto-loads presentation.pptx and references local libs
    return [
      "<!DOCTYPE html>",
      '<html lang="en">',
      "<head>",
      '  <meta charset="utf-8" />',
      '  <meta name="viewport" content="width=device-width, initial-scale=1" />',
      '  <title>PPTX Viewer</title>',
      '  <link rel="stylesheet" href="./styles.css" />',
      '  <link rel="stylesheet" href="./libs/pptxjs.css" />',
      '  <link rel="stylesheet" href="./libs/nv.d3.min.css" />',
      "</head>",
      "<body>",
      '  <header class="toolbar">',
      '    <div class="left-tools"></div>',
      '    <div class="center-tools">',
      '      <button id="prev-btn" class="icon-btn" title="Previous slide">&#9664;</button>',
      '      <div class="slide-counter">',
      '        <span id="slide-index">0</span> / <span id="slide-total">0</span>',
      '      </div>',
      '      <button id="next-btn" class="icon-btn" title="Next slide">&#9654;</button>',
      '    </div>',
      '    <div class="right-tools"><div id="filename" class="filename">presentation.pptx</div></div>',
      '  </header>',
      '  <main class="viewer-shell">',
      '    <aside class="thumbs" id="thumbs"></aside>',
      '    <section class="stage"><div id="viewer" class="pptx-viewer"></div></section>',
      "  </main>",
      '  <footer class="footer"><span>Offline PPTX viewer</span></footer>',
      '  <script src="./libs/jquery.min.js"></script>',
      '  <script src="./libs/jszip.min.js"></script>',
      '  <script src="./libs/filereader.js"></script>',
      '  <script src="./libs/d3.min.js"></script>',
      '  <script src="./libs/nv.d3.min.js"></script>',
      '  <script src="./libs/dingbat.js"></script>',
      '  <script src="./libs/pptxjs.min.js"></script>',
      '  <script src="./libs/divs2slides.min.js"></script>',
      '  <script src="./viewer.js"></script>',
      "</body>",
      "</html>"
    ].join("\n");
  }

  function buildOfflineViewerJs() {
    // viewer-only logic: auto-load presentation.pptx and set up navigation + scaling
    return `
(function(){
  var $viewer = $("#viewer");
  var $thumbs = $("#thumbs");
  var $prevBtn = $("#prev-btn");
  var $nextBtn = $("#next-btn");
  var $slideIndex = $("#slide-index");
  var $slideTotal = $("#slide-total");
  var slides = [];
  var currentIndex = 0;
  var deckBuilt = false;

  function bindPPTX(){
    $viewer.pptxToHtml({
      pptxFileUrl: "presentation.pptx",
      slideMode: false,
      keyBoardShortCut: false,
      mediaProcess: true,
      themeProcess: true,
      jsZipV2: "./libs/jszip.min.js",
      slidesScale: ""
    });
  }

  function debounce(fn, ms){ var t; return function(){ clearTimeout(t); var args=arguments; t=setTimeout(function(){ fn.apply(null,args); }, ms||100); }; }

  function buildDeckIfReady(){
    var candidates = $viewer[0].querySelectorAll(".slide, .slide-page, .singleSlide");
    if (!candidates || candidates.length === 0) return;

    var deck = $viewer[0].querySelector(".deck");
    if (!deck) {
      deck = document.createElement("div");
      deck.className = "deck";
      var frag = document.createDocumentFragment();
      while ($viewer[0].firstChild) frag.appendChild($viewer[0].firstChild);
      deck.appendChild(frag);
      $viewer[0].appendChild(deck);
    }

    slides = Array.prototype.slice.call(deck.querySelectorAll(".slide, .slide-page, .singleSlide"));
    if (!slides.length) return;
    deckBuilt = true;

    slides.forEach(function(el, i){ el.style.display = i===0 ? "block" : "none"; el.dataset.index = String(i); });
    currentIndex = 0;

    buildThumbnails();
    updateNavUI();
    fitStage();

    $prevBtn.prop("disabled", false);
    $nextBtn.prop("disabled", false);
  }

  function buildThumbnails(){
    $thumbs.empty();
    var pane = $thumbs[0];
    slides.forEach(function(slideEl, i){
      var item = document.createElement("div");
      item.className = "thumb" + (i===currentIndex ? " active" : "");
      item.dataset.index = String(i);

      var num = document.createElement("div");
      num.className = "num";
      num.textContent = String(i+1);
      item.appendChild(num);

      var canvas = document.createElement("div");
      canvas.className = "canvas";
      item.appendChild(canvas);

      var wrap = document.createElement("div");
      wrap.className = "clone";
      var clone = slideEl.cloneNode(true);
      var naturalW = parseFloat(slideEl.style.width) || 960;
      var naturalH = parseFloat(slideEl.style.height) || 540;
      var thumbW = canvas.clientWidth || 224;
      var scale = Math.min(thumbW / naturalW, (thumbW * 9/16) / naturalH);
      wrap.style.transform = "scale(" + scale + ")";
      wrap.style.width = naturalW + "px";
      wrap.style.height = naturalH + "px";
      wrap.appendChild(clone);
      canvas.appendChild(wrap);

      item.addEventListener("click", function(){ jumpTo(i); });
      pane.appendChild(item);
    });
  }

  function updateThumbActive(){
    var all = $thumbs[0].querySelectorAll(".thumb");
    Array.prototype.forEach.call(all, function(el){ el.classList.remove("active"); });
    var active = $thumbs[0].querySelector('.thumb[data-index="'+currentIndex+'"]');
    if (active) active.classList.add("active");
  }

  function updateNavUI(){
    $slideIndex.text(String(currentIndex + 1));
    $slideTotal.text(String(slides.length));
    $prevBtn.prop("disabled", currentIndex<=0);
    $nextBtn.prop("disabled", currentIndex>=slides.length-1);
  }

  function jumpTo(idx){
    if (!deckBuilt) return;
    if (idx < 0 || idx >= slides.length) return;
    slides.forEach(function(el, i){ el.style.display = i===idx ? "block" : "none"; });
    currentIndex = idx;
    updateNavUI();
    updateThumbActive();
    fitStage();
  }

  function nextSlide(){ jumpTo(currentIndex+1); }
  function prevSlide(){ jumpTo(currentIndex-1); }

  function fitStage(){
    var stage = document.querySelector(".stage");
    var deck = $viewer[0].querySelector(".deck");
    if (!stage || !deck || !slides.length) return;

    var slideEl = slides[currentIndex];
    var naturalW = parseFloat(slideEl.style.width) || 960;
    var naturalH = parseFloat(slideEl.style.height) || 540;

    var stageRect = stage.getBoundingClientRect();
    var pad = 24;
    var availW = Math.max(100, stageRect.width - pad);
    var availH = Math.max(100, stageRect.height - pad);

    var scale = Math.min(availW / naturalW, availH / naturalH);

    deck.style.transform = "scale(" + scale + ")";
    deck.style.transformOrigin = "top left";
    $viewer.css({ width: (naturalW*scale) + "px", height: (naturalH*scale) + "px" });
  }

  var observer = new MutationObserver(debounce(buildDeckIfReady, 150));
  observer.observe($viewer[0], { childList: true, subtree: true });

  $prevBtn.on("click", prevSlide);
  $nextBtn.on("click", nextSlide);
  document.addEventListener("keydown", function(e){
    if (e.key === "ArrowLeft") { e.preventDefault(); prevSlide(); }
    if (e.key === "ArrowRight") { e.preventDefault(); nextSlide(); }
  });

  window.addEventListener("resize", debounce(fitStage, 100));

  // Start
  bindPPTX();
})();`;
  }

  // Start binding and initial UI state
  bindPPTX();
  $prevBtn.prop("disabled", true);
  $nextBtn.prop("disabled", true);
  $downloadBtn.prop("disabled", true);

})();
