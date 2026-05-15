# Node.js Deployment Guide for iwant2study.org

## Prerequisites Completed
✅ Node.js installed on your server

## Full Application Deployment Steps

### Step 1: Upload All Project Files
Upload your ENTIRE project folder to your server at `/lookangejss/appBuilder/` including:
- All source files (*.tsx, *.ts, *.json)
- `package.json` and `package-lock.json`
- `server.js`
- `.env` file (with your API keys)
- All folders: `components/`, `services/`, `public/`, etc.
- The `dist/` folder (already built)

### Step 2: Set Up Environment Variables
Create or update the `.env` file on your server with your API keys:
```bash
CLAUDE_API_KEY=your_claude_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
```

### Step 3: Install Dependencies on Server
SSH into your server and navigate to the project directory:
```bash
cd /path/to/lookangejss/appBuilder/
npm install
```

### Step 4: Build the Application (if needed)
If you haven't uploaded the dist folder or need to rebuild:
```bash
npm run build
```

### Step 5: Start the Node.js Server
```bash
node server.js
```
Or for production with PM2 (recommended):
```bash
# Install PM2 globally if not installed
npm install -g pm2

# Start the application with PM2
pm2 start server.js --name "appBuilder"

# Save PM2 configuration
pm2 save

# Set PM2 to start on system boot
pm2 startup
```

### Step 6: Configure Web Server Proxy
You need to configure your web server (Apache/Nginx) to proxy requests to your Node.js app.

#### For Apache (.htaccess in /lookangejss/appBuilder/):
```apache
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://localhost:3001/$1 [P,L]
```

#### For Nginx:
```nginx
location /lookangejss/appBuilder/ {
    proxy_pass http://localhost:3001/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

### Step 7: Update Base Path Configuration
Since your app is now running with Node.js backend, update `vite.config.ts`:
```javascript
base: '/', // Change back to root since Node.js will handle routing
```

Then rebuild:
```bash
npm run build
```

## Verify Installation

### Check if Node.js server is running:
```bash
# Check if process is running
ps aux | grep node

# If using PM2
pm2 status
```

### Test the endpoints:
1. Health check: `curl http://localhost:3001/api/health`
2. Visit: https://iwant2study.org/lookangejss/appBuilder/

## Troubleshooting

### If the app doesn't load:
1. Check Node.js server logs:
   ```bash
   pm2 logs appBuilder
   ```

2. Verify port 3001 is not blocked:
   ```bash
   netstat -tlnp | grep 3001
   ```

3. Check web server error logs:
   - Apache: `/var/log/apache2/error.log`
   - Nginx: `/var/log/nginx/error.log`

### If API calls fail:
1. Verify `.env` file has correct API keys
2. Restart the Node.js server after updating `.env`:
   ```bash
   pm2 restart appBuilder
   ```

## Production Best Practices

1. **Use PM2** for process management
2. **Set up SSL** if not already configured
3. **Monitor logs** regularly
4. **Set up automatic restarts** on server reboot
5. **Configure firewall** to block direct access to port 3001

## Current Status
- ✅ Node.js installed on server
- ✅ Application built locally
- ⏳ Waiting for server deployment
- ⏳ Waiting for proxy configuration

Once properly configured, your app will:
- Run at https://iwant2study.org/lookangejss/appBuilder/
- Have full backend API support for Claude, OpenAI, and Gemini
- Handle all API calls securely through the backend proxy
