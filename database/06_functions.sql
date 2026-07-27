-- ==========================================
-- Swag Platform
-- 06_functions.sql
-- Reusable SQL Functions
-- ==========================================

-- ------------------------------------------
-- increment_wallet_balance
-- Adds amount to wallet balance and total_earned
-- ------------------------------------------
create or replace function increment_wallet_balance(p_user_id uuid, p_amount numeric)
returns void
language plpgsql
security definer
as $$
begin
    update wallets
    set
        balance = balance + p_amount,
        total_earned = total_earned + p_amount,
        updated_at = now()
    where user_id = p_user_id;
end;
$$;

-- ------------------------------------------
-- decrement_wallet_balance
-- Subtracts amount from wallet balance
-- Raises error if insufficient funds
-- ------------------------------------------
create or replace function decrement_wallet_balance(p_user_id uuid, p_amount numeric)
returns void
language plpgsql
security definer
as $$
begin
    if not exists (
        select 1 from wallets
        where user_id = p_user_id and balance >= p_amount
    ) then
        raise exception 'Insufficient wallet balance';
    end if;

    update wallets
    set
        balance = balance - p_amount,
        updated_at = now()
    where user_id = p_user_id;
end;
$$;

-- ------------------------------------------
-- create_notification
-- Inserts a new notification for a user
-- ------------------------------------------
create or replace function create_notification(
    p_user_id uuid,
    p_type text,
    p_title text,
    p_body text default null
)
returns uuid
language plpgsql
security definer
as $$
declare
    v_notification_id uuid;
begin
    insert into notifications (user_id, type, title, body)
    values (p_user_id, p_type, p_title, p_body)
    returning id into v_notification_id;

    return v_notification_id;
end;
$$;

-- ------------------------------------------
-- increment_reel_views
-- Increments the view_count on a reel
-- ------------------------------------------
create or replace function increment_reel_views(p_reel_id uuid)
returns void
language plpgsql
security definer
as $$
begin
    update reels
    set view_count = view_count + 1
    where id = p_reel_id;
end;
$$;

-- ------------------------------------------
-- increment_reel_likes
-- Increments the like_count on a reel
-- ------------------------------------------
create or replace function increment_reel_likes(p_reel_id uuid)
returns void
language plpgsql
security definer
as $$
begin
    update reels
    set like_count = like_count + 1
    where id = p_reel_id;
end;
$$;

-- ------------------------------------------
-- follow_user
-- Creates a follow relationship and updates counters
-- ------------------------------------------
create or replace function follow_user(p_follower_id uuid, p_following_id uuid)
returns void
language plpgsql
security definer
as $$
begin
    if p_follower_id = p_following_id then
        raise exception 'Cannot follow yourself';
    end if;

    insert into follows (follower_id, following_id)
    values (p_follower_id, p_following_id)
    on conflict (follower_id, following_id) do nothing;

    update profiles
    set following_count = (select count(*) from follows where follower_id = p_follower_id)
    where id = p_follower_id;

    update profiles
    set follower_count = (select count(*) from follows where following_id = p_following_id)
    where id = p_following_id;
end;
$$;

-- ------------------------------------------
-- unfollow_user
-- Removes a follow relationship and updates counters
-- ------------------------------------------
create or replace function unfollow_user(p_follower_id uuid, p_following_id uuid)
returns void
language plpgsql
security definer
as $$
begin
    delete from follows
    where follower_id = p_follower_id and following_id = p_following_id;

    update profiles
    set following_count = (select count(*) from follows where follower_id = p_follower_id)
    where id = p_follower_id;

    update profiles
    set follower_count = (select count(*) from follows where following_id = p_following_id)
    where id = p_following_id;
end;
$$;

-- ------------------------------------------
-- report_content
-- Creates a report for inappropriate content
-- ------------------------------------------
create or replace function report_content(
    p_reporter_id uuid,
    p_target_type text,
    p_target_id uuid,
    p_reason text
)
returns uuid
language plpgsql
security definer
as $$
declare
    v_report_id uuid;
begin
    insert into reports (
        reporter_id,
        reported_user_id,
        reel_id,
        comment_id,
        reason
    )
    values (
        p_reporter_id,
        case when p_target_type = 'user' then p_target_id else null end,
        case when p_target_type = 'reel' then p_target_id else null end,
        case when p_target_type = 'comment' then p_target_id else null end,
        p_reason
    )
    returning id into v_report_id;

    return v_report_id;
end;
$$;

-- ------------------------------------------
-- update_updated_at
-- Trigger function to automatically set updated_at
-- ------------------------------------------
create or replace function update_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;
