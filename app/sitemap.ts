import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";
import { getSeriesList } from "@/lib/data/archive";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes = ["", "/series", "/categories", "/channels", "/updates", "/status"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8
  }));

  const series = await getSeriesList();
  const seriesRoutes = series.map((item) => ({
    url: `${siteConfig.url}/series/${item.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7
  }));

  return [...staticRoutes, ...seriesRoutes];
}
