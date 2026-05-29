# Hayatımız Oyun — Yeni Sistem v0.0.3

Bu paket eski sistemi taşımadan sıfırdan hazırlanmış yeni mimarinin ikinci sürümüdür.

## Hedef

- Vercel + Supabase + GitHub ile profesyonel, temiz, bozulması zor mimari.
- RAWG ve YouTube API mantığı korunur, ancak kodlar yeni Next.js API route/server action yapısına ayrılır.
- Her sürüm ZIP olarak verilir; eklenenler `GUNCELLEMELER/TAMAMLANANLAR` içine yazılır.
- Sonraki sürümler `GUNCELLEMELER/PLANLANANLAR` içinde takip edilir.

## Teknoloji

- Next.js App Router
- TypeScript
- Supabase
- Vercel Serverless API Routes
- Server Actions
- RAWG API
- YouTube Data API

## v0.0.3 İçeriği

- `/admin/games` oyun yönetimi sayfası
- Supabase’den oyun listeleme
- Oyun ekleme
- Oyun düzenleme
- Oyun silme
- Kapak URL, banner URL, tür, etiket, platform, durum, puan, bölüm ilerlemesi, RAWG ve YouTube alanları
- Public/gizli ve öne çıkan oyun ayarları
- Supabase env eksikse güvenli örnek veri ekranı
- Güncel `supabase/schema.sql`

## Klasör

Kullanıcının hedef Windows klasörü:

```txt
C:\Users\Mevlüt Yeni Pc\Desktop\Youtube Yayın Hazırlıkları\Youtube\Test
```

GitHub repo:

```txt
https://github.com/hayatimizoyunyoutube/test
```

## Hızlı Kurulum

Detaylı anlatım için `KURULUM_ADIMLARI.md` dosyasına bak.

```bash
npm install
npm run dev
```

Tarayıcı:

```txt
http://localhost:3000
```

Admin oyun yönetimi:

```txt
http://localhost:3000/admin/games
```
