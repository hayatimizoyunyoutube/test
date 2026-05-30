import { archiveSeries } from "@/lib/data/series";

export type ArchiveCategory = {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  tone: "purple" | "blue" | "green" | "orange" | "red" | "cyan";
  icon: string;
  keywords: string[];
  highlight: string;
};

export const archiveCategories: ArchiveCategory[] = [
  { id: "aksiyon", title: "Aksiyon", slug: "aksiyon", description: "Sinematik dövüş, hızlı tempo ve güçlü hikaye anları.", longDescription: "Aksiyon kategorisi; savaş, kovalamaca, açık dünya çatışmaları ve tempolu oyun serilerini bir araya getirir.", tone: "orange", icon: "AX", keywords: ["Aksiyon", "Açık Dünya"], highlight: "Yüksek tempo" },
  { id: "rpg", title: "RPG", slug: "rpg", description: "Karakter gelişimi, seçimler ve uzun soluklu maceralar.", longDescription: "RPG kategorisi; karakter gelişimi, görev zincirleri, keşif ve uzun hikaye arşivleri için hazırlanır.", tone: "purple", icon: "RP", keywords: ["RPG"], highlight: "Uzun seri" },
  { id: "macera", title: "Macera", slug: "macera", description: "Keşif, hikaye ve atmosfer odaklı oyun serileri.", longDescription: "Macera kategorisi; hikayesi, keşif hissi ve atmosferi güçlü serileri öne çıkarır.", tone: "blue", icon: "MC", keywords: ["Macera", "Açık Dünya"], highlight: "Keşif odaklı" },
  { id: "korku", title: "Korku", slug: "korku", description: "Gerilim, karanlık atmosfer ve unutulmaz korku serileri.", longDescription: "Korku kategorisi; gerilim, hayatta kalma ve karanlık atmosferli oynatma listeleri için ayrılır.", tone: "red", icon: "KR", keywords: ["Korku"], highlight: "Gerilim" },
  { id: "bilim-kurgu", title: "Bilim Kurgu", slug: "bilim-kurgu", description: "Gelecek, teknoloji, uzay ve distopik evrenler.", longDescription: "Bilim kurgu kategorisi; gelecek teknolojileri, uzay, distopya ve siberpunk evrenlerini toplar.", tone: "cyan", icon: "BK", keywords: ["Bilim Kurgu", "Uzay"], highlight: "Gelecek evreni" },
  { id: "simulasyon", title: "Simülasyon", slug: "simulasyon", description: "Yönetim, gerçekçilik ve uzun soluklu deneyimler.", longDescription: "Simülasyon kategorisi; yönetim, gerçekçilik ve uzun süreli takip gerektiren içerikler için hazırlanır.", tone: "green", icon: "SM", keywords: ["Simülasyon"], highlight: "Yönetim" }
];

export function getCategorySeries(category: ArchiveCategory) {
  return archiveSeries.filter((series) =>
    category.keywords.some((keyword) =>
      series.category.toLocaleLowerCase("tr-TR").includes(keyword.toLocaleLowerCase("tr-TR"))
    )
  );
}

export function getCategoryStats(category: ArchiveCategory) {
  const series = getCategorySeries(category);
  return {
    series,
    episodes: series.reduce((total, item) => total + item.episodes, 0),
    completed: series.filter((item) => item.status === "completed").length,
    active: series.filter((item) => item.status === "active").length,
    planned: series.filter((item) => item.status === "planned").length
  };
}
