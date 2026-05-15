import express from 'express';
import multer from 'multer';
import JSZip from 'jszip';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { analyzeContent, findContentDir, extractJsFiles } from '../lib/analyzer.js';
import { injectScriptsIntoHtml, injectAIAgentScriptIntoHtml, serializeDocument } from '../lib/injector.js';
import { generateAIAgentScript } from '../lib/geminiAgent.js';
import { generateOpenAIAgentScript } from '../lib/openaiAgent.js';
import { loadVendorLibs, sanitizeFilename, joinPath, isServerKeyAllowed, isRequestFromAllowedDomain, getRequestHost } from '../lib/utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = express.Router();

// Configure multer for ZIP uploads
const uploadDir = process.env.UPLOAD_DIR || './uploads';
const downloadDir = process.env.DOWNLOAD_DIR || './downloads';
const maxFileSize = parseInt(process.env.MAX_FILE_SIZE || '52428800');

const upload = multer({
  dest: uploadDir,
  limits: { fileSize: maxFileSize },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/zip' || file.originalname.endsWith('.zip')) {
      cb(null, true);
    } else {
      cb(new Error('Only ZIP files are allowed'));
    }
  }
});

/**
 * POST /api/upload
 * Process and integrate xAPI into uploaded ZIP file
 */
