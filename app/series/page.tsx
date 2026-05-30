import {
  filterSeries,
  getCategories,
  getChannels,
  getSeriesList,
  statusBadge,
  statusLabels,
  type ArchiveSeriesStatus
} from "@/lib/data/archive";
import { siteConfig } from "@/lib/config/site";

export const dynamic = "force-dynamic";

type SeriesPageProps = {
  searchParams?: { q?: string; status?: string; category?: string; channel?: string };
};

const statusOrder: ArchiveSeriesStatus[] = ["completed", "active", "planned"];

function buildHref(params: Record<string, string | undefined>) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value && value !== "all") search.set(key, value);
  });
  const query = search.toString();
  return query ? `/series?${query}` : "/series";
}

function EmptySeries() {
  return (
    <section className="emptyArchiveBox wideEmptyBox">
      <strong>Henüz seri eklenmedi.</strong>
      <p>Demo seriler kaldırıldı. Supabase içindeki playlist_series tablosuna public seri eklediğinde burada görünecek.</p>
      <a href="/status">Supabase Durumunu Gör</a>
    </section>
  );
}

export default async function SeriesPage({ searchParams }: SeriesPageProps) {
  const [series, categories, channels] = await Promise.all([getSeriesList(), getCategories(), getChannels()]);
  const q = searchParams?.q || "";
  const selectedStatus = searchParams?.status || "all";
  const selectedCategory = searchParams?.category || "all";
  const selectedChannel = searchParams?.channel || "all";
  const filteredSeries = filterSeries(series, { q, status: selectedStatus, category: selectedCategory, channel: selectedChannel });

  return (
    <main className="innerPage">
      <header className="cinemaHeader innerCinemaHeader">
        <a className="cinemaBrand" href="/"><span className="cinemaBrandMark">▶</span><span><strong>Hayatımız Oyun</strong><small>{siteConfig.version} · Seriler</small></span></a>
        <nav className="cinemaNav"><a href="/">Ana Sayfa</a><a className="active" href="/series">Seriler</a><a href="/categories">Kategoriler</a><a href="/channels">Kanallar</a><a href="/updates">Güncellemeler</a></nav>
        <form className="cinemaSearch" action="/series"><span>⌕</span><input name="q" placeholder="Seri ara..." /><button type="submit">Ara</button></form>
      </header>

      <section className="pageHero">
        <div><a href="/" className="backLink">← Ana sayfaya dön</a><p className="eyebrow">SUPABASE SERİLER</p><h1>Gerçek Arşiv <span>Supabase’den Okunuyor.</span></h1><p>Demo seriler kaldırıldı. Bu sayfa artık sadece Supabase içinde public olarak kayıtlı serileri gösterir.</p></div>
        <div className="heroStats"><div><strong>{series.length}</strong><span>Toplam Seri</span></div><div><strong>{filteredSeries.length}</strong><span>Filtre Sonucu</span></div><div><strong>{categories.length}</strong><span>Kategori</span></div></div>
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
          <strong>Kategori</strong><div><a className={selectedCategory === "all" ? "active" : ""} href={buildHref({ q, status: selectedStatus, channel: selectedChannel })}>Tümü</a>{categories.map((category) => <a key={category.id} className={selectedCategory === category.title || selectedCategory === category.slug ? "active" : ""} href={buildHref({ q, status: selectedStatus, category: category.title, channel: selectedChannel })}>{category.title}</a>)}</div>
        </div>
        <div className="chipsBlock">
          <strong>Kanal</strong><div><a className={selectedChannel === "all" ? "active" : ""} href={buildHref({ q, status: selectedStatus, category: selectedCategory })}>Tümü</a>{channels.map((channel) => <a key={channel.id} className={selectedChannel === channel.title || selectedChannel === channel.slug ? "active" : ""} href={buildHref({ q, status: selectedStatus, category: selectedCategory, channel: channel.title })}>{channel.title}</a>)}</div>
        </div>
      </section>

      <section className="resultSummary"><strong>{filteredSeries.length} seri bulundu</strong><span>{q ? `"${q}" araması` : "Supabase public arşivi"}</span></section>

      {filteredSeries.length === 0 ? <EmptySeries /> : (
        <section className="seriesFlow">
          {statusOrder.map((status) => {
            const items = filteredSeries.filter((item) => item.status === status);
            if (items.length === 0) return null;
            return (
              <section key={status} className="groupBox">
                <div className="groupHead"><div><p>{statusBadge(status)}</p><h2>{statusLabels[status]}</h2></div><span>{items.length} seri</span></div>
                <div className="premiumCards">
                  {items.map((item) => (
                    <article key={item.id} className="premiumSeriesCard">
                      <div className="poster"><span>{item.title.slice(0, 2).toUpperCase()}</span><small>{statusBadge(item.status)}</small></div>
                      <div className="cardBody">
                        <div className="meta"><span>{item.category}</span><span>{item.channel}</span></div>
                        <h3>{item.title}</h3><p>{item.description}</p>
                        <div className="infoRow"><div><span>Bölüm</span><strong>{item.episodes}</strong></div><div><span>İlerleme</span><strong>%{item.progress}</strong></div><div><span>Durum</span><strong>{statusBadge(item.status)}</strong></div></div>
                        <div className="miniProgress"><span style={{ width: `${item.progress}%` }} /></div>
                        <div className="cardActions"><a href={`/series/${item.slug}`}>Detaya Git</a><a className="soft" href={`/series?category=${encodeURIComponent(item.category)}`}>Benzerleri Gör</a></div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </section>
      )}
    </main>
  );
}
