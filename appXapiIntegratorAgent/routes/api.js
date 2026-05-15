import express from 'express';
import fs from 'fs';
import path from 'path';
import { analyzeContent } from '../lib/analyzer.js';
import { getAllowedDomains, getRequestHost, isRequestFromAllowedDomain, isServerKeyAllowed } from '../lib/utils.js';
import { OAuth2Client } from 'google-auth-library';
import { createSession, deleteSession, getSessionCookieName } from '../lib/auth.js';
import { generateAIAgentScript, suggestImprovements } from '../lib/geminiAgent.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

function isUnsupportedTemperatureError(error) {
  const status = error?.status;
  const msg = String(error?.message || '');
  return status === 400 && /temperature/i.test(msg) && /(unsupported|not supported)/i.test(msg);
}

function shouldSendTemperature(modelName) {
  const noTempModels = new Set(['gpt-5-mini']);
  return !noTempModels.has(String(modelName || '').trim());
}

function getDefaultModel() {
  // Keep in sync with lib/geminiAgent.js defaults
  return process.env.GEMINI_MODEL || 'gemini-3.1-pro-preview';
}

function getDefaultOpenAIModel() {
  // Must be a model supported by the OpenAI Responses API.
  // Default to the latest chat model if no explicit OPENAI_MODEL is set.
  return process.env.OPENAI_MODEL || 'gpt-5.3-chat-latest';
}

const router = express.Router();
const getGoogleClient = () => {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  if (!clientId) return null;
  return new OAuth2Client(clientId);
};

function getCookieOptions(req) {
  const secure = (req?.headers?.['x-forwarded-proto'] || '').includes('https')
    || (process.env.NODE_ENV === 'production');
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure,
    path: '/'
  };
}

/**
 * POST /api/analyze
 * Analyze content and recommend integration mode
 */
