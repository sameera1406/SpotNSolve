-- =====================================
-- TRIGGER: Auto-create profile on signup
-- =====================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username, role, points)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'role', 'user'),
    0
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- =====================================
-- TRIGGER: updated_at on profiles
-- =====================================

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

drop trigger if exists set_issues_updated_at on public.issues;
create trigger set_issues_updated_at
  before update on public.issues
  for each row execute procedure public.set_updated_at();


-- =====================================
-- TRIGGER: Award points when a vote is cast
-- Each vote gives the issue owner +2 points and the voter +1 point
-- =====================================

create or replace function public.handle_new_vote()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  issue_owner_id uuid;
begin
  -- Increment votes count on the issue
  update public.issues
  set votes = votes + 1
  where id = new.issue_id;

  -- Get the issue owner
  select user_id into issue_owner_id
  from public.issues
  where id = new.issue_id;

  -- Award +2 points to the issue owner
  if issue_owner_id is not null and issue_owner_id != new.user_id then
    update public.profiles
    set points = points + 2
    where id = issue_owner_id;
  end if;

  -- Award +1 point to the voter
  update public.profiles
  set points = points + 1
  where id = new.user_id;

  return new;
end;
$$;

drop trigger if exists on_vote_created on public.votes;
create trigger on_vote_created
  after insert on public.votes
  for each row execute procedure public.handle_new_vote();


-- =====================================
-- TRIGGER: Decrement votes and remove points when vote is removed
-- =====================================

create or replace function public.handle_delete_vote()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  issue_owner_id uuid;
begin
  -- Decrement votes count on the issue
  update public.issues
  set votes = greatest(votes - 1, 0)
  where id = old.issue_id;

  -- Get the issue owner
  select user_id into issue_owner_id
  from public.issues
  where id = old.issue_id;

  -- Remove +2 points from the issue owner
  if issue_owner_id is not null and issue_owner_id != old.user_id then
    update public.profiles
    set points = greatest(points - 2, 0)
    where id = issue_owner_id;
  end if;

  -- Remove +1 point from the voter
  update public.profiles
  set points = greatest(points - 1, 0)
  where id = old.user_id;

  return old;
end;
$$;

drop trigger if exists on_vote_deleted on public.votes;
create trigger on_vote_deleted
  after delete on public.votes
  for each row execute procedure public.handle_delete_vote();


-- =====================================
-- TRIGGER: Award bonus points when an issue is resolved
-- +5 points to issue owner when status changes to 'Resolved'
-- =====================================

create or replace function public.handle_issue_resolved()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if new.status = 'Resolved' and old.status != 'Resolved' then
    update public.profiles
    set points = points + 5
    where id = new.user_id;
  end if;

  -- Remove bonus points if un-resolved
  if old.status = 'Resolved' and new.status != 'Resolved' then
    update public.profiles
    set points = greatest(points - 5, 0)
    where id = new.user_id;
  end if;

  return new;
end;
$$;

drop trigger if exists on_issue_status_changed on public.issues;
create trigger on_issue_status_changed
  after update of status on public.issues
  for each row execute procedure public.handle_issue_resolved();


-- =====================================
-- TRIGGER: Award +10 points when an issue is first created
-- =====================================

create or replace function public.handle_new_issue()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  update public.profiles
  set points = points + 10
  where id = new.user_id;
  return new;
end;
$$;

drop trigger if exists on_issue_created on public.issues;
create trigger on_issue_created
  after insert on public.issues
  for each row execute procedure public.handle_new_issue();
