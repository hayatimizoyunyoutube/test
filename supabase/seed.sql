-- Opsiyonel örnek veri.
-- Çalıştırmak zorunda değilsin. Sadece boş sitede örnek oyun görmek için kullanılır.

insert into public.games (
  title, slug, description, cover_url, genre, tags, status,
  release_date, score, progress_current, progress_total, rawg_slug,
  featured, is_public
)
values
  (
    'Alan Wake Remastered',
    'alan-wake-remastered',
    'Karanlık atmosferli hikaye odaklı seri örneği.',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=900&auto=format&fit=crop',
    'Aksiyon / Gerilim',
    array['Hikaye','Korku','Remastered'],
    'playing',
    '2021-10-05',
    88,
    7,
    12,
    'alan-wake-remastered',
    true,
    true
  ),
  (
    'A Plague Tale: Innocence',
    'a-plague-tale-innocence',
    'Sinema tadında ilerleyen bölümlü oyun serisi örneği.',
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=900&auto=format&fit=crop',
    'Macera / Dram',
    array['Seri','Hikaye','Gizlilik'],
    'planned',
    '2019-05-14',
    84,
    0,
    16,
    'a-plague-tale-innocence',
    false,
    true
  )
on conflict (slug) do nothing;
