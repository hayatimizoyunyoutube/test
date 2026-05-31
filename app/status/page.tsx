import { siteConfig } from "@/lib/config/site";
import { getCategories, getChannels, getRecentEpisodes, getSeriesList, isSupabaseConfigured } from "@/lib/data/archive";

export const dynamic = "force-dynamic";

function stateLabel(count: number) {
  return count > 0 ? "Dolu" : "Boş";
}

function stateClass(count: number) {
  return count > 0 ? "ready" : "empty";
}

export default async function StatusPage() {
  const [series, categories, channels, episodes] = await Promise.all([
    getSeriesList(),
    getCategories(),
    getChannels(),
    getRecentEpisodes(12)
  ]);

  const rows = [
    { title: "Kategoriler", count: categories.length, table: "archive_categories", note: "Önce kategori eklenmeli." },
    { title: "Kanallar", count: channels.length, table: "archive_channels", note: "Seriler kanala bağlanır." },
    { title: "Seriler", count: series.length, table: "playlist_series", note: "Public arşivin ana içeriği." },
    { title: "Bölümler", count: episodes.length, table: "playlist_episodes", note: "Son eklenen bölümler kontrol edilir." }
  ];

  const readyCount = rows.filter((row) => row.count > 0).length;
  const envReady = isSupabaseConfigured();

  return (
    <main className="statusPage statusPageV109 statusPageV112">
      <header className="cinemaHeader innerCinemaHeader">
        <a className="cinemaBrand" href="/"><span className="cinemaBrandMark">▶</span><span><strong>Hayatımız Oyun</strong><small>{siteConfig.version} · İçerik Ekleme</small></span></a>
        <nav className="cinemaNav"><a href="/">Ana Sayfa</a><a href="/series">Seriler</a><a href="/categories">Kategoriler</a><a href="/channels">Kanallar</a><a href="/updates">Güncellemeler</a></nav>
        <form className="cinemaSearch" action="/series"><span>⌕</span><input name="q" placeholder="Seri veya kategori ara..." /><button type="submit">Ara</button></form>
      </header>

      <section className="statusHeroV109">
        <div>
          <a href="/updates" className="backLink">← Güncellemelere dön</a>
          <p className="eyebrow">v1.1.2 · SUPABASE İÇERİK EKLEME</p>
          <h1>Gerçek İçerik Ekleme <span>Daha Kolay.</span></h1>
          <p>Bu sürümde demo veri geri gelmeden, Supabase’e gerçek kategori, kanal, seri ve bölüm eklemek için rehber ve SQL şablonları hazırlandı.</p>
          <div className="statusHeroActionsV109"><a href="/api/health">Health API</a><a className="ghost" href="/series">Seriler</a><a className="ghost" href="/updates">Sürüm Notları</a></div>
        </div>
        <div className="statusSummaryV109"><div><strong>{readyCount}/4</strong><span>Dolu Tablo</span></div><div><strong>{envReady ? "Hazır" : "Eksik"}</strong><span>Supabase Env</span></div><div><strong>Demo Yok</strong><span>Public Kural</span></div></div>
      </section>

      <section className="stabilityCheckShellV109 contentGuidePanelV112">
        <div className="statusSectionHeadV109"><div><p className="eyebrow">TABLO DOLULUK KONTROLÜ</p><h2>Supabase İçerik Durumu</h2></div><span>Gerçek veri</span></div>
        <div className="contentTableGridV112">
          {rows.map((row, index) => (
            <article key={row.table} className={`contentTableCardV112 ${stateClass(row.count)}`}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{row.title}</strong>
              <p>{row.count} kayıt · {stateLabel(row.count)}</p>
              <small>{row.table}</small>
              <em>{row.note}</em>
            </article>
          ))}
        </div>
      </section>

      <section className="contentGuidePanelV112">
        <div className="statusSectionHeadV109"><div><p className="eyebrow">İÇERİK EKLEME SIRASI</p><h2>Doğru Supabase Akışı</h2></div><span>Şablon SQL kullan</span></div>
        <div className="contentStepsV112">
          <article><strong>1</strong><h3>Kategori ekle</h3><p>Örn: RPG, Aksiyon, Korku. Dosya: <code>01-kategori-ekle.sql</code></p></article>
          <article><strong>2</strong><h3>Kanal ekle</h3><p>Örn: Hayatımız Oyun. Dosya: <code>02-kanal-ekle.sql</code></p></article>
          <article><strong>3</strong><h3>Seri ekle</h3><p>Seriyi kategori ve kanala bağla. Dosya: <code>03-seri-ekle.sql</code></p></article>
          <article><strong>4</strong><h3>Bölüm ekle</h3><p>Bölümleri seriye bağla. Dosya: <code>04-bolum-ekle.sql</code></p></article>
        </div>
      </section>
    </main>
  );
}
