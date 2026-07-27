-- ==========================================
-- Swag Platform
-- 02_tables.sql
-- Core Database Tables
-- ==========================================

-- ------------------------------------------
-- 1. profiles
-- ------------------------------------------
create table if not exists profiles (
    id uuid primary key default gen_random_uuid(),
    username text unique not null,
    display_name text,
    bio text,
    avatar_url text,
    cover_url text,
    website text,
    location text,
    is_verified boolean default false,
    is_creator boolean default false,
    follower_count integer default 0,
    following_count integer default 0,
    reel_count integer default 0,
    total_likes bigint default 0,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    constraint fk_auth_user foreign key (id) references auth.users (id) on delete cascade,
    constraint username_length check (char_length(username) >= 3 and char_length(username) <= 30),
    constraint bio_length check (bio is null or char_length(bio) <= 200)
);

-- ------------------------------------------
-- 2. music
-- ------------------------------------------
create table if not exists music (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    artist text not null,
    album text,
    cover_url text,
    duration integer not null,
    genre text,
    mood text,
    language text,
    audio_url text not null,
    is_trending boolean default false,
    usage_count integer default 0,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    constraint duration_positive check (duration > 0)
);

-- ------------------------------------------
-- 3. reels
-- ------------------------------------------
create table if not exists reels (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null,
    video_url text not null,
    thumbnail_url text,
    caption text,
    music_id uuid,
    duration integer,
    visibility text default 'public',
    comments_enabled boolean default true,
    duet_allowed boolean default true,
    download_allowed boolean default true,
    like_count integer default 0,
    comment_count integer default 0,
    share_count integer default 0,
    view_count integer default 0,
    save_count integer default 0,
    status text default 'processing',
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    constraint fk_user foreign key (user_id) references profiles (id) on delete cascade,
    constraint fk_music foreign key (music_id) references music (id) on delete set null,
    constraint reel_visibility check (visibility in ('public', 'private', 'followers')),
    constraint reel_status check (status in ('processing', 'ready', 'failed')),
    constraint caption_length check (caption is null or char_length(caption) <= 500)
);

-- ------------------------------------------
-- 4. hashtags
-- ------------------------------------------
create table if not exists hashtags (
    id uuid primary key default gen_random_uuid(),
    name text unique not null,
    usage_count integer default 0,
    created_at timestamptz default now(),
    constraint hashtag_name_length check (char_length(name) >= 1 and char_length(name) <= 50)
);

-- ------------------------------------------
-- 5. reel_hashtags
-- ------------------------------------------
create table if not exists reel_hashtags (
    reel_id uuid not null,
    hashtag_id uuid not null,
    created_at timestamptz default now(),
    primary key (reel_id, hashtag_id),
    constraint fk_reel foreign key (reel_id) references reels (id) on delete cascade,
    constraint fk_hashtag foreign key (hashtag_id) references hashtags (id) on delete cascade
);

-- ------------------------------------------
-- 6. reel_likes
-- ------------------------------------------
create table if not exists reel_likes (
    user_id uuid not null,
    reel_id uuid not null,
    created_at timestamptz default now(),
    primary key (user_id, reel_id),
    constraint fk_user foreign key (user_id) references profiles (id) on delete cascade,
    constraint fk_reel foreign key (reel_id) references reels (id) on delete cascade
);

-- ------------------------------------------
-- 7. reel_comments
-- ------------------------------------------
create table if not exists reel_comments (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null,
    reel_id uuid not null,
    parent_id uuid,
    content text not null,
    like_count integer default 0,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    constraint fk_user foreign key (user_id) references profiles (id) on delete cascade,
    constraint fk_reel foreign key (reel_id) references reels (id) on delete cascade,
    constraint fk_parent foreign key (parent_id) references reel_comments (id) on delete cascade,
    constraint comment_content_length check (char_length(content) >= 1 and char_length(content) <= 1000)
);

