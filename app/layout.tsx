import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description
};

const mobileLinks = [
  { href: "/", label: "Ana" },
  { href: "/series", label: "Seriler" },
  { href: "/categories", label: "Kategori" },
  { href: "/channels", label: "Kanal" },
  { href: "/updates", label: "Notlar" }
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        {children}
        <nav className="mobileBottomDock" aria-label="Mobil alt menü">
          {mobileLinks.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
      </body>
    </html>
  );
}
