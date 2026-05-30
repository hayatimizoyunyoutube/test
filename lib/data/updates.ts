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
    items: [
      "Public ana sayfa",
      "YouTube arşiv tanıtımı",
      "Tamamlanan / Devam Eden / Yakında Gelecek alanları",
      "/api/health endpoint"
    ],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v0.0.2",
    title: "Seriler Sayfası",
    status: "completed",
    summary: "Public /series sayfası ve demo seri kartları eklendi.",
    items: [
      "Tamamlanan Seriler grubu",
      "Devam Eden Seriler grubu",
      "Yakında Gelecek Seriler grubu",
      "Seri kartları ve ilerleme yüzdesi"
    ],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v0.0.3",
    title: "Kategoriler Sayfası",
    status: "completed",
    summary: "Public /categories sayfası ve kategori kartları eklendi.",
    items: [
      "Aksiyon, RPG, Macera kategorileri",
      "Korku, Bilim Kurgu, Simülasyon kategorileri",
      "Kategorilere bağlı demo seri listesi"
    ],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v0.0.4",
    title: "Kanallar Sayfası",
    status: "completed",
    summary: "Public /channels sayfası ve demo kanal kartları eklendi.",
    items: [
      "Hayatımız Oyun kanalı",
      "Hikaye Arşivi kanalı",
      "Korku Geceleri kanalı",
      "Yakında Gelecek kanalı"
    ],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v0.0.5",
    title: "Seri Detay Taslağı",
    status: "completed",
    summary: "Public /series/[slug] detay sayfası eklendi.",
    items: [
      "Seri hero alanı",
      "Demo bölüm listesi",
      "İlerleme yüzdesi",
      "Benzer seriler alanı"
    ],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v0.0.6",
    title: "Arama ve Filtreleme Taslağı",
    status: "completed",
    summary: "Public /series sayfasına arama ve filtreleme eklendi.",
    items: [
      "Seri arama",
      "Durum filtresi",
      "Kategori filtresi",
      "Kanal filtresi",
      "Boş sonuç ekranı"
    ],
    supabaseRun: "Gerekli değil"
  }
];

export const plannedUpdates: UpdateNote[] = [
  {
    version: "v0.0.8",
    title: "Mobil Arayüz İyileştirme",
    status: "planned",
    summary: "Public sayfaların mobil ve tablet görünümü güçlendirilecek.",
    items: [
      "Mobil menü düzeni",
      "Kartların mobil hizası",
      "Hero alanı mobil düzeni",
      "Tablet görünüm iyileştirmesi"
    ],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v0.0.9",
    title: "v1.0.0 Öncesi Public Cila",
    status: "planned",
    summary: "v1.0.0 public beta öncesi son public arayüz temizliği yapılacak.",
    items: [
      "Renk ve boşluk düzeni",
      "Kart tasarımı cilası",
      "Link kontrolleri",
      "Public beta hazırlığı"
    ],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v1.0.0",
    title: "Public Arşiv Beta",
    status: "planned",
    summary: "Public kullanıcı için ilk büyük beta arşiv görünümü tamamlanacak.",
    items: [
      "Ana sayfa beta görünümü",
      "Seriler, kategoriler ve kanallar deneyimi",
      "Public arşiv akışı",
      "Demo verilerle tam kullanıcı deneyimi"
    ],
    supabaseRun: "Gerekli değil"
  },
  {
    version: "v4.0.0",
    title: "Ana Yayın ve Açılış Sürümü",
    status: "target",
    summary: "Hayatımız Oyun YouTube arşiv video sitesi public kullanıma açılacak.",
    items: [
      "Profesyonel public site",
      "Supabase veri sistemi",
      "Kayıt / giriş sistemi",
      "Güvenli admin panel",
      "YouTube playlist arşivi"
    ],
    supabaseRun: "Gerekli olabilir"
  }
];
