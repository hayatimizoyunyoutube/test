-- SERİ EKLEME ŞABLONU
-- Önce kategori ve kanal eklenmiş olmalı.
-- category-slug ve kanal-slug değerlerini gerçek slug ile değiştir.

insert into public.playlist_series (
  title,
  slug,
  description,
  status,
  category_id,
  channel_id,
  cover_url,
  banner_url,
  youtube_playlist_id,
  youtube_playlist_url,
  total_episodes,
  progress_percent,
  is_featured,
  is_public,
  sort_order
)
select
  'Seri Adı',
  'seri-slug',
  'Seri açıklaması.',
  'active',
  c.id,
  ch.id,
  null,
  null,
  null,
  null,
  0,
  0,
  false,
  true,
  10
from public.archive_categories c
cross join public.archive_channels ch
where c.slug = 'kategori-slug'
  and ch.slug = 'kanal-slug'
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  status = excluded.status,
  category_id = excluded.category_id,
  channel_id = excluded.channel_id,
  cover_url = excluded.cover_url,
  banner_url = excluded.banner_url,
  youtube_playlist_id = excluded.youtube_playlist_id,
  youtube_playlist_url = excluded.youtube_playlist_url,
  total_episodes = excluded.total_episodes,
  progress_percent = excluded.progress_percent,
  is_featured = excluded.is_featured,
  is_public = excluded.is_public,
  sort_order = excluded.sort_order,
  updated_at = now();
