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
      next: { revalidate: 60 }
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

function mapCategory(row: CategoryRow): ArchiveCategory {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    description: row.description || "",
    longDescription: row.long_description || row.description || "",
    tone: row.tone || "purple",
    icon: row.icon || row.title.slice(0, 2).toUpperCase(),
    highlight: row.highlight || "Arşiv",
    sortOrder: row.sort_order || 0
  };
}

function mapChannel(row: ChannelRow): ArchiveChannel {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    handle: row.handle || "@hayatimizoyun",
    description: row.description || "",
    longDescription: row.long_description || row.description || "",
    tone: row.tone || "purple",
    icon: row.icon || row.title.slice(0, 2).toUpperCase(),
    highlight: row.highlight || "Kanal",
    sortOrder: row.sort_order || 0
  };
}

function mapSeries(row: SeriesRow): ArchiveSeries {
  const category = firstRelation(row.category);
  const channel = firstRelation(row.channel);

  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    status: row.status || "planned",
    description: row.description || "",
    category: category?.title || "Kategorisiz",
    categorySlug: category?.slug,
    channel: channel?.title || "Kanalsız",
    channelSlug: channel?.slug,
    episodes: row.total_episodes || 0,
    progress: row.progress_percent || 0,
    isFeatured: Boolean(row.is_featured),
    sortOrder: row.sort_order || 0
  };
}

function mapEpisode(row: EpisodeRow): ArchiveEpisode {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    episodeNumber: row.episode_number || 0,
    duration: row.duration_text || "Süre eklenmedi",
    status: row.status || "planned",
    youtubeUrl: row.youtube_url || "",
    publishedAt: row.published_at
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
      .some((value) => value.toLocaleLowerCase("tr-TR").includes(query));
    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus;
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory || item.categorySlug === selectedCategory;
    const matchesChannel = selectedChannel === "all" || item.channel === selectedChannel || item.channelSlug === selectedChannel;

    return matchesQuery && matchesStatus && matchesCategory && matchesChannel;
  });
}

export function unique(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b, "tr"));
}
