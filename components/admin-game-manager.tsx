import type { AdminGame } from '@/lib/data/admin-games';
import { createGameAction, deleteGameAction, updateGameAction } from '@/app/admin/games/actions';

const statusOptions = [
  ['planned', 'Planlandı'],
  ['playing', 'Devam Ediyor'],
  ['completed', 'Tamamlandı'],
  ['paused', 'Beklemede']
] as const;

function GameFormFields({ game }: { game?: AdminGame }) {
  return (
    <div className="admin-form-grid">
      <label>
        <span>Oyun adı *</span>
        <input name="title" defaultValue={game?.title || ''} placeholder="Örn: Alan Wake 2" required />
      </label>
      <label>
        <span>Slug</span>
        <input name="slug" defaultValue={game?.slug || ''} placeholder="alan-wake-2" />
      </label>
      <label>
        <span>Durum</span>
        <select name="status" defaultValue={game?.status || 'planned'}>
          {statusOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </label>
      <label>
        <span>Tür</span>
        <input name="genre" defaultValue={game?.genre || ''} placeholder="Aksiyon, Korku, RPG" />
      </label>
      <label className="span-2">
        <span>Açıklama</span>
        <textarea name="description" defaultValue={game?.description || ''} placeholder="Oyun sayfasında gösterilecek kısa açıklama" rows={4} />
      </label>
      <label>
        <span>Kapak URL</span>
        <input name="cover_url" defaultValue={game?.coverUrl || ''} placeholder="https://..." />
      </label>
      <label>
        <span>Banner URL</span>
        <input name="banner_url" defaultValue={game?.bannerUrl || ''} placeholder="https://..." />
      </label>
      <label>
        <span>Etiketler</span>
        <input name="tags" defaultValue={game?.tags.join(', ') || ''} placeholder="hikaye, türkçe, seri" />
      </label>
      <label>
        <span>Platformlar</span>
        <input name="platforms" defaultValue={game?.platforms.join(', ') || ''} placeholder="PC, PS5, Xbox" />
      </label>
      <label>
        <span>Çıkış tarihi</span>
        <input name="release_date" type="date" defaultValue={game?.releaseDate || ''} />
      </label>
      <label>
        <span>Puan</span>
        <input name="score" type="number" step="0.1" min="0" max="100" defaultValue={game?.score ?? ''} placeholder="8.5" />
      </label>
      <label>
        <span>Yayınlanan bölüm</span>
        <input name="progress_current" type="number" min="0" defaultValue={game?.progressCurrent ?? 0} />
      </label>
      <label>
        <span>Toplam bölüm</span>
        <input name="progress_total" type="number" min="0" defaultValue={game?.progressTotal ?? 0} />
      </label>
      <label>
        <span>RAWG ID</span>
        <input name="rawg_id" type="number" min="0" defaultValue={game?.rawgId ?? ''} />
      </label>
      <label>
        <span>RAWG slug</span>
        <input name="rawg_slug" defaultValue={game?.rawgSlug || ''} placeholder="alan-wake-2" />
      </label>
      <label>
        <span>YouTube playlist ID</span>
        <input name="youtube_playlist_id" defaultValue={game?.youtubePlaylistId || ''} />
      </label>
      <label>
        <span>YouTube playlist URL</span>
        <input name="youtube_playlist_url" defaultValue={game?.youtubePlaylistUrl || ''} placeholder="https://youtube.com/playlist?list=..." />
      </label>
      <label>
        <span>Seri adı</span>
        <input name="series_name" defaultValue={game?.seriesName || ''} placeholder="Alan Wake Serisi" />
      </label>
      <label>
        <span>Seri sırası</span>
        <input name="series_order" type="number" min="0" defaultValue={game?.seriesOrder ?? 0} />
      </label>
      <label className="check-line">
        <input name="featured" type="checkbox" defaultChecked={game?.featured ?? false} />
        <span>Öne çıkar</span>
      </label>
      <label className="check-line">
        <input name="is_public" type="checkbox" defaultChecked={game?.isPublic ?? true} />
        <span>Sitede yayınla</span>
      </label>
    </div>
  );
}

function statusLabel(status: AdminGame['status']) {
  return statusOptions.find(([value]) => value === status)?.[1] || 'Planlandı';
}

export function AdminGameManager({ games, usingMock }: { games: AdminGame[]; usingMock: boolean }) {
  return (
    <section className="admin-manager-grid">
      <article className="panel admin-form-panel">
        <div className="section-heading compact-heading">
          <span className="eyebrow">Yeni oyun</span>
          <h2>Oyun ekle</h2>
          <p>Bu form Supabase `games` tablosuna kayıt ekler. Kapakları şimdilik URL ile giriyoruz; RAWG kapak çekme v0.0.3’te ayrı butonla gelecek.</p>
        </div>
        <form action={createGameAction} className="admin-form">
          <GameFormFields />
          <button className="primary-button full-button" type="submit" disabled={usingMock}>Oyunu ekle</button>
          {usingMock ? <p className="form-note danger-note">Supabase env eksik olduğu için kayıt ekleme kapalı. `.env.local` dosyasını doldurunca aktif olur.</p> : null}
        </form>
      </article>

      <div className="admin-list-column">
        <div className="section-heading compact-heading">
          <span className="eyebrow">Kayıtlı oyunlar</span>
          <h2>{games.length} oyun</h2>
          <p>Her karttan oyunu düzenleyebilir veya silebilirsin. Silme işlemi Supabase’den kaldırır.</p>
        </div>

        <div className="admin-game-list">
          {games.map((game) => (
            <article className="panel admin-game-card" key={game.id}>
              <div className="admin-game-cover">
                {game.coverUrl ? <img src={game.coverUrl} alt={`${game.title} kapak`} /> : <span>HO</span>}
              </div>
              <div className="admin-game-content">
                <div className="admin-game-topline">
                  <span>{statusLabel(game.status)}</span>
                  <span>{game.isPublic ? 'Yayında' : 'Gizli'}</span>
                  {game.featured ? <span>Öne çıkan</span> : null}
                </div>
                <h3>{game.title}</h3>
                <p>{game.description || 'Açıklama eklenmedi.'}</p>
                <div className="admin-mini-grid">
                  <span>Slug: <strong>{game.slug}</strong></span>
                  <span>Tür: <strong>{game.genre}</strong></span>
                  <span>Bölüm: <strong>{game.progressCurrent}/{game.progressTotal}</strong></span>
                  <span>Seri: <strong>{game.seriesName || '-'}</strong></span>
                </div>

                <details className="edit-details">
                  <summary>Düzenle</summary>
                  <form action={updateGameAction} className="admin-form edit-form">
                    <input type="hidden" name="id" value={game.id} />
                    <GameFormFields game={game} />
                    <button className="primary-button full-button" type="submit" disabled={usingMock}>Kaydet</button>
                  </form>
                </details>

                <form action={deleteGameAction} className="delete-form">
                  <input type="hidden" name="id" value={game.id} />
                  <button className="danger-button" type="submit" disabled={usingMock}>Oyunu sil</button>
                </form>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
