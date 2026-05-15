// Node/Passenger entry point. Delegates to the actual HTTP server.
// This file exists because some cPanel/Passenger setups default to app.js as the startup file.
// The browser bundle is now app.client.js and is referenced from index.html.
require('./server.js');
