# Deployment Guide for iwant2study.org

This guide explains how to deploy the xAPI Integrator with Gemini AI Agent to your production server.

## Prerequisites

- Node.js 16+ installed on your server
- SSH access to iwant2study.org
- PM2 or systemd for process management
- Nginx (already installed on your server)
- Gemini API key from https://makersuite.google.com/app/apikey

## Step 1: Deploy to Server

### 1.1 SSH into your server

```bash
ssh user@iwant2study.org
cd /var/www/lookangejss
```

### 1.2 Clone or copy the project

If using git:
```bash
git clone <repo-url> xapi-integrator
cd xapi-integrator
```

Or copy the files directly:
```bash
mkdir -p xapi-integrator
cd xapi-integrator
# Copy all project files here
```

### 1.3 Install dependencies

```bash
npm install --production
```

This installs only production dependencies:
- express
- multer (file upload)
- jszip (ZIP processing)
- @google-ai/generative-ai (Gemini API)
- cors
- dotenv

## Step 2: Configure Environment

### 2.1 Create .env file

```bash
nano .env
```

Add these variables:

```env
PORT=3001
NODE_ENV=production
GOOGLE_API_KEY=your_gemini_api_key_here
UPLOAD_DIR=/var/www/lookangejss/xapi-integrator/uploads
DOWNLOAD_DIR=/var/www/lookangejss/xapi-integrator/downloads
MAX_FILE_SIZE=52428800
CORS_ORIGIN=https://iwant2study.org
```

**Get your Gemini API key:**
1. Go to https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy and paste into .env

### 2.2 Create required directories

```bash
mkdir -p uploads downloads
chmod 755 uploads downloads
```

## Step 3: Set Up Process Manager

### Option A: Using PM2 (Recommended)

#### 3A.1 Install PM2 globally

```bash
sudo npm install -g pm2
```

#### 3A.2 Start the application

```bash
pm2 start server.js --name xapi-integrator --env production
pm2 save
pm2 startup
```

#### 3A.3 Check status

```bash
pm2 status
pm2 logs xapi-integrator
```

#### 3A.4 Auto-restart on reboot

```bash
sudo env PATH=$PATH:/usr/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u www-data --hp /var/www
```

### Option B: Using Systemd

#### 3B.1 Create service file

```bash
sudo nano /etc/systemd/system/xapi-integrator.service
```

Add this content:

