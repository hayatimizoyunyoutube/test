const version = process.env.NEXT_PUBLIC_SITE_VERSION || "v0.0.1";

export default function HomePage() {
  return (
    <main className="site-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brandIcon">▶</div>
          <div>
            <strong>Hayatımız Oyun</strong>
            <span>YouTube Arşiv Video Sitesi</span>
          </div>
        </div>

        <nav className="nav">
          <a className="active" href="/">Ana Sayfa</a>
          <a href="/series">Seriler</a>
          <a href="/categories">Kategoriler</a>
          <a href="/channels">Kanallar</a>
          <a href="/updates">Güncellemeler</a>
          <a href="#about">Arşiv Hakkında</a>
        </nav>

        <div className="versionBox">
          <strong>{version}</strong>
          <span>Temiz public başlangıç</span>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div className="search">Seri, oyun veya kanal ara...</div>
          <div className="status">Public Önizleme</div>
        </header>

        <section className="hero">
          <div className="heroText">
            <p className="eyebrow">YOUTUBE PLAYLIST ARŞİVİ</p>
            <h1>
              Oyun Anıları Burada <span>Arşivleniyor.</span>
            </h1>
            <p>
              Hayatımız Oyun YouTube serilerini düzenli, erişilebilir ve
              profesyonel bir arşivde topluyoruz. Tamamlanan, devam eden ve
              yakında gelecek seriler tek merkezde.
            </p>

            <div className="actions">
              <a href="/series">Serileri Keşfet</a>
              <a className="ghost" href="#about">Nasıl Çalışır?</a>
            </div>
          </div>

          <div className="heroPanel">
            <div>
              <strong>Düzenli Arşiv</strong>
              <span>Seriler kategorilere ayrılır.</span>
            </div>
            <div>
              <strong>Kesintisiz Erişim</strong>
              <span>YouTube playlist bağlantıları tek merkezde.</span>
            </div>
            <div>
              <strong>Topluluk Katkısı</strong>
              <span>Eksik seriler ileride önerilebilir.</span>
            </div>
          </div>
        </section>

        <section id="series" className="seriesGrid">
          <article className="sectionCard completed">
            <div className="sectionHead">
              <h2>Tamamlanan Seriler</h2>
              <span>Arşiv</span>
            </div>
            <p>Tüm bölümleri bitmiş ve kalıcı arşive alınmış seriler.</p>
            <div className="miniList">
              <div>The Witcher 3 <span>Hazırlanıyor</span></div>
              <div>God of War <span>Hazırlanıyor</span></div>
              <div>Red Dead Redemption 2 <span>Hazırlanıyor</span></div>
            </div>
          </article>

          <article className="sectionCard activeSeries">
            <div className="sectionHead">
              <h2>Devam Eden Seriler</h2>
              <span>Aktif</span>
            </div>
            <p>Yeni bölümleri geldikçe arşive eklenecek aktif seriler.</p>
            <div className="miniList">
              <div>Elden Ring <span>Hazırlanıyor</span></div>
              <div>Baldur's Gate 3 <span>Hazırlanıyor</span></div>
              <div>Cyberpunk 2077 <span>Hazırlanıyor</span></div>
            </div>
          </article>

          <article className="sectionCard planned">
            <div className="sectionHead">
              <h2>Yakında Gelecek Seriler</h2>
              <span>Plan</span>
            </div>
            <p>Başlaması planlanan ve arşiv takvimine alınacak seriler.</p>
            <div className="miniList">
              <div>Starfield <span>Yakında</span></div>
              <div>GTA VI <span>Planlandı</span></div>
              <div>S.T.A.L.K.E.R. 2 <span>Yakında</span></div>
            </div>
          </article>
        </section>

        <section id="about" className="aboutBox">
          <h2>v0.0.1 hedefi</h2>
          <p>
            Bu sürüm sadece sitenin temiz şekilde açıldığını kanıtlamak için
            hazırlandı. Supabase, giriş sistemi, admin panel ve API entegrasyonları
            sonraki sürümlerde yavaş yavaş eklenecek.
          </p>
        </section>
      </section>
    </main>
  );
}
