import { archiveChannels, getChannelStats } from "@/lib/data/channels";
import { archiveSeries } from "@/lib/data/series";
import { siteConfig } from "@/lib/config/site";

export default function ChannelsPage() {
  const totalEpisodes = archiveSeries.reduce((total, series) => total + series.episodes, 0);
  const totalLinkedSeries = archiveChannels.reduce(
    (total, channel) => total + getChannelStats(channel).series.length,
    0
  );

  return (
    <main className="channelsPage channelsPageV105">
      <header className="cinemaHeader innerCinemaHeader">
        <a className="cinemaBrand" href="/">
          <span className="cinemaBrandMark">▶</span>
          <span>
            <strong>Hayatımız Oyun</strong>
            <small>{siteConfig.version} · Kanallar</small>
          </span>
        </a>

        <nav className="cinemaNav">
          <a href="/">Ana Sayfa</a>
          <a href="/series">Seriler</a>
          <a href="/categories">Kategoriler</a>
          <a className="active" href="/channels">Kanallar</a>
          <a href="/updates">Güncellemeler</a>
        </nav>

        <form className="cinemaSearch" action="/series">
          <span>⌕</span>
          <input name="q" placeholder="Kanal, seri veya oyun ara..." />
          <button type="submit">Ara</button>
        </form>
      </header>

      <header className="channelShowcaseHero">
        <div className="channelShowcaseText">
          <a href="/" className="backLink">← Ana sayfaya dön</a>
          <p className="eyebrow">v1.0.5 · KANAL DENEYİMİ</p>
          <h1>
            Arşiv Kanalları Artık <span>Daha Profesyonel.</span>
          </h1>
          <p>
            Oyun serilerini kanal mantığıyla grupluyoruz. Her kanal kendi odak
            türleri, bağlı serileri, bölüm sayısı ve arşiv durumu ile daha
            anlaşılır hale getirildi.
          </p>

          <div className="channelHeroActions">
            <a href="/series">Tüm Serileri Gör</a>
            <a href="/categories" className="ghost">Kategorileri Aç</a>
          </div>
        </div>

        <div className="channelHeroStats">
          <div>
            <strong>{archiveChannels.length}</strong>
            <span>Kanal</span>
          </div>
          <div>
            <strong>{totalLinkedSeries}</strong>
            <span>Bağlı Seri</span>
          </div>
          <div>
            <strong>{totalEpisodes}</strong>
            <span>Toplam Bölüm</span>
          </div>
        </div>
      </header>

      <section className="channelSpotlight">
        <div className="channelSpotlightHead">
          <div>
            <p className="eyebrow">KANAL VİTRİNİ</p>
            <h2>Arşiv Kanalları</h2>
          </div>
          <span>Demo verilerle public görünüm</span>
        </div>

        <div className="channelShowcaseGrid">
          {archiveChannels.map((channel) => {
            const stats = getChannelStats(channel);

            return (
              <article key={channel.id} className={`channelShowcaseCard ${channel.tone}`}>
                <div className="channelShowcasePoster">
                  <span>{channel.icon}</span>
                  <small>{channel.highlight}</small>
                </div>

                <div className="channelShowcaseBody">
                  <div className="channelTop">
                    <span>{channel.handle}</span>
                    <span>{stats.series.length} seri</span>
                    <span>{stats.episodes} bölüm</span>
                  </div>

                  <h2>{channel.title}</h2>
                  <p>{channel.longDescription}</p>

                  <div className="channelFocusChips">
                    {channel.focus.map((focus) => (
                      <span key={focus}>{focus}</span>
                    ))}
                  </div>

                  <div className="channelMiniStats">
                    <div>
                      <span>Tamamlandı</span>
                      <strong>{stats.completed}</strong>
                    </div>
                    <div>
                      <span>Devam</span>
                      <strong>{stats.active}</strong>
                    </div>
                    <div>
                      <span>Yakında</span>
                      <strong>{stats.planned}</strong>
                    </div>
                  </div>

                  <div className="channelSeriesPreview">
                    {stats.series.length > 0 ? (
                      stats.series.slice(0, 4).map((series) => (
                        <a key={series.id} href={`/series/${series.slug}`}>
                          <strong>{series.title}</strong>
                          <span>{series.episodes} bölüm · %{series.progress}</span>
                        </a>
                      ))
                    ) : (
                      <div className="emptyChannel">Bu kanala bağlı seri yakında eklenecek.</div>
                    )}
                  </div>

                  <div className="channelShowcaseActions">
                    <a href="/series">Bu Kanalın Serilerini Gör</a>
                    <a className="soft" href="/updates">Yol Haritası</a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
