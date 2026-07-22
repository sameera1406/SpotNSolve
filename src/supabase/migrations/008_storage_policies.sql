-- =====================================
-- STORAGE POLICIES FOR issue-images bucket
-- =====================================

-- Allow authenticated users to upload images
drop policy if exists "storage_issue_images_insert" on storage.objects;
create policy "storage_issue_images_insert"
  on storage.objects for insert
  with check (
    bucket_id = 'issue-images'
    and auth.role() = 'authenticated'
  );

-- Allow public read of all images (bucket is already public=true, but explicit policy helps)
drop policy if exists "storage_issue_images_select" on storage.objects;
create policy "storage_issue_images_select"
  on storage.objects for select
  using (bucket_id = 'issue-images');

-- Allow owner to update/delete their own uploaded images
drop policy if exists "storage_issue_images_update" on storage.objects;
create policy "storage_issue_images_update"
  on storage.objects for update
  using (
    bucket_id = 'issue-images'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists "storage_issue_images_delete" on storage.objects;
create policy "storage_issue_images_delete"
  on storage.objects for delete
  using (
    bucket_id = 'issue-images'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
