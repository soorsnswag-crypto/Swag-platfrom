-- ==========================================
-- Swag Platform
-- 07_triggers.sql
-- Database Triggers
-- ==========================================

-- ------------------------------------------
-- updated_at triggers
-- ------------------------------------------

create trigger set_profiles_updated_at
    before update on profiles
    for each row
    execute function update_updated_at();

create trigger set_music_updated_at
    before update on music
    for each row
    execute function update_updated_at();

create trigger set_reels_updated_at
    before update on reels
    for each row
    execute function update_updated_at();

create trigger set_reel_comments_updated_at
    before update on reel_comments
    for each row
    execute function update_updated_at();

create trigger set_wallets_updated_at
    before update on wallets
    for each row
    execute function update_updated_at();

create trigger set_wallet_transactions_updated_at
    before update on wallet_transactions
    for each row
    execute function update_updated_at();

create trigger set_subscriptions_updated_at
    before update on subscriptions
    for each row
    execute function update_updated_at();

create trigger set_conversations_updated_at
    before update on conversations
    for each row
    execute function update_updated_at();

create trigger set_messages_updated_at
    before update on messages
    for each row
    execute function update_updated_at();

create trigger set_reports_updated_at
    before update on reports
    for each row
    execute function update_updated_at();

create trigger set_device_tokens_updated_at
    before update on device_tokens
    for each row
    execute function update_updated_at();

create trigger set_user_settings_updated_at
    before update on user_settings
    for each row
    execute function update_updated_at();

-- ------------------------------------------
-- Auto-create profile on user signup
-- ------------------------------------------
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
    insert into public.profiles (id, username)
    values (
        new.id,
        coalesce(
            new.raw_user_meta_data ->> 'username',
            'user_' || substr(new.id::text, 1, 8)
        )
    );

    insert into public.user_settings (user_id)
    values (new.id);

    insert into public.wallets (user_id)
    values (new.id);

    return new;
end;
$$;

create trigger on_auth_user_created
    after insert on auth.users
    for each row
    execute function handle_new_user();

-- ------------------------------------------
-- Follow counter triggers
-- ------------------------------------------
create or replace function handle_follow_insert()
returns trigger
language plpgsql
security definer
as $$
begin
    update profiles
    set follower_count = follower_count + 1
    where id = new.following_id;

    update profiles
    set following_count = following_count + 1
    where id = new.follower_id;

    return new;
end;
$$;

create trigger on_follow_insert
    after insert on follows
    for each row
    execute function handle_follow_insert();

create or replace function handle_follow_delete()
returns trigger
language plpgsql
security definer
as $$
begin
    update profiles
    set follower_count = greatest(follower_count - 1, 0)
    where id = old.following_id;

    update profiles
    set following_count = greatest(following_count - 1, 0)
    where id = old.follower_id;

    return old;
end;
$$;

create trigger on_follow_delete
    after delete on follows
    for each row
    execute function handle_follow_delete();

-- ------------------------------------------
-- Reel like counter triggers
-- ------------------------------------------
create or replace function handle_reel_like_insert()
returns trigger
language plpgsql
security definer
as $$
begin
    update reels
    set like_count = like_count + 1
    where id = new.reel_id;

    update profiles
    set total_likes = total_likes + 1
    where id = (select user_id from reels where id = new.reel_id);

    return new;
end;
$$;

create trigger on_reel_like_insert
    after insert on reel_likes
    for each row
    execute function handle_reel_like_insert();

create or replace function handle_reel_like_delete()
returns trigger
language plpgsql
security definer
as $$
begin
    update reels
    set like_count = greatest(like_count - 1, 0)
    where id = old.reel_id;

    update profiles
    set total_likes = greatest(total_likes - 1, 0)
    where id = (select user_id from reels where id = old.reel_id);

    return old;
end;
$$;

create trigger on_reel_like_delete
    after delete on reel_likes
    for each row
    execute function handle_reel_like_delete();

-- ------------------------------------------
-- Reel comment counter triggers
-- ------------------------------------------
create or replace function handle_reel_comment_insert()
returns trigger
language plpgsql
security definer
as $$
begin
    update reels
    set comment_count = comment_count + 1
    where id = new.reel_id;

    return new;
end;
$$;

create trigger on_reel_comment_insert
    after insert on reel_comments
    for each row
    execute function handle_reel_comment_insert();

