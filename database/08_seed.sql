-- ==========================================
-- Swag Platform
-- 08_seed.sql
-- Development Seed Data
-- Safe to run multiple times (idempotent)
-- ==========================================

-- ------------------------------------------
-- Demo profiles
-- Note: auth.users must exist first for FK.
-- These insert as placeholder references only.
-- ------------------------------------------
insert into profiles (id, username, display_name, bio, is_verified, is_creator)
values
    ('00000000-0000-0000-0000-000000000001', 'swag_official', 'Swag Official', 'Official Swag Platform account', true, true),
    ('00000000-0000-0000-0000-000000000002', 'demo_creator', 'Demo Creator', 'Creating amazing reels every day', false, true),
    ('00000000-0000-0000-0000-000000000003', 'music_lover', 'Music Lover', 'Music is life', false, false),
    ('00000000-0000-0000-0000-000000000004', 'travel_reels', 'Travel Reels', 'Exploring the world one reel at a time', false, true),
    ('00000000-0000-0000-0000-000000000005', 'food_craze', 'Food Craze', 'Food reviews and recipes', false, true)
on conflict (id) do nothing;

update profiles
set follower_count = 3, following_count = 2
where id = '00000000-0000-0000-0000-000000000001';

update profiles
set follower_count = 2, following_count = 1
where id = '00000000-0000-0000-0000-000000000002';

update profiles
set follower_count = 1, following_count = 3
where id = '00000000-0000-0000-0000-000000000003';

-- ------------------------------------------
-- Music tracks
-- ------------------------------------------
insert into music (id, title, artist, album, duration, genre, mood, language, audio_url, is_trending)
values
    ('00000000-0000-0000-0000-000000000010', 'Summer Vibes', 'Artist One', 'Summer Album', 180, 'pop', 'happy', 'en', 'https://example.com/music/summer_vibes.mp3', true),
    ('00000000-0000-0000-0000-000000000011', 'Night Rider', 'Artist Two', 'Night Collection', 240, 'electronic', 'energetic', 'en', 'https://example.com/music/night_rider.mp3', true),
    ('00000000-0000-0000-0000-000000000012', 'Acoustic Morning', 'Artist Three', 'Morning Sessions', 200, 'acoustic', 'calm', 'en', 'https://example.com/music/acoustic_morning.mp3', false),
    ('00000000-0000-0000-0000-000000000013', 'Hip Hop Beat', 'Artist Four', 'Beat Tape', 160, 'hiphop', 'confident', 'en', 'https://example.com/music/hiphop_beat.mp3', true),
    ('00000000-0000-0000-0000-000000000014', 'Lo-fi Study', 'Artist Five', 'Study Session', 300, 'lofi', 'relaxed', 'en', 'https://example.com/music/lofi_study.mp3', false)
on conflict (id) do nothing;

-- ------------------------------------------
-- Sample reels
-- ------------------------------------------
insert into reels (id, user_id, video_url, thumbnail_url, caption, music_id, duration, visibility, status)
values
    ('00000000-0000-0000-0000-000000000020', '00000000-0000-0000-0000-000000000001', 'https://example.com/reels/welcome.mp4', 'https://example.com/thumbnails/welcome.jpg', 'Welcome to Swag Platform!', '00000000-0000-0000-0000-000000000010', 15, 'public', 'ready'),
    ('00000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000002', 'https://example.com/reels/demo_reel.mp4', 'https://example.com/thumbnails/demo_reel.jpg', 'Check out this amazing view! #nature', '00000000-0000-0000-0000-000000000011', 30, 'public', 'ready'),
    ('00000000-0000-0000-0000-000000000022', '00000000-0000-0000-0000-000000000004', 'https://example.com/reels/travel.mp4', 'https://example.com/thumbnails/travel.jpg', 'Best travel destinations 2026 #travel', '00000000-0000-0000-0000-000000000012', 45, 'public', 'ready'),
    ('00000000-0000-0000-0000-000000000023', '00000000-0000-0000-0000-000000000005', 'https://example.com/reels/food.mp4', 'https://example.com/thumbnails/food.jpg', 'Easy pasta recipe in 60 seconds #food', '00000000-0000-0000-0000-000000000014', 60, 'public', 'ready'),
    ('00000000-0000-0000-0000-000000000024', '00000000-0000-0000-0000-000000000002', 'https://example.com/reels/music_reel.mp4', 'https://example.com/thumbnails/music_reel.jpg', 'Singing along to this amazing track! #music', '00000000-0000-0000-0000-000000000013', 20, 'public', 'ready')
on conflict (id) do nothing;

update reels
set like_count = 12, comment_count = 3, view_count = 150, share_count = 5
where id = '00000000-0000-0000-0000-000000000020';

update reels
set like_count = 25, comment_count = 7, view_count = 320, share_count = 12
where id = '00000000-0000-0000-0000-000000000021';

update reels
set like_count = 18, comment_count = 4, view_count = 210, share_count = 8
where id = '00000000-0000-0000-0000-000000000022';

