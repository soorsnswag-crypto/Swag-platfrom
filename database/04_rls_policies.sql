-- ==========================================
-- Swag Platform
-- 04_rls_policies.sql
-- Row Level Security Policies
-- ==========================================

-- ------------------------------------------
-- 1. profiles
-- ------------------------------------------
alter table if exists profiles enable row level security;

create policy "profiles_select_own"
    on profiles for select
    using (true);

create policy "profiles_insert_own"
    on profiles for insert
    with check (auth.uid() = id);

create policy "profiles_update_own"
    on profiles for update
    using (auth.uid() = id)
    with check (auth.uid() = id);

create policy "profiles_delete_own"
    on profiles for delete
    using (auth.uid() = id);

-- ------------------------------------------
-- 2. music
-- ------------------------------------------
alter table if exists music enable row level security;

create policy "music_select_all"
    on music for select
    using (true);

-- ------------------------------------------
-- 3. reels
-- ------------------------------------------
alter table if exists reels enable row level security;

create policy "reels_select_public"
    on reels for select
    using (visibility = 'public' or auth.uid() = user_id);

create policy "reels_insert_own"
    on reels for insert
    with check (auth.uid() = user_id);

create policy "reels_update_own"
    on reels for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "reels_delete_own"
    on reels for delete
    using (auth.uid() = user_id);

-- ------------------------------------------
-- 4. hashtags
-- ------------------------------------------
alter table if exists hashtags enable row level security;

create policy "hashtags_select_all"
    on hashtags for select
    using (true);

-- ------------------------------------------
-- 5. reel_hashtags
-- ------------------------------------------
alter table if exists reel_hashtags enable row level security;

create policy "reel_hashtags_select_all"
    on reel_hashtags for select
    using (true);

create policy "reel_hashtags_insert_own"
    on reel_hashtags for insert
    with check (auth.uid() = (select user_id from reels where id = reel_id));

create policy "reel_hashtags_delete_own"
    on reel_hashtags for delete
    using (auth.uid() = (select user_id from reels where id = reel_id));

-- ------------------------------------------
-- 6. reel_likes
-- ------------------------------------------
alter table if exists reel_likes enable row level security;

create policy "reel_likes_select_all"
    on reel_likes for select
    using (true);

create policy "reel_likes_insert_own"
    on reel_likes for insert
    with check (auth.uid() = user_id);

create policy "reel_likes_delete_own"
    on reel_likes for delete
    using (auth.uid() = user_id);

-- ------------------------------------------
-- 7. reel_comments
-- ------------------------------------------
alter table if exists reel_comments enable row level security;

create policy "reel_comments_select_all"
    on reel_comments for select
    using (true);

create policy "reel_comments_insert_own"
    on reel_comments for insert
    with check (auth.uid() = user_id);

create policy "reel_comments_update_own"
    on reel_comments for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "reel_comments_delete_own"
    on reel_comments for delete
    using (auth.uid() = user_id);

-- ------------------------------------------
-- 8. comment_likes
-- ------------------------------------------
alter table if exists comment_likes enable row level security;

create policy "comment_likes_select_all"
    on comment_likes for select
    using (true);

create policy "comment_likes_insert_own"
    on comment_likes for insert
    with check (auth.uid() = user_id);

create policy "comment_likes_delete_own"
    on comment_likes for delete
    using (auth.uid() = user_id);

-- ------------------------------------------
-- 9. follows
-- ------------------------------------------
alter table if exists follows enable row level security;

create policy "follows_select_all"
    on follows for select
    using (true);

create policy "follows_insert_own"
    on follows for insert
    with check (auth.uid() = follower_id);

create policy "follows_delete_own"
    on follows for delete
    using (auth.uid() = follower_id);

-- ------------------------------------------
-- 10. bookmarks
-- ------------------------------------------
alter table if exists bookmarks enable row level security;

create policy "bookmarks_select_own"
    on bookmarks for select
    using (auth.uid() = user_id);

create policy "bookmarks_insert_own"
    on bookmarks for insert
    with check (auth.uid() = user_id);

create policy "bookmarks_delete_own"
    on bookmarks for delete
    using (auth.uid() = user_id);

-- ------------------------------------------
-- 11. wallets
-- ------------------------------------------
alter table if exists wallets enable row level security;

create policy "wallets_select_own"
    on wallets for select
    using (auth.uid() = user_id);

