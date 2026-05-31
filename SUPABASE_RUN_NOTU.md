# Supabase Run Notu - v1.1.1

v1.1.1 için Supabase SQL zorunlu değildir.

v1.1.0 schema.sql ve null-title fix zaten çalıştıysa tekrar SQL çalıştırmana gerek yok.

Eski veya yarım kayıtlar yüzünden title/slug/progress alanlarında sorun varsa şunu çalıştırabilirsin:

```txt
supabase/schema-v1.1.1-data-fix.sql
```

Bu dosya demo veri eklemez. Sadece eski/null kayıtları güvenli hale getirir.
