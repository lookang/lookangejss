#!/bin/bash

echo "==================================="
echo "App Builder Server Setup Script"
echo "==================================="

# Install PM2 if not already installed
echo "Installing PM2 for process management..."
npm install -g pm2

# Start the server with PM2
echo "Starting server with PM2..."
pm2 start server.js --name "appBuilder"

# Save PM2 configuration
echo "Saving PM2 configuration..."
pm2 save

# Set up PM2 to start on system boot
echo "Setting up auto-start on boot..."
pm2 startup

# Show status
echo "==================================="
echo "Server Status:"
pm2 status

echo ""
echo "==================================="
echo "✅ Server is now running!"
echo "==================================="
echo ""
echo "Next steps:"
echo "1. Configure your web server (Apache/Nginx) to proxy to port 3001"
echo "2. Test at: https://iwant2study.org/lookangejss/appBuilder/"
echo ""
echo "Useful PM2 commands:"
echo "  pm2 logs appBuilder    - View logs"
echo "  pm2 restart appBuilder - Restart server"
echo "  pm2 stop appBuilder    - Stop server"
echo "  pm2 status            - Check status"
echo "==================================="
