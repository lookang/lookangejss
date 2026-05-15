import OpenAI from 'openai';

function getModelName() {
  // Keep defaults simple: user can override in UI.
  // Use a model supported by the Responses API. If the env var is not set,
  // default to a strong general model.
  return process.env.OPENAI_MODEL || 'gpt-5.3-chat-latest';
}

function isUnsupportedTemperatureError(error) {
  const status = error?.status;
  const msg = String(error?.message || '');
  // OpenAI returns 400s like: "Unsupported value: 'temperature'"
  return status === 400 && /temperature/i.test(msg) && /(unsupported|not supported)/i.test(msg);
}

function shouldSendTemperature(modelName) {
  // Some models only support default temperature; avoid hard-failing.
  // We still have a retry fallback below, but keeping this list reduces noisy 400s.
  const noTempModels = new Set([
    'gpt-5-mini'
  ]);
  return !noTempModels.has(String(modelName || '').trim());
}

function getClient(apiKey) {
  const key = apiKey || process.env.OPENAI_API_KEY;
  if (!key) {
    throw new Error('OPENAI_API_KEY not configured. Cannot use OpenAI provider.');
  }
  return new OpenAI({ apiKey: key });
}

/**
 * Generate xAPI injection script using OpenAI.
 * Mirrors the Gemini agent output format so the frontend can reuse the same display.
 */
