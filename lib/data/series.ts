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
  { id: "witcher-3", title: "The Witcher 3", slug: "the-witcher-3", status: "completed", category: "RPG", channel: "Hayatımız Oyun", episodes: 42, progress: 100, description: "Tamamlanmış hikaye odaklı RPG serisi." },
  { id: "god-of-war", title: "God of War", slug: "god-of-war", status: "completed", category: "Aksiyon", channel: "Hayatımız Oyun", episodes: 28, progress: 100, description: "Tamamlanmış sinematik aksiyon serisi." },
  { id: "red-dead-redemption-2", title: "Red Dead Redemption 2", slug: "red-dead-redemption-2", status: "completed", category: "Açık Dünya", channel: "Hayatımız Oyun", episodes: 36, progress: 100, description: "Tamamlanmış açık dünya ve hikaye arşivi." },
  { id: "elden-ring", title: "Elden Ring", slug: "elden-ring", status: "active", category: "RPG", channel: "Hayatımız Oyun", episodes: 16, progress: 45, description: "Devam eden açık dünya soulslike serisi." },
  { id: "cyberpunk-2077", title: "Cyberpunk 2077", slug: "cyberpunk-2077", status: "active", category: "Bilim Kurgu", channel: "Hikaye Arşivi", episodes: 12, progress: 35, description: "Devam eden futuristik hikaye serisi." },
  { id: "a-plague-tale", title: "A Plague Tale Requiem", slug: "a-plague-tale-requiem", status: "active", category: "Macera", channel: "Hikaye Arşivi", episodes: 9, progress: 55, description: "Atmosfer ve hikaye odaklı devam eden seri." },
  { id: "starfield", title: "Starfield", slug: "starfield", status: "planned", category: "Uzay", channel: "Yakında Gelecek", episodes: 0, progress: 0, description: "Yakında başlayacak keşif ve uzay macerası." },
  { id: "gta-vi", title: "GTA VI", slug: "gta-vi", status: "planned", category: "Açık Dünya", channel: "Yakında Gelecek", episodes: 0, progress: 0, description: "Planlanan büyük açık dünya serisi." }
];

export const statusLabels: Record<ArchiveSeriesStatus, string> = {
  completed: "Tamamlanan Seriler",
  active: "Devam Eden Seriler",
  planned: "Yakında Gelecek Seriler"
};

export function statusBadge(status: ArchiveSeriesStatus) {
  if (status === "completed") return "Tamamlandı";
  if (status === "active") return "Devam Ediyor";
  return "Yakında";
}

export function getSeriesBySlug(slug: string) {
  return archiveSeries.find((series) => series.slug === slug);
}

export function getDemoEpisodes(series: ArchiveSeries) {
  const episodeCount = series.status === "planned" ? 0 : Math.max(3, Math.min(series.episodes, 8));
  return Array.from({ length: episodeCount }, (_, index) => ({
    id: `${series.id}-${index + 1}`,
    title: `${series.title} - Bölüm ${index + 1}`,
    episodeNumber: index + 1,
    duration: index % 2 === 0 ? "42 dk" : "35 dk",
    status: index + 1 <= Math.ceil((series.progress / 100) * episodeCount) ? "Yayında" : "Hazırlanıyor"
  }));
}

export function getRelatedSeries(currentSlug: string, category: string) {
  return archiveSeries.filter((series) => series.slug !== currentSlug && series.category === category).slice(0, 3);
}
