'use client';

import { useState, type ChangeEvent } from 'react';
import type { AdminGame } from '@/lib/data/admin-games';
import { createGameAction, deleteGameAction, updateGameAction } from '@/app/admin/games/actions';

const statusOptions = [
  ['planned', 'Planlandı'],
  ['playing', 'Devam Ediyor'],
  ['completed', 'Tamamlandı'],
  ['paused', 'Beklemede']
] as const;

type RawgSearchResult = {
  rawgId: number;
  title: string;
  slug: string;
  coverUrl: string;
  releaseDate: string | null;
  rating: number | null;
  metacritic: number | null;
  genres: string[];
  platforms: string[];
};

type GameFormState = {
  title: string;
  slug: string;
  status: AdminGame['status'];
  genre: string;
  description: string;
  coverUrl: string;
  bannerUrl: string;
  tags: string;
  platforms: string;
  releaseDate: string;
  score: string;
  progressCurrent: string;
  progressTotal: string;
  rawgId: string;
  rawgSlug: string;
  youtubePlaylistId: string;
  youtubePlaylistUrl: string;
  seriesName: string;
  seriesOrder: string;
  featured: boolean;
  isPublic: boolean;
};

function initialState(game?: AdminGame): GameFormState {
  return {
    title: game?.title || '',
    slug: game?.slug || '',
    status: game?.status || 'planned',
    genre: game?.genre || '',
    description: game?.description || '',
    coverUrl: game?.coverUrl || '',
    bannerUrl: game?.bannerUrl || '',
    tags: game?.tags.join(', ') || '',
    platforms: game?.platforms.join(', ') || '',
    releaseDate: game?.releaseDate || '',
    score: game?.score == null ? '' : String(game.score),
    progressCurrent: String(game?.progressCurrent ?? 0),
    progressTotal: String(game?.progressTotal ?? 0),
    rawgId: game?.rawgId == null ? '' : String(game.rawgId),
    rawgSlug: game?.rawgSlug || '',
    youtubePlaylistId: game?.youtubePlaylistId || '',
    youtubePlaylistUrl: game?.youtubePlaylistUrl || '',
    seriesName: game?.seriesName || '',
    seriesOrder: String(game?.seriesOrder ?? 0),
    featured: game?.featured ?? false,
    isPublic: game?.isPublic ?? true
  };
}

function scoreFromRawg(result: RawgSearchResult) {
  if (typeof result.metacritic === 'number') return String(result.metacritic);
  if (typeof result.rating === 'number') return String(Math.round(result.rating * 20));
  return '';
}

function statusLabel(status: AdminGame['status']) {
  return statusOptions.find(([value]) => value === status)?.[1] || 'Planlandı';
}