-- ------------------------------------------
-- 8. comment_likes
-- ------------------------------------------
create table if not exists comment_likes (
    user_id uuid not null,
    comment_id uuid not null,
    created_at timestamptz default now(),
    primary key (user_id, comment_id),
    constraint fk_user foreign key (user_id) references profiles (id) on delete cascade,
    constraint fk_comment foreign key (comment_id) references reel_comments (id) on delete cascade
);

-- ------------------------------------------
-- 9. follows
-- ------------------------------------------
create table if not exists follows (
    follower_id uuid not null,
    following_id uuid not null,
    created_at timestamptz default now(),
    primary key (follower_id, following_id),
    constraint fk_follower foreign key (follower_id) references profiles (id) on delete cascade,
    constraint fk_following foreign key (following_id) references profiles (id) on delete cascade,
    constraint no_self_follow check (follower_id <> following_id)
);

-- ------------------------------------------
-- 10. bookmarks
-- ------------------------------------------
create table if not exists bookmarks (
    user_id uuid not null,
    reel_id uuid not null,
    created_at timestamptz default now(),
    primary key (user_id, reel_id),
    constraint fk_user foreign key (user_id) references profiles (id) on delete cascade,
    constraint fk_reel foreign key (reel_id) references reels (id) on delete cascade
);

-- ------------------------------------------
-- 11. wallets
-- ------------------------------------------
create table if not exists wallets (
    id uuid primary key default gen_random_uuid(),
    user_id uuid unique not null,
    balance numeric(12, 2) default 0,
    locked_balance numeric(12, 2) default 0,
    total_earned numeric(12, 2) default 0,
    total_withdrawn numeric(12, 2) default 0,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    constraint fk_user foreign key (user_id) references profiles (id) on delete cascade,
    constraint balance_non_negative check (balance >= 0),
    constraint locked_balance_non_negative check (locked_balance >= 0),
    constraint total_earned_non_negative check (total_earned >= 0),
    constraint total_withdrawn_non_negative check (total_withdrawn >= 0)
);

-- ------------------------------------------
-- 12. wallet_transactions
-- ------------------------------------------
create table if not exists wallet_transactions (
    id uuid primary key default gen_random_uuid(),
    wallet_id uuid not null,
    type text not null,
    amount numeric(12, 2) not null,
    balance_before numeric(12, 2) not null,
    balance_after numeric(12, 2) not null,
    description text,
    status text default 'pending',
    reference_type text,
    reference_id uuid,
    created_at timestamptz default now(),
    constraint fk_wallet foreign key (wallet_id) references wallets (id) on delete cascade,
    constraint transaction_type check (type in ('credit', 'debit', 'withdraw', 'refund', 'subscription', 'transfer')),
    constraint transaction_status check (status in ('pending', 'completed', 'failed', 'cancelled')),
    constraint amount_positive check (amount > 0)
);

-- ------------------------------------------
-- 13. subscriptions
-- ------------------------------------------
create table if not exists subscriptions (
    id uuid primary key default gen_random_uuid(),
    subscriber_id uuid not null,
    creator_id uuid not null,
    plan text not null,
    status text not null default 'active',
    amount numeric(10, 2),
    currency text default 'usd',
    started_at timestamptz default now(),
    expires_at timestamptz,
    cancelled_at timestamptz,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    constraint fk_subscriber foreign key (subscriber_id) references profiles (id) on delete cascade,
    constraint fk_creator foreign key (creator_id) references profiles (id) on delete cascade,
    constraint no_self_subscription check (subscriber_id <> creator_id),
    constraint subscription_plan check (plan in ('free', 'premium', 'creator_plus')),
    constraint subscription_status check (status in ('active', 'cancelled', 'expired', 'paused'))
);

-- ------------------------------------------
-- 14. notifications
-- ------------------------------------------
create table if not exists notifications (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null,
    type text not null,
    title text not null,
    body text,
    data jsonb,
    is_read boolean default false,
    created_at timestamptz default now(),
    constraint fk_user foreign key (user_id) references profiles (id) on delete cascade,
    constraint notification_type check (type in ('like', 'comment', 'follow', 'mention', 'subscription', 'wallet', 'reel', 'system', 'message'))
);

