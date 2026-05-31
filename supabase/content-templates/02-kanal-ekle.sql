-- KANAL EKLEME ŞABLONU
-- Değerleri kendi gerçek kanalına göre değiştir.

insert into public.archive_channels (
  title,
  slug,
  handle,
  description,
  long_description,
  tone,
  icon,
  highlight,
  sort_order,
  is_active
) values (
  'Kanal Adı',
  'kanal-slug',
  '@kanalhandle',
  'Kısa kanal açıklaması.',
  'Daha uzun kanal açıklaması.',
  'cyan',
  'KN',
  'Kanal etiketi',
  10,
  true
)
on conflict (slug) do update set
  title = excluded.title,
  handle = excluded.handle,
  description = excluded.description,
  long_description = excluded.long_description,
  tone = excluded.tone,
  icon = excluded.icon,
  highlight = excluded.highlight,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active,
  updated_at = now();
