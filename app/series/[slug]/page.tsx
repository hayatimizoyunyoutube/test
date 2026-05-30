import { notFound } from "next/navigation";
import {
  archiveSeries,
  getDemoEpisodes,
  getRelatedSeries,
  getSeriesBySlug,
  statusLabels,
  type ArchiveSeriesStatus
} from "@/lib/data/series";

type SeriesDetailPageProps = {
  params: {
    slug: string;
  };
};

function statusText(status: ArchiveSeriesStatus) {
  if (status === "completed") return "Tamamlandı";
  if (status === "active") return "Devam Ediyor";
  return "Yakında";
}

function statusClass(status: ArchiveSeriesStatus) {
  if (status === "completed") return "detailStatus completed";
  if (status === "active") return "detailStatus active";
  return "detailStatus planned";
}

export function generateStaticParams() {
  return archiveSeries.map((series) => ({
    slug: series.slug
  }));
}

export default function SeriesDetailPage({ params }: SeriesDetailPageProps) {
  const series = getSeriesBySlug(params.slug);

  if (!series) {
    notFound();
  }

  const episodes = getDemoEpisodes(series);
  const relatedSeries = getRelatedSeries(series.slug, series.category);

  return (
    <main className="seriesDetailPage">
      <header className="seriesDetailHero">
        <div className="detailHeroText">
          <a href="/series" className="backLink">← Serilere dön</a>

          <div className="detailMetaLine">
            <span className={statusClass(series.status)}>{statusText(series.status)}</span>
            <span>{series.category}</span>
            <span>{series.channel}</span>
          </div>

          <h1>{series.title}</h1>
          <p>{series.description}</p>

          <div className="detailActions">
            <a href="#episodes">Bölümleri Gör</a>
            <a className="ghost" href="/series">Tüm Seriler</a>
          </div>
        </div>

        <div className="detailPoster">
          <div className="posterGlow" />
          <span>{series.title.slice(0, 2).toUpperCase()}</span>
        </div>
      </header>

      <section className="detailStatsGrid">
        <article>
          <span>Durum</span>
          <strong>{statusLabels[series.status]}</strong>
        </article>
        <article>
          <span>Bölüm</span>
          <strong>{series.episodes}</strong>
        </article>
        <article>
          <span>İlerleme</span>
          <strong>%{series.progress}</strong>
        </article>
        <article>
          <span>Kategori</span>
          <strong>{series.category}</strong>
        </article>
      </section>

      <section className="detailProgressBox">
        <div>
          <h2>Seri İlerlemesi</h2>
          <p>
            Bu sürümde ilerleme bilgileri demo veriden geliyor. Supabase ve YouTube
            playlist bağlantısı sonraki sürümlerde eklenecek.
          </p>
        </div>

        <div className="detailProgress">
          <div className="progressTop">
            <span>Arşiv ilerlemesi</span>
            <span>%{series.progress}</span>
          </div>
          <div className="progressTrack">
            <div style={{ width: `${series.progress}%` }} />
          </div>
        </div>
      </section>

      <section id="episodes" className="episodeSection">
        <div className="episodeSectionHead">
          <div>
            <p className="eyebrow">BÖLÜM LİSTESİ</p>
            <h2>Seri Bölümleri</h2>
          </div>
          <span>{episodes.length} demo bölüm</span>
        </div>

        {episodes.length > 0 ? (
          <div className="episodeList">
            {episodes.map((episode) => (
              <article key={episode.id} className="episodeCard">
                <div className="episodeNumber">{episode.episodeNumber}</div>
                <div>
                  <h3>{episode.title}</h3>
                  <p>
                    {episode.duration} · {episode.status}
                  </p>
                </div>
                <button type="button">YouTube yakında</button>
              </article>
            ))}
          </div>
        ) : (
          <div className="emptyEpisodes">
            <h3>Bu seri henüz başlamadı.</h3>
            <p>Yakında gelecek seriler için bölüm listesi yayınlandığında burada görünecek.</p>
          </div>
        )}
      </section>

      <section className="relatedSeriesSection">
        <div className="episodeSectionHead">
          <div>
            <p className="eyebrow">BENZER SERİLER</p>
            <h2>Aynı Kategoriden</h2>
          </div>
        </div>

        {relatedSeries.length > 0 ? (
          <div className="relatedSeriesGrid">
            {relatedSeries.map((item) => (
              <a key={item.id} href={`/series/${item.slug}`} className="relatedSeriesCard">
                <strong>{item.title}</strong>
                <span>{item.category} · {statusText(item.status)}</span>
              </a>
            ))}
          </div>
        ) : (
          <div className="emptyEpisodes">
            <p>Bu kategori için benzer seri yakında eklenecek.</p>
          </div>
        )}
      </section>
    </main>
  );
}
