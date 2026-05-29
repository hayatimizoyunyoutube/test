import { createPublicSupabaseClient, hasSupabasePublicEnv } from '@/lib/supabase/public';
import { mockGames } from '@/lib/data/mock-games';
import type { Game } from '@/types/game';

type GameRow = {
  id: string;
  title: string;
  slug: string | null;
  description: string | null;
  cover_url: string | null;
  genre: string | null;
  tags: string[] | null;
  status: Game['status'] | null;
  release_date: string | null;
  score: number | null;
  progress_current: number | null;
  progress_total: number | null;
  youtube_playlist_url: string | null;
  rawg_slug: string | null;
};

function mapGame(row: GameRow): Game {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug || row.id,
    description: row.description || 'Açıklama yakında eklenecek.',
    coverUrl: row.cover_url || '',
    genre: row.genre || 'Genel',
    tags: row.tags || [],
    status: row.status || 'planned',
    releaseDate: row.release_date,
    score: row.score,
    progressCurrent: row.progress_current ?? 0,
    progressTotal: row.progress_total ?? 0,
    youtubePlaylistUrl: row.youtube_playlist_url,
    rawgSlug: row.rawg_slug
  };
}

export async function getGames(): Promise<Game[]> {
  if (!hasSupabasePublicEnv()) return mockGames;

  const supabase = createPublicSupabaseClient();
  const { data, error } = await supabase
    .from('games')
    .select('id,title,slug,description,cover_url,genre,tags,status,release_date,score,progress_current,progress_total,youtube_playlist_url,rawg_slug')
    .eq('is_public', true)
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(12);

  if (error || !data?.length) return mockGames;
  return (data as GameRow[]).map(mapGame);
}
