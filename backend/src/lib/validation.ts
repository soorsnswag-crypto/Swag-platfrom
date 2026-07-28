import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

export const paginationSchema = {
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
};

export const uuidSchema = z.string().uuid('Invalid UUID format');

export const usernameSchema = z
  .string()
  .min(3, 'Username must be at least 3 characters')
  .max(30, 'Username must be at most 30 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores');

export const emailSchema = z.string().email('Invalid email format');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be at most 128 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const bioSchema = z.string().max(200, 'Bio must be at most 200 characters').optional();

export const captionSchema = z.string().max(500, 'Caption must be at most 500 characters');

export const visibilitySchema = z.enum(['public', 'private', 'followers']);

export { z, zValidator };
