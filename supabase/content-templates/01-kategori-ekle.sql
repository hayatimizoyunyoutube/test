-- KATEGORİ EKLEME ŞABLONU
-- Değerleri kendi gerçek kategorine göre değiştir.

insert into public.archive_categories (
  title,
  slug,
  description,
  long_description,
  tone,
  icon,
  highlight,
  sort_order,
  is_active
) values (
  'Kategori Adı',
  'kategori-slug',
  'Kısa kategori açıklaması.',
  'Daha uzun kategori açıklaması.',
  'purple',
  'KA',
  'Kategori etiketi',
  10,
  true
)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  long_description = excluded.long_description,
  tone = excluded.tone,
  icon = excluded.icon,
  highlight = excluded.highlight,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active,
  updated_at = now();
