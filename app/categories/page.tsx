import { archiveCategories, getCategoryStats } from "@/lib/data/categories";
import { archiveSeries } from "@/lib/data/series";
import { siteConfig } from "@/lib/config/site";

export default function CategoriesPage() {
  const totalEpisodes = archiveSeries.reduce((total, series) => total + series.episodes, 0);
  const totalLinkedSeries = archiveCategories.reduce((total, category) => total + getCategoryStats(category).series.length, 0);

  return (
    <main className="innerPage">
      <header className="cinemaHeader innerCinemaHeader">
        <a className="cinemaBrand" href="/"><span className="cinemaBrandMark">▶</span><span><strong>Hayatımız Oyun</strong><small>{siteConfig.version} · Kategoriler</small></span></a>
        <nav className="cinemaNav"><a href="/">Ana Sayfa</a><a href="/series">Seriler</a><a className="active" href="/categories">Kategoriler</a><a href="/channels">Kanallar</a><a href="/updates">Güncellemeler</a></nav>
        <form className="cinemaSearch" action="/series"><span>⌕</span><input name="q" placeholder="Kategori veya seri ara..." /><button type="submit">Ara</button></form>
      </header>
      <section className="pageHero">
        <div><a href="/" className="backLink">← Ana sayfaya dön</a><p className="eyebrow">KATEGORİ DENEYİMİ</p><h1>Oyun Arşivini <span>Kategorilere Göre Keşfet.</span></h1><p>Her kategoriye ayrı bir vitrin mantığı kazandırıyoruz. Kategori kartları daha profesyonel ve okunabilir hale getirildi.</p></div>
        <div className="heroStats"><div><strong>{archiveCategories.length}</strong><span>Kategori</span></div><div><strong>{totalLinkedSeries}</strong><span>Bağlı Seri</span></div><div><strong>{totalEpisodes}</strong><span>Toplam Bölüm</span></div></div>
      </section>
      <section className="panelBox">
        <div className="sectionHead"><p className="eyebrow">KATEGORİ VİTRİNİ</p><h2>Arşivin Ana Türleri</h2></div>
        <div className="showcaseGrid">
          {archiveCategories.map((category) => {
            const stats = getCategoryStats(category);
            return (
              <article key={category.id} className="showcaseCard">
                <div className="poster"><span>{category.icon}</span><small>{category.highlight}</small></div>
                <div className="cardBody">
                  <div className="meta"><span>{stats.series.length} seri</span><span>{stats.episodes} bölüm</span><span>{category.keywords.join(", ")}</span></div>
                  <h3>{category.title}</h3><p>{category.longDescription}</p>
                  <div className="infoRow"><div><span>Tamamlandı</span><strong>{stats.completed}</strong></div><div><span>Devam</span><strong>{stats.active}</strong></div><div><span>Yakında</span><strong>{stats.planned}</strong></div></div>
                  <div className="previewList">{stats.series.length > 0 ? stats.series.slice(0, 3).map((series) => <a key={series.id} href={`/series/${series.slug}`}><strong>{series.title}</strong><span>{series.episodes} bölüm · %{series.progress}</span></a>) : <span className="muted">Bu kategori için seri yakında eklenecek.</span>}</div>
                  <div className="cardActions"><a href={`/series?category=${encodeURIComponent(category.title)}`}>Bu Kategoriyi Aç</a><a className="soft" href="/series">Tüm Seriler</a></div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
