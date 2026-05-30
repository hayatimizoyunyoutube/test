export type UpdateStatus = "completed" | "planned" | "target";

export type UpdateNote = {
  version: string;
  title: string;
  status: UpdateStatus;
  summary: string;
  items: string[];
  supabaseRun: string;
};

export const completedUpdates: UpdateNote[] = [
  { version: "v0.0.1", title: "Temiz Public Başlangıç", status: "completed", summary: "Sitenin temiz çalışan ilk public ana sayfası oluşturuldu.", items: ["Public ana sayfa", "YouTube arşiv tanıtımı", "/api/health endpoint"], supabaseRun: "Gerekli değil" },
  { version: "v0.0.2", title: "Seriler Sayfası", status: "completed", summary: "Public /series sayfası ve demo seri kartları eklendi.", items: ["Tamamlanan seriler", "Devam eden seriler", "Yakında gelecek seriler"], supabaseRun: "Gerekli değil" },
  { version: "v0.0.3", title: "Kategoriler Sayfası", status: "completed", summary: "Public /categories sayfası ve kategori kartları eklendi.", items: ["Kategori kartları", "Demo seri bağlantıları", "Keşif alanı"], supabaseRun: "Gerekli değil" },
  { version: "v0.0.4", title: "Kanallar Sayfası", status: "completed", summary: "Public /channels sayfası ve demo kanal kartları eklendi.", items: ["Kanal kartları", "Kanal-seri bağlantısı", "Public kanal görünümü"], supabaseRun: "Gerekli değil" },
  { version: "v0.0.5", title: "Seri Detay Taslağı", status: "completed", summary: "Public /series/[slug] detay sayfası eklendi.", items: ["Seri hero alanı", "Demo bölüm listesi", "Benzer seriler"], supabaseRun: "Gerekli değil" },
  { version: "v0.0.6", title: "Arama ve Filtreleme Taslağı", status: "completed", summary: "Public /series sayfasına arama ve filtreleme eklendi.", items: ["Seri arama", "Durum filtresi", "Kategori ve kanal filtresi"], supabaseRun: "Gerekli değil" },
  { version: "v0.0.7", title: "Güncelleme Merkezi Taslağı", status: "completed", summary: "Public /updates sayfası eklendi.", items: ["Tamamlanan sürümler", "Planlanan sürümler", "v4.0.0 hedefi"], supabaseRun: "Gerekli değil" },
  { version: "v0.0.8", title: "Mobil Arayüz İyileştirme", status: "completed", summary: "Mobil görünüm, arama alanı ve buton tasarımları profesyonelleştirildi.", items: ["Mobil header", "Profesyonel arama", "Buton ve kart cilası"], supabaseRun: "Gerekli değil" },
  { version: "v0.0.9", title: "v1.0.0 Öncesi Public Cila", status: "completed", summary: "Güncelleme merkezi tek kolon ve daha okunabilir hale getirildi.", items: ["Tek kolon güncelleme akışı", "Kompakt kartlar", "Mobil akış iyileştirmesi"], supabaseRun: "Gerekli değil" },
  { version: "v1.0.0", title: "Public Arşiv Beta", status: "completed", summary: "Public kullanıcı için ilk beta arşiv görünümü tamamlandı.", items: ["Ana sayfa beta görünümü", "Arşiv istatistikleri", "Öne çıkan seri vitrini", "Keşif alanları"], supabaseRun: "Gerekli değil" },
  { version: "v1.0.1", title: "Public Beta Fix 1", status: "completed", summary: "Public arayüz, mobil düzen ve link akışı temizlendi.", items: ["Config sürüm dosyası", "Health endpoint güncellemesi", "Profesyonel 404 sayfası"], supabaseRun: "Gerekli değil" },
  { version: "v1.0.2", title: "Seri Kartları Geliştirme", status: "completed", summary: "Seri kartları daha profesyonel ve mobil uyumlu hale getirildi.", items: ["Premium seri kart tasarımı", "İlerleme alanı", "Detay aksiyonları"], supabaseRun: "Gerekli değil" },
  { version: "v1.0.3", title: "Profesyonel Ana Sayfa Vitrini", status: "completed", summary: "Ana sayfa daha sinematik ve arşiv sitesi hissine yakın hale getirildi.", items: ["Kompakt üst header", "Büyük hero/banner", "Son eklenen videolar"], supabaseRun: "Gerekli değil" },
  { version: "v1.0.4", title: "Kategori Deneyimi Geliştirme", status: "completed", summary: "Kategori sayfası daha profesyonel vitrin görünümüne taşındı.", items: ["Kategori hero alanı", "Premium kategori kartları", "Kategori istatistikleri"], supabaseRun: "Gerekli değil" },
  { version: "v1.0.5", title: "Kanal Deneyimi Geliştirme", status: "completed", summary: "Kanal sayfası daha profesyonel arşiv görünümüne taşındı.", items: ["Kanal hero alanı", "Premium kanal kartları", "Kanal istatistikleri"], supabaseRun: "Gerekli değil" },
  { version: "v1.0.6", title: "Güncelleme Merkezi Geliştirme", status: "completed", summary: "Güncelleme merkezi daha profesyonel ve okunabilir hale getirildi.", items: ["Premium hero alanı", "Sürüm istatistikleri", "Yol haritası kartları", "Mobil görünüm iyileştirmesi"], supabaseRun: "Gerekli değil" }
];

export const plannedUpdates: UpdateNote[] = [
  { version: "v1.0.7", title: "Mobil Public Deneyim", status: "planned", summary: "Public sayfaların mobil deneyimi daha da güçlendirilecek.", items: ["Mobil menü", "Kartların mobil düzeni", "Hero alanı mobil düzeni"], supabaseRun: "Gerekli değil" },
  { version: "v1.0.8", title: "SEO ve Performans Hazırlığı", status: "planned", summary: "Sayfa başlıkları, açıklamalar ve performans temizlikleri yapılacak.", items: ["Metadata düzeni", "Open Graph hazırlığı", "Sayfa başlıkları"], supabaseRun: "Gerekli değil" },
  { version: "v1.0.9", title: "v1.1.0 Öncesi Stabilite", status: "planned", summary: "v1.0.x public seri son kontrolleri yapılacak.", items: ["Route kontrolleri", "Link kontrolleri", "Mobil/tablet son düzeltmeler"], supabaseRun: "Gerekli değil" },
  { version: "v1.1.0", title: "Supabase Public Veri Başlangıcı", status: "planned", summary: "Public arşiv verileri Supabase üzerinden okunmaya başlayacak.", items: ["İlk schema.sql", "Public veri okuma", "Demo verilerin tabloya taşınması"], supabaseRun: "Gerekli olacak" },
  { version: "v4.0.0", title: "Ana Yayın ve Açılış Sürümü", status: "target", summary: "Hayatımız Oyun YouTube arşiv video sitesi public kullanıma açılacak.", items: ["Profesyonel public site", "Supabase veri sistemi", "Güvenli admin panel", "YouTube playlist arşivi"], supabaseRun: "Gerekli olabilir" }
];

export const allUpdates: UpdateNote[] = [...completedUpdates, ...plannedUpdates];
