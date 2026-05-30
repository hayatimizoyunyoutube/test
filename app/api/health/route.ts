import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config/site";
import { getCategories, getChannels, getSeriesList, isSupabaseConfigured } from "@/lib/data/archive";

export async function GET() {
  const [series, categories, channels] = await Promise.all([
    getSeriesList(),
    getCategories(),
    getChannels()
  ]);

  return NextResponse.json({
    ok: true,
    project: siteConfig.name,
    version: siteConfig.version,
    targetVersion: siteConfig.targetVersion,
    phase: siteConfig.phase,
    status: "supabase-public-data-started",
    supabaseRun: "Gerekli",
    supabaseConfigured: isSupabaseConfigured(),
    counts: {
      series: series.length,
      categories: categories.length,
      channels: channels.length
    },
    nextVersion: "v1.1.1"
  });
}
