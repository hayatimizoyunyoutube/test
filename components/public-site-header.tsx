import { siteConfig } from "@/lib/config/site";

type PublicSiteHeaderProps = {
  active?: "home" | "series" | "categories" | "channels" | "updates";
};

const links = [
  { href: "/", label: "Ana Sayfa", key: "home" },
  { href: "/series", label: "Seriler", key: "series" },
  { href: "/categories", label: "Kategoriler", key: "categories" },
  { href: "/channels", label: "Kanallar", key: "channels" },
  { href: "/updates", label: "Güncellemeler", key: "updates" }
] as const;

export function PublicSiteHeader({ active }: PublicSiteHeaderProps) {
  return (
    <header className="proSharedHeader">
      <a className="proSharedBrand" href="/">
        <span className="proSharedLogo">▶</span>
        <span>
          <strong>HAYATIMIZ <b>OYUN</b></strong>
          <small>YouTube Arşiv Video Sitesi</small>
        </span>
      </a>

      <nav className="proSharedNav">
        {links.map((link) => (
          <a
            key={link.href}
            className={active === link.key ? "active" : ""}
            href={link.href}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <form className="proSharedSearch" action="/series">
        <span>⌕</span>
        <input name="q" placeholder="Seri, oyun, kanal ara..." />
      </form>

      <div className="proSharedActions">
        <a href="/updates">{siteConfig.version}</a>
        <span>●</span>
      </div>
    </header>
  );
}
