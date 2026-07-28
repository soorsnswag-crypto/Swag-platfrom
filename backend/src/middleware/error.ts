import { Context, ErrorHandler } from 'hono';
import type { StatusCode } from 'hono/utils/http-status';
import { AppError } from '../lib/errors';
import { sendError } from '../lib/response';

export const errorHandler: ErrorHandler = (err, c: Context) => {
  if (err instanceof AppError) {
    return sendError(c, err.code, err.message, err.statusCode as StatusCode, err.details);
  }

  if (err instanceof SyntaxError) {
    return sendError(c, 'INVALID_JSON', 'Invalid JSON in request body', 400);
  }

  if (err instanceof TypeError) {
    return sendError(c, 'INTERNAL_ERROR', 'An unexpected error occurred', 500);
  }

  console.error('Unhandled error:', err);
  return sendError(c, 'INTERNAL_ERROR', 'An unexpected error occurred', 500);
};
