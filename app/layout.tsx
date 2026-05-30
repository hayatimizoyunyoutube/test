import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: `${siteConfig.name} | YouTube Oyun Serileri Arşivi`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "Hayatımız Oyun" }],
  creator: "Hayatımız Oyun",
  publisher: "Hayatımız Oyun",
  category: "gaming",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | YouTube Oyun Serileri Arşivi`,
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Hayatımız Oyun YouTube Arşiv Video Sitesi"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | YouTube Oyun Serileri Arşivi`,
    description: siteConfig.description,
    images: ["/og-image.svg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg"
  },
  manifest: "/site.webmanifest"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#05070d",
  colorScheme: "dark"
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
