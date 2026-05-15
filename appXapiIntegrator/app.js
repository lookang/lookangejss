'use strict';

// xAPI Integrator - Pure client-side (no server)
// - Reads an uploaded ZIP with JSZip
// - Finds the folder containing index.html
// - Injects xAPI libs and optional instrumentation snippet
// - Removes CSP-blocked GA/AdSense scripts
// - Adds vendored libs into lib/ within the content folder
// - Re-zips and offers a download link

(function () {
  const zipInput = document.getElementById('zipInput');
  const integrateBtn = document.getElementById('integrateBtn');
  const downloadLink = document.getElementById('downloadLink');
  const statusText = document.getElementById('statusText');
  const logEl = document.getElementById('log');
  const dropZone = document.getElementById('dropZone');
  const fileName = document.getElementById('fileName');
  const aiSettings = document.getElementById('aiSettings');
  const aiApiKeyInput = document.getElementById('aiApiKey');
  const aiModelInput = document.getElementById('aiModel');
  const aiModelCustomInput = document.getElementById('aiModelCustom');
  const aiInstructionInput = document.getElementById('aiInstruction');

  const LS_AI_API_KEY = 'xapiIntegrator.aiApiKey';
  const LS_AI_MODEL = 'xapiIntegrator.aiModel';
  const LS_AI_MODEL_CUSTOM = 'xapiIntegrator.aiModelCustom';

  function safeSetLocalStorage(key, value) {
    try {
      if (value) {
        localStorage.setItem(key, value);
      } else {
        localStorage.removeItem(key);
      }
    } catch (e) {
      // Ignore storage failures (e.g. private mode)
    }
  }

  function safeGetLocalStorage(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function updateAiModelCustomVisibility() {
    if (!aiModelInput || !aiModelCustomInput) return;
    const useCustom = aiModelInput.value === 'custom';
    aiModelCustomInput.style.display = useCustom ? 'inline-block' : 'none';
  }

  function applyAiPreferencesFromStorage() {
    const savedKey = safeGetLocalStorage(LS_AI_API_KEY);
    const savedModel = safeGetLocalStorage(LS_AI_MODEL);
    const savedCustom = safeGetLocalStorage(LS_AI_MODEL_CUSTOM);

    if (aiApiKeyInput && savedKey) {
      aiApiKeyInput.value = savedKey;
    }

    if (aiModelInput) {
      if (savedModel && Array.from(aiModelInput.options || []).some(o => o.value === savedModel)) {
        aiModelInput.value = savedModel;
      }
      // If saved model is custom or not in the predefined list, switch to "custom"
      if (savedModel && aiModelInput.value !== savedModel) {
        aiModelInput.value = 'custom';
      }
    }

    if (aiModelCustomInput && savedCustom) {
      aiModelCustomInput.value = savedCustom;
    }

    updateAiModelCustomVisibility();
  }

  function updateAiSettingsVisibility() {
    if (!aiSettings) return;
    const mode = getSelectedMode();
    aiSettings.style.display = mode === 'ai' ? 'block' : 'none';
  }

  // Initialise AI settings visibility and listeners
  try {
    const modeRadios = document.querySelectorAll('input[name="mode"]');
    modeRadios.forEach(radio => {
      radio.addEventListener('change', updateAiSettingsVisibility);
    });

    if (aiApiKeyInput) {
      const saveKey = () => {
        safeSetLocalStorage(LS_AI_API_KEY, (aiApiKeyInput.value || '').trim());
      };
      aiApiKeyInput.addEventListener('change', saveKey);
      aiApiKeyInput.addEventListener('blur', saveKey);
    }

    if (aiModelInput) {
      aiModelInput.addEventListener('change', () => {
        updateAiModelCustomVisibility();
        safeSetLocalStorage(LS_AI_MODEL, aiModelInput.value || '');
      });
    }

    if (aiModelCustomInput) {
      const saveCustom = () => {
        safeSetLocalStorage(LS_AI_MODEL_CUSTOM, (aiModelCustomInput.value || '').trim());
      };
      aiModelCustomInput.addEventListener('change', saveCustom);
      aiModelCustomInput.addEventListener('blur', saveCustom);
    }

    updateAiSettingsVisibility();
    applyAiPreferencesFromStorage();
  } catch (e) {
    // Non-fatal if mode radios are missing
  }

  function log(msg) {
    try { console.log('[integrator]', msg); } catch { }
    if (logEl) {
      logEl.textContent += (logEl.textContent ? '\n' : '') + msg;
    }
  }

  function setStatus(msg) {
    if (statusText) statusText.textContent = msg || '';
  }

  // Drag and drop functionality
  async function handleFile(file) {
    if (file && (file.type === 'application/zip' || file.name.endsWith('.zip'))) {
      // Create a new FileList-like object and assign to input
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      zipInput.files = dataTransfer.files;

      if (fileName) {
        fileName.textContent = `📦 ${file.name}`;
      }
      log(`File selected: ${file.name}`);

      // Immediately analyze and show recommendation
      await analyzeAndRecommendMode(file);
    } else {
      setStatus('Please drop a ZIP file.');
    }
  }

  if (dropZone) {
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
      }, false);
    });

    // Highlight drop zone when dragging over it
    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone.addEventListener(eventName, () => {
        dropZone.classList.add('drag-over');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, () => {
        dropZone.classList.remove('drag-over');
      }, false);
    });

    // Handle dropped files
    dropZone.addEventListener('drop', async (e) => {
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        try {
          await handleFile(files[0]);
        } catch (err) {
          console.error('Drop error:', err);
          setStatus('Error processing dropped file');
        }
      }
    }, false);

    // Handle click to browse
    dropZone.addEventListener('click', () => {
      zipInput.click();
    });
  }

  // Handle file input change with immediate analysis
  if (zipInput) {
    zipInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (file && fileName) {
        fileName.textContent = `📦 ${file.name}`;
      }

      // Immediately analyze and show recommendation
      if (file && file.name.endsWith('.zip')) {
        await analyzeAndRecommendMode(file);
      }
    });
  }

  // Analyze ZIP and show recommendation popup
  async function analyzeAndRecommendMode(file) {
    try {
      setStatus('Analyzing uploaded file...');

      if (!window.JSZip) {
        setStatus('');
        return;
      }

      const jszip = new JSZip();
      const zip = await jszip.loadAsync(file);

      const { contentDir, indexPath } = findContentDirFromZip(zip);
      if (!indexPath) {
        setStatus('');
        return;
      }

      const html = await zip.file(indexPath).async('string');

      // Try to load JavaScript file for analysis
      let jsContent = '';
      const jsFiles = Object.keys(zip.files).filter(k => k.endsWith('.js') && !k.includes('node_modules'));
      if (jsFiles.length > 0) {
        try {
          jsContent = await zip.file(jsFiles[0]).async('string');
        } catch (e) {
          // Silent fail
        }
      }

      // Analyze content
      const analysis = await analyzeInteractive(html, jsContent);

      setStatus('');

      // Show recommendation popup
      const modeNames = {
        'timeline': 'Timeline',
        'quiz': 'Quiz',
        'minimal': 'Minimal',
        'ai': 'Experimental AI'
      };

      const currentMode = getSelectedMode();
      const recommendedMode = analysis.recommendedMode;

      let message = `📊 SMART MODE DETECTION\n\n`;
      message += `File analyzed: ${file.name}\n\n`;
      message += `✓ Recommended Mode: ${modeNames[recommendedMode].toUpperCase()}\n`;
      message += `✓ Confidence: ${analysis.confidence}%\n\n`;
      message += `Detected Features:\n`;
      if (analysis.hasRadioButtons) message += `  • Radio buttons (quiz questions)\n`;
      if (analysis.hasCheckboxes) message += `  • Checkboxes (multiple choice)\n`;
      if (analysis.hasTextInputs) message += `  • Text inputs (short answer)\n`;
      if (analysis.hasDragDrop) message += `  • Drag & drop interactions\n`;
      if (analysis.hasGameState) message += `  • Game state tracking\n`;
      if (analysis.hasScore) message += `  • Scoring system\n`;
      if (analysis.hasCanvas) message += `  • Canvas elements\n`;
      if (analysis.hasPlayPause) message += `  • Play/pause controls\n`;

      if (analysis.reasons.length === 0) {
        message += `  • No specific patterns detected\n`;
      }

      message += `\n`;

      if (currentMode !== recommendedMode && analysis.confidence >= 50) {
        message += `Currently selected: ${modeNames[currentMode]}\n\n`;
        message += `Would you like to switch to ${modeNames[recommendedMode]} mode?\n`;
        message += `(This mode has the best chance of success for this content)`;

        const shouldSwitch = confirm(message);

        if (shouldSwitch) {
          // Update the radio button
          document.querySelectorAll('input[name="mode"]').forEach(radio => {
            if (radio.value === recommendedMode) {
              radio.checked = true;
            }
          });
          log(`Mode automatically switched to: ${recommendedMode.toUpperCase()} (recommended)`);
        } else {
          log(`User kept selected mode: ${currentMode.toUpperCase()}`);
        }
      } else {
        message += `Current selection: ${modeNames[currentMode]}\n`;
        if (currentMode === recommendedMode) {
          message += `\n✓ Your selection matches the recommendation!`;
        } else {
          message += `\nNote: ${modeNames[recommendedMode]} mode is recommended, but you can proceed with ${modeNames[currentMode]} if preferred.`;
        }
        alert(message);
        log(`Analysis complete. Recommended: ${recommendedMode.toUpperCase()}, Selected: ${currentMode.toUpperCase()}`);
      }

    } catch (e) {
      console.error('Analysis error:', e);
      setStatus('');
    }
  }

  function getSelectedMode() {
    const el = document.querySelector('input[name="mode"]:checked');
    return (el && el.value) || 'timeline';
  }

  function shouldKeepAnalytics() {
    const checkbox = document.getElementById('keepAnalytics');
    return checkbox ? checkbox.checked : false;
  }

  function shouldOpenInNewTab() {
    const cb = document.getElementById('openInNewTab');
    return cb ? cb.checked : false;
  }

  function joinPath(...parts) {
    return parts
      .filter(Boolean)
      .map(p => String(p).replace(/^\/+|\/+$/g, ''))
      .filter(p => p.length > 0)
      .join('/')
      + (String(parts[parts.length - 1]).endsWith('/') ? '/' : '');
  }

  // === Cross-Tab xAPI Pattern Helpers ===
  // These generate code snippets based on the proven localStorage pattern from the reference implementation

  /**
   * Generates the clear-on-load script that clears activity-specific localStorage/sessionStorage
   * This runs on every page load to ensure clean state
   */
  function generateClearOnLoadScript() {
    return `
    (function (global) {
      var ACTIVITY_ID = String(global.ACTIVITY_ID || location.href);

      function clearAllForActivity() {
        try {
          var prefixes = [
            ACTIVITY_ID,
            "sls_scope::" + ACTIVITY_ID,
            "UFCO-firstSubmit::" + ACTIVITY_ID,
            "sls_unlike_payload::" + ACTIVITY_ID
          ];

          for (var i = localStorage.length - 1; i >= 0; i--) {
            var k = localStorage.key(i);
            if (!k) continue;
            if (prefixes.some(function(p) { return k === p || k.indexOf(p) === 0; })) {
              localStorage.removeItem(k);
            }
          }

          sessionStorage.removeItem(ACTIVITY_ID + "::locked");
          sessionStorage.removeItem(ACTIVITY_ID + "::done");
        } catch (e) {}

        try {
          var bc = new BroadcastChannel("xapi-state");
          bc.postMessage({ type: "clear", activityId: ACTIVITY_ID, ts: Date.now() });
          if (bc.close) bc.close();
        } catch (e) {}
      }

      // Run clear on every load
      clearAllForActivity();

      // Expose for teacher "New Session — Clear"
      global.__SLS_CLEAR_ACTIVITY__ = clearAllForActivity;
    })(window);
    `.trim();
  }

  /**
   * Generates the payload storage functions for localStorage-based xAPI communication
   * @param {boolean} isChild - If true, writes to localStorage but doesn't call xAPI directly
   */
  function generatePayloadStorageFunctions(isChild = false) {
    return `
    var getStablePath = function() {
      try {
        var p = window.location.pathname;
        var folder = p.substring(0, p.lastIndexOf('/')) || p;
        return folder;
      } catch (e) {
        return 'default_scope';
      }
    };
    var APP_SCOPE = getStablePath();
    var PAYLOAD_KEY = "sls_unlike_payload::" + APP_SCOPE + "::v1";
    var FIRST_KEY = "UFCO-firstSubmit::" + APP_SCOPE;

    function pushToXAPI(score, feedback) {
      ${isChild ? `
      // Child tab: Send to parent via postMessage
      try {
        if (window.opener && !window.opener.closed) {
          window.opener.postMessage({
            type: 'xapi-update',
            source: 'child',
            payload: { score: score, feedback: feedback }
          }, '*');
          console.log('[Child] Notified parent of score update via postMessage');
        }
      } catch (e) {
        console.warn('[Child] Could not notify parent:', e);
      }
      ` : `
      // Parent/Standalone: Push directly to xAPI
      try {
        var sInput = document.getElementById("score-input");
        var fInput = document.getElementById("feedback-input");
        if (sInput) sInput.value = score;
        if (fInput) fInput.value = feedback || "";

        if (typeof updateStore === "function") {
          updateStore();
        } else if (typeof storeState === "function") {
          storeState({ score: score, feedback: feedback });
        }
      } catch (e) {
        console.warn('[xAPI] pushToXAPI failed:', e);
      }
      `}
    }

    function writePayload(score, feedback, hiddenMarks) {
      try {
        var timestamp = Date.now();
        var obj = { score: score, feedback: feedback, hiddenMarks: hiddenMarks, t: timestamp };
        localStorage.setItem(PAYLOAD_KEY, JSON.stringify(obj));
        console.log('[xAPI] Data updated in localStorage at ' + new Date(timestamp).toLocaleTimeString());
      } catch (e) {
        console.warn('[xAPI] writePayload failed:', e);
      }
    }

    function readPayload() {
      try {
        var raw = localStorage.getItem(PAYLOAD_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        return null;
      }
    }

    function hasPostedFirstSubmit() {
      try {
        return localStorage.getItem(FIRST_KEY) === "1";
      } catch (e) {
        return false;
      }
    }

    function lockFirstSubmit() {
      try {
        localStorage.setItem(FIRST_KEY, "1");
      } catch (e) {}
    }

    function postFirstSubmitIfNeeded(score, feedback, hiddenMarks) {
      if (hasPostedFirstSubmit()) return false;
      writePayload(score, feedback, hiddenMarks);
      pushToXAPI(score, feedback);
      lockFirstSubmit();
      return true;
    }

    window._lastKnownTimestamp = 0;

    function syncFromLocalToXAPI() {
      var p = readPayload();
      if (!p) return;
      
      // Only sync if the data is newer than what we last processed
      if (p.t > (window._lastKnownTimestamp || 0)) {
        console.log('[xAPI] Syncing newer data from localStorage...', p);
        window._lastKnownTimestamp = p.t;
        
        window._isSyncing = true;
        try {
          ${isChild ? `
          // Child: just update internal state if needed
          if (typeof window.onXapiSync === 'function') window.onXapiSync(p);
          ` : `
          // Parent/Standalone: Push to actual SLS/xAPI
          pushToXAPI(p.score, p.feedback);
          if (typeof window.onXapiSync === 'function') window.onXapiSync(p);
          `}
        } finally {
          window._isSyncing = false;
        }
      }
    }
    `.trim();
  }

  /**
   * Generates cross-tab event listeners that sync data from localStorage to xAPI
   * This ensures the parent tab always has the latest data from child tabs
   */
  function generateCrossTabSyncListeners() {
    return `
    // Cross-tab synchronization: Listen to storage events from other tabs
    window.addEventListener("load", syncFromLocalToXAPI);
    window.addEventListener("visibilitychange", () => {
      if (!document.hidden) syncFromLocalToXAPI();
    });
    window.addEventListener("focus", syncFromLocalToXAPI);
    window.addEventListener("storage", (e) => {
      if (e.key === PAYLOAD_KEY && e.newValue) syncFromLocalToXAPI();
    });

    // Listen for SLS submit messages from parent window (if launched by SLS)
    window.addEventListener("message", (event) => {
      try {
        const data = event.data;
        const key = (data && (data.type || data.event || data.action || data.message)) || '';
        if (typeof key === 'string' && /submit/i.test(key)) {
          console.log('[xAPI] Received SLS submit signal');
          syncFromLocalToXAPI();
        }
      } catch (e) {}
    });
    `.trim();
  }

  // Load vendor libs from ./vendor so we can place them into the output ZIP
  async function loadVendors() {
    async function fetchText(url) {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
      return await res.text();
    }

    // In file:// contexts, fetch may be blocked. Advise to serve over http(s).
    try {
      const [wrapper, glue] = await Promise.all([
        fetchText('./vendor/xapiwrapper.min.js'),
        fetchText('./vendor/xAPI.js'),
      ]);
      return { wrapper, glue };
    } catch (e) {
      // Fallback: try vendor files from ../assets/lib relative to public/
      try {
        const [wrapper2, glue2] = await Promise.all([
          fetchText('../assets/lib/xapiwrapper.min.js'),
          fetchText('../assets/lib/xAPI.js'),
        ]);
        log('Loaded vendor scripts from ../assets/lib fallback.');
        return { wrapper: wrapper2, glue: glue2 };
      } catch (e2) {
        setStatus('Failed to load vendor scripts. If you opened this page via file://, please serve over HTTP(S) (e.g., npx http-server xapi-integrator/public) or deploy to any static host.');
        log('Error loading vendor scripts. If opening via file://, run a local web server (e.g., `npx http-server`).');
        throw e;
      }
    }
  }

  // Find content dir containing index.html (root, single subfolder, or shallow search)
  function findContentDirFromZip(zip) {
    const files = Object.keys(zip.files); // paths with forward slashes
    const indexCandidates = files.filter(k => k.toLowerCase().endsWith('index.html'));

    if (indexCandidates.length === 0) return { contentDir: '', indexPath: null };

    // Choose the shortest (shallowest) path
    const sorted = indexCandidates.sort((a, b) => {
      const da = a.split('/').length;
      const db = b.split('/').length;
      if (da !== db) return da - db;
      return a.length - b.length;
    });

    const indexPath = sorted[0];
    const dir = indexPath.slice(0, indexPath.length - 'index.html'.length);
    return { contentDir: dir, indexPath };
  }

  function serializeDocument(doc) {
    // Preserve a doctype if one exists; if not, prefix with <!doctype html>
    const doctype = '<!doctype html>';
    return doctype + '\n' + doc.documentElement.outerHTML;
  }

  function ensureHeadBody(doc) {
    if (!doc.head) {
      const head = doc.createElement('head');
      const html = doc.documentElement || doc.querySelector('html');
      if (html) html.insertBefore(head, html.firstChild);
    }
    if (!doc.body) {
      const body = doc.createElement('body');
      const html = doc.documentElement || doc.querySelector('html');
      if (html) html.appendChild(body);
    }
  }

  function hasScriptBySrc(doc, endsWithPath) {
    const scripts = Array.from(doc.querySelectorAll('script[src]'));
    return scripts.some(s => {
      const src = s.getAttribute('src') || '';
      return src.endsWith(endsWithPath) || src.includes(endsWithPath);
    });
  }

  function generateLauncherHtml(contentFilename) {
    // This is essentially deprecated by the seamless flow, but kept for compatibility
    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Launcher</title>
  <style>body{text-align:center;padding:50px;font-family:sans-serif;}button{padding:10px 20px;font-size:18px;cursor:pointer;}</style>
</head>
<body>
  <h1>Activity Launcher</h1>
  <button onclick="window.open('${contentFilename}' + window.location.search)">Open Activity</button>
</body>
</html>`;
  }

  function generateOpenInNewTabButtonScript(contentFilename) {
    return `
    (function() {
      var btn = document.createElement('button');
      btn.innerHTML = '↗ Open in New Tab';
      btn.style.position = 'fixed';
      btn.style.top = '10px';
      btn.style.right = '10px';
      btn.style.zIndex = '9999';
      btn.style.padding = '8px 12px';
      btn.style.backgroundColor = '#1976d2';
      btn.style.color = 'white';
      btn.style.border = 'none';
      btn.style.borderRadius = '4px';
      btn.style.cursor = 'pointer';
      btn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
      btn.style.fontSize = '12px';
      btn.style.fontWeight = 'bold';
      btn.style.opacity = '0.8';
      btn.title = 'Open this interactive in a separate window. Progress will be synced.';

      btn.onmouseover = function() { btn.style.opacity = '1'; };
      btn.onmouseout = function() { btn.style.opacity = '0.8'; };

      btn.onclick = function() {
        var width = Math.min(window.screen.width, 1024);
        var height = Math.min(window.screen.height, 768);
        var left = (window.screen.width - width) / 2;
        var top = (window.screen.height - height) / 2;
        
        var url = "${contentFilename}" + window.location.search;
        window.open(url, 'xapi_activity', 'width='+width+',height='+height+',left='+left+',top='+top+',resizable=yes,scrollbars=yes');
      };

      if (document.body) {
        document.body.appendChild(btn);
      } else {
        window.addEventListener('DOMContentLoaded', function() {
          document.body.appendChild(btn);
        });
      }
    })();
    `.trim();
  }

  function injectScriptsIntoHtml(html, options) {
    const { mode = 'timeline', keepAnalytics = false, isChild = false, aiSnippet = '', addLauncherBtn = false, contentFilename = 'content.html' } = options || {};
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    ensureHeadBody(doc);

    // Remove CSP-blocked scripts (unless user opts to keep them)
    if (!keepAnalytics) {
      Array.from(doc.querySelectorAll('script[src*="googletagmanager.com"],script[src*="googlesyndication.com"]'))
        .forEach(s => s.remove());
    }

    // === Activity ID Setup ===
    // Extract activity ID from URL params or use location as fallback
    const activityIdScript = doc.createElement('script');
    activityIdScript.textContent = `
      (function() {
        // --- Stable Scope Identification ---
        // ALWAYS use the folder path as the unique ID for the activity scope.
        // This ensures that ALL tabs (SLS frame, tool's new tab, SLS native button)
        // stay in sync even if URL parameters (like activityId IRI) differ.
        var getStablePath = function() {
          try {
            var p = window.location.pathname;
            var folder = p.substring(0, p.lastIndexOf('/')) || p;
            return folder;
          } catch (e) {
            return 'default_scope';
          }
        };
        
        var stableScope = getStablePath();
        window.ACTIVITY_ID = stableScope; 
        console.log('[xAPI] Stable Scope ID:', stableScope);
        
        // We also keep the original IRI if available for actual xAPI statements.
        var urlParams = new URLSearchParams(window.location.search);
        var iri = urlParams.get('activityId');
        if (iri) {
          window._SLS_IRI = iri;
        }
      })();
    `;
    doc.head.appendChild(activityIdScript);

    // === Inject xAPI libs and localStorage Pattern ===
    if (!isChild) {
      // Standalone or Parent mode: Full xAPI setup
      if (!hasScriptBySrc(doc, 'lib/xapiwrapper.min.js')) {
        const s1 = doc.createElement('script');
        s1.setAttribute('src', './lib/xapiwrapper.min.js');
        doc.head.appendChild(s1);
      }
      if (!hasScriptBySrc(doc, 'lib/xAPI.js')) {
        const s2 = doc.createElement('script');
        s2.setAttribute('src', './lib/xAPI.js');
        doc.head.appendChild(s2);
      }

      // Add clear-on-load script for standalone/parent
      const clearScript = doc.createElement('script');
      clearScript.textContent = generateClearOnLoadScript();
      doc.head.appendChild(clearScript);

      // Add payload storage functions (parent mode)
      const storageScript = doc.createElement('script');
      storageScript.textContent = generatePayloadStorageFunctions(false);
      doc.head.appendChild(storageScript);

      // Add cross-tab sync listeners
      const syncScript = doc.createElement('script');
      syncScript.textContent = generateCrossTabSyncListeners();
      doc.head.appendChild(syncScript);

      // Parent mode: Wrap storeState to ALSO write to localStorage (bidirectional sync)
      const parentWrapScript = doc.createElement('script');
      parentWrapScript.textContent = `
        (function() {
          console.log('[Parent] Initializing bidirectional sync wrapper');

          function wrapParentStoreState() {
            if (typeof window.storeState !== 'function') {
              setTimeout(wrapParentStoreState, 100);
              return;
            }

            var originalStoreState = window.storeState;
            window.storeState = function(payload) {
              var score = payload.score || 0;
              var feedback = payload.feedback || '';
              var hiddenMarks = payload.hiddenMarks;
              
              // 1. Write to localStorage so child can see it (only if NOT syncing)
              if (!window._isSyncing) {
                if (typeof writePayload === 'function') {
                  writePayload(score, feedback, hiddenMarks);
                }
              }

              // 2. Call original to send to SLS
              try {
                originalStoreState(payload);
              } catch(e) {
                console.warn('[Parent] originalStoreState failed:', e);
              }
              
              console.log('[Parent] storeState wrapped' + (window._isSyncing ? ' (sync-only)' : ' - stored locally and sent to xAPI'));
            };
          }

          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', wrapParentStoreState);
          } else {
            wrapParentStoreState();
          }
        })();
      `;
      doc.head.appendChild(parentWrapScript);

      // Add Launcher Button if requested (Parent seamless mode)
      if (addLauncherBtn) {
        const btnScript = doc.createElement('script');
        btnScript.textContent = generateOpenInNewTabButtonScript(contentFilename);
        doc.head.appendChild(btnScript);
      }

    } else {
      // Child mode: Load xAPI libraries (they'll fail gracefully without params)
      // but still define storeState wrapper that writes to localStorage

      if (!hasScriptBySrc(doc, 'lib/xapiwrapper.min.js')) {
        const s1 = doc.createElement('script');
        s1.setAttribute('src', './lib/xapiwrapper.min.js');
        doc.head.appendChild(s1);
      }
      if (!hasScriptBySrc(doc, 'lib/xAPI.js')) {
        const s2 = doc.createElement('script');
        s2.setAttribute('src', './lib/xAPI.js');
        doc.head.appendChild(s2);
      }

      // Add clear-on-load script even in child to handle teacher resets
      const clearScript = doc.createElement('script');
      clearScript.textContent = generateClearOnLoadScript();
      doc.head.appendChild(clearScript);

      // Add payload storage functions (child mode)
      const storageScript = doc.createElement('script');
      storageScript.textContent = generatePayloadStorageFunctions(true);
      doc.head.appendChild(storageScript);

      // Add cross-tab sync listeners (child mode)
      const syncScript = doc.createElement('script');
      syncScript.textContent = generateCrossTabSyncListeners();
      doc.head.appendChild(syncScript);

      // Child mode: Wrap storeState to ALSO write to localStorage and notify parent
      const childScript = doc.createElement('script');
      childScript.textContent = `
        (function() {
          window.isNewTabChild = true;
          console.log('[Child] Running in new-tab child mode');

          // Wait for xAPI.js to load, then wrap its storeState
          function wrapStoreState() {
            if (typeof window.storeState !== 'function') {
              // xAPI.js not loaded yet, wait
              setTimeout(wrapStoreState, 100);
              return;
            }

            // Save the original storeState
            var originalStoreState = window.storeState;

            // Replace with our wrapper
            window.storeState = function(payload) {
              var score = payload.score || 0;
              var feedback = payload.feedback || '';
              var hiddenMarks = payload.hiddenMarks;
              
              // Only write if NOT currently syncing from another tab
              if (!window._isSyncing) {
                if (typeof writePayload === 'function') {
                  writePayload(score, feedback, hiddenMarks);
                }
                
                // Notify parent immediately
                if (typeof pushToXAPI === 'function') {
                  pushToXAPI(score, feedback);
                }
              }
              
              // Also try to call original (will fail gracefully in child mode)
              try {
                originalStoreState(payload);
              } catch(e) {
                // Expected to fail in child mode - that's ok
              }
              
              console.log('[Child] storeState wrapper called' + (window._isSyncing ? ' (sync-only)' : ' - stored locally'));
            };

            console.log('[Child] storeState wrapped - syncing via localStorage/postMessage');
          }

          // Start wrapping after DOM loads
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', wrapStoreState);
          } else {
            wrapStoreState();
          }
        })();
      `;
      doc.head.appendChild(childScript);
    }

    // Inject instrumentation snippet (timeline, quiz, or AI mode)
    // Experimental AI reuses the same generic xAPI wiring as Timeline mode so data is sent to SLS.
    if (mode === 'timeline' || mode === 'quiz' || mode === 'ai') {
      const already = Array.from(doc.querySelectorAll('script'))
        .some(s => ((s.textContent || '').includes('__xapiIntegrator')));
      if (!already) {
        const snippet = mode === 'quiz' ? `