-- ------------------------------------------
-- 12. wallet_transactions
-- ------------------------------------------
alter table if exists wallet_transactions enable row level security;

create policy "wallet_transactions_select_own"
    on wallet_transactions for select
    using (auth.uid() = (select user_id from wallets where id = wallet_id));

-- ------------------------------------------
-- 13. subscriptions
-- ------------------------------------------
alter table if exists subscriptions enable row level security;

create policy "subscriptions_select_own"
    on subscriptions for select
    using (auth.uid() = subscriber_id or auth.uid() = creator_id);

create policy "subscriptions_insert_own"
    on subscriptions for insert
    with check (auth.uid() = subscriber_id);

create policy "subscriptions_update_own"
    on subscriptions for update
    using (auth.uid() = subscriber_id)
    with check (auth.uid() = subscriber_id);

-- ------------------------------------------
-- 14. notifications
-- ------------------------------------------
alter table if exists notifications enable row level security;

create policy "notifications_select_own"
    on notifications for select
    using (auth.uid() = user_id);

create policy "notifications_update_own"
    on notifications for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- ------------------------------------------
-- 15. conversations
-- ------------------------------------------
alter table if exists conversations enable row level security;

create policy "conversations_select_member"
    on conversations for select
    using (auth.uid() in (select user_id from conversation_members where conversation_id = id));

create policy "conversations_insert"
    on conversations for insert
    with check (true);

-- ------------------------------------------
-- 16. conversation_members
-- ------------------------------------------
alter table if exists conversation_members enable row level security;

create policy "conversation_members_select_own"
    on conversation_members for select
    using (auth.uid() = user_id);

-- ------------------------------------------
-- 17. messages
-- ------------------------------------------
alter table if exists messages enable row level security;

create policy "messages_select_member"
    on messages for select
    using (auth.uid() in (select user_id from conversation_members where conversation_id = messages.conversation_id));

create policy "messages_insert_member"
    on messages for insert
    with check (auth.uid() = sender_id and auth.uid() in (select user_id from conversation_members where conversation_id = messages.conversation_id));

create policy "messages_update_own"
    on messages for update
    using (auth.uid() = sender_id)
    with check (auth.uid() = sender_id);

-- ------------------------------------------
-- 18. message_reads
-- ------------------------------------------
alter table if exists message_reads enable row level security;

create policy "message_reads_select_own"
    on message_reads for select
    using (auth.uid() = user_id);

create policy "message_reads_insert_own"
    on message_reads for insert
    with check (auth.uid() = user_id);

create policy "message_reads_update_own"
    on message_reads for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- ------------------------------------------
-- 19. reports
-- ------------------------------------------
alter table if exists reports enable row level security;

create policy "reports_insert_own"
    on reports for insert
    with check (auth.uid() = reporter_id);

create policy "reports_select_own"
    on reports for select
    using (auth.uid() = reporter_id);

-- ------------------------------------------
-- 20. blocked_users
-- ------------------------------------------
alter table if exists blocked_users enable row level security;

create policy "blocked_users_select_own"
    on blocked_users for select
    using (auth.uid() = blocker_id);

create policy "blocked_users_insert_own"
    on blocked_users for insert
    with check (auth.uid() = blocker_id);

create policy "blocked_users_delete_own"
    on blocked_users for delete
    using (auth.uid() = blocker_id);

-- ------------------------------------------
-- 21. device_tokens
-- ------------------------------------------
alter table if exists device_tokens enable row level security;

create policy "device_tokens_select_own"
    on device_tokens for select
    using (auth.uid() = user_id);

create policy "device_tokens_insert_own"
    on device_tokens for insert
    with check (auth.uid() = user_id);

create policy "device_tokens_update_own"
    on device_tokens for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

create policy "device_tokens_delete_own"
    on device_tokens for delete
    using (auth.uid() = user_id);

-- ------------------------------------------
-- 22. user_settings
-- ------------------------------------------
alter table if exists user_settings enable row level security;

create policy "user_settings_select_own"
    on user_settings for select
    using (auth.uid() = user_id);

create policy "user_settings_insert_own"
    on user_settings for insert
    with check (auth.uid() = user_id);

create policy "user_settings_update_own"
    on user_settings for update
    using (auth.uid() = user_id)
    with check (auth.uid() = user_id);
