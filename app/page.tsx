import { archiveSeries } from "@/lib/data/series";
import { archiveCategories } from "@/lib/data/categories";
import { archiveChannels } from "@/lib/data/channels";
import { siteConfig } from "@/lib/config/site";

const version = siteConfig.version;

const completedCount = archiveSeries.filter((item) => item.status === "completed").length;
const activeCount = archiveSeries.filter((item) => item.status === "active").length;
const plannedCount = archiveSeries.filter((item) => item.status === "planned").length;
const totalEpisodes = archiveSeries.reduce((total, item) => total + item.episodes, 0);

const quickLinks = [
  { href: "/series", label: "Seriler" },
  { href: "/categories", label: "Kategoriler" },
  { href: "/channels", label: "Kanallar" },
  { href: "/updates", label: "Güncellemeler" }
];

function statusText(status: string) {
  if (status === "completed") return "Tamamlandı";
  if (status === "active") return "Devam Ediyor";
  return "Yakında";
}

export default function HomePage() {
  const featuredSeries = archiveSeries.slice(0, 6);

  return (
    <main className="site-shell homeBetaShell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandIcon">▶</div>
          <div>
            <strong>Hayatımız Oyun</strong>
            <span>YouTube Arşiv Video Sitesi</span>
          </div>
        </div>

        <nav className="nav">
          <a className="active" href="/">Ana Sayfa</a>
          {quickLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>

        <div className="versionBox">
          <strong>{version}</strong>
          <span>Public Arşiv Beta</span>
        </div>
      </aside>

      <section className="content betaContent">
        <header className="mobileHeader">
          <div className="brand compact">
            <div className="brandIcon">▶</div>
            <div>
              <strong>Hayatımız Oyun</strong>
              <span>{version}</span>
            </div>
          </div>
        </header>

        <header className="topbar proTopbar betaTopbar">
          <form className="homeSearch betaSearch" action="/series">
            <span>⌕</span>
            <input name="q" placeholder="Seri, oyun, kategori veya kanal ara..." />
            <button type="submit">Arşivde Ara</button>
          </form>

          <div className="topbarActions">
            <a href="/series">Serileri Aç</a>
            <a href="/updates" className="soft">Yol Haritası</a>
          </div>
        </header>

        <section className="betaHero">
          <div className="betaHeroText">
            <p className="eyebrow">v1.0.0 · PUBLIC ARŞİV BETA</p>
            <h1>
              YouTube Oyun Serileri İçin <span>Profesyonel Arşiv Merkezi.</span>
            </h1>
            <p>
              Tamamlanan, devam eden ve yakında gelecek oyun serilerini tek
              merkezde keşfet. Bu beta sürümde public arşiv deneyimi demo
              verilerle tamamlandı.
            </p>

            <div className="actions proActions">
              <a href="/series">Serileri Keşfet</a>
              <a className="ghost" href="/categories">Kategorilere Bak</a>
              <a className="ghost cyan" href="/channels">Kanalları Gör</a>
            </div>
          </div>

          <div className="betaHeroBoard">
            <div className="boardLine">
              <span>Toplam Seri</span>
              <strong>{archiveSeries.length}</strong>
            </div>
            <div className="boardLine">
              <span>Toplam Bölüm</span>
              <strong>{totalEpisodes}</strong>
            </div>
            <div className="boardLine">
              <span>Kategori</span>
              <strong>{archiveCategories.length}</strong>
            </div>
            <div className="boardLine">
              <span>Kanal</span>
              <strong>{archiveChannels.length}</strong>
            </div>
          </div>
        </section>

        <section className="betaStatsGrid">
          <article>
            <span>Tamamlanan Seriler</span>
            <strong>{completedCount}</strong>
            <p>Arşivlenmiş ve bitmiş seri alanı.</p>
          </article>
          <article>
            <span>Devam Eden Seriler</span>
            <strong>{activeCount}</strong>
            <p>Aktif şekilde büyüyen seri alanı.</p>
          </article>
          <article>
            <span>Yakında Gelecek</span>
            <strong>{plannedCount}</strong>
            <p>Planlanan seri ve yayın hazırlıkları.</p>
          </article>
        </section>

        <section className="mobileQuickNav betaQuickNav">
          {quickLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </section>

        <section className="betaSection">
          <div className="betaSectionHead">
            <div>
              <p className="eyebrow">ÖNE ÇIKAN SERİLER</p>
              <h2>Public Arşiv Beta Vitrini</h2>
            </div>
            <a href="/series">Tüm Serileri Gör</a>
          </div>

          <div className="betaFeaturedGrid">
            {featuredSeries.map((series) => (
              <a key={series.id} href={`/series/${series.slug}`} className={`betaFeaturedCard ${series.status}`}>
                <div className="betaPoster">
                  <span>{series.title.slice(0, 2).toUpperCase()}</span>
                </div>
                <div>
                  <div className="seriesMeta">
                    <span>{series.category}</span>
                    <span>{statusText(series.status)}</span>
                  </div>
                  <h3>{series.title}</h3>
                  <p>{series.description}</p>

                  <div className="progressTop">
                    <span>{series.episodes} bölüm</span>
                    <span>%{series.progress}</span>
                  </div>
                  <div className="progressTrack">
                    <div style={{ width: `${series.progress}%` }} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="betaSection betaExplore">
          <div className="betaSectionHead">
            <div>
              <p className="eyebrow">KEŞİF ALANLARI</p>
              <h2>Arşivi Nasıl Gezebilirsin?</h2>
            </div>
          </div>

          <div className="betaExploreGrid">
            <a href="/series">
              <strong>Seriler</strong>
              <span>Tamamlanan, devam eden ve yakında gelecek oyun serileri.</span>
            </a>
            <a href="/categories">
              <strong>Kategoriler</strong>
              <span>Aksiyon, RPG, korku, bilim kurgu ve diğer arşiv türleri.</span>
            </a>
            <a href="/channels">
              <strong>Kanallar</strong>
              <span>Arşiv içeriklerini kanal mantığıyla grupla ve keşfet.</span>
            </a>
            <a href="/updates">
              <strong>Güncellemeler</strong>
              <span>Projenin hangi sürümde ne kazandığını takip et.</span>
            </a>
          </div>
        </section>

        <section className="aboutBox proAbout betaNote">
          <div>
            <h2>v1.0.0 beta notu</h2>
            <p>
              Bu sürüm public arşiv deneyimini toparlar. Henüz Supabase, giriş
              sistemi, admin panel ve YouTube API yok. Bunlar ileriki sürümlerde
              kontrollü şekilde eklenecek.
            </p>
          </div>
          <a href="/updates">Güncelleme Akışını Aç</a>
        </section>
      </section>
    </main>
  );
}
