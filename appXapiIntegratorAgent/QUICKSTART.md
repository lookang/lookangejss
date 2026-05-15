# Quick Start Guide - Local Development

## Installation (5 minutes)

### 1. Get Gemini API Key (Free)

1. Go to https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key

### 2. Setup Environment

```bash
cd appXapiIntegratorAgent

# Copy example env file
cp .env.example .env

# Edit .env and add your Gemini API key
nano .env
# or use your editor to add:
# GOOGLE_API_KEY=your_api_key_here
```

### 3. Install Dependencies

```bash
npm install
```

This installs:
- Express (web server)
- Multer (file uploads)
- JSZip (ZIP file handling)
- Google Generative AI (Gemini Pro)
- And more...

### 4. Run the Server

```bash
# Development mode (auto-reload)
npm run dev

# Or production mode
npm start
```

You should see:
```
🚀 xAPI Integrator Server running on http://localhost:3000
📝 Environment: development
```

### 5. Open in Browser

Open http://localhost:3000

You should see:
- 📦 Upload zone
- ⚙️ 4 integration modes:
  1. Timeline Mode (generic tracking)
  2. Quiz Mode (assessments)
  3. Minimal Mode (custom implementations)
  4. **AI Agent Mode** (NEW - Gemini Pro powered)
- 🔧 Options
- 📋 Log panel

## Features Explained

### Mode 1: Timeline Mode
Tracks generic user interactions (clicks, form changes) and adds a "Save to SLS" button. Best for game simulations.

### Mode 2: Quiz Mode
Specialized for quizzes and assessments. Tracks questions, answers, time per question, and generates detailed analytics.

### Mode 3: Minimal Mode
Only injects xAPI libraries without additional tracking. Use this if you want to handle xAPI manually in your content.

### Mode 4: AI Agent Mode ⭐ NEW
Uses Gemini Pro to automatically:
1. Analyze your interactive content
2. Detect what elements it contains (forms, questions, canvas, etc.)
3. **Generate intelligent xAPI tracking scripts** based on the content structure
4. Inject the scripts into your ZIP file

## Testing

### Test with a Sample ZIP

Create a simple test ZIP:
1. Create a folder called `test-content/`
2. Create `test-content/index.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Test Interactive Content</title>
</head>
<body>
    <h1>Sample Quiz</h1>
    
    <h2>Question 1: Which is correct?</h2>
    <label>
        <input type="radio" name="q1" value="a"> Option A
    </label>
    <label>
        <input type="radio" name="q1" value="b"> Option B
    </label>
    
    <h2>Question 2: Select all that apply</h2>
    <label>
        <input type="checkbox" name="q2" value="x"> Item X
    </label>
    <label>
        <input type="checkbox" name="q2" value="y"> Item Y
    </label>
    
    <button onclick="alert('Submitted')">Submit</button>
</body>
</html>
```

3. Zip the folder: `zip -r test-content.zip test-content/`
4. Upload to http://localhost:3000
5. Select **AI Agent Mode**
6. Click Integrate
7. Download the result

### What the AI Agent Does

For your quiz example, it will:
1. Detect 2 radio button questions and checkboxes
2. Recognize this is assessment-like content
3. Generate xAPI tracking for each question answered
4. Add auto-save on form submission
5. Create statements to track performance

## Project Structure

```
appXapiIntegratorAgent/
├── server.js                 # Main Express app
├── package.json              # Dependencies
├── .env                      # Configuration (API key)
├── .env.example              # Template for .env
├── README.md                 # Full documentation
├── DEPLOYMENT.md             # Production deployment guide
│
├── public/
│   ├── index.html           # Web UI
│   └── client.js            # Frontend logic
│
├── routes/
│   ├── upload.js            # File upload endpoint
│   └── api.js               # Analysis and generation endpoints
│
├── lib/
│   ├── analyzer.js          # Content analysis engine
│   ├── geminiAgent.js       # Gemini AI integration
│   ├── injector.js          # Script injection logic
│   └── utils.js             # Helper functions
│
├── vendor/
│   ├── xapiwrapper.min.js   # xAPI wrapper library
│   └── xAPI.js              # xAPI core library
│
├── uploads/                 # Temporary uploads
├── downloads/               # Generated ZIPs
│
└── .gitignore               # Git ignore rules
```

## API Endpoints

### POST /api/upload
Uploads and integrates xAPI into a ZIP file.

Example:
```javascript
const formData = new FormData();
formData.append('file', zipFile);
formData.append('mode', 'agent');
formData.append('keepAnalytics', false);

fetch('/api/upload', {
  method: 'POST',
  body: formData
}).then(r => r.json()).then(data => {
  console.log('Download:', data.downloadUrl);
});
```

### GET /api/status
Check if the service is running and what features are available.

### POST /api/analyze
Analyze content and get mode recommendation.

### POST /api/generate-script
Generate an xAPI script using Gemini AI (requires mode data).

## Troubleshooting

### "GOOGLE_API_KEY not set"
Make sure you:
1. Created .env file
2. Added your Gemini API key to GOOGLE_API_KEY line
3. Restarted the server (npm run dev)

### "Port 3000 already in use"
Change the PORT in .env:
```env
PORT=3001
```

### Files won't upload
1. Check file is a valid ZIP
2. Make sure it contains `index.html` at root or one folder deep
3. Check file size is < 50MB
4. Check `/uploads` directory exists and is writable

### AI mode not working
1. Verify API key is correct (test at https://makersuite.google.com)
2. Check internet connection
3. Look at server logs for errors: `npm run dev` shows errors live
4. Check you have API quota available

## Next Steps

1. **Test Locally**: Upload a test ZIP, try all 4 modes
2. **Understand the Modes**: See what each mode's AI generates
3. **Create Real Content**: Build your interactive content ZIP
4. **Deploy to Production**: Follow DEPLOYMENT.md guide
5. **Deploy to SLS**: Follow SLS documentation for launch URL configuration

## Getting Help

- Server logs: Check terminal where `npm run dev` runs
- Frontend console: Open browser DevTools (F12), see Console tab
- Gemini API docs: https://ai.google.dev
- xAPI docs: https://xapi.com

## What's Next?

The AI Agent mode is experimental. You can:
- Test different content types to see how AI adapts
- Review generated scripts before deploying
- Provide feedback on what works well
- Extend the AI prompts for custom behavior

---

**Enjoy building better learning experiences with xAPI! 🚀**
