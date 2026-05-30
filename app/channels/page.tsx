import { getChannels, getSeriesList } from "@/lib/data/archive";
import { siteConfig } from "@/lib/config/site";

export const dynamic = "force-dynamic";

export default async function ChannelsPage() {
  const [channels, series] = await Promise.all([getChannels(), getSeriesList()]);
  const totalEpisodes = series.reduce((total, item) => total + item.episodes, 0);

  return (
    <main className="channelsPage channelsPageV105">
      <header className="cinemaHeader innerCinemaHeader"><a className="cinemaBrand" href="/"><span className="cinemaBrandMark">▶</span><span><strong>Hayatımız Oyun</strong><small>{siteConfig.version} · Kanallar</small></span></a><nav className="cinemaNav"><a href="/">Ana Sayfa</a><a href="/series">Seriler</a><a href="/categories">Kategoriler</a><a className="active" href="/channels">Kanallar</a><a href="/updates">Güncellemeler</a></nav><form className="cinemaSearch" action="/series"><span>⌕</span><input name="q" placeholder="Kanal, seri veya oyun ara..." /><button type="submit">Ara</button></form></header>

      <header className="channelShowcaseHero"><div className="channelShowcaseText"><a href="/" className="backLink">← Ana sayfaya dön</a><p className="eyebrow">v1.1.0 · SUPABASE KANALLAR</p><h1>Arşiv Kanalları <span>Supabase’den Geliyor.</span></h1><p>Demo kanal kartları kaldırıldı. Bu sayfa artık Supabase archive_channels tablosundaki aktif kanalları gösterir.</p><div className="channelHeroActions"><a href="/series">Tüm Serileri Gör</a><a href="/categories" className="ghost">Kategorileri Aç</a></div></div><div className="channelHeroStats"><div><strong>{channels.length}</strong><span>Kanal</span></div><div><strong>{series.length}</strong><span>Bağlı Seri</span></div><div><strong>{totalEpisodes}</strong><span>Toplam Bölüm</span></div></div></header>

      <section className="channelSpotlight"><div className="channelSpotlightHead"><div><p className="eyebrow">KANAL VİTRİNİ</p><h2>Supabase Kanal Akışı</h2></div><span>Demo veri yok</span></div>{channels.length === 0 ? <div className="emptyArchiveBox"><strong>Henüz kanal eklenmedi.</strong><p>Supabase archive_channels tablosuna aktif kanal eklediğinde burada görünecek.</p><a href="/status">Durumu Kontrol Et</a></div> : <div className="channelShowcaseGrid">{channels.map((channel) => { const linkedSeries = series.filter((item) => item.channel === channel.title || item.channelSlug === channel.slug); const episodes = linkedSeries.reduce((total, item) => total + item.episodes, 0); return <article key={channel.id} className={`channelShowcaseCard ${channel.tone}`}><div className="channelShowcasePoster"><span>{channel.icon}</span><small>{channel.highlight}</small></div><div className="channelShowcaseBody"><div className="channelTop"><span>{channel.handle}</span><span>{linkedSeries.length} seri</span><span>{episodes} bölüm</span></div><h2>{channel.title}</h2><p>{channel.longDescription}</p><div className="channelSeriesPreview">{linkedSeries.length > 0 ? linkedSeries.slice(0, 4).map((item) => <a key={item.id} href={`/series/${item.slug}`}><strong>{item.title}</strong><span>{item.episodes} bölüm · %{item.progress}</span></a>) : <div className="emptyChannel">Bu kanala bağlı seri henüz yok.</div>}</div><div className="channelShowcaseActions"><a href={`/series?channel=${encodeURIComponent(channel.title)}`}>Bu Kanalın Serilerini Gör</a><a className="soft" href="/updates">Yol Haritası</a></div></div></article>; })}</div>}</section>
    </main>
  );
}
