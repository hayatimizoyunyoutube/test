-- Hayatımız Oyun v1.1.0 null title/slug runtime fix
-- Mevcut eski/yarım kayıtların null title/slug alanlarını güvenli doldurur.

update public.archive_categories
set title = 'İsimsiz Kategori ' || left(id::text, 8)
where title is null or trim(title) = '';

update public.archive_categories
set slug = 'category-' || left(id::text, 8)
where slug is null or trim(slug) = '';

update public.archive_channels
set title = 'İsimsiz Kanal ' || left(id::text, 8)
where title is null or trim(title) = '';

update public.archive_channels
set slug = 'channel-' || left(id::text, 8)
where slug is null or trim(slug) = '';

update public.playlist_series
set title = 'İsimsiz Seri ' || left(id::text, 8)
where title is null or trim(title) = '';

update public.playlist_series
set slug = 'series-' || left(id::text, 8)
where slug is null or trim(slug) = '';

update public.playlist_episodes
set title = 'İsimsiz Bölüm ' || left(id::text, 8)
where title is null or trim(title) = '';

update public.playlist_episodes
set slug = 'episode-' || left(id::text, 8)
where slug is null or trim(slug) = '';

update public.playlist_series set total_episodes = 0 where total_episodes is null;
update public.playlist_series set progress_percent = 0 where progress_percent is null;
update public.archive_categories set is_active = true where is_active is null;
update public.archive_channels set is_active = true where is_active is null;
update public.playlist_series set is_public = true where is_public is null;
update public.playlist_episodes set is_public = true where is_public is null;
