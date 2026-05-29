# Supabase Şema Kurulum Sırası

1. Supabase Dashboard aç.
2. Yeni proje oluştur veya mevcut test projesine gir.
3. SQL Editor > New Query aç.
4. `supabase/schema.sql` dosyasındaki tüm içeriği yapıştır.
5. Run butonuna bas.
6. Vercel env alanına şu değerleri gir:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
RAWG_API_KEY=
YOUTUBE_API_KEY=
NEXT_PUBLIC_SITE_VERSION=v0.0.2
```

Not: Bu şema eski verileri taşımaz. Yeni site sıfırdan başlar.
