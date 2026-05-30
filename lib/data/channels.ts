import { archiveSeries } from "@/lib/data/series";

export type ArchiveChannel = {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  handle: string;
  tone: "purple" | "blue" | "green" | "orange" | "red" | "cyan";
  icon: string;
  focus: string[];
  highlight: string;
};

export const archiveChannels: ArchiveChannel[] = [
  {
    id: "hayatimiz-oyun",
    title: "Hayatımız Oyun",
    slug: "hayatimiz-oyun",
    handle: "@hayatimizoyun",
    description: "Ana oyun serileri, hikaye odaklı oynanışlar ve uzun soluklu arşiv içerikleri.",
    longDescription: "Hayatımız Oyun ana arşiv kanalıdır. Tamamlanan, devam eden ve yakında gelecek oyun serileri burada ana merkez mantığıyla toplanır.",
    tone: "purple",
    icon: "HO",
    focus: ["RPG", "Aksiyon", "Macera", "Bilim Kurgu", "Açık Dünya"],
    highlight: "Ana arşiv"
  },
  {
    id: "hikaye-arsivi",
    title: "Hikaye Arşivi",
    slug: "hikaye-arsivi",
    handle: "@hikayearsivi",
    description: "Hikaye ağırlıklı oyun serileri ve sinematik deneyimler.",
    longDescription: "Hikaye Arşivi, uzun soluklu anlatı odaklı serileri ve sinematik oyun deneyimlerini öne çıkaran kanal görünümüdür.",
    tone: "blue",
    icon: "HA",
    focus: ["RPG", "Bilim Kurgu", "Macera"],
    highlight: "Hikaye odaklı"
  },
  {
    id: "korku-geceleri",
    title: "Korku Geceleri",
    slug: "korku-geceleri",
    handle: "@korkugeceleri",
    description: "Korku, gerilim ve karanlık atmosferli oyun oynatma listeleri.",
    longDescription: "Korku Geceleri, karanlık atmosferli, gerilimli ve izlerken heyecan veren oyun serilerini ayırmak için hazırlanır.",
    tone: "red",
    icon: "KG",
    focus: ["Korku"],
    highlight: "Gerilim"
  },
  {
    id: "yakinda-gelecek",
    title: "Yakında Gelecek",
    slug: "yakinda-gelecek",
    handle: "@yakindagelecek",
    description: "Planlanan, duyurulan ve arşive eklenecek yeni seriler.",
    longDescription: "Yakında Gelecek kanalı, henüz başlamamış ama arşiv planına alınmış oyun serilerini kullanıcıya göstermek için kullanılır.",
    tone: "cyan",
    icon: "YG",
    focus: ["Uzay", "Açık Dünya"],
    highlight: "Planlanan"
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

export function getChannelStats(channel: ArchiveChannel) {
  const series = getChannelSeries(channel);
  const episodes = series.reduce((total, item) => total + item.episodes, 0);
  const completed = series.filter((item) => item.status === "completed").length;
  const active = series.filter((item) => item.status === "active").length;
  const planned = series.filter((item) => item.status === "planned").length;

  return {
    series,
    episodes,
    completed,
    active,
    planned
  };
}