update reels
set like_count = 30, comment_count = 9, view_count = 400, share_count = 15
where id = '00000000-0000-0000-0000-000000000023';

update reels
set like_count = 8, comment_count = 2, view_count = 95, share_count = 3
where id = '00000000-0000-0000-0000-000000000024';

-- ------------------------------------------
-- Sample hashtags
-- ------------------------------------------
insert into hashtags (id, name)
values
    ('00000000-0000-0000-0000-000000000030', 'swag'),
    ('00000000-0000-0000-0000-000000000031', 'nature'),
    ('00000000-0000-0000-0000-000000000032', 'travel'),
    ('00000000-0000-0000-0000-000000000033', 'food'),
    ('00000000-0000-0000-0000-000000000034', 'music'),
    ('00000000-0000-0000-0000-000000000035', 'trending'),
    ('00000000-0000-0000-0000-000000000036', 'dance'),
    ('00000000-0000-0000-0000-000000000037', 'funny')
on conflict (id) do nothing;

update hashtags
set usage_count = 1
where id in ('00000000-0000-0000-0000-000000000031', '00000000-0000-0000-0000-000000000032', '00000000-0000-0000-0000-000000000033', '00000000-0000-0000-0000-000000000034');

-- ------------------------------------------
-- Reel hashtag associations
-- ------------------------------------------
insert into reel_hashtags (reel_id, hashtag_id)
values
    ('00000000-0000-0000-0000-000000000021', '00000000-0000-0000-0000-000000000031'),
    ('00000000-0000-0000-0000-000000000022', '00000000-0000-0000-0000-000000000032'),
    ('00000000-0000-0000-0000-000000000023', '00000000-0000-0000-0000-000000000033'),
    ('00000000-0000-0000-0000-000000000024', '00000000-0000-0000-0000-000000000034')
on conflict (reel_id, hashtag_id) do nothing;

-- ------------------------------------------
-- Sample follows
-- ------------------------------------------
insert into follows (follower_id, following_id)
values
    ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001'),
    ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001'),
    ('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001'),
    ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002'),
    ('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000002'),
    ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000004'),
    ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000005')
on conflict (follower_id, following_id) do nothing;

-- ------------------------------------------
-- Sample likes
-- ------------------------------------------
insert into reel_likes (user_id, reel_id)
values
    ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000020'),
    ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000020'),
    ('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000020'),
    ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000021'),
    ('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000021'),
    ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000022'),
    ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000022'),
    ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000023'),
    ('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000023'),
    ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000024')
on conflict (user_id, reel_id) do nothing;

