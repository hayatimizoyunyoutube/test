import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hayatımız Oyun",
  description: "YouTube oyun serileri arşiv video sitesi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