function GameFormFields({ game }: { game?: AdminGame }) {
  const [form, setForm] = useState<GameFormState>(() => initialState(game));
  const [rawgQuery, setRawgQuery] = useState(game?.title || '');
  const [rawgResults, setRawgResults] = useState<RawgSearchResult[]>([]);
  const [rawgStatus, setRawgStatus] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  function updateField<K extends keyof GameFormState>(key: K, value: GameFormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function textInput(key: keyof Omit<GameFormState, 'featured' | 'isPublic' | 'status'>) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => updateField(key, event.target.value as never);
  }

  async function searchRawg() {
    const query = rawgQuery.trim() || form.title.trim();
    if (!query) {
      setRawgStatus('Önce oyun adı yaz veya RAWG arama kutusuna kelime gir.');
      return;
    }

    setIsSearching(true);
    setRawgStatus('RAWG üzerinde aranıyor...');
    setRawgResults([]);

    try {
      const response = await fetch(`/api/rawg/search?query=${encodeURIComponent(query)}&pageSize=8`);
      const payload = await response.json();

      if (!payload.ok) {
        setRawgStatus(payload.message || 'RAWG araması başarısız oldu.');
        return;
      }

      setRawgResults(payload.results || []);
      setRawgStatus(payload.count ? `${payload.count} sonuç bulundu. Uygun karttan forma aktar.` : 'Sonuç bulunamadı.');
    } catch {
      setRawgStatus('RAWG araması sırasında bağlantı hatası oluştu.');
    } finally {
      setIsSearching(false);
    }
  }

  function applyRawgResult(result: RawgSearchResult) {
    setForm((current) => ({
      ...current,
      title: result.title || current.title,
      slug: result.slug || current.slug,
      coverUrl: result.coverUrl || current.coverUrl,
      bannerUrl: result.coverUrl || current.bannerUrl,
      genre: result.genres.join(', ') || current.genre,
      platforms: result.platforms.join(', ') || current.platforms,
      releaseDate: result.releaseDate || current.releaseDate,
      score: scoreFromRawg(result) || current.score,
      rawgId: String(result.rawgId),
      rawgSlug: result.slug || current.rawgSlug
    }));
    setRawgStatus(`${result.title} bilgileri forma aktarıldı. Kaydetmeyi unutma.`);
  }

  return (
    <>
      <div className="rawg-helper-box">
        <div>
          <span className="eyebrow">RAWG otomasyonu</span>
          <h3>Oyun adıyla kapak ve meta çek</h3>
          <p>RAWG sonucunu seçince kapak, banner, tür, platform, çıkış tarihi, puan, RAWG ID ve slug alanları otomatik dolar.</p>
        </div>
        <div className="rawg-search-row">
          <input
            value={rawgQuery}
            onChange={(event) => setRawgQuery(event.target.value)}
            placeholder="Örn: Assassin's Creed Origins"
          />
          <button className="ghost-button rawg-search-button" type="button" onClick={searchRawg} disabled={isSearching}>
            {isSearching ? 'Aranıyor...' : 'RAWG ara'}
          </button>
        </div>
        {rawgStatus ? <p className="rawg-status">{rawgStatus}</p> : null}
        {rawgResults.length ? (
          <div className="rawg-result-grid">
            {rawgResults.map((result) => (
              <button className="rawg-result-card" key={result.rawgId} type="button" onClick={() => applyRawgResult(result)}>
                <span className="rawg-result-cover">
                  {result.coverUrl ? <img src={result.coverUrl} alt="" /> : <strong>RAWG</strong>}
                </span>
                <span className="rawg-result-body">
                  <strong>{result.title}</strong>
                  <small>{result.releaseDate || 'Tarih yok'} · {result.metacritic ? `${result.metacritic} MC` : result.rating ? `${result.rating}/5` : 'Puan yok'}</small>
                  <em>{result.genres.slice(0, 3).join(', ') || 'Tür bilgisi yok'}</em>
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className="admin-form-grid">
        <label>
          <span>Oyun adı *</span>
          <input name="title" value={form.title} onChange={textInput('title')} placeholder="Örn: Alan Wake 2" required />
        </label>
        <label>
          <span>Slug</span>
          <input name="slug" value={form.slug} onChange={textInput('slug')} placeholder="alan-wake-2" />
        </label>
        <label>
          <span>Durum</span>
          <select name="status" value={form.status} onChange={(event) => updateField('status', event.target.value as AdminGame['status'])}>
            {statusOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <label>
          <span>Tür</span>
          <input name="genre" value={form.genre} onChange={textInput('genre')} placeholder="Aksiyon, Korku, RPG" />
        </label>
        <label className="span-2">
          <span>Açıklama</span>
          <textarea name="description" value={form.description} onChange={textInput('description')} placeholder="Oyun sayfasında gösterilecek kısa açıklama" rows={4} />
        </label>
        <label>
          <span>Kapak URL</span>
          <input name="cover_url" value={form.coverUrl} onChange={textInput('coverUrl')} placeholder="https://..." />
        </label>
        <label>
          <span>Banner URL</span>
          <input name="banner_url" value={form.bannerUrl} onChange={textInput('bannerUrl')} placeholder="https://..." />
        </label>
        <label>
          <span>Etiketler</span>
          <input name="tags" value={form.tags} onChange={textInput('tags')} placeholder="hikaye, türkçe, seri" />
        </label>
        <label>
          <span>Platformlar</span>
          <input name="platforms" value={form.platforms} onChange={textInput('platforms')} placeholder="PC, PS5, Xbox" />
        </label>
        <label>
          <span>Çıkış tarihi</span>
          <input name="release_date" type="date" value={form.releaseDate} onChange={textInput('releaseDate')} />
        </label>
        <label>
          <span>Puan</span>
          <input name="score" type="number" step="0.1" min="0" max="100" value={form.score} onChange={textInput('score')} placeholder="8.5" />
        </label>
        <label>
          <span>Yayınlanan bölüm</span>
          <input name="progress_current" type="number" min="0" value={form.progressCurrent} onChange={textInput('progressCurrent')} />
        </label>
        <label>
          <span>Toplam bölüm</span>
          <input name="progress_total" type="number" min="0" value={form.progressTotal} onChange={textInput('progressTotal')} />
        </label>
        <label>
          <span>RAWG ID</span>
          <input name="rawg_id" type="number" min="0" value={form.rawgId} onChange={textInput('rawgId')} />
        </label>
        <label>
          <span>RAWG slug</span>
          <input name="rawg_slug" value={form.rawgSlug} onChange={textInput('rawgSlug')} placeholder="alan-wake-2" />
        </label>
        <label>
          <span>YouTube playlist ID</span>
          <input name="youtube_playlist_id" value={form.youtubePlaylistId} onChange={textInput('youtubePlaylistId')} />
        </label>
        <label>
          <span>YouTube playlist URL</span>
          <input name="youtube_playlist_url" value={form.youtubePlaylistUrl} onChange={textInput('youtubePlaylistUrl')} placeholder="https://youtube.com/playlist?list=..." />
        </label>
        <label>
          <span>Seri adı</span>
          <input name="series_name" value={form.seriesName} onChange={textInput('seriesName')} placeholder="Alan Wake Serisi" />
        </label>
        <label>
          <span>Seri sırası</span>
          <input name="series_order" type="number" min="0" value={form.seriesOrder} onChange={textInput('seriesOrder')} />
        </label>
        <label className="check-line">
          <input name="featured" type="checkbox" checked={form.featured} onChange={(event) => updateField('featured', event.target.checked)} />
          <span>Öne çıkar</span>
        </label>
        <label className="check-line">
          <input name="is_public" type="checkbox" checked={form.isPublic} onChange={(event) => updateField('isPublic', event.target.checked)} />
          <span>Sitede yayınla</span>
        </label>
      </div>
    </>
  );
}

export function AdminGameManager({ games, usingMock }: { games: AdminGame[]; usingMock: boolean }) {
  return (
    <section className="admin-manager-grid">
      <article className="panel admin-form-panel">
        <div className="section-heading compact-heading">
          <span className="eyebrow">Yeni oyun</span>
          <h2>Oyun ekle</h2>
          <p>RAWG arama ile kapak, tür, platform, çıkış tarihi, puan ve RAWG bilgilerini otomatik doldurabilirsin.</p>
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
          <p>Her karttan oyunu düzenleyebilir, RAWG ile güncelleyebilir veya silebilirsin.</p>
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
                  {game.rawgId ? <span>RAWG #{game.rawgId}</span> : null}
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
                  <summary>Düzenle / RAWG ile güncelle</summary>
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
