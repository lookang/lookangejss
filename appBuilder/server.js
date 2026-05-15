import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// OpenAI API proxy endpoint
app.post('/api/openai', async (req, res) => {
  try {
    const { messages, model = 'gpt-4o' } = req.body;
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 4000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('OpenAI proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to call OpenAI API',
      details: error.message 
    });
  }
});

// Claude API proxy endpoint
app.post('/api/claude', async (req, res) => {
  try {
    const { messages, model = 'claude-3-5-sonnet-20241022' } = req.body;
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Claude proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to call Claude API',
      details: error.message 
    });
  }
});

// Gemini API proxy endpoint (for consistency)
app.post('/api/gemini', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Gemini proxy error:', error);
    res.status(500).json({ 
      error: 'Failed to call Gemini API',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    availableAPIs: {
      openai: !!process.env.OPENAI_API_KEY,
      claude: !!process.env.CLAUDE_API_KEY,
      gemini: !!process.env.GEMINI_API_KEY
    }
  });
});

// Serve the main app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Serving static files from: ${path.join(__dirname, 'dist')}`);
  console.log(`🔑 API Keys configured:`, {
    OpenAI: !!process.env.OPENAI_API_KEY,
    Claude: !!process.env.CLAUDE_API_KEY,
    Gemini: !!process.env.GEMINI_API_KEY
  });
});
