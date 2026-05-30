import { archiveSeries, statusLabels, statusBadge, type ArchiveSeriesStatus } from "@/lib/data/series";
import { siteConfig } from "@/lib/config/site";

type SeriesPageProps = {
  searchParams?: { q?: string; status?: string; category?: string; channel?: string };
};

const statusOrder: ArchiveSeriesStatus[] = ["completed", "active", "planned"];

function normalize(value?: string) {
  return String(value || "").trim().toLocaleLowerCase("tr-TR");
}

function unique(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, "tr"));
}

function buildHref(params: Record<string, string | undefined>) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value && value !== "all") search.set(key, value);
  });
  const query = search.toString();
  return query ? `/series?${query}` : "/series";
}

export default function SeriesPage({ searchParams }: SeriesPageProps) {
  const q = searchParams?.q || "";
  const selectedStatus = searchParams?.status || "all";
  const selectedCategory = searchParams?.category || "all";
  const selectedChannel = searchParams?.channel || "all";

  const categories = unique(archiveSeries.map((series) => series.category));
  const channels = unique(archiveSeries.map((series) => series.channel));

  const filteredSeries = archiveSeries.filter((series) => {
    const query = normalize(q);
    const matchesQuery = !query || normalize(series.title).includes(query) || normalize(series.category).includes(query) || normalize(series.channel).includes(query) || normalize(series.description).includes(query);
    const matchesStatus = selectedStatus === "all" || series.status === selectedStatus;
    const matchesCategory = selectedCategory === "all" || series.category === selectedCategory;
    const matchesChannel = selectedChannel === "all" || series.channel === selectedChannel;
    return matchesQuery && matchesStatus && matchesCategory && matchesChannel;
  });

  return (
    <main className="innerPage">
      <header className="cinemaHeader innerCinemaHeader">
        <a className="cinemaBrand" href="/"><span className="cinemaBrandMark">▶</span><span><strong>Hayatımız Oyun</strong><small>{siteConfig.version} · Seriler</small></span></a>
        <nav className="cinemaNav"><a href="/">Ana Sayfa</a><a className="active" href="/series">Seriler</a><a href="/categories">Kategoriler</a><a href="/channels">Kanallar</a><a href="/updates">Güncellemeler</a></nav>
        <form className="cinemaSearch" action="/series"><span>⌕</span><input name="q" placeholder="Seri ara..." /><button type="submit">Ara</button></form>
      </header>

      <section className="pageHero">
        <div><a href="/" className="backLink">← Ana sayfaya dön</a><p className="eyebrow">SERİLER</p><h1>Seriler <span>Premium Kartlarla.</span></h1><p>Serileri ada, kategoriye, kanala veya duruma göre filtrele. Bu sürümde veriler demo olarak duruyor.</p></div>
        <div className="heroStats"><div><strong>{archiveSeries.length}</strong><span>Toplam Seri</span></div><div><strong>{filteredSeries.length}</strong><span>Filtre Sonucu</span></div><div><strong>{categories.length}</strong><span>Kategori</span></div></div>
      </section>

      <section className="filterPanel">
        <form className="filterSearch" action="/series">
          <input name="q" defaultValue={q} placeholder="Seri, kategori veya kanal ara..." />
          {selectedStatus !== "all" ? <input type="hidden" name="status" value={selectedStatus} /> : null}
          {selectedCategory !== "all" ? <input type="hidden" name="category" value={selectedCategory} /> : null}
          {selectedChannel !== "all" ? <input type="hidden" name="channel" value={selectedChannel} /> : null}
          <button type="submit">Arşivde Ara</button><a href="/series">Temizle</a>
        </form>
        <div className="chipsBlock">
          <strong>Durum</strong><div><a className={selectedStatus === "all" ? "active" : ""} href={buildHref({ q, category: selectedCategory, channel: selectedChannel })}>Tümü</a>{statusOrder.map((status) => <a key={status} className={selectedStatus === status ? "active" : ""} href={buildHref({ q, status, category: selectedCategory, channel: selectedChannel })}>{statusBadge(status)}</a>)}</div>
        </div>
        <div className="chipsBlock">
          <strong>Kategori</strong><div><a className={selectedCategory === "all" ? "active" : ""} href={buildHref({ q, status: selectedStatus, channel: selectedChannel })}>Tümü</a>{categories.map((category) => <a key={category} className={selectedCategory === category ? "active" : ""} href={buildHref({ q, status: selectedStatus, category, channel: selectedChannel })}>{category}</a>)}</div>
        </div>
      </section>

      <section className="resultSummary"><strong>{filteredSeries.length} seri bulundu</strong><span>{q ? `"${q}" araması` : "Tüm arşiv"}</span></section>

      <section className="seriesFlow">
        {statusOrder.map((status) => {
          const items = filteredSeries.filter((series) => series.status === status);
          if (items.length === 0) return null;
          return (
            <section key={status} className="groupBox">
              <div className="groupHead"><div><p>{statusBadge(status)}</p><h2>{statusLabels[status]}</h2></div><span>{items.length} seri</span></div>
              <div className="premiumCards">
                {items.map((series) => (
                  <article key={series.id} className="premiumSeriesCard">
                    <div className="poster"><span>{series.title.slice(0, 2).toUpperCase()}</span><small>{statusBadge(series.status)}</small></div>
                    <div className="cardBody">
                      <div className="meta"><span>{series.category}</span><span>{series.channel}</span></div>
                      <h3>{series.title}</h3><p>{series.description}</p>
                      <div className="infoRow"><div><span>Bölüm</span><strong>{series.episodes}</strong></div><div><span>İlerleme</span><strong>%{series.progress}</strong></div><div><span>Durum</span><strong>{statusBadge(series.status)}</strong></div></div>
                      <div className="miniProgress"><span style={{ width: `${series.progress}%` }} /></div>
                      <div className="cardActions"><a href={`/series/${series.slug}`}>Detaya Git</a><a className="soft" href={`/series?category=${encodeURIComponent(series.category)}`}>Benzerleri Gör</a></div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </section>
    </main>
  );
}
