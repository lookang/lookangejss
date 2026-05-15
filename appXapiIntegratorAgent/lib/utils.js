import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function ensureDirectories() {
  const dirs = [
    process.env.UPLOAD_DIR || './uploads',
    process.env.DOWNLOAD_DIR || './downloads'
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✓ Created directory: ${dir}`);
    }
  });
}

export function cleanupOldFiles(dir, ageHours = 24) {
  if (!fs.existsSync(dir)) return;
  
  const now = Date.now();
  const ageMs = ageHours * 60 * 60 * 1000;
  
  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file);
    const stats = fs.statSync(filepath);
    
    if (now - stats.mtimeMs > ageMs) {
      try {
        fs.unlinkSync(filepath);
        console.log(`✓ Cleaned up old file: ${file}`);
      } catch (err) {
        console.error(`Error cleaning up ${file}:`, err);
      }
    }
  });
}

export function getProjectRoot() {
  return path.dirname(__dirname);
}

export function joinPath(...parts) {
  return parts
    .filter(Boolean)
    .map(p => String(p).replace(/^\/+|\/+$/g, ''))
    .filter(p => p.length > 0)
    .join('/')
    + (String(parts[parts.length - 1]).endsWith('/') ? '/' : '');
}

export function normalizeEndpoint(ep) {
  if (!ep) return '';
  return ep.endsWith('/') ? ep : ep + '/';
}

export function sanitizeFilename(filename) {
  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .substring(0, 255);
}

export async function loadVendorLibs() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const projectRoot = path.dirname(__dirname);
  
  try {
    const wrapperPath = path.join(projectRoot, 'vendor', 'xapiwrapper.min.js');
    const gluePath = path.join(projectRoot, 'vendor', 'xAPI.js');
    
    const wrapper = fs.readFileSync(wrapperPath, 'utf-8');
    const glue = fs.readFileSync(gluePath, 'utf-8');
    
    return { wrapper, glue };
  } catch (err) {
    throw new Error(`Failed to load vendor libraries: ${err.message}`);
  }
}

function parseAllowedDomains() {
  const raw = (process.env.ALLOWED_DOMAINS ?? 'moe.edu.sg').trim();
  if (!raw) return [];
  return raw
    .split(',')
    .map(d => d.trim().toLowerCase())
    .filter(Boolean);
}

export function getAllowedDomains() {
  return parseAllowedDomains();
}

function stripPort(host) {
  if (!host) return '';
  if (host.startsWith('[')) {
    const end = host.indexOf(']');
    if (end !== -1) return host.slice(1, end).toLowerCase();
  }
  return host.split(':')[0].toLowerCase();
}

function extractHost(value) {
  if (!value) return '';
  const first = String(value).split(',')[0].trim();
  if (!first) return '';
  try {
    if (first.includes('://')) {
      return stripPort(new URL(first).host);
    }
  } catch {
    // Fall back to raw parsing
  }
  return stripPort(first);
}

export function getRequestHost(req) {
  const headers = req?.headers || {};
  const forwarded = headers['x-forwarded-host'];
  const origin = headers.origin;
  const referer = headers.referer;
  const host = headers.host;

  return (
    extractHost(forwarded) ||
    extractHost(origin) ||
    extractHost(referer) ||
    extractHost(host)
  );
}

function hostMatchesDomain(host, domain) {
  if (!host || !domain) return false;
  const clean = domain.replace(/^\*\./, '');
  if (!clean) return false;
  if (host === clean) return true;
  return host.endsWith(`.${clean}`);
}

export function isRequestFromAllowedDomain(req) {
  const host = getRequestHost(req);
  if (!host) return false;

  const localhostSet = new Set(['localhost', '127.0.0.1', '::1']);
  if (localhostSet.has(host)) return true;

  const allowed = getAllowedDomains();
  return allowed.some(domain => hostMatchesDomain(host, domain));
}

export function isServerKeyAllowed(req) {
  if (req?.auth?.moeVerified) return true;
  return isRequestFromAllowedDomain(req);
}
