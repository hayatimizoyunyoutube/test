import { allUpdates, completedUpdates, plannedUpdates, type UpdateNote } from "@/lib/data/updates";
import { siteConfig } from "@/lib/config/site";

function statusLabel(status: UpdateNote["status"]) {
  if (status === "completed") return "Tamamlandı";
  if (status === "planned") return "Planlandı";
  return "Ana Hedef";
}

function statusClass(status: UpdateNote["status"]) {
  if (status === "completed") return "completedUpdate";
  if (status === "planned") return "plannedUpdate";
  return "targetUpdate";
}

export default function UpdatesPage() {
  const latestCompleted = completedUpdates[completedUpdates.length - 1];
  const nextPlanned = plannedUpdates.find((item) => item.status === "planned");
  const targetUpdate = plannedUpdates.find((item) => item.status === "target");

  return (
    <main className="innerPage updatesTheme">
      <header className="cinemaHeader innerCinemaHeader">
        <a className="cinemaBrand" href="/"><span className="cinemaBrandMark">▶</span><span><strong>Hayatımız Oyun</strong><small>{siteConfig.version} · Güncellemeler</small></span></a>
        <nav className="cinemaNav"><a href="/">Ana Sayfa</a><a href="/series">Seriler</a><a href="/categories">Kategoriler</a><a href="/channels">Kanallar</a><a className="active" href="/updates">Güncellemeler</a></nav>
        <form className="cinemaSearch" action="/series"><span>⌕</span><input name="q" placeholder="Seri veya kategori ara..." /><button type="submit">Ara</button></form>
      </header>

      <section className="pageHero updatesHero">
        <div>
          <a href="/" className="backLink">← Ana sayfaya dön</a>
          <p className="eyebrow">v1.0.6 · GÜNCELLEME MERKEZİ</p>
          <h1>Sürüm Akışı Artık <span>Daha Profesyonel.</span></h1>
          <p>Tamamlanan sürümler, sıradaki planlar ve v4.0.0 ana yayın hedefi daha güçlü ve okunabilir bir güncelleme merkezi içinde gösteriliyor.</p>
          <div className="actions"><a href="#timeline">Sürüm Akışını Gör</a><a href="#planned" className="ghost">Planlananlar</a></div>
        </div>
        <div className="heroStats"><div><strong>{completedUpdates.length}</strong><span>Tamamlanan</span></div><div><strong>{plannedUpdates.filter((item) => item.status === "planned").length}</strong><span>Planlanan</span></div><div><strong>{siteConfig.targetVersion}</strong><span>Ana Hedef</span></div></div>
      </section>

      <section className="dashboardGrid">
        <article className="dashboardCard latest"><span>Son Tamamlanan</span><strong>{latestCompleted.version}</strong><h2>{latestCompleted.title}</h2><p>{latestCompleted.summary}</p></article>
        {nextPlanned ? <article className="dashboardCard next"><span>Sıradaki Plan</span><strong>{nextPlanned.version}</strong><h2>{nextPlanned.title}</h2><p>{nextPlanned.summary}</p></article> : null}
        {targetUpdate ? <article className="dashboardCard target"><span>Ana Yayın Hedefi</span><strong>{targetUpdate.version}</strong><h2>{targetUpdate.title}</h2><p>{targetUpdate.summary}</p></article> : null}
      </section>

      <section id="timeline" className="panelBox">
        <div className="sectionHead">
          <div><p className="eyebrow">TAM SÜRÜM AKIŞI</p><h2>Tamamlanan ve Planlanan Sürümler</h2></div>
          <div className="legend"><span className="done">Tamamlandı</span><span className="plan">Planlandı</span><span className="target">Ana Hedef</span></div>
        </div>
        <div className="timelineList">
          {allUpdates.map((update, index) => (
            <article key={update.version} className={`timelineRow ${statusClass(update.status)}`}>
              <div className="timelineIndex">{String(index + 1).padStart(2, "0")}</div>
              <div className="timelineVersion"><strong>{update.version}</strong><small>{statusLabel(update.status)}</small></div>
              <div className="timelineContent">
                <div className="timelineTitle"><h3>{update.title}</h3><span>{update.supabaseRun}</span></div>
                <p>{update.summary}</p>
                <div className="tagList">{update.items.map((item) => <span key={item}>{item}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="planned" className="panelBox">
        <div className="sectionHead"><div><p className="eyebrow">YAKIN PLAN</p><h2>Sıradaki Geliştirme Adımları</h2></div></div>
        <div className="roadmapGrid">
          {plannedUpdates.map((update) => (
            <article key={update.version} className={`roadmapCard ${statusClass(update.status)}`}>
              <div><span>{statusLabel(update.status)}</span><strong>{update.version}</strong></div>
              <h3>{update.title}</h3><p>{update.summary}</p>
              <ul>{update.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
