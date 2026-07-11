-- =====================================
-- PROFILES
-- =====================================

create table if not exists public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,

    username text not null unique,

    role text not null default 'user'
        check(role in ('user','admin')),

    points integer default 0,

    created_at timestamptz default now(),

    updated_at timestamptz default now()
);

-- =====================================
-- CATEGORIES
-- =====================================

create table if not exists public.categories (

    id bigint generated always as identity primary key,

    name text unique not null,

    description text,

    created_at timestamptz default now()
);

-- =====================================
-- ISSUES
-- =====================================

create table if not exists public.issues (

    id uuid primary key default gen_random_uuid(),

    user_id uuid references public.profiles(id) on delete cascade,

    category_id bigint references public.categories(id),

    title text not null,

    description text not null,

    image_url text,

    latitude numeric,

    longitude numeric,

    location text,

    status text default 'Pending'
        check(status in (
            'Pending',
            'In Progress',
            'Resolved',
            'Rejected'
        )),

    priority text default 'Medium'
        check(priority in (
            'Low',
            'Medium',
            'High'
        )),

    votes integer default 0,

    created_at timestamptz default now(),

    updated_at timestamptz default now()
);

-- =====================================
-- COMMENTS
-- =====================================

create table if not exists public.comments (

    id uuid primary key default gen_random_uuid(),

    issue_id uuid references public.issues(id) on delete cascade,

    user_id uuid references public.profiles(id) on delete cascade,

    comment text not null,

    created_at timestamptz default now()
);

-- =====================================
-- VOTES
-- =====================================

create table if not exists public.votes (

    id uuid primary key default gen_random_uuid(),

    issue_id uuid references public.issues(id) on delete cascade,

    user_id uuid references public.profiles(id) on delete cascade,

    created_at timestamptz default now(),

    unique(issue_id,user_id)
);