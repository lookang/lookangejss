document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const htmlInput = document.getElementById('html-input');
    const cssInput = document.getElementById('css-input');
    const jsInput = document.getElementById('js-input');
    // const fileStructure = document.getElementById('file-structure'); // Removed
    const tabButtons = document.querySelectorAll('.tab-btn');
    const inputSections = document.querySelectorAll('.input-section');
    const previewBtn = document.getElementById('preview-btn');
    const previewNewTabBtn = document.getElementById('preview-new-tab-btn');
    const generateBtn = document.getElementById('generate-zip');
    const clearBtn = document.getElementById('clear-btn');
    const previewSection = document.getElementById('preview-section');
    const previewContainer = document.getElementById('preview-container');
    const resultSection = document.getElementById('result-section');
    const filenameDisplay = document.getElementById('filename-display');
    const downloadLink = document.getElementById('download-link');
    const generateAIzipperBtn = document.getElementById('generate-aizipper-zip-btn'); // New button
    const promptInput = document.getElementById('prompt-input'); // Textarea for prompt content

    // ZIP import UI
    const importZipBtn = document.getElementById('import-zip-btn');
    const zipFileInput = document.getElementById('zip-input');
    const includeGaCheckbox = document.getElementById('include-ga');
    const includeAdsenseCheckbox = document.getElementById('include-adsense');
    const footerUrlInput = document.getElementById('footer-url');
    const footerAuthorInput = document.getElementById('footer-author');
    const footerFreeTextInput = document.getElementById('footer-free-text');
    const toggleAddonsBtn = document.getElementById('toggle-addons-btn');
    const addonsSection = document.querySelector('section.addons');
    const GA_ID = 'G-S9EWRY1CPJ';
    const ADSENSE_CLIENT = 'ca-pub-0121577198857509';

    // State for imported ZIP contents
    let importedFiles = {}; // path -> { text?: string, base64?: string }
    let importedMainPaths = { html: null, css: null, js: null };
    let createdBlobUrls = []; // object URLs created for preview; revoked on next preview
    let warnedMissingHtml2canvas = false; // avoid spamming alerts when thumbnail lib is missing

    initCommunityPulse();

    if (importZipBtn && zipFileInput) {
        importZipBtn.addEventListener('click', () => zipFileInput.click());
        zipFileInput.addEventListener('change', async (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            try {
                await importProjectZip(file);
            } catch (err) {
                console.error('Failed to import ZIP:', err);
                alert('Failed to import ZIP file. Please ensure it is a valid .zip.');
            }
        });
    }

    // Toggle Optional add-ons section visibility
    if (toggleAddonsBtn && addonsSection) {
        toggleAddonsBtn.addEventListener('click', () => {
            const isHidden = window.getComputedStyle(addonsSection).display === 'none';
            if (isHidden) {
                addonsSection.style.display = '';
                toggleAddonsBtn.textContent = 'Hide Optional add-ons';
                // Default to ON when shown
                if (includeGaCheckbox) includeGaCheckbox.checked = true;
                if (includeAdsenseCheckbox) includeAdsenseCheckbox.checked = true;
            } else {
                addonsSection.style.display = 'none';
                toggleAddonsBtn.textContent = 'Show Optional add-ons';
            }
        });
    }

    // Drag and drop functionality
    function setupDragAndDrop(textareaElement) {
        textareaElement.addEventListener('dragover', (event) => {
            event.stopPropagation();
            event.preventDefault();
            event.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
            textareaElement.classList.add('dragover'); // Optional: add a class for visual feedback
        });

        textareaElement.addEventListener('dragleave', (event) => {
            event.stopPropagation();
            event.preventDefault();
            textareaElement.classList.remove('dragover'); // Optional: remove visual feedback class
        });

        textareaElement.addEventListener('drop', (event) => {
            event.stopPropagation();
            event.preventDefault();
            textareaElement.classList.remove('dragover'); // Optional: remove visual feedback class

            const files = event.dataTransfer.files;
            if (files.length > 0) {
                const file = files[0];
                const lowerName = (file.name || '').toLowerCase();

                // If a ZIP is dropped into the HTML area, import the project ZIP
                const isZip = lowerName.endsWith('.zip') || (file.type && file.type.includes('zip'));
                if (isZip) {
                    if (textareaElement === htmlInput) {
                        // Use the existing ZIP import flow
                        importProjectZip(file);
                    } else {
                        alert('To import a project ZIP, drop it into the HTML area.');
                    }
                    return;
                }

                // Accept common text/code files
                if ((file.type && file.type.match('text.*')) || lowerName.endsWith('.html') || lowerName.endsWith('.css') || lowerName.endsWith('.js') || lowerName.endsWith('.txt')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        textareaElement.value = e.target.result;
                    };
                    reader.readAsText(file);
                } else {
                    alert('Please drop a text file (e.g., .html, .css, .js, .txt) or drop a .zip into the HTML area to import a project.');
                }
            }
        });
    }

    setupDragAndDrop(htmlInput);
    setupDragAndDrop(cssInput);
    setupDragAndDrop(jsInput);
    if (promptInput) setupDragAndDrop(promptInput);
    
    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and sections
            tabButtons.forEach(btn => btn.classList.remove('active'));
            inputSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button and corresponding section
            const tabName = button.getAttribute('data-tab');
            button.classList.add('active');
            document.getElementById(`${tabName}-section`).classList.add('active');
        });
    });

    // Preview HTML when preview button is clicked
    previewBtn.addEventListener('click', () => {
        const htmlCode = htmlInput.value; // Keep original for textarea
        const cssCode = cssInput.value.trim();
        const jsCode = jsInput.value.trim();

        if (!htmlCode.trim()) {
            alert('Please paste some HTML code first!');
            return;
        }

        // Cleanup any previous object URLs to avoid leaks
        revokeCreatedBlobUrls();

        previewContainer.innerHTML = '';
        const iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        // iframe.style.height = '400px'; // Removed fixed height
        iframe.style.border = '1px solid #ddd';
        previewContainer.appendChild(iframe);

        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();

        let contentForPreview = htmlCode.trim();

        // Apply optional add-ons (GA, AdSense, footer credit)
        contentForPreview = applyAddOns(contentForPreview);

        // Preprocess CSS if present (rewrite url() using imported assets if available)
        let cssForPreview = cssCode;
        if (cssForPreview !== '' && Object.keys(importedFiles).length) {
            const cssBase = importedMainPaths.css || (importedMainPaths.html || 'index.html');
            cssForPreview = replaceCssUrls(cssForPreview, cssBase);
        }

        // Embed CSS if provided
        if (cssForPreview !== '') {
            if (contentForPreview.includes('</head>')) {
                contentForPreview = contentForPreview.replace('</head>', `<style>\n${cssForPreview}\n</style>\n</head>`);
            } else {
                contentForPreview = `<style>\n${cssForPreview}\n</style>\n` + contentForPreview;
            }
        }

        // Embed JS if provided
        if (jsCode !== '') {
            if (contentForPreview.includes('</body>')) {
                contentForPreview = contentForPreview.replace('</body>', `<script>\n${jsCode}\n</script>\n</body>`);
            } else {
                contentForPreview += `\n<script>\n${jsCode}\n</script>`;
            }
        }

        // Rewrite asset paths in HTML to blob URLs if an imported ZIP is available
        if (Object.keys(importedFiles).length && importedMainPaths.html) {
            contentForPreview = replaceAssetPathsInHtml(contentForPreview, importedMainPaths.html);
        }
        
        iframeDoc.write(contentForPreview);
        iframeDoc.close();

        // Adjust iframe height to content
        iframe.onload = () => {
            try {
                const body = iframe.contentWindow.document.body;
                const html = iframe.contentWindow.document.documentElement;
                const height = Math.max( body.scrollHeight, body.offsetHeight, 
                                       html.clientHeight, html.scrollHeight, html.offsetHeight );
                iframe.style.height = height + 'px';
            } catch (e) {
                console.warn("Could not resize iframe to content, likely due to cross-origin restrictions if previewing external content directly.", e);
                iframe.style.height = '400px'; // Fallback height
            }
        };
        // For browsers that might not fire onload for srcdoc/write, try to set height after write
        // This is a bit of a race condition, onload is preferred.
        try {
            const body = iframe.contentWindow.document.body;
            const html = iframe.contentWindow.document.documentElement;
            // Timeout to allow rendering
            setTimeout(() => {
                 const height = Math.max( body.scrollHeight, body.offsetHeight, 
                                       html.clientHeight, html.scrollHeight, html.offsetHeight );
                iframe.style.height = height + 'px';
            }, 100); // Adjust timeout if needed
        } catch (e) {
            // Fallback if immediate access fails (e.g. about:blank not ready)
             if (!iframe.onload) { // if onload didn't get set or fire
                iframe.style.height = '400px'; // Fallback height
             }
        }


        previewSection.classList.remove('hidden');
        previewSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Preview in new tab when "Preview in New Tab" button is clicked
    previewNewTabBtn.addEventListener('click', () => {
        const htmlCode = htmlInput.value;
        const cssCode = cssInput.value.trim();
        const jsCode = jsInput.value.trim();

        if (!htmlCode.trim()) {
            alert('Please paste some HTML code first!');
            return;
        }

        let contentForPreview = htmlCode.trim();

        // Apply optional add-ons (GA, AdSense, footer credit)
        contentForPreview = applyAddOns(contentForPreview);

        // Preprocess CSS if present (rewrite url() using imported assets if available)
        let cssForPreview = cssCode;
        if (cssForPreview !== '' && Object.keys(importedFiles).length) {
            const cssBase = importedMainPaths.css || (importedMainPaths.html || 'index.html');
            cssForPreview = replaceCssUrls(cssForPreview, cssBase);
        }

        // Embed CSS if provided
        if (cssForPreview !== '') {
            if (contentForPreview.includes('</head>')) {
                contentForPreview = contentForPreview.replace('</head>', `<style>\n${cssForPreview}\n</style>\n</head>`);
            } else {
                contentForPreview = `<style>\n${cssForPreview}\n</style>\n` + contentForPreview;
            }
        }

        // Embed JS if provided
        if (jsCode !== '') {
            if (contentForPreview.includes('</body>')) {
                contentForPreview = contentForPreview.replace('</body>', `<script>\n${jsCode}\n</script>\n</body>`);
            } else {
                contentForPreview += `\n<script>\n${jsCode}\n</script>`;
            }
        }

        // Rewrite asset paths in HTML to blob URLs if an imported ZIP is available
        if (Object.keys(importedFiles).length && importedMainPaths.html) {
            contentForPreview = replaceAssetPathsInHtml(contentForPreview, importedMainPaths.html);
        }

        const blob = new Blob([contentForPreview], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    });

    // Generate ZIP file when button is clicked
    generateBtn.addEventListener('click', async () => {
        const htmlCode = htmlInput.value; // Keep original for textarea
        const cssCode = cssInput.value.trim();
        const jsCode = jsInput.value.trim();

        if (!htmlCode.trim()) {
            alert('Please paste some HTML code first!');
            return;
        }

        if (typeof JSZip === 'undefined') {
            alert('JSZip library is not available.\n\nPlease ensure either:\n- You are online so the CDN https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js can load, OR\n- You have placed a local copy at vendor/jszip.min.js next to index.html.');
            return;
        }
        
        // Show loading state
        generateBtn.disabled = true;
        generateBtn.textContent = 'Processing...';
        
        try {
            let thumbnailBlob = null;

            if (typeof html2canvas === 'undefined') {
                if (!warnedMissingHtml2canvas) {
                    alert('html2canvas library is not available. The ZIP will be generated without a thumbnail.\n\nTo enable thumbnails, please ensure either:\n- You are online so the CDN https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js can load, OR\n- You have placed a local copy at vendor/html2canvas.min.js next to index.html.');
                    warnedMissingHtml2canvas = true;
                }
            } else {
                try {
                    thumbnailBlob = await captureThumbnailFromCode(htmlCode, cssCode, jsCode);
                } catch (e) {
                    console.warn('Skipping thumbnail generation due to error:', e);
                }
            }

            await generateZip(htmlCode.trim(), cssCode, jsCode, thumbnailBlob);
        } finally {
            // Reset button state
            generateBtn.disabled = false;
            generateBtn.textContent = 'GENERATE ZIP and THUMBNAIL';
        }
    });
    
    // Clear the input field
    clearBtn.addEventListener('click', () => {
        htmlInput.value = '';
        cssInput.value = '';
        jsInput.value = '';
        previewSection.classList.add('hidden');
        resultSection.classList.add('hidden');
        if (promptInput) promptInput.value = '';

        // Reset imported ZIP state
        importedFiles = {};
        importedMainPaths = { html: null, css: null, js: null };
        if (zipFileInput) zipFileInput.value = '';
    });

    // Generate AIzipper_YYYYMMDD.zip when new button is clicked
    if (generateAIzipperBtn) {
        generateAIzipperBtn.addEventListener('click', () => {
            const htmlCode = htmlInput.value;
            const cssCode = cssInput.value.trim();
            const jsCode = jsInput.value.trim();

            if (!htmlCode.trim()) {
                alert('Please provide HTML code in the HTML textarea to generate the ZIP.');
                return;
            }

            if (typeof JSZip === 'undefined') {
                alert('JSZip library is not available.\n\nPlease ensure either:\n- You are online so the CDN https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js can load, OR\n- You have placed a local copy at vendor/jszip.min.js next to index.html.');
                return;
            }

            generateAIzipperFile(htmlCode.trim(), cssCode, jsCode);
        });
    }
    
    // Import a project ZIP and populate editors
    async function importProjectZip(file) {
        const zip = await JSZip.loadAsync(file);

        importedFiles = {};
        importedMainPaths = { html: null, css: null, js: null };

        const textExts = ['.html', '.htm', '.css', '.js', '.json', '.txt', '.md', '.svg'];
        const keys = Object.keys(zip.files);

        for (const path of keys) {
            const entry = zip.files[path];
            if (entry.dir) continue;

            const lower = path.toLowerCase();
            const dot = lower.lastIndexOf('.');
            const ext = dot >= 0 ? lower.slice(dot) : '';

            if (textExts.includes(ext)) {
                const content = await entry.async('string');
                importedFiles[path] = { text: content };

                // Prefer well-known names; otherwise first encountered of each type
                if (!importedMainPaths.html && (lower.endsWith('index.html') || ext === '.html' || ext === '.htm')) {
                    importedMainPaths.html = path;
                }
                if (!importedMainPaths.css && (lower.endsWith('styles.css') || ext === '.css')) {
                    importedMainPaths.css = path;
                }
                if (!importedMainPaths.js && (lower.endsWith('script.js') || ext === '.js')) {
                    importedMainPaths.js = path;
                }
            } else {
                // Binary asset (images, fonts, etc.) – keep base64 so we can re-zip unchanged
                const base64 = await entry.async('base64');
                importedFiles[path] = { base64 };
            }
        }

        // Fallbacks if not found
        if (!importedMainPaths.html) {
            importedMainPaths.html = keys.find(k => k.toLowerCase().endsWith('.html') || k.toLowerCase().endsWith('.htm')) || null;
        }
        if (!importedMainPaths.css) {
            importedMainPaths.css = keys.find(k => k.toLowerCase().endsWith('.css')) || null;
        }
        if (!importedMainPaths.js) {
            importedMainPaths.js = keys.find(k => k.toLowerCase().endsWith('.js')) || null;
        }

        // Populate editors
        htmlInput.value = (importedMainPaths.html && importedFiles[importedMainPaths.html] && importedFiles[importedMainPaths.html].text) ? importedFiles[importedMainPaths.html].text : '';
        cssInput.value = (importedMainPaths.css && importedFiles[importedMainPaths.css] && importedFiles[importedMainPaths.css].text) ? importedFiles[importedMainPaths.css].text : '';
        jsInput.value = (importedMainPaths.js && importedFiles[importedMainPaths.js] && importedFiles[importedMainPaths.js].text) ? importedFiles[importedMainPaths.js].text : '';

        // Notify user
        const assetCount = Object.keys(importedFiles).length;
        const mainsCount = [importedMainPaths.html, importedMainPaths.css, importedMainPaths.js].filter(Boolean).length;
        const others = Math.max(assetCount - mainsCount, 0);
        const mainEl = document.querySelector('main');
        if (mainEl) {
            const notice = document.createElement('div');
            notice.innerHTML = `
                <div style="background:#fff8e1;border:1px solid #fbc02d;border-radius:4px;padding:12px;margin:10px 0;">
                    <strong>ZIP imported:</strong> ${assetCount} file(s) detected.
                    ${others > 0 ? others + ' additional asset(s) will be preserved in the generated ZIP.' : 'No additional assets detected.'}
                </div>
            `;
            mainEl.insertBefore(notice, resultSection);
            setTimeout(() => notice.remove(), 8000);
        }
    }

    // Preview helpers for imported assets
    function normalizePath(p) {
        return p.replace(/\\/g, '/');
    }
    function dirname(p) {
        p = normalizePath(p);
        const idx = p.lastIndexOf('/');
        return idx >= 0 ? p.slice(0, idx) : '';
    }
    function resolvePath(basePath, rel) {
        if (/^https?:\/\//i.test(rel) || rel.startsWith('data:') || rel.startsWith('blob:') || rel.startsWith('#') || rel.startsWith('mailto:') || rel.startsWith('tel:')) {
            return rel; // external or special URLs
        }
        let base = dirname(basePath);
        let segs = (base ? base + '/' + rel : rel).split('/');
        const out = [];
        for (const s of segs) {
            if (!s || s === '.') continue;
            if (s === '..') out.pop();
            else out.push(s);
        }
        return out.join('/');
    }
    function guessMimeFromExt(path) {
        const ext = path.toLowerCase().split('.').pop();
        switch (ext) {
            case 'png': return 'image/png';
            case 'jpg':
            case 'jpeg': return 'image/jpeg';
            case 'gif': return 'image/gif';
            case 'webp': return 'image/webp';
            case 'svg': return 'image/svg+xml';
            case 'ico': return 'image/x-icon';
            case 'bmp': return 'image/bmp';
            case 'mp3': return 'audio/mpeg';
            case 'wav': return 'audio/wav';
            case 'ogg': return 'audio/ogg';
            case 'mp4': return 'video/mp4';
            case 'webm': return 'video/webm';
            case 'woff2': return 'font/woff2';
            case 'woff': return 'font/woff';
            case 'ttf': return 'font/ttf';
            case 'css': return 'text/css';
            case 'js': return 'text/javascript';
            case 'json': return 'application/json';
            case 'txt': return 'text/plain';
            default: return 'application/octet-stream';
        }
    }
    // Determine if a file type is typically incompressible (already-compressed formats)
    function isIncompressible(filePath) {
        const ext = (filePath || '').toLowerCase().split('.').pop();
        return ['png','jpg','jpeg','gif','webp','ico','bmp','mp3','wav','ogg','mp4','webm','woff2','woff','ttf','otf','zip','gz','7z','rar','pdf'].includes(ext);
    }
    function getBlobUrlForImportedPath(path) {
        const file = importedFiles[path];
        if (!file) return null;
        try {
            let blob;
            if (file.base64) {
                const mime = guessMimeFromExt(path);
                const byteCharacters = atob(file.base64);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                blob = new Blob([byteArray], { type: mime });
            } else if (typeof file.text === 'string') {
                const mime = guessMimeFromExt(path);
                blob = new Blob([file.text], { type: mime + ';charset=utf-8' });
            } else {
                return null;
            }
            const url = URL.createObjectURL(blob);
            createdBlobUrls.push(url);
            return url;
        } catch (e) {
            console.warn('Failed to create blob URL for', path, e);
            return null;
        }
    }
    function replaceCssUrls(css, basePath) {
        if (!css) return css;
        return css.replace(/url\((['"]?)([^'")]+)\1\)/gi, (m, q, p) => {
            const resolved = resolvePath(basePath, p);
            const file = importedFiles[resolved];
            if (file) {
                const url = getBlobUrlForImportedPath(resolved);
                return `url(${url})`;
            }
            return m;
        });
    }
    function replaceAssetPathsInHtml(html, basePath) {
        // Replace common asset attributes
        html = html.replace(/\b(src|href|poster)=(['"])([^'"]+)\2/gi, (m, attr, q, p) => {
            const resolved = resolvePath(basePath, p);
            const file = importedFiles[resolved];
            if (file) {
                const url = getBlobUrlForImportedPath(resolved);
                return `${attr}=${q}${url}${q}`;
            }
            return m;
        });
        return html;
    }
    function revokeCreatedBlobUrls() {
        createdBlobUrls.forEach(u => URL.revokeObjectURL(u));
        createdBlobUrls = [];
    }

    // Helper: identify known tracking/ads URLs
    function isGAUrl(url) {
        return /googletagmanager\.com\/gtag\/js/i.test(url) || /google-analytics\.com/i.test(url);
    }
    function isAdSenseUrl(url) {
        return /pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/i.test(url);
    }
    function shouldSkipExternal(url, addonsSection, includeGaCheckbox, includeAdsenseCheckbox) {
        const addonsVisible = addonsSection && window.getComputedStyle(addonsSection).display !== 'none';
        if (isGAUrl(url)) {
            // Only keep GA if user explicitly opted in via add-ons
            return !(addonsVisible && includeGaCheckbox && includeGaCheckbox.checked);
        }
        if (isAdSenseUrl(url)) {
            // Only keep AdSense if user explicitly opted in via add-ons
            return !(addonsVisible && includeAdsenseCheckbox && includeAdsenseCheckbox.checked);
        }
        return false;
    }
    function removeExternalReferences(html, css, js, url) {
        const esc = escapeRegExp(url);
        // Remove <script src="url"></script>
        html = html.replace(new RegExp(`<script[^>]+src\\s*=\\s*['"]${esc}['"][^>]*>\\s*<\\/script>`, 'gi'), '');
        // Remove <link href="url" ...>
        html = html.replace(new RegExp(`<link[^>]+href\\s*=\\s*['"]${esc}['"][^>]*>`, 'gi'), '');
        // Remove occurrences in import maps JSON strings
        html = html.replace(new RegExp(`(['"])${esc}(['"])`, 'gi'), '');
        // Remove CSS @import "url"
        css = css.replace(new RegExp(`@import\\s+(?:url\\()?['"]?${esc}['"]?\\)?[^;]*;?`, 'gi'), '');
        // Remove JS import ... from "url"
        js = js.replace(new RegExp(`(import\\s+[^;]*from\\s*['"])${esc}(['"])`, 'gi'), '/* pruned external */');
        // Remove dynamic imports import("url")
        js = js.replace(new RegExp(`import\\s*\\(\\s*['"]${esc}['"]\\s*\\)`, 'gi'), '/* pruned external */');
        return { html, css, js };
    }

    // Add-on injection helpers (GA, AdSense, footer credit)
    function applyAddOns(html) {
        try {
            let out = html || '';
            const visible = addonsSection && window.getComputedStyle(addonsSection).display !== 'none';
            if (!visible) {
                // Hidden by default means add-ons are OFF
                return out;
            }
            const includeGA = !!(includeGaCheckbox && includeGaCheckbox.checked);
            const includeAds = !!(includeAdsenseCheckbox && includeAdsenseCheckbox.checked);
            const author = (footerAuthorInput && footerAuthorInput.value || 'lookang').trim();
            const creditUrl = (footerUrlInput && footerUrlInput.value || '').trim();
            const freeText = (footerFreeTextInput && footerFreeTextInput.value || '').trim();

            if (includeGA) out = injectGA(out, GA_ID);
            if (includeAds) out = injectAdSense(out, ADSENSE_CLIENT);

            // Prefer free-text credit if provided; otherwise use author/URL format
            if (freeText) {
                out = injectFooterCreditFreeText(out, freeText);
            } else if (author || creditUrl) {
                out = injectFooterCredit(out, author, creditUrl);
            }
            return out;
        } catch (e) {
            console.warn('applyAddOns failed:', e);
            return html;
        }
    }

    function injectGA(html, trackingId) {
        if (!trackingId) return html;
        // Avoid duplicate injection
        if (/\bgoogletagmanager\.com\/gtag\/js\b/i.test(html) || /gtag\(\s*['"]config['"]\s*,/i.test(html)) {
            return html;
        }
        const loader = `<script async="true" src="https://www.googletagmanager.com/gtag/js?id=${trackingId}"></script>`;
        const inline = `<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${trackingId}');
</script>`;
        if (html.includes('</head>')) {
            return html.replace('</head>', `${loader}\n${inline}\n</head>`);
        }
        return `${loader}\n${inline}\n` + html;
    }

    function injectAdSense(html, clientId) {
        if (!clientId) return html;
        // Avoid duplicate injection
        if (/\bpagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\b/i.test(html)) {
            return html;
        }
        const tag = `<script data-ad-client="${clientId}" async="true" src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>`;
        if (html.includes('</head>')) {
            return html.replace('</head>', `${tag}\n</head>`);
        }
        return `${tag}\n` + html;
    }

    // Safely escape HTML before linkifying
    function escapeHtml(text) {
        return String(text || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // Convert URLs in plain text to clickable anchors
    function linkifyUrls(text) {
        const urlRegex = /(https?:\/\/[^\s<>"']+)/g;
        return text.replace(urlRegex, (m) => `<a href="${m}" target="_blank" rel="noopener noreferrer">${m}</a>`);
    }

    // Inject a sticky footer that is always pinned to the bottom of the viewport.
    // This uses a uniquely-scoped ID and CSS to avoid interfering with page layout.
    function injectStickyFooter(html, innerHtml) {
        // Avoid duplicate injection
        if (/id="aiz-footer"/i.test(html)) return html;

        const styleBlock = `<style id="aiz-footer-style">
#aiz-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 10px;
  z-index: 2147483000;
  display: flex;
  justify-content: center;
  pointer-events: auto; /* keep links clickable */
  font: 14px/1.4 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, "Noto Sans", "Helvetica Neue", sans-serif;
  color: #222;
}
#aiz-footer p {
  margin: 0;
  padding: 6px 10px;
  background: rgba(255,255,255,0.9);
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.06);
}
#aiz-footer a { color: #0b69ff; text-decoration: underline; }
</style>`;

        let out = html;
        if (out.includes('</head>')) {
            out = out.replace('</head>', `${styleBlock}\n</head>`);
        } else {
            out = `${styleBlock}\n` + out;
        }

        const footerMarkup = `<footer id="aiz-footer" role="contentinfo">${innerHtml}</footer>`;
        if (out.includes('</body>')) {
            out = out.replace('</body>', `${footerMarkup}\n</body>`);
        } else {
            out += `\n${footerMarkup}`;
        }
        return out;
    }

    function injectFooterCreditFreeText(html, text) {
        // Avoid duplicate if sticky footer already injected
        if (/id="aiz-footer"/i.test(html)) return html;
        const safe = escapeHtml(text);
        const linked = linkifyUrls(safe);
        const pHtml = `<p id="generated-footer-credit">${linked}</p>`;
        return injectStickyFooter(html, pHtml);
    }

    function injectFooterCredit(html, author, url) {
        const name = author && author.trim() ? author.trim() : 'lookang';
        const safeUrl = (url || '').replace(/"/g, '"');
        const linkPart = safeUrl ? ` For more resources: <a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${safeUrl}</a>` : '';
        const pHtml = `<p>Made by <strong>${name}</strong>, using <strong>Gemini 2.5 Pro</strong>.${linkPart}</p>`;
        // Avoid duplicate
        if (/id="aiz-footer"/i.test(html)) return html;
        return injectStickyFooter(html, pHtml);
    }

    function initCommunityPulse() {
        const PRESENCE_ENDPOINT = location.pathname.includes('/lookangejss/')
            ? '/lookangejss/slsZipper/Code_to_ZIP_Converter/activity_feed.php'
            : 'activity_feed.php';
        const canUseLiveEndpoints = !/^(localhost|127\.0\.0\.1)$/i.test(location.hostname) || location.pathname.includes('/lookangejss/');
        const fallbackEvents = [
            { id: -1, type: 'generate', label: 'A user from Singapore', title: 'an offline ZIP package', when: '4 min ago' },
            { id: -2, type: 'download', label: 'A user from Malaysia', title: 'an SLS-ready ZIP', when: '11 min ago' },
            { id: -3, type: 'view', label: 'A user from Indonesia', title: 'SLS Offline ZIP Packager', when: '25 min ago' },
            { id: -4, type: 'generate', label: 'A user from Singapore', title: 'external assets for offline use', when: '29 min ago' }
        ];

        let token = sessionStorage.getItem('aizipperPresenceToken');
        if (!token) {
            if (window.crypto && crypto.getRandomValues) {
                token = Array.from(crypto.getRandomValues(new Uint8Array(16))).map(b => b.toString(16).padStart(2, '0')).join('');
            } else {
                token = (String(Date.now()) + Math.random().toString(16).slice(2)).slice(0, 32).padEnd(32, '0');
            }
            sessionStorage.setItem('aizipperPresenceToken', token.slice(0, 32));
        }

        const seenToastIds = new Set();
        const bellBtn = document.getElementById('notifBellBtn');
        const notifPanel = document.getElementById('notifPanel');
        if (bellBtn && notifPanel) {
            bellBtn.addEventListener('click', () => {
                notifPanel.hidden = !notifPanel.hidden;
            });
        }

        function postActivity(type, slug, title) {
            if (!canUseLiveEndpoints) return;
            const body = new URLSearchParams({ action: 'log', token, type, title });
            if (navigator.sendBeacon) {
                navigator.sendBeacon(PRESENCE_ENDPOINT, body);
            } else {
                fetch(PRESENCE_ENDPOINT, { method: 'POST', body, keepalive: true }).catch(() => {});
            }
            return { type, slug, title };
        }

        function ping() {
            if (!canUseLiveEndpoints) return;
            const body = new URLSearchParams({ action: 'ping', token });
            if (navigator.sendBeacon) {
                navigator.sendBeacon(PRESENCE_ENDPOINT, body);
            } else {
                fetch(PRESENCE_ENDPOINT, { method: 'POST', body, keepalive: true }).catch(() => {});
            }
        }

        async function fetchFeed() {
            if (!canUseLiveEndpoints) {
                renderPresence(10);
                renderTicker(fallbackEvents);
                return;
            }
            try {
                const cacheBust = '?_=' + Date.now();
                const presenceResponse = await fetch(PRESENCE_ENDPOINT + cacheBust + '&token=' + encodeURIComponent(token), { cache: 'no-store' });

                if (presenceResponse.ok) {
                    const presenceData = await presenceResponse.json();
                    renderPresence(presenceData.online || 1);
                    renderTicker(presenceData.recent && presenceData.recent.length ? presenceData.recent : fallbackEvents);
                    showFreshToasts(presenceData.recent || []);
                } else {
                    renderPresence(1);
                    renderTicker(fallbackEvents);
                }
            } catch (error) {
                renderPresence(1);
                renderTicker(fallbackEvents);
            }
        }

        function renderPresence(count) {
            const countEl = document.getElementById('presenceOnlineCount');
            const widget = document.getElementById('presenceWidget');
            if (countEl) countEl.textContent = Math.max(1, Number(count) || 1);
            if (widget) widget.style.display = 'inline-flex';
        }

        function renderTicker(events) {
            const ticker = document.getElementById('activityTicker');
            const inner = document.getElementById('activityTickerInner');
            if (!ticker || !inner || !events.length) return;
            const icons = { download: '&#11015;', generate: '&#9881;', upload: '&#127381;', view: '&#128065;' };
            const verbs = { download: 'downloaded', generate: 'created', view: 'opened' };
            const parts = events.map(e =>
                `${icons[e.type] || '&#128218;'} <strong>${escapeHtml(getAnonymousLocationLabel(e))}</strong> ` +
                `${escapeHtml(verbs[e.type] || 'used')} <em>${escapeHtml(e.title || 'this tool')}</em>` +
                `<span style="color:#adb5bd"> &middot; ${escapeHtml(e.when || '')}</span>`
            );
            const text = parts.join('&nbsp;&nbsp;&nbsp; &middot; &nbsp;&nbsp;&nbsp;');
            inner.innerHTML = text + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + text;
            ticker.style.display = 'flex';
        }

        function getAnonymousLocationLabel(event) {
            if (event && /^A user from /i.test(event.label || '')) return event.label;
            const places = [
                'Singapore',
                'Malaysia',
                'Indonesia',
                'Brunei',
                'Thailand',
                'the Philippines',
                'Vietnam'
            ];
            const key = String((event && (event.id || event.slug || event.title)) || 'user');
            let hash = 0;
            for (let i = 0; i < key.length; i++) {
                hash = ((hash << 5) - hash) + key.charCodeAt(i);
                hash |= 0;
            }
            return `A user from ${places[Math.abs(hash) % places.length]}`;
        }

        function showFreshToasts(events) {
            events
                .filter(e => e.id > 0 && !e.own && !seenToastIds.has(e.id) && e.type !== 'view')
                .slice(0, 2)
                .forEach(e => {
                    seenToastIds.add(e.id);
                    showToast(e);
                });
        }

        function showToast(e) {
            const container = document.getElementById('activityToastContainer');
            if (!container) return;
            const icons = { download: '&#11015;', generate: '&#9881;', upload: '&#127381;', view: '&#128065;' };
            const colors = { download: '#28a745', generate: '#0b74de', upload: '#fd7e14', view: '#6f42c1' };
            const toast = document.createElement('div');
            toast.className = 'activity-toast';
            toast.style.borderLeftColor = colors[e.type] || '#007bff';
            toast.innerHTML = `
                <span class="activity-toast-icon">${icons[e.type] || '&#128218;'}</span>
                <div class="activity-toast-body">
                    <strong>${escapeHtml(getAnonymousLocationLabel(e))}</strong> used this tool<br>
                    <span class="activity-toast-title">${escapeHtml(e.title || 'SLS Offline ZIP Packager')}</span>
                    <span class="activity-toast-when">${escapeHtml(e.when || '')}</span>
                </div>
                <button class="activity-toast-close" type="button" aria-label="Close">&times;</button>
            `;
            const closeBtn = toast.querySelector('.activity-toast-close');
            if (closeBtn) closeBtn.addEventListener('click', () => toast.remove());
            container.appendChild(toast);
            while (container.children.length > 4) container.firstChild.remove();
            setTimeout(() => {
                toast.classList.add('toast-exit');
                setTimeout(() => toast.remove(), 350);
            }, 6000);
        }

        window.logAizipperActivity = postActivity;
        if (downloadLink) {
            downloadLink.addEventListener('click', () => {
                const title = filenameDisplay && filenameDisplay.textContent ? filenameDisplay.textContent : 'SLS Offline ZIP Packager generated ZIP';
                postActivity('download', 'aizipper-code-to-zip-converter', title);
            });
        }

        ping();
        postActivity('view', 'sls-offline-zip-packager', 'opened SLS Offline ZIP Packager');
        fetchFeed();
        setInterval(ping, 30000);
        setInterval(fetchFeed, 20000);
    }
    
    // Build a small dependency graph from actual runtime resource references.
    // Normal hyperlinks, canonical URLs, and social/share links are intentionally not localized.
    function detectExternalResources(htmlCode, cssCode, jsCode) {
        const resources = new Map();
        const add = (url, context, reason) => {
            url = cleanupDetectedUrl(url);
            if (!isExternalUrl(url)) return;
            if (!shouldLocalizeExternalUrl(url, context, reason)) return;
            const existing = resources.get(url);
            if (existing) {
                existing.reasons.add(reason);
                if (!existing.context && context) existing.context = context;
                return;
            }
            resources.set(url, { url, context, reasons: new Set([reason]) });
        };

        scanHtmlResourceAttributes(htmlCode, add);
        scanCssResourceText(cssCode, add, 'css-input');

        const styleMatches = (htmlCode || '').matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi);
        for (const match of styleMatches) {
            scanCssResourceText(match[1], add, 'inline-style');
        }

        const inlineScriptMatches = (htmlCode || '').matchAll(/<script(?![^>]+\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi);
        for (const match of inlineScriptMatches) {
            scanJavaScriptResourceText(match[1], add, 'inline-script');
        }
        scanJavaScriptResourceText(jsCode, add, 'js-input');

        return Array.from(resources.values()).map(item => ({
            url: item.url,
            context: item.context,
            reason: Array.from(item.reasons).join(', ')
        }));
    }

    function detectExternalUrls(htmlCode, cssCode, jsCode) {
        return detectExternalResources(htmlCode, cssCode, jsCode).map(item => item.url);
    }

    function scanHtmlResourceAttributes(htmlCode, add) {
        const html = htmlCode || '';
        const tagMatches = html.matchAll(/<([a-zA-Z][\w:-]*)([^>]*)>/g);
        for (const match of tagMatches) {
            const tag = match[1].toLowerCase();
            const attrs = parseTagAttributes(match[2] || '');
            if (tag === 'script' && attrs.src) add(attrs.src, 'js', 'script[src]');
            if (tag === 'link' && attrs.href) {
                const rel = (attrs.rel || '').toLowerCase();
                const asType = (attrs.as || '').toLowerCase();
                if (/\bstylesheet\b/.test(rel)) add(attrs.href, 'css', 'link[stylesheet]');
                else if (/\bmodulepreload\b/.test(rel) || asType === 'script') add(attrs.href, 'js', 'link[preload-script]');
                else if (/\b(?:icon|apple-touch-icon|preload|prefetch|manifest)\b/.test(rel)) add(attrs.href, resourceContextFromUrl(attrs.href), `link[${rel || 'resource'}]`);
            }
            if (attrs.src && /^(img|source|audio|video|track|embed|input)$/i.test(tag)) add(attrs.src, resourceContextFromUrl(attrs.src), `${tag}[src]`);
            if (attrs.poster) add(attrs.poster, 'asset', `${tag}[poster]`);
            if (attrs.data && /^(object)$/i.test(tag)) add(attrs.data, resourceContextFromUrl(attrs.data), `${tag}[data]`);
            if (attrs.srcset) {
                for (const url of parseSrcset(attrs.srcset)) add(url, 'asset', `${tag}[srcset]`);
            }
            if (attrs.style) scanCssResourceText(attrs.style, add, `${tag}[style]`);
        }

        const importMapMatches = html.matchAll(/<script[^>]*type\s*=\s*['"]importmap['"][^>]*>([\s\S]*?)<\/script>/gi);
        for (const match of importMapMatches) {
            try {
                const jsonMatch = match[1].match(/\{[\s\S]*\}/);
                if (!jsonMatch) continue;
                const importMap = JSON.parse(jsonMatch[0]);
                if (importMap.imports) {
                    for (const value of Object.values(importMap.imports)) {
                        if (typeof value === 'string') add(value, 'js', 'importmap');
                    }
                }
            } catch (e) {
                console.warn('Failed to parse import map:', e);
            }
        }
    }

    function parseTagAttributes(attrText) {
        const attrs = {};
        const matches = (attrText || '').matchAll(/([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g);
        for (const match of matches) {
            attrs[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? '';
        }
        return attrs;
    }

    function parseSrcset(srcset) {
        return (srcset || '')
            .split(',')
            .map(part => part.trim().split(/\s+/)[0])
            .filter(Boolean);
    }

    function scanCssResourceText(cssText, add, reason) {
        const css = cssText || '';
        const importMatches = css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s]+)['"]?\)?/gi);
        for (const match of importMatches) add(match[1], 'css', `${reason}:@import`);

        const urlMatches = css.matchAll(/url\((['"]?)([^'")]+)\1\)/gi);
        for (const match of urlMatches) add(match[2], resourceContextFromUrl(match[2]), `${reason}:url()`);
    }

    function scanJavaScriptResourceText(jsText, add, reason) {
        const js = jsText || '';
        const importMatches = js.matchAll(/import\s+(?:[^'"]*?\s+from\s*)?['"]([^'"]+)['"]/gi);
        for (const match of importMatches) add(match[1], 'js', `${reason}:import`);

        const dynamicImportMatches = js.matchAll(/import\s*\(\s*['"]([^'"]+)['"]\s*\)/gi);
        for (const match of dynamicImportMatches) add(match[1], 'js', `${reason}:dynamic-import`);

        const assignedResourceMatches = js.matchAll(/\b(?:src|href|url|poster|image|audio|video|font|model)\s*[:=]\s*['"](https?:\/\/[^'"]+)['"]/gi);
        for (const match of assignedResourceMatches) add(match[1], resourceContextFromUrl(match[1]), `${reason}:resource-property`);

        const stringUrlMatches = js.matchAll(/['"](https?:\/\/[^'"]+)['"]/gi);
        for (const match of stringUrlMatches) {
            const url = cleanupDetectedUrl(match[1]);
            if (isLikelyRuntimeAssetUrl(url)) add(url, resourceContextFromUrl(url), `${reason}:asset-string`);
        }
    }

    function resourceContextFromUrl(url) {
        const clean = (url || '').split('?')[0].toLowerCase();
        if (/\.(?:m?js|wasm)$/.test(clean) || isTailwindCdnUrl(url)) return 'js';
        if (/\.css$/.test(clean) || /fonts\.googleapis\.com/i.test(url || '')) return 'css';
        return 'asset';
    }

    function shouldLocalizeExternalUrl(url, context, reason) {
        if (!url || /^data:/i.test(url)) return false;
        if (context === 'js' || context === 'css' || context === 'asset') return true;
        return isLikelyRuntimeAssetUrl(url) || /(?:cdn|cdnjs|jsdelivr|unpkg|gstatic|googleapis)/i.test(url);
    }

    function isLikelyRuntimeAssetUrl(url) {
        const clean = (url || '').split('?')[0].toLowerCase();
        if (/\.(?:js|mjs|css|wasm|json|png|jpe?g|gif|webp|svg|ico|bmp|avif|mp3|wav|ogg|m4a|mp4|webm|woff2?|ttf|otf|glb|gltf|bin)$/i.test(clean)) return true;
        try {
            const host = new URL(url).hostname;
            return /(?:^cdn\.|cdnjs|jsdelivr|unpkg|gstatic|googleapis|images\.unsplash\.com|images\.pexels\.com|cdn\.pixabay\.com|raw\.githubusercontent\.com)/i.test(host);
        } catch (e) {
            return false;
        }
    }

    function cleanupDetectedUrl(url) {
        return (url || '').replace(/[.;,\])}]+$/g, '');
    }
    
    // Function to check if URL is external
    function isExternalUrl(url) {
        return /^https?:\/\//.test(url) && !url.includes('localhost') && !url.includes('127.0.0.1');
    }

    function isTextResource(url, contentType, context) {
        const lowered = (url || '').split('?')[0].toLowerCase();
        return context === 'js' ||
            context === 'css' ||
            /^text\//i.test(contentType || '') ||
            /(?:javascript|json|xml|svg|css)/i.test(contentType || '') ||
            /\.(?:js|mjs|css|json|txt|html|htm|svg|xml)$/i.test(lowered);
    }

    function isCssResource(url, contentType, context) {
        const lowered = (url || '').split('?')[0].toLowerCase();
        return context === 'css' || /text\/css/i.test(contentType || '') || /\.css$/i.test(lowered) || /fonts\.googleapis\.com/i.test(url || '');
    }

    async function downloadExternalResource(url, context = null) {
        const normalizedUrl = normalizeExternalUrl(url);
        try {
            const response = await fetch(normalizedUrl, {
                mode: 'cors',
                headers: { 'Accept': '*/*' }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get('content-type') || '';
            if (isTextResource(normalizedUrl, contentType, context)) {
                const content = await response.text();

                try {
                    const host = new URL(normalizedUrl).hostname;
                    if (host === 'cdn.tailwindcss.com' && content.length < 50000) {
                        throw new Error('Suspiciously small Tailwind CDN response (likely a loader or blocked fetch)');
                    }
                } catch (e) {
                    if (/Suspiciously small Tailwind/.test(e.message || '')) throw e;
                }

                return { ok: true, normalizedUrl, content, contentType, isText: true };
            }

            const content = await response.arrayBuffer();
            return { ok: true, normalizedUrl, content, contentType, isText: false };
        } catch (error) {
            console.warn(`Failed to download ${normalizedUrl}:`, error);
            const message = `Failed to fetch normalized URL: ${normalizedUrl}. Error: ${error.message}`;
            if (context === 'js') {
                return { ok: false, normalizedUrl, content: `// ${message}\n// NOTE: This placeholder prevents corrupt ZIPs.\n`, contentType: 'text/javascript', isText: true };
            }
            if (context === 'css') {
                return { ok: false, normalizedUrl, content: `/* ${message} */\n/* NOTE: This placeholder prevents corrupt ZIPs. */\n`, contentType: 'text/css', isText: true };
            }
            return { ok: false, normalizedUrl, content: makeOfflinePlaceholderSvg(message), contentType: 'image/svg+xml', isText: true };
        }
    }

    function makeOfflinePlaceholderSvg(message) {
        const safe = escapeHtml(message).slice(0, 220);
        return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
<rect width="640" height="360" fill="#f3f4f6"/>
<rect x="24" y="24" width="592" height="312" rx="14" fill="#fff" stroke="#d1d5db"/>
<text x="50%" y="48%" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="#374151">Offline asset unavailable</text>
<text x="50%" y="58%" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#6b7280">${safe}</text>
</svg>`;
    }
    
    // Function to download external file (with basic sanity checks + normalization)
    async function downloadExternalFile(url) {
        const resource = await downloadExternalResource(url, null);
        return resource.content;
    }
    
    // Determine likely resource context for a URL (js/css) based on where it appears
    function determineUrlContext(url, htmlCode, cssCode, jsCode) {
        try {
            const esc = escapeRegExp(url);
            const reScript = new RegExp(`<script[^>]+src\\s*=\\s*['"]${esc}['"][^>]*>`, 'i');
            if (reScript.test(htmlCode)) return 'js';
            const reLink = new RegExp(`<link[^>]+href\\s*=\\s*['"]${esc}['"][^>]*>`, 'i');
            if (reLink.test(htmlCode)) return 'css';
            const reMediaAttr = new RegExp(`\\b(?:src|poster)\\s*=\\s*['"]${esc}['"]`, 'i');
            if (reMediaAttr.test(htmlCode)) return 'asset';
            const reCssImport = new RegExp(`@import\\s+(?:url\\()?['"]?${esc}['"]?\\)?`, 'i');
            if (reCssImport.test(cssCode)) return 'css';
            const reCssUrl = new RegExp(`url\\(['"]?${esc}['"]?\\)`, 'i');
            if (reCssUrl.test(htmlCode) || reCssUrl.test(cssCode)) return 'asset';
            const reJsImport = new RegExp(`import\\s+[^;]*from\\s*['"]${esc}['"]`, 'i');
            if (reJsImport.test(htmlCode) || reJsImport.test(jsCode)) return 'js';
            const reDynImport = new RegExp(`import\\s*\\(\\s*['"]${esc}['"]\\s*\\)`, 'i');
            if (reDynImport.test(htmlCode) || reDynImport.test(jsCode)) return 'js';
        } catch (e) {}
        return null;
    }
    
    // Normalize certain CDN URLs (e.g., pin Tailwind to a concrete version)
    function normalizeExternalUrl(url) {
        try {
            const u = new URL(url);
            if (u.hostname === 'cdn.tailwindcss.com') {
                const path = (u.pathname || '/').replace(/\/+$/, '');
                // If no explicit version path, pin to 3.4.17
                if (path === '' || path === '/') {
                    u.pathname = '/3.4.17';
                    return u.toString();
                }
            }
        } catch (e) {}
        return url;
    }
    
    // Function to generate local filename from URL, with context-based extension and vendor/ prefix
    function generateLocalFilename(url, index = 0, context = null) {
        try {
            const urlObj = new URL(url);
            // Special-case Tailwind CDN to produce a meaningful filename
            if (urlObj.hostname === 'cdn.tailwindcss.com') {
                const segs = urlObj.pathname.split('/').filter(Boolean);
                const version = segs[0] || 'latest';
                const base = `tailwindcss-${version}.js`;
                return `vendor/${base}`;
            }
            let filename = urlObj.pathname.split('/').pop() || '';
            
            const hasExt = /\.[^.]+$/.test(filename);
            const looksLikeModule = /(?:\bmodule\b|\/jsm\/|\/esm\/|\.mjs)(\?|$)/i.test(url);

            if (!filename || !hasExt) {
                let ext = 'txt';
                if (context === 'js' || looksLikeModule || /\.js(\?|$)/i.test(url)) ext = 'js';
                else if (context === 'css' || /\.css(\?|$)/i.test(url)) ext = 'css';
                else if (/images\.unsplash\.com|images\.pexels\.com|images\.pixabay\.com/i.test(url)) ext = 'jpg';
                filename = `external_${index}.${ext}`;
            } else {
                // If context dictates a better extension for script or stylesheet
                if (context === 'js' && !/\.(m?js)$/i.test(filename)) {
                    filename = filename.replace(/\.[^.]*$/, '.js');
                } else if (context === 'css' && !/\.css$/i.test(filename)) {
                    filename = filename.replace(/\.[^.]*$/, '.css');
                }
                if (index > 0) {
                    const parts = filename.split('.');
                    const ext = parts.pop();
                    const name = parts.join('.');
                    filename = `${name}_${index}.${ext}`;
                }
            }
            
            return `vendor/${filename}`;
        } catch (error) {
            const ext = context === 'js' ? 'js' : context === 'css' ? 'css' : (url.includes('.css') ? 'css' : url.includes('.js') ? 'js' : 'txt');
            return `vendor/external_${index}.${ext}`;
        }
    }
    
    // Function to update code with local file references
    function updateCodeWithLocalFiles(htmlCode, cssCode, jsCode, urlMappings) {
        let updatedHtml = htmlCode;
        let updatedCss = cssCode;
        let updatedJs = jsCode;
        
        // Update HTML
        for (const [originalUrl, localFilename] of Object.entries(urlMappings)) {
            // Update script src attributes
            updatedHtml = updatedHtml.replace(
                new RegExp(`(<script[^>]+src\\s*=\\s*['"])${escapeRegExp(originalUrl)}(['"][^>]*>)`, 'gi'),
                `$1${localFilename}$2`
            );
            
            // Update link href attributes
            updatedHtml = updatedHtml.replace(
                new RegExp(`(<link[^>]+href\\s*=\\s*['"])${escapeRegExp(originalUrl)}(['"][^>]*>)`, 'gi'),
                `$1${localFilename}$2`
            );
            
            // Update import maps
            updatedHtml = updatedHtml.replace(
                new RegExp(`(['"])${escapeRegExp(originalUrl)}(['"])`, 'gi'),
                `$1${localFilename}$2`
            );
            
            // Update ES6 imports in inline script tags
            updatedHtml = updatedHtml.replace(
                new RegExp(`(import\\s+.*?from\\s*['"])${escapeRegExp(originalUrl)}(['"])`, 'gi'),
                `$1${localFilename}$2`
            );
            
            // Update dynamic imports in inline script tags
            updatedHtml = updatedHtml.replace(
                new RegExp(`(import\\s*\\(\\s*['"])${escapeRegExp(originalUrl)}(['"]\\s*\\))`, 'gi'),
                `$1${localFilename}$2`
            );

            // Update other inline HTML references, such as image URLs inside one-file game data arrays.
            updatedHtml = updatedHtml.replace(
                new RegExp(escapeRegExp(originalUrl), 'g'),
                localFilename
            );
        }
        
        // Update CSS
        for (const [originalUrl, localFilename] of Object.entries(urlMappings)) {
            // Update @import statements
            updatedCss = updatedCss.replace(
                new RegExp(`(@import\\s+(?:url\\()?['"]?)${escapeRegExp(originalUrl)}(['"]?\\)?[^;]*;?)`, 'gi'),
                `$1${localFilename}$2`
            );
            
            // Update url() functions
            updatedCss = updatedCss.replace(
                new RegExp(`(url\\(['"]?)${escapeRegExp(originalUrl)}(['"]?\\))`, 'gi'),
                `$1${localFilename}$2`
            );
        }
        
        // Update JavaScript
        for (const [originalUrl, localFilename] of Object.entries(urlMappings)) {
            // Update ES6 import statements
            updatedJs = updatedJs.replace(
                new RegExp(`(import\\s+.*?from\\s*['"])${escapeRegExp(originalUrl)}(['"])`, 'gi'),
                `$1${localFilename}$2`
            );
            
            // Update dynamic imports
            updatedJs = updatedJs.replace(
                new RegExp(`(import\\s*\\(\\s*['"])${escapeRegExp(originalUrl)}(['"]\\s*\\))`, 'gi'),
                `$1${localFilename}$2`
            );
            
            // Update general URL references
            updatedJs = updatedJs.replace(
                new RegExp(`(['"])${escapeRegExp(originalUrl)}(['"])`, 'gi'),
                `$1${localFilename}$2`
            );
        }
        
        return { updatedHtml, updatedCss, updatedJs };
    }

    function getDirectoryPath(path) {
        const normalized = (path || '').replace(/\\/g, '/');
        const idx = normalized.lastIndexOf('/');
        return idx >= 0 ? normalized.slice(0, idx) : '';
    }

    function getRelativePath(fromFile, toFile) {
        const fromDir = getDirectoryPath(fromFile);
        const fromParts = fromDir ? fromDir.split('/').filter(Boolean) : [];
        const toParts = (toFile || '').split('/').filter(Boolean);
        while (fromParts.length && toParts.length && fromParts[0] === toParts[0]) {
            fromParts.shift();
            toParts.shift();
        }
        const ups = fromParts.map(() => '..');
        return ups.concat(toParts).join('/') || toFile;
    }

    async function localizeCssNestedResources(cssContent, cssUrl, cssLocalFilename, zip, urlMappings, usedLocalFilenames) {
        if (!cssContent || typeof cssContent !== 'string') return cssContent;
        const nestedUrls = [];
        const matches = cssContent.matchAll(/url\((['"]?)([^'")]+)\1\)/gi);
        for (const match of matches) {
            const rawUrl = match[2];
            if (!rawUrl || rawUrl.startsWith('data:') || rawUrl.startsWith('#')) continue;
            let absoluteUrl = rawUrl;
            try {
                absoluteUrl = new URL(rawUrl, cssUrl).toString();
            } catch (e) {
                continue;
            }
            if (isExternalUrl(absoluteUrl) && !nestedUrls.includes(absoluteUrl)) {
                nestedUrls.push(absoluteUrl);
            }
        }

        let rewrittenCss = cssContent;
        for (const nestedUrl of nestedUrls) {
            let localFilename = urlMappings[nestedUrl];
            if (!localFilename) {
                localFilename = getUniqueLocalFilename(generateLocalFilename(nestedUrl, usedLocalFilenames.size, 'asset'), usedLocalFilenames);
                const nestedResource = await downloadExternalResource(nestedUrl, 'asset');
                if (!nestedResource.ok && nestedResource.contentType === 'image/svg+xml' && !/\.svg$/i.test(localFilename)) {
                    localFilename = getUniqueLocalFilename(localFilename.replace(/\.[^/.]+$/, '') + '.svg', usedLocalFilenames);
                }
                zip.file(localFilename, nestedResource.content, { compression: isIncompressible(localFilename) ? 'STORE' : 'DEFLATE' });
                urlMappings[nestedUrl] = localFilename;
                urlMappings[nestedResource.normalizedUrl] = localFilename;
            }
            const relativePath = getRelativePath(cssLocalFilename, localFilename);
            rewrittenCss = rewrittenCss.replace(new RegExp(escapeRegExp(nestedUrl), 'g'), relativePath);
        }
        return rewrittenCss;
    }

    function pruneGoogleFontsCss(cssContent, cssUrl, htmlCode, cssCode, jsCode) {
        if (!cssContent || !/fonts\.googleapis\.com/i.test(cssUrl || '') || !/@font-face/i.test(cssContent)) {
            return cssContent;
        }

        const usedCodepoints = collectUsedCodepoints(`${htmlCode || ''}\n${cssCode || ''}\n${jsCode || ''}`);
        const fontFaceRegex = /@font-face\s*\{[\s\S]*?\}/gi;
        let keptCount = 0;
        let totalCount = 0;
        const pruned = cssContent.replace(fontFaceRegex, block => {
            totalCount++;
            const rangeMatch = block.match(/unicode-range\s*:\s*([^;]+);/i);
            if (!rangeMatch || unicodeRangeIntersectsUsedText(rangeMatch[1], usedCodepoints)) {
                keptCount++;
                return block;
            }
            return '';
        }).replace(/\n{3,}/g, '\n\n').trim();

        if (totalCount > 0 && keptCount > 0) {
            console.info(`Pruned Google Fonts CSS from ${totalCount} unicode subset(s) to ${keptCount} used subset(s).`);
            return pruned + '\n';
        }
        return cssContent;
    }

    function collectUsedCodepoints(text) {
        const points = new Set();
        for (const ch of text || '') {
            const code = ch.codePointAt(0);
            if (code) points.add(code);
        }
        // Keep the printable ASCII range because generated pages often build labels dynamically.
        for (let code = 0x20; code <= 0x7e; code++) points.add(code);
        return points;
    }

    function unicodeRangeIntersectsUsedText(rangeText, usedCodepoints) {
        const ranges = String(rangeText || '').split(',');
        for (const rawRange of ranges) {
            const range = rawRange.trim().toUpperCase();
            if (!range.startsWith('U+')) continue;
            const body = range.slice(2);
            if (body.includes('?')) {
                const start = parseInt(body.replace(/\?/g, '0'), 16);
                const end = parseInt(body.replace(/\?/g, 'F'), 16);
                if (setHasCodepointBetween(usedCodepoints, start, end)) return true;
            } else if (body.includes('-')) {
                const [startText, endText] = body.split('-');
                const start = parseInt(startText, 16);
                const end = parseInt(endText, 16);
                if (setHasCodepointBetween(usedCodepoints, start, end)) return true;
            } else {
                const code = parseInt(body, 16);
                if (usedCodepoints.has(code)) return true;
            }
        }
        return false;
    }

    function setHasCodepointBetween(points, start, end) {
        if (!Number.isFinite(start) || !Number.isFinite(end)) return false;
        for (const code of points) {
            if (code >= start && code <= end) return true;
        }
        return false;
    }

    function getUniqueLocalFilename(candidate, usedLocalFilenames) {
        if (!usedLocalFilenames.has(candidate)) {
            usedLocalFilenames.add(candidate);
            return candidate;
        }
        const dot = candidate.lastIndexOf('.');
        const base = dot >= 0 ? candidate.slice(0, dot) : candidate;
        const ext = dot >= 0 ? candidate.slice(dot) : '';
        let i = 1;
        let next = `${base}_${i}${ext}`;
        while (usedLocalFilenames.has(next)) {
            i++;
            next = `${base}_${i}${ext}`;
        }
        usedLocalFilenames.add(next);
        return next;
    }

    function isTailwindCdnUrl(url) {
        try {
            return new URL(url).hostname === 'cdn.tailwindcss.com';
        } catch (e) {
            return false;
        }
    }

    function buildTailwindOfflineRuntime(htmlCode) {
        const classes = new Set();
        const classMatches = (htmlCode || '').matchAll(/\bclass\s*=\s*(['"])([\s\S]*?)\1/gi);
        for (const match of classMatches) {
            match[2].split(/\s+/).forEach(cls => {
                if (cls && !/[{};]/.test(cls)) classes.add(cls.trim());
            });
        }

        const cssLines = ['/* Offline Tailwind fallback generated by SLS Offline ZIP Packager. Covers utility classes detected in this HTML. */'];
        for (const cls of classes) {
            const rule = tailwindUtilityToRule(cls);
            if (rule) cssLines.push(rule);
        }

        const css = cssLines.join('\n');
        return `(function(){\n` +
            `  var css = ${JSON.stringify(css)};\n` +
            `  var style = document.createElement('style');\n` +
            `  style.setAttribute('data-aizipper-tailwind-fallback', 'true');\n` +
            `  style.textContent = css;\n` +
            `  document.head.appendChild(style);\n` +
            `})();\n`;
    }

    function tailwindUtilityToRule(originalClass) {
        let cls = originalClass;
        let media = null;
        if (cls.startsWith('sm:')) { media = '640px'; cls = cls.slice(3); }
        else if (cls.startsWith('md:')) { media = '768px'; cls = cls.slice(3); }
        else if (cls.startsWith('lg:')) { media = '1024px'; cls = cls.slice(3); }
        else if (cls.startsWith('xl:')) { media = '1280px'; cls = cls.slice(3); }
        else if (cls.includes(':')) {
            return null;
        }

        const declarations = tailwindDeclarations(cls);
        if (!declarations) return null;
        const selector = `.${cssEscapeClass(originalClass)}`;
        const rule = `${selector}{${declarations}}`;
        return media ? `@media (min-width:${media}){${rule}}` : rule;
    }

    function cssEscapeClass(cls) {
        return cls.replace(/([^a-zA-Z0-9_-])/g, '\\$1');
    }

    function tailwindDeclarations(cls) {
        const spacing = {
            '0': '0', '0.5': '0.125rem', '1': '0.25rem', '1.5': '0.375rem', '2': '0.5rem',
            '2.5': '0.625rem', '3': '0.75rem', '4': '1rem', '5': '1.25rem', '6': '1.5rem',
            '8': '2rem', '10': '2.5rem', '12': '3rem', '16': '4rem', '20': '5rem', '24': '6rem'
        };
        const colors = {
            white: '#fff', black: '#000', transparent: 'transparent',
            'gray-50': '#f9fafb', 'gray-100': '#f3f4f6', 'gray-200': '#e5e7eb', 'gray-300': '#d1d5db',
            'gray-400': '#9ca3af', 'gray-500': '#6b7280', 'gray-600': '#4b5563', 'gray-700': '#374151',
            'gray-800': '#1f2937', 'gray-900': '#111827',
            'green-400': '#4ade80', 'green-500': '#22c55e', 'green-600': '#16a34a', 'green-700': '#15803d',
            'yellow-300': '#fde047', 'yellow-400': '#facc15', 'yellow-500': '#eab308',
            'red-400': '#f87171', 'red-500': '#ef4444', 'red-600': '#dc2626',
            'blue-400': '#60a5fa', 'blue-500': '#3b82f6', 'blue-600': '#2563eb',
            'sky-400': '#38bdf8', 'sky-500': '#0ea5e9', 'amber-500': '#f59e0b', 'orange-500': '#f97316'
        };
        const fontSizes = {
            xs: '0.75rem;line-height:1rem', sm: '0.875rem;line-height:1.25rem',
            base: '1rem;line-height:1.5rem', lg: '1.125rem;line-height:1.75rem',
            xl: '1.25rem;line-height:1.75rem', '2xl': '1.5rem;line-height:2rem',
            '3xl': '1.875rem;line-height:2.25rem', '4xl': '2.25rem;line-height:2.5rem',
            '5xl': '3rem;line-height:1', '6xl': '3.75rem;line-height:1'
        };

        const simple = {
            flex: 'display:flex', grid: 'display:grid', block: 'display:block', hidden: 'display:none!important',
            relative: 'position:relative', absolute: 'position:absolute', fixed: 'position:fixed',
            'flex-col': 'flex-direction:column', 'flex-row': 'flex-direction:row', 'flex-wrap': 'flex-wrap:wrap',
            'items-center': 'align-items:center', 'items-start': 'align-items:flex-start', 'items-end': 'align-items:flex-end',
            'justify-center': 'justify-content:center', 'justify-between': 'justify-content:space-between', 'justify-end': 'justify-content:flex-end',
            'text-center': 'text-align:center', 'text-left': 'text-align:left', 'text-right': 'text-align:right',
            'font-bold': 'font-weight:700', 'font-semibold': 'font-weight:600', 'font-extrabold': 'font-weight:800',
            uppercase: 'text-transform:uppercase', italic: 'font-style:italic',
            'w-full': 'width:100%', 'h-full': 'height:100%', 'min-h-screen': 'min-height:100vh',
            'max-w-md': 'max-width:28rem', 'max-w-lg': 'max-width:32rem', 'max-w-xl': 'max-width:36rem', 'max-w-2xl': 'max-width:42rem',
            'mx-auto': 'margin-left:auto;margin-right:auto',
            'overflow-hidden': 'overflow:hidden', 'overflow-auto': 'overflow:auto',
            'cursor-pointer': 'cursor:pointer', 'select-none': 'user-select:none',
            'rounded': 'border-radius:0.25rem', 'rounded-md': 'border-radius:0.375rem', 'rounded-lg': 'border-radius:0.5rem',
            'rounded-xl': 'border-radius:0.75rem', 'rounded-2xl': 'border-radius:1rem', 'rounded-full': 'border-radius:9999px',
            border: 'border-width:1px;border-style:solid', 'border-2': 'border-width:2px;border-style:solid',
            'shadow': 'box-shadow:0 1px 3px rgba(0,0,0,.1),0 1px 2px rgba(0,0,0,.06)',
            'shadow-lg': 'box-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1)',
            transition: 'transition-property:color,background-color,border-color,transform,opacity;transition-duration:150ms',
            transform: 'transform:translateZ(0)'
        };
        if (simple[cls]) return simple[cls];

        let m = cls.match(/^grid-cols-(\d+)$/);
        if (m) return `grid-template-columns:repeat(${m[1]},minmax(0,1fr))`;
        m = cls.match(/^z-(\d+)$/);
        if (m) return `z-index:${m[1]}`;
        if (cls === 'inset-0') return 'inset:0';
        m = cls.match(/^(top|right|bottom|left)-(\d+)$/);
        if (m && spacing[m[2]]) return `${m[1]}:${spacing[m[2]]}`;
        m = cls.match(/^(p|m|gap)-([\d.]+)$/);
        if (m && spacing[m[2]]) return `${m[1] === 'p' ? 'padding' : m[1] === 'm' ? 'margin' : 'gap'}:${spacing[m[2]]}`;
        m = cls.match(/^(px|py|pt|pr|pb|pl|mt|mr|mb|ml)-([\d.]+)$/);
        if (m && spacing[m[2]]) {
            const prop = m[1][0] === 'p' ? 'padding' : 'margin';
            const side = m[1][1];
            if (side === 'x') return `${prop}-left:${spacing[m[2]]};${prop}-right:${spacing[m[2]]}`;
            if (side === 'y') return `${prop}-top:${spacing[m[2]]};${prop}-bottom:${spacing[m[2]]}`;
            const sideMap = { t: 'top', r: 'right', b: 'bottom', l: 'left' };
            return `${prop}-${sideMap[side]}:${spacing[m[2]]}`;
        }
        m = cls.match(/^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)$/);
        if (m) return `font-size:${fontSizes[m[1]]}`;
        m = cls.match(/^(text|bg|border)-([a-z]+(?:-\d+)?)(?:\/(\d+))?$/);
        if (m && colors[m[2]]) {
            const value = m[3] ? hexToRgba(colors[m[2]], Number(m[3]) / 100) : colors[m[2]];
            const prop = m[1] === 'text' ? 'color' : m[1] === 'bg' ? 'background-color' : 'border-color';
            return `${prop}:${value}`;
        }
        return null;
    }

    function hexToRgba(hex, alpha) {
        if (hex === '#fff') return `rgba(255,255,255,${alpha})`;
        if (hex === '#000') return `rgba(0,0,0,${alpha})`;
        const value = hex.replace('#', '');
        const r = parseInt(value.slice(0, 2), 16);
        const g = parseInt(value.slice(2, 4), 16);
        const b = parseInt(value.slice(4, 6), 16);
        return `rgba(${r},${g},${b},${alpha})`;
    }
    
    // Helper function to escape special regex characters
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    // Function to convert ES6 modules to SLS-compatible format
    function convertToSlsCompatible(htmlCode, urlMappings) {
        let updatedHtml = htmlCode;
        
        // Check if the HTML contains ES6 modules or import maps
        const hasImportMap = /<script[^>]*type\s*=\s*['"]importmap['"][^>]*>/i.test(updatedHtml);
        const hasModuleScript = /<script[^>]*type\s*=\s*['"]module['"][^>]*>/i.test(updatedHtml);
        
        if (!hasImportMap && !hasModuleScript) {
            return updatedHtml; // No ES6 modules to convert
        }
        
        // Create SLS-compatible version
        let slsCompatibleHtml = updatedHtml;
        
        // Extract import map information before removing it
        let importMapData = {};
        const importMapMatches = slsCompatibleHtml.matchAll(/<script[^>]*type\s*=\s*['"]importmap['"][^>]*>([\s\S]*?)<\/script>/gi);
        for (const match of importMapMatches) {
            try {
                const importMapContent = match[1];
                const jsonMatch = importMapContent.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const importMap = JSON.parse(jsonMatch[0]);
                    if (importMap.imports) {
                        importMapData = { ...importMapData, ...importMap.imports };
                    }
                }
            } catch (e) {
                console.warn('Failed to parse import map for conversion:', e);
            }
        }
        
        // Remove import maps entirely (they don't work in SLS)
        slsCompatibleHtml = slsCompatibleHtml.replace(/<script[^>]*type\s*=\s*['"]importmap['"][^>]*>[\s\S]*?<\/script>/gi, 
            '<!-- Import map removed for SLS compatibility -->');
        
        // Add traditional script tags for libraries that were in the import map
        let traditionalScripts = '';
        for (const [key, value] of Object.entries(importMapData)) {
            if (urlMappings[value]) {
                // Find the local filename for this URL
                const localFile = urlMappings[value];
                if (key === 'three') {
                    traditionalScripts += `<script src="${localFile}"></script>\n`;
                }
            }
        }
        
        // Insert traditional script tags before the first module script
        if (traditionalScripts) {
            const firstModuleScript = slsCompatibleHtml.search(/<script[^>]*type\s*=\s*['"]module['"][^>]*>/i);
            if (firstModuleScript !== -1) {
                slsCompatibleHtml = slsCompatibleHtml.slice(0, firstModuleScript) + 
                                  traditionalScripts + 
                                  slsCompatibleHtml.slice(firstModuleScript);
            } else {
                // If no module script found, add before closing head
                if (slsCompatibleHtml.includes('</head>')) {
                    slsCompatibleHtml = slsCompatibleHtml.replace('</head>', traditionalScripts + '</head>');
                }
            }
        }
        
        // Convert module scripts to regular scripts
        slsCompatibleHtml = slsCompatibleHtml.replace(/<script([^>]*)\s+type\s*=\s*['"]module['"]([^>]*)>/gi, 
            '<script$1$2>');
        
        // Convert ES6 import statements to global variable access
        // Handle different import patterns
        slsCompatibleHtml = slsCompatibleHtml.replace(/import\s+\*\s+as\s+(\w+)\s+from\s+['"]three['"];?\s*/gi, 
            '// Using global THREE instead of ES6 import\n        const $1 = window.THREE || THREE;\n        ');
        
        slsCompatibleHtml = slsCompatibleHtml.replace(/import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]three\/addons\/([^'"]*?)['"];?\s*/gi, 
            '// Three.js addons - converted for SLS compatibility\n        // Original: import { $1 } from "three/addons/$2"\n        // Note: Addons may need manual integration\n        ');
        
        // Handle other common import patterns
        slsCompatibleHtml = slsCompatibleHtml.replace(/import\s+([^{][^from]*?)\s+from\s+['"]three['"];?\s*/gi, 
            '// Using global THREE instead of ES6 import\n        const $1 = window.THREE || THREE;\n        ');
        
        // Add a comment explaining the conversion
        const conversionNote = `
    <!-- 
    ⚠️ SLS COMPATIBILITY MODE ACTIVATED ⚠️
    
    This HTML has been automatically converted for Singapore Learning Space (SLS) compatibility:
    - Import maps have been removed (not supported in SLS)
    - ES6 module scripts converted to regular scripts
    - Import statements converted to global variable access
    - External libraries loaded as traditional script tags
    
    Note: Some advanced features may not work in SLS due to security restrictions.
    For full functionality, use the included local server files.
    -->
    `;
        
        // Add the conversion note after the opening <head> tag
        if (slsCompatibleHtml.includes('<head>')) {
            slsCompatibleHtml = slsCompatibleHtml.replace('<head>', '<head>' + conversionNote);
        } else {
            slsCompatibleHtml = conversionNote + slsCompatibleHtml;
        }
        
        return slsCompatibleHtml;
    }
    
    // Function to show SLS compatibility warnings
    function showSlsWarnings(externalUrls) {
        if (externalUrls.length === 0) return '';
        
        const warnings = [
            '⚠️ SLS (Singapore Learning Space) Compatibility Warnings:',
            '',
            'The following external dependencies were detected and downloaded:',
            ...externalUrls.map(url => `• ${url}`),
            '',
            '🚨 IMPORTANT: ES6 Modules and Import Maps Limitation:',
            'If your code uses ES6 modules (import/export) or import maps, it will NOT work',
            'when opened directly as a file (file://) due to CORS restrictions.',
            '',
            '✅ SOLUTION: Use the included local server',
            '• Windows: Double-click "start_server.bat"',
            '• Mac/Linux: Run "bash start_server.sh" or "python3 server.py"',
            '• Then open http://localhost:8000 in your browser',
            '',
            'Note: Some features may not work properly in SLS due to:',
            '• Restricted internet access in SLS environment',
            '• Content Security Policy limitations',
            '• JavaScript execution restrictions',
            '• ES6 module loading restrictions',
            '',
            'All external files have been downloaded and included in this ZIP for offline use.',
            'If you encounter issues in SLS, consider:',
            '• Using simpler, vanilla JavaScript instead of complex libraries',
            '• Avoiding external API calls',
            '• Converting ES6 modules to regular script tags',
            '• Testing thoroughly in the SLS environment',
            ''
        ];
        
        return warnings.join('\n');
    }

    // Capture a 320x180 thumbnail of the interactive using html2canvas
    async function captureThumbnailFromCode(htmlCode, cssCode, jsCode) {
        if (!htmlCode || typeof html2canvas === 'undefined') return null;

        return new Promise((resolve) => {
            try {
                const iframe = document.createElement('iframe');
                iframe.style.position = 'absolute';
                iframe.style.left = '-9999px';
                iframe.style.top = '-9999px';
                iframe.style.width = '320px';
                iframe.style.height = '180px';
                iframe.style.border = '0';
                document.body.appendChild(iframe);

                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                iframeDoc.open();

                let contentForPreview = htmlCode.trim();

                // Apply optional add-ons (GA, AdSense, footer credit)
                contentForPreview = applyAddOns(contentForPreview);

                // Preprocess CSS if present (rewrite url() using imported assets if available)
                let cssForPreview = (cssCode || '').trim();
                if (cssForPreview !== '' && Object.keys(importedFiles).length) {
                    const cssBase = importedMainPaths.css || (importedMainPaths.html || 'index.html');
                    cssForPreview = replaceCssUrls(cssForPreview, cssBase);
                }

                // Embed CSS if provided
                if (cssForPreview !== '') {
                    if (contentForPreview.includes('</head>')) {
                        contentForPreview = contentForPreview.replace('</head>', `<style>\n${cssForPreview}\n</style>\n</head>`);
                    } else {
                        contentForPreview = `<style>\n${cssForPreview}\n</style>\n` + contentForPreview;
                    }
                }

                // Embed JS if provided
                const jsForPreview = (jsCode || '').trim();
                if (jsForPreview !== '') {
                    if (contentForPreview.includes('</body>')) {
                        contentForPreview = contentForPreview.replace('</body>', `<script>\n${jsForPreview}\n</script>\n</body>`);
                    } else {
                        contentForPreview += `\n<script>\n${jsForPreview}\n</script>`;
                    }
                }

                // Rewrite asset paths in HTML to blob URLs if an imported ZIP is available
                if (Object.keys(importedFiles).length && importedMainPaths.html) {
                    contentForPreview = replaceAssetPathsInHtml(contentForPreview, importedMainPaths.html);
                }

                iframeDoc.write(contentForPreview);
                iframeDoc.close();

                const cleanupAndResolve = (blob) => {
                    try {
                        document.body.removeChild(iframe);
                    } catch (e) {
                        // Ignore
                    }
                    resolve(blob || null);
                };

                iframe.onload = () => {
                    try {
                        const targetDoc = iframe.contentWindow.document;
                        const body = targetDoc.body;
                        if (!body) return cleanupAndResolve(null);

                        // Ensure a minimum size so the thumbnail isn't blank
                        body.style.minWidth = '320px';
                        body.style.minHeight = '180px';

                        html2canvas(body, { useCORS: true }).then((canvas) => {
                            try {
                                // Scale to 320x180 if needed
                                let outCanvas = canvas;
                                if (canvas.width !== 320 || canvas.height !== 180) {
                                    const scaled = document.createElement('canvas');
                                    scaled.width = 320;
                                    scaled.height = 180;
                                    const ctx = scaled.getContext('2d');
                                    ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 320, 180);
                                    outCanvas = scaled;
                                }
                                outCanvas.toBlob((blob) => {
                                    cleanupAndResolve(blob);
                                }, 'image/png');
                            } catch (e) {
                                console.warn('Thumbnail scaling failed:', e);
                                cleanupAndResolve(null);
                            }
                        }).catch((err) => {
                            console.warn('html2canvas failed:', err);
                            cleanupAndResolve(null);
                        });
                    } catch (e) {
                        console.warn('Thumbnail capture failed:', e);
                        cleanupAndResolve(null);
                    }
                };

                // Fallback: if onload never fires within a timeout
                setTimeout(() => cleanupAndResolve(null), 8000);
            } catch (e) {
                console.warn('captureThumbnailFromCode encountered an error:', e);
                resolve(null);
            }
        });
    }

    // Function to generate ZIP file
    async function generateZip(htmlCode, cssCode, jsCode, thumbnailBlob) {
        try {
            const zip = new JSZip();
            let updatedHtmlCode = htmlCode;
            let updatedCssCode = cssCode;
            let updatedJsCode = jsCode;

            const preferredCssPath = importedMainPaths.css || 'styles.css';
            const preferredJsPath = importedMainPaths.js || 'script.js';
            
            // Detect only external resources that the page actually loads at runtime.
            const externalResources = detectExternalResources(htmlCode, cssCode, jsCode);

            // Filter out external libraries that are not needed (e.g., GA/AdSense when not opted-in)
            const prunedUrls = [];
            const allowedResources = [];
            for (const resource of externalResources) {
                if (shouldSkipExternal(resource.url, addonsSection, includeGaCheckbox, includeAdsenseCheckbox)) {
                    prunedUrls.push(resource.url);
                } else {
                    allowedResources.push(resource);
                }
            }
            const allowedUrls = allowedResources.map(resource => resource.url);
            // Remove pruned references from code before processing allowed ones
            for (const u of prunedUrls) {
                const removed = removeExternalReferences(updatedHtmlCode, updatedCssCode, updatedJsCode, u);
                updatedHtmlCode = removed.html;
                updatedCssCode = removed.css;
                updatedJsCode = removed.js;
            }
            
            if (allowedResources.length > 0) {
                // Show progress for downloading external files
                const progressDiv = document.createElement('div');
                progressDiv.innerHTML = `
                    <div style="background: #e3f2fd; border: 1px solid #2196f3; border-radius: 4px; padding: 15px; margin: 10px 0;">
                        <h4 style="margin: 0 0 10px 0; color: #1976d2;">📥 Downloading External Dependencies</h4>
                        <div id="download-progress">Found ${allowedResources.length} referenced external file(s) to localize...</div>
                    </div>
                `;
                
                // Insert progress div before result section
                const main = document.querySelector('main');
                main.insertBefore(progressDiv, resultSection);
                
                const progressElement = document.getElementById('download-progress');
                const urlMappings = {};
                const usedLocalFilenames = new Set();
                
                // Download external files
                for (let i = 0; i < allowedResources.length; i++) {
                    const resourceInfo = allowedResources[i];
                    const url = resourceInfo.url;
                    const normalizedUrl = normalizeExternalUrl(url);
                    progressElement.textContent = `Localizing ${i + 1}/${allowedResources.length}: ${normalizedUrl}`;
                    
                    const ctx = resourceInfo.context || determineUrlContext(url, updatedHtmlCode, updatedCssCode, updatedJsCode);
                    const resource = isTailwindCdnUrl(normalizedUrl)
                        ? {
                            ok: true,
                            normalizedUrl,
                            content: buildTailwindOfflineRuntime(updatedHtmlCode),
                            contentType: 'text/javascript',
                            isText: true
                        }
                        : await downloadExternalResource(normalizedUrl, ctx);
                    let localFilename = getUniqueLocalFilename(generateLocalFilename(resource.normalizedUrl, i, ctx), usedLocalFilenames);
                    let content = resource.content;
                    if (!resource.ok && resource.contentType === 'image/svg+xml' && !/\.svg$/i.test(localFilename)) {
                        localFilename = getUniqueLocalFilename(localFilename.replace(/\.[^/.]+$/, '') + '.svg', usedLocalFilenames);
                    }

                    if (isCssResource(resource.normalizedUrl, resource.contentType, ctx) && resource.isText) {
                        progressElement.textContent = `Scanning CSS dependencies ${i + 1}/${allowedResources.length}: ${resource.normalizedUrl}`;
                        content = pruneGoogleFontsCss(content, resource.normalizedUrl, updatedHtmlCode, updatedCssCode, updatedJsCode);
                        content = await localizeCssNestedResources(content, resource.normalizedUrl, localFilename, zip, urlMappings, usedLocalFilenames);
                    }
                    
                    // Add to ZIP (STORE for incompressible binaries, DEFLATE otherwise)
                    zip.file(localFilename, content, { compression: isIncompressible(localFilename) ? 'STORE' : 'DEFLATE' });
                    urlMappings[url] = localFilename; // map original URL
                    if (resource.normalizedUrl !== url) {
                        urlMappings[resource.normalizedUrl] = localFilename; // also map normalized URL for completeness
                    }
                }
                
                // Update code with local file references
                const updated = updateCodeWithLocalFiles(updatedHtmlCode, updatedCssCode, updatedJsCode, urlMappings);
                updatedHtmlCode = updated.updatedHtml;
                updatedCssCode = updated.updatedCss;
                updatedJsCode = updated.updatedJs;
                
                // Convert ES6 modules to SLS-compatible format
                updatedHtmlCode = convertToSlsCompatible(updatedHtmlCode, urlMappings);
                
                // Add SLS warnings as a README file (include mapping and list of skipped externals)
                const slsWarnings = showSlsWarnings(allowedUrls);
                if (slsWarnings || prunedUrls.length) {
                    const mapping = Object.entries(urlMappings).map(([orig, local]) => `• ${orig} -> ${local}`).join('\n');
                    const skipped = prunedUrls.length ? '\nSkipped external resources:\n' + prunedUrls.map(u => `• ${u}`).join('\n') : '';
                    const header = 'Generated by: SLS Prompt Library for Educational Interactive Creation - https://sg.iwant2study.org/ospsg/index.php/ai-prompt-library';
                    const readme = header + '\n\n' + (slsWarnings || '') + (mapping ? '\nDownloaded file mapping:\n' + mapping : '') + skipped;
                    zip.file('README_SLS_COMPATIBILITY.txt', readme.trim(), { compression: 'DEFLATE' });
                }
                
                // Add a simple HTTP server file for local testing
                const serverScript = `#!/usr/bin/env python3
# Simple HTTP Server for testing ES6 modules locally
# Usage: python3 server.py
# Then open http://localhost:8000 in your browser

import http.server
import socketserver
import os

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
        super().end_headers()

os.chdir(os.path.dirname(os.path.abspath(__file__)))

with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
    print(f"Server running at http://localhost:{PORT}/")
    print("Press Ctrl+C to stop the server")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\\nServer stopped.")
`;
                zip.file('server.py', serverScript, { compression: 'DEFLATE' });
                
                // Add a batch file for Windows users
                const batchScript = `@echo off
echo Starting local HTTP server...
echo Open http://localhost:8000 in your browser
echo Press Ctrl+C to stop the server
python server.py
pause
`;
                zip.file('start_server.bat', batchScript, { compression: 'DEFLATE' });
                
                // Add a shell script for Mac/Linux users
                const shellScript = `#!/bin/bash
echo "Starting local HTTP server..."
echo "Open http://localhost:8000 in your browser"
echo "Press Ctrl+C to stop the server"
python3 server.py
`;
                zip.file('start_server.sh', shellScript, { compression: 'DEFLATE' });
                
                // Remove progress div
                progressDiv.remove();
            }

            // Add stylesheet if CSS code is provided and update HTML links
            if (updatedCssCode !== '') {
                zip.file(preferredCssPath, updatedCssCode, { compression: 'DEFLATE' });
                // Update existing link hrefs to point to preferredCssPath (unless external placeholder)
                updatedHtmlCode = updatedHtmlCode.replace(/<link\s+[^>]*href\s*=\s*['"]([^'"]*\.(?:css|scss|less))['"][^>]*>/gi, (match, oldHref) => {
                    if (oldHref.toLowerCase() !== preferredCssPath.toLowerCase() && !oldHref.startsWith('external_')) {
                        return match.replace(oldHref, preferredCssPath);
                    }
                    return match;
                });
                // If no link tag for preferredCssPath exists after replacement and no inline <style> tag, add one.
                if (!updatedHtmlCode.match(new RegExp(`<link\\s+[^>]*href\\s*=\\s*['"]${escapeRegExp(preferredCssPath)}['"][^>]*>`, 'gi')) && !updatedHtmlCode.includes('<style>')) {
                    if (updatedHtmlCode.includes('</head>')) {
                        updatedHtmlCode = updatedHtmlCode.replace('</head>', `<link rel="stylesheet" href="${preferredCssPath}">\n</head>`);
                    } else {
                        // Fallback if no </head> tag, prepend to the document (less ideal)
                        updatedHtmlCode = `<link rel="stylesheet" href="${preferredCssPath}">\n` + updatedHtmlCode;
                    }
                }
            }
            
            // Add script file if JavaScript code is provided and update HTML links
            if (updatedJsCode !== '') {
                zip.file(preferredJsPath, updatedJsCode, { compression: 'DEFLATE' });
                // Update existing script src to point to preferredJsPath (unless external placeholder)
                updatedHtmlCode = updatedHtmlCode.replace(/<script\s+[^>]*src\s*=\s*['"]([^'"]*\.js)['"][^>]*>\s*<\/script>/gi, (match, oldSrc) => {
                    if (oldSrc.toLowerCase() !== preferredJsPath.toLowerCase() && !oldSrc.startsWith('external_')) {
                        return match.replace(oldSrc, preferredJsPath);
                    }
                    return match;
                });
                // If no script tag for preferredJsPath exists after replacement and no inline <script> (without src), add one.
                if (!updatedHtmlCode.match(new RegExp(`<script\\s+[^>]*src\\s*=\\s*['"]${escapeRegExp(preferredJsPath)}['"][^>]*>\\s*<\\/script>`, 'gi')) && !updatedHtmlCode.match(/<script\s*(?!src)[^>]*>[\s\S]*?<\/script>/gi)) {
                    if (updatedHtmlCode.includes('</body>')) {
                        updatedHtmlCode = updatedHtmlCode.replace('</body>', `<script src="${preferredJsPath}"></script>\n</body>`);
                    } else {
                        // Fallback if no </body> tag, append to the document (less ideal)
                        updatedHtmlCode += `\n<script src="${preferredJsPath}"></script>`;
                    }
                }
            }

            // Include any additional imported files (excluding the main HTML/CSS/JS which are added below)
            if (Object.keys(importedFiles).length) {
                Object.entries(importedFiles).forEach(([path, file]) => {
                    const lower = path.toLowerCase();
                    const isMain =
                        (importedMainPaths.html && lower === importedMainPaths.html.toLowerCase()) ||
                        (importedMainPaths.css && lower === importedMainPaths.css.toLowerCase()) ||
                        (importedMainPaths.js && lower === importedMainPaths.js.toLowerCase());
                    if (isMain) return; // main files handled below

                    try {
                        if (file && file.base64) {
                            zip.file(path, file.base64, { base64: true, compression: isIncompressible(path) ? 'STORE' : 'DEFLATE' });
                        } else if (file && typeof file.text === 'string') {
                            zip.file(path, file.text, { compression: 'DEFLATE' });
                        }
                    } catch (e) {
                        console.warn('Failed to add imported file to ZIP:', path, e);
                    }
                });
            }

            // Apply optional add-ons (GA, AdSense, footer credit) before saving HTML
            updatedHtmlCode = applyAddOns(updatedHtmlCode);

            // Always add index.html (potentially updated)
            zip.file('index.html', updatedHtmlCode, { compression: 'DEFLATE' });
            // Always include prompt.txt (may be empty if no prompt provided)
            zip.file('prompt.txt', (promptInput && typeof promptInput.value === 'string') ? promptInput.value : '', { compression: 'DEFLATE' });

            // Add thumbnail image if available
            if (thumbnailBlob instanceof Blob) {
                // JSZip supports Blob directly; no need for binary flag
                zip.file('thumbnail_320x180.png', thumbnailBlob);
            }
            
            // Generate the ZIP file (use DEFLATE compression level 9)
            const zipBlob = await zip.generateAsync({
                type: 'blob',
                compression: 'DEFLATE',
                compressionOptions: { level: 9 }
            });
            
            // Extract title from HTML content
            let title = 'gemini_code'; // Default title
            const titleMatch = updatedHtmlCode.match(/<title>([^<]+)<\/title>/i);
            if (titleMatch && titleMatch[1]) {
                title = titleMatch[1].trim().replace(/\s+/g, '_'); // Replace spaces with underscores
            }
            
            // Create a timestamp for the filename (YYYYMMDD format)
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const timestamp = `${year}${month}${day}`;
            
            // Create a meaningful filename with title and timestamp
            const filename = `${title}_${timestamp}.zip`;
            
            // Create a download URL for the ZIP file
            const downloadUrl = URL.createObjectURL(zipBlob);
            
            // Update the UI
            filenameDisplay.textContent = filename;
            downloadLink.href = downloadUrl;
            downloadLink.download = filename;
            resultSection.classList.remove('hidden');
            if (window.logAizipperActivity) {
                window.logAizipperActivity('generate', 'sls-offline-zip-packager', `created ${filename}`);
            }
            
            // Show success message with external files info
            if (typeof allowedUrls !== 'undefined' && allowedUrls.length > 0) {
                const successDiv = document.createElement('div');
                successDiv.innerHTML = `
                    <div style="background: #e8f5e8; border: 1px solid #4caf50; border-radius: 4px; padding: 15px; margin: 10px 0;">
                        <h4 style="margin: 0 0 10px 0; color: #2e7d32;">✅ Self-Contained ZIP Created Successfully!</h4>
                        <p style="margin: 0;">Downloaded and included ${allowedUrls.length} external file(s). Check README_SLS_COMPATIBILITY.txt for important notes about SLS usage.</p>
                    </div>
                `;
                resultSection.insertBefore(successDiv, resultSection.firstChild);
                
                // Remove success message after 10 seconds
                setTimeout(() => {
                    if (successDiv.parentNode) {
                        successDiv.remove();
                    }
                }, 10000);
            }
            
            // Scroll to the result section
            resultSection.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('Error generating ZIP file:', error);
            alert('An error occurred while generating the ZIP file. Please try again.');
        }
    }

    // Function to generate AIzipper_YYYYMMDD.zip
    async function generateAIzipperFile(htmlCode, cssCode, jsCode) {
        try {
            const zip = new JSZip();
            
            zip.file('index.html', htmlCode, { compression: 'DEFLATE' }); 
            
            if (cssCode.trim() !== '') {
                zip.file('styles.css', cssCode.trim(), { compression: 'DEFLATE' });
            }
            
            if (jsCode.trim() !== '') {
                zip.file('script.js', jsCode.trim(), { compression: 'DEFLATE' });
            }
            // Always include prompt.txt (may be empty if no prompt provided)
            zip.file('prompt.txt', (promptInput && typeof promptInput.value === 'string') ? promptInput.value : '', { compression: 'DEFLATE' });
            
            // Generate the ZIP file (use DEFLATE compression level 9)
            const zipBlob = await zip.generateAsync({
                type: 'blob',
                compression: 'DEFLATE',
                compressionOptions: { level: 9 }
            });
            
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const timestamp = `${year}${month}${day}`;
            
            const filename = `AIzipper_${timestamp}.zip`;
            
            const downloadUrl = URL.createObjectURL(zipBlob);
            const tempLink = document.createElement('a');
            tempLink.href = downloadUrl;
            tempLink.download = filename;
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);
            URL.revokeObjectURL(downloadUrl);

            resultSection.classList.add('hidden');
            alert(`Downloading ${filename}...`); 
        } catch (error) {
            console.error('Error generating AIzipper ZIP file:', error);
            alert('An error occurred while generating the AIzipper ZIP file. Please try again.');
        }
    }
});
