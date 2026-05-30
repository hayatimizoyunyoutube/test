import { notFound } from "next/navigation";
import { getEpisodesBySeriesSlug, getSeriesBySlug, getSeriesList, statusBadge } from "@/lib/data/archive";
import { siteConfig } from "@/lib/config/site";

export const dynamic = "force-dynamic";

type SeriesDetailPageProps = { params: { slug: string } };

export default async function SeriesDetailPage({ params }: SeriesDetailPageProps) {
  const [series, episodes, allSeries] = await Promise.all([
    getSeriesBySlug(params.slug),
    getEpisodesBySeriesSlug(params.slug),
    getSeriesList()
  ]);

  if (!series) notFound();

  const relatedSeries = allSeries
    .filter((item) => item.slug !== series.slug && item.category === series.category)
    .slice(0, 3);

  return (
    <main className="innerPage">
      <header className="cinemaHeader innerCinemaHeader">
        <a className="cinemaBrand" href="/"><span className="cinemaBrandMark">▶</span><span><strong>Hayatımız Oyun</strong><small>{siteConfig.version} · Seri Detay</small></span></a>
        <nav className="cinemaNav"><a href="/">Ana Sayfa</a><a className="active" href="/series">Seriler</a><a href="/categories">Kategoriler</a><a href="/channels">Kanallar</a><a href="/updates">Güncellemeler</a></nav>
        <form className="cinemaSearch" action="/series"><span>⌕</span><input name="q" placeholder="Seri ara..." /><button type="submit">Ara</button></form>
      </header>

      <section className="pageHero detailHero">
        <div><a href="/series" className="backLink">← Serilere dön</a><p className="eyebrow">{statusBadge(series.status)} · {series.category}</p><h1>{series.title}</h1><p>{series.description}</p><div className="actions"><a href="#episodes">Bölümleri Gör</a><a className="ghost" href="/series">Tüm Seriler</a></div></div>
        <div className="bigPoster"><span>{series.title.slice(0, 2).toUpperCase()}</span></div>
      </section>

      <section className="statGrid"><article><span>Durum</span><strong>{statusBadge(series.status)}</strong></article><article><span>Bölüm</span><strong>{series.episodes}</strong></article><article><span>İlerleme</span><strong>%{series.progress}</strong></article><article><span>Kategori</span><strong>{series.category}</strong></article></section>

      <section id="episodes" className="panelBox"><div className="sectionHead"><p className="eyebrow">BÖLÜMLER</p><h2>Seri Bölümleri</h2></div>{episodes.length > 0 ? <div className="episodeList">{episodes.map((episode) => <article key={episode.id} className="episodeCard"><div>{episode.episodeNumber}</div><span><strong>{episode.title}</strong><small>{episode.duration} · {episode.status}</small></span>{episode.youtubeUrl ? <a href={episode.youtubeUrl}>YouTube</a> : <button>Link bekleniyor</button>}</article>)}</div> : <div className="emptyArchiveBox"><strong>Bu seri için henüz bölüm eklenmedi.</strong><p>Demo bölüm listesi kaldırıldı. Supabase playlist_episodes tablosuna bölüm eklendiğinde burada görünecek.</p></div>}</section>

      <section className="panelBox"><div className="sectionHead"><p className="eyebrow">BENZER SERİLER</p><h2>Aynı Kategoriden</h2></div>{relatedSeries.length > 0 ? <div className="tileGrid">{relatedSeries.map((item) => <a key={item.id} href={`/series/${item.slug}`} className="smallTile"><strong>{item.title}</strong><span>{item.category} · {statusBadge(item.status)}</span></a>)}</div> : <div className="emptyArchiveBox"><strong>Benzer seri bulunamadı.</strong><p>Bu kategoriye daha fazla seri eklenince burada öneriler görünecek.</p></div>}</section>
    </main>
  );
}
