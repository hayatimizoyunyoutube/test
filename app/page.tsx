const version = process.env.NEXT_PUBLIC_SITE_VERSION || "v0.0.8";

const quickLinks = [
  { href: "/series", label: "Seriler" },
  { href: "/categories", label: "Kategoriler" },
  { href: "/channels", label: "Kanallar" },
  { href: "/updates", label: "Güncellemeler" }
];

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
          {quickLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>

        <div className="versionBox">
          <strong>{version}</strong>
          <span>Mobil arayüz ve profesyonel butonlar</span>
        </div>
      </aside>

      <section className="content">
        <header className="mobileHeader">
          <div className="brand compact">
            <div className="brandIcon">▶</div>
            <div>
              <strong>Hayatımız Oyun</strong>
              <span>{version}</span>
            </div>
          </div>
        </header>

        <header className="topbar proTopbar">
          <form className="homeSearch" action="/series">
            <span>⌕</span>
            <input name="q" placeholder="Seri, oyun veya kanal ara..." />
            <button type="submit">Ara</button>
          </form>

          <div className="topbarActions">
            <a href="/series">Serileri Aç</a>
            <a href="/updates" className="soft">Gelişim Notları</a>
          </div>
        </header>

        <section className="hero proHero">
          <div className="heroText">
            <p className="eyebrow">YOUTUBE PLAYLIST ARŞİVİ</p>
            <h1>
              Oyun Serilerini <span>Profesyonel Arşivde</span> Topluyoruz.
            </h1>
            <p>
              Hayatımız Oyun YouTube serilerini düzenli, mobil uyumlu ve
              profesyonel bir arşiv deneyimiyle sunuyoruz. Tamamlanan, devam
              eden ve yakında gelecek seriler tek merkezde.
            </p>

            <div className="actions proActions">
              <a href="/series">Serileri Keşfet</a>
              <a className="ghost" href="/categories">Kategorilere Bak</a>
              <a className="ghost cyan" href="/channels">Kanalları Gör</a>
            </div>
          </div>

          <div className="heroPanel proHeroPanel">
            <div>
              <strong>01</strong>
              <span>Seriler düzenli gruplara ayrılır.</span>
            </div>
            <div>
              <strong>02</strong>
              <span>Mobilde daha rahat gezilir.</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Arama doğrudan serilere yönlendirir.</span>
            </div>
          </div>
        </section>

        <section className="mobileQuickNav">
          {quickLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </section>

        <section id="series" className="seriesGrid proSeriesGrid">
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
            <a className="cardAction" href="/series?status=completed">Tamamlananları Gör</a>
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
            <a className="cardAction" href="/series?status=active">Devam Edenleri Gör</a>
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
            <a className="cardAction" href="/series?status=planned">Planlananları Gör</a>
          </article>
        </section>

        <section id="about" className="aboutBox proAbout">
          <div>
            <h2>v0.0.8 hedefi</h2>
            <p>
              Bu sürümde sitenin mobil görünümü, arama alanı ve buton düzenleri
              profesyonel hale getirildi. Supabase, auth ve admin özellikleri
              sonraki sürümlerde eklenecek.
            </p>
          </div>
          <a href="/updates">Yol Haritasını Aç</a>
        </section>
      </section>
    </main>
  );
}
