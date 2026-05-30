import { archiveSeries, statusBadge } from "@/lib/data/series";
import { archiveCategories } from "@/lib/data/categories";
import { archiveChannels } from "@/lib/data/channels";
import { siteConfig } from "@/lib/config/site";

const completedSeries = archiveSeries.filter((item) => item.status === "completed");
const activeSeries = archiveSeries.filter((item) => item.status === "active");
const plannedSeries = archiveSeries.filter((item) => item.status === "planned");
const totalEpisodes = archiveSeries.reduce((total, item) => total + item.episodes, 0);

const recentVideos = [
  { title: "A Way Out - Bölüm 1", series: "A Way Out", meta: "Yeni eklenen video", tag: "Yeni" },
  { title: "A Plague Tale Requiem - Bölüm 1", series: "A Plague Tale", meta: "Hikaye arşivi", tag: "Arşiv" },
  { title: "Elden Ring - Bölüm 8", series: "Elden Ring", meta: "Devam eden seri", tag: "Aktif" },
  { title: "Cyberpunk 2077 - Bölüm 4", series: "Cyberpunk 2077", meta: "Bilim kurgu arşivi", tag: "Yeni" }
];

export default function HomePage() {
  return (
    <main className="cinemaHome">
      <header className="cinemaHeader">
        <a className="cinemaBrand" href="/">
          <span className="cinemaBrandMark">▶</span>
          <span><strong>Hayatımız Oyun</strong><small>YouTube Arşiv Video Sitesi</small></span>
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
          <input name="q" placeholder="Seri, video veya kanal ara..." />
          <button type="submit">Ara</button>
        </form>
        <a className="cinemaVersion" href="/updates">{siteConfig.version}</a>
      </header>

      <section className="cinemaHero">
        <div className="heroBackdropText">Hayatımız Oyun</div>
        <div className="cinemaHeroContent">
          <p className="cinemaKicker">ARŞİV HAZIR</p>
          <h1>HAYATIMIZ <span>OYUN</span></h1>
          <p>Devam eden seri olduğunda kaldığımız bölümü burada bulacağız. Tamamlanan seriler, yakında gelecek içerikler ve son eklenen videolar tek merkezde toplanacak.</p>
          <div className="cinemaHeroActions">
            <a href="/series">Serileri Gör</a>
            <a href="/channels" className="ghost">Kanallar</a>
            <a href="/updates" className="ghost red">Yol Haritası</a>
          </div>
        </div>
        <div className="cinemaHeroSide">
          <div><strong>{archiveSeries.length}</strong><span>Toplam Seri</span></div>
          <div><strong>{totalEpisodes}</strong><span>Toplam Bölüm</span></div>
          <div><strong>{archiveCategories.length}</strong><span>Kategori</span></div>
          <div><strong>{archiveChannels.length}</strong><span>Kanal</span></div>
        </div>
      </section>

      <section className="cinemaSection">
        <div className="cinemaSectionHead">
          <div><p>DEVAM EDEN SERİLER</p><h2>Aktif Arşiv Takibi</h2></div>
          <a href="/series?status=active">Tümünü Gör →</a>
        </div>
        <div className="continueRail">
          {[...activeSeries, ...plannedSeries.slice(0, 1)].map((series) => (
            <a key={series.id} href={`/series/${series.slug}`} className="continueCard">
              <div className="continuePoster"><span>{series.title.slice(0, 2).toUpperCase()}</span></div>
              <div>
                <strong>{series.title}</strong>
                <small>{statusBadge(series.status)} · {series.episodes} bölüm · %{series.progress}</small>
                <div className="miniProgress"><span style={{ width: `${Math.max(series.progress, 8)}%` }} /></div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="cinemaSection">
        <div className="cinemaSectionHead">
          <div><p>SON EKLENEN VİDEOLAR</p><h2>Yeni Arşiv Akışı</h2></div>
          <a href="/series">Tümünü Gör →</a>
        </div>
        <div className="videoGrid">
          {recentVideos.map((video) => (
            <article key={video.title} className="videoCard">
              <div className="videoThumb"><span>{video.series.slice(0, 2).toUpperCase()}</span><small>{video.tag}</small></div>
              <h3>{video.title}</h3>
              <p>{video.meta}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cinemaInfoGrid">
        <a href="/series?status=completed" className="infoTile"><span>Kesintisiz Deneyim</span><strong>{completedSeries.length} tamamlanan seri</strong><p>Bitmiş serileri düzenli şekilde arşivde tut.</p></a>
        <a href="/series?status=active" className="infoTile"><span>İlerlemeyi Kaydet</span><strong>{activeSeries.length} devam eden seri</strong><p>Aktif serilerin hangi aşamada olduğunu hızlıca gör.</p></a>
        <a href="/categories" className="infoTile"><span>Listeler</span><strong>{archiveCategories.length} kategori</strong><p>Serileri türüne göre ayır ve kolay keşfet.</p></a>
        <a href="/updates" className="infoTile"><span>Topluluk</span><strong>{siteConfig.targetVersion} hedefi</strong><p>Site adım adım ana yayın sürümüne hazırlanıyor.</p></a>
      </section>
    </main>
  );
}
