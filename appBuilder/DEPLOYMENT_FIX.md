# Fixing the Backend Proxy Error

## The Problem
Your app is getting a "Backend proxy error: 404" because it's trying to call API endpoints (`/api/claude`, `/api/openai`, `/api/gemini`) that don't exist on your static web server. The app needs a Node.js backend server to proxy these API calls.

## Solution Options

### Option 1: Deploy as a Node.js Application (If your host supports Node.js)
If iwant2study.org supports Node.js hosting:

1. Upload ALL project files (not just dist folder) to your server
2. Install dependencies on the server: `npm install`
3. Set up environment variables on the server (.env file):
   ```
   CLAUDE_API_KEY=your_claude_api_key
   OPENAI_API_KEY=your_openai_api_key
   GEMINI_API_KEY=your_gemini_api_key
   PORT=3001
   ```
4. Start the server: `node server.js`
5. Configure your web server to proxy requests to the Node.js app running on port 3001

### Option 2: Use Direct API Calls (Static Hosting Only)
If you can only use static hosting, we need to modify the app to call APIs directly from the browser:

**Note:** This approach exposes your API keys in the browser, which is NOT secure for production use.

### Option 3: Use a Separate Backend Service
Deploy the backend server separately (e.g., on Vercel, Netlify, Render, or Railway) and update the app to use that backend URL.

## Quick Fix for Testing (NOT SECURE)
To quickly test if the app works, we can modify it to use the Gemini API directly from the browser (since it's already configured in the build):

1. The app should fall back to using Gemini API directly
2. Make sure your GEMINI_API_KEY is set in the build

## Recommended Solution
For production use, you should either:
1. Deploy with a Node.js backend (Option 1)
2. Use a serverless backend service like Vercel or Netlify Functions (Option 3)

## Current Status
- ✅ Static files are correctly deployed with proper paths
- ❌ Backend API proxy is not available on static hosting
- ⚠️ The app needs backend endpoints to function properly
