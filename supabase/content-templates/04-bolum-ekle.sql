-- BÖLÜM EKLEME ŞABLONU
-- Önce seri eklenmiş olmalı.
-- seri-slug değerini gerçek seri slug ile değiştir.

insert into public.playlist_episodes (
  series_id,
  title,
  slug,
  episode_number,
  description,
  youtube_video_id,
  youtube_url,
  thumbnail_url,
  duration_text,
  status,
  published_at,
  is_public,
  sort_order
)
select
  s.id,
  'Bölüm Başlığı',
  'bolum-slug',
  1,
  'Bölüm açıklaması.',
  null,
  null,
  null,
  '35 dk',
  'published',
  now(),
  true,
  1
from public.playlist_series s
where s.slug = 'seri-slug'
on conflict (series_id, episode_number) do update set
  title = excluded.title,
  slug = excluded.slug,
  description = excluded.description,
  youtube_video_id = excluded.youtube_video_id,
  youtube_url = excluded.youtube_url,
  thumbnail_url = excluded.thumbnail_url,
  duration_text = excluded.duration_text,
  status = excluded.status,
  published_at = excluded.published_at,
  is_public = excluded.is_public,
  sort_order = excluded.sort_order,
  updated_at = now();

-- Seri bölüm sayısını ve ilerlemeyi güncellemek istersen:
update public.playlist_series
set total_episodes = (
  select count(*) from public.playlist_episodes e
  where e.series_id = playlist_series.id and e.is_public = true
),
progress_percent = 100,
updated_at = now()
where slug = 'seri-slug';
