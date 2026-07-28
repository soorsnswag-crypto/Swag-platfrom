import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { secureHeaders } from 'hono/secure-headers';
import type { Env } from './types';
import { errorHandler } from './middleware/error';
import { sendSuccess } from './lib/response';
import authRoutes from './modules/auth/routes';
import userRoutes from './modules/user/routes';

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors());
app.use('*', secureHeaders());
app.use('*', logger());

app.onError(errorHandler);

app.get('/api/v1/health', (c) => {
  return sendSuccess(c, {
    status: 'ok',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

app.route('/api/v1/auth', authRoutes);
app.route('/api/v1/users', userRoutes);

export default app;
