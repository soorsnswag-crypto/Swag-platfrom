import type { AuthTokenPayload } from '../types';
import { AuthError } from './errors';

function base64UrlEncode(data: ArrayBuffer): string {
  const bytes = new Uint8Array(data);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlDecode(str: string): Uint8Array {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function hmacSha256(secret: string, data: string): Promise<ArrayBuffer> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  return crypto.subtle.sign('HMAC', key, enc.encode(data));
}

export async function createToken(
  payload: Omit<AuthTokenPayload, 'iat' | 'exp'>,
  secret: string,
  expiresIn: number = 86400
): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const fullPayload: AuthTokenPayload = {
    ...payload,
    iat: now,
    exp: now + expiresIn,
  };

  const headerStr = base64UrlEncode(new TextEncoder().encode(JSON.stringify(header)));
  const payloadStr = base64UrlEncode(new TextEncoder().encode(JSON.stringify(fullPayload)));
  const signature = await hmacSha256(secret, `${headerStr}.${payloadStr}`);
  const signatureStr = base64UrlEncode(signature);

  return `${headerStr}.${payloadStr}.${signatureStr}`;
}

export async function verifyToken(token: string, secret: string): Promise<AuthTokenPayload> {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new AuthError('Invalid token format');
  }

  const [headerStr, payloadStr, signatureStr] = parts;

  const expectedSignature = await hmacSha256(secret, `${headerStr}.${payloadStr}`);
  const expectedStr = base64UrlEncode(expectedSignature);

  if (signatureStr !== expectedStr) {
    throw new AuthError('Invalid token signature');
  }

  const payload: AuthTokenPayload = JSON.parse(
    new TextDecoder().decode(base64UrlDecode(payloadStr))
  );

  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
    throw new AuthError('Token expired', 'TOKEN_EXPIRED');
  }

  return payload;
}
