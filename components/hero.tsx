import { siteConfig } from '@/lib/config/site';

export function Hero() {
  return (
    <section className="hero-grid">
      <div className="hero-copy">
        <span className="eyebrow">Sıfırdan kurulan profesyonel arşiv</span>
        <h1>Oyun serilerini, yayınları ve güncellemeleri tek merkezde topla.</h1>
        <p>{siteConfig.slogan}</p>
        <div className="hero-actions">
          <a className="primary-button" href="#games">Vitrine bak</a>
          <a className="ghost-button" href="/admin">Admin panel önizleme</a>
        </div>
      </div>
      <div className="hero-card panel">
        <div className="terminal-dots"><span /><span /><span /></div>
        <p className="terminal-label">v0.0.2 / clean architecture</p>
        <div className="stack-lines">
          <span>Next.js App Router</span>
          <span>Supabase database</span>
          <span>RAWG metadata API</span>
          <span>YouTube playlist sync</span>
          <span>Vercel deployment</span>
        </div>
      </div>
    </section>
  );
}
