import { createMiddleware } from 'hono/factory';
import type { Env, AuthTokenPayload } from '../types';
import { verifyToken } from '../lib/jwt';
import { AuthError, ForbiddenError } from '../lib/errors';

declare module 'hono' {
  interface ContextVariableMap {
    user: AuthTokenPayload;
  }
}

export const authenticate = createMiddleware<{ Bindings: Env }>(async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AuthError('Missing or invalid Authorization header');
  }

  const token = authHeader.slice(7);
  const payload = await verifyToken(token, c.env.JWT_SECRET);
  c.set('user', payload);
  await next();
});

export const optionalAuth = createMiddleware<{ Bindings: Env }>(async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.slice(7);
      const payload = await verifyToken(token, c.env.JWT_SECRET);
      c.set('user', payload);
    } catch {
      // Token invalid, continue without auth
    }
  }
  await next();
});

export function requireRole(...roles: string[]) {
  return createMiddleware<{ Bindings: Env }>(async (c, next) => {
    const user = c.get('user');
    if (!user) {
      throw new AuthError('Authentication required');
    }
    if (!roles.includes(user.role)) {
      throw new ForbiddenError('Insufficient permissions');
    }
    await next();
  });
}

export function requireSelfOrAdmin(userIdParam: string = 'id') {
  return createMiddleware<{ Bindings: Env }>(async (c, next) => {
    const user = c.get('user');
    if (!user) {
      throw new AuthError('Authentication required');
    }
    const targetId = c.req.param(userIdParam);
    if (user.sub !== targetId && user.role !== 'admin') {
      throw new ForbiddenError('You can only modify your own resources');
    }
    await next();
  });
}