```ini
[Unit]
Description=xAPI Integrator with Gemini AI
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/lookangejss/xapi-integrator
Environment="NODE_ENV=production"
EnvironmentFile=/var/www/lookangejss/xapi-integrator/.env
ExecStart=/usr/bin/node server.js
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

#### 3B.2 Enable and start

```bash
sudo systemctl daemon-reload
sudo systemctl enable xapi-integrator
sudo systemctl start xapi-integrator
sudo systemctl status xapi-integrator
```

#### 3B.3 View logs

```bash
sudo journalctl -u xapi-integrator -f
```

## Step 4: Configure Nginx Reverse Proxy

### 4.1 Create Nginx config

```bash
sudo nano /etc/nginx/sites-available/xapi-integrator
```

Add this configuration:

```nginx
upstream xapi_backend {
    server 127.0.0.1:3001;
    keepalive 64;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name iwant2study.org;

    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/key.pem;

    # xAPI Integrator
    location /lookangejss/xapi-integrator/ {
        proxy_pass http://xapi_backend/;
        proxy_http_version 1.1;
        
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        proxy_cache_bypass $http_upgrade;
        proxy_redirect off;
        
        # File upload settings
        client_max_body_size 50m;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static files
    location /lookangejss/xapi-integrator/public/ {
        alias /var/www/lookangejss/xapi-integrator/public/;
        expires 1h;
    }
}
```

### 4.2 Enable the configuration

```bash
sudo ln -s /etc/nginx/sites-available/xapi-integrator /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Step 5: Verification

### 5.1 Test the application

```bash
# Check if service is running
pm2 status
# or
sudo systemctl status xapi-integrator

# Check logs
pm2 logs xapi-integrator
# or
sudo journalctl -u xapi-integrator -f
```

### 5.2 Test the endpoint

```bash
curl https://iwant2study.org/lookangejss/xapi-integrator/api/status
```

You should see:
```json
{
  "status": "ok",
  "version": "1.0.0",
  "features": {
    "aiAgent": true,
    "timelineMode": true,
    "quizMode": true,
    "minimalMode": true
  },
  "environment": "production"
}
```

### 5.3 Test in browser

1. Open https://iwant2study.org/lookangejss/xapi-integrator/
2. You should see the upload interface with 4 radio button modes
3. Try uploading a test ZIP file

## Step 6: Maintenance

### View real-time logs

```bash
# PM2
pm2 logs xapi-integrator --lines 100 --follow

# Systemd
sudo journalctl -u xapi-integrator -f
```

### Restart application

```bash
# PM2
pm2 restart xapi-integrator

# Systemd
sudo systemctl restart xapi-integrator
```

### Monitor performance

```bash
# PM2
pm2 monit

# Or check server resources
htop
```

### Clean up old files

The application auto-cleans files older than 24 hours from uploads/ and downloads/ directories. You can manually cleanup:

```bash
find /var/www/lookangejss/xapi-integrator/uploads -mtime +1 -delete
find /var/www/lookangejss/xapi-integrator/downloads -mtime +1 -delete
```

### Update dependencies

```bash
cd /var/www/lookangejss/xapi-integrator
npm update
pm2 restart xapi-integrator
```

## Step 7: SSL/HTTPS Setup

If using Let's Encrypt:

```bash
sudo certbot certonly --nginx -d iwant2study.org
```

Then update the Nginx config with the certificate paths and reload.

## Troubleshooting

### Port 3001 already in use

```bash
lsof -i :3001
kill -9 <PID>
```

### GOOGLE_API_KEY not working

1. Verify the key is correct in .env
2. Check API key is active in Google Cloud Console
3. Ensure Generative Language API is enabled
4. Check rate limits: https://console.cloud.google.com/

### Uploads failing

1. Check upload directory permissions:
   ```bash
   ls -la /var/www/lookangejss/xapi-integrator/uploads
   chmod 755 uploads
   ```

2. Check disk space:
   ```bash
   df -h /var/www
   ```

3. Check file size limit in Nginx (should be 50m):
   ```bash
   grep client_max_body_size /etc/nginx/sites-enabled/xapi-integrator
   ```

### AI mode not working

1. Check API key is set:
   ```bash
   grep GOOGLE_API_KEY .env
   ```

2. Test API connectivity:
   ```bash
   curl https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=YOUR_KEY
   ```

3. Check logs:
   ```bash
   pm2 logs xapi-integrator | grep -i gemini
   ```

## Performance Tuning

### Node.js cluster mode (PM2)

For multi-core servers, use cluster mode:

```bash
pm2 start server.js --name xapi-integrator -i max --env production
```

### Nginx caching

Add to Nginx config:

```nginx
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=xapi_cache:10m;

location /lookangejss/xapi-integrator/api/download/ {
    proxy_cache xapi_cache;
    proxy_cache_valid 200 1h;
}
```

### Increase max file size if needed

In .env:
```env
MAX_FILE_SIZE=104857600  # 100MB instead of 50MB
```

In Nginx config:
```nginx
client_max_body_size 100m;
```

## Backup Strategy

### Daily backup

```bash
# Create cron job
crontab -e
```

Add:
```cron
0 2 * * * tar -czf /backups/xapi-integrator-$(date +\%Y\%m\%d).tar.gz /var/www/lookangejss/xapi-integrator/.env
```

### Database/State (if added in future)

Store in a separate secure location or database.

## Security Considerations

1. **API Key**: Keep .env file secure, never commit to git
2. **File uploads**: Validate ZIP contents server-side (already done)
3. **CORS**: Set appropriate CORS_ORIGIN in production
4. **Rate limiting**: Add to Nginx if needed
5. **HTTPS**: Always use HTTPS in production
6. **Firewall**: Restrict access if needed

## Support and Updates

- Check logs regularly
- Monitor Gemini API usage and quotas
- Keep Node.js and npm updated
- Update packages monthly: `npm update`

## Additional Resources

- Node.js: https://nodejs.org
- Express.js: https://expressjs.com
- PM2: https://pm2.keymetrics.io
- Gemini API: https://ai.google.dev
- Nginx: https://nginx.org

---

For issues, check:
1. Application logs: `pm2 logs xapi-integrator`
2. Nginx logs: `/var/log/nginx/error.log`
3. System logs: `journalctl -xe`
