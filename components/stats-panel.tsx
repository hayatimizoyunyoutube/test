import type { Game } from '@/types/game';

export function StatsPanel({ games }: { games: Game[] }) {
  const completed = games.filter((game) => game.status === 'completed').length;
  const playing = games.filter((game) => game.status === 'playing').length;
  const totalEpisodes = games.reduce((sum, game) => sum + game.progressTotal, 0);

  return (
    <section className="stats-grid" aria-label="Site istatistikleri">
      <article className="stat-card panel">
        <span>Toplam Oyun</span>
        <strong>{games.length}</strong>
      </article>
      <article className="stat-card panel">
        <span>Devam Eden</span>
        <strong>{playing}</strong>
      </article>
      <article className="stat-card panel">
        <span>Tamamlanan</span>
        <strong>{completed}</strong>
      </article>
      <article className="stat-card panel">
        <span>Bölüm Havuzu</span>
        <strong>{totalEpisodes}</strong>
      </article>
    </section>
  );
}
