import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";
import { archiveSeries } from "@/lib/data/series";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = ["", "/series", "/categories", "/channels", "/updates"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8
  }));

  const seriesRoutes = archiveSeries.map((series) => ({
    url: `${siteConfig.url}/series/${series.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7
  }));

  return [...staticRoutes, ...seriesRoutes];
}
