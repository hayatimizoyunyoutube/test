# v1.1.2 - Supabase İçerik Ekleme Rehberi

Bu sürümden itibaren demo veri yoktur. Public sayfalar gerçek Supabase verisiyle çalışır.

## Sıralama

İçerik eklerken sıra önemli:

1. Kategori ekle
2. Kanal ekle
3. Seri ekle
4. Bölüm ekle

Seri eklerken `category_id` ve `channel_id` alanları kullanılır. Bu nedenle önce kategori ve kanal kayıtları oluşturulmalıdır.

## Dosyalar

Şablonlar şu klasörde bulunur:

```txt
supabase/content-templates/
```

Kullanılacak dosyalar:

```txt
01-kategori-ekle.sql
02-kanal-ekle.sql
03-seri-ekle.sql
04-bolum-ekle.sql
05-tam-ornek-akis.sql
```

## Önemli kural

Bu SQL dosyaları demo veri değildir. İçindeki örnek alanları kendi gerçek içeriğinle değiştirerek çalıştırmalısın.

## Slug kuralı

Slug küçük harf ve tireli olmalı:

```txt
the-witcher-3
god-of-war
hayatimiz-oyun
rpg
```

## Status değerleri

Seri için geçerli durumlar:

```txt
completed
active
planned
```

Bölüm için geçerli durumlar:

```txt
published
draft
planned
```

## Site davranışı

- Supabase’de veri yoksa demo kart gösterilmez.
- Veri yoksa profesyonel boş durum ekranı gösterilir.
- Eksik başlık veya slug varsa site patlamaz; ama veri temizliği önerilir.

## Supabase Run

Bu sürümde zorunlu SQL yoktur. İçerik eklemek istersen şablonları kullanabilirsin.
