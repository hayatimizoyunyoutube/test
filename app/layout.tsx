import type { Metadata, Viewport } from 'next';
import './globals.css';
import { siteConfig } from '@/lib/config/site';

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.version}`,
  description: 'Hayatımız Oyun için sıfırdan hazırlanmış profesyonel oyun arşivi ve yayın takip sitesi.',
  openGraph: {
    title: siteConfig.name,
    description: 'Profesyonel oyun arşivi, yayın takvimi ve YouTube takip altyapısı.',
    images: ['/og.svg']
  }
};

export const viewport: Viewport = {
  themeColor: '#080a12',
  colorScheme: 'dark'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
