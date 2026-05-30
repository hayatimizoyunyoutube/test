import { archiveSeries } from "@/lib/data/series";

export type ArchiveChannel = {
  id: string;
  title: string;
  slug: string;
  description: string;
  handle: string;
  tone: "purple" | "blue" | "green" | "orange" | "red" | "cyan";
  focus: string[];
};

export const archiveChannels: ArchiveChannel[] = [
  {
    id: "hayatimiz-oyun",
    title: "Hayatımız Oyun",
    slug: "hayatimiz-oyun",
    handle: "@hayatimizoyun",
    description: "Ana oyun serileri, hikaye odaklı oynanışlar ve uzun soluklu arşiv içerikleri.",
    tone: "purple",
    focus: ["RPG", "Aksiyon", "Macera"]
  },
  {
    id: "hikaye-arsivi",
    title: "Hikaye Arşivi",
    slug: "hikaye-arsivi",
    handle: "@hikayearsivi",
    description: "Hikaye ağırlıklı oyun serileri ve sinematik deneyimler.",
    tone: "blue",
    focus: ["RPG", "Bilim Kurgu"]
  },
  {
    id: "korku-geceleri",
    title: "Korku Geceleri",
    slug: "korku-geceleri",
    handle: "@korkugeceleri",
    description: "Korku, gerilim ve karanlık atmosferli oyun oynatma listeleri.",
    tone: "red",
    focus: ["Korku"]
  },
  {
    id: "yakinda-gelecek",
    title: "Yakında Gelecek",
    slug: "yakinda-gelecek",
    handle: "@yakindagelecek",
    description: "Planlanan, duyurulan ve arşive eklenecek yeni seriler.",
    tone: "cyan",
    focus: ["Uzay", "Açık Dünya"]
  }
];

export function getChannelSeries(channel: ArchiveChannel) {
  if (channel.id === "hayatimiz-oyun") {
    return archiveSeries;
  }

  return archiveSeries.filter((series) =>
    channel.focus.some((focus) =>
      series.category.toLocaleLowerCase("tr-TR").includes(focus.toLocaleLowerCase("tr-TR"))
    )
  );
}