(function(){
  if (window.__xapiIntegrator) return;
  window.__xapiIntegrator = true;

  // Draggable helper for floating UI (panel/button)
  function makeDraggable(el, opts) {
    opts = opts || {};
    const handleSelector = opts.handleSelector || null;
    const storageKey = opts.storageKey || '';
    let isDragging = false, started = false;
    let startX = 0, startY = 0, origLeft = 0, origTop = 0;

    // Restore saved position
    try {
      if (storageKey) {
        const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
        if (saved && typeof saved.left === 'number' && typeof saved.top === 'number') {
          el.style.left = saved.left + 'px';
          el.style.top = saved.top + 'px';
          el.style.right = 'auto';
          el.style.bottom = 'auto';
        }
      }
    } catch(e){}

    function onPointerDown(e) {
      if (handleSelector && !e.target.closest(handleSelector)) return;
      isDragging = true; started = false;
      startX = e.clientX; startY = e.clientY;
      const rect = el.getBoundingClientRect();
      origLeft = rect.left; origTop = rect.top;
      el.setPointerCapture && el.setPointerCapture(e.pointerId);
    }
    function onPointerMove(e) {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!started && Math.hypot(dx, dy) < 4) return;
      started = true;
      let left = origLeft + dx;
      let top = origTop + dy;
      const vw = window.innerWidth, vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      left = Math.max(0, Math.min(left, vw - r.width));
      top = Math.max(0, Math.min(top, vh - r.height));
      el.style.left = left + 'px';
      el.style.top = top + 'px';
      el.style.right = 'auto';
      el.style.bottom = 'auto';
      e.preventDefault();
    }
    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;
      if (started) {
        try {
          if (storageKey) {
            const left = parseInt(el.style.left || '0', 10) || 0;
            const top = parseInt(el.style.top || '0', 10) || 0;
            localStorage.setItem(storageKey, JSON.stringify({ left, top }));
          }
        } catch(e){}
      }
    }
    function onResize() {
      // keep element in viewport
      const r = el.getBoundingClientRect();
      let left = r.left, top = r.top;
      const vw = window.innerWidth, vh = window.innerHeight;
      left = Math.max(0, Math.min(left, vw - r.width));
      top = Math.max(0, Math.min(top, vh - r.height));
      el.style.left = left + 'px';
      el.style.top = top + 'px';
      el.style.right = 'auto';
      el.style.bottom = 'auto';
    }

    el.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('resize', onResize);
  }

  const sessionStart = Date.now();
  const quizData = {
    questions: [],
    currentQuestion: null,
    totalScore: 0,
    maxScore: 0,
    attempts: [],
    navigationLog: []
  };

  // Pending payload
  window.__xapiPending = null;

  function tSeconds() { return Math.round((Date.now() - sessionStart)/1000); }

  function logQuizAction(action, details) {
    const t = tSeconds();
    const entry = { t, action, details };
    quizData.navigationLog.push(entry);
    try { console.log('[xAPI Quiz]', 't=' + t + ',', action, details); } catch(e){}
    updateQuizPanel();
    setPending('quiz-action');
  }

  // Detect and track questions
  function detectQuestions() {
    // Look for common quiz patterns: radio groups, checkbox groups, numbered divs
    const radioGroups = {};
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
      const name = radio.name;
      if (name && !radioGroups[name]) {
        radioGroups[name] = {
          type: 'single-choice',
          name: name,
          options: [],
          selected: null,
          startTime: Date.now(),
          attempts: 0
        };
        quizData.questions.push(radioGroups[name]);
      }
      if (name) radioGroups[name].options.push(radio.value || radio.id || 'option');
    });

    // Look for checkbox groups
    const checkboxGroups = {};
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      const name = cb.name || 'checkboxes';
      if (!checkboxGroups[name]) {
        checkboxGroups[name] = {
          type: 'multiple-choice',
          name: name,
          options: [],
          selected: [],
          startTime: Date.now(),
          attempts: 0
        };
        quizData.questions.push(checkboxGroups[name]);
      }
      checkboxGroups[name].options.push(cb.value || cb.id || 'option');
    });

    // Look for text inputs (short answer)
    document.querySelectorAll('input[type="text"], textarea').forEach(input => {
      const id = input.id || input.name || 'text-' + Math.random().toString(36).substr(2, 9);
      if (!input.dataset.quizTracked) {
        input.dataset.quizTracked = 'true';
        quizData.questions.push({
          type: 'text-input',
          name: id,
          value: '',
          startTime: Date.now(),
          attempts: 0
        });
      }
    });

    quizData.maxScore = quizData.questions.length;
    logQuizAction('questions-detected', { count: quizData.questions.length });
  }

  // Build comprehensive quiz feedback
  function buildQuizFeedback() {
    const elapsedSeconds = tSeconds();
    const attempted = quizData.questions.filter(q => q.selected || (q.selected && q.selected.length > 0) || q.value).length;
    
    let questionsHtml = quizData.questions.map((q, idx) => {
      const num = idx + 1;
      const timeSpent = q.startTime ? Math.round((Date.now() - q.startTime) / 1000) : 0;
      let answer = 'Not answered';
      if (q.type === 'single-choice' && q.selected) answer = q.selected;
      if (q.type === 'multiple-choice' && q.selected && q.selected.length > 0) answer = q.selected.join(', ');
      if (q.type === 'text-input' && q.value) answer = q.value;
      return 'Q' + num + ' (' + q.type + '): ' + answer + ' [' + timeSpent + 's, ' + q.attempts + ' attempts]';
    }).join('<br>');

    const navLog = quizData.navigationLog.slice(-10).map(n => 
      't=' + n.t + ': ' + n.action + (n.details ? ' - ' + JSON.stringify(n.details) : '')
    ).join('<br>');

    return '<div><div>'
      + '<strong>Quiz Progress</strong><br>'
      + 'Questions: ' + attempted + '/' + quizData.questions.length + '<br>'
      + 'Score: ' + quizData.totalScore + '/' + quizData.maxScore + '<br>'
      + 'Time: ' + elapsedSeconds + 's<br><br>'
      + '<strong>Questions Detail:</strong><br>' + questionsHtml + '<br><br>'
      + '<strong>Recent Actions:</strong><br>' + navLog
      + '</div></div>';
  }

  // Floating quiz analytics panel
  const panel = document.createElement('div');
  Object.assign(panel.style, {
    position: 'fixed', right: '12px', bottom: '56px',
    minWidth: '280px', maxWidth: '380px',
    background: 'rgba(17,24,39,0.95)', color: '#e5e7eb',
    border: '1px solid #374151', borderRadius: '8px',
    padding: '10px 12px', zIndex: 999998, fontSize: '12px', lineHeight: '1.4',
    maxHeight: '60vh', overflowY: 'auto'
  });
  panel.setAttribute('id', 'xapiQuizPanel');
  makeDraggable(panel, { handleSelector: '#xapiQuizPanelHeader', storageKey: 'xapiPos:quizPanel' });

  function updateQuizPanel() {
    try {
      const elapsedSeconds = tSeconds();
      const attempted = quizData.questions.filter(q => 
        q.selected || (q.selected && q.selected.length > 0) || q.value
      ).length;
      
      panel.innerHTML = ''
        + '<div id="xapiQuizPanelHeader" style="font-weight:600;margin-bottom:8px;color:#60a5fa;cursor:move;user-select:none;touch-action:none;">📊 Quiz Analytics</div>'
        + '<div>Questions: ' + attempted + '/' + quizData.questions.length + '</div>'
        + '<div>Score: ' + quizData.totalScore + '/' + quizData.maxScore + '</div>'
        + '<div>Time: ' + elapsedSeconds + 's</div>'
        + '<div style="margin-top:8px;padding-top:8px;border-top:1px solid #374151;font-size:11px;">'
        + 'Actions: ' + quizData.navigationLog.length + '</div>';
    } catch(e){}
  }

  function setPending(reason) {
    try {
      const feedback = buildQuizFeedback();
      window.__xapiPending = {
        score: quizData.totalScore,
        maxScore: quizData.maxScore,
        feedback,
        reason,
        quizData: JSON.parse(JSON.stringify(quizData))
      };
    } catch(e){}
  }

  // Track radio button selections
  document.addEventListener('change', (e) => {
    const el = e.target;
    if (el && el.type === 'radio' && el.name) {
      const q = quizData.questions.find(q => q.name === el.name);
      if (q) {
        q.selected = el.value || el.id || 'selected';
        q.attempts++;
        logQuizAction('answer-selected', { question: el.name, answer: q.selected, type: 'radio' });
      }
    } else if (el && el.type === 'checkbox') {
      const name = el.name || 'checkboxes';
      const q = quizData.questions.find(q => q.name === name);
      if (q) {
        if (!q.selected) q.selected = [];
        const val = el.value || el.id || 'checked';
        if (el.checked) {
          if (!q.selected.includes(val)) q.selected.push(val);
        } else {
          q.selected = q.selected.filter(v => v !== val);
        }
        q.attempts++;
        logQuizAction('answer-toggled', { question: name, answer: val, checked: el.checked, type: 'checkbox' });
      }
    } else if (el && (el.type === 'text' || el.tagName === 'TEXTAREA')) {
      const id = el.id || el.name;
      const q = quizData.questions.find(q => q.name === id);
      if (q) {
        q.value = el.value;
        q.attempts++;
        logQuizAction('text-entered', { question: id, length: el.value.length, type: 'text' });
      }
    } else if (el && el.tagName === 'SELECT') {
      logQuizAction('dropdown-changed', { value: el.value, id: el.id || el.name });
    }
  }, true);

  // Track all clicks for navigation and button presses
  document.addEventListener('click', (e) => {
    const el = e.target;
    if (el && el.tagName === 'BUTTON') {
      const text = el.innerText.trim().toLowerCase();
      if (text.includes('submit') || text.includes('finish') || text.includes('done')) {
        logQuizAction('submit-clicked', { button: el.innerText.trim() });
        sendQuizState('submit');
      } else if (text.includes('next')) {
        logQuizAction('next-clicked', {});
      } else if (text.includes('prev') || text.includes('back')) {
        logQuizAction('previous-clicked', {});
      } else if (text.includes('check') || text.includes('verify')) {
        logQuizAction('check-answer', { button: el.innerText.trim() });
      } else {
        logQuizAction('button-clicked', { button: el.innerText.trim() });
      }
    }
  }, true);

  // Dedup-safe sender
  let lastSignature = null;
  function signatureOf(p) {
    try {
      return JSON.stringify({
        s: p.score,
        q: p.quizData ? p.quizData.questions.length : 0,
        a: p.quizData ? p.quizData.navigationLog.length : 0
      });
    } catch { return String(Date.now()); }
  }

  function sendQuizState(reason) {
    try {
      const feedback = buildQuizFeedback();
      const payload = {
        score: quizData.totalScore,
        maxScore: quizData.maxScore,
        feedback,
        reason,
        quizData: JSON.parse(JSON.stringify(quizData))
      };
      const sig = signatureOf(payload);
      if (sig && sig === lastSignature) return;
      lastSignature = sig;

      if (typeof window.storeState === 'function') {
        window.storeState(payload);
        logQuizAction('auto-save', { reason });
      } else {
        console.warn('storeState not available');
      }
      setPending(reason);
    } catch(e) {
      console.warn('xAPI sendState failed:', e);
    }
  }

  // Floating "Save to SLS" button
  const btn = document.createElement('button');
  btn.textContent = 'Save Quiz to SLS';
  Object.assign(btn.style, {
    position: 'fixed', right: '12px', bottom: '12px',
    padding: '10px 16px', background: '#2563eb', color: '#fff',
    border: 'none', borderRadius: '6px', zIndex: 999999,
    cursor: 'pointer', fontWeight: '600'
  });
  makeDraggable(btn, { storageKey: 'xapiPos:quizSaveBtn' });
  btn.addEventListener('click', () => {
    if (typeof window.storeState === 'function') {
      try {
        const feedback = buildQuizFeedback();
        const payload = {
          score: quizData.totalScore,
          maxScore: quizData.maxScore,
          feedback,
          reason: 'manual-save',
          quizData: JSON.parse(JSON.stringify(quizData))
        };
        window.storeState(payload);
        lastSignature = signatureOf(payload);
        logQuizAction('manual-save', {});
        alert('Quiz progress saved successfully!');
      } catch(e) {
        console.warn('xAPI sendState failed:', e);
        alert('Failed to save quiz progress. Please try again.');
      }
    } else {
      console.warn('storeState not available');
      alert('xAPI not configured. Cannot save progress.');
    }
    setPending('manual-save');
  });

  document.addEventListener('DOMContentLoaded', () => {
    try {
      document.body.appendChild(panel);
      document.body.appendChild(btn);
      // Detect questions after a short delay to ensure DOM is ready
      setTimeout(detectQuestions, 500);
      setTimeout(updateQuizPanel, 600);
    } catch(e){}
  });

  // Auto-send hooks
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') sendQuizState('visibility-hidden');
  }, true);

  window.addEventListener('pagehide', () => {
    sendQuizState('pagehide');
  }, { capture: true });

  window.addEventListener('message', (event) => {
    try {
      const data = event.data;
      const key = (data && (data.type || data.event || data.action || data.message)) || '';
      if (typeof key === 'string' && /submit/i.test(key)) {
        sendQuizState('sls-submit');
      }
    } catch(e){}
  }, false);

  setPending('init');
})();
        `.trim() : `
