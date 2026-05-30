import { archiveCategories, getCategorySeries } from "@/lib/data/categories";

export default function CategoriesPage() {
  const totalLinkedSeries = archiveCategories.reduce(
    (total, category) => total + getCategorySeries(category).length,
    0
  );

  return (
    <main className="categoriesPage">
      <header className="categoriesHero">
        <div>
          <a href="/" className="backLink">← Ana sayfaya dön</a>
          <p className="eyebrow">v0.0.3 · KATEGORİLER</p>
          <h1>
            Arşivi Kategorilere Göre <span>Keşfet.</span>
          </h1>
          <p>
            Oyun serilerini türlerine göre ayırıyoruz. Bu sürümde kategoriler
            demo verilerle çalışıyor. Supabase bağlantısı ileriki sürümlerde
            eklenecek.
          </p>
        </div>

        <div className="categoryStats">
          <div>
            <strong>{archiveCategories.length}</strong>
            <span>Kategori</span>
          </div>
          <div>
            <strong>{totalLinkedSeries}</strong>
            <span>Bağlı Seri</span>
          </div>
          <div>
            <strong>Public</strong>
            <span>Kullanıcı görünümü</span>
          </div>
        </div>
      </header>

      <section className="categoryToolbar">
        <div className="fakeSearch">Kategori ara... örn: RPG, Aksiyon, Korku</div>
        <div className="toolbarNote">Filtreleme sistemi sonraki sürümlerde aktif olacak.</div>
      </section>

      <section className="categoryGrid">
        {archiveCategories.map((category) => {
          const linkedSeries = getCategorySeries(category);

          return (
            <article key={category.id} className={`categoryCard ${category.tone}`}>
              <div className="categoryIcon">{category.title.slice(0, 2).toUpperCase()}</div>

              <div className="categoryBody">
                <div className="categoryTop">
                  <span>{linkedSeries.length} seri</span>
                  <span>{category.keywords.join(", ")}</span>
                </div>

                <h2>{category.title}</h2>
                <p>{category.description}</p>

                <div className="linkedSeries">
                  {linkedSeries.length > 0 ? (
                    linkedSeries.map((series) => (
                      <a key={series.id} href={`/series/${series.slug}`}>
                        {series.title}
                        <span>{series.episodes} bölüm</span>
                      </a>
                    ))
                  ) : (
                    <div className="emptyCategory">Bu kategori için seri yakında eklenecek.</div>
                  )}
                </div>

                <a className="categoryAction" href={`/series`}>
                  Serilerde gör
                </a>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
