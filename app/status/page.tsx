import { siteConfig } from "@/lib/config/site";
import { publicRoutes, stabilityChecks } from "@/lib/data/site-routes";

function statusLabel(status: string) {
  if (status === "stable") return "Stabil";
  if (status === "ready") return "Hazır";
  return "Planlandı";
}

export default function StatusPage() {
  return (
    <main className="statusPage statusPageV109">
      <header className="cinemaHeader innerCinemaHeader">
        <a className="cinemaBrand" href="/">
          <span className="cinemaBrandMark">▶</span>
          <span>
            <strong>Hayatımız Oyun</strong>
            <small>{siteConfig.version} · Stabilite</small>
          </span>
        </a>

        <nav className="cinemaNav">
          <a href="/">Ana Sayfa</a>
          <a href="/series">Seriler</a>
          <a href="/categories">Kategoriler</a>
          <a href="/channels">Kanallar</a>
          <a href="/updates">Güncellemeler</a>
        </nav>

        <form className="cinemaSearch" action="/series">
          <span>⌕</span>
          <input name="q" placeholder="Seri veya kategori ara..." />
          <button type="submit">Ara</button>
        </form>
      </header>

      <section className="statusHeroV109">
        <div>
          <a href="/updates" className="backLink">← Güncellemelere dön</a>
          <p className="eyebrow">v1.0.9 · v1.1.0 ÖNCESİ STABİLİTE</p>
          <h1>
            Supabase Öncesi Public Site <span>Kontrol Edildi.</span>
          </h1>
          <p>
            Bu sürüm, v1.1.0 Supabase public veri başlangıcına geçmeden önce
            public route yapısını, mobil akışı, SEO dosyalarını ve demo veri
            görünümünü sağlamlaştırır.
          </p>

          <div className="statusHeroActionsV109">
            <a href="/api/health">Health API</a>
            <a className="ghost" href="/sitemap.xml">Sitemap</a>
            <a className="ghost" href="/robots.txt">Robots</a>
          </div>
        </div>

        <div className="statusSummaryV109">
          <div>
            <strong>{publicRoutes.length}</strong>
            <span>Kontrol Route</span>
          </div>
          <div>
            <strong>{siteConfig.version}</strong>
            <span>Mevcut Sürüm</span>
          </div>
          <div>
            <strong>v1.1.0</strong>
            <span>Sıradaki Büyük Geçiş</span>
          </div>
        </div>
      </section>

      <section className="stabilityCheckShellV109">
        <div className="statusSectionHeadV109">
          <div>
            <p className="eyebrow">KONTROL LİSTESİ</p>
            <h2>v1.0.9 Stabilite Notları</h2>
          </div>
        </div>

        <div className="stabilityCheckGridV109">
          {stabilityChecks.map((check, index) => (
            <article key={check}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{check}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className="routeCheckShellV109">
        <div className="statusSectionHeadV109">
          <div>
            <p className="eyebrow">ROUTE KONTROLÜ</p>
            <h2>Public Sayfa Durumları</h2>
          </div>
          <span>Supabase Run: Gerekli değil</span>
        </div>

        <div className="routeCheckListV109">
          {publicRoutes.map((route) => (
            <a key={route.path} href={route.path} className={`routeCheckCardV109 ${route.status}`}>
              <div>
                <strong>{route.title}</strong>
                <span>{route.area}</span>
              </div>
              <p>{route.description}</p>
              <small>{route.path} · {statusLabel(route.status)}</small>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
