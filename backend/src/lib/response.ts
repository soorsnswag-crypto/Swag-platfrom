import { Context } from 'hono';
import { StatusCode } from 'hono/utils/http-status';
import type { ApiResponse, ApiError } from '../types';

export function sendSuccess<T>(
  c: Context,
  data: T,
  message?: string,
  status: StatusCode = 200,
  meta?: ApiResponse['meta']
): Response {
  const body: ApiResponse<T> = {
    success: true,
    data,
    message,
    meta,
  };
  return c.json(body, status);
}

export function sendError(
  c: Context,
  code: string,
  message: string,
  status: StatusCode = 400,
  details?: Record<string, string[]>
): Response {
  const body: ApiError = {
    success: false,
    error: { code, message, details },
  };
  return c.json(body, status);
}

export function sendPaginated<T>(
  c: Context,
  data: T[],
  total: number,
  page: number,
  limit: number
): Response {
  return sendSuccess(c, data, undefined, 200, {
    page,
    limit,
    total,
    hasMore: page * limit < total,
  });
}
