import fs from "fs";
import path from "path";

const dir = "GUNCELLEMELER/PLANLANANLAR";
fs.mkdirSync(dir, { recursive: true });

function write(version, title, body) {
  fs.writeFileSync(
    path.join(dir, `${version}.md`),
    `# ${version} - ${title}

${body}

## Supabase Run

Bu sürümde gerekirse ayrıca belirtilecek.
`
  );
}

const special = {
  "v0.0.2": ["Seriler Sayfası", "Public kullanıcı için /series sayfası, tamamlanan/devam eden/yakında gelecek seri kartları ve demo içerikler eklenecek."],
  "v0.0.3": ["Kategoriler Sayfası", "Public /categories sayfası, kategori kartları ve keşif alanları hazırlanacak."],
  "v0.0.4": ["Kanallar Sayfası", "Public /channels sayfası ve kanal kartları hazırlanacak."],
  "v0.0.5": ["Seri Detay Taslağı", "/series/[slug] sayfası için public detay tasarımı hazırlanacak."],
  "v0.0.6": ["Arama ve Filtreleme Taslağı", "Public arama, durum filtresi ve kategori filtresi görünümü hazırlanacak."],
  "v0.0.7": ["Güncelleme Merkezi Taslağı", "/updates sayfası ve sürüm notları public görünümü hazırlanacak."],
  "v0.0.8": ["Mobil Arayüz İyileştirme", "Ana sayfa, seriler ve kategori alanlarının mobil uyumu güçlendirilecek."],
  "v0.0.9": ["v1.0.0 Öncesi Public Cila", "v0.0.x serisinin son public düzeltmeleri yapılacak."],
  "v1.0.0": ["Public Arşiv Beta", "Public kullanıcı için ilk büyük beta arşiv görünümü tamamlanacak."],
  "v1.0.1": ["Public Beta Fix 1", "v1.0.0 sonrası küçük hata düzeltmeleri yapılacak."],
  "v1.0.2": ["Seri Kartları Geliştirme", "Seri kartları daha profesyonel hale getirilecek."],
  "v1.0.3": ["Kategori Deneyimi Geliştirme", "Kategori sayfası daha kullanışlı hale getirilecek."],
  "v1.0.4": ["Kanal Deneyimi Geliştirme", "Kanal sayfası ve kanal kartları geliştirilecek."],
  "v1.0.5": ["SEO Başlangıcı", "Metadata, başlık ve açıklama yapıları düzenlenecek."],
  "v1.0.6": ["Performans Temizliği", "Public sayfalarda performans ve gereksiz kod temizliği yapılacak."],
  "v1.0.7": ["Public Arama Geliştirme", "Arama alanı ve filtre görünümü güçlendirilecek."],
  "v1.0.8": ["Public UI Cila", "Arayüz renkleri, boşluklar ve kart düzenleri iyileştirilecek."],
  "v1.0.9": ["v1.1.0 Öncesi Stabilite", "v1.0.x serisi tamamlanmadan önce stabilite kontrolleri yapılacak."],
  "v1.1.0": ["Supabase Public Veri Başlangıcı", "İlk Supabase public veri tabloları ve okuma altyapısı hazırlanacak."],
  "v2.0.0": ["Kullanıcı Sistemi Başlangıcı", "Kayıt/giriş altyapısı ve kullanıcı hesabı sistemi başlatılacak."],
  "v3.0.0": ["Yetkili Yönetim Hazırlığı", "Admin panel öncesi güvenli yetki sistemi altyapısı hazırlanacak."],
  "v4.0.0": ["Ana Yayın ve Açılış Sürümü", "Hayatımız Oyun YouTube arşiv video sitesi public kullanıma açılacak."]
};

function defaultTitle(version) {
  return `${version} Planlanan Geliştirme`;
}

function defaultBody(version) {
  return `## Amaç

Bu sürüm, ana yayın hedefi v4.0.0'a doğru küçük ve kontrollü bir geliştirme adımıdır.

## Plan

- Public arayüzü bozmadan ilerlemek
- Kullanıcıya görünen alanları profesyonel tutmak
- Admin ve gizli yönetim alanlarını erken sürümlerde public arayüze koymamak
- Her değişiklik sonrası build/deploy kontrolü yapmak`;
}

const versions = [];

// v0.0.2 - v0.0.9
for (let patch = 2; patch <= 9; patch++) {
  versions.push(`v0.0.${patch}`);
}

// v1.0.0 - v1.9.9
for (let minor = 0; minor <= 9; minor++) {
  for (let patch = 0; patch <= 9; patch++) {
    versions.push(`v1.${minor}.${patch}`);
  }
}

// v2.0.0 - v2.9.9
for (let minor = 0; minor <= 9; minor++) {
  for (let patch = 0; patch <= 9; patch++) {
    versions.push(`v2.${minor}.${patch}`);
  }
}

// v3.0.0 - v3.9.9
for (let minor = 0; minor <= 9; minor++) {
  for (let patch = 0; patch <= 9; patch++) {
    versions.push(`v3.${minor}.${patch}`);
  }
}

// final
versions.push("v4.0.0");

for (const version of versions) {
  const item = special[version];
  if (item) {
    write(version, item[0], `## Amaç

${item[1]}

## Ana kural

Her şey küçük ve kontrollü ilerleyecek. Normal kullanıcıya admin alanları gösterilmeyecek.`);
  } else {
    write(version, defaultTitle(version), defaultBody(version));
  }
}

console.log(`${versions.length} plan dosyası oluşturuldu.`);
