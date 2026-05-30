import { archiveSeries, statusLabels, type ArchiveSeriesStatus } from "@/lib/data/series";

const statusOrder: ArchiveSeriesStatus[] = ["completed", "active", "planned"];

function statusBadge(status: ArchiveSeriesStatus) {
  if (status === "completed") return "Tamamlandı";
  if (status === "active") return "Devam Ediyor";
  return "Yakında";
}

export default function SeriesPage() {
  return (
    <main className="seriesPage">
      <header className="seriesHero">
        <div>
          <a href="/" className="backLink">← Ana sayfaya dön</a>
          <p className="eyebrow">v0.0.2 · SERİLER SAYFASI</p>
          <h1>
            YouTube Oyun Serileri <span>Tek Arşivde.</span>
          </h1>
          <p>
            Tamamlanan, devam eden ve yakında gelecek serileri tek sayfada
            düzenli şekilde takip et. Bu sürümde veriler demo olarak duruyor;
            Supabase bağlantısı ileriki sürümlerde eklenecek.
          </p>
        </div>

        <div className="seriesStats">
          <div>
            <strong>{archiveSeries.length}</strong>
            <span>Toplam Seri</span>
          </div>
          <div>
            <strong>{archiveSeries.filter((item) => item.status === "completed").length}</strong>
            <span>Tamamlanan</span>
          </div>
          <div>
            <strong>{archiveSeries.filter((item) => item.status === "active").length}</strong>
            <span>Devam Eden</span>
          </div>
        </div>
      </header>

      <section className="seriesToolbar">
        <div className="fakeSearch">Seri ara... örn: Witcher, Elden Ring, GTA</div>
        <div className="toolbarNote">Arama sistemi v1.0.3 planında aktif olacak.</div>
      </section>

      <section className="seriesSections">
        {statusOrder.map((status) => {
          const items = archiveSeries.filter((series) => series.status === status);

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
                        <a href={`/series/${series.slug}`}>Detay yakında</a>
                      </div>
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