(function(){
  if (window.__xapiIntegrator) return;
  window.__xapiIntegrator = true;

  // Draggable helper for floating UI (panel/button)
  function makeDraggable(el, opts) {
    opts = opts || {};
    const handleSelector = opts.handleSelector || null;
    const storageKey = opts.storageKey || '';
    let isDragging = false, started = false;
    let startX = 0, startY = 0, origLeft = 0, origTop = 0;

    // Restore saved position
    try {
      if (storageKey) {
        const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
        if (saved && typeof saved.left === 'number' && typeof saved.top === 'number') {
          el.style.left = saved.left + 'px';
          el.style.top = saved.top + 'px';
          el.style.right = 'auto';
          el.style.bottom = 'auto';
        }
      }
    } catch(e){}

    function onPointerDown(e) {
      if (handleSelector && !e.target.closest(handleSelector)) return;
      isDragging = true; started = false;
      startX = e.clientX; startY = e.clientY;
      const rect = el.getBoundingClientRect();
      origLeft = rect.left; origTop = rect.top;
      el.setPointerCapture && el.setPointerCapture(e.pointerId);
    }
    function onPointerMove(e) {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (!started && Math.hypot(dx, dy) < 4) return;
      started = true;
      let left = origLeft + dx;
      let top = origTop + dy;
      const vw = window.innerWidth, vh = window.innerHeight;
      const r = el.getBoundingClientRect();
      left = Math.max(0, Math.min(left, vw - r.width));
      top = Math.max(0, Math.min(top, vh - r.height));
      el.style.left = left + 'px';
      el.style.top = top + 'px';
      el.style.right = 'auto';
      el.style.bottom = 'auto';
      e.preventDefault();
    }
    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;
      if (started) {
        try {
          if (storageKey) {
            const left = parseInt(el.style.left || '0', 10) || 0;
            const top = parseInt(el.style.top || '0', 10) || 0;
            localStorage.setItem(storageKey, JSON.stringify({ left, top }));
          }
        } catch(e){}
      }
    }
    function onResize() {
      // keep element in viewport
      const r = el.getBoundingClientRect();
      let left = r.left, top = r.top;
      const vw = window.innerWidth, vh = window.innerHeight;
      left = Math.max(0, Math.min(left, vw - r.width));
      top = Math.max(0, Math.min(top, vh - r.height));
      el.style.left = left + 'px';
      el.style.top = top + 'px';
      el.style.right = 'auto';
      el.style.bottom = 'auto';
    }

    el.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('resize', onResize);
  }

  const sessionStart = Date.now();
  const actionLog = [];
  const xapi = { score: 0, interactionCount: 0, playStart: null, totalPlayMs: 0 };

  // Pending payload that always reflects the latest feedback/score (for auto-send hooks)
  window.__xapiPending = null;

  function tSeconds() { return Math.round((Date.now() - sessionStart)/1000); }
  function flushPlayTime() {
    if (xapi.playStart) { xapi.totalPlayMs += (Date.now() - xapi.playStart); xapi.playStart = null; }
  }
  function logAction(message) {
    const t = tSeconds();
    actionLog.push({ t, message });
    try { console.log('[xAPI Integrator]', 't=' + t + ',', message); } catch(e){}
    updateFeedbackPanel();
    setPending('live');
  }

  // Live feedback builder
  function buildFeedback() {
    const elapsedSeconds = tSeconds();
    const actionsHtml = actionLog.map(a => 't = ' + a.t + ', ' + a.message).join('<br>');
    return '<div><div>'
      + 'Interactions: ' + xapi.interactionCount + '<br>'
      + 'Total Play Time: ' + elapsedSeconds + 's<br>'
      + 'Score: ' + (xapi.score || 0) + '<br><br>'
      + 'Action Log:<br>' + actionsHtml
      + '</div></div>';
  }

  // Floating live feedback panel
  const panel = document.createElement('div');
  Object.assign(panel.style, {
    position: 'fixed', right: '12px', bottom: '56px',
    minWidth: '240px', maxWidth: '320px',
    background: 'rgba(17,24,39,0.9)', color: '#e5e7eb',
    border: '1px solid #374151', borderRadius: '8px',
    padding: '8px 10px', zIndex: 999998, fontSize: '12px', lineHeight: '1.3'
  });
  panel.setAttribute('id', 'xapiLiveFeedback');
  makeDraggable(panel, { handleSelector: '#xapiLiveFeedbackHeader', storageKey: 'xapiPos:livePanel' });
  document.addEventListener('DOMContentLoaded', () => {
    // Append panel near the end so the Save button remains on top
    try { document.body.appendChild(panel); } catch(e){}
    updateFeedbackPanel();
  });

  function updateFeedbackPanel() {
    try {
      const elapsedSeconds = tSeconds();
      panel.innerHTML = ''
        + '<div id="xapiLiveFeedbackHeader" style="font-weight:600;margin-bottom:6px;cursor:move;user-select:none;touch-action:none;">Live Feedback</div>'
        + '<div>Interactions: ' + xapi.interactionCount + '</div>'
        + '<div>Total Play Time: ' + elapsedSeconds + 's</div>'
        + '<div>Score: ' + (xapi.score || 0) + '</div>';
    } catch(e){}
  }

  // Keep play time ticking in panel while playing
  setInterval(() => {
    if (xapi.playStart) updateFeedbackPanel();
  }, 1000);

  // Keep a pending payload up to date for auto-send triggers
  function setPending(reason) {
    try {
      const feedback = buildFeedback();
      window.__xapiPending = { score: xapi.score, feedback, reason, actions: actionLog };
    } catch(e){}
  }

  document.addEventListener('click', (e) => {
    const el = e.target;
    let label = '';
    if (el && el.tagName === 'BUTTON') {
      label = el.innerText.trim() || el.id || 'button';
      logAction('click "' + label + '"');
      xapi.interactionCount++;
    } else if (el && el.tagName === 'INPUT') {
      label = (el.value || el.name || el.id || 'input').toString();
      logAction('click input "' + label + '"');
      xapi.interactionCount++;
    }
  }, true);

  document.addEventListener('change', (e) => {
    const el = e.target;
    if (el && el.tagName === 'SELECT') {
      const val = el.value;
      const label = val ? (val.charAt(0).toUpperCase() + val.slice(1)) : 'Select';
      logAction('click "' + label + '"');
      xapi.interactionCount++;
    }
  }, true);

  let dragStart = null;
  document.addEventListener('mousedown', (e) => {
    if (e.target && e.target.tagName === 'CANVAS') {
      dragStart = { x: e.offsetX, y: e.offsetY, canvas: e.target };
    }
  }, true);
  document.addEventListener('mouseup', (e) => {
    if (dragStart && dragStart.canvas === e.target) {
      const name = 'canvas';
      logAction('drag ' + name + ' to position ' + Math.round(e.offsetX) + ',' + Math.round(e.offsetY) + '.');
      xapi.interactionCount++;
    }
    dragStart = null;
  }, true);

  function hookById(id, message, after) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('click', () => {
      logAction(message);
      if (typeof after === 'function') after();
    }, true);
  }

  hookById('playBtn', 'clicked "Play"', () => {
    if (!xapi.playStart) xapi.playStart = Date.now();
    setPending('play');
  });

  hookById('pauseBtn', 'click "Pause"', () => {
    flushPlayTime();
    setPending('pause'); // keep pending updated
    // Auto-save on pause remains as a convenience
    if (typeof window.storeState === 'function') {
      try {
        const feedback = buildFeedback();
        const payload = { score: xapi.score, feedback, reason: 'pause', actions: actionLog };
        window.storeState(payload);
        logAction('auto-save (pause)');
      } catch(e) { console.warn('xAPI sendState failed:', e); }
    }
  });

  hookById('resetBtn', 'click "Reset"', () => {
    xapi.score = (typeof xapi.score === 'number') ? xapi.score + 1 : 1;
    logAction('awarded 1 mark. total score = ' + xapi.score + '.');
    setPending('reset');
  });

  // Dedup-safe sender used by auto hooks (including SLS submit via postMessage)
  let lastSignature = null;
  function signatureOf(p) {
    try { return JSON.stringify({ s: p.score, a: (p.actions ? p.actions.length : 0), f: (p.feedback || '').length }); }
    catch { return String(Date.now()); }
  }
  function sendState(reason) {
    try {
      flushPlayTime();
      const feedback = buildFeedback();
      const payload = { score: xapi.score, feedback, reason, actions: actionLog };
      const sig = signatureOf(payload);
      if (sig && sig === lastSignature) return; // avoid duplicate identical sends
      lastSignature = sig;

      if (typeof window.storeState === 'function') {
        window.storeState(payload);
        logAction('auto-save (' + reason + ')');
      } else {
        console.warn('storeState not available; ensure xAPI scripts are loaded and platform URL params are present.');
      }
      // keep pending in sync
      setPending(reason);
    } catch(e) {
      console.warn('xAPI sendState failed:', e);
    }
  }

  // Floating "Save to SLS" button (kept as required user action)
  const btn = document.createElement('button');
  btn.textContent = 'Save to SLS';
  Object.assign(btn.style, {
    position: 'fixed', right: '12px', bottom: '12px',
    padding: '8px 12px', background: '#1976d2', color: '#fff',
    border: 'none', borderRadius: '6px', zIndex: 999999, cursor: 'pointer'
  });
  makeDraggable(btn, { storageKey: 'xapiPos:timelineSaveBtn' });
  btn.addEventListener('click', () => {
    flushPlayTime();
    if (typeof window.storeState === 'function') {
      try {
        const feedback = buildFeedback();
        const payload = { score: xapi.score, feedback, reason: 'manual-save', actions: actionLog };
        window.storeState(payload);
        lastSignature = signatureOf(payload); // dedup against autos
        logAction('manual save triggered');
      } catch(e) { console.warn('xAPI sendState failed:', e); }
    } else {
      console.warn('storeState not available; ensure xAPI scripts are loaded and platform URL params are present.');
    }
    setPending('manual-save');
  });
  document.addEventListener('DOMContentLoaded', () => {
    try { document.body.appendChild(btn); } catch(e){}
  });

  // Auto-send hooks:
  // 1) When content is being hidden or navigated away
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') sendState('visibility-hidden');
  }, true);
  window.addEventListener('pagehide', () => {
    sendState('pagehide');
  }, { capture: true });

  // 2) Listen for parent window messages indicating "submit" (SLS submit button)
  //    If SLS can postMessage({ type: 'submit' }) on submit, this will auto-send.
  window.addEventListener('message', (event) => {
    try {
      const data = event.data;
      const key = (data && (data.type || data.event || data.action || data.message)) || '';
      if (typeof key === 'string' && /submit/i.test(key)) {
        sendState('sls-submit');
      }
    } catch(e){}
  }, false);

  // Initialize pending once
  setPending('init');
})();
        `.trim();

        const s3 = doc.createElement('script');
        s3.textContent = snippet;
        doc.body.appendChild(s3);
      }
    }

    // Inject experimental AI snippet if provided
    if (mode === 'ai' && options && options.aiSnippet) {
      const sAi = doc.createElement('script');
      sAi.textContent = options.aiSnippet;
      doc.body.appendChild(sAi);
    }

    return serializeDocument(doc);
  }

  // Analyze ZIP content and recommend mode
  async function analyzeInteractive(html, jsContent) {
    const analysis = {
      hasRadioButtons: false,
      hasCheckboxes: false,
      hasTextInputs: false,
      hasDragDrop: false,
      hasGameState: false,
      hasScore: false,
      hasCanvas: false,
      hasPlayPause: false,
      recommendedMode: 'minimal',
      confidence: 0,
      reasons: []
    };

    // Analyze HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Check for form elements
    analysis.hasRadioButtons = doc.querySelectorAll('input[type="radio"]').length > 0;
    analysis.hasCheckboxes = doc.querySelectorAll('input[type="checkbox"]').length > 0;
    analysis.hasTextInputs = doc.querySelectorAll('input[type="text"], textarea').length > 0;
    analysis.hasCanvas = doc.querySelectorAll('canvas').length > 0;

    // Check JavaScript content
    if (jsContent) {
      analysis.hasDragDrop = /drag|drop|draggable/i.test(jsContent);
      analysis.hasGameState = /gameState|game_state|state\s*=/i.test(jsContent);
      analysis.hasScore = /score|points|grade/i.test(jsContent);
      analysis.hasPlayPause = /playBtn|pauseBtn|play\(\)|pause\(\)/i.test(jsContent);
    }

    // Determine recommendation
    const quizScore = (analysis.hasRadioButtons ? 3 : 0) +
      (analysis.hasCheckboxes ? 3 : 0) +
      (analysis.hasTextInputs ? 2 : 0);

    const gameScore = (analysis.hasDragDrop ? 3 : 0) +
      (analysis.hasGameState ? 2 : 0) +
      (analysis.hasScore ? 2 : 0);

    const simulationScore = (analysis.hasCanvas ? 3 : 0) +
      (analysis.hasPlayPause ? 3 : 0);

    if (quizScore >= 3) {
      analysis.recommendedMode = 'quiz';
      analysis.confidence = Math.min(100, quizScore * 20);
      if (analysis.hasRadioButtons) analysis.reasons.push('Contains radio buttons (single-choice questions)');
      if (analysis.hasCheckboxes) analysis.reasons.push('Contains checkboxes (multiple-choice questions)');
      if (analysis.hasTextInputs) analysis.reasons.push('Contains text inputs (short answer questions)');
    } else if (gameScore >= 3 || simulationScore >= 3) {
      analysis.recommendedMode = 'timeline';
      analysis.confidence = Math.min(100, Math.max(gameScore, simulationScore) * 15);
      if (analysis.hasDragDrop) analysis.reasons.push('Uses drag-and-drop interactions');
      if (analysis.hasGameState) analysis.reasons.push('Has game state tracking');
      if (analysis.hasScore) analysis.reasons.push('Includes scoring system');
      if (analysis.hasCanvas) analysis.reasons.push('Uses canvas for visual elements');
      if (analysis.hasPlayPause) analysis.reasons.push('Has play/pause controls');
    } else {
      analysis.recommendedMode = 'minimal';
      analysis.confidence = 50;
      analysis.reasons.push('No specific interactive patterns detected - minimal mode recommended');
    }

    return analysis;
  }

  // Smart diagnostics - automatically detect issues in the content
  function diagnoseContent(html, jsContent) {
    const issues = [];

    // Check for scoring variables
    const hasScoreVar = /\b(score|marks|points|grade)\s*=/i.test(jsContent);
    const hasScoreInComment = /\/\/.*score|\/\*.*score/i.test(jsContent);

    if (!hasScoreVar && !hasScoreInComment) {
      issues.push({
        type: 'missing_score',
        severity: 'high',
        message: 'No scoring variable detected',
        fix: 'Add score tracking with: let score = 0;'
      });
    }

    // Check for feedback display
    const hasFeedbackDiv = /<div[^>]*(id|class)=["'][^"']*feedback/i.test(html);
    const hasFeedbackElement = /<[^>]*(feedback|result|message)/i.test(html);

    if (!hasFeedbackDiv && !hasFeedbackElement) {
      issues.push({
        type: 'missing_feedback',
        severity: 'medium',
        message: 'No feedback display element found',
        fix: 'Add: <div id="feedback"></div>'
      });
    }

    // Check for button event handlers
    const hasButtons = /<button/i.test(html);
    const hasEventListeners = /addEventListener|onclick|onchange/i.test(jsContent);

    if (hasButtons && !hasEventListeners) {
      issues.push({
        type: 'missing_events',
        severity: 'high',
        message: 'Buttons found but no event handlers detected',
        fix: 'Add event listeners to connect buttons to logic'
      });
    }

    // Check for storeState calls
    const hasStoreState = /storeState\s*\(/i.test(jsContent);

    if (!hasStoreState) {
      issues.push({
        type: 'missing_xapi',
        severity: 'critical',
        message: 'No xAPI storeState() calls found',
        fix: 'Add: window.storeState({score: score, feedback: "Your feedback"});'
      });
    }

    // Check for input elements without handlers
    const hasInputs = /<input|<select|<textarea/i.test(html);
    const hasInputHandlers = /addEventListener.*change|onchange|oninput/i.test(jsContent);

    if (hasInputs && !hasInputHandlers) {
      issues.push({
        type: 'missing_input_handlers',
        severity: 'medium',
        message: 'Input elements found without change handlers',
        fix: 'Add change event listeners to track user input'
      });
    }

    return issues;
  }

  async function generateAiSnippet({ html, jsContent, instructions, apiKey, model }) {
    const maxHtml = 12000;
    const maxJs = 8000;
    const htmlSnippet = html ? html.slice(0, maxHtml) : '';
    const jsSnippet = jsContent ? jsContent.slice(0, maxJs) : '';

    // Run diagnostics
    const issues = diagnoseContent(html, jsContent);

    // Build enhanced prompt with diagnostics
    let diagnosticsSection = '';
    if (issues.length > 0) {
      diagnosticsSection = '\n\n🔍 DETECTED ISSUES TO FIX:\n' +
        issues.map(i => `- [${i.severity.toUpperCase()}] ${i.message}\n  Solution: ${i.fix}`).join('\n');
    }

    const systemPrompt = `You are an expert xAPI integration specialist. Generate a JavaScript snippet to integrate xAPI tracking into an HTML5 interactive.

