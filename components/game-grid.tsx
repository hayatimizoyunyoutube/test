import type { Game } from '@/types/game';

const statusLabel: Record<Game['status'], string> = {
  playing: 'Devam Ediyor',
  completed: 'Tamamlandı',
  planned: 'Planlandı',
  paused: 'Beklemede'
};

export function GameGrid({ games }: { games: Game[] }) {
  return (
    <section id="games" className="section-block">
      <div className="section-heading">
        <span className="eyebrow">Oyun vitrini</span>
        <h2>Yeni kart sistemi</h2>
        <p>Oyun kartları artık Supabase kayıtlarından beslenebilir. Admin panelden eklenen yayınlanmış oyunlar burada görünür.</p>
      </div>
      <div className="game-grid">
        {games.map((game) => {
          const progress = game.progressTotal > 0 ? Math.round((game.progressCurrent / game.progressTotal) * 100) : 0;
          return (
            <article className="game-card panel" key={game.id}>
              <div className="cover-wrap">
                {game.coverUrl ? <img src={game.coverUrl} alt={`${game.title} kapak görseli`} /> : <div className="cover-placeholder">HO</div>}
                <span className="status-pill">{statusLabel[game.status]}</span>
              </div>
              <div className="game-card-body">
                <span className="genre">{game.genre}</span>
                <h3>{game.title}</h3>
                <p>{game.description}</p>
                <div className="tag-row">
                  {game.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="progress-block">
                  <div className="progress-label">
                    <span>İlerleme</span>
                    <strong>{game.progressCurrent}/{game.progressTotal}</strong>
                  </div>
                  <div className="progress-track"><span style={{ width: `${Math.min(progress, 100)}%` }} /></div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
