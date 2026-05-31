export type ArchiveSeriesStatus = "completed" | "active" | "planned";
export type CategoryTone = "purple" | "blue" | "green" | "orange" | "red" | "cyan";

export type ArchiveCategory = {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  tone: CategoryTone;
  icon: string;
  highlight: string;
  sortOrder: number;
};

export type ArchiveChannel = {
  id: string;
  title: string;
  slug: string;
  handle: string;
  description: string;
  longDescription: string;
  tone: CategoryTone;
  icon: string;
  highlight: string;
  sortOrder: number;
};

export type ArchiveSeries = {
  id: string;
  title: string;
  slug: string;
  status: ArchiveSeriesStatus;
  description: string;
  category: string;
  categorySlug?: string;
  channel: string;
  channelSlug?: string;
  episodes: number;
  progress: number;
  isFeatured: boolean;
  sortOrder: number;
};

export type ArchiveEpisode = {
  id: string;
  title: string;
  slug: string;
  episodeNumber: number;
  duration: string;
  status: string;
  youtubeUrl: string;
  publishedAt: string | null;
};

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

function supabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ""),
    anonKey
  };
}

export function isSupabaseConfigured() {
  return Boolean(supabaseConfig());
}

async function supabaseGet<T>(table: string, params: Record<string, string> = {}): Promise<T[]> {
  const config = supabaseConfig();

  if (!config) {
    return [];
  }

  const endpoint = new URL(`${config.url}/rest/v1/${table}`);
  Object.entries(params).forEach(([key, value]) => endpoint.searchParams.set(key, value));

  try {
    const response = await fetch(endpoint.toString(), {
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${config.anonKey}`,
        "Content-Type": "application/json"
      },
      cache: "no-store"
    });

    if (!response.ok) {
      console.error(`Supabase ${table} isteği başarısız:`, response.status, await response.text());
      return [];
    }

    return (await response.json()) as T[];
  } catch (error) {
    console.error(`Supabase ${table} bağlantı hatası:`, error);
    return [];
  }
}

type CategoryRow = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  long_description: string | null;
  tone: CategoryTone | null;
  icon: string | null;
  highlight: string | null;
  sort_order: number | null;
};

type ChannelRow = {
  id: string;
  title: string;
  slug: string;
  handle: string | null;
  description: string | null;
  long_description: string | null;
  tone: CategoryTone | null;
  icon: string | null;
  highlight: string | null;
  sort_order: number | null;
};

type SeriesRow = {
  id: string;
  title: string;
  slug: string;
  status: ArchiveSeriesStatus | null;
  description: string | null;
  total_episodes: number | null;
  progress_percent: number | null;
  is_featured: boolean | null;
  sort_order: number | null;
  category?: CategoryRow | CategoryRow[] | null;
  channel?: ChannelRow | ChannelRow[] | null;
};

type EpisodeRow = {
  id: string;
  title: string;
  slug: string;
  episode_number: number | null;
  duration_text: string | null;
  status: string | null;
  youtube_url: string | null;
  published_at: string | null;
};

function firstRelation<T>(value: T | T[] | null | undefined): T | null {
  if (Array.isArray(value)) return value[0] || null;
  return value || null;
}

function safeText(value: unknown, fallback: string) {
  const text = typeof value === "string" ? value.trim() : "";
  return text || fallback;
}

function safeSlug(value: unknown, fallback: string) {
  const text = typeof value === "string" ? value.trim() : "";
  return text || fallback;
}

function initials(value: unknown, fallback = "AR") {
  return safeText(value, fallback).slice(0, 2).toLocaleUpperCase("tr-TR");
}

function safeStatus(value: unknown): ArchiveSeriesStatus {
  if (value === "completed" || value === "active" || value === "planned") return value;
  return "planned";
}

function safeTone(value: unknown): CategoryTone {
  if (value === "purple" || value === "blue" || value === "green" || value === "orange" || value === "red" || value === "cyan") return value;
  return "purple";
}

function safeNumber(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function clampPercent(value: unknown) {
  const number = safeNumber(value, 0);
  return Math.max(0, Math.min(100, number));
}

function mapCategory(row: CategoryRow): ArchiveCategory {
  const title = safeText(row.title, "İsimsiz Kategori");

  return {
    id: safeText(row.id, `category-${title}`),
    title,
    slug: safeSlug(row.slug, `category-${safeText(row.id, title).slice(0, 8)}`),
    description: safeText(row.description, ""),
    longDescription: safeText(row.long_description, safeText(row.description, "")),
    tone: safeTone(row.tone),
    icon: safeText(row.icon, initials(title)),
    highlight: safeText(row.highlight, "Arşiv"),
    sortOrder: safeNumber(row.sort_order)
  };
}

function mapChannel(row: ChannelRow): ArchiveChannel {
  const title = safeText(row.title, "İsimsiz Kanal");

  return {
    id: safeText(row.id, `channel-${title}`),
    title,
    slug: safeSlug(row.slug, `channel-${safeText(row.id, title).slice(0, 8)}`),
    handle: safeText(row.handle, "@hayatimizoyun"),
    description: safeText(row.description, ""),
    longDescription: safeText(row.long_description, safeText(row.description, "")),
    tone: safeTone(row.tone),
    icon: safeText(row.icon, initials(title)),
    highlight: safeText(row.highlight, "Kanal"),
    sortOrder: safeNumber(row.sort_order)
  };
}

function mapSeries(row: SeriesRow): ArchiveSeries {
  const category = firstRelation(row.category);
  const channel = firstRelation(row.channel);
  const title = safeText(row.title, "İsimsiz Seri");

  return {
    id: safeText(row.id, `series-${title}`),
    title,
    slug: safeSlug(row.slug, `series-${safeText(row.id, title).slice(0, 8)}`),
    status: safeStatus(row.status),
    description: safeText(row.description, ""),
    category: category ? safeText(category.title, "Kategorisiz") : "Kategorisiz",
    categorySlug: category ? safeSlug(category.slug, "") : undefined,
    channel: channel ? safeText(channel.title, "Kanalsız") : "Kanalsız",
    channelSlug: channel ? safeSlug(channel.slug, "") : undefined,
    episodes: safeNumber(row.total_episodes),
    progress: clampPercent(row.progress_percent),
    isFeatured: Boolean(row.is_featured),
    sortOrder: safeNumber(row.sort_order)
  };
}

function mapEpisode(row: EpisodeRow): ArchiveEpisode {
  const title = safeText(row.title, "İsimsiz Bölüm");

  return {
    id: safeText(row.id, `episode-${title}`),
    title,
    slug: safeSlug(row.slug, `episode-${safeText(row.id, title).slice(0, 8)}`),
    episodeNumber: safeNumber(row.episode_number),
    duration: safeText(row.duration_text, "Süre eklenmedi"),
    status: safeText(row.status, "planned"),
    youtubeUrl: safeText(row.youtube_url, ""),
    publishedAt: typeof row.published_at === "string" ? row.published_at : null
  };
}

export async function getCategories() {
  const rows = await supabaseGet<CategoryRow>("archive_categories", {
    select: "*",
    is_active: "eq.true",
    order: "sort_order.asc,title.asc"
  });

  return rows.map(mapCategory);
}

export async function getChannels() {
  const rows = await supabaseGet<ChannelRow>("archive_channels", {
    select: "*",
    is_active: "eq.true",
    order: "sort_order.asc,title.asc"
  });

  return rows.map(mapChannel);
}

export async function getSeriesList() {
  const rows = await supabaseGet<SeriesRow>("playlist_series", {
    select: "*,category:archive_categories(*),channel:archive_channels(*)",
    is_public: "eq.true",
    order: "sort_order.asc,title.asc"
  });

  return rows.map(mapSeries);
}

export async function getSeriesBySlug(slug: string) {
  const rows = await supabaseGet<SeriesRow>("playlist_series", {
    select: "*,category:archive_categories(*),channel:archive_channels(*)",
    is_public: "eq.true",
    slug: `eq.${slug}`,
    limit: "1"
  });

  return rows[0] ? mapSeries(rows[0]) : null;
}

export async function getEpisodesBySeriesSlug(slug: string) {
  const rows = await supabaseGet<EpisodeRow>("playlist_episodes", {
    select: "id,title,slug,episode_number,duration_text,status,youtube_url,published_at,series:playlist_series!inner(slug)",
    "series.slug": `eq.${slug}`,
    is_public: "eq.true",
    order: "episode_number.asc,sort_order.asc"
  });

  return rows.map(mapEpisode);
}

export async function getRecentEpisodes(limit = 4) {
  const rows = await supabaseGet<EpisodeRow>("playlist_episodes", {
    select: "id,title,slug,episode_number,duration_text,status,youtube_url,published_at,series:playlist_series(title,slug)",
    is_public: "eq.true",
    order: "published_at.desc,created_at.desc",
    limit: String(limit)
  });

  return rows.map(mapEpisode);
}

export function filterSeries(series: ArchiveSeries[], params: { q?: string; status?: string; category?: string; channel?: string }) {
  const query = String(params.q || "").trim().toLocaleLowerCase("tr-TR");
  const selectedStatus = params.status || "all";
  const selectedCategory = params.category || "all";
  const selectedChannel = params.channel || "all";

  return series.filter((item) => {
    const matchesQuery = !query || [item.title, item.category, item.channel, item.description]
      .some((value) => safeText(value, "").toLocaleLowerCase("tr-TR").includes(query));
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory || item.categorySlug === selectedCategory;
    const matchesChannel = selectedChannel === "all" || item.channel === selectedChannel || item.channelSlug === selectedChannel;

    return matchesQuery && matchesStatus && matchesCategory && matchesChannel;
  });
}

export function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b, "tr"));
}
