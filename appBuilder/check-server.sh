#!/bin/bash

echo "==================================="
echo "Server Diagnostic Check"
echo "==================================="
echo ""

# Check if Node.js server is running on port 3001
echo "1. Checking if Node.js server is running on port 3001..."
if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null ; then
    echo "   ✅ Server is running on port 3001"
else
    echo "   ❌ Server is NOT running on port 3001"
    echo "   Run: pm2 start server.js --name appBuilder"
fi
echo ""

# Check PM2 status
echo "2. Checking PM2 status..."
if command -v pm2 &> /dev/null; then
    pm2 status
else
    echo "   ❌ PM2 is not installed"
    echo "   Run: npm install -g pm2"
fi
echo ""

# Check if Apache mod_proxy is enabled
echo "3. Checking Apache modules..."
if httpd -M 2>/dev/null | grep -q proxy_module; then
    echo "   ✅ mod_proxy is enabled"
elif apache2ctl -M 2>/dev/null | grep -q proxy_module; then
    echo "   ✅ mod_proxy is enabled"
else
    echo "   ⚠️  Cannot verify if mod_proxy is enabled"
    echo "   You may need to enable it in Apache configuration"
fi
echo ""

# Test API endpoint
echo "4. Testing API health endpoint..."
if curl -s http://localhost:3001/api/health > /dev/null; then
    echo "   ✅ API is responding"
    curl -s http://localhost:3001/api/health | head -n 5
else
    echo "   ❌ API is not responding"
fi
echo ""

echo "==================================="
echo "Quick Fix Commands:"
echo "==================================="
echo ""
echo "If server is not running:"
echo "  pm2 start server.js --name appBuilder"
echo ""
echo "If PM2 is not installed:"
echo "  npm install -g pm2"
echo ""
echo "To view logs:"
echo "  pm2 logs appBuilder"
echo ""
echo "To restart server:"
echo "  pm2 restart appBuilder"
echo "==================================="
