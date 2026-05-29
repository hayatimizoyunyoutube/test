# Mimari Notları — v0.0.2

## Neden sıfırdan?

Eski sistemde çok fazla fix üst üste geldiği için tek dosyalı ve kırılgan yapı oluşmuştu. Bu yeni pakette aynı hatayı tekrarlamamak için her alan ayrıldı:

- `app/` → Sayfalar ve API route'ları
- `components/` → Arayüz parçaları
- `lib/` → Supabase, veri çekme ve site ayarları
- `types/` → TypeScript tipleri
- `supabase/` → SQL şeması
- `GUNCELLEMELER/` → Planlanan ve tamamlanan sürümler

## API güvenliği

RAWG ve YouTube anahtarları tarayıcı tarafına verilmez. Sadece server tarafındaki API route'larda kullanılır:

- `/api/rawg/search`
- `/api/youtube/playlist`

## Supabase güvenliği

- Public sayfa sadece `is_public = true` kayıtları okur.
- Service role key sadece server tarafında kullanılmalıdır.
- `.env.local` GitHub'a gönderilmez.

## Sürüm kuralı

Her yeni ana geliştirme ayrı ZIP olacak. Küçük hata düzeltmelerinde önce plan yazılacak, sonra gerekirse sürüm paketi hazırlanacak.


## v0.0.2 Mimari Notu

Admin oyun yönetimi server action ile çalışır. Mutasyon işlemlerinde Supabase service role key kullanılır, fakat bu anahtar yalnızca server tarafında okunur. Client component içinde service role key kullanılmaz.

Oyun kartları public sitede sadece `is_public = true` kayıtları gösterir. Admin tarafı ise tüm oyunları listeler.
