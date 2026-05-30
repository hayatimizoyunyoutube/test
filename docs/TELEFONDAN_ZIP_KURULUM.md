# Telefondan ZIP Kurulum

1. ZIP dosyasını indir.
2. GitHub Codespaces veya bilgisayarda proje klasörüne çıkar.
3. Eski dosyaları temizleyeceksen `.git` klasörünü silme.
4. ZIP içeriğini proje köküne kopyala.
5. Terminalde çalıştır:

```bash
npm install
npm run build
git add .
git commit -m "v1.0.6 guncelleme merkezi zip fix"
git push origin main
```

## Supabase

Bu sürümde Supabase SQL çalıştırma yok.
