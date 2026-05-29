export function RoadmapStrip() {
  const items = [
    ['v0.0.1', 'Temiz başlangıç ve vitrin'],
    ['v0.0.2', 'Oyun yönetimi aktif'],
    ['v0.0.3', 'RAWG kapak/meta çekme'],
    ['v0.0.4', 'YouTube playlist senkronizasyonu']
  ];

  return (
    <section id="roadmap" className="section-block roadmap-block">
      <div className="section-heading">
        <span className="eyebrow">Plan</span>
        <h2>Bozulmadan adım adım büyüyecek.</h2>
      </div>
      <div className="roadmap-grid">
        {items.map(([version, title]) => (
          <article className="roadmap-card panel" key={version}>
            <span>{version}</span>
            <strong>{title}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
