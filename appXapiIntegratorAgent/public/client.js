'use strict';

(function() {
  const zipInput = document.getElementById('zipInput');
  const integrateBtn = document.getElementById('integrateBtn');
  const downloadLink = document.getElementById('downloadLink');
  const statusContainer = document.getElementById('statusContainer');
  const statusBox = document.getElementById('statusBox');
  const statusText = document.getElementById('statusText');
  const progressBar = document.getElementById('progressBar');
  const progressMsg = document.getElementById('progressMsg');
  const logEl = document.getElementById('log');
  const dropZone = document.getElementById('dropZone');
  const fileName = document.getElementById('fileName');
  const timelineSamplesList = document.getElementById('timelineSamplesList');
  const timelineSamplesStatus = document.getElementById('timelineSamplesStatus');
  // Quiz mode temporarily disabled (Timeline is the unified mode).
  // Keep elements optional for backwards compatibility with older HTML.
  const quizSamplesList = document.getElementById('quizSamplesList');
  const quizSamplesStatus = document.getElementById('quizSamplesStatus');

  // Base path awareness so the app works both at domain root and under a subfolder.
  // We also guard against the case where the page is served as
  //   /lookangejss/appXapiIntegratorAgent/index.html
  // or through the static public directory:
  //   /lookangejss/appXapiIntegratorAgent/public/
  // so that API calls still go to:
  //   /lookangejss/appXapiIntegratorAgent/api/...
  (function fixAppBase() {
    const rawPath = window.location.pathname || '/';
    // If the last segment looks like a file (has an extension), strip it.
    const withoutFile = rawPath.replace(/\/[^^/]*\.[^/]*$/, '/');
    // Remove a trailing slash (except when the path is just '/')
    const cleaned = withoutFile === '/' ? '/' : withoutFile.replace(/\/$/, '');
    const withoutPublic = cleaned.replace(/\/public$/i, '');
    window.__XAPI_APP_BASE__ = withoutPublic === '/' ? '' : withoutPublic;
  })();

  const APP_BASE = window.__XAPI_APP_BASE__ || '';
  const apiUrl = (path) => `${APP_BASE}${path}`;
  const freshUrl = (url) => {
    try {
      const u = new URL(url, window.location.href);
      u.searchParams.set('_ts', String(Date.now()));
      return u.toString();
    } catch {
      const sep = String(url).includes('?') ? '&' : '?';
      return `${url}${sep}_ts=${Date.now()}`;
    }
  };

  let selectedFile = null;
  let modelLoadSeq = 0;

  function log(msg) {
    console.log('[integrator]', msg);
    if (logEl) {
      logEl.textContent += (logEl.textContent ? '\n' : '') + msg;
      logEl.scrollTop = logEl.scrollHeight;
    }
  }

  function setStatus(msg, type = 'info') {
    statusContainer.style.display = 'block';
    statusBox.className = 'status-box ' + type;
    statusText.innerHTML = msg;
  }

  function showProgress(show = true) {
    progressBar.style.display = show ? 'block' : 'none';
  }

  function setProgress(msg) {
    progressMsg.textContent = msg;
  }

  async function triggerZipDownload(anchorEl) {
    if (!anchorEl) return;
    const href = anchorEl.getAttribute('href');
    if (!href || href === '#') return;

    const downloadUrl = freshUrl(href);
    anchorEl.href = downloadUrl;

    const originalLabel = anchorEl.textContent;
    anchorEl.textContent = 'Preparing ZIP...';

    try {
      const response = await fetch(downloadUrl, {
        method: 'GET',
        cache: 'no-store',
        credentials: 'same-origin'
      });
      if (!response.ok) {
        throw new Error(`Download failed with status ${response.status}`);
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const tempLink = document.createElement('a');
      tempLink.href = blobUrl;
      tempLink.download = anchorEl.download || 'download.zip';
      tempLink.style.display = 'none';
      document.body.appendChild(tempLink);
      tempLink.click();
      tempLink.remove();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
      setStatus('Success! Download started.', 'success');
    } catch (error) {
      log(`Download helper fallback: ${error.message}`);
      window.location.href = downloadUrl;
    } finally {
      anchorEl.textContent = originalLabel;
    }
  }

  if (downloadLink) {
    downloadLink.addEventListener('click', async (e) => {
      const href = downloadLink.getAttribute('href');
      if (!href || href === '#') return;
      e.preventDefault();
      await triggerZipDownload(downloadLink);
    });
  }

  function formatBytes(bytes) {
    if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB'];
    const idx = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
    const value = bytes / Math.pow(1024, idx);
    return `${value.toFixed(value >= 10 || idx === 0 ? 0 : 1)} ${units[idx]}`;
  }

  function renderTimelineSamples(files) {
    if (!timelineSamplesList) return;
    timelineSamplesList.innerHTML = '';

    if (!Array.isArray(files) || files.length === 0) {
      timelineSamplesList.innerHTML = '<li class="muted">No sample files found.</li>';
      return;
    }

    files.forEach(file => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = apiUrl(`/api/samples/timeline/${encodeURIComponent(file.name)}`);
      link.textContent = file.name;
      link.download = file.name;
      link.style.textDecoration = 'none';
      link.style.fontWeight = '600';

      const meta = document.createElement('span');
      const date = file.modifiedAt ? new Date(file.modifiedAt) : null;
      const dateText = date ? date.toLocaleString() : 'unknown date';
      const sizeText = formatBytes(file.size || 0);
      meta.textContent = ` — ${dateText} • ${sizeText}`;
      meta.className = 'muted';

      li.appendChild(link);
      li.appendChild(meta);
      timelineSamplesList.appendChild(li);
    });
  }

  function renderQuizSamples(files) {
    if (!quizSamplesList) return;
    quizSamplesList.innerHTML = '';

    if (!Array.isArray(files) || files.length === 0) {
      quizSamplesList.innerHTML = '<li class="muted">No sample files found.</li>';
      return;
    }

    files.forEach(file => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = apiUrl(`/api/samples/quiz/${encodeURIComponent(file.name)}`);
      link.textContent = file.name;
      link.download = file.name;
      link.style.textDecoration = 'none';
      link.style.fontWeight = '600';

      const meta = document.createElement('span');
      const date = file.modifiedAt ? new Date(file.modifiedAt) : null;
      const dateText = date ? date.toLocaleString() : 'unknown date';
      const sizeText = formatBytes(file.size || 0);
      meta.textContent = ` — ${dateText} • ${sizeText}`;
      meta.className = 'muted';

      li.appendChild(link);
      li.appendChild(meta);
      quizSamplesList.appendChild(li);
    });
  }

  async function loadTimelineSamples() {
    if (!timelineSamplesList) return;
    try {
      if (timelineSamplesStatus) timelineSamplesStatus.textContent = 'Loading...';
      const res = await fetch(apiUrl('/api/samples/timeline'));
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data?.message || 'Unable to load samples');
      }
      renderTimelineSamples(data.files || []);
      if (timelineSamplesStatus) timelineSamplesStatus.textContent = `${(data.files || []).length} file(s)`;
    } catch (err) {
      if (timelineSamplesStatus) timelineSamplesStatus.textContent = 'Unavailable';
      if (timelineSamplesList) {
        timelineSamplesList.innerHTML = `<li class="muted">${err.message}</li>`;
      }
    }
  }

  async function loadQuizSamples() {
    if (!quizSamplesList) return;
    try {
      if (quizSamplesStatus) quizSamplesStatus.textContent = 'Loading...';
      const res = await fetch(apiUrl('/api/samples/quiz'));
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data?.message || 'Unable to load samples');
      }
      renderQuizSamples(data.files || []);
      if (quizSamplesStatus) quizSamplesStatus.textContent = `${(data.files || []).length} file(s)`;
    } catch (err) {
      if (quizSamplesStatus) quizSamplesStatus.textContent = 'Unavailable';
      if (quizSamplesList) {
        quizSamplesList.innerHTML = `<li class="muted">${err.message}</li>`;
      }
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

  function shouldEnableAI() {
    const checkbox = document.getElementById('enableAi');
    return checkbox ? checkbox.checked : true;
  }

  function getCustomInstructions() {
    const textarea = document.getElementById('customInstructions');
    return (textarea && textarea.value.trim()) || '';
  }

  function getSelectedAIProvider() {
    const sel = document.getElementById('aiProvider');
    return (sel && sel.value) ? sel.value : 'openai';
  }

  function getSelectedAIModel() {
    const sel = document.getElementById('aiModel');
    return (sel && sel.value) ? sel.value : '';
  }

  function getOpenAIApiKey() {
    const input = document.getElementById('openaiApiKey');
    return (input && input.value.trim()) ? input.value.trim() : '';
  }

  function getGeminiApiKey() {
    const input = document.getElementById('geminiApiKey');
    return (input && input.value.trim()) ? input.value.trim() : '';
  }

  function getClaudeApiKey() {
    const input = document.getElementById('claudeApiKey');
    return (input && input.value.trim()) ? input.value.trim() : '';
  }

  function updateKeyStatus(id, hasServerKey, label, restrictionNote = '') {
    const el = document.getElementById(id);
    if (!el) return;
    if (hasServerKey) {
      el.textContent = `${label} key configured on server (•••••)`;
      el.classList.remove('warning');
      el.classList.add('success');
    } else {
      el.textContent = restrictionNote
        ? `${label} key restricted (${restrictionNote})`
        : `${label} key not configured on server`;
      el.classList.remove('success');
      el.classList.add('warning');
    }
  }

  function updateKeyPlaceholders(hasOpenAI, hasGemini, restrictionNote = '') {
    const openaiInput = document.getElementById('openaiApiKey');
    const geminiInput = document.getElementById('geminiApiKey');
    const claudeInput = document.getElementById('claudeApiKey');
    const suffix = restrictionNote ? ` (${restrictionNote})` : '';

    if (openaiInput) {
      openaiInput.placeholder = hasOpenAI
        ? 'Optional: override server OpenAI key'
        : `Paste your OpenAI API key (required if no server key${suffix})`;
    }
    if (geminiInput) {
      geminiInput.placeholder = hasGemini
        ? 'Optional: override server Gemini key'
        : `Paste your Gemini API key (required if no server key${suffix})`;
    }
    if (claudeInput) {
      claudeInput.placeholder = 'Paste your Claude API key (optional)';
    }
  }

  function updateApiKeyVisibility(provider) {
    const rows = document.querySelectorAll('.api-key-row');
    if (!rows.length) return;
    rows.forEach(row => {
      const rowProvider = row.getAttribute('data-provider');
      row.style.display = (rowProvider === provider) ? 'grid' : 'none';
    });
  }

  async function loadAiStatus() {
    try {
      const r = await fetch(apiUrl('/api/status'));
      const data = await r.json();
      if (!r.ok) throw new Error(data?.message || 'Status unavailable');

      const hasOpenAI = !!data?.features?.openaiAgent;
      const hasGemini = !!data?.features?.aiAgent;
      const serverKeyAllowed = data?.access?.serverKeyAllowed !== false;
      const host = data?.access?.requestHost || '';
      const moeVerified = !!data?.access?.moeVerified;
      const email = data?.access?.email || '';
      const restrictionNote = serverKeyAllowed ? '' : (host ? `host ${host}` : 'domain restricted');

      updateKeyStatus('openaiKeyStatus', hasOpenAI, 'OpenAI', restrictionNote);
      updateKeyStatus('geminiKeyStatus', hasGemini, 'Gemini', restrictionNote);

      const claudeStatus = document.getElementById('claudeKeyStatus');
      if (claudeStatus) {
        claudeStatus.textContent = 'Claude provider not enabled (key optional)';
        claudeStatus.classList.remove('success');
        claudeStatus.classList.add('muted');
      }

      updateKeyPlaceholders(hasOpenAI, hasGemini, restrictionNote);
      updateMoeAuthStatus({ moeVerified, email, serverKeyAllowed, host });
    } catch (e) {
      updateKeyStatus('openaiKeyStatus', false, 'OpenAI');
      updateKeyStatus('geminiKeyStatus', false, 'Gemini');
      updateKeyPlaceholders(false, false);
      updateMoeAuthStatus({ moeVerified: false, email: '', serverKeyAllowed: false, host: '' });
    }
  }

  function updateMoeAuthStatus({ moeVerified, email, serverKeyAllowed, host }) {
    const statusEl = document.getElementById('moeAuthStatus');
    const logoutBtn = document.getElementById('moeLogoutBtn');
    if (!statusEl) return;
    if (moeVerified) {
      statusEl.textContent = `Signed in as ${email}`;
      statusEl.classList.remove('warning');
      statusEl.classList.add('success');
      if (logoutBtn) logoutBtn.style.display = 'inline-block';
    } else {
      const reason = serverKeyAllowed ? 'Not signed in' : (host ? `Host ${host} restricted` : 'Domain restricted');
      statusEl.textContent = `Not signed in (${reason})`;
      statusEl.classList.remove('success');
      statusEl.classList.add('warning');
      if (logoutBtn) logoutBtn.style.display = 'none';
    }
  }

  function renderSignInUnavailable(signInContainer, reason) {
    signInContainer.innerHTML = `<span class="muted">Sign-in unavailable (${reason})</span>`;
  }

  async function initMoeSignIn(attempt = 0) {
    const signInContainer = document.getElementById('moeSignInButton');
    const logoutBtn = document.getElementById('moeLogoutBtn');
    if (!signInContainer) return;

    try {
      const statusRes = await fetch(apiUrl('/api/status'));
      const statusData = await statusRes.json();
      const clientId = statusData?.auth?.googleClientId;
      if (!clientId) {
        renderSignInUnavailable(signInContainer, 'missing Google client ID');
        log('⚠️ MOE sign-in unavailable: GOOGLE_OAUTH_CLIENT_ID not configured on server.');
        return;
      }
      if (!window.google || !window.google.accounts || !window.google.accounts.id) {
        if (attempt < 5) {
          setTimeout(() => initMoeSignIn(attempt + 1), 500);
          return;
        }
        renderSignInUnavailable(signInContainer, 'Google sign-in script not loaded');
        log('⚠️ MOE sign-in unavailable: Google Identity Services script not loaded.');
        return;
      }

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response) => {
          try {
            const res = await fetch(apiUrl('/api/auth/google'), {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ credential: response.credential })
            });
            const data = await res.json();
            if (!res.ok) {
              throw new Error(data?.message || 'Sign-in failed');
            }
            log(`✅ MOE sign-in verified for ${data.email}`);
            await loadAiStatus();
          } catch (err) {
            log(`⚠️ MOE sign-in failed: ${err.message}`);
            await loadAiStatus();
          }
        }
      });

      window.google.accounts.id.renderButton(signInContainer, {
        theme: 'outline',
        size: 'medium',
        text: 'signin_with',
        shape: 'pill'
      });

      if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
          try {
            await fetch(apiUrl('/api/auth/logout'), { method: 'POST' });
            log('ℹ️ Signed out of MOE verification');
            await loadAiStatus();
          } catch (err) {
            log(`⚠️ Sign out failed: ${err.message}`);
          }
        });
      }
    } catch (err) {
      signInContainer.innerHTML = '<span class="muted">Sign-in unavailable</span>';
    }
  }

  async function loadGeminiModels(loadId) {
    const sel = document.getElementById('aiModel');
    if (!sel) return;
    if (loadId !== modelLoadSeq) return;

    try {
      const r = await fetch(apiUrl('/api/ai-models'));
      const data = await r.json();

      if (loadId !== modelLoadSeq) return;
      if (!r.ok || !data.ok) {
        sel.innerHTML = '<option value="">(Models unavailable)</option>';
        return;
      }

      // Only models that can generateContent
      const models = (data.models || [])
        .filter(m => Array.isArray(m.supportedGenerationMethods) && m.supportedGenerationMethods.includes('generateContent'));

      // Prefer showing only the specific models you care about.
      // Note: We only show models that actually exist in /api/ai-models for your key.
      const preferredAllowList = [
        // Gemini 2 Flash
        'models/gemini-2.0-flash',
        // Gemini 2.5 Flash
        'models/gemini-2.5-flash',
        // Gemini 3 Flash / Pro (if/when enabled on your account)
        'models/gemini-3-flash',
        'models/gemini-3-flash-preview',
        'models/gemini-3-pro',
        'models/gemini-3-pro-preview',
        // Gemini 3.1 Pro preview (new default)
        'models/gemini-3.1-pro-preview'
      ];

      const filteredPreferred = models.filter(m => preferredAllowList.includes(m.name));
      const finalModels = filteredPreferred.length > 0 ? filteredPreferred : models;

      // Prefer latest models first (newest → oldest)
      const preferredOrder = [
        'models/gemini-3.1-pro-preview',
        'models/gemini-3-pro-preview',
        'models/gemini-3-pro',
        'models/gemini-3-flash-preview',
        'models/gemini-3-flash',
        'models/gemini-2.5-pro',
        'models/gemini-2.5-flash',
        'models/gemini-2.0-flash',
        'models/gemini-2.0-flash-lite',
      ];

      finalModels.sort((a, b) => {
        const ai = preferredOrder.indexOf(a.name);
        const bi = preferredOrder.indexOf(b.name);
        if (ai !== -1 || bi !== -1) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
        return String(a.name).localeCompare(String(b.name));
      });

      const toSdkId = (apiName) => String(apiName || '').replace(/^models\//, '');

      if (loadId !== modelLoadSeq) return;
      sel.innerHTML = '';
      finalModels.forEach(m => {
        const opt = document.createElement('option');
        opt.value = toSdkId(m.name);
        opt.textContent = `${m.displayName || m.name} (${opt.value})`;
        sel.appendChild(opt);
      });

      // Preselect top option (latest model)
      if (sel.options.length > 0) {
        sel.selectedIndex = 0;
      }
    } catch (e) {
      if (loadId !== modelLoadSeq) return;
      sel.innerHTML = '<option value="">(Models unavailable)</option>';
    }
  }

  async function loadOpenAIModels(loadId) {
    const sel = document.getElementById('aiModel');
    if (!sel) return;
    if (loadId !== modelLoadSeq) return;

    try {
      const r = await fetch(apiUrl('/api/openai-models'));
      const data = await r.json();

      if (loadId !== modelLoadSeq) return;
      if (!r.ok || !data.ok) {
        sel.innerHTML = '<option value="">(Models unavailable)</option>';
        return;
      }

      const models = Array.isArray(data.models) ? data.models : [];
      // Backend returns a curated list of chat-capable models.
      const finalModels = models;
      if (loadId !== modelLoadSeq) return;
      sel.innerHTML = '';
      finalModels.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = m.label || m.id;
        sel.appendChild(opt);
      });

      // Default to the latest chat model if available
      const defaultId = 'gpt-5.3-chat-latest';
      const match = Array.from(sel.options).find(o => o.value === defaultId);
      if (match) sel.value = defaultId;
    } catch (e) {
      if (loadId !== modelLoadSeq) return;
      sel.innerHTML = '<option value="">(Models unavailable)</option>';
    }
  }

  async function loadModelsForProvider(provider) {
    const sel = document.getElementById('aiModel');
    if (!sel) return;
    const loadId = ++modelLoadSeq;
    sel.innerHTML = '<option value="">Loading models...</option>';
    if (provider === 'openai') {
      await loadOpenAIModels(loadId);
    } else if (provider === 'claude') {
      if (loadId !== modelLoadSeq) return;
      const claudeModels = [
        { id: 'claude-opus-4-6', label: 'Opus 4.6' },
        { id: 'claude-opus-4.5', label: 'Opus 4.5' },
        { id: 'claude-sonnet-4.5', label: 'Sonnet 4.5' },
        { id: 'claude-haiku-4.5', label: 'Haiku 4.5' }
      ];
      sel.innerHTML = '';
      claudeModels.forEach(model => {
        const opt = document.createElement('option');
        opt.value = model.id;
        opt.textContent = `${model.label} (${model.id})`;
        sel.appendChild(opt);
      });
      sel.value = claudeModels[0]?.id || '';
    } else {
      await loadGeminiModels(loadId);
    }
  }

  // Drag and drop
  if (dropZone) {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
      }, false);
    });

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

    dropZone.addEventListener('drop', async (e) => {
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFile(files[0]);
      }
    }, false);

    dropZone.addEventListener('click', () => {
      zipInput.click();
    });
  }

  if (zipInput) {
    zipInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        handleFile(file);
      }
    });
  }

  function handleFile(file) {
    if (file && (file.type === 'application/zip' || file.name.endsWith('.zip'))) {
      selectedFile = file;
      if (fileName) {
        fileName.textContent = `📦 ${file.name}`;
      }
      log(`File selected: ${file.name}`);
      integrateBtn.disabled = false;
      integrateBtn.textContent = '🔄 Integrate';
      
      // Analyze file
      analyzeFile(file);
    } else {
      setStatus('Please select a ZIP file.', 'error');
    }
  }

  async function analyzeFile(file) {
    log('📊 Analyzing content...');
    setProgress(true);
    setProgress('Analyzing...');
    
    try {
      // We'll do analysis on the server side
      log('✓ File ready for processing');
    } catch (error) {
      log('⚠️ Analysis error: ' + error.message);
    }
  }

  if (integrateBtn) {
    integrateBtn.addEventListener('click', async () => {
      if (!selectedFile) {
        setStatus('Please select a ZIP file first.', 'error');
        return;
      }

      await integrate();
    });
  }

  async function integrate() {
    const mode = getSelectedMode();
    const keepAnalytics = shouldKeepAnalytics();
    const customInstructions = getCustomInstructions();
    const enableAi = shouldEnableAI();
    const aiProvider = getSelectedAIProvider();
    const aiModel = getSelectedAIModel();
    const openaiApiKey = getOpenAIApiKey();
    const geminiApiKey = getGeminiApiKey();
    const claudeApiKey = getClaudeApiKey();

    log(`\n🚀 Starting integration...`);
    log(`Mode: ${mode.toUpperCase()}`);
    log(`Keep Analytics: ${keepAnalytics}`);
    log(`AI Augmentation: ${enableAi}`);
    log(`AI Provider: ${aiProvider}`);
    if (aiModel) log(`AI Model: ${aiModel}`);
    if (customInstructions) {
      log(`📋 Custom Instructions: ${customInstructions.substring(0, 60)}${customInstructions.length > 60 ? '...' : ''}`);
    }

    integrateBtn.disabled = true;
    integrateBtn.textContent = '⏳ Processing...';
    setStatus('Processing your ZIP file...', 'info');
    showProgress(true);
    setProgress('Uploading and analyzing...');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('mode', mode);
      formData.append('keepAnalytics', keepAnalytics);
      formData.append('enableAi', enableAi);
      formData.append('aiProvider', aiProvider);
      if (aiModel) formData.append('aiModel', aiModel);
      if (customInstructions) {
        formData.append('customInstructions', customInstructions);
      }
      if (openaiApiKey) formData.append('openaiApiKey', openaiApiKey);
      if (geminiApiKey) formData.append('geminiApiKey', geminiApiKey);
      if (claudeApiKey) formData.append('claudeApiKey', claudeApiKey);

      const response = await fetch(apiUrl('/api/upload'), {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Integration failed');
      }

      // Log all steps
      if (result.log && Array.isArray(result.log)) {
        result.log.forEach(msg => log(msg));
      }

      // Show analysis results
      if (result.analysis) {
        const analysis = result.analysis;
        log(`\n📊 Analysis Results:`);
        log(`Recommended Mode: ${analysis.recommendedMode.toUpperCase()} (${analysis.confidence}% confidence)`);
        if (analysis.reasons.length > 0) {
          analysis.reasons.forEach(reason => log(`  • ${reason}`));
        }
      }

      // Show AI thinking if available
      if (result.aiThinking && result.aiThinking.chainOfThought) {
        log(`\n🤖 AI Agent Thinking Process:`);
        log(`\n--- CHAIN OF THOUGHT ---`);
        log(result.aiThinking.chainOfThought);
        
        if (result.aiThinking.trackingStrategy) {
          log(`\n--- TRACKING STRATEGY ---`);
          log(result.aiThinking.trackingStrategy);
        }
        
        if (result.aiThinking.codeApproach) {
          log(`\n--- CODE APPROACH ---`);
          log(result.aiThinking.codeApproach);
        }
        
        if (result.aiThinking.codeBreakdown) {
          log(`\n--- CODE BREAKDOWN ---`);
          log(result.aiThinking.codeBreakdown);
        }
        
        if (result.aiThinking.explanation) {
          log(`\n--- DETAILED EXPLANATION ---`);
          log(result.aiThinking.explanation);
        }
      }

      // Show AI meta status/timing if available
      if (result.aiMeta) {
        log(`\n🤖 AI Agent Status:`);
        log(`  • Requested: ${result.aiMeta.requested}`);
        log(`  • Enabled: ${result.aiMeta.enabled}`);
        log(`  • Status: ${result.aiMeta.status}`);
        if (result.aiMeta.model) {
          log(`  • Model: ${result.aiMeta.model}`);
        }
        if (result.aiMeta.startedAt) {
          log(`  • Started: ${result.aiMeta.startedAt}`);
        }
        if (result.aiMeta.finishedAt) {
          log(`  • Finished: ${result.aiMeta.finishedAt}`);
        }
        if (typeof result.aiMeta.durationMs === 'number') {
          log(`  • Duration: ${result.aiMeta.durationMs}ms`);
        }
        if (result.aiMeta.error) {
          log(`  • Error: ${result.aiMeta.error}`);
        }
      }

      // Success
      log(`\n✅ Integration complete!`);
      // Prefix download URL with APP_BASE if it's a root-relative path
      if (result.downloadUrl && typeof result.downloadUrl === 'string') {
        const rawDownloadUrl = result.downloadUrl.startsWith('/')
          ? `${APP_BASE}${result.downloadUrl}`
          : result.downloadUrl;
        downloadLink.href = freshUrl(rawDownloadUrl);
      } else {
        downloadLink.href = '#';
      }
      downloadLink.download = result.filename;
      downloadLink.style.display = 'inline-block';

      setStatus(`✅ Success! Your file is ready to download. Check the log to see the AI's thinking process.`, 'success');
      showProgress(false);

      integrateBtn.textContent = '🔄 Integrate Another';
      integrateBtn.disabled = false;

    } catch (error) {
      console.error('Integration error:', error);
      log(`❌ Error: ${error.message}`);
      setStatus(`❌ Error: ${error.message}`, 'error');
      showProgress(false);

      integrateBtn.textContent = '🔄 Try Again';
      integrateBtn.disabled = false;
    }
  }

  // Initialize
  log('✓ xAPI Integrator loaded');
  setStatus('Ready! Upload a ZIP file to begin.', 'info');
  const providerSel = document.getElementById('aiProvider');
  if (providerSel) {
    providerSel.addEventListener('change', () => {
      const provider = getSelectedAIProvider();
      loadModelsForProvider(provider);
      updateApiKeyVisibility(provider);
    });
  }
  const initialProvider = getSelectedAIProvider();
  loadModelsForProvider(initialProvider);
  updateApiKeyVisibility(initialProvider);
  loadAiStatus();
  initMoeSignIn();
  loadTimelineSamples();
  // Quiz mode UI is disabled; sample list may not exist.
  // Keep the API endpoint available, but don't fetch by default.
})();
