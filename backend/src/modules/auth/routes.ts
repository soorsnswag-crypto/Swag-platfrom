import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import type { Env } from '../../types';
import { sendSuccess, sendError } from '../../lib/response';
import { authPost, authGet } from '../../lib/auth-api';
import { createToken } from '../../lib/jwt';
import { authenticate } from '../../middleware/auth';
import { usernameSchema, emailSchema, passwordSchema } from '../../lib/validation';

const router = new Hono<{ Bindings: Env }>();

const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
});

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

const passwordResetSchema = z.object({
  email: emailSchema,
});

const updatePasswordSchema = z.object({
  password: passwordSchema,
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

// POST /register
router.post('/register', zValidator('json', registerSchema), async (c) => {
  const { email, password, username } = c.req.valid('json');
  const env = c.env;

  const { data, error } = await authPost<{ id: string; email: string }>(
    '/auth/v1/signup',
    { email, password, data: { username } },
    env
  );

  if (error) {
    if (error.status === 409) {
      return sendError(c, 'EMAIL_EXISTS', 'An account with this email already exists', 409);
    }
    return sendError(c, 'REGISTRATION_FAILED', error.message, 400);
  }

  if (!data?.id) {
    return sendError(c, 'REGISTRATION_FAILED', 'Failed to create user', 500);
  }

  const token = await createToken({ sub: data.id, role: 'user', email }, env.JWT_SECRET);

  return sendSuccess(c, {
    user: { id: data.id, email },
    token,
    tokenType: 'Bearer',
    expiresIn: 86400,
  }, 'Registration successful. Please verify your email.', 201);
});

// POST /login
router.post('/login', zValidator('json', loginSchema), async (c) => {
  const { email, password } = c.req.valid('json');
  const env = c.env;

  const { data, error } = await authPost<{
    access_token: string;
    refresh_token: string;
    user: { id: string; email: string };
  }>('/auth/v1/token?grant_type=password', { email, password }, env);

  if (error) {
    if (error.status === 400) {
      return sendError(c, 'INVALID_CREDENTIALS', 'Invalid email or password', 401);
    }
    return sendError(c, 'LOGIN_FAILED', error.message, 401);
  }

  const supabaseToken = data?.access_token;
  const userId = data?.user?.id;
  if (!supabaseToken || !userId) {
    return sendError(c, 'LOGIN_FAILED', 'Authentication failed', 500);
  }

  const userInfo = await authGet<{ email: string; user_metadata?: { username?: string } }>(
    '/auth/v1/user', env, supabaseToken
  );

  const appToken = await createToken(
    { sub: userId, role: 'user', email },
    env.JWT_SECRET
  );

  return sendSuccess(c, {
    user: {
      id: userId,
      email,
      username: userInfo.data?.user_metadata?.username,
    },
    accessToken: appToken,
    refreshToken: data.refresh_token,
    tokenType: 'Bearer',
    expiresIn: 86400,
  }, 'Login successful');
});

// POST /logout
router.post('/logout', authenticate, async (c) => {
  await authPost<Record<string, unknown>>('/auth/v1/logout', {}, c.env);
  return sendSuccess(c, null, 'Logged out successfully');
});

// POST /refresh
router.post('/refresh', zValidator('json', refreshSchema), async (c) => {
  const { refreshToken } = c.req.valid('json');
  const env = c.env;

  const { data, error } = await authPost<{
    access_token: string;
    refresh_token: string;
    user: { id: string; email: string };
  }>('/auth/v1/token?grant_type=refresh_token', { refresh_token: refreshToken }, env);

  if (error) {
    return sendError(c, 'TOKEN_EXPIRED', 'Refresh token is invalid or expired', 401);
  }

  const appToken = await createToken(
    { sub: data!.user.id, role: 'user', email: data!.user.email },
    env.JWT_SECRET
  );

  return sendSuccess(c, {
    accessToken: appToken,
    refreshToken: data!.refresh_token,
    tokenType: 'Bearer',
    expiresIn: 86400,
  }, 'Token refreshed');
});

// POST /password-reset
router.post('/password-reset', zValidator('json', passwordResetSchema), async (c) => {
  const { email } = c.req.valid('json');

  await authPost<Record<string, unknown>>('/auth/v1/recover', { email }, c.env);

  return sendSuccess(c, null, 'If the email exists, a reset link has been sent');
});

// POST /update-password
router.post('/update-password', authenticate, zValidator('json', updatePasswordSchema), async (c) => {
  const { password } = c.req.valid('json');

  const { error } = await authPost<Record<string, unknown>>(
    '/auth/v1/user', { password }, c.env, true
  );

  if (error) {
    return sendError(c, 'UPDATE_FAILED', error.message, 400);
  }

  return sendSuccess(c, null, 'Password updated successfully');
});

// GET /me
router.get('/me', authenticate, async (c) => {
  const user = c.get('user');

  const { data, error } = await authGet<{ email: string; user_metadata?: { username?: string } }>(
    '/auth/v1/user', c.env
  );

  if (error) {
    return sendError(c, 'USER_NOT_FOUND', error.message, 404);
  }

  return sendSuccess(c, {
    id: user.sub,
    email: user.email,
    username: data?.user_metadata?.username,
    role: user.role,
  });
});

// DELETE /account
router.delete('/account', authenticate, async (c) => {
  const user = c.get('user');

  const { error } = await authPost<Record<string, unknown>>(
    `/auth/v1/admin/users/${user.sub}/delete`, {}, c.env, true
  );

  if (error) {
    return sendError(c, 'DELETE_FAILED', error.message, 500);
  }

  return sendSuccess(c, null, 'Account deleted successfully');
});

export default router;
