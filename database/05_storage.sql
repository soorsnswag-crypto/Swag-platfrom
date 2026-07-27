-- ==========================================
-- Swag Platform
-- 05_storage.sql
-- Storage Buckets and Policies
-- ==========================================

-- ------------------------------------------
-- Buckets
-- ------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
    ('avatars', 'avatars', true, 5242880, array['image/png', 'image/jpeg', 'image/webp', 'image/gif']),
    ('reels', 'reels', true, 104857600, array['video/mp4', 'video/quicktime', 'video/webm']),
    ('reel_thumbnails', 'reel_thumbnails', true, 2097152, array['image/png', 'image/jpeg', 'image/webp']),
    ('chat_media', 'chat_media', false, 52428800, array['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'video/mp4', 'video/quicktime', 'audio/mp4', 'audio/mpeg']),
    ('verification_documents', 'verification_documents', false, 10485760, array['application/pdf', 'image/png', 'image/jpeg'])
on conflict (id) do nothing;

-- ------------------------------------------
-- Storage Policies
-- ------------------------------------------

-- avatars (public)
create policy "avatars_select_public"
    on storage.objects for select
    using (bucket_id = 'avatars');

create policy "avatars_insert_own"
    on storage.objects for insert
    with check (
        bucket_id = 'avatars'
        and auth.role() = 'authenticated'
        and (storage.foldername(name))[1] = auth.uid()::text
    );

create policy "avatars_update_own"
    on storage.objects for update
    using (
        bucket_id = 'avatars'
        and auth.role() = 'authenticated'
        and (storage.foldername(name))[1] = auth.uid()::text
    );

create policy "avatars_delete_own"
    on storage.objects for delete
    using (
        bucket_id = 'avatars'
        and auth.role() = 'authenticated'
        and (storage.foldername(name))[1] = auth.uid()::text
    );

-- reels (public)
create policy "reels_select_public"
    on storage.objects for select
    using (bucket_id = 'reels');

create policy "reels_insert_own"
    on storage.objects for insert
    with check (
        bucket_id = 'reels'
        and auth.role() = 'authenticated'
        and (storage.foldername(name))[1] = auth.uid()::text
    );

create policy "reels_update_own"
    on storage.objects for update
    using (
        bucket_id = 'reels'
        and auth.role() = 'authenticated'
        and (storage.foldername(name))[1] = auth.uid()::text
    );

create policy "reels_delete_own"
    on storage.objects for delete
    using (
        bucket_id = 'reels'
        and auth.role() = 'authenticated'
        and (storage.foldername(name))[1] = auth.uid()::text
    );

-- reel_thumbnails (public)
create policy "reel_thumbnails_select_public"
    on storage.objects for select
    using (bucket_id = 'reel_thumbnails');

create policy "reel_thumbnails_insert_own"
    on storage.objects for insert
    with check (
        bucket_id = 'reel_thumbnails'
        and auth.role() = 'authenticated'
        and (storage.foldername(name))[1] = auth.uid()::text
    );

create policy "reel_thumbnails_update_own"
    on storage.objects for update
    using (
        bucket_id = 'reel_thumbnails'
        and auth.role() = 'authenticated'
        and (storage.foldername(name))[1] = auth.uid()::text
    );

create policy "reel_thumbnails_delete_own"
    on storage.objects for delete
    using (
        bucket_id = 'reel_thumbnails'
        and auth.role() = 'authenticated'
        and (storage.foldername(name))[1] = auth.uid()::text
    );

-- chat_media (private)
create policy "chat_media_select_own"
    on storage.objects for select
    using (
        bucket_id = 'chat_media'
        and auth.role() = 'authenticated'
        and (storage.foldername(name))[1] = auth.uid()::text
    );

create policy "chat_media_insert_own"
    on storage.objects for insert
    with check (
        bucket_id = 'chat_media'
        and auth.role() = 'authenticated'
        and (storage.foldername(name))[1] = auth.uid()::text
    );

create policy "chat_media_delete_own"
    on storage.objects for delete
    using (
        bucket_id = 'chat_media'
        and auth.role() = 'authenticated'
        and (storage.foldername(name))[1] = auth.uid()::text
    );

-- verification_documents (private)
create policy "verification_documents_select_own"
    on storage.objects for select
    using (
        bucket_id = 'verification_documents'
        and auth.role() = 'authenticated'
        and (storage.foldername(name))[1] = auth.uid()::text
    );

create policy "verification_documents_insert_own"
    on storage.objects for insert
    with check (
        bucket_id = 'verification_documents'
        and auth.role() = 'authenticated'
        and (storage.foldername(name))[1] = auth.uid()::text
    );

create policy "verification_documents_delete_own"
    on storage.objects for delete
    using (
        bucket_id = 'verification_documents'
        and auth.role() = 'authenticated'
        and (storage.foldername(name))[1] = auth.uid()::text
    );

-- service_role full access
drop policy if exists "service_role_all_access" on storage.objects;
create policy "service_role_all_access"
    on storage.objects for all
    using (bucket_id in ('avatars', 'reels', 'reel_thumbnails', 'chat_media', 'verification_documents'))
    with check (bucket_id in ('avatars', 'reels', 'reel_thumbnails', 'chat_media', 'verification_documents'));
