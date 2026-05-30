import { notFound } from "next/navigation";
import { archiveSeries, getDemoEpisodes, getRelatedSeries, getSeriesBySlug, statusBadge } from "@/lib/data/series";
import { siteConfig } from "@/lib/config/site";

type SeriesDetailPageProps = { params: { slug: string } };

export function generateStaticParams() {
  return archiveSeries.map((series) => ({ slug: series.slug }));
}

export default function SeriesDetailPage({ params }: SeriesDetailPageProps) {
  const series = getSeriesBySlug(params.slug);
  if (!series) notFound();
  const episodes = getDemoEpisodes(series);
  const relatedSeries = getRelatedSeries(series.slug, series.category);

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
      <section id="episodes" className="panelBox"><div className="sectionHead"><p className="eyebrow">BÖLÜMLER</p><h2>Seri Bölümleri</h2></div>{episodes.length > 0 ? <div className="episodeList">{episodes.map((ep) => <article key={ep.id} className="episodeCard"><div>{ep.episodeNumber}</div><span><strong>{ep.title}</strong><small>{ep.duration} · {ep.status}</small></span><button>YouTube yakında</button></article>)}</div> : <p className="muted">Bu seri henüz başlamadı.</p>}</section>
      <section className="panelBox"><div className="sectionHead"><p className="eyebrow">BENZER SERİLER</p><h2>Aynı Kategoriden</h2></div><div className="tileGrid">{relatedSeries.map((item) => <a key={item.id} href={`/series/${item.slug}`} className="smallTile"><strong>{item.title}</strong><span>{item.category} · {statusBadge(item.status)}</span></a>)}</div></section>
    </main>
  );
}
