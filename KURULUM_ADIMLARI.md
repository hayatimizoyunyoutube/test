# v0.0.2 Kurulum Adımları

## 1. ZIP'i çıkar

ZIP içindeki dosyaları şu klasöre çıkar:

```txt
C:\Users\Mevlüt Yeni Pc\Desktop\Youtube Yayın Hazırlıkları\Youtube\Test
```

> Bu yeni proje olduğu için eski Hayatımız Oyun klasörünün üstüne atma. Bu klasör yeni `test` reposu içindir.

## 2. VS Code ile klasörü aç

VS Code > File > Open Folder:

```txt
C:\Users\Mevlüt Yeni Pc\Desktop\Youtube Yayın Hazırlıkları\Youtube\Test
```

## 3. Paketleri kur

Terminal aç ve çalıştır:

```bash
npm install
```

## 4. Env dosyasını oluştur

`.env.example` dosyasını kopyala ve adını `.env.local` yap.

İçini kendi değerlerinle doldur:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
RAWG_API_KEY=...
YOUTUBE_API_KEY=...
NEXT_PUBLIC_SITE_VERSION=v0.0.2
```

## 5. Supabase şemasını çalıştır

Supabase Dashboard > SQL Editor > New Query aç.

`supabase/schema.sql` içeriğini yapıştır ve Run de.

Bu şema temiz başlangıç içindir. Eski tabloları taşımaz.

## 6. Local çalıştır

```bash
npm run dev
```

Açılacak adres:

```txt
http://localhost:3000
```

## 7. GitHub'a gönder

İstersen `02-githuba-gonder.bat` dosyasını çalıştır.

Manuel komutlar:

```bash
git init
git branch -M main
git remote remove origin
git remote add origin https://github.com/hayatimizoyunyoutube/test.git
git add .
git commit -m "v0.0.2 temiz baslangic"
git push -f origin main
```

## 8. Vercel deploy

Vercel'de repo olarak şunu seç:

```txt
hayatimizoyunyoutube/test
```

Framework otomatik Next.js olmalı.

Vercel Environment Variables bölümüne `.env.local` içindeki değerleri ekle.

## 9. Kontrol adresleri

Localde:

```txt
http://localhost:3000
http://localhost:3000/admin
http://localhost:3000/api/health
http://localhost:3000/api/supabase/status
```

RAWG test:

```txt
http://localhost:3000/api/rawg/search?query=Alan%20Wake
```

YouTube playlist test:

```txt
http://localhost:3000/api/youtube/playlist?playlistId=PLAYLIST_ID
```


## v0.0.2 Admin Oyun Yönetimi

Admin oyun yönetimi sayfası:

```txt
http://localhost:3000/admin/games
```

Bu sayfada oyun ekleme, düzenleme, silme ve listeleme yapılır.

Önemli: Kayıt işlemleri için `.env.local` içinde şu değerler dolu olmalı:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

`SUPABASE_SERVICE_ROLE_KEY` sadece server tarafında kullanılır. Bu değeri GitHub'a açık şekilde yazma; Vercel Environment Variables bölümüne ekle.
