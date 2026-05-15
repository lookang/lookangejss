(function () {
  'use strict';

  // --- Stable Scope Identification ---
  // ALWAYS use the folder path as the unique ID for the activity scope.
  // This ensures that ALL tabs (SLS frame, tool's new tab, SLS native button)
  // use the exact same localStorage keys for config and sync data.
  var getStablePath = function () {
    try {
      var p = window.location.pathname;
      var folder = p.substring(0, p.lastIndexOf('/')) || p;
      return folder;
    } catch (e) {
      return 'default_scope';
    }
  };

  var APP_SCOPE = getStablePath();
  var CONFIG_KEY = 'xapi_config::' + APP_SCOPE;

  var XAPIUtils = {
    parameters: null,

    getParameters: function () {
      if (this.parameters) return this.parameters;

      try {
        var urlParams = new URLSearchParams(window.location.search);
        var endpoint = urlParams.get('endpoint');
        var auth = urlParams.get('auth');
        var agentRaw = urlParams.get('agent');
        var stateId = urlParams.get('stateId');
        var activityId = urlParams.get('activityId');

        // Check if we have core parameters in URL
        if (endpoint && auth && endpoint !== 'null' && auth !== 'null') {
          var config = {
            endpoint: endpoint,
            auth: auth,
            agentRaw: agentRaw,
            stateId: stateId,
            activityId: activityId,
            t: Date.now()
          };
          // Persist to localStorage for SLS native "New Tab" support
          try {
            localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
            console.log('[xAPI] Configuration persisted for scope:', APP_SCOPE);
          } catch (e) { }
        } else {
          // Fallback to localStorage if URL params are missing
          try {
            var cached = localStorage.getItem(CONFIG_KEY);
            if (cached) {
              var config = JSON.parse(cached);
              endpoint = endpoint || config.endpoint;
              auth = auth || config.auth;
              agentRaw = agentRaw || config.agentRaw;
              stateId = stateId || config.stateId;
              activityId = activityId || config.activityId;
              console.log('[xAPI] Configuration recovered for scope:', APP_SCOPE);
            }
          } catch (e) { }
        }

        // --- Resilience: Synthesize missing activityId or agent if absolutely necessary ---
        // If we still lack activityId but have endpoint, use the folder path as a fallback IRI
        if (!activityId && endpoint) {
          activityId = 'http://sls.native.fallback/' + APP_SCOPE.replace(/^\//, '');
          console.warn('[xAPI] Missing activityId. Using fallback:', activityId);
        }

        // Configure ADL.XAPIWrapper if we have valid endpoint and auth
        if (endpoint && auth && endpoint !== 'null' && auth !== 'null' && typeof window.ADL !== 'undefined' && window.ADL.XAPIWrapper) {
          var ep = endpoint;
          if (ep.charAt(ep.length - 1) !== '/') {
            ep += '/';
          }
          window.ADL.XAPIWrapper.changeConfig({
            endpoint: ep,
            auth: 'Basic ' + auth
          });
        }

        // Parse agent
        var agent = null;
        if (agentRaw && agentRaw !== 'null') {
          try {
            agent = JSON.parse(agentRaw);
          } catch (e) {
            console.warn('[xAPI] Invalid agent JSON:', e);
          }
        } else if (endpoint) {
          // Mock agent if missing but endpoint present (last resort for native new tab)
          agent = { "mbox": "mailto:student@sls.native.fallback", "name": "SLS Student (New Tab)" };
          console.warn('[xAPI] Missing agent. Using anonymous fallback.');
        }

        var params = { agent: agent, stateId: stateId || 'default_state', activityId: activityId, endpoint: endpoint, auth: auth };

        // Only cache if we actually found something useful
        if (endpoint && auth) {
          this.parameters = params;
        }
        return params;
      } catch (e) {
        console.warn('[xAPI] getParameters failed:', e);
        return null;
      }
    }
  };

  window.XAPIUtils = XAPIUtils;

  window.storeState = function (stateValue) {
    try {
      if (!window.ADL || !window.ADL.XAPIWrapper) {
        console.warn('[xAPI] ADL.XAPIWrapper not available');
        return;
      }
      try { window.__xapiLastState = stateValue; } catch (e) { }
      var params = XAPIUtils.getParameters();

      // Detailed Guard Notification
      if (!params) {
        console.warn('[xAPI] storeState: No parameters available. Tracking locally only.');
        return;
      }

      var missing = [];
      if (!params.endpoint) missing.push('endpoint');
      if (!params.auth) missing.push('auth');
      if (!params.activityId) missing.push('activityId');
      if (!params.agent) missing.push('agent');

      if (missing.length > 0) {
        console.warn('[xAPI] storeState: Cannot send to SLS server. Missing: ' + missing.join(', '));
        return;
      }

      window.ADL.XAPIWrapper.sendState(params.activityId, params.agent, params.stateId, null, stateValue);
      console.log('[xAPI] Submitted to SLS:', stateValue);

      // Also send an xAPI statement that includes score in result.score so it
      // appears in LRS statement queries (some SLS views rely on statements).
      // This is best-effort and will not throw.
      try {
        var scoreRaw = (stateValue && stateValue.score != null) ? Number(stateValue.score) : null;
        if (scoreRaw != null && !Number.isNaN(scoreRaw)) {
          var lastKey = 'xapi_last_score::' + APP_SCOPE;
          var last = null;
          try { last = localStorage.getItem(lastKey); } catch (e) {}

          // Avoid spamming identical score statements
          if (String(scoreRaw) !== String(last)) {
            try { localStorage.setItem(lastKey, String(scoreRaw)); } catch (e) {}

            var max = null;
            if (stateValue && stateValue.max != null && !Number.isNaN(Number(stateValue.max))) max = Number(stateValue.max);
            if (max == null && stateValue && stateValue.total != null && !Number.isNaN(Number(stateValue.total))) max = Number(stateValue.total);

            var scoreObj = { raw: scoreRaw, min: 0 };
            if (max != null) {
              scoreObj.max = max;
              scoreObj.scaled = max > 0 ? Math.max(0, Math.min(1, scoreRaw / max)) : 0;
            }

            var result = { score: scoreObj };
            if (stateValue && stateValue.feedback) {
              result.response = String(stateValue.feedback).substring(0, 255);
            }
            // Preserve additional payload for analytics/debugging
            if (stateValue && (stateValue.hiddenMarks || stateValue.details)) {
              result.extensions = result.extensions || {};
              if (stateValue.hiddenMarks) result.extensions['https://iwant2study.org/xapi/extensions/hiddenMarks'] = stateValue.hiddenMarks;
              if (stateValue.details) result.extensions['https://iwant2study.org/xapi/extensions/details'] = stateValue.details;
            }

            var statement = {
              actor: params.agent,
              verb: { id: 'http://adlnet.gov/expapi/verbs/scored', display: { 'en-US': 'scored' } },
              object: { id: params.activityId },
              result: result,
              timestamp: new Date().toISOString()
            };

            window.ADL.XAPIWrapper.sendStatement(statement);
            console.log('[xAPI] Score statement sent:', scoreObj);
          }
        }
      } catch (e) {
        console.warn('[xAPI] Unable to send score statement (non-fatal):', e);
      }
    } catch (err) {
      console.error('[xAPI] storeState error (handled):', err);
    }
  };

  window.getState = function () {
    try {
      if (!window.ADL || !window.ADL.XAPIWrapper) return null;
      var params = XAPIUtils.getParameters();
      if (!params || !params.activityId || !params.agent || !params.endpoint) return null;

      var result = window.ADL.XAPIWrapper.getState(params.activityId, params.agent, params.stateId);
      console.log('[xAPI] Retrieved state:', result);
      return result;
    } catch (err) {
      console.error('[xAPI] getState error (handled):', err);
      return null;
    }
  };

  window.updateStore = function () {
    try {
      var sInput = document.getElementById("score-input");
      var fInput = document.getElementById("feedback-input");
      if (sInput || fInput) {
        window.storeState({
          score: sInput ? sInput.value : 0,
          feedback: fInput ? fInput.value : ""
        });
      }
    } catch (e) { }
  };

  function ensureDebugPanel() {
    if (document.getElementById('xapi-debug-panel')) return;
    var panel = document.createElement('div');
    panel.id = 'xapi-debug-panel';
    panel.style.cssText = 'position:fixed;right:20px;bottom:80px;z-index:99999;width:320px;background:rgba(15,23,42,0.95);color:#e2e8f0;border-radius:10px;box-shadow:0 10px 25px rgba(0,0,0,0.25);font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;font-size:12px;';

    var header = document.createElement('div');
    header.style.cssText = 'padding:8px 10px;cursor:move;background:rgba(30,41,59,0.9);border-top-left-radius:10px;border-top-right-radius:10px;font-weight:600;display:flex;align-items:center;justify-content:space-between;';
    header.textContent = 'xAPI Live Feedback';

    var closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = 'background:transparent;border:none;color:#e2e8f0;font-size:16px;cursor:pointer;margin-left:8px;';
    closeBtn.onclick = function () { panel.style.display = 'none'; };
    header.appendChild(closeBtn);

    var body = document.createElement('div');
    body.id = 'xapi-debug-body';
    body.style.cssText = 'padding:10px;max-height:280px;overflow:auto;white-space:pre-wrap;line-height:1.4;';
    body.textContent = 'Waiting for xAPI events...';

    panel.appendChild(header);
    panel.appendChild(body);
    document.body.appendChild(panel);

    var pos = { x: 0, y: 0, left: 0, top: 0, dragging: false };
    header.addEventListener('mousedown', function (e) {
      pos.dragging = true;
      pos.x = e.clientX;
      pos.y = e.clientY;
      var rect = panel.getBoundingClientRect();
      pos.left = rect.left;
      pos.top = rect.top;
      document.body.style.userSelect = 'none';
    });
    document.addEventListener('mousemove', function (e) {
      if (!pos.dragging) return;
      var dx = e.clientX - pos.x;
      var dy = e.clientY - pos.y;
      panel.style.left = (pos.left + dx) + 'px';
      panel.style.top = (pos.top + dy) + 'px';
      panel.style.right = 'auto';
      panel.style.bottom = 'auto';
    });
    document.addEventListener('mouseup', function () {
      pos.dragging = false;
      document.body.style.userSelect = '';
    });
  }

  function renderDebugPanel(stateValue) {
    try {
      if (!stateValue) return;
      ensureDebugPanel();
      var body = document.getElementById('xapi-debug-body');
      if (!body) return;

      var summary = stateValue.summary || {};
      var lines = [];
      if (stateValue.feedback) {
        lines.push(stateValue.feedback);
      } else {
        lines.push('Feedback');
        lines.push('Interactive Response Assistant');
        lines.push(new Date().toLocaleString());
        lines.push('Interactions: ' + (summary.interactions || 0));
        lines.push('Elapsed Time: ' + (summary.elapsedSec || 0) + 's');
        if (stateValue.score != null) {
          lines.push('Score: ' + stateValue.score + (stateValue.max != null ? (' / ' + stateValue.max) : ''));
        }
        lines.push('Unique Explorations: ' + (summary.uniqueTargets || 0));
        lines.push('');
        lines.push('Action Log:');
      }

      if (Array.isArray(stateValue.actionLog)) {
        stateValue.actionLog.forEach(function (a) {
          lines.push('[' + a.t + 's] ' + a.type + (a.label ? (' — ' + a.label) : ''));
        });
      }

      body.textContent = lines.join('\n');
    } catch (e) {
      console.warn('[xAPI] debug panel render failed', e);
    }
  }

  // Initial parse on load
  XAPIUtils.getParameters();
  // Show panel if state is already present
  try { if (window.__xapiLastState) renderDebugPanel(window.__xapiLastState); } catch (e) {}

  // Hook into storeState for live updates
  var __origStoreState = window.storeState;
  window.storeState = function (stateValue) {
    try {
      __origStoreState(stateValue);
    } finally {
      renderDebugPanel(stateValue);
    }
  };
})();