router.post('/', upload.single('file'), async (req, res) => {
  const logs = [];

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const {
      mode = 'minimal',
      keepAnalytics = false,
      customInstructions = '',
      enableAi = 'true',
      // New generic AI fields (preferred)
      aiProvider = '',
      aiModel = '',
      openaiApiKey = '',
      geminiApiKey = '',
      claudeApiKey = '',
      // Backward compatibility (older UI)
      geminiModel = '',
      openaiModel = ''
    } = req.body;
    logs.push(`📦 Processing: ${req.file.originalname}`);
    logs.push(`⚙️  Mode: ${mode}, Keep Analytics: ${keepAnalytics}`);
    if (customInstructions) {
      logs.push(`📋 Custom Instructions provided`);
    }

    // Read ZIP file
    const zipData = fs.readFileSync(req.file.path);
    const zip = await JSZip.loadAsync(zipData);

    // Find content directory
    const { contentDir, indexPath } = findContentDir(zip.files);
    if (!indexPath) {
      throw new Error('No index.html found in ZIP');
    }

    logs.push(`✓ Found index.html at: ${indexPath}`);

    // Read HTML and JS content
    let htmlContent = await zip.file(indexPath).async('string');
    
    // Extract and read JS files
    let jsContent = '';
    const jsFiles = extractJsFiles(zip.files, contentDir);
    if (jsFiles.length > 0) {
      try {
        jsContent = await zip.file(jsFiles[0]).async('string');
        logs.push(`✓ Found JavaScript: ${jsFiles[0]}`);
      } catch (e) {
        logs.push(`⚠️  Could not read JavaScript file`);
      }
    }

    // Analyze content
    logs.push(`📊 Analyzing content...`);
    const analysis = await analyzeContent(htmlContent, jsContent);
    
    logs.push(`✓ Recommended Mode: ${analysis.recommendedMode.toUpperCase()} (${analysis.confidence}% confidence)`);
    if (analysis.reasons.length > 0) {
      logs.push(`  Reasons: ${analysis.reasons.join(', ')}`);
    }

    // Load vendor libraries
    logs.push(`📚 Loading vendor libraries...`);
    const vendors = await loadVendorLibs();

    // Determine base mode (we no longer treat "agent" as a mode; AI is an add-on)
    let finalMode = mode;
    if (finalMode === 'agent') {
      // Backward compatibility: treat agent selection as minimal base mode
      // with AI enabled.
      finalMode = 'minimal';
    }
    if (mode === 'auto') {
      finalMode = analysis.recommendedMode;
      logs.push(`✓ Auto-selected mode: ${finalMode.toUpperCase()}`);
    }

    // Deprecation: disable quiz mode selection.
    // Treat any request for quiz mode (or auto-recommended quiz) as timeline.
    if (finalMode === 'quiz') {
      finalMode = 'timeline';
      logs.push('ℹ️ Quiz mode is temporarily disabled; using TIMELINE mode (unified) instead.');
    }

    // Inject base scripts first
    logs.push(`💉 Injecting base xAPI scripts...`);
    let injectedHtml = htmlContent;
    
    // Generate AI script as an add-on for any base mode when:
    // - AI is enabled
    // - custom instructions are provided
    // - provider key is configured
    let aiScript = null;
    let aiResult = null;
    const provider = (aiProvider && String(aiProvider).trim().toLowerCase()) || 'gemini';
    const isAllowedDomain = isRequestFromAllowedDomain(req);
    const serverKeyAllowed = isServerKeyAllowed(req);
    if (!serverKeyAllowed) {
      const host = getRequestHost(req);
      logs.push(`🔒 Server keys restricted for host: ${host || 'unknown'}`);
    } else if (!isAllowedDomain && req?.auth?.moeVerified) {
      logs.push(`✅ MOE sign-in verified for ${req.auth.email || 'user'}`);
    }
    const openaiKey = (openaiApiKey && String(openaiApiKey).trim()) || '';
    const geminiKey = (geminiApiKey && String(geminiApiKey).trim()) || '';
    const providerKeyPresent = provider === 'openai'
      ? (!!openaiKey || (serverKeyAllowed && !!process.env.OPENAI_API_KEY))
      : (!!geminiKey || (serverKeyAllowed && !!process.env.GOOGLE_API_KEY));
    const defaultModel = provider === 'openai'
      ? (process.env.OPENAI_MODEL || 'gpt-5.3-chat-latest')
      : (process.env.GEMINI_MODEL || 'gemini-3.1-pro-preview');

    const requestedModel = (
      (aiModel && String(aiModel).trim()) ||
      (provider === 'openai'
        ? ((openaiModel && String(openaiModel).trim()) || '')
        : ((geminiModel && String(geminiModel).trim()) || '')
      ) ||
      defaultModel
    );

    let aiMeta = {
      provider,
      enabled: providerKeyPresent,
      requested: false,
      status: 'not_requested',
      model: requestedModel,
      startedAt: null,
      finishedAt: null,
      durationMs: null,
      error: null
    };

    const aiEnabled = enableAi === true || enableAi === 'true' || enableAi === '1';
    const hasInstructions = !!(customInstructions && String(customInstructions).trim());
    const wantsAI = !!aiEnabled && hasInstructions;
    aiMeta.requested = !!wantsAI;

    if (wantsAI) {
      if (!providerKeyPresent) {
        const keyName = provider === 'openai' ? 'OPENAI_API_KEY' : 'GOOGLE_API_KEY';
        logs.push(`⚠️  AI requested but ${keyName} is not set - skipping AI generation`);
        aiMeta.status = 'disabled';
        aiMeta.error = `${provider}: key not set`;
      } else {
        logs.push(`🤖 Generating AI agent script (add-on) via ${aiMeta.provider}...`);
        aiMeta.status = 'started';
        aiMeta.startedAt = new Date().toISOString();
        const aiStart = Date.now();
        try {
          aiResult = provider === 'openai'
            ? await generateOpenAIAgentScript(analysis, customInstructions, { model: aiMeta.model, apiKey: openaiKey })
            : await generateAIAgentScript(analysis, customInstructions, { model: aiMeta.model, apiKey: geminiKey });
          aiScript = aiResult.script;
          aiMeta.status = aiResult?.error ? 'fallback' : 'success';
          if (aiResult?.error) {
            aiMeta.error = aiResult.error;
          }
          if (aiResult?.model) {
            aiMeta.model = aiResult.model;
          }
          if (aiResult?.provider) {
            aiMeta.provider = aiResult.provider;
          }
          logs.push(`✓ AI script generated: ${aiResult.explanation.substring(0, 100)}...`);
        } catch (err) {
          logs.push(`⚠️  AI generation failed: ${err.message} - continuing without AI script`);
          aiMeta.status = 'failed';
          aiMeta.error = err.message;
        } finally {
          aiMeta.finishedAt = new Date().toISOString();
          aiMeta.durationMs = Date.now() - aiStart;
          logs.push(`⏱️  AI generation time: ${aiMeta.durationMs}ms`);
          if (aiMeta.status === 'fallback') {
            logs.push(`⚠️  AI fallback used: ${aiMeta.error}`);
          }
        }
      }
    }

    // Inject base scripts into HTML
    injectedHtml = injectScriptsIntoHtml(htmlContent, {
      mode: finalMode,
      keepAnalytics: keepAnalytics === true || keepAnalytics === 'true',
      aiScript: null
    });

    // Inject AI script after base injection (if requested)
    if (aiScript) {
      logs.push(`🧩 Injecting AI add-on after base injection...`);
      injectedHtml = injectAIAgentScriptIntoHtml(injectedHtml, aiScript);
    }

    // Update ZIP with modified HTML
    zip.file(indexPath, injectedHtml);

    // Add vendor libraries to lib folder
    const libPath = joinPath(contentDir, 'lib/');
    zip.file(joinPath(libPath, 'xapiwrapper.min.js'), vendors.wrapper);
    zip.file(joinPath(libPath, 'xAPI.js'), vendors.glue);

    logs.push(`✓ Vendors added to ${libPath}`);

    // Add transparency files into the ZIP so the package is self-describing
    const aiUsed = !!aiScript && (aiMeta.status === 'success' || aiMeta.status === 'fallback');
    const instructionLines = [];

    instructionLines.push('xAPI + AI Integration Summary');
    instructionLines.push('-----------------------------');
    instructionLines.push(`Original file: ${req.file.originalname}`);
    instructionLines.push(`Base mode: ${finalMode}`);
    instructionLines.push(`AI used: ${aiUsed ? 'yes' : 'no'}`);
    instructionLines.push(`AI provider: ${aiMeta.provider || 'n/a'}`);
    instructionLines.push(`AI model: ${aiMeta.model || 'n/a'}`);
    instructionLines.push(`AI status: ${aiMeta.status}`);

    if (hasInstructions) {
      instructionLines.push('');
      instructionLines.push('Custom Instructions:');
      instructionLines.push(String(customInstructions));
    }

    if (aiResult?.explanation) {
      instructionLines.push('');
      instructionLines.push('AI Explanation:');
      instructionLines.push(aiResult.explanation);
    }

    const instructionPath = joinPath(contentDir, 'instruction.txt');
    const logPath = joinPath(contentDir, 'log.txt');
    zip.file(instructionPath, instructionLines.join('\n'));
    zip.file(logPath, logs.join('\n'));

    logs.push(`✓ Added instruction.txt and log.txt to ${contentDir || '/'} root`);

    // Generate output ZIP
    logs.push(`📦 Packaging output...`);
    const outBlob = await zip.generateAsync({ type: 'nodebuffer' });
    
    const baseName = sanitizeFilename(
      req.file.originalname.replace(/\.zip$/i, '')
    );
    const modeTag = sanitizeFilename(finalMode || 'minimal');
    const aiSuffix = aiUsed ? 'AIused+' : '';
    const outName = `scorable_newTab_${modeTag}_${aiSuffix}${baseName}.zip`;
    const outPath = path.join(downloadDir, outName);
    
    fs.writeFileSync(outPath, outBlob);

    logs.push(`✓ Generated: ${outName}`);
    logs.push(`✅ Integration complete!`);

    // Clean up temp upload
    fs.unlinkSync(req.file.path);

    // Return success response
    res.json({
      success: true,
      downloadUrl: `/api/download/${outName}`,
      filename: outName,
      mode: finalMode,
      log: logs,
      analysis: {
        recommendedMode: analysis.recommendedMode,
        confidence: analysis.confidence,
        detectedFeatures: analysis.detectedFeatures,
        reasons: analysis.reasons
      },
      aiMeta: aiMeta,
      aiThinking: aiScript ? {
        chainOfThought: aiResult?.chainOfThought || '',
        trackingStrategy: aiResult?.trackingStrategy || '',
        codeApproach: aiResult?.codeApproach || '',
        codeBreakdown: aiResult?.codeBreakdown || '',
        explanation: aiResult?.explanation || ''
      } : null
    });

  } catch (error) {
    console.error('Upload error:', error);
    
    // Clean up temp file
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {
        // Ignore cleanup errors
      }
    }

    res.status(400).json({
      error: error.message || 'Processing failed',
      log: logs
    });
  }
});

export default router;
