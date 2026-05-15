import crypto from 'crypto';

const SESSION_COOKIE = 'moe_session';
const DEFAULT_TTL_HOURS = 24;
const sessions = new Map();

function getTtlMs() {
  const hours = Number(process.env.AUTH_SESSION_TTL_HOURS || DEFAULT_TTL_HOURS);
  return Number.isFinite(hours) && hours > 0 ? hours * 60 * 60 * 1000 : DEFAULT_TTL_HOURS * 60 * 60 * 1000;
}

function parseCookies(header) {
  const cookies = {};
  if (!header) return cookies;
  const parts = header.split(';');
  for (const part of parts) {
    const [rawKey, ...rest] = part.trim().split('=');
    if (!rawKey) continue;
    cookies[rawKey] = decodeURIComponent(rest.join('=') || '');
  }
  return cookies;
}

export function createSession({ email }) {
  const token = crypto.randomUUID();
  sessions.set(token, {
    email,
    moeVerified: true,
    createdAt: Date.now()
  });
  return token;
}

export function getSession(token) {
  if (!token) return null;
  const session = sessions.get(token);
  if (!session) return null;
  const ttlMs = getTtlMs();
  if (Date.now() - session.createdAt > ttlMs) {
    sessions.delete(token);
    return null;
  }
  return session;
}

export function deleteSession(token) {
  if (token) sessions.delete(token);
}

export function attachAuthSession(req, res, next) {
  const cookies = parseCookies(req?.headers?.cookie || '');
  const token = cookies[SESSION_COOKIE];
  const session = getSession(token);
  req.auth = session
    ? { ...session, token }
    : { moeVerified: false, token: null, email: null };
  next();
}

export function getSessionCookieName() {
  return SESSION_COOKIE;
}