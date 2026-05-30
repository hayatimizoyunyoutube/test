# v1.1.0 Supabase Run Notu

Bu sürümde Supabase Run gereklidir.

Supabase Dashboard içinde:

1. Project → SQL Editor bölümünü aç.
2. `supabase/schema.sql` dosyasının tamamını kopyala.
3. SQL Editor içine yapıştır.
4. Run çalıştır.

## Önemli

Bu schema demo veri eklemez. Sadece gerçek arşiv tablolarını oluşturur.

Demo The Witcher, Elden Ring, GTA gibi sahte kartlar artık yoktur. Supabase tablolarına gerçek veri eklenene kadar public sayfalarda profesyonel boş durum ekranı görünür.

## Vercel Environment Variables

v1.1.0 için Vercel ortamında şunlar dolu olmalı:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

Şimdilik public okuma için `NEXT_PUBLIC_SUPABASE_URL` ve `NEXT_PUBLIC_SUPABASE_ANON_KEY` yeterlidir. Service role ileride admin panelde kullanılacak.
