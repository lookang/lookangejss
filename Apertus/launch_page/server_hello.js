// Minimal Passenger smoke-test server. Set Startup file to server_hello.js in cPanel.
const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const logPath = path.join(process.cwd(), 'hello_boot.log');
function log(msg){
  try { fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${msg}\n`); } catch {}
}

log(`Booting hello server. Node ${process.version}. CWD=${process.cwd()}`);

const server = http.createServer((req, res) => {
  if (req.url && req.url.endsWith('/healthz')) {
    const body = JSON.stringify({ ok: true, node: process.version, cwd: process.cwd() });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(body);
  }
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('OK');
});

server.listen(PORT, () => {
  log(`Hello server listening on ${PORT}`);
});
