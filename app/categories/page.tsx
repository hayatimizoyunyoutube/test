import { getCategories, getSeriesList } from "@/lib/data/archive";
import { siteConfig } from "@/lib/config/site";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const [categories, series] = await Promise.all([getCategories(), getSeriesList()]);
  const totalEpisodes = series.reduce((total, item) => total + item.episodes, 0);

  return (
    <main className="categoriesPage categoriesPageV104">
      <header className="cinemaHeader innerCinemaHeader">
        <a className="cinemaBrand" href="/"><span className="cinemaBrandMark">▶</span><span><strong>Hayatımız Oyun</strong><small>{siteConfig.version} · Kategoriler</small></span></a>
        <nav className="cinemaNav"><a href="/">Ana Sayfa</a><a href="/series">Seriler</a><a className="active" href="/categories">Kategoriler</a><a href="/channels">Kanallar</a><a href="/updates">Güncellemeler</a></nav>
        <form className="cinemaSearch" action="/series"><span>⌕</span><input name="q" placeholder="Kategori veya seri ara..." /><button type="submit">Ara</button></form>
      </header>

      <header className="categoryShowcaseHero">
        <div className="categoryShowcaseText"><a href="/" className="backLink">← Ana sayfaya dön</a><p className="eyebrow">v1.1.0 · SUPABASE KATEGORİLER</p><h1>Oyun Arşivini <span>Gerçek Kategorilerle Keşfet.</span></h1><p>Demo kategori kartları kaldırıldı. Bu sayfa artık Supabase archive_categories tablosundaki aktif kategorileri gösterir.</p><div className="categoryHeroActions"><a href="/series">Tüm Serileri Gör</a><a href="/channels" className="ghost">Kanallara Git</a></div></div>
        <div className="categoryHeroStats"><div><strong>{categories.length}</strong><span>Kategori</span></div><div><strong>{series.length}</strong><span>Bağlı Seri</span></div><div><strong>{totalEpisodes}</strong><span>Toplam Bölüm</span></div></div>
      </header>

      <section className="categorySpotlight">
        <div className="categorySpotlightHead"><div><p className="eyebrow">KATEGORİ VİTRİNİ</p><h2>Supabase Kategori Akışı</h2></div><span>Demo veri yok</span></div>
        {categories.length === 0 ? <div className="emptyArchiveBox"><strong>Henüz kategori eklenmedi.</strong><p>Supabase archive_categories tablosuna aktif kategori eklediğinde burada görünecek.</p><a href="/status">Durumu Kontrol Et</a></div> : <div className="categoryShowcaseGrid">{categories.map((category) => {
          const linkedSeries = series.filter((item) => item.category === category.title || item.categorySlug === category.slug);
          const episodes = linkedSeries.reduce((total, item) => total + item.episodes, 0);
          return <article key={category.id} className={`categoryShowcaseCard ${category.tone}`}><div className="categoryShowcasePoster"><span>{category.icon}</span><small>{category.highlight}</small></div><div className="categoryShowcaseBody"><div className="categoryTop"><span>{linkedSeries.length} seri</span><span>{episodes} bölüm</span></div><h2>{category.title}</h2><p>{category.longDescription}</p><div className="categorySeriesPreview">{linkedSeries.length > 0 ? linkedSeries.slice(0, 3).map((item) => <a key={item.id} href={`/series/${item.slug}`}><strong>{item.title}</strong><span>{item.episodes} bölüm · %{item.progress}</span></a>) : <div className="emptyCategory">Bu kategori için henüz seri yok.</div>}</div><div className="categoryShowcaseActions"><a href={`/series?category=${encodeURIComponent(category.title)}`}>Bu Kategoriyi Aç</a><a className="soft" href="/series">Tüm Seriler</a></div></div></article>;
        })}</div>}
      </section>
    </main>
  );
}
