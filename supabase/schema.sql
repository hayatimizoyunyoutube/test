-- Hayatımız Oyun Yeni Sistem v0.0.2
-- Temiz başlangıç şemasıdır. Eski sistemi taşımaz.
-- Güvenli çalışır: create table if not exists kullanır, mevcut verileri silmez.

set statement_timeout = '20s';
set lock_timeout = '3s';

create extension if not exists pgcrypto;

create table if not exists public.site_schema_versions (
  id bigserial primary key,
  version text not null,
  note text,
  created_at timestamptz default now()
);

create table if not exists public.site_runtime_config (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.games (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  description text,
  cover_url text,
  banner_url text,
  genre text,
  tags text[] default '{}',
  platforms text[] default '{}',
  status text not null default 'planned' check (status in ('playing','completed','planned','paused')),
  release_date date,
  score numeric(4,1),
  progress_current integer default 0,
  progress_total integer default 0,
  rawg_id integer,
  rawg_slug text,
  youtube_playlist_id text,
  youtube_playlist_url text,
  series_name text,
  series_order integer default 0,
  featured boolean default false,
  is_public boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.game_episodes (
  id uuid primary key default gen_random_uuid(),
  game_id uuid references public.games(id) on delete cascade,
  episode_number integer,
  title text not null,
  youtube_video_id text,
  video_url text,
  thumbnail_url text,
  duration text,
  view_count bigint,
  published_at timestamptz,
  is_public boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.site_update_notes (
  id uuid primary key default gen_random_uuid(),
  version text not null,
  title text not null,
  summary text,
  note text,
  status text default 'published' check (status in ('draft','planned','published')),
  pinned boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.api_sync_logs (
  id uuid primary key default gen_random_uuid(),
  provider text not null check (provider in ('rawg','youtube','supabase','system')),
  action text not null,
  status text not null default 'success' check (status in ('success','warning','error')),
  detail jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_games_updated_at on public.games;
create trigger set_games_updated_at
before update on public.games
for each row execute function public.set_updated_at();

drop trigger if exists set_game_episodes_updated_at on public.game_episodes;
create trigger set_game_episodes_updated_at
before update on public.game_episodes
for each row execute function public.set_updated_at();

drop trigger if exists set_site_update_notes_updated_at on public.site_update_notes;
create trigger set_site_update_notes_updated_at
before update on public.site_update_notes
for each row execute function public.set_updated_at();

drop trigger if exists set_site_runtime_config_updated_at on public.site_runtime_config;
create trigger set_site_runtime_config_updated_at
before update on public.site_runtime_config
for each row execute function public.set_updated_at();

alter table public.games enable row level security;
alter table public.game_episodes enable row level security;
alter table public.site_update_notes enable row level security;
alter table public.site_runtime_config enable row level security;
alter table public.site_schema_versions enable row level security;
alter table public.api_sync_logs enable row level security;

drop policy if exists "Public games are readable" on public.games;
create policy "Public games are readable" on public.games
for select using (is_public = true);

drop policy if exists "Public episodes are readable" on public.game_episodes;
create policy "Public episodes are readable" on public.game_episodes
for select using (is_public = true);

drop policy if exists "Published update notes are readable" on public.site_update_notes;
create policy "Published update notes are readable" on public.site_update_notes
for select using (status = 'published');

drop policy if exists "Runtime config is readable" on public.site_runtime_config;
create policy "Runtime config is readable" on public.site_runtime_config
for select using (true);

drop policy if exists "Schema versions are readable" on public.site_schema_versions;
create policy "Schema versions are readable" on public.site_schema_versions
for select using (true);

insert into public.site_runtime_config (key, value)
values
  ('site_version', jsonb_build_object('version', 'v0.0.2', 'label', 'Oyun Yönetimi Başlangıcı'))
on conflict (key) do update set value = excluded.value, updated_at = now();

insert into public.site_runtime_config (key, value)
values
  ('maintenance_mode', jsonb_build_object('enabled', false, 'percent', 0, 'message', 'Site aktif.', 'estimated_opening', null))
on conflict (key) do nothing;

insert into public.site_schema_versions (version, note)
select 'v0.0.1', 'Yeni sistem temiz başlangıç şeması eklendi.'
where not exists (
  select 1 from public.site_schema_versions where version = 'v0.0.1'
);

insert into public.site_schema_versions (version, note)
select 'v0.0.2', 'Admin oyun ekleme, düzenleme, silme ve listeleme modülü için indeksler ve sürüm kaydı eklendi.'
where not exists (
  select 1 from public.site_schema_versions where version = 'v0.0.2'
);

create index if not exists idx_games_created_at_desc on public.games(created_at desc);
create index if not exists idx_games_featured_created_at on public.games(featured desc, created_at desc);
create index if not exists idx_games_is_public on public.games(is_public);
create index if not exists idx_games_status on public.games(status);
create index if not exists idx_games_slug on public.games(slug);

insert into public.site_update_notes (version, title, summary, note, status, pinned)
select
  'v0.0.1',
  'Yeni sistem temiz başlangıç',
  'Next.js + Supabase + RAWG + YouTube altyapısı kuruldu.',
  'Eski sistem taşınmadan sıfırdan profesyonel mimari başlatıldı.',
  'published',
  true
where not exists (
  select 1 from public.site_update_notes where version = 'v0.0.1'
);

insert into public.site_update_notes (version, title, summary, note, status, pinned)
select
  'v0.0.2',
  'Admin oyun yönetimi aktif',
  'Oyun ekleme, düzenleme, silme ve listeleme paneli eklendi.',
  'Yeni sistemde Supabase games tablosunu kullanan temiz admin CRUD modülü eklendi. RAWG ve YouTube otomasyonları sonraki sürümlere ayrıldı.',
  'published',
  true
where not exists (
  select 1 from public.site_update_notes where version = 'v0.0.2'
);
