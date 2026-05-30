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
  {
    version: "v0.0.1",
    title: "Temiz Public Başlangıç",
    status: "completed",
    summary: "Sitenin temiz çalışan ilk public ana sayfası oluşturuldu.",
    items: ["Public ana sayfa", "YouTube arşiv tanıtımı", "/api/health endpoint"],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v0.0.2",
    title: "Seriler Sayfası",
    status: "completed",
    summary: "Public /series sayfası ve demo seri kartları eklendi.",
    items: ["Tamamlanan seriler", "Devam eden seriler", "Yakında gelecek seriler"],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v0.0.3",
    title: "Kategoriler Sayfası",
    status: "completed",
    summary: "Public /categories sayfası ve kategori kartları eklendi.",
    items: ["Kategori kartları", "Demo seri bağlantıları", "Keşif alanı"],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v0.0.4",
    title: "Kanallar Sayfası",
    status: "completed",
    summary: "Public /channels sayfası ve demo kanal kartları eklendi.",
    items: ["Kanal kartları", "Kanal-seri bağlantısı", "Public kanal görünümü"],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v0.0.5",
    title: "Seri Detay Taslağı",
    status: "completed",
    summary: "Public /series/[slug] detay sayfası eklendi.",
    items: ["Seri hero alanı", "Demo bölüm listesi", "Benzer seriler"],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v0.0.6",
    title: "Arama ve Filtreleme Taslağı",
    status: "completed",
    summary: "Public /series sayfasına arama ve filtreleme eklendi.",
    items: ["Seri arama", "Durum filtresi", "Kategori ve kanal filtresi"],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v0.0.7",
    title: "Güncelleme Merkezi Taslağı",
    status: "completed",
    summary: "Public /updates sayfası eklendi.",
    items: ["Tamamlanan sürümler", "Planlanan sürümler", "v4.0.0 hedefi"],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v0.0.8",
    title: "Mobil Arayüz İyileştirme",
    status: "completed",
    summary: "Mobil görünüm, arama alanı ve buton tasarımları profesyonelleştirildi.",
    items: ["Mobil header", "Profesyonel arama", "Buton ve kart cilası"],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v0.0.9",
    title: "v1.0.0 Öncesi Public Cila",
    status: "completed",
    summary: "Güncelleme merkezi tek kolon ve daha okunabilir hale getirildi.",
    items: ["Tek kolon güncelleme akışı", "Kompakt kartlar", "Mobil akış iyileştirmesi"],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v1.0.0",
    title: "Public Arşiv Beta",
    status: "completed",
    summary: "Public kullanıcı için ilk beta arşiv görünümü tamamlandı.",
    items: ["Ana sayfa beta görünümü", "Arşiv istatistikleri", "Öne çıkan seri vitrini", "Keşif alanları"],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v1.0.1",
    title: "Public Beta Fix 1",
    status: "completed",
    summary: "v1.0.0 sonrası public arayüz, mobil düzen ve link akışı temizlendi.",
    items: [
      "Site sürümü kod içi config dosyasına taşındı",
      "Health endpoint sürüm bilgisi güncellendi",
      "Profesyonel 404 sayfası eklendi",
      "Mobil ve tablet görünüm cilası yapıldı",
      "Kart hizaları ve buton davranışları iyileştirildi"
    ],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v1.0.2",
    title: "Seri Kartları Geliştirme",
    status: "completed",
    summary: "Seri kartları daha profesyonel, okunabilir ve mobil uyumlu hale getirildi.",
    items: [
      "Premium seri kart tasarımı",
      "Güçlendirilmiş ilerleme alanı",
      "Detaya git aksiyonu yenilendi",
      "Kart hover efektleri iyileştirildi",
      "Mobil seri kart düzeni düzeltildi"
    ],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v1.0.3",
    title: "Profesyonel Ana Sayfa Vitrini",
    status: "completed",
    summary: "Ana sayfa daha sinematik ve YouTube arşiv sitesi hissine yakın hale getirildi.",
    items: [
      "Kompakt üst header",
      "Büyük görselli hero/banner",
      "Devam Eden Seriler bölümü",
      "Son Eklenen Videolar bölümü",
      "Deneyim ve istatistik kartları"
    ],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v1.0.4",
    title: "Kategori Deneyimi Geliştirme",
    status: "completed",
    summary: "Kategori sayfası daha profesyonel vitrin ve keşif deneyimine taşındı.",
    items: [
      "Kategori hero alanı yenilendi",
      "Kategori kartları premium hale getirildi",
      "Kategori istatistikleri eklendi",
      "Bağlı seri önizlemeleri güçlendirildi",
      "Mobil kategori görünümü iyileştirildi"
    ],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v1.0.2",
    title: "Seri Kartları Geliştirme",
    status: "completed",
    summary: "Seri kartları daha profesyonel, okunabilir ve mobil uyumlu hale getirildi.",
    items: [
      "Premium seri kart tasarımı",
      "Güçlendirilmiş ilerleme alanı",
      "Detaya git aksiyonu yenilendi",
      "Kart hover efektleri iyileştirildi",
      "Mobil seri kart düzeni düzeltildi"
    ],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v1.0.3",
    title: "Profesyonel Ana Sayfa Vitrini",
    status: "completed",
    summary: "Ana sayfa daha sinematik ve YouTube arşiv sitesi hissine yakın hale getirildi.",
    items: [
      "Kompakt üst header",
      "Büyük görselli hero/banner",
      "Devam Eden Seriler bölümü",
      "Son Eklenen Videolar bölümü",
      "Deneyim ve istatistik kartları"
    ],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v1.0.4",
    title: "Kategori Deneyimi Geliştirme",
    status: "completed",
    summary: "Kategori sayfası daha profesyonel vitrin ve keşif deneyimine taşındı.",
    items: [
      "Kategori hero alanı yenilendi",
      "Kategori kartları premium hale getirildi",
      "Kategori istatistikleri eklendi",
      "Bağlı seri önizlemeleri güçlendirildi",
      "Mobil kategori görünümü iyileştirildi"
    ],
    supabaseRun: "Gerekli değil"
  }
];

export const plannedUpdates: UpdateNote[] = [


  {
    version: "v1.0.4",
    title: "Kanal Deneyimi Geliştirme",
    status: "planned",
    summary: "Kanal sayfası ve kanal kartları geliştirilecek.",
    items: ["Kanal detay görünümü", "Kanala bağlı seriler", "Kanal kart cilası"],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v1.0.5",
    title: "SEO Başlangıcı",
    status: "planned",
    summary: "Metadata, başlık ve açıklama yapıları düzenlenecek.",
    items: ["Sayfa başlıkları", "Açıklama metinleri", "Open Graph hazırlığı"],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v4.0.0",
    title: "Ana Yayın ve Açılış Sürümü",
    status: "target",
    summary: "Hayatımız Oyun YouTube arşiv video sitesi public kullanıma açılacak.",
    items: ["Profesyonel public site", "Supabase veri sistemi", "Güvenli admin panel", "YouTube playlist arşivi"],
    supabaseRun: "Gerekli olabilir"
  }
];

export const allUpdates = [...completedUpdates, ...plannedUpdates];
