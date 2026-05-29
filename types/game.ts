export type GameStatus = 'playing' | 'completed' | 'planned' | 'paused';

export type Game = {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverUrl: string;
  genre: string;
  tags: string[];
  status: GameStatus;
  releaseDate?: string | null;
  score?: number | null;
  progressCurrent: number;
  progressTotal: number;
  youtubePlaylistUrl?: string | null;
  rawgSlug?: string | null;
};
