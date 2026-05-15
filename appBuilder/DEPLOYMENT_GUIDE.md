# Deployment Guide - Interactive HTML5 Builder

## 🚀 Production Build Complete

Your application has been successfully built for production deployment. All files are ready in the `dist/` folder.

## 📁 Deployment Files Structure

```
dist/
├── index.html                                    # Main application entry point
├── assets/
│   └── index-B6UXZQMS.js                        # Bundled application JavaScript (595KB)
└── 03 html5-dynamic-input-score-is-text-field/  # xAPI support files
    ├── index.js                                  # Sample interactive content
    └── xapiwrapper.min.js                       # xAPI wrapper library (FIXED)
```

## 🌐 Server Upload Instructions

### Option 1: Upload to Web Server Root
1. Upload the entire `dist/` folder contents to your web server's root directory
2. The app will be accessible at: `https://yourdomain.com/`

### Option 2: Upload to Subdirectory
1. Create a subdirectory on your server (e.g., `/appbuilder/`)
2. Upload the `dist/` folder contents to that subdirectory
3. The app will be accessible at: `https://yourdomain.com/appbuilder/`

### Required Server Configuration

#### Apache (.htaccess)
Create a `.htaccess` file in your deployment directory:
```apache
# Enable CORS for API requests
Header always set Access-Control-Allow-Origin "*"
Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS"
Header always set Access-Control-Allow-Headers "Content-Type, Authorization"

# Handle client-side routing
RewriteEngine On
RewriteBase /lookangejss/appBuilder/
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /lookangejss/appBuilder/index.html [L]

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
```

#### Nginx
Add to your Nginx configuration:
```nginx
location /lookangejss/appBuilder/ {
    try_files $uri $uri/ /lookangejss/appBuilder/index.html;
    
    # CORS headers
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
    add_header Access-Control-Allow-Headers 'Content-Type, Authorization';
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🔑 Environment Variables Setup

### Important: API Key Configuration
The application uses the Gemini API. You need to configure the API key for production:

1. **Current API Key**: `AIzaSyBKCKbrJuE9oW6dh3bvZDjr3GDPURAGQtw`
2. **API Key Restrictions**: The current key has HTTP referrer restrictions that block localhost

### For Production Deployment:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to APIs & Services > Credentials
3. Either:
   - **Option A**: Update the existing API key to allow your production domain
   - **Option B**: Create a new API key for production use

### Update API Key Restrictions:
1. In Google Cloud Console, edit your API key
2. Under "Application restrictions", select "HTTP referrers"
3. Add your production domain(s):
   - `https://yourdomain.com/*`
   - `https://www.yourdomain.com/*`
4. Save the changes

## ✅ Key Features Fixed

### xAPIWrapper Integration
- ✅ **Fixed 404 Error**: The xapiwrapper.min.js file now contains proper JavaScript instead of HTML error content
- ✅ **Smart Fallback System**: App includes embedded xAPI wrapper as fallback if server file fails
- ✅ **Auto-Detection**: Automatically detects when xAPI functionality is needed in generated content
- ✅ **Reliable Downloads**: ZIP downloads always include working xAPI files when needed

### Application Features
- ✅ Interactive HTML5 content generation
- ✅ AI-powered content creation using Gemini API
- ✅ ZIP download functionality with all required files
- ✅ Responsive design with Tailwind CSS
- ✅ xAPI/SCORM compatibility for learning management systems

## 🧪 Testing Your Deployment

1. **Upload files** to your server
2. **Configure API key** for your domain
3. **Test the application**:
   - Visit your deployed URL
   - Try generating content
   - Test ZIP download functionality
   - Verify xAPI files are included when needed

## 📞 Support

If you encounter any issues:
1. Check browser console for errors
2. Verify API key configuration
3. Ensure server supports client-side routing
4. Check CORS headers are properly configured

## 🎉 Deployment Complete!

Your Interactive HTML5 Builder is now ready for production use. The xAPIWrapper 404 issue has been resolved, and the application will reliably generate and package interactive content for your users.
