import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
import uploadRoutes from './routes/upload.js';
import apiRoutes from './routes/api.js';
import { ensureDirectories } from './lib/utils.js';
import { attachAuthSession } from './lib/auth.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'production';
// Application base path as exposed on the public site (cPanel "Base Application URL")
// We also register routes without this prefix so it works in either mounting style.
const APP_BASE = '/lookangejss/appXapiIntegratorAgent';

// Ensure required directories exist
ensureDirectories();

// Middleware
app.disable('x-powered-by');

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(attachAuthSession);
// Serve static assets from /public for both root and APP_BASE paths
app.use(express.static(path.join(__dirname, 'public')));
app.use(APP_BASE, express.static(path.join(__dirname, 'public')));
app.use(`${APP_BASE}/public`, express.static(path.join(__dirname, 'public')));

// Routes (support both plain paths and full APP_BASE-prefixed paths)
app.use(['/api/upload', `${APP_BASE}/api/upload`, `${APP_BASE}/public/api/upload`], uploadRoutes);
app.use(['/api', `${APP_BASE}/api`, `${APP_BASE}/public/api`], apiRoutes);

// Download endpoint
app.get(['/api/download/:filename', `${APP_BASE}/api/download/:filename`, `${APP_BASE}/public/api/download/:filename`], (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, process.env.DOWNLOAD_DIR || './downloads', filename);
  
  // Security check: prevent directory traversal
  const resolved = path.resolve(filepath);
  const downloadDir = path.resolve(process.env.DOWNLOAD_DIR || './downloads');
  
  if (!resolved.startsWith(downloadDir)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  res.set({
    'Cache-Control': 'no-store, no-cache, must-revalidate, private',
    'Pragma': 'no-cache',
    'Expires': '0'
  });
  
  res.download(filepath, filename, (err) => {
    if (err) {
      console.error('Download error:', err);
      res.status(500).json({ error: 'Download failed' });
    }
  });
});

// Health check
app.get(['/health', `${APP_BASE}/health`, `${APP_BASE}/public/health`], (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve index.html for root path (both bare and APP_BASE paths)
app.get(['/', APP_BASE, `${APP_BASE}/`, `${APP_BASE}/public`, `${APP_BASE}/public/`], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: NODE_ENV === 'development' ? (err.message || 'Internal server error') : 'Internal server error',
    ...(NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 xAPI Integrator Server running on http://localhost:${PORT}`);
  console.log(`📝 Environment: ${NODE_ENV}`);
  
  if (NODE_ENV === 'production') {
    console.log('⚙️  Production mode - AI agent features enabled');
  }
  
  if (!process.env.GOOGLE_API_KEY) {
    console.warn('⚠️  GOOGLE_API_KEY not set - AI Agent mode will not work');
  }

  if (!process.env.OPENAI_API_KEY) {
    console.warn('⚠️  OPENAI_API_KEY not set - OpenAI provider will not work');
  }
});

export default app;
