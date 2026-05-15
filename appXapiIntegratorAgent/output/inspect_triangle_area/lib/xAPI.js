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
  var STATE_KEY = 'xapi_last_state::' + APP_SCOPE;

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

  function cacheState(stateValue) {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify({ t: Date.now(), state: stateValue }));
    } catch (e) {}
  }

  function readCachedState() {
    try {
      var raw = localStorage.getItem(STATE_KEY);
      if (!raw) return null;
      var parsed = JSON.parse(raw);
      return parsed && parsed.state ? parsed : null;
    } catch (e) {
      return null;
    }
  }

  function preferCachedState(stateValue) {
    try {
      var cached = readCachedState();
      if (!cached || !cached.state) return stateValue;
      var cachedState = cached.state;
      if (!stateValue) return cachedState;
      if (stateValue && stateValue.reason && /pause|hidden/i.test(stateValue.reason)) return cachedState;
      if (stateValue && stateValue.feedback && /quiz pause/i.test(String(stateValue.feedback))) return cachedState;
      var cachedHistoryLen = Array.isArray(cachedState.history) ? cachedState.history.length : 0;
      var localHistoryLen = Array.isArray(stateValue && stateValue.history) ? stateValue.history.length : 0;
      if (cachedHistoryLen > localHistoryLen) return cachedState;
    } catch (e) {}
    return stateValue;
  }

  function ensureSendStateHook() {
    try {
      if (!window.ADL || !window.ADL.XAPIWrapper || !window.ADL.XAPIWrapper.sendState) return;
      if (window.__xapiSendStateHooked) return;
      var original = window.ADL.XAPIWrapper.sendState;
      window.ADL.XAPIWrapper.sendState = function (activityId, agent, stateId, registration, stateValue) {
        var preferred = preferCachedState(stateValue);
        return original.call(this, activityId, agent, stateId, registration, preferred);
      };
      window.__xapiSendStateHooked = true;
    } catch (e) {}
  }

  function shouldSendStatements(params) {
    try {
      if (!params || !params.endpoint) return false;
      if (window.__xapiForceStatements === true) return true;

      var endpointUrl = new URL(params.endpoint, window.location.href);
      var currentUrl = new URL(window.location.href);
      var isSameOrigin = endpointUrl.origin === currentUrl.origin;
      return isSameOrigin;
    } catch (e) {
      return false;
    }
  }

  window.storeState = function (stateValue) {
    try {
      if (!window.ADL || !window.ADL.XAPIWrapper) {
        console.warn('[xAPI] ADL.XAPIWrapper not available');
        return;
      }
      stateValue = preferCachedState(stateValue);
      if (stateValue && Array.isArray(stateValue.history) && stateValue.history.length) {
        stateValue.feedback = formatQuizAnalytics(stateValue.history);
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

      ensureSendStateHook();
      window.ADL.XAPIWrapper.sendState(params.activityId, params.agent, params.stateId, null, stateValue);
      console.log('[xAPI] Submitted to SLS:', stateValue);
      cacheState(stateValue);

      // Also send an xAPI statement that includes score in result.score so it
      // appears in LRS statement queries (some SLS views rely on statements).
      // This is best-effort and will not throw. We skip cross-origin endpoints
      // by default to avoid CORS preflight failures breaking new-tab launches.
      try {
        if (!shouldSendStatements(params)) {
          return;
        }
        var scoreRaw = (stateValue && stateValue.score != null) ? Number(stateValue.score) : null;
        if (scoreRaw != null && !Number.isNaN(scoreRaw)) {
          var history = stateValue && stateValue.history ? stateValue.history : null;
          var lastEvt = Array.isArray(history) && history.length ? history[history.length - 1] : null;

          var max = null;
          if (stateValue && stateValue.max != null && !Number.isNaN(Number(stateValue.max))) max = Number(stateValue.max);
          if (max == null && stateValue && stateValue.total != null && !Number.isNaN(Number(stateValue.total))) max = Number(stateValue.total);

          var scoreObj = { raw: scoreRaw, min: 0 };
          if (max != null) {
            scoreObj.max = max;
            scoreObj.scaled = max > 0 ? Math.max(0, Math.min(1, scoreRaw / max)) : 0;
          }

          var result = { score: scoreObj };
          if (stateValue && Array.isArray(stateValue.history) && stateValue.history.length) {
            // IMPORTANT: xAPI result.response should be plain text (LRS-friendly),
            // not HTML. We generate a concise attempt-by-attempt log.
            var attemptText = formatQuizAttemptLogPlain(stateValue.history);
            if (attemptText) {
              result.response = String(attemptText).substring(0, 1000);
            } else {
              // Fallback to existing feedback if any
              result.response = String(stateValue.feedback || '').substring(0, 255);
            }
          } else if (stateValue && stateValue.feedback) {
            result.response = String(stateValue.feedback).substring(0, 255);
          }
          // Preserve additional payload for analytics/debugging
          if (stateValue && (stateValue.hiddenMarks || stateValue.details || stateValue.history || stateValue.actionLog || stateValue.summary || stateValue.quiz)) {
            result.extensions = result.extensions || {};
            if (stateValue.hiddenMarks) result.extensions['https://iwant2study.org/xapi/extensions/hiddenMarks'] = stateValue.hiddenMarks;
            if (stateValue.details) result.extensions['https://iwant2study.org/xapi/extensions/details'] = stateValue.details;
            if (stateValue.history) result.extensions['https://iwant2study.org/xapi/extensions/quizHistory'] = stateValue.history;
            if (stateValue.history) result.extensions['https://iwant2study.org/xapi/extensions/quizAttemptLog'] = buildQuizAttemptLogExtension(stateValue.history);
            if (stateValue.actionLog) result.extensions['https://iwant2study.org/xapi/extensions/actionLog'] = stateValue.actionLog;
            if (stateValue.summary) result.extensions['https://iwant2study.org/xapi/extensions/summary'] = stateValue.summary;
            if (stateValue.quiz) result.extensions['https://iwant2study.org/xapi/extensions/quizSummary'] = stateValue.quiz;
          }

          var statement = {
            actor: params.agent,
            verb: { id: 'http://adlnet.gov/expapi/verbs/scored', display: { 'en-US': 'scored' } },
            object: { id: params.activityId },
            result: result,
            timestamp: new Date().toISOString()
          };

          var scoreSig = [scoreRaw, max, history ? history.length : 0, lastEvt ? lastEvt.t : 0].join('|');
          var scoreSigKey = 'xapi_last_score_sig::' + APP_SCOPE;
          var lastScoreSig = null;
          try { lastScoreSig = localStorage.getItem(scoreSigKey); } catch (e) {}

          if (String(scoreSig) !== String(lastScoreSig)) {
            try { localStorage.setItem(scoreSigKey, String(scoreSig)); } catch (e) {}
            window.ADL.XAPIWrapper.sendStatement(statement);
            console.log('[xAPI] Score statement sent:', scoreObj);
          }

          try {
            var analyticsSig = [stateValue && stateValue.reason ? stateValue.reason : '', scoreRaw, max, history ? history.length : 0, lastEvt ? lastEvt.t : 0].join('|');
            var analyticsKey = 'xapi_last_analytics::' + APP_SCOPE;
            var lastAnalytics = null;
            try { lastAnalytics = localStorage.getItem(analyticsKey); } catch (e) {}

            if (analyticsSig && String(analyticsSig) !== String(lastAnalytics)) {
              try { localStorage.setItem(analyticsKey, String(analyticsSig)); } catch (e) {}

              var reason = stateValue && stateValue.reason ? String(stateValue.reason) : '';
              var verb = /answer/i.test(reason)
                ? { id: 'http://adlnet.gov/expapi/verbs/answered', display: { 'en-US': 'answered' } }
                : { id: 'http://adlnet.gov/expapi/verbs/experienced', display: { 'en-US': 'experienced' } };

              var analyticsStatement = {
                actor: params.agent,
                verb: verb,
                object: { id: params.activityId },
                result: result,
                timestamp: new Date().toISOString()
              };

              window.ADL.XAPIWrapper.sendStatement(analyticsStatement);
              console.log('[xAPI] Analytics statement sent:', analyticsSig);
            }
          } catch (e) {
            console.warn('[xAPI] Unable to send analytics statement (non-fatal):', e);
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
    if (!document.body) return;
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

  function formatQuizAnalytics(history) {
    try {
      var events = Array.isArray(history) ? history.slice(-40) : [];
      var attemptByQ = {};
      var lines = [];
      events.forEach(function (evt, index) {
        var ts = evt.t ? new Date(evt.t) : new Date();
        var time = ts.toLocaleTimeString();
        var type = (evt.type || '').toString();
        var label = type ? type.replace(/_/g, ' ').toUpperCase() : 'EVENT';
        var icon = 'ℹ️';
        if (evt.correct === true) icon = '✅';
        if (evt.correct === false) icon = '❌';

        // Attempt count (best-effort): count answer-like events per question text/id.
        var qKey = evt && (evt.q != null ? String(evt.q) : (evt.name != null ? String(evt.name) : ''));
        var isAttemptLike = !!(qKey && (evt.value != null || evt.expected != null || /answer/i.test(String(evt.type || ''))));
        var attemptNo = null;
        if (isAttemptLike) {
          attemptByQ[qKey] = (attemptByQ[qKey] || 0) + 1;
          attemptNo = attemptByQ[qKey];
        }

        var parts = [];
        parts.push('<strong>#' + (index + 1) + ' ' + icon + ' ' + label + ' @ ' + time + '</strong>');
        if (evt.q) parts.push('Challenge: ' + evt.q);
        if (evt.value != null) parts.push('Student Answer: ' + evt.value);
        if (evt.expected != null) parts.push('Correct Answer: ' + evt.expected);
        if (attemptNo != null) parts.push('Attempt: ' + attemptNo);
        if (evt.result != null) {
          var resLabel = String(evt.result).toLowerCase();
          if (resLabel === 'correct') {
            parts.push('Result: ✅ Correct');
          } else if (resLabel === 'incorrect') {
            parts.push('Result: ❌ Incorrect');
          } else {
            parts.push('Result: ' + evt.result);
          }
        }
        lines.push('<div>' + parts.join('<br>') + '</div>');
      });
      if (lines.length === 0) {
        lines.push('<div>Waiting for xAPI events...</div>');
      }
      return lines.join('<div style="margin:6px 0;"></div>');
    } catch (e) {
      return 'Waiting for xAPI events...';
    }
  }

  function normalizeCorrectness(evt) {
    try {
      if (!evt) return null;
      if (evt.correct === true) return true;
      if (evt.correct === false) return false;
      if (evt.result != null) {
        var r = String(evt.result).toLowerCase();
        if (r === 'correct') return true;
        if (r === 'incorrect' || r === 'wrong') return false;
      }
    } catch (e) {}
    return null;
  }

  function buildAttemptLog(history) {
    var raw = Array.isArray(history) ? history.slice(-120) : [];
    var attemptByQ = {};
    var events = [];

    raw.forEach(function (evt) {
      try {
        if (!evt) return;
        var qKey = evt.q != null ? String(evt.q) : (evt.name != null ? String(evt.name) : '');
        var type = String(evt.type || '');
        var isAttemptLike = !!(qKey && (evt.value != null || evt.expected != null || /answer/i.test(type)));
        if (!isAttemptLike) return;

        attemptByQ[qKey] = (attemptByQ[qKey] || 0) + 1;
        var attemptNo = attemptByQ[qKey];
        var correct = normalizeCorrectness(evt);

        events.push({
          t: evt.t || null,
          type: type || null,
          q: qKey.substring(0, 220),
          studentAnswer: evt.value != null ? String(evt.value).substring(0, 220) : null,
          correctAnswer: evt.expected != null ? String(evt.expected).substring(0, 220) : null,
          correct: correct,
          attempt: attemptNo
        });
      } catch (e) {}
    });

    // Build per-question summary using the final enriched event for each question.
    var byQuestion = {};
    events.forEach(function (e) {
      byQuestion[e.q] = {
        question: e.q,
        attempts: e.attempt,
        lastStudentAnswer: e.studentAnswer,
        correctAnswer: e.correctAnswer,
        correct: e.correct
      };
    });

    var questionSummaries = Object.keys(byQuestion).map(function (k) { return byQuestion[k]; });

    return {
      events: events.slice(-80),
      byQuestion: questionSummaries.slice(-60)
    };
  }

  function formatQuizAttemptLogPlain(history) {
    try {
      var attemptLog = buildAttemptLog(history);
      var events = attemptLog && attemptLog.events ? attemptLog.events : [];
      if (!events.length) return '';

      var lines = [];
      events.forEach(function (e) {
        var status = 'Attempt ' + e.attempt;
        if (e.correct === true) status = '✅ Correct (Attempt ' + e.attempt + ')';
        if (e.correct === false) status = '❌ Wrong (Attempt ' + e.attempt + ')';
        lines.push(
          'Q: ' + (e.q || '') +
          (e.studentAnswer != null ? ('\nStudent answer: ' + e.studentAnswer) : '') +
          (e.correctAnswer != null ? ('\nCorrect answer: ' + e.correctAnswer) : '') +
          '\n' + status
        );
      });
      return lines.join('\n\n');
    } catch (e) {
      return '';
    }
  }

  function buildQuizAttemptLogExtension(history) {
    try {
      var attemptLog = buildAttemptLog(history);
      return {
        generatedAt: new Date().toISOString(),
        eventCount: attemptLog && attemptLog.events ? attemptLog.events.length : 0,
        events: attemptLog && attemptLog.events ? attemptLog.events : [],
        byQuestion: attemptLog && attemptLog.byQuestion ? attemptLog.byQuestion : []
      };
    } catch (e) {
      return { generatedAt: new Date().toISOString(), eventCount: 0, events: [], byQuestion: [] };
    }
  }

  function renderDebugPanel(stateValue) {
    try {
      if (!stateValue) return;
      ensureDebugPanel();
      var body = document.getElementById('xapi-debug-body');
      if (!body) return;

      if (Array.isArray(stateValue.history) && stateValue.history.length) {
        body.innerHTML = formatQuizAnalytics(stateValue.history);
        return;
      }

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

  function syncFromCache() {
    try {
      var cached = readCachedState();
      if (cached && cached.state) {
        window.__xapiLastState = cached.state;
        renderDebugPanel(cached.state);

        // Push cached child-tab state to LRS when parent tab is active
        try {
          var params = XAPIUtils.getParameters();
          if (params && params.activityId && params.agent && params.endpoint) {
            ensureSendStateHook();
            window.ADL.XAPIWrapper.sendState(params.activityId, params.agent, params.stateId, null, cached.state);
          }
        } catch (e) {}
      } else if (window.__xapiLastState) {
        renderDebugPanel(window.__xapiLastState);
      }
    } catch (e) {}
  }

  window.addEventListener('storage', function (e) {
    if (e && e.key === STATE_KEY) {
      syncFromCache();
    }
  });

  window.addEventListener('focus', function () {
    syncFromCache();
  });

  // Initial parse on load
  XAPIUtils.getParameters();
  // Show panel if state is already present
  syncFromCache();

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
