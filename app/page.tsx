import {
  getCategories,
  getChannels,
  getRecentEpisodes,
  getSeriesList,
  isSupabaseConfigured,
  statusBadge
} from "@/lib/data/archive";
import { siteConfig } from "@/lib/config/site";

export const dynamic = "force-dynamic";

function EmptyShowcase() {
  return (
    <div className="emptyArchiveBox">
      <strong>Supabase arşiv verisi bekleniyor.</strong>
      <p>Demo kartlar kaldırıldı. Supabase içine kategori, kanal ve seri eklediğinde public vitrin otomatik dolacak.</p>
      <a href="/status">Durumu Kontrol Et</a>
    </div>
  );
}

export default async function HomePage() {
  const [series, categories, channels, recentEpisodes] = await Promise.all([
    getSeriesList(),
    getCategories(),
    getChannels(),
    getRecentEpisodes(4)
  ]);

  const completedSeries = series.filter((item) => item.status === "completed");
  const activeSeries = series.filter((item) => item.status === "active");
  const plannedSeries = series.filter((item) => item.status === "planned");
  const totalEpisodes = series.reduce((total, item) => total + item.episodes, 0);
  const featuredSeries = series.filter((item) => item.isFeatured).slice(0, 4);
  const showcaseSeries = activeSeries.length > 0 ? activeSeries : featuredSeries;

  return (
    <main className="cinemaHome">
      <header className="cinemaHeader">
        <a className="cinemaBrand" href="/">
          <span className="cinemaBrandMark">▶</span>
          <span>
            <strong>Hayatımız Oyun</strong>
            <small>Supabase Public Arşiv</small>
          </span>
        </a>

        <nav className="cinemaNav">
          <a className="active" href="/">Ana Sayfa</a>
          <a href="/series">Seriler</a>
          <a href="/categories">Kategoriler</a>
          <a href="/channels">Kanallar</a>
          <a href="/updates">Güncellemeler</a>
        </nav>

        <form className="cinemaSearch" action="/series">
          <span>⌕</span>
          <input name="q" placeholder="Supabase arşivinde ara..." />
          <button type="submit">Ara</button>
        </form>

        <a className="cinemaVersion" href="/updates">{siteConfig.version}</a>
      </header>

      <section className="cinemaHero">
        <div className="heroBackdropText">Supabase</div>

        <div className="cinemaHeroContent">
          <p className="cinemaKicker">GERÇEK VERİ BAŞLANGICI</p>
          <h1>HAYATIMIZ <span>OYUN</span></h1>
          <p>
            Demo içerikler kaldırıldı. Artık ana sayfa, seriler, kategoriler,
            kanallar ve bölümler Supabase public verisinden okunacak.
          </p>

          <div className="cinemaHeroActions">
            <a href="/series">Serileri Gör</a>
            <a href="/status" className="ghost">Veri Durumu</a>
            <a href="/updates" className="ghost red">Yol Haritası</a>
          </div>
        </div>

        <div className="cinemaHeroSide">
          <div><strong>{series.length}</strong><span>Toplam Seri</span></div>
          <div><strong>{totalEpisodes}</strong><span>Toplam Bölüm</span></div>
          <div><strong>{categories.length}</strong><span>Kategori</span></div>
          <div><strong>{channels.length}</strong><span>Kanal</span></div>
        </div>
      </section>

      {!isSupabaseConfigured() ? (
        <section className="cinemaSection"><EmptyShowcase /></section>
      ) : null}

      <section className="cinemaSection">
        <div className="cinemaSectionHead">
          <div><p>DEVAM EDEN SERİLER</p><h2>Supabase Arşiv Takibi</h2></div>
          <a href="/series?status=active">Tümünü Gör →</a>
        </div>

        {showcaseSeries.length > 0 ? (
          <div className="continueRail">
            {showcaseSeries.slice(0, 4).map((item) => (
              <a key={item.id} href={`/series/${item.slug}`} className="continueCard">
                <div className="continuePoster"><span>{item.title.slice(0, 2).toUpperCase()}</span></div>
                <div>
                  <strong>{item.title}</strong>
                  <small>{statusBadge(item.status)} · {item.episodes} bölüm · %{item.progress}</small>
                  <div className="miniProgress"><span style={{ width: `${Math.max(item.progress, 8)}%` }} /></div>
                </div>
              </a>
            ))}
          </div>
        ) : <EmptyShowcase />}
      </section>

      <section className="cinemaSection">
        <div className="cinemaSectionHead">
          <div><p>SON EKLENEN BÖLÜMLER</p><h2>Gerçek Arşiv Akışı</h2></div>
          <a href="/series">Tümünü Gör →</a>
        </div>

        {recentEpisodes.length > 0 ? (
          <div className="videoGrid">
            {recentEpisodes.map((episode) => (
              <article key={episode.id} className="videoCard">
                <div className="videoThumb"><span>{String(episode.episodeNumber || 1).padStart(2, "0")}</span><small>{episode.status}</small></div>
                <h3>{episode.title}</h3>
                <p>{episode.duration}</p>
              </article>
            ))}
          </div>
        ) : <EmptyShowcase />}
      </section>

      <section className="cinemaInfoGrid">
        <a href="/series?status=completed" className="infoTile"><span>Kesintisiz Deneyim</span><strong>{completedSeries.length} tamamlanan seri</strong><p>Bitmiş serileri Supabase arşivinde tut.</p></a>
        <a href="/series?status=active" className="infoTile"><span>İlerlemeyi Kaydet</span><strong>{activeSeries.length} devam eden seri</strong><p>Aktif serilerin hangi aşamada olduğunu hızlıca gör.</p></a>
        <a href="/categories" className="infoTile"><span>Listeler</span><strong>{categories.length} kategori</strong><p>Serileri türüne göre ayır ve kolay keşfet.</p></a>
        <a href="/updates" className="infoTile"><span>Topluluk</span><strong>{siteConfig.targetVersion} hedefi</strong><p>Site adım adım ana yayın sürümüne hazırlanıyor.</p></a>
      </section>
    </main>
  );
}
