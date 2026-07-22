-- =====================================
-- FULL RLS POLICIES
-- Run after 002_rls_policies.sql (which already enables RLS on all tables)
-- =====================================


-- =====================================
-- PROFILES
-- =====================================

-- Everyone can read all profiles (for leaderboard, username display)
drop policy if exists "profiles_select_all" on public.profiles;
create policy "profiles_select_all"
  on public.profiles for select
  using (true);

-- Users can only update their own profile
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Users can insert their own profile (for the handle_new_user trigger path)
drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);


-- =====================================
-- CATEGORIES
-- =====================================

-- Anyone (including anonymous) can read categories
drop policy if exists "categories_select_all" on public.categories;
create policy "categories_select_all"
  on public.categories for select
  using (true);

-- Only admins can insert/update/delete categories
drop policy if exists "categories_admin_all" on public.categories;
create policy "categories_admin_all"
  on public.categories for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );


-- =====================================
-- ISSUES
-- =====================================

-- Anyone (including anonymous) can read all issues
drop policy if exists "issues_select_all" on public.issues;
create policy "issues_select_all"
  on public.issues for select
  using (true);

-- Authenticated users can insert their own issues
drop policy if exists "issues_insert_own" on public.issues;
create policy "issues_insert_own"
  on public.issues for insert
  with check (auth.uid() = user_id);

-- Issue owner can update their own issue (e.g. photo)
drop policy if exists "issues_update_own" on public.issues;
create policy "issues_update_own"
  on public.issues for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Admin can update any issue (status changes)
drop policy if exists "issues_update_admin" on public.issues;
create policy "issues_update_admin"
  on public.issues for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Issue owner can delete their own issue
drop policy if exists "issues_delete_own" on public.issues;
create policy "issues_delete_own"
  on public.issues for delete
  using (auth.uid() = user_id);

-- Admin can delete any issue
drop policy if exists "issues_delete_admin" on public.issues;
create policy "issues_delete_admin"
  on public.issues for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );


-- =====================================
-- COMMENTS
-- =====================================

-- Anyone can read all comments
drop policy if exists "comments_select_all" on public.comments;
create policy "comments_select_all"
  on public.comments for select
  using (true);

-- Authenticated users can insert their own comments
drop policy if exists "comments_insert_own" on public.comments;
create policy "comments_insert_own"
  on public.comments for insert
  with check (auth.uid() = user_id);

-- Comment owner or admin can delete
drop policy if exists "comments_delete_own" on public.comments;
create policy "comments_delete_own"
  on public.comments for delete
  using (
    auth.uid() = user_id
    or exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );


-- =====================================
-- VOTES
-- =====================================

-- Anyone can read all votes (to see vote counts)
drop policy if exists "votes_select_all" on public.votes;
create policy "votes_select_all"
  on public.votes for select
  using (true);

-- Authenticated users can insert their own vote
drop policy if exists "votes_insert_own" on public.votes;
create policy "votes_insert_own"
  on public.votes for insert
  with check (auth.uid() = user_id);

-- Vote owner can delete their own vote (un-vote)
drop policy if exists "votes_delete_own" on public.votes;
create policy "votes_delete_own"
  on public.votes for delete
  using (auth.uid() = user_id);
