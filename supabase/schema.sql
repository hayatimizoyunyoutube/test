-- Hayatımız Oyun - v1.1.0 Supabase Public Veri Başlangıcı
-- Bu dosya demo veri eklemez. Sadece gerçek public arşiv tablolarını oluşturur.

create extension if not exists pgcrypto;

create table if not exists public.archive_categories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  long_description text,
  tone text not null default 'purple' check (tone in ('purple','blue','green','orange','red','cyan')),
  icon text,
  highlight text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.archive_channels (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  handle text,
  description text,
  long_description text,
  tone text not null default 'purple' check (tone in ('purple','blue','green','orange','red','cyan')),
  icon text,
  highlight text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.playlist_series (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  status text not null default 'planned' check (status in ('completed','active','planned')),
  category_id uuid references public.archive_categories(id) on delete set null,
  channel_id uuid references public.archive_channels(id) on delete set null,
  cover_url text,
  banner_url text,
  youtube_playlist_id text,
  youtube_playlist_url text,
  total_episodes integer not null default 0 check (total_episodes >= 0),
  progress_percent integer not null default 0 check (progress_percent >= 0 and progress_percent <= 100),
  is_featured boolean not null default false,
  is_public boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.playlist_episodes (
  id uuid primary key default gen_random_uuid(),
  series_id uuid not null references public.playlist_series(id) on delete cascade,
  title text not null,
  slug text not null,
  episode_number integer not null default 1 check (episode_number >= 1),
  description text,
  youtube_video_id text,
  youtube_url text,
  thumbnail_url text,
  duration_text text,
  status text not null default 'planned' check (status in ('published','draft','planned')),
  published_at timestamptz,
  is_public boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(series_id, slug),
  unique(series_id, episode_number)
);

create index if not exists archive_categories_slug_idx on public.archive_categories(slug);
create index if not exists archive_categories_active_sort_idx on public.archive_categories(is_active, sort_order);
create index if not exists archive_channels_slug_idx on public.archive_channels(slug);
create index if not exists archive_channels_active_sort_idx on public.archive_channels(is_active, sort_order);
create index if not exists playlist_series_slug_idx on public.playlist_series(slug);
create index if not exists playlist_series_public_status_idx on public.playlist_series(is_public, status, sort_order);
create index if not exists playlist_series_category_idx on public.playlist_series(category_id);
create index if not exists playlist_series_channel_idx on public.playlist_series(channel_id);
create index if not exists playlist_episodes_series_idx on public.playlist_episodes(series_id, episode_number);
create index if not exists playlist_episodes_public_idx on public.playlist_episodes(is_public, published_at);

alter table public.archive_categories enable row level security;
alter table public.archive_channels enable row level security;
alter table public.playlist_series enable row level security;
alter table public.playlist_episodes enable row level security;

drop policy if exists "Public can read active archive categories" on public.archive_categories;
create policy "Public can read active archive categories"
  on public.archive_categories
  for select
  using (is_active = true);

drop policy if exists "Public can read active archive channels" on public.archive_channels;
create policy "Public can read active archive channels"
  on public.archive_channels
  for select
  using (is_active = true);

drop policy if exists "Public can read public playlist series" on public.playlist_series;
create policy "Public can read public playlist series"
  on public.playlist_series
  for select
  using (is_public = true);

drop policy if exists "Public can read public playlist episodes" on public.playlist_episodes;
create policy "Public can read public playlist episodes"
  on public.playlist_episodes
  for select
  using (is_public = true);
