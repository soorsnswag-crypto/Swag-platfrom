import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import type { Env } from '../../types';
import { sendSuccess, sendError, sendPaginated } from '../../lib/response';
import { query, update as dbUpdate, remove, insert } from '../../lib/supabase';
import { authenticate, requireSelfOrAdmin, optionalAuth } from '../../middleware/auth';
import { usernameSchema, bioSchema } from '../../lib/validation';

const router = new Hono<{ Bindings: Env }>();

const updateProfileSchema = z.object({
  displayName: z.string().max(50).optional(),
  bio: bioSchema,
  avatarUrl: z.string().url().optional(),
  coverUrl: z.string().url().optional(),
  website: z.string().url().optional().nullable(),
  location: z.string().max(100).optional(),
  isCreator: z.boolean().optional(),
});

// GET /:id
router.get('/:id', optionalAuth, async (c) => {
  const { id } = c.req.param();

  const { data, error } = await query<{
    id: string; username: string; display_name: string; bio: string;
    avatar_url: string; cover_url: string; website: string; location: string;
    is_verified: boolean; is_creator: boolean;
    follower_count: number; following_count: number; reel_count: number;
    total_likes: number; created_at: string;
  }>('profiles', c.env, { select: '*', eq: ['id', id] });

  if (error || !data || data.length === 0) {
    return sendError(c, 'NOT_FOUND', 'User not found', 404);
  }

  return sendSuccess(c, { profile: data[0] });
});

// PATCH /:id
router.patch('/:id', authenticate, requireSelfOrAdmin(), zValidator('json', updateProfileSchema), async (c) => {
  const { id } = c.req.param();
  const body = c.req.valid('json');

  const updateData: Record<string, unknown> = {};
  if (body.displayName !== undefined) updateData.display_name = body.displayName;
  if (body.bio !== undefined) updateData.bio = body.bio;
  if (body.avatarUrl !== undefined) updateData.avatar_url = body.avatarUrl;
  if (body.coverUrl !== undefined) updateData.cover_url = body.coverUrl;
  if (body.website !== undefined) updateData.website = body.website;
  if (body.location !== undefined) updateData.location = body.location;
  if (body.isCreator !== undefined) updateData.is_creator = body.isCreator;

  const { data, error } = await dbUpdate('profiles', updateData, { id }, c.env);

  if (error) {
    return sendError(c, 'UPDATE_FAILED', error.message, 400);
  }

  return sendSuccess(c, { profile: data?.[0] }, 'Profile updated');
});

// POST /:id/follow
router.post('/:id/follow', authenticate, async (c) => {
  const { id } = c.req.param();
  const user = c.get('user');

  if (user.sub === id) {
    return sendError(c, 'SELF_FOLLOW', 'Cannot follow yourself', 400);
  }

  const { error } = await insert('follows', { follower_id: user.sub, following_id: id }, c.env);

  if (error) {
    if (error.code === '409') {
      return sendError(c, 'ALREADY_FOLLOWING', 'Already following this user', 409);
    }
    return sendError(c, 'FOLLOW_FAILED', error.message, 400);
  }

  return sendSuccess(c, null, 'Followed successfully', 201);
});

// DELETE /:id/follow
router.delete('/:id/follow', authenticate, async (c) => {
  const { id } = c.req.param();
  const user = c.get('user');

  const { error } = await remove('follows', { follower_id: user.sub, following_id: id }, c.env);
  if (error) return sendError(c, 'UNFOLLOW_FAILED', error.message, 400);

  return sendSuccess(c, null, 'Unfollowed successfully');
});

// GET /:id/followers
router.get('/:id/followers', async (c) => {
  const { id } = c.req.param();
  const page = parseInt(c.req.query('page') || '1', 10);
  const limit = parseInt(c.req.query('limit') || '20', 10);

  const { data, error } = await query('follows', c.env, {
    select: 'follower_id',
    eq: ['following_id', id],
    range: [(page - 1) * limit, page * limit - 1],
  });

  if (error) return sendError(c, 'QUERY_FAILED', error.message, 400);

  return sendSuccess(c, { followers: data || [] }, undefined, 200, { page, limit, total: data?.length || 0 });
});

// GET /:id/following
router.get('/:id/following', async (c) => {
  const { id } = c.req.param();
  const page = parseInt(c.req.query('page') || '1', 10);
  const limit = parseInt(c.req.query('limit') || '20', 10);

  const { data, error } = await query('follows', c.env, {
    select: 'following_id',
    eq: ['follower_id', id],
    range: [(page - 1) * limit, page * limit - 1],
  });

  if (error) return sendError(c, 'QUERY_FAILED', error.message, 400);

  return sendSuccess(c, { following: data || [] }, undefined, 200, { page, limit, total: data?.length || 0 });
});

// GET /search
router.get('/search', async (c) => {
  const q = c.req.query('q');
  const page = parseInt(c.req.query('page') || '1', 10);
  const limit = parseInt(c.req.query('limit') || '20', 10);

  if (!q || q.length < 2) {
    return sendError(c, 'INVALID_SEARCH', 'Search query must be at least 2 characters', 400);
  }

  const { data, error } = await query('profiles', c.env, {
    select: '*',
    order: ['follower_count', 'desc'],
    range: [(page - 1) * limit, page * limit - 1],
  });

  if (error) return sendError(c, 'SEARCH_FAILED', error.message, 400);

  const filtered = (data || []).filter(
    (p) => p.username?.toLowerCase().includes(q.toLowerCase()) ||
           p.display_name?.toLowerCase().includes(q.toLowerCase())
  );

  return sendSuccess(c, { users: filtered }, undefined, 200, { page, limit, total: filtered.length });
});

// PATCH /:id/privacy
router.patch('/:id/privacy', authenticate, requireSelfOrAdmin(), zValidator('json', z.object({
  privateProfile: z.boolean(),
})), async (c) => {
  const { id } = c.req.param();
  const { privateProfile } = c.req.valid('json');

  const { error } = await update('user_settings', { private_profile: privateProfile }, { user_id: id }, c.env);
  if (error) return sendError(c, 'UPDATE_FAILED', error.message, 400);

  return sendSuccess(c, null, 'Privacy settings updated');
});

export default router;
