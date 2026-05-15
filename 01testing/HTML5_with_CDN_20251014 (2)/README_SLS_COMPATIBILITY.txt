⚠️ SLS (Singapore Learning Space) Compatibility Warnings:

The following external dependencies were detected and downloaded:
• https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js
• https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css

🚨 IMPORTANT: ES6 Modules and Import Maps Limitation:
If your code uses ES6 modules (import/export) or import maps, it will NOT work
when opened directly as a file (file://) due to CORS restrictions.

✅ SOLUTION: Use the included local server
• Windows: Double-click "start_server.bat"
• Mac/Linux: Run "bash start_server.sh" or "python3 server.py"
• Then open http://localhost:8000 in your browser

Note: Some features may not work properly in SLS due to:
• Restricted internet access in SLS environment
• Content Security Policy limitations
• JavaScript execution restrictions
• ES6 module loading restrictions

All external files have been downloaded and included in this ZIP for offline use.
If you encounter issues in SLS, consider:
• Using simpler, vanilla JavaScript instead of complex libraries
• Avoiding external API calls
• Converting ES6 modules to regular script tags
• Testing thoroughly in the SLS environment
