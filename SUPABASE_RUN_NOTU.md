# v1.1.2 Supabase Run Notu

Bu sürümde zorunlu yeni tablo değişikliği yoktur.

## SQL çalıştırmak zorunlu mu?

Hayır.

v1.1.0 schema ve v1.1.1 fix SQL daha önce çalıştıysa site çalışır.

## Ne zaman SQL çalıştırılır?

Gerçek içerik eklemek istediğinde şu şablonları kullanabilirsin:

```txt
supabase/content-templates/01-kategori-ekle.sql
supabase/content-templates/02-kanal-ekle.sql
supabase/content-templates/03-seri-ekle.sql
supabase/content-templates/04-bolum-ekle.sql
supabase/content-templates/05-tam-ornek-akis.sql
```

## İçerik ekleme sırası

1. Kategori ekle
2. Kanal ekle
3. Seri ekle
4. Bölüm ekle

## Demo veri

Demo veri eklenmez. Şablonlardaki örnek metinleri gerçek içerikle değiştirerek çalıştırmalısın.
