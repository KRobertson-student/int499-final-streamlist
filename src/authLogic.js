export const AUTH_STORAGE_KEY = 'streamlist_auth_session';

const DEFAULT_GOOGLE_CLIENT_ID =
  '695772842505-9khkgj68cm5f0s81dkkedo29v0p10l1j.apps.googleusercontent.com';

const viteEnv =
  typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : {};

export const GOOGLE_CLIENT_ID =
  viteEnv.VITE_GOOGLE_CLIENT_ID || DEFAULT_GOOGLE_CLIENT_ID;

function decodeBase64Url(value) {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);

  if (typeof globalThis.atob === 'function') {
    return globalThis.atob(`${base64}${padding}`);
  }

  return Buffer.from(`${base64}${padding}`, 'base64').toString('utf8');
}

function isAuthSession(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof value.id === 'string' &&
    value.id.trim().length > 0 &&
    typeof value.name === 'string' &&
    value.name.trim().length > 0 &&
    typeof value.email === 'string' &&
    value.email.includes('@') &&
    (value.provider === 'google' || value.provider === 'demo') &&
    typeof value.signedInAt === 'string'
  );
}

export function decodeGoogleCredential(credential, date = new Date()) {
  const payload = credential.split('.')[1];

  if (!payload) {
    throw new Error('Google credential is missing a payload.');
  }

  const claims = JSON.parse(decodeBase64Url(payload));

  return {
    id: String(claims.sub || ''),
    name: String(claims.name || 'Google User'),
    email: String(claims.email || ''),
    picture: typeof claims.picture === 'string' ? claims.picture : '',
    provider: 'google',
    signedInAt: date.toISOString(),
  };
}

export function createDemoUser(date = new Date()) {
  return {
    id: 'demo-user',
    name: 'Demo Manager',
    email: 'demo.manager@example.com',
    picture: '',
    provider: 'demo',
    signedInAt: date.toISOString(),
  };
}

export function loadAuthSession(storage) {
  if (!storage) {
    return null;
  }

  try {
    const storedSession = storage.getItem(AUTH_STORAGE_KEY);

    if (!storedSession) {
      return null;
    }

    const parsedSession = JSON.parse(storedSession);

    return isAuthSession(parsedSession) ? parsedSession : null;
  } catch {
    return null;
  }
}

export function saveAuthSession(storage, session) {
  if (!storage || !isAuthSession(session)) {
    return false;
  }

  try {
    storage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    return true;
  } catch {
    return false;
  }
}

export function clearAuthSession(storage) {
  if (!storage) {
    return false;
  }

  try {
    storage.removeItem(AUTH_STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}
