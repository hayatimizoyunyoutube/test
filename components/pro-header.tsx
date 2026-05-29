import Link from 'next/link';
import { siteConfig } from '@/lib/config/site';

export function ProHeader() {
  return (
    <header className="pro-header">
      <Link className="brand" href="/" aria-label="Ana sayfa">
        <span className="brand-mark">HO</span>
        <span>
          <strong>{siteConfig.name}</strong>
          <small>Yeni Sistem {siteConfig.version}</small>
        </span>
      </Link>
      <nav className="main-nav" aria-label="Ana menü">
        <Link href="/">Ana Sayfa</Link>
        <a href="#games">Oyunlar</a>
        <a href="#roadmap">Plan</a>
        <Link href="/admin">Admin</Link>
      </nav>
    </header>
  );
}