router.post('/analyze', express.json(), async (req, res) => {
  try {
    const { htmlContent, jsContent = '' } = req.body;

    if (!htmlContent) {
      return res.status(400).json({ error: 'htmlContent is required' });
    }

    const analysis = await analyzeContent(htmlContent, jsContent);

    res.json({
      recommendedMode: analysis.recommendedMode,
      confidence: analysis.confidence,
      detectedFeatures: analysis.detectedFeatures,
      reasons: analysis.reasons,
      modeScores: analysis.modeScores
    });

  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/generate-script
 * Generate xAPI injection script using Gemini AI
 */
router.post('/generate-script', express.json(), async (req, res) => {
  try {
    const { analysis } = req.body;

    if (!analysis) {
      return res.status(400).json({ error: 'analysis data is required' });
    }

    if (!isServerKeyAllowed(req) || !process.env.GOOGLE_API_KEY) {
      return res.status(503).json({ 
        error: 'AI Agent not configured',
        message: 'GOOGLE_API_KEY environment variable not set'
      });
    }

    const result = await generateAIAgentScript(analysis);

    res.json({
      script: result.script,
      explanation: result.explanation,
      mode: 'agent',
      error: result.error || null
    });

  } catch (error) {
    console.error('Script generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/suggestions
 * Get AI suggestions for content improvement
 */
router.post('/suggestions', express.json(), async (req, res) => {
  try {
    const { htmlContent, jsContent = '' } = req.body;

    if (!htmlContent) {
      return res.status(400).json({ error: 'htmlContent is required' });
    }

    if (!isServerKeyAllowed(req) || !process.env.GOOGLE_API_KEY) {
      return res.json({ suggestions: [], message: 'AI not configured' });
    }

    const result = await suggestImprovements(htmlContent, jsContent);

    res.json(result);

  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({ 
      suggestions: [],
      error: error.message 
    });
  }
});

/**
 * POST /api/auth/google
 * Verify Google ID token and create session if @moe.edu.sg
 */
router.post('/auth/google', express.json(), async (req, res) => {
  try {
    const googleClient = getGoogleClient();
    const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
    if (!googleClient || !clientId) {
      return res.status(500).json({ ok: false, message: 'Google OAuth not configured' });
    }
    const { credential } = req.body || {};
    if (!credential) {
      return res.status(400).json({ ok: false, message: 'Missing credential' });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: clientId
    });
    const payload = ticket.getPayload();
    const email = payload?.email || '';
    const emailVerified = payload?.email_verified;

    if (!emailVerified || !email.toLowerCase().endsWith('@moe.edu.sg')) {
      return res.status(403).json({ ok: false, message: 'MOE email required' });
    }

    const token = createSession({ email });
    res.cookie(getSessionCookieName(), token, getCookieOptions(req));
    return res.json({ ok: true, email });
  } catch (error) {
    return res.status(401).json({ ok: false, message: error?.message || String(error) });
  }
});

/**
 * GET /api/auth/status
 */
router.get('/auth/status', (req, res) => {
  const auth = req.auth || { moeVerified: false, email: null };
  res.json({ ok: true, moeVerified: !!auth.moeVerified, email: auth.email || null });
});

/**
 * POST /api/auth/logout
 */
router.post('/auth/logout', (req, res) => {
  const token = req?.auth?.token;
  if (token) deleteSession(token);
  res.clearCookie(getSessionCookieName(), getCookieOptions(req));
  res.json({ ok: true });
});

/**
 * GET /api/status
 * Check API status and available features
 */
router.get('/status', (req, res) => {
  const isAllowedDomain = isRequestFromAllowedDomain(req);
  const serverKeyAllowed = isServerKeyAllowed(req);
  const host = getRequestHost(req);
  res.json({
    status: 'ok',
    version: '1.0.0',
    features: {
      aiAgent: serverKeyAllowed && !!process.env.GOOGLE_API_KEY,
      openaiAgent: serverKeyAllowed && !!process.env.OPENAI_API_KEY,
      timelineMode: true,
      quizMode: true,
      minimalMode: true
    },
    ai: {
      geminiModel: getDefaultModel(),
      openaiModel: getDefaultOpenAIModel()
    },
    access: {
      allowedDomains: getAllowedDomains(),
      requestHost: host || null,
      serverKeyAllowed: serverKeyAllowed,
      moeVerified: !!req?.auth?.moeVerified,
      email: req?.auth?.email || null
    },
    auth: {
      googleClientIdConfigured: !!process.env.GOOGLE_OAUTH_CLIENT_ID,
      googleClientId: process.env.GOOGLE_OAUTH_CLIENT_ID || null
    },
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

/**
 * GET /api/openai-models
 * Curated list for this app (Responses API compatible).
 */
router.get('/openai-models', async (req, res) => {
  try {
    const isAllowedDomain = isRequestFromAllowedDomain(req);
    const serverKeyAllowed = isServerKeyAllowed(req);
    // Curated list (requested by user)
    return res.json({
      ok: true,
      configured: serverKeyAllowed && !!process.env.OPENAI_API_KEY,
      models: [
        // Only expose models we expect to work well for code generation.
        { id: 'gpt-5.3-chat-latest', label: 'Latest: GPT-5.3 Chat (latest)', tier: 'latest' },
        { id: 'gpt-5.2',       label: 'Coding: GPT-5.2',       tier: 'coding' },
        { id: 'gpt-5.2-codex', label: 'Codex: GPT-5.2 Codex',  tier: 'codex' },
        { id: 'gpt-5-mini',    label: 'Small: GPT-5 mini',     tier: 'small' },
        { id: 'gpt-4o',      label: 'Advanced: GPT-4o',    tier: 'advanced' },
        { id: 'gpt-4o-mini', label: 'Cheapest: GPT-4o mini', tier: 'cheap' }
      ]
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error?.message || String(error)
    });
  }
});

/**
 * GET /api/openai-test
 * Minimal connectivity test to OpenAI.
 */
router.get('/openai-test', async (req, res) => {
  try {
    if (!isServerKeyAllowed(req) || !process.env.OPENAI_API_KEY) {
      return res.status(503).json({
        ok: false,
        error: 'AI not configured',
        message: 'OPENAI_API_KEY environment variable not set'
      });
    }

    const model = (req.query.model && String(req.query.model)) || getDefaultOpenAIModel();
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const startedAt = new Date().toISOString();
    const t0 = Date.now();
    const params = {
      model,
      input: 'Return exactly the text: OK'
    };

    // Some models only support the default temperature.
    if (shouldSendTemperature(model)) {
      // @ts-expect-error some models accept temperature; types may vary.
      params.temperature = 0;
    }

    let result;
    try {
      result = await client.responses.create(params);
    } catch (error) {
      if (params.temperature != null && isUnsupportedTemperatureError(error)) {
        const retryParams = { ...params };
        delete retryParams.temperature;
        result = await client.responses.create(retryParams);
      } else {
        throw error;
      }
    }
    const durationMs = Date.now() - t0;
    const text = String(result?.output_text || '');

    return res.json({
      ok: true,
      model,
      startedAt,
      durationMs,
      responsePreview: text.substring(0, 200)
    });
  } catch (error) {
    const status = error?.status;
    const msg = error?.message || String(error);
    
    let hint = '';
    let userAction = '';

    if (status === 401) {
      hint = '401 Unauthorized. Your OpenAI API key is missing or invalid.';
      userAction = 'Please check your OPENAI_API_KEY environment variable.';
    } else if (status === 429) {
      hint = '429 Too Many Requests. Quota exceeded or rate limited.';
      userAction = 'Check your OpenAI billing dashboard or try a cheaper model.';
    } else if (status === 404) {
      hint = `404 Not Found. Model '${model}' may be unavailable or invalid.`;
      userAction = 'Try switching to a standard model like gpt-4o or gpt-3.5-turbo.';
    } else {
      hint = `API Error (${status || 'Unknown'}).`;
      userAction = 'Please check your internet connection and API key configuration.';
    }

    return res.status(500).json({
      ok: false,
      model: (req.query.model && String(req.query.model)) || getDefaultOpenAIModel(),
      status: status,
      message: msg,
      details: hint,
      suggestion: userAction
    });
  }
});

/**
 * GET /api/ai-models
 * Lists available models for the configured key via the REST ListModels endpoint.
 */
router.get('/ai-models', async (req, res) => {
  try {
    if (!isServerKeyAllowed(req) || !process.env.GOOGLE_API_KEY) {
      return res.status(503).json({
        ok: false,
        error: 'AI not configured',
        message: 'GOOGLE_API_KEY environment variable not set'
      });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(process.env.GOOGLE_API_KEY)}`;
    const r = await fetch(url, { method: 'GET' });
    const json = await r.json();

    if (!r.ok) {
      return res.status(r.status).json({
        ok: false,
        status: r.status,
        statusText: r.statusText,
        error: json
      });
    }

    // Return a simplified list
    const models = Array.isArray(json.models) ? json.models.map(m => ({
      name: m.name,
      displayName: m.displayName,
      description: m.description,
      supportedGenerationMethods: m.supportedGenerationMethods
    })) : [];

    return res.json({ ok: true, models });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error?.message || String(error)
    });
  }
});

/**
 * GET /api/ai-test
 * Minimal connectivity test to Gemini.
 * Returns ok + latency + a short snippet response, or a detailed error.
 */
router.get('/ai-test', async (req, res) => {
  try {
    if (!isServerKeyAllowed(req) || !process.env.GOOGLE_API_KEY) {
      return res.status(503).json({
        ok: false,
        error: 'AI not configured',
        message: 'GOOGLE_API_KEY environment variable not set'
      });
    }

    const model = (req.query.model && String(req.query.model)) || getDefaultModel();
    const client = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const genModel = client.getGenerativeModel({ model });

    const startedAt = new Date().toISOString();
    const t0 = Date.now();
    const result = await genModel.generateContent('Return exactly the text: OK');
    const durationMs = Date.now() - t0;
    const text = result?.response?.text?.() || '';

    return res.json({
      ok: true,
      model,
      startedAt,
      durationMs,
      responsePreview: text.substring(0, 200)
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      model: (req.query.model && String(req.query.model)) || getDefaultModel(),
      status: error?.status,
      message: error?.message || String(error)
    });
  }
});

/**
 * GET /api/samples/timeline
 * List downloadable Timeline Mode sample files
 */
router.get('/samples/timeline', (req, res) => {
  try {
    const uploadDir = process.env.UPLOAD_DIR || './uploads';
    const timelineDir = path.resolve(uploadDir, 'Timeline_Mode');

    if (!fs.existsSync(timelineDir)) {
      return res.json({ ok: true, folder: 'Timeline_Mode', files: [] });
    }

    const entries = fs.readdirSync(timelineDir, { withFileTypes: true });
    const files = entries
      .filter(entry => entry.isFile())
      .map(entry => {
        const filePath = path.join(timelineDir, entry.name);
        const stats = fs.statSync(filePath);
        return {
          name: entry.name,
          size: stats.size,
          modifiedAt: stats.mtime.toISOString(),
          modifiedMs: stats.mtimeMs
        };
      })
      .sort((a, b) => b.modifiedMs - a.modifiedMs);

    return res.json({ ok: true, folder: 'Timeline_Mode', files });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error?.message || String(error) });
  }
});

/**
 * GET /api/samples/timeline/:filename
 * Download a specific Timeline Mode sample file
 */
router.get('/samples/timeline/:filename', (req, res) => {
  try {
    const uploadDir = process.env.UPLOAD_DIR || './uploads';
    const timelineDir = path.resolve(uploadDir, 'Timeline_Mode');
    const filename = String(req.params.filename || '');
    const filePath = path.join(timelineDir, filename);

    const resolved = path.resolve(filePath);
    if (!resolved.startsWith(timelineDir)) {
      return res.status(403).json({ ok: false, message: 'Forbidden' });
    }

    if (!fs.existsSync(resolved)) {
      return res.status(404).json({ ok: false, message: 'File not found' });
    }

    return res.download(resolved, filename);
  } catch (error) {
    return res.status(500).json({ ok: false, message: error?.message || String(error) });
  }
});

/**
 * GET /api/samples/quiz
 * List downloadable Quiz Mode sample files
 */
router.get('/samples/quiz', (req, res) => {
  try {
    const uploadDir = process.env.UPLOAD_DIR || './uploads';
    const quizDir = path.resolve(uploadDir, 'Quiz_Mode');

    if (!fs.existsSync(quizDir)) {
      return res.json({ ok: true, folder: 'Quiz_Mode', files: [] });
    }

    const entries = fs.readdirSync(quizDir, { withFileTypes: true });
    const files = entries
      .filter(entry => entry.isFile())
      .map(entry => {
        const filePath = path.join(quizDir, entry.name);
        const stats = fs.statSync(filePath);
        return {
          name: entry.name,
          size: stats.size,
          modifiedAt: stats.mtime.toISOString(),
          modifiedMs: stats.mtimeMs
        };
      })
      .sort((a, b) => b.modifiedMs - a.modifiedMs);

    return res.json({ ok: true, folder: 'Quiz_Mode', files });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error?.message || String(error) });
  }
});

/**
 * GET /api/samples/quiz/:filename
 * Download a specific Quiz Mode sample file
 */
router.get('/samples/quiz/:filename', (req, res) => {
  try {
    const uploadDir = process.env.UPLOAD_DIR || './uploads';
    const quizDir = path.resolve(uploadDir, 'Quiz_Mode');
    const filename = String(req.params.filename || '');
    const filePath = path.join(quizDir, filename);

    const resolved = path.resolve(filePath);
    if (!resolved.startsWith(quizDir)) {
      return res.status(403).json({ ok: false, message: 'Forbidden' });
    }

    if (!fs.existsSync(resolved)) {
      return res.status(404).json({ ok: false, message: 'File not found' });
    }

    return res.download(resolved, filename);
  } catch (error) {
    return res.status(500).json({ ok: false, message: error?.message || String(error) });
  }
});

export default router;
