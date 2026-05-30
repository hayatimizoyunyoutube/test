import { archiveChannels, getChannelSeries } from "@/lib/data/channels";
import { PublicSiteHeader } from "@/components/public-site-header";

export default function ChannelsPage() {
  const totalLinkedSeries = archiveChannels.reduce(
    (total, channel) => total + getChannelSeries(channel).length,
    0
  );

  return (
    <main className="channelsPage">
      <PublicSiteHeader active="channels" />
      <header className="channelsHero">
        <div>
          <a href="/" className="backLink">← Ana sayfaya dön</a>
          <p className="eyebrow">v0.0.4 · KANALLAR</p>
          <h1>
            Arşiv Kanallarını <span>Tek Merkezde Topla.</span>
          </h1>
          <p>
            YouTube oynatma listeleri ileride kanallara göre gruplanacak. Bu
            sürümde kanal görünümü demo verilerle hazırlanıyor.
          </p>
        </div>

        <div className="channelStats">
          <div>
            <strong>{archiveChannels.length}</strong>
            <span>Kanal</span>
          </div>
          <div>
            <strong>{totalLinkedSeries}</strong>
            <span>Bağlı Seri</span>
          </div>
          <div>
            <strong>Public</strong>
            <span>Kullanıcı görünümü</span>
          </div>
        </div>
      </header>

      <section className="channelToolbar">
        <div className="fakeSearch">Kanal ara... örn: Hayatımız Oyun, Korku Geceleri</div>
        <div className="toolbarNote">Gerçek YouTube bağlantısı sonraki sürümlerde gelecek.</div>
      </section>

      <section className="channelGrid">
        {archiveChannels.map((channel) => {
          const linkedSeries = getChannelSeries(channel);

          return (
            <article key={channel.id} className={`channelCard ${channel.tone}`}>
              <div className="channelAvatar">
                <span>{channel.title.slice(0, 2).toUpperCase()}</span>
              </div>

              <div className="channelBody">
                <div className="channelTop">
                  <span>{channel.handle}</span>
                  <span>{linkedSeries.length} seri</span>
                </div>

                <h2>{channel.title}</h2>
                <p>{channel.description}</p>

                <div className="channelFocus">
                  {channel.focus.map((focus) => (
                    <span key={focus}>{focus}</span>
                  ))}
                </div>

                <div className="channelSeriesList">
                  {linkedSeries.length > 0 ? (
                    linkedSeries.slice(0, 4).map((series) => (
                      <a key={series.id} href={`/series/${series.slug}`}>
                        {series.title}
                        <span>{series.episodes} bölüm</span>
                      </a>
                    ))
                  ) : (
                    <div className="emptyChannel">Bu kanala bağlı seri yakında eklenecek.</div>
                  )}
                </div>

                <a className="channelAction" href="/series">
                  Serilerde gör
                </a>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
