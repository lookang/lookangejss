'use strict';

// Static xAPI Integrator - Pure HTML/CSS/JS
// Sends xAPI statements via fetch to an LRS with Basic Auth.
// Requires: LRS with CORS enabled and HTTPS.

// DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const endpointEl = document.getElementById('endpoint');
  const usernameEl = document.getElementById('username');
  const passwordEl = document.getElementById('password');
  const rememberEl = document.getElementById('rememberConfig');

  const saveConfigBtn = document.getElementById('saveConfigBtn');
  const testConnectionBtn = document.getElementById('testConnectionBtn');
  const clearConfigBtn = document.getElementById('clearConfigBtn');
  const connectionStatusEl = document.getElementById('connectionStatus');

  const actorNameEl = document.getElementById('actorName');
  const actorEmailEl = document.getElementById('actorEmail');
  const verbIdEl = document.getElementById('verbId');
  const verbDisplayEl = document.getElementById('verbDisplay');
  const objectIdEl = document.getElementById('objectId');
  const objectNameEl = document.getElementById('objectName');
  const resultJsonEl = document.getElementById('resultJson');
  const contextJsonEl = document.getElementById('contextJson');

  const prefillBtn = document.getElementById('prefillBtn');
  const sendStatementBtn = document.getElementById('sendStatementBtn');
  const requestPreviewEl = document.getElementById('requestPreview');
  const sendStatusEl = document.getElementById('sendStatus');

  // Constants
  const STORAGE_KEY = 'xapi.static.config';
  const XAPI_VERSION = '1.0.3';

  // Utils
  const normalizeEndpoint = (ep) => {
    if (!ep) return '';
    return ep.endsWith('/') ? ep : ep + '/';
  };

  const joinXapiPath = (ep, path) => {
    // Ensure we join relative to the xAPI path: ./path keeps current directory
    try {
      return new URL(`./${path}`, normalizeEndpoint(ep)).toString();
    } catch {
      return normalizeEndpoint(ep) + path;
    }
  };

  const basicAuthHeader = (user, pass) => {
    // Note: btoa expects ASCII; xAPI keys/secrets are usually ASCII.
    return 'Basic ' + btoa(`${user}:${pass}`);
  };

  const setStatus = (el, msg, kind = 'info') => {
    if (!el) return;
    const prefix = kind === 'error' ? 'ERROR: ' : kind === 'success' ? 'SUCCESS: ' : '';
    el.textContent = `${prefix}${msg}`;
  };

  const pretty = (obj) => {
    try { return JSON.stringify(obj, null, 2); } catch { return String(obj); }
  };

  const parseOptionalJSON = (text, label) => {
    const trimmed = (text || '').trim();
    if (!trimmed) return null;
    try {
      return JSON.parse(trimmed);
    } catch (e) {
      throw new Error(`${label} contains invalid JSON. ${e.message}`);
    }
  };

  const loadConfig = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const cfg = JSON.parse(raw);
      endpointEl.value = cfg.endpoint || '';
      usernameEl.value = cfg.username || '';
      // Do not auto-fill password for safety; leave it blank unless present and user opted to remember
      if (cfg.password) passwordEl.value = cfg.password;
      rememberEl.checked = !!cfg.remember;
      return cfg;
    } catch {
      return null;
    }
  };

  const saveConfig = (opts = {}) => {
    const cfg = {
      endpoint: normalizeEndpoint(endpointEl.value.trim()),
      username: usernameEl.value.trim(),
      password: passwordEl.value,
      remember: !!rememberEl.checked,
      ...opts
    };
    if (cfg.remember) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
    // If ADL.XAPIWrapper exists, sync its config too
    try {
      if (window.ADL && ADL.XAPIWrapper) {
        ADL.XAPIWrapper.changeConfig({
          endpoint: cfg.endpoint,
          user: cfg.username,
          password: cfg.password
        });
      }
    } catch { /* ignore */ }
    return cfg;
  };

  const clearSaved = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  const buildStatement = () => {
    const actorName = actorNameEl.value.trim();
    const actorEmail = actorEmailEl.value.trim();
    const verbId = verbIdEl.value.trim();
    const verbDisplay = verbDisplayEl.value.trim();
    const objectId = objectIdEl.value.trim();
    const objectName = objectNameEl.value.trim();

    if (!actorEmail) throw new Error('Actor Email is required.');
    if (!verbId) throw new Error('Verb ID is required.');
    if (!objectId) throw new Error('Object ID is required.');

    const actor = {
      objectType: 'Agent',
      name: actorName || undefined,
      mbox: actorEmail.startsWith('mailto:') ? actorEmail : `mailto:${actorEmail}`
    };

    const verb = {
      id: verbId,
      display: verbDisplay ? { 'en-US': verbDisplay } : undefined
    };

    const object = {
      id: objectId,
      definition: objectName ? { name: { 'en-US': objectName } } : undefined
    };

    const stmt = {
      actor,
      verb,
      object,
      timestamp: new Date().toISOString()
    };

    const result = parseOptionalJSON(resultJsonEl.value, 'Result JSON');
    if (result) stmt.result = result;

    const context = parseOptionalJSON(contextJsonEl.value, 'Context JSON');
    if (context) stmt.context = context;

    return stmt;
  };

  const previewRequest = (method, url, headers, body) => {
    const headersSafe = { ...headers };
    if (headersSafe.Authorization) headersSafe.Authorization = '<redacted Basic Auth>';
    const content = [
      `${method} ${url}`,
      'Headers:',
      pretty(headersSafe),
      body ? `\nBody:\n${typeof body === 'string' ? body : pretty(body)}` : ''
    ].join('\n');
    requestPreviewEl.textContent = content;
  };

  // Event handlers
  saveConfigBtn.addEventListener('click', () => {
    const cfg = saveConfig();
    setStatus(connectionStatusEl, `Configuration saved${cfg.remember ? ' (persisted to localStorage)' : ' (not persisted)'}.`, 'success');
  });

  clearConfigBtn.addEventListener('click', () => {
    clearSaved();
    setStatus(connectionStatusEl, 'Saved configuration cleared from localStorage.', 'success');
  });

  testConnectionBtn.addEventListener('click', async () => {
    sendStatusEl.textContent = '';
    const cfg = saveConfig();
    const aboutUrl = joinXapiPath(cfg.endpoint, 'about');
    const headers = {
      'Authorization': basicAuthHeader(cfg.username, cfg.password),
      'X-Experience-API-Version': XAPI_VERSION
    };
    previewRequest('GET', aboutUrl, headers);

    testConnectionBtn.disabled = true;
    setStatus(connectionStatusEl, 'Testing connection...');
    try {
      const res = await fetch(aboutUrl, {
        method: 'GET',
        mode: 'cors',
        headers
      });
      const text = await res.text();
      let json = null;
      try { json = JSON.parse(text); } catch { /* not JSON */ }
      const bodyOut = json ? pretty(json) : text;
      setStatus(connectionStatusEl, `HTTP ${res.status} ${res.statusText}\n${bodyOut}`, res.ok ? 'success' : 'error');
    } catch (e) {
      setStatus(connectionStatusEl, `Network/CORS error: ${e.message}. Check LRS CORS settings.`, 'error');
    } finally {
      testConnectionBtn.disabled = false;
    }
  });

  prefillBtn.addEventListener('click', () => {
    actorNameEl.value = 'Static Tester';
    actorEmailEl.value = 'tester@example.com';
    verbIdEl.value = 'http://adlnet.gov/expapi/verbs/experienced';
    verbDisplayEl.value = 'experienced';
    objectIdEl.value = 'https://example.com/activity/static-app';
    objectNameEl.value = 'Static xAPI App';
    resultJsonEl.value = '{"success": true, "completion": true, "score": {"scaled": 0.95}}';
    contextJsonEl.value = '{"contextActivities": {"parent":[{"id":"https://example.com/course/abc"}]}}';
    setStatus(sendStatusEl, 'Sample values filled. Adjust as needed then Send Statement.');
  });

  sendStatementBtn.addEventListener('click', async () => {
    const cfg = saveConfig();
    const statementsUrl = joinXapiPath(cfg.endpoint, 'statements');

    let statement;
    try {
      statement = buildStatement();
    } catch (e) {
      setStatus(sendStatusEl, e.message, 'error');
      return;
    }

    const headers = {
      'Authorization': basicAuthHeader(cfg.username, cfg.password),
      'X-Experience-API-Version': XAPI_VERSION,
      'Content-Type': 'application/json'
    };

    previewRequest('POST', statementsUrl, headers, statement);

    sendStatementBtn.disabled = true;
    setStatus(sendStatusEl, 'Sending statement...');
    try {
      const res = await fetch(statementsUrl, {
        method: 'POST',
        mode: 'cors',
        headers,
        body: JSON.stringify(statement)
      });

      const text = await res.text();
      let body = null;
      try { body = JSON.parse(text); } catch { body = text; }

      if (res.ok) {
        // Many LRS return array of statement IDs on success
        setStatus(sendStatusEl, `HTTP ${res.status} ${res.statusText}\n${pretty(body)}`, 'success');
      } else {
        setStatus(sendStatusEl, `HTTP ${res.status} ${res.statusText}\n${pretty(body)}`, 'error');
      }
    } catch (e) {
      setStatus(sendStatusEl, `Network/CORS error: ${e.message}. Check LRS CORS settings.`, 'error');
    } finally {
      sendStatementBtn.disabled = false;
    }
  });

  // Initial load
  loadConfig();
});
