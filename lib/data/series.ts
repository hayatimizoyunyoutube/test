export type ArchiveSeriesStatus = "completed" | "active" | "planned";

export type ArchiveSeries = {
  id: string;
  title: string;
  slug: string;
  status: ArchiveSeriesStatus;
  category: string;
  channel: string;
  episodes: number;
  progress: number;
  description: string;
};

export const archiveSeries: ArchiveSeries[] = [
  {
    id: "witcher-3",
    title: "The Witcher 3",
    slug: "the-witcher-3",
    status: "completed",
    category: "RPG",
    channel: "Hayatımız Oyun",
    episodes: 42,
    progress: 100,
    description: "Tamamlanmış hikaye odaklı RPG serisi."
  },
  {
    id: "god-of-war",
    title: "God of War",
    slug: "god-of-war",
    status: "completed",
    category: "Aksiyon",
    channel: "Hayatımız Oyun",
    episodes: 28,
    progress: 100,
    description: "Tamamlanmış sinematik aksiyon serisi."
  },
  {
    id: "elden-ring",
    title: "Elden Ring",
    slug: "elden-ring",
    status: "active",
    category: "RPG",
    channel: "Hayatımız Oyun",
    episodes: 16,
    progress: 45,
    description: "Devam eden açık dünya soulslike serisi."
  },
  {
    id: "cyberpunk-2077",
    title: "Cyberpunk 2077",
    slug: "cyberpunk-2077",
    status: "active",
    category: "Bilim Kurgu",
    channel: "Hayatımız Oyun",
    episodes: 12,
    progress: 35,
    description: "Devam eden futuristik hikaye serisi."
  },
  {
    id: "starfield",
    title: "Starfield",
    slug: "starfield",
    status: "planned",
    category: "Uzay",
    channel: "Hayatımız Oyun",
    episodes: 0,
    progress: 0,
    description: "Yakında başlayacak keşif ve uzay macerası."
  },
  {
    id: "gta-vi",
    title: "GTA VI",
    slug: "gta-vi",
    status: "planned",
    category: "Açık Dünya",
    channel: "Hayatımız Oyun",
    episodes: 0,
    progress: 0,
    description: "Planlanan büyük açık dünya serisi."
  }
];

export const statusLabels: Record<ArchiveSeriesStatus, string> = {
  completed: "Tamamlanan Seriler",
  active: "Devam Eden Seriler",
  planned: "Yakında Gelecek Seriler"
};