-- ------------------------------------------
-- 15. conversations
-- ------------------------------------------
create table if not exists conversations (
    id uuid primary key default gen_random_uuid(),
    type text not null default 'direct',
    name text,
    last_message_at timestamptz,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    constraint conversation_type check (type in ('direct', 'group'))
);

-- ------------------------------------------
-- 16. conversation_members
-- ------------------------------------------
create table if not exists conversation_members (
    conversation_id uuid not null,
    user_id uuid not null,
    joined_at timestamptz default now(),
    last_read_at timestamptz default now(),
    primary key (conversation_id, user_id),
    constraint fk_conversation foreign key (conversation_id) references conversations (id) on delete cascade,
    constraint fk_user foreign key (user_id) references profiles (id) on delete cascade
);

-- ------------------------------------------
-- 17. messages
-- ------------------------------------------
create table if not exists messages (
    id uuid primary key default gen_random_uuid(),
    conversation_id uuid not null,
    sender_id uuid not null,
    type text not null default 'text',
    content text,
    media_url text,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    constraint fk_conversation foreign key (conversation_id) references conversations (id) on delete cascade,
    constraint fk_sender foreign key (sender_id) references profiles (id) on delete cascade,
    constraint message_type check (type in ('text', 'image', 'video', 'audio', 'system'))
);

-- ------------------------------------------
-- 18. message_reads
-- ------------------------------------------
create table if not exists message_reads (
    message_id uuid not null,
    user_id uuid not null,
    read_at timestamptz default now(),
    primary key (message_id, user_id),
    constraint fk_message foreign key (message_id) references messages (id) on delete cascade,
    constraint fk_user foreign key (user_id) references profiles (id) on delete cascade
);

-- ------------------------------------------
-- 19. reports
-- ------------------------------------------
create table if not exists reports (
    id uuid primary key default gen_random_uuid(),
    reporter_id uuid not null,
    reported_user_id uuid,
    reel_id uuid,
    comment_id uuid,
    reason text not null,
    description text,
    status text default 'pending',
    resolved_by uuid,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    constraint fk_reporter foreign key (reporter_id) references profiles (id) on delete cascade,
    constraint fk_reported_user foreign key (reported_user_id) references profiles (id) on delete set null,
    constraint fk_reel foreign key (reel_id) references reels (id) on delete set null,
    constraint fk_comment foreign key (comment_id) references reel_comments (id) on delete set null,
    constraint fk_resolved_by foreign key (resolved_by) references profiles (id) on delete set null,
    constraint report_status check (status in ('pending', 'reviewed', 'resolved', 'dismissed')),
    constraint report_reason check (reason in ('spam', 'harassment', 'inappropriate', 'copyright', 'impersonation', 'other'))
);

-- ------------------------------------------
-- 20. blocked_users
-- ------------------------------------------
create table if not exists blocked_users (
    blocker_id uuid not null,
    blocked_id uuid not null,
    created_at timestamptz default now(),
    primary key (blocker_id, blocked_id),
    constraint fk_blocker foreign key (blocker_id) references profiles (id) on delete cascade,
    constraint fk_blocked foreign key (blocked_id) references profiles (id) on delete cascade,
    constraint no_self_block check (blocker_id <> blocked_id)
);

-- ------------------------------------------
-- 21. device_tokens
-- ------------------------------------------
create table if not exists device_tokens (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null,
    token text not null,
    platform text not null,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    constraint fk_user foreign key (user_id) references profiles (id) on delete cascade,
    constraint device_platform check (platform in ('ios', 'android', 'web'))
);

-- ------------------------------------------
-- 22. user_settings
-- ------------------------------------------
create table if not exists user_settings (
    user_id uuid primary key,
    dark_mode boolean default true,
    language text default 'en',
    push_notifications_enabled boolean default true,
    email_notifications_enabled boolean default true,
    private_profile boolean default false,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    constraint fk_user foreign key (user_id) references profiles (id) on delete cascade
);