-- ------------------------------------------
-- Sample comments
-- ------------------------------------------
insert into reel_comments (id, user_id, reel_id, content)
values
    ('00000000-0000-0000-0000-000000000040', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000020', 'Welcome! Love this platform!'),
    ('00000000-0000-0000-0000-000000000041', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000020', 'Amazing content!'),
    ('00000000-0000-0000-0000-000000000042', '00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000021', 'This is beautiful!'),
    ('00000000-0000-0000-0000-000000000043', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000022', 'Where is this place?'),
    ('00000000-0000-0000-0000-000000000044', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000023', 'Yummy! Sharing this recipe!'),
    ('00000000-0000-0000-0000-000000000045', '00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000024', 'Great voice! Love this song!')
on conflict (id) do nothing;

-- ------------------------------------------
-- Sample bookmarks
-- ------------------------------------------
insert into bookmarks (user_id, reel_id)
values
    ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000021'),
    ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000023')
on conflict (user_id, reel_id) do nothing;

-- ------------------------------------------
-- Demo wallets
-- ------------------------------------------
insert into wallets (id, user_id, balance, total_earned, total_withdrawn)
values
    ('00000000-0000-0000-0000-000000000050', '00000000-0000-0000-0000-000000000001', 150.00, 500.00, 350.00),
    ('00000000-0000-0000-0000-000000000051', '00000000-0000-0000-0000-000000000002', 75.50, 200.00, 124.50),
    ('00000000-0000-0000-0000-000000000052', '00000000-0000-0000-0000-000000000004', 42.00, 100.00, 58.00),
    ('00000000-0000-0000-0000-000000000053', '00000000-0000-0000-0000-000000000005', 30.00, 80.00, 50.00)
on conflict (id) do nothing;

-- ------------------------------------------
-- Demo wallet transactions
-- ------------------------------------------
insert into wallet_transactions (id, wallet_id, type, amount, balance_before, balance_after, description, status)
values
    ('00000000-0000-0000-0000-000000000060', '00000000-0000-0000-0000-000000000050', 'credit', 50.00, 100.00, 150.00, 'Monthly subscription revenue', 'completed'),
    ('00000000-0000-0000-0000-000000000061', '00000000-0000-0000-0000-000000000050', 'withdraw', 100.00, 250.00, 150.00, 'Withdrawal to bank account', 'completed'),
    ('00000000-0000-0000-0000-000000000062', '00000000-0000-0000-0000-000000000051', 'credit', 25.00, 50.50, 75.50, 'Creator earnings - July', 'completed'),
    ('00000000-0000-0000-0000-000000000063', '00000000-0000-0000-0000-000000000052', 'credit', 12.00, 30.00, 42.00, 'Subscription payment', 'completed'),
    ('00000000-0000-0000-0000-000000000064', '00000000-0000-0000-0000-000000000053', 'debit', 10.00, 40.00, 30.00, 'Premium subscription charge', 'completed')
on conflict (id) do nothing;

-- ------------------------------------------
-- Demo subscriptions
-- ------------------------------------------
insert into subscriptions (id, subscriber_id, creator_id, plan, status, amount)
values
    ('00000000-0000-0000-0000-000000000070', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 'premium', 'active', 9.99),
    ('00000000-0000-0000-0000-000000000071', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000004', 'premium', 'active', 9.99),
    ('00000000-0000-0000-0000-000000000072', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002', 'creator_plus', 'active', 19.99),
    ('00000000-0000-0000-0000-000000000073', '00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001', 'premium', 'cancelled', 9.99)
on conflict (id) do nothing;

-- ------------------------------------------
-- Demo notifications
-- ------------------------------------------
insert into notifications (id, user_id, type, title, body, data, is_read)
values
    ('00000000-0000-0000-0000-000000000080', '00000000-0000-0000-0000-000000000001', 'like', 'New Like', 'Demo Creator liked your reel.', jsonb_build_object('user_id', '00000000-0000-0000-0000-000000000002'), false),
    ('00000000-0000-0000-0000-000000000081', '00000000-0000-0000-0000-000000000001', 'follow', 'New Follower', 'Music Lover started following you.', jsonb_build_object('user_id', '00000000-0000-0000-0000-000000000003'), false),
    ('00000000-0000-0000-0000-000000000082', '00000000-0000-0000-0000-000000000002', 'comment', 'New Comment', 'Travel Reels commented on your reel.', jsonb_build_object('user_id', '00000000-0000-0000-0000-000000000004'), true),
    ('00000000-0000-0000-0000-000000000083', '00000000-0000-0000-0000-000000000005', 'wallet', 'Earnings Update', 'Your wallet has been credited with $10.00.', null, false),
    ('00000000-0000-0000-0000-000000000084', '00000000-0000-0000-0000-000000000003', 'subscription', 'Subscription Active', 'Your Premium subscription is now active.', null, true)
on conflict (id) do nothing;

-- ------------------------------------------
-- Demo user_settings
-- ------------------------------------------
insert into user_settings (user_id, dark_mode, language, push_notifications_enabled, email_notifications_enabled)
values
    ('00000000-0000-0000-0000-000000000001', true, 'en', true, true),
    ('00000000-0000-0000-0000-000000000002', true, 'en', true, true),
    ('00000000-0000-0000-0000-000000000003', false, 'en', true, false),
    ('00000000-0000-0000-0000-000000000004', true, 'en', true, true),
    ('00000000-0000-0000-0000-000000000005', true, 'en', false, true)
on conflict (user_id) do nothing;

-- ------------------------------------------
-- Demo device tokens
-- ------------------------------------------
insert into device_tokens (id, user_id, token, platform)
values
    ('00000000-0000-0000-0000-000000000090', '00000000-0000-0000-0000-000000000001', 'demo_device_token_001', 'ios'),
    ('00000000-0000-0000-0000-000000000091', '00000000-0000-0000-0000-000000000002', 'demo_device_token_002', 'android'),
    ('00000000-0000-0000-0000-000000000092', '00000000-0000-0000-0000-000000000003', 'demo_device_token_003', 'web')
on conflict (id) do nothing;

-- ------------------------------------------
-- Demo conversations and messages
-- ------------------------------------------
insert into conversations (id, type)
values
    ('00000000-0000-0000-0000-000000000100', 'direct'),
    ('00000000-0000-0000-0000-000000000101', 'direct')
on conflict (id) do nothing;

insert into conversation_members (conversation_id, user_id)
values
    ('00000000-0000-0000-0000-000000000100', '00000000-0000-0000-0000-000000000001'),
    ('00000000-0000-0000-0000-000000000100', '00000000-0000-0000-0000-000000000002'),
    ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000001'),
    ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000003')
on conflict (conversation_id, user_id) do nothing;

insert into messages (id, conversation_id, sender_id, type, content)
values
    ('00000000-0000-0000-0000-000000000110', '00000000-0000-0000-0000-000000000100', '00000000-0000-0000-0000-000000000002', 'text', 'Hey! Love your content!'),
    ('00000000-0000-0000-0000-000000000111', '00000000-0000-0000-0000-000000000100', '00000000-0000-0000-0000-000000000001', 'text', 'Thank you so much! Really appreciate it.'),
    ('00000000-0000-0000-0000-000000000112', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000003', 'text', 'How do I become a creator on Swag?'),
    ('00000000-0000-0000-0000-000000000113', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000001', 'text', 'Just start creating! Go to your profile and enable creator mode.')
on conflict (id) do nothing;
