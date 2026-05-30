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
    <header className="cinemaHeader sharedPublicHeader">
      <a className="cinemaBrand" href="/">
        <span className="cinemaBrandMark">▶</span>
        <span>
          <strong>Hayatımız Oyun</strong>
          <small>YouTube Arşiv Video Sitesi</small>
        </span>
      </a>

      <nav className="cinemaNav">
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

      <form className="cinemaSearch" action="/series">
        <span>⌕</span>
        <input name="q" placeholder="Seri, video veya kanal ara..." />
        <button type="submit">Ara</button>
      </form>

      <a className="cinemaVersion" href="/updates">Yol Haritası</a>
    </header>
  );
}
