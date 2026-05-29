import { mockGames } from '@/lib/data/mock-games';
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase/server';
import type { Game, GameStatus } from '@/types/game';

export type AdminGame = Game & {
  bannerUrl?: string | null;
  platforms: string[];
  featured: boolean;
  isPublic: boolean;
  rawgId?: number | null;
  youtubePlaylistId?: string | null;
  seriesName?: string | null;
  seriesOrder: number;
  createdAt?: string | null;
  updatedAt?: string | null;
};

type AdminGameRow = {
  id: string;
  title: string;
  slug: string | null;
  description: string | null;
  cover_url: string | null;
  banner_url: string | null;
  genre: string | null;
  tags: string[] | null;
  platforms: string[] | null;
  status: GameStatus | null;
  release_date: string | null;
  score: number | null;
  progress_current: number | null;
  progress_total: number | null;
  rawg_id: number | null;
  rawg_slug: string | null;
  youtube_playlist_id: string | null;
  youtube_playlist_url: string | null;
  series_name: string | null;
  series_order: number | null;
  featured: boolean | null;
  is_public: boolean | null;
  created_at: string | null;
  updated_at: string | null;
};

function mapAdminGame(row: AdminGameRow): AdminGame {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug || row.id,
    description: row.description || '',
    coverUrl: row.cover_url || '',
    bannerUrl: row.banner_url || '',
    genre: row.genre || 'Genel',
    tags: row.tags || [],
    platforms: row.platforms || [],
    status: row.status || 'planned',
    releaseDate: row.release_date,
    score: row.score,
    progressCurrent: row.progress_current ?? 0,
    progressTotal: row.progress_total ?? 0,
    rawgId: row.rawg_id,
    rawgSlug: row.rawg_slug,
    youtubePlaylistId: row.youtube_playlist_id,
    youtubePlaylistUrl: row.youtube_playlist_url,
    seriesName: row.series_name,
    seriesOrder: row.series_order ?? 0,
    featured: row.featured ?? false,
    isPublic: row.is_public ?? true,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

export async function getAdminGames(): Promise<{ games: AdminGame[]; usingMock: boolean; error?: string }> {
  if (!hasSupabaseServerEnv()) {
    return {
      games: mockGames.map((game, index) => ({
        ...game,
        bannerUrl: '',
        platforms: ['PC'],
        featured: index === 0,
        isPublic: true,
        rawgId: null,
        youtubePlaylistId: null,
        seriesName: null,
        seriesOrder: index + 1,
        createdAt: null,
        updatedAt: null
      })),
      usingMock: true,
      error: 'Supabase server env eksik olduğu için örnek veriler gösteriliyor.'
    };
  }

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('games')
    .select('id,title,slug,description,cover_url,banner_url,genre,tags,platforms,status,release_date,score,progress_current,progress_total,rawg_id,rawg_slug,youtube_playlist_id,youtube_playlist_url,series_name,series_order,featured,is_public,created_at,updated_at')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) {
    return { games: [], usingMock: false, error: error.message };
  }

  return { games: ((data as AdminGameRow[] | null) || []).map(mapAdminGame), usingMock: false };
}