CRITICAL REQUIREMENTS:
1. window.storeState(payload) is available - use it to send data to the LRS
2. payload must have: {score: number, feedback: string}
3. Track ALL interactive elements (buttons, inputs, selects, etc.)
4. Calculate scores based on user actions
5. Display feedback to the user
6. Return ONLY executable JavaScript code (no markdown, no explanations)
7. Code must be production-ready with error handling

${diagnosticsSection}`;

    const userPrompt = `Author instructions:\n${instructions || '(none)'}\n\n--- HTML (truncated) ---\n${htmlSnippet}\n\n--- JavaScript (truncated) ---\n${jsSnippet}\n\nGenerate the integration code now.`;

    const messages = [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: userPrompt
      }
    ];

    // CORS Proxy Configuration
    // Set USE_PROXY = true and add your Cloudflare Worker URL to enable AI features
    const USE_PROXY = false; // Change to true after deploying Cloudflare Worker
    const PROXY_URL = 'https://xapi-ai-proxy.YOUR-USERNAME.workers.dev'; // Replace with your worker URL

    // Select provider/endpoint based on model string.
    let endpoint = USE_PROXY ? PROXY_URL : 'https://api.openai.com/v1/chat/completions';
    let provider = 'OpenAI';
    let headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + apiKey
    };

    // Add proxy headers if using proxy
    if (USE_PROXY) {
      headers['X-API-Key'] = apiKey;
      headers['X-Target-API'] = 'openai';
      delete headers['Authorization']; // Proxy will add this
    }

    let body;

    if (typeof model === 'string' && /claude/i.test(model)) {
      // Anthropic Claude
      endpoint = USE_PROXY ? PROXY_URL : 'https://api.anthropic.com/v1/messages';
      provider = 'Anthropic';

      if (USE_PROXY) {
        headers = {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
          'X-Target-API': 'anthropic'
        };
      } else {
        headers = {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        };
      }
      body = {
        model,
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text:
                  'You generate a single JavaScript snippet to be injected into an existing SLS HTML5 interactive. xAPI libraries and window.storeState(...) are already available. The snippet must be pure JavaScript without surrounding <script> tags or explanatory text.\n\n' +
                  'Author instructions:\n' +
                  (instructions || '(none)') +
                  '\n\n--- HTML (truncated) ---\n' +
                  htmlSnippet +
                  '\n\n--- JavaScript (truncated) ---\n' +
                  jsSnippet +
                  '\n\nRequirements:\n' +
                  '- Assume window.storeState(payload) is available and will send data back to SLS.\n' +
                  "- If appropriate, compute a numeric score or marks based on the described logic.\n" +
                  '- Attach any needed event listeners inside this snippet.\n' +
                  '- Do NOT include any API keys or secrets.\n' +
                  '- Return ONLY executable JavaScript code.'
              }
            ]
          }
        ]
      };
    } else {
      // Default to OpenAI-compatible chat completion body
      body = {
        model,
        messages,
        temperature: 0.1
      };
    }

    log(
      `AI request: provider=${provider}, endpoint=${endpoint}, model=${model || '(none)'}`
    );

    let res;
    try {
      res = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });
    } catch (networkErr) {
      const msg =
        (networkErr && networkErr.message) ||
        'Network error calling AI provider from browser.';
      // Most likely root cause is CORS when calling api.openai.com / api.anthropic.com
      // directly from http://localhost or another origin without proper headers.
      throw new Error(
        msg +
        ' This often indicates a browser CORS restriction when calling ' +
        provider +
        ' APIs directly from the page. Run this through your own backend/proxy, or switch back to Timeline/Quiz mode.'
      );
    }

    if (!res.ok) {
      throw new Error(
        'AI request failed (' +
        provider +
        '): ' +
        res.status +
        ' ' +
        res.statusText
      );
    }

    const data = await res.json();
    let content =
      (data &&
        data.choices &&
        data.choices[0] &&
        data.choices[0].message &&
        data.choices[0].message.content) ||
      '';

    if (!content) {
      throw new Error('AI response missing content');
    }

    const fenceMatch = content.match(/```[a-zA-Z]*\s*([\s\S]*?)```/);
    if (fenceMatch && fenceMatch[1]) {
      content = fenceMatch[1];
    }

    return content.trim();
  }

  integrateBtn.addEventListener('click', async () => {
    setStatus('');
    downloadLink.style.display = 'none';
    downloadLink.removeAttribute('href');
    downloadLink.removeAttribute('download');
    if (logEl) { logEl.textContent = ''; }

    const file = (zipInput && zipInput.files && zipInput.files[0]) ? zipInput.files[0] : null;
    if (!file) {
      setStatus('Please choose a ZIP file to integrate.');
      return;
    }

    setStatus('Analyzing ZIP...');
    log(`Reading ZIP: ${file.name} (${file.size} bytes)`);

    try {
      if (!window.JSZip) {
        setStatus('JSZip failed to load. Check network or ensure ./vendor/jszip.min.js exists.');
        log('JSZip not available on window.');
        return;
      }
      const jszip = new JSZip();
      const zip = await jszip.loadAsync(file);

      const { contentDir, indexPath } = findContentDirFromZip(zip);
      if (!indexPath) {
        setStatus('index.html not found in ZIP.');
        log('Error: index.html not found.');
        return;
      }
      log(`Detected content dir: "${contentDir || '(root)'}", index: "${indexPath}"`);

      const html = await zip.file(indexPath).async('string');

      // Try to load JavaScript file for analysis
      let jsContent = '';
      const jsFiles = Object.keys(zip.files).filter(k => k.endsWith('.js') && !k.includes('node_modules'));
      if (jsFiles.length > 0) {
        try {
          jsContent = await zip.file(jsFiles[0]).async('string');
        } catch (e) {
          log('Could not read JavaScript file for analysis');
        }
      }

      // Analyze and recommend mode
      setStatus('Analyzing interactive content...');
      const analysis = await analyzeInteractive(html, jsContent);

      log(`\n📊 ANALYSIS RESULTS:`);
      log(`Recommended Mode: ${analysis.recommendedMode.toUpperCase()} (${analysis.confidence}% confidence)`);
      log(`Detected features:`);
      if (analysis.hasRadioButtons) log('  ✓ Radio buttons');
      if (analysis.hasCheckboxes) log('  ✓ Checkboxes');
      if (analysis.hasTextInputs) log('  ✓ Text inputs');
      if (analysis.hasDragDrop) log('  ✓ Drag & Drop');
      if (analysis.hasGameState) log('  ✓ Game state');
      if (analysis.hasScore) log('  ✓ Scoring system');
      if (analysis.hasCanvas) log('  ✓ Canvas elements');
      if (analysis.hasPlayPause) log('  ✓ Play/Pause controls');
      log(`Reasons: ${analysis.reasons.join(', ')}\n`);

      // Check if user's selected mode matches recommendation
      const userMode = getSelectedMode();
      let finalMode = userMode;

      if (userMode !== analysis.recommendedMode && analysis.confidence >= 60) {
        const shouldChange = confirm(
          `⚠️ MODE RECOMMENDATION\n\n` +
          `Detected: ${analysis.recommendedMode.toUpperCase()} mode (${analysis.confidence}% confidence)\n` +
          `Currently selected: ${userMode.toUpperCase()} mode\n\n` +
          `Reasons:\n${analysis.reasons.map(r => '• ' + r).join('\n')}\n\n` +
          `Would you like to use the recommended ${analysis.recommendedMode.toUpperCase()} mode instead?\n\n` +
          `(Click OK to use recommended mode, Cancel to keep your selection)`
        );

        if (shouldChange) {
          finalMode = analysis.recommendedMode;
          // Update the UI to reflect the change
          document.querySelectorAll('input[name="mode"]').forEach(radio => {
            if (radio.value === finalMode) radio.checked = true;
          });
          log(`✓ Switched to recommended mode: ${finalMode.toUpperCase()}`);
        } else {
          log(`User chose to keep ${userMode.toUpperCase()} mode`);
        }
      } else if (userMode === analysis.recommendedMode) {
        log(`✓ Selected mode matches recommendation`);
      }

      const keepAnalytics = shouldKeepAnalytics();

      if (finalMode === 'ai') {
        const apiKey =
          aiApiKeyInput && aiApiKeyInput.value && aiApiKeyInput.value.trim();
        if (!apiKey) {
          alert('Please enter your AI API key for Experimental AI mode.');
          setStatus('AI API key required.');
          return;
        }
        // Persist latest API key
        safeSetLocalStorage(LS_AI_API_KEY, apiKey);

        let model = 'gpt-4.1-mini';
        if (aiModelInput) {
          const selected = aiModelInput.value;
          if (selected === 'custom') {
            if (aiModelCustomInput && aiModelCustomInput.value.trim()) {
              model = aiModelCustomInput.value.trim();
            }
          } else if (selected) {
            model = selected;
          }
          safeSetLocalStorage(LS_AI_MODEL, selected || '');
        }
        if (aiModelCustomInput) {
          safeSetLocalStorage(
            LS_AI_MODEL_CUSTOM,
            (aiModelCustomInput.value || '').trim()
          );
        }

        const instructions =
          (aiInstructionInput &&
            aiInstructionInput.value &&
            aiInstructionInput.value.trim()) ||
          'Hook up the main score/marks variable and call window.storeState(...) with a useful payload.';

        setStatus('Contacting AI to generate custom xAPI wiring...');
        log(`Calling AI model "${model}" to generate integration snippet...`);

        let aiSnippet;
        try {
          aiSnippet = await generateAiSnippet({
            html,
            jsContent,
            instructions,
            apiKey,
            model
          });
        } catch (err) {
          console.error('AI generation error:', err);
          const msg =
            (err && err.message) ||
            'Unknown error while contacting AI provider from browser.';
          setStatus('AI generation failed: ' + msg);
          alert(
            'Experimental AI mode could not contact the selected AI provider.\n\n' +
            'Most common root cause in a browser is CORS: the remote API (e.g. api.openai.com or api.anthropic.com) ' +
            'does not send an Access-Control-Allow-Origin header for http://localhost:8000, so the browser blocks the call.\n\n' +
            'Details:\n' +
            msg +
            '\n\nTo fix this you can:\n' +
            '1) Call the AI provider from your own backend or proxy that adds proper CORS headers, and update this tool to hit that proxy instead of the vendor URL; or\n' +
            '2) Disable Experimental AI and use Timeline or Quiz mode, which do not require any external AI calls.'
          );
          return;
        }

        if (!aiSnippet) {
          setStatus('AI did not return any code.');
          alert(
            'AI did not return any JavaScript code. Cannot continue with Experimental AI mode.'
          );
          return;
        }

        const openInNewTab = shouldOpenInNewTab();
        const contentName = 'content.html';

        if (openInNewTab) {
          // SEAMLESS AI MODE
          const dir = indexPath.substring(0, indexPath.lastIndexOf('/') + 1);
          const contentPath = dir + contentName;

          // 1. Parent
          const parentHtml = injectScriptsIntoHtml(html, {
            mode: 'ai',
            keepAnalytics,
            aiSnippet,
            isChild: false,
            addLauncherBtn: true,
            contentFilename: contentName
          });
          zip.file(indexPath, parentHtml);

          // 2. Child
          const childHtml = injectScriptsIntoHtml(html, {
            mode: 'ai',
            keepAnalytics,
            aiSnippet,
            isChild: true
          });
          zip.file(contentPath, childHtml);

          log(`Configured for Seamless AI New Tab mode: ${indexPath} (Parent) and ${contentPath} (Child)`);
        } else {
          const injectedHtml = injectScriptsIntoHtml(html, {
            mode: 'ai',
            keepAnalytics,
            aiSnippet,
            isChild: false
          });
          zip.file(indexPath, injectedHtml);
        }
      } else {
        setStatus('Injecting xAPI integration...');
        log(
          `Injecting (mode=${finalMode}, keepAnalytics=${keepAnalytics})...`
        );

        const openInNewTab = shouldOpenInNewTab();
        const contentName = 'content.html';

        if (openInNewTab) {
          // SEAMLESS MODE: Both tabs are full interactives.
          // index.html is the Parent (in SLS) + "Open in New Tab" button
          // content.html is the Child (in popup)

          const dir = indexPath.substring(0, indexPath.lastIndexOf('/') + 1);
          const contentPath = dir + contentName;

          // 1. Generate Parent (index.html)
          const parentHtml = injectScriptsIntoHtml(html, {
            mode: finalMode,
            keepAnalytics,
            isChild: false,
            addLauncherBtn: true,
            contentFilename: contentName
          });
          zip.file(indexPath, parentHtml);

          // 2. Generate Child (content.html)
          const childHtml = injectScriptsIntoHtml(html, {
            mode: finalMode,
            keepAnalytics,
            isChild: true
          });
          zip.file(contentPath, childHtml);

          log(`Configured for Seamless New Tab mode: ${indexPath} (Parent) and ${contentPath} (Child)`);
        } else {
          // Standard Single-Tab Mode
          const injectedHtml = injectScriptsIntoHtml(html, {
            mode: finalMode,
            keepAnalytics,
            isChild: false
          });
          zip.file(indexPath, injectedHtml);
        }
      }

      // Load vendors from our public/vendor and add to ZIP under contentDir/lib/
      const vendors = await loadVendors();
      const libBase = joinPath(contentDir, 'lib/');
      zip.file(joinPath(libBase, 'xapiwrapper.min.js'), vendors.wrapper);
      zip.file(joinPath(libBase, 'xAPI.js'), vendors.glue);

      setStatus('Packaging ZIP...');
      const outBlob = await zip.generateAsync({ type: 'blob' });
      const baseName = file.name.replace(/\.zip$/i, '');
      const prefix = shouldOpenInNewTab() ? 'scorable_newTab_' : 'scorable_';
      const outName = `${prefix}${baseName}.zip`;

      const url = URL.createObjectURL(outBlob);
      downloadLink.href = url;
      downloadLink.download = outName;
      downloadLink.style.display = 'inline-block';
      setStatus('Done. Click "Download ZIP".');
      log(`Generated output: ${outName}`);
    } catch (e) {
      console.error(e);
      setStatus('Integration failed. See log.');
      log(`Error: ${e && e.message ? e.message : String(e)}`);
    }
  });
})();
