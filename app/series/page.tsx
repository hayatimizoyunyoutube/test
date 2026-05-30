import { archiveSeries, statusLabels, type ArchiveSeriesStatus } from "@/lib/data/series";

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
    <main className="seriesPage">
      <header className="seriesHero">
        <div>
          <a href="/" className="backLink">← Ana sayfaya dön</a>
          <p className="eyebrow">v0.0.6 · ARAMA VE FİLTRELEME</p>
          <h1>
            Arşivdeki Serileri <span>Hızlıca Bul.</span>
          </h1>
          <p>
            Serileri ada, kategoriye, kanala veya duruma göre filtrele. Bu
            sürümde veriler demo olarak duruyor; Supabase bağlantısı ileriki
            sürümlerde eklenecek.
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

      <section className="seriesFilterPanel">
        <form className="seriesSearchForm" action="/series">
          <input
            name="q"
            defaultValue={q}
            placeholder="Seri, kategori veya kanal ara..."
          />

          {selectedStatus !== "all" ? <input type="hidden" name="status" value={selectedStatus} /> : null}
          {selectedCategory !== "all" ? <input type="hidden" name="category" value={selectedCategory} /> : null}
          {selectedChannel !== "all" ? <input type="hidden" name="channel" value={selectedChannel} /> : null}

          <button type="submit">Ara</button>
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

      <section className="filterSummary">
        <strong>{filteredSeries.length} seri bulundu</strong>
        <span>
          {q ? `"${q}" araması` : "Tüm arşiv"} · {selectedStatus === "all" ? "Tüm durumlar" : statusBadge(selectedStatus as ArchiveSeriesStatus)}
        </span>
      </section>

      {filteredSeries.length > 0 ? (
        <section className="seriesSections">
          {statusOrder.map((status) => {
            const items = filteredSeries.filter((series) => series.status === status);

            if (items.length === 0) {
              return null;
            }

            return (
              <section key={status} className="seriesGroup">
                <div className="seriesGroupHead">
                  <div>
                    <p>{statusBadge(status)}</p>
                    <h2>{statusLabels[status]}</h2>
                  </div>
                  <span>{items.length} seri</span>
                </div>

                <div className="seriesCards">
                  {items.map((series) => (
                    <article key={series.id} className={`seriesCard ${series.status}`}>
                      <div className="seriesPoster">
                        <span>{series.title.slice(0, 2).toUpperCase()}</span>
                      </div>

                      <div className="seriesBody">
                        <div className="seriesMeta">
                          <span>{series.category}</span>
                          <span>{statusBadge(series.status)}</span>
                        </div>

                        <h3>{series.title}</h3>
                        <p>{series.description}</p>

                        <div className="progressWrap">
                          <div className="progressTop">
                            <span>{series.episodes} bölüm</span>
                            <span>%{series.progress}</span>
                          </div>
                          <div className="progressTrack">
                            <div style={{ width: `${series.progress}%` }} />
                          </div>
                        </div>

                        <div className="seriesFooter">
                          <span>{series.channel}</span>
                          <a href={`/series/${series.slug}`}>Detaya git</a>
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
