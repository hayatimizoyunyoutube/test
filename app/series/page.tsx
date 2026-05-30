import { archiveSeries, statusLabels, type ArchiveSeriesStatus } from "@/lib/data/series";
import { PublicSiteHeader } from "@/components/public-site-header";

type SeriesPageProps = {
  searchParams?: {
    q?: string;
    status?: string;
    category?: string;
    channel?: string;
  };
};

const statusOrder: ArchiveSeriesStatus[] = ["completed", "active", "planned"];

function statusBadge(status: ArchiveSeriesStatus) {
  if (status === "completed") return "Tamamlandı";
  if (status === "active") return "Devam Ediyor";
  return "Yakında";
}

function statusDescription(status: ArchiveSeriesStatus) {
  if (status === "completed") return "Arşive alınmış tamamlanan seri";
  if (status === "active") return "Yeni bölümlerle büyüyen aktif seri";
  return "Planlanan ve yakında başlayacak seri";
}

function normalize(value?: string) {
  return String(value || "").trim().toLocaleLowerCase("tr-TR");
}

function unique(values: string[]) {
  return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b, "tr"));
}

function buildHref(params: Record<string, string | undefined>) {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value && value !== "all") {
      search.set(key, value);
    }
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
    const matchesQuery =
      !query ||
      normalize(series.title).includes(query) ||
      normalize(series.category).includes(query) ||
      normalize(series.channel).includes(query) ||
      normalize(series.description).includes(query);

    const matchesStatus = selectedStatus === "all" || series.status === selectedStatus;
    const matchesCategory = selectedCategory === "all" || series.category === selectedCategory;
    const matchesChannel = selectedChannel === "all" || series.channel === selectedChannel;

    return matchesQuery && matchesStatus && matchesCategory && matchesChannel;
  });

  return (
    <main className="seriesPage seriesPageV102">
      <PublicSiteHeader active="series" />
      <header className="seriesHero seriesHeroV102">
        <div>
          <a href="/" className="backLink">← Ana sayfaya dön</a>
          <p className="eyebrow">v1.0.2 · SERİ KARTLARI GELİŞTİRME</p>
          <h1>
            Seriler Artık Daha <span>Profesyonel Kartlarla.</span>
          </h1>
          <p>
            Seri kartları daha okunabilir, daha premium ve mobilde daha rahat
            gezilebilir hale getirildi. Detay aksiyonları ve ilerleme alanları
            güçlendirildi.
          </p>
        </div>

        <div className="seriesStats">
          <div>
            <strong>{archiveSeries.length}</strong>
            <span>Toplam Seri</span>
          </div>
          <div>
            <strong>{filteredSeries.length}</strong>
            <span>Filtre Sonucu</span>
          </div>
          <div>
            <strong>{categories.length}</strong>
            <span>Kategori</span>
          </div>
        </div>
      </header>

      <section className="seriesFilterPanel seriesFilterPanelV102">
        <form className="seriesSearchForm" action="/series">
          <input
            name="q"
            defaultValue={q}
            placeholder="Seri, kategori veya kanal ara..."
          />

          {selectedStatus !== "all" ? <input type="hidden" name="status" value={selectedStatus} /> : null}
          {selectedCategory !== "all" ? <input type="hidden" name="category" value={selectedCategory} /> : null}
          {selectedChannel !== "all" ? <input type="hidden" name="channel" value={selectedChannel} /> : null}

          <button type="submit">Arşivde Ara</button>
          <a href="/series">Temizle</a>
        </form>

        <div className="filterGroups">
          <div className="filterGroup">
            <strong>Durum</strong>
            <div>
              <a className={selectedStatus === "all" ? "active" : ""} href={buildHref({ q, category: selectedCategory, channel: selectedChannel })}>Tümü</a>
              {statusOrder.map((status) => (
                <a
                  key={status}
                  className={selectedStatus === status ? "active" : ""}
                  href={buildHref({ q, status, category: selectedCategory, channel: selectedChannel })}
                >
                  {statusBadge(status)}
                </a>
              ))}
            </div>
          </div>

          <div className="filterGroup">
            <strong>Kategori</strong>
            <div>
              <a className={selectedCategory === "all" ? "active" : ""} href={buildHref({ q, status: selectedStatus, channel: selectedChannel })}>Tümü</a>
              {categories.map((category) => (
                <a
                  key={category}
                  className={selectedCategory === category ? "active" : ""}
                  href={buildHref({ q, status: selectedStatus, category, channel: selectedChannel })}
                >
                  {category}
                </a>
              ))}
            </div>
          </div>

          <div className="filterGroup">
            <strong>Kanal</strong>
            <div>
              <a className={selectedChannel === "all" ? "active" : ""} href={buildHref({ q, status: selectedStatus, category: selectedCategory })}>Tümü</a>
              {channels.map((channel) => (
                <a
                  key={channel}
                  className={selectedChannel === channel ? "active" : ""}
                  href={buildHref({ q, status: selectedStatus, category: selectedCategory, channel })}
                >
                  {channel}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="filterSummary filterSummaryV102">
        <strong>{filteredSeries.length} seri bulundu</strong>
        <span>
          {q ? `"${q}" araması` : "Tüm arşiv"} · {selectedStatus === "all" ? "Tüm durumlar" : statusBadge(selectedStatus as ArchiveSeriesStatus)}
        </span>
      </section>

      {filteredSeries.length > 0 ? (
        <section className="seriesSections seriesSectionsV102">
          {statusOrder.map((status) => {
            const items = filteredSeries.filter((series) => series.status === status);

            if (items.length === 0) {
              return null;
            }

            return (
              <section key={status} className="seriesGroup seriesGroupV102">
                <div className="seriesGroupHead">
                  <div>
                    <p>{statusBadge(status)}</p>
                    <h2>{statusLabels[status]}</h2>
                  </div>
                  <span>{items.length} seri</span>
                </div>

                <div className="seriesCards seriesCardsV102">
                  {items.map((series) => (
                    <article key={series.id} className={`seriesCard premiumSeriesCard ${series.status}`}>
                      <div className="premiumPoster">
                        <div className="premiumPosterGlow" />
                        <span>{series.title.slice(0, 2).toUpperCase()}</span>
                        <small>{statusBadge(series.status)}</small>
                      </div>

                      <div className="seriesBody premiumSeriesBody">
                        <div className="premiumCardTop">
                          <div className="seriesMeta">
                            <span>{series.category}</span>
                            <span>{series.channel}</span>
                          </div>
                          <span className={`statusDot ${series.status}`} />
                        </div>

                        <h3>{series.title}</h3>
                        <p>{series.description}</p>

                        <div className="premiumInfoRow">
                          <div>
                            <span>Bölüm</span>
                            <strong>{series.episodes}</strong>
                          </div>
                          <div>
                            <span>İlerleme</span>
                            <strong>%{series.progress}</strong>
                          </div>
                          <div>
                            <span>Durum</span>
                            <strong>{statusBadge(series.status)}</strong>
                          </div>
                        </div>

                        <div className="progressWrap premiumProgress">
                          <div className="progressTop">
                            <span>{statusDescription(series.status)}</span>
                            <span>%{series.progress}</span>
                          </div>
                          <div className="progressTrack">
                            <div style={{ width: `${series.progress}%` }} />
                          </div>
                        </div>

                        <div className="premiumSeriesActions">
                          <a href={`/series/${series.slug}`}>Detaya Git</a>
                          <a className="soft" href={`/series?category=${encodeURIComponent(series.category)}`}>Benzerleri Gör</a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </section>
      ) : (
        <section className="emptyFilterState">
          <h2>Sonuç bulunamadı.</h2>
          <p>
            Aradığın seri henüz demo arşivde yok. Filtreleri temizleyip tekrar
            deneyebilirsin.
          </p>
          <a href="/series">Filtreleri temizle</a>
        </section>
      )}
    </main>
  );
}
