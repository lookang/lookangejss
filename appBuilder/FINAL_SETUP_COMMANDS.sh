#!/bin/bash

echo "==================================="
echo "Final Setup Commands for appBuilder"
echo "==================================="
echo ""

# Save PM2 configuration
echo "1. Saving PM2 configuration..."
pm2 save
echo "   ✅ PM2 configuration saved"
echo ""

# Set PM2 to start on boot
echo "2. Setting PM2 to start on system boot..."
echo "   Run the command that PM2 suggests below:"
pm2 startup
echo ""
echo "   ⚠️  IMPORTANT: Copy and run the command shown above with sudo"
echo ""

# Check server status
echo "3. Checking server status..."
pm2 status appBuilder
echo ""

# Test API endpoint
echo "4. Testing API health endpoint..."
curl -s http://localhost:3001/api/health | python -m json.tool 2>/dev/null || curl -s http://localhost:3001/api/health
echo ""

# Show logs
echo "5. Recent server logs:"
pm2 logs appBuilder --lines 5 --nostream
echo ""

echo "==================================="
echo "✅ SETUP COMPLETE!"
echo "==================================="
echo ""
echo "Your Node.js server is now running!"
echo ""
echo "Next steps:"
echo "1. Upload the dist/.htaccess file to your server"
echo "2. Make sure Apache mod_proxy is enabled"
echo "3. Test your app at: https://iwant2study.org/lookangejss/appBuilder/dist/"
echo ""
echo "Useful PM2 commands:"
echo "  pm2 logs appBuilder     - View logs"
echo "  pm2 restart appBuilder  - Restart server"
echo "  pm2 stop appBuilder     - Stop server"
echo "  pm2 status             - Check status"
echo "==================================="
