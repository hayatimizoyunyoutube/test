-- TAM İÇERİK EKLEME AKIŞI ŞABLONU
-- Bu dosyayı çalıştırmadan önce tüm örnek metinleri kendi gerçek verinle değiştir.
-- Demo veri olarak kullanma; gerçek içeriğini yaz.

-- 1) Kategori
insert into public.archive_categories (title, slug, description, long_description, tone, icon, highlight, sort_order, is_active)
values ('Kategori Adı', 'kategori-slug', 'Kısa açıklama.', 'Uzun açıklama.', 'purple', 'KA', 'Etiket', 10, true)
on conflict (slug) do update set title = excluded.title, description = excluded.description, long_description = excluded.long_description, updated_at = now();

-- 2) Kanal
insert into public.archive_channels (title, slug, handle, description, long_description, tone, icon, highlight, sort_order, is_active)
values ('Kanal Adı', 'kanal-slug', '@kanal', 'Kısa açıklama.', 'Uzun açıklama.', 'cyan', 'KN', 'Etiket', 10, true)
on conflict (slug) do update set title = excluded.title, handle = excluded.handle, description = excluded.description, long_description = excluded.long_description, updated_at = now();

-- 3) Seri
insert into public.playlist_series (title, slug, description, status, category_id, channel_id, total_episodes, progress_percent, is_featured, is_public, sort_order)
select 'Seri Adı', 'seri-slug', 'Seri açıklaması.', 'active', c.id, ch.id, 0, 0, true, true, 10
from public.archive_categories c
cross join public.archive_channels ch
where c.slug = 'kategori-slug' and ch.slug = 'kanal-slug'
on conflict (slug) do update set title = excluded.title, description = excluded.description, status = excluded.status, category_id = excluded.category_id, channel_id = excluded.channel_id, updated_at = now();

-- 4) Bölüm
insert into public.playlist_episodes (series_id, title, slug, episode_number, description, youtube_url, duration_text, status, published_at, is_public, sort_order)
select s.id, 'Bölüm 1', 'bolum-1', 1, 'Bölüm açıklaması.', null, '35 dk', 'published', now(), true, 1
from public.playlist_series s
where s.slug = 'seri-slug'
on conflict (series_id, episode_number) do update set title = excluded.title, slug = excluded.slug, description = excluded.description, youtube_url = excluded.youtube_url, duration_text = excluded.duration_text, status = excluded.status, updated_at = now();
