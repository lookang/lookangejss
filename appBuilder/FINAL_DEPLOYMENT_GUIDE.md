# Final Deployment Guide - Complete Solution

## ✅ Current Status
- Node.js server is running with PM2 (PID: 1899670)
- Application rebuilt with PHP proxy support
- All necessary files created

## 🚨 Fix the 500 Internal Server Error

### Step 1: Remove the problematic .htaccess
On your server, delete or rename the current .htaccess file that's causing the 500 error:
```bash
cd /home/iwtstudy/public_html/lookangejss/appBuilder/dist/
mv .htaccess .htaccess.backup
```

### Step 2: Upload these files to `/home/iwtstudy/public_html/lookangejss/appBuilder/dist/`

1. **api-proxy.php** - PHP proxy to connect to Node.js backend
2. **.htaccess-simple** - Rename this to `.htaccess` after uploading
3. **index.html** - Updated main HTML file
4. **assets/index-sa5xvFOG.js** - Updated JavaScript with PHP proxy support

## 📁 Files to Upload

### Required Files:
```
dist/
├── api-proxy.php          ← NEW: PHP proxy (upload this!)
├── .htaccess-simple       ← Upload and rename to .htaccess
├── index.html             ← Already there, but re-upload the updated version
├── index.css              ← Already uploaded
└── assets/
    └── index-sa5xvFOG.js  ← Re-upload this (updated with PHP proxy)
```

## 🔧 How the Solution Works

1. **PHP Proxy** (`api-proxy.php`):
   - Receives API requests from the frontend
   - Forwards them to Node.js server on port 3001
   - Returns responses back to the frontend
   - Works even if Apache mod_proxy is not enabled

2. **Simple .htaccess**:
   - Only handles React Router routing
   - No proxy rules (avoiding the 500 error)
   - PHP proxy handles the API forwarding

3. **Updated Frontend**:
   - Automatically detects when running on iwant2study.org
   - Routes API calls through api-proxy.php
   - Falls back to direct Node.js for local development

## 📋 Quick Test

After uploading the files:

1. **Test the PHP proxy directly**:
   ```
   https://iwant2study.org/lookangejss/appBuilder/dist/api-proxy.php/api/health
   ```
   Should return: `{"status":"OK","timestamp":"...","availableAPIs":{...}}`

2. **Test the main app**:
   ```
   https://iwant2study.org/lookangejss/appBuilder/dist/
   ```
   Should load without errors and API calls should work

## 🛠️ Troubleshooting

If API calls still fail:
1. Check PM2 status: `pm2 status appBuilder`
2. Check PM2 logs: `pm2 logs appBuilder`
3. Test Node.js directly: `curl http://localhost:3001/api/health`
4. Check PHP error logs on your server

## 💡 Commands Reference

```bash
# PM2 Management
pm2 status              # Check server status
pm2 logs appBuilder     # View logs
pm2 restart appBuilder  # Restart server
pm2 stop appBuilder     # Stop server
pm2 start server.js --name appBuilder  # Start if stopped

# Test endpoints
curl http://localhost:3001/api/health  # Test Node.js directly
```

## ✅ Success Checklist
- [ ] Removed/renamed problematic .htaccess
- [ ] Uploaded api-proxy.php
- [ ] Uploaded .htaccess-simple (renamed to .htaccess)
- [ ] Re-uploaded updated JavaScript files
- [ ] PM2 server is running
- [ ] API proxy test works
- [ ] App loads without errors

Once all items are checked, your app should be fully functional!
