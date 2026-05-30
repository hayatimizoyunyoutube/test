import { archiveSeries } from "@/lib/data/series";

export type ArchiveCategory = {
  id: string;
  title: string;
  slug: string;
  description: string;
  tone: "purple" | "blue" | "green" | "orange" | "red" | "cyan";
  keywords: string[];
};

export const archiveCategories: ArchiveCategory[] = [
  {
    id: "aksiyon",
    title: "Aksiyon",
    slug: "aksiyon",
    description: "Sinematik dövüş, hızlı tempo ve güçlü hikaye anları.",
    tone: "orange",
    keywords: ["Aksiyon", "Açık Dünya"]
  },
  {
    id: "rpg",
    title: "RPG",
    slug: "rpg",
    description: "Karakter gelişimi, seçimler ve uzun soluklu maceralar.",
    tone: "purple",
    keywords: ["RPG"]
  },
  {
    id: "macera",
    title: "Macera",
    slug: "macera",
    description: "Keşif, hikaye ve atmosfer odaklı oyun serileri.",
    tone: "blue",
    keywords: ["Macera", "Açık Dünya"]
  },
  {
    id: "korku",
    title: "Korku",
    slug: "korku",
    description: "Gerilim, karanlık atmosfer ve unutulmaz korku serileri.",
    tone: "red",
    keywords: ["Korku"]
  },
  {
    id: "bilim-kurgu",
    title: "Bilim Kurgu",
    slug: "bilim-kurgu",
    description: "Gelecek, teknoloji, uzay ve distopik evrenler.",
    tone: "cyan",
    keywords: ["Bilim Kurgu", "Uzay"]
  },
  {
    id: "simulasyon",
    title: "Simülasyon",
    slug: "simulasyon",
    description: "Yönetim, gerçekçilik ve uzun soluklu deneyimler.",
    tone: "green",
    keywords: ["Simülasyon"]
  }
];

export function getCategorySeries(category: ArchiveCategory) {
  return archiveSeries.filter((series) =>
    category.keywords.some((keyword) =>
      series.category.toLocaleLowerCase("tr-TR").includes(keyword.toLocaleLowerCase("tr-TR"))
    )
  );
}
