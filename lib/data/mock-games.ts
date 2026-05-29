import type { Game } from '@/types/game';

export const mockGames: Game[] = [
  {
    id: 'mock-alan-wake',
    title: 'Alan Wake Remastered',
    slug: 'alan-wake-remastered',
    description: 'Karanlık atmosferli hikaye odaklı seri vitrin örneği.',
    coverUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=900&auto=format&fit=crop',
    genre: 'Aksiyon / Gerilim',
    tags: ['Hikaye', 'Korku', 'Remastered'],
    status: 'playing',
    releaseDate: '2021-10-05',
    score: 88,
    progressCurrent: 7,
    progressTotal: 12,
    rawgSlug: 'alan-wake-remastered'
  },
  {
    id: 'mock-plague',
    title: 'A Plague Tale: Innocence',
    slug: 'a-plague-tale-innocence',
    description: 'Sinema tadında ilerleyen bölümlü oyun serisi kart örneği.',
    coverUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=900&auto=format&fit=crop',
    genre: 'Macera / Dram',
    tags: ['Seri', 'Hikaye', 'Gizlilik'],
    status: 'planned',
    releaseDate: '2019-05-14',
    score: 84,
    progressCurrent: 0,
    progressTotal: 16,
    rawgSlug: 'a-plague-tale-innocence'
  },
  {
    id: 'mock-avatar',
    title: 'Avatar: Frontiers of Pandora',
    slug: 'avatar-frontiers-of-pandora',
    description: 'Açık dünya ve görsel kalite odaklı vitrin tasarım testi.',
    coverUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=900&auto=format&fit=crop',
    genre: 'Açık Dünya',
    tags: ['Open World', 'FPS', 'Keşif'],
    status: 'completed',
    releaseDate: '2023-12-07',
    score: 79,
    progressCurrent: 24,
    progressTotal: 24,
    rawgSlug: 'avatar-frontiers-of-pandora'
  }
];
