export type SiteRouteStatus = "stable" | "ready" | "planned";

export type SiteRouteCheck = {
  path: string;
  title: string;
  area: string;
  status: SiteRouteStatus;
  description: string;
};

export const publicRoutes: SiteRouteCheck[] = [
  {
    path: "/",
    title: "Ana Sayfa",
    area: "Public vitrin",
    status: "stable",
    description: "Profesyonel ana sayfa vitrini ve arşiv giriş alanı."
  },
  {
    path: "/series",
    title: "Seriler",
    area: "Arşiv listesi",
    status: "stable",
    description: "Tamamlanan, devam eden ve yakında gelecek seri listesi."
  },
  {
    path: "/series/the-witcher-3",
    title: "Seri Detay Örneği",
    area: "Seri detay",
    status: "stable",
    description: "Seri hero alanı, bölüm listesi ve benzer seri akışı."
  },
  {
    path: "/categories",
    title: "Kategoriler",
    area: "Keşif",
    status: "stable",
    description: "Kategori vitrini, kategori kartları ve bağlı seri önizlemeleri."
  },
  {
    path: "/channels",
    title: "Kanallar",
    area: "Kanal vitrini",
    status: "stable",
    description: "Kanal kartları, odak türleri ve kanala bağlı seri listeleri."
  },
  {
    path: "/updates",
    title: "Güncellemeler",
    area: "Sürüm merkezi",
    status: "stable",
    description: "Tamamlanan ve planlanan sürüm akışı."
  },
  {
    path: "/api/health",
    title: "Health API",
    area: "Sistem kontrolü",
    status: "stable",
    description: "Versiyon, hedef sürüm ve kontrol edilecek route listesi."
  },
  {
    path: "/robots.txt",
    title: "Robots",
    area: "SEO",
    status: "ready",
    description: "Arama motoru tarama yönergeleri."
  },
  {
    path: "/sitemap.xml",
    title: "Sitemap",
    area: "SEO",
    status: "ready",
    description: "Public route haritası."
  },
  {
    path: "/status",
    title: "Stabilite Kontrolü",
    area: "Public kontrol",
    status: "ready",
    description: "v1.1.0 öncesi public route ve hazırlık kontrol ekranı."
  }
];

export const stabilityChecks = [
  "Public route yapısı korundu",
  "Mobil alt menü ve iç sayfa header yapısı kontrol edildi",
  "SEO dosyaları korunuyor",
  "Supabase geçişi öncesi demo veri akışı korunuyor",
  "Admin, auth ve API özellikleri public arayüze eklenmedi"
];
