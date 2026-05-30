import { siteConfig } from "@/lib/config/site";
import { getCategories, getChannels, getSeriesList, isSupabaseConfigured } from "@/lib/data/archive";

export const dynamic = "force-dynamic";

export default async function StatusPage() {
  const [series, categories, channels] = await Promise.all([
    getSeriesList(),
    getCategories(),
    getChannels()
  ]);

  const checks = [
    { title: "Supabase Environment", value: isSupabaseConfigured() ? "Hazır" : "Eksik" },
    { title: "Seriler", value: `${series.length} kayıt` },
    { title: "Kategoriler", value: `${categories.length} kayıt` },
    { title: "Kanallar", value: `${channels.length} kayıt` },
    { title: "Demo Veri", value: "Kapalı" },
    { title: "Supabase Run", value: "Gerekli" }
  ];

  return (
    <main className="statusPage statusPageV109">
      <header className="cinemaHeader innerCinemaHeader">
        <a className="cinemaBrand" href="/"><span className="cinemaBrandMark">▶</span><span><strong>Hayatımız Oyun</strong><small>{siteConfig.version} · Supabase Durumu</small></span></a>
        <nav className="cinemaNav"><a href="/">Ana Sayfa</a><a href="/series">Seriler</a><a href="/categories">Kategoriler</a><a href="/channels">Kanallar</a><a href="/updates">Güncellemeler</a></nav>
        <form className="cinemaSearch" action="/series"><span>⌕</span><input name="q" placeholder="Seri veya kategori ara..." /><button type="submit">Ara</button></form>
      </header>

      <section className="statusHeroV109">
        <div>
          <a href="/updates" className="backLink">← Güncellemelere dön</a>
          <p className="eyebrow">v1.1.0 · SUPABASE PUBLIC VERİ</p>
          <h1>Demo İçerikler Kaldırıldı, <span>Gerçek Veri Başladı.</span></h1>
          <p>Bu sürümde public sayfalar Supabase tablolarından veri okur. Supabase’de veri yoksa sahte kart göstermek yerine profesyonel boş durum ekranı görünür.</p>
          <div className="statusHeroActionsV109"><a href="/api/health">Health API</a><a className="ghost" href="/series">Seriler</a><a className="ghost" href="/categories">Kategoriler</a></div>
        </div>
        <div className="statusSummaryV109"><div><strong>{series.length}</strong><span>Seri</span></div><div><strong>{categories.length}</strong><span>Kategori</span></div><div><strong>{channels.length}</strong><span>Kanal</span></div></div>
      </section>

      <section className="stabilityCheckShellV109">
        <div className="statusSectionHeadV109"><div><p className="eyebrow">SUPABASE KONTROLÜ</p><h2>Public Veri Durumu</h2></div><span>Supabase Run: Gerekli</span></div>
        <div className="stabilityCheckGridV109">
          {checks.map((check, index) => (
            <article key={check.title}><span>{String(index + 1).padStart(2, "0")}</span><strong>{check.title}</strong><p>{check.value}</p></article>
          ))}
        </div>
      </section>
    </main>
  );
}
