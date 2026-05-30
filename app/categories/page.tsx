import { archiveCategories, getCategoryStats } from "@/lib/data/categories";
import { archiveSeries } from "@/lib/data/series";
import { siteConfig } from "@/lib/config/site";

export default function CategoriesPage() {
  const totalEpisodes = archiveSeries.reduce((total, series) => total + series.episodes, 0);
  const totalLinkedSeries = archiveCategories.reduce(
    (total, category) => total + getCategoryStats(category).series.length,
    0
  );

  return (
    <main className="categoriesPage categoriesPageV104">
      <header className="cinemaHeader innerCinemaHeader">
        <a className="cinemaBrand" href="/">
          <span className="cinemaBrandMark">▶</span>
          <span>
            <strong>Hayatımız Oyun</strong>
            <small>{siteConfig.version} · Kategoriler</small>
          </span>
        </a>

        <nav className="cinemaNav">
          <a href="/">Ana Sayfa</a>
          <a href="/series">Seriler</a>
          <a className="active" href="/categories">Kategoriler</a>
          <a href="/channels">Kanallar</a>
          <a href="/updates">Güncellemeler</a>
        </nav>

        <form className="cinemaSearch" action="/series">
          <span>⌕</span>
          <input name="q" placeholder="Kategori veya seri ara..." />
          <button type="submit">Ara</button>
        </form>
      </header>

      <header className="categoryShowcaseHero">
        <div className="categoryShowcaseText">
          <a href="/" className="backLink">← Ana sayfaya dön</a>
          <p className="eyebrow">v1.0.4 · KATEGORİ DENEYİMİ</p>
          <h1>
            Oyun Arşivini <span>Kategorilere Göre Keşfet.</span>
          </h1>
          <p>
            Serileri yalnızca listelemek yerine, her kategoriye ayrı bir vitrin
            mantığı kazandırıyoruz. Bu sürümde kategori kartları daha profesyonel,
            okunabilir ve arşiv odaklı hale getirildi.
          </p>

          <div className="categoryHeroActions">
            <a href="/series">Tüm Serileri Gör</a>
            <a href="/channels" className="ghost">Kanallara Git</a>
          </div>
        </div>

        <div className="categoryHeroStats">
          <div>
            <strong>{archiveCategories.length}</strong>
            <span>Kategori</span>
          </div>
          <div>
            <strong>{totalLinkedSeries}</strong>
            <span>Bağlı Seri</span>
          </div>
          <div>
            <strong>{totalEpisodes}</strong>
            <span>Toplam Bölüm</span>
          </div>
        </div>
      </header>

      <section className="categorySpotlight">
        <div className="categorySpotlightHead">
          <div>
            <p className="eyebrow">KATEGORİ VİTRİNİ</p>
            <h2>Arşivin Ana Türleri</h2>
          </div>
          <span>Demo verilerle public görünüm</span>
        </div>

        <div className="categoryShowcaseGrid">
          {archiveCategories.map((category) => {
            const stats = getCategoryStats(category);

            return (
              <article key={category.id} className={`categoryShowcaseCard ${category.tone}`}>
                <div className="categoryShowcasePoster">
                  <span>{category.icon}</span>
                  <small>{category.highlight}</small>
                </div>

                <div className="categoryShowcaseBody">
                  <div className="categoryTop">
                    <span>{stats.series.length} seri</span>
                    <span>{stats.episodes} bölüm</span>
                    <span>{category.keywords.join(", ")}</span>
                  </div>

                  <h2>{category.title}</h2>
                  <p>{category.longDescription}</p>

                  <div className="categoryMiniStats">
                    <div>
                      <span>Tamamlandı</span>
                      <strong>{stats.completed}</strong>
                    </div>
                    <div>
                      <span>Devam</span>
                      <strong>{stats.active}</strong>
                    </div>
                    <div>
                      <span>Yakında</span>
                      <strong>{stats.planned}</strong>
                    </div>
                  </div>

                  <div className="categorySeriesPreview">
                    {stats.series.length > 0 ? (
                      stats.series.slice(0, 3).map((series) => (
                        <a key={series.id} href={`/series/${series.slug}`}>
                          <strong>{series.title}</strong>
                          <span>{series.episodes} bölüm · %{series.progress}</span>
                        </a>
                      ))
                    ) : (
                      <div className="emptyCategory">Bu kategori için seri yakında eklenecek.</div>
                    )}
                  </div>

                  <div className="categoryShowcaseActions">
                    <a href={`/series?category=${encodeURIComponent(category.title)}`}>Bu Kategoriyi Aç</a>
                    <a className="soft" href="/series">Tüm Seriler</a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
