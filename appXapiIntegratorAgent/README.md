# xAPI Integrator with Gemini AI Agent (Node.js)

A server-side xAPI integrator that processes ZIP files containing interactive content and injects xAPI libraries. Now includes an experimental 4th mode with Gemini AI agent for intelligent script generation.

## Features

- **4 Integration Modes:**
  1. **Timeline Mode** - Generic action logging + automatic saves
  2. **Quiz Mode** - Comprehensive quiz analytics with question tracking
  3. **Minimal Mode** - Only injects xAPI libraries without tracking
  4. **AI Agent Mode (NEW)** - Uses Gemini Pro to intelligently analyze and enhance content

- **Drag & Drop File Upload** - Modern UI with visual feedback
- **Smart Content Analysis** - Auto-detects content type and recommends mode
- **Gemini Pro Integration** - Automatically generates xAPI injection scripts based on content analysis
- **Server-Side Processing** - Runs on Node.js for production environments

## Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables** (create `.env` file):
   ```env
   PORT=3000
   GOOGLE_API_KEY=KEY_HERE
   NODE_ENV=development
   ```

   Get your free Gemini API key from: https://makersuite.google.com/app/apikey

3. **Start the server:**
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

4. **Access the application:**
   Open http://localhost:3000 in your browser

## Project Structure

```
appXapiIntegratorAgent/
├── server.js                 # Main Express server
├── routes/
│   ├── upload.js            # ZIP upload and processing
│   └── api.js               # AI agent and analysis endpoints
├── lib/
│   ├── analyzer.js          # Content analysis logic
│   ├── injector.js          # xAPI injection engine
│   └── geminiAgent.js       # Gemini AI agent integration
├── vendor/
│   ├── xapiwrapper.min.js   # xAPI wrapper library
│   └── xAPI.js              # xAPI core library
├── public/
│   ├── index.html           # Main UI
│   ├── style.css            # Styles
│   └── client.js            # Client-side logic
├── uploads/                 # Temporary upload storage
├── downloads/               # Generated ZIP files
├── .env                     # Environment configuration
├── .gitignore              # Git ignore rules
└── package.json            # Dependencies
```

## API Endpoints

### POST `/api/upload`
Uploads and processes a ZIP file with specified mode.

**Request:**
- `file` (FormData) - ZIP file to process
- `mode` (string) - Integration mode: `timeline`, `quiz`, `minimal`, or `agent`
- `keepAnalytics` (boolean) - Keep Google Analytics scripts

**Response:**
```json
{
  "success": true,
  "downloadUrl": "/api/download/integrated_filename.zip",
  "log": ["...analysis steps..."],
  "analysis": {
    "recommendedMode": "quiz",
    "confidence": 85,
    "detectedFeatures": {...}
  }
}
```

### GET `/api/analyze`
Analyzes uploaded ZIP file without processing.

**Query Parameters:**
- `fileName` (string) - Name of the ZIP file

**Response:**
```json
{
  "recommendedMode": "quiz",
  "confidence": 85,
  "reasons": ["Has form elements", "..."],
  "detectedFeatures": {...}
}
```

### POST `/api/generate-script`
Uses Gemini AI to generate xAPI injection script based on content analysis.

**Request:**
```json
{
  "htmlContent": "<html>...",
  "jsContent": "...",
  "mode": "agent",
  "analysis": {...}
}
```

**Response:**
```json
{
  "script": "// Generated xAPI injection script...",
  "explanation": "This script tracks..."
}
```

## Modes Explained

### 1. Timeline Mode
- Tracks button clicks, select changes, canvas drags
- Auto-saves on interaction, score or result changes, pause, and unload
- Best for: Game simulations, interactive simulations

### 2. Quiz Mode
- Specialized for quizzes/assessments
- Tracks each question attempt, answer selections, time per question
- Provides detailed student performance analytics
- Best for: Quizzes, assessments, tests

### 3. Minimal Mode
- Only injects xAPI libraries without additional tracking
- Provides basic save helper
- Best for: Custom implementations where you handle xAPI directly

### 4. AI Agent Mode (NEW)
- Gemini Pro analyzes your content automatically
- Generates intelligent xAPI injection scripts
- Learns from content patterns and structure
- Best for: Complex interactive content, custom requirements

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `GOOGLE_API_KEY` | Gemini API key (required for AI mode) | - |
| `GOOGLE_OAUTH_CLIENT_ID` | Google OAuth Client ID (MOE sign-in) | - |
| `GOOGLE_OAUTH_CLIENT_SECRET` | Google OAuth Client Secret (MOE sign-in) | - |
| `AUTH_SESSION_TTL_HOURS` | MOE sign-in session TTL in hours | 24 |
| `ALLOWED_DOMAINS` | Domains allowed to use server keys without sign-in | moe.edu.sg |
| `NODE_ENV` | Environment (development/production) | development |
| `UPLOAD_DIR` | Temporary upload directory | ./uploads |
| `DOWNLOAD_DIR` | Download files directory | ./downloads |
| `MAX_FILE_SIZE` | Max ZIP file size in bytes | 52428800 (50MB) |

## MOE Google Sign‑In (Server Key Protection)

Server AI keys are protected so only **@moe.edu.sg** users can unlock them from any domain. The app uses **Google Identity Services** with ID token verification on the server.

### Setup Checklist
1. **Create OAuth Client** in Google Cloud Console.
2. Under **Authorized JavaScript origins**, add:
   ```
   https://iwant2study.org
   ```
3. Copy the **Client ID** and **Client Secret** into `.env`:
   ```env
   GOOGLE_OAUTH_CLIENT_ID=your_client_id
   GOOGLE_OAUTH_CLIENT_SECRET=your_client_secret
   AUTH_SESSION_TTL_HOURS=24
   ```
4. Restart the Node server.

### How it works
- Users sign in with Google on the web UI.
- Server verifies the ID token and requires `@moe.edu.sg` email.
- Verified users get a session cookie that unlocks server keys.

If you do not configure OAuth, users can still use the tool with **their own API key**.

## Deployment to iwant2study.org

### Using PM2 for Production

1. **Install PM2 globally:**
   ```bash
   npm install -g pm2
   ```

2. **Start with PM2:**
   ```bash
   pm2 start server.js --name xapi-integrator
   pm2 save
   pm2 startup
   ```

3. **Configure Nginx (reverse proxy):**
   ```nginx
   location /lookangejss/xapi-integrator/ {
       proxy_pass http://localhost:3000/;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
   }
   ```

4. **Monitor logs:**
   ```bash
   pm2 logs xapi-integrator
   ```

## Getting a Gemini API Key

1. Go to https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key
5. Add to your `.env` file:
   ```env
   GOOGLE_API_KEY=your_google_api_key_here
   ```

The Gemini API has a free tier with generous rate limits perfect for this use case.

## Security Notes

- API key should be stored in `.env` (never commit to Git)
- Uploaded files are temporary and auto-cleaned
- All ZIP processing is server-side for security
- CORS is configured for your domain
- File size limits prevent abuse

## Troubleshooting

### "Cannot find module 'express'"
Run `npm install` to install dependencies

### "GOOGLE_API_KEY not found"
Create `.env` file with your Gemini API key

### "Port 3000 already in use"
Change PORT in `.env` or kill existing process:
```bash
lsof -i :3000
kill -9 <PID>
```

### AI mode not working
- Check GOOGLE_API_KEY is valid
- Check network connection
- Check Gemini API quota/limits
- Review server logs with `npm run dev`

## License

MIT

## Support

For issues or feature requests, contact through the project repository.