create or replace function handle_reel_comment_delete()
returns trigger
language plpgsql
security definer
as $$
begin
    update reels
    set comment_count = greatest(comment_count - 1, 0)
    where id = old.reel_id;

    return old;
end;
$$;

create trigger on_reel_comment_delete
    after delete on reel_comments
    for each row
    execute function handle_reel_comment_delete();

-- ------------------------------------------
-- Reel count trigger on profile
-- ------------------------------------------
create or replace function handle_reel_insert()
returns trigger
language plpgsql
security definer
as $$
begin
    update profiles
    set reel_count = reel_count + 1
    where id = new.user_id;

    return new;
end;
$$;

create trigger on_reel_insert
    after insert on reels
    for each row
    execute function handle_reel_insert();

create or replace function handle_reel_delete()
returns trigger
language plpgsql
security definer
as $$
begin
    update profiles
    set reel_count = greatest(reel_count - 1, 0)
    where id = old.user_id;

    return old;
end;
$$;

create trigger on_reel_delete
    after delete on reels
    for each row
    execute function handle_reel_delete();

-- ------------------------------------------
-- Notification triggers
-- ------------------------------------------
create or replace function notify_on_like()
returns trigger
language plpgsql
security definer
as $$
declare
    v_reel_owner_id uuid;
begin
    select user_id into v_reel_owner_id from reels where id = new.reel_id;

    if v_reel_owner_id is not null and v_reel_owner_id <> new.user_id then
        insert into notifications (user_id, type, title, body, data)
        values (
            v_reel_owner_id,
            'like',
            'New Like',
            'Someone liked your reel.',
            jsonb_build_object('user_id', new.user_id, 'reel_id', new.reel_id)
        );
    end if;

    return new;
end;
$$;

create trigger on_reel_like_notification
    after insert on reel_likes
    for each row
    execute function notify_on_like();

create or replace function notify_on_comment()
returns trigger
language plpgsql
security definer
as $$
declare
    v_reel_owner_id uuid;
begin
    select user_id into v_reel_owner_id from reels where id = new.reel_id;

    if v_reel_owner_id is not null and v_reel_owner_id <> new.user_id then
        insert into notifications (user_id, type, title, body, data)
        values (
            v_reel_owner_id,
            'comment',
            'New Comment',
            'Someone commented on your reel.',
            jsonb_build_object('user_id', new.user_id, 'reel_id', new.reel_id, 'comment_id', new.id)
        );
    end if;

    return new;
end;
$$;

create trigger on_reel_comment_notification
    after insert on reel_comments
    for each row
    execute function notify_on_comment();

create or replace function notify_on_follow()
returns trigger
language plpgsql
security definer
as $$
begin
    if new.follower_id <> new.following_id then
        insert into notifications (user_id, type, title, body, data)
        values (
            new.following_id,
            'follow',
            'New Follower',
            'Someone started following you.',
            jsonb_build_object('user_id', new.follower_id)
        );
    end if;

    return new;
end;
$$;

create trigger on_follow_notification
    after insert on follows
    for each row
    execute function notify_on_follow();

-- ------------------------------------------
-- Wallet transaction audit trigger
-- ------------------------------------------
create or replace function log_wallet_transaction()
returns trigger
language plpgsql
security definer
as $$
begin
    insert into wallet_transactions (
        wallet_id,
        type,
        amount,
        balance_before,
        balance_after,
        description
    )
    values (
        new.id,
        case
            when new.balance > old.balance then 'credit'
            when new.balance < old.balance then 'debit'
            else 'credit'
        end,
        abs(new.balance - old.balance),
        old.balance,
        new.balance,
        'Wallet balance updated'
    );

    return new;
end;
$$;

create trigger on_wallet_balance_update
    after update of balance on wallets
    for each row
    when (old.balance is distinct from new.balance)
    execute function log_wallet_transaction();

-- ------------------------------------------
-- Update conversation last_message_at
-- ------------------------------------------
create or replace function update_conversation_last_message()
returns trigger
language plpgsql
security definer
as $$
begin
    update conversations
    set last_message_at = new.created_at
    where id = new.conversation_id;

    return new;
end;
$$;

create trigger on_message_insert
    after insert on messages
    for each row
    execute function update_conversation_last_message();
