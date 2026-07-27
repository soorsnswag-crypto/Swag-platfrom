-- ==========================================
-- Swag Platform
-- 03_indexes.sql
-- Database Indexes
-- ==========================================

-- profiles
create index if not exists idx_profiles_username on profiles (username);

-- reels
create index if not exists idx_reels_user_id on reels (user_id);
create index if not exists idx_reels_created_at on reels (created_at desc);
create index if not exists idx_reels_status on reels (status);

-- reel_likes
create index if not exists idx_reel_likes_reel_id on reel_likes (reel_id);
create index if not exists idx_reel_likes_user_id on reel_likes (user_id);

-- reel_comments
create index if not exists idx_reel_comments_reel_id on reel_comments (reel_id);
create index if not exists idx_reel_comments_user_id on reel_comments (user_id);

-- follows
create index if not exists idx_follows_follower_id on follows (follower_id);
create index if not exists idx_follows_following_id on follows (following_id);

-- bookmarks
create index if not exists idx_bookmarks_user_id on bookmarks (user_id);

-- wallets
create index if not exists idx_wallets_user_id on wallets (user_id);

-- wallet_transactions
create index if not exists idx_wallet_transactions_wallet_id on wallet_transactions (wallet_id);

-- subscriptions
create index if not exists idx_subscriptions_subscriber_id on subscriptions (subscriber_id);
create index if not exists idx_subscriptions_creator_id on subscriptions (creator_id);

-- notifications
create index if not exists idx_notifications_user_id on notifications (user_id);

-- conversations
create index if not exists idx_conversations_created_at on conversations (created_at);

-- conversation_members
create index if not exists idx_conversation_members_user_id on conversation_members (user_id);

-- messages
create index if not exists idx_messages_conversation_id on messages (conversation_id);
create index if not exists idx_messages_sender_id on messages (sender_id);

-- reports
create index if not exists idx_reports_reported_user_id on reports (reported_user_id);
create index if not exists idx_reports_reel_id on reports (reel_id);
create index if not exists idx_reports_comment_id on reports (comment_id);

-- device_tokens
create index if not exists idx_device_tokens_user_id on device_tokens (user_id);