export async function generateOpenAIAgentScript(contentAnalysis, customInstructions = '', options = {}) {
  const client = getClient(options.apiKey);

  const modelName = options.model || getModelName();
  const prompt = buildAnalysisPrompt(contentAnalysis, customInstructions);

  try {
    const startedAt = Date.now();
    // Use the Responses API so Codex / non-chat models work.
    // We pass the system message via `instructions` (recommended), and the user prompt via `input`.
    // We still send a low temperature for more deterministic code output, with a safe retry.
    const params = {
      model: modelName,
      instructions: 'You are an expert xAPI and learning analytics engineer.',
      input: prompt
    };

    if (shouldSendTemperature(modelName)) {
      // @ts-expect-error temperature exists for many models, but types may vary by model.
      params.temperature = 0.2;
    }

    let resp;
    try {
      resp = await client.responses.create(params);
    } catch (error) {
      if (params.temperature != null && isUnsupportedTemperatureError(error)) {
        const retryParams = { ...params };
        delete retryParams.temperature;
        resp = await client.responses.create(retryParams);
      } else {
        throw error;
      }
    }

    const text = String(resp?.output_text || '');

    const chainOfThoughtMatch = text.match(/CHAIN_OF_THOUGHT:([\s\S]*?)(?:TRACKING_STRATEGY:|$)/);
    const trackingStrategyMatch = text.match(/TRACKING_STRATEGY:([\s\S]*?)(?:CODE_APPROACH:|$)/);
    const codeApproachMatch = text.match(/CODE_APPROACH:([\s\S]*?)(?:```|$)/);
    const scriptMatch = text.match(/```javascript([\s\S]*?)```/);
    const explanationMatch = text.match(/EXPLANATION:([\s\S]*?)(?:CODE_BREAKDOWN:|$)/);
    const codeBreakdownMatch = text.match(/CODE_BREAKDOWN:([\s\S]*?)$/);

    const chainOfThought = chainOfThoughtMatch ? chainOfThoughtMatch[1].trim() : '';
    const trackingStrategy = trackingStrategyMatch ? trackingStrategyMatch[1].trim() : '';
    const codeApproach = codeApproachMatch ? codeApproachMatch[1].trim() : '';
    let script = scriptMatch ? scriptMatch[1].trim() : generateDefaultScript(contentAnalysis);
    const unsafeReason = getUnsafeScriptReason(script);
    if (unsafeReason) {
      script = generateDefaultScript(contentAnalysis);
    }
    const explanation = explanationMatch ? explanationMatch[1].trim() : 'AI-generated xAPI tracking script';
    const codeBreakdown = codeBreakdownMatch ? codeBreakdownMatch[1].trim() : '';

    return {
      script: wrapScript(script),
      explanation: unsafeReason ? `Unsafe AI script blocked (${unsafeReason}). Using safe storeState-only fallback.` : explanation,
      chainOfThought,
      trackingStrategy,
      codeApproach,
      codeBreakdown,
      fullResponse: text,
      mode: 'agent',
      provider: 'openai',
      model: modelName,
      durationMs: Date.now() - startedAt,
      ...(unsafeReason ? { error: `unsafe_ai_script_blocked: ${unsafeReason}` } : null)
    };
  } catch (error) {
    const status = error?.status;
    const msg = error?.message || String(error);
    console.error('OpenAI API error:', error);

    let hint = '';
    let userAction = '';

    if (status === 401) {
      hint = '401 Unauthorized. Your OpenAI API key is missing or invalid.';
      userAction = 'Please check your OPENAI_API_KEY in .env or the UI input field.';
    } else if (status === 429) {
      hint = '429 Too Many Requests. Quota exceeded or rate limited.';
      userAction = 'You may have run out of credits or are sending requests too quickly. Check your OpenAI billing/usage dashboard.';
    } else if (status === 404) {
      hint = `404 Not Found. Model '${modelName}' may not be available to your key.`;
      userAction = 'Try switching to a standard model like gpt-3.5-turbo or gpt-4 in the "AI Model" dropdown.';
    } else if (status === 500 || status === 503) {
      hint = 'OpenAI Service Error. The API is currently experiencing issues.';
      userAction = 'Please try again in a few minutes. Check status.openai.com for outages.';
    } else {
      hint = `API Error (${status || 'Unknown'}).`;
      userAction = 'Please check your internet connection and API key configuration.';
    }

    const fullErrorMessage = [
      `OpenAI API Error: ${msg}`,
      `Details: ${hint}`,
      `Suggested Action: ${userAction}`
    ].join('\n');

    console.error(fullErrorMessage);

    // Fallback to default script if AI fails
    return {
      script: wrapScript(generateDefaultScript(contentAnalysis)),
      explanation: `Using fallback script (AI agent unavailable: ${hint})`,
      chainOfThought: 'AI service unavailable',
      trackingStrategy: 'Using default tracking',
      codeApproach: 'Fallback mode',
      codeBreakdown: 'N/A',
      fullResponse: fullErrorMessage,
      mode: 'agent',
      provider: 'openai',
      error: fullErrorMessage,
      status: status,
      model: modelName
    };
  }
}

function getUnsafeScriptReason(script) {
  try {
    const s = String(script || '');
    if (/\bfetch\s*\(/i.test(s)) return 'fetch() not allowed';
    if (/XMLHttpRequest/i.test(s)) return 'XMLHttpRequest not allowed';
    if (/\bADL\s*\./i.test(s) || /XAPIWrapper/i.test(s)) return 'Direct ADL/XAPIWrapper usage not allowed';
    if (/changeConfig\s*\(/i.test(s)) return 'changeConfig not allowed';
    if (/endpoint\b|auth\b/i.test(s) && /URLSearchParams\b/i.test(s)) return 'Reading endpoint/auth from URL not allowed';

    // Mirror Gemini safety: disallow AI scripts that build raw xAPI statements
    // (actor/verb/object/result/context) and pass them into window.storeState.
    // The integrator expects storeState to receive simple state payloads only;
    // statement construction is handled by the injected vendor glue.
    const hasStoreStateCall = /storeState\s*\(/i.test(s);
    const looksLikeXapiStatement = /(\bactor\b\s*:|\bverb\b\s*:|\bobject\b\s*:|\bresult\b\s*:|\bcontext\b\s*:)/i.test(s);
    if (hasStoreStateCall && looksLikeXapiStatement) {
      return 'AI script attempts to build raw xAPI statements; only simple state payloads are allowed for storeState.';
    }
    return '';
  } catch {
    return 'unable_to_validate';
  }
}

/**
 * Build a detailed analysis prompt for the LLM.
 * Kept mostly identical to lib/geminiAgent.js for consistent behavior.
 */
function buildAnalysisPrompt(analysis, customInstructions = '') {
  const { detectedFeatures, modeScores } = analysis;

  let prompt = `You are an expert xAPI and learning analytics engineer. Analyze this interactive content and generate a JavaScript tracking snippet to be injected into the existing page.

DETECTED CONTENT FEATURES:
- Has Radio Buttons: ${detectedFeatures.hasRadioButtons}
- Has Checkboxes: ${detectedFeatures.hasCheckboxes}
- Has Text Inputs: ${detectedFeatures.hasTextInputs}
- Has Drag-Drop: ${detectedFeatures.hasDragDrop}
- Has Canvas: ${detectedFeatures.hasCanvas}
- Has Play/Pause: ${detectedFeatures.hasPlayPause}
- Has Game State: ${detectedFeatures.hasGameState}
- Has Scoring: ${detectedFeatures.hasScore}
- Questions Detected: ${detectedFeatures.hasQuestions ? 'Yes' : 'No'}
- Question Count: ${detectedFeatures.questionCount}

CONTENT COMPLEXITY:
- Form-based Content Score: ${modeScores.quiz}
- Timeline/Interactive Score: ${modeScores.timeline}
- Custom Tracking Score: ${modeScores.agent}

CHAIN OF THOUGHT (Show your reasoning):
1. Analyze what type of content this is based on detected features
2. Identify the primary interaction patterns
3. Determine what xAPI statements should be generated
4. Plan the tracking architecture
5. Consider edge cases and error handling

TASK: Generate an intelligent xAPI injection script that:

1. Tracks user interactions based on detected features
2. Handles multiple interaction types (form submissions, canvas drawing, drag-drop, etc.)
3. Captures timing and state information
4. Sends xAPI statements to an LRS endpoint (obtained from page parameters)
5. Gracefully handles missing parameters or unavailable endpoints
6. Works with SLS interactive response question parameters

SCRIPT REQUIREMENTS:
- Use vanilla JavaScript (no external dependencies)
- IMPORTANT: Do NOT do any network calls (no fetch / XMLHttpRequest). The hosting environment can block CORS.
- IMPORTANT: Do NOT change any existing xAPI wrapper configuration.
  // IMPORTANT: Assume window.storeState(payload) is already available and is the ONLY supported way to send data to SLS.
- Only add event listeners and compute payloads.
- Include proper error handling
- Auto-execute on DOMContentLoaded
- Track at least 5 meaningful user events
- Include fallback if window.storeState is not available yet: wait/retry briefly then proceed.
  // CRITICAL: Do NOT read endpoint/auth from URL parameters (no URLSearchParams for endpoint/auth).

SLS DATA CONTRACT (VERY IMPORTANT):
- You MUST NOT construct or send raw xAPI statements (no objects with keys actor / verb / object / result / context).
- You MUST NOT call ADL.XAPIWrapper, changeConfig, sendStatement or any direct xAPI APIs.
- You MUST ONLY call window.storeState(payload) with a plain JSON payload describing state.
- The vendor glue (xAPI.js) will convert this state into proper xAPI statements that SLS expects.

Design your script so that it builds **state payloads** like the following, and passes them to window.storeState:

window.storeState({
  score: <number>,              // total marks awarded across questions
  max: <number>,                // total available marks
  feedback: <string>,           // human-readable summary
  reason: <string>,             // e.g. 'answer', 'auto-score', 'quiz-submit'
  quiz: {
    attempted: <number>,        // how many questions the learner attempted
    correct: <number>,          // how many were fully correct
    total: <number>,            // total questions
    points: <number|null>,      // optional game points
    items: [
      {
        id: <string>,           // stable question id or name
        question: <string>,     // question text
        correctOption: <string|array>,   // correct option(s)
        userSelection: <string|array>,   // learner selection(s)
        marks: <number>,        // marks awarded for this question
        maxMarks: <number>      // maximum marks for this question
      }
    ]
  },
  history: [                    // recent per-action events for analytics
    {
      t: <number>,              // seconds since session start
      type: <string>,           // e.g. 'answer', 'answer_click', 'answer_check'
      q: <string|null>,         // question id or text
      value: <string|null>,     // learner answer
      expected: <string|null>,  // correct answer if known
      correct: <true|false|null>,
      marks: <number|null>      // optional per-attempt marks
    }
  ]
});

Your code MUST use this state shape (or a compatible subset). Do not invent actor/verb/object/result/context structures.

Please provide your response in this EXACT format:

CHAIN_OF_THOUGHT:
[Your step-by-step reasoning about the content and approach]

TRACKING_STRATEGY:
[What you plan to track and why]

CODE_APPROACH:
[How you'll structure the code and what parts you'll include]

\`\`\`javascript
[Complete, production-ready JavaScript snippet]
\`\`\`

EXPLANATION:
[Detailed explanation of what the script does, line by line]

CODE_BREAKDOWN:
[List each major code section and what it does]`;

  if (customInstructions && customInstructions.trim()) {
    prompt += `\n\nCUSTOM INSTRUCTIONS FROM USER:\n${customInstructions}\n\nIMPORTANT: Incorporate these custom instructions into your generated tracking script. They take priority for any special calculations or tracking requirements mentioned.`;
  }

  return prompt;
}

/**
 * Generate default script if AI fails.
 * We reuse the same implementation as geminiAgent, copied here to avoid cross-import coupling.
 */
function generateDefaultScript(contentAnalysis) {
  const { detectedFeatures } = contentAnalysis;

  let eventHandlers = '';

  if (detectedFeatures.hasRadioButtons || detectedFeatures.hasCheckboxes) {
    eventHandlers += `
  // Track form/selection changes (state-only)
  document.addEventListener('change', function(e) {
    if (e.target.matches('input[type="radio"], input[type="checkbox"]')) {
      safeStore({
        score: 0,
        feedback: 'answered',
        action: 'answered',
        name: e.target.name || e.target.id || '',
        value: String(e.target.value || '').substring(0, 120)
      });
    }
  });`;
  }

  if (detectedFeatures.hasDragDrop) {
    eventHandlers += `
  // Track drag-drop interactions (state-only)
  document.addEventListener('dragstart', function(e) {
    safeStore({ score: 0, feedback: 'dragstart', action: 'dragstart', target: summarizeTarget(e.target) });
  });
  document.addEventListener('drop', function(e) {
    safeStore({ score: 0, feedback: 'drop', action: 'drop', target: summarizeTarget(e.target) });
  });`;
  }

  if (detectedFeatures.hasCanvas) {
    eventHandlers += `
  // Track canvas interactions (state-only)
  document.addEventListener('mousedown', function(e) {
    if (e.target.tagName === 'CANVAS') {
      safeStore({ score: 0, feedback: 'canvas', action: 'canvas-started', target: summarizeTarget(e.target) });
    }
  });`;
  }

  if (detectedFeatures.hasPlayPause) {
    eventHandlers += `
  // Track media playback (state-only)
  document.addEventListener('play', function(e) {
    safeStore({ score: 0, feedback: 'play', action: 'play', target: summarizeTarget(e.target) });
  }, true);
  document.addEventListener('pause', function(e) {
    safeStore({ score: 0, feedback: 'pause', action: 'pause', target: summarizeTarget(e.target) });
  }, true);`;
  }

  return `(function() {
  'use strict';

  // IMPORTANT:
  // Use ONLY window.storeState(payload). Do not send statements directly (CORS).
  // Do NOT read endpoint/auth from URLSearchParams or any query string.
  // Wait briefly for storeState to exist (xAPI libs are injected earlier).

  function waitForStoreState(maxMs) {
    return new Promise((resolve) => {
      const started = Date.now();
      (function tick() {
        if (typeof window.storeState === 'function') return resolve(true);
        if (Date.now() - started > maxMs) return resolve(false);
        setTimeout(tick, 50);
      })();
    });
  }

  function safeStore(payload) {
    try {
      if (typeof window.storeState === 'function') {
        window.storeState(payload);
      }
    } catch (e) {
      // never break content
    }
  }

  function summarizeTarget(t) {
    try {
      return {
        tag: (t && t.tagName) ? String(t.tagName).toLowerCase() : null,
        id: t && t.id ? String(t.id).substring(0, 120) : null,
        name: t && t.name ? String(t.name).substring(0, 120) : null,
        value: t && t.value != null ? String(t.value).substring(0, 120) : null,
        text: t && t.textContent ? String(t.textContent).trim().substring(0, 120) : null
      };
    } catch {
      return {};
    }
  }

  async function init() {
    await waitForStoreState(2000);

    document.addEventListener('click', function(e) {
      const btn = e.target && (e.target.closest ? e.target.closest('button, a') : null);
      if (!btn) return;
      safeStore({ score: 0, feedback: 'clicked', action: 'click', target: summarizeTarget(btn) });
    });

    ${eventHandlers}

    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        safeStore({ score: 0, feedback: 'paused', action: 'paused' });
      }
    });

    console.log('[xAPI] AI add-on tracking initialized (storeState-only)');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();`;
}

/**
 * Wrap script with safety checks
 */
function wrapScript(script) {
  return `
<!-- xAPI AI Agent - Auto-generated tracking script -->
<script>
(function() {
  function waitForStoreState(maxMs) {
    return new Promise((resolve) => {
      const started = Date.now();
      (function tick() {
        if (typeof window.storeState === 'function') return resolve(true);
        if (Date.now() - started > maxMs) return resolve(false);
        setTimeout(tick, 50);
      })();
    });
  }

  function run() {
    try {
      ${script}
    } catch (error) {
      console.error('[xAPI Agent Error]', error);
      // Fail silently to prevent breaking content
    }
  }

  const start = () => waitForStoreState(2000).then(run);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
</script>`;
}
