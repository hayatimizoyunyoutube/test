import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config/site";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const tables = [
  "archive_categories",
  "archive_channels",
  "playlist_series",
  "playlist_episodes"
];

function maskValue(value: string) {
  if (!value) return null;
  if (value.length <= 12) return "configured";
  return `${value.slice(0, 8)}...${value.slice(-4)}`;
}

async function checkTable(table: string) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return {
      table,
      ok: false,
      count: 0,
      status: "missing-env",
      message: "NEXT_PUBLIC_SUPABASE_URL veya NEXT_PUBLIC_SUPABASE_ANON_KEY eksik"
    };
  }

  try {
    const baseUrl = SUPABASE_URL.replace(/\/$/, "");
    const response = await fetch(`${baseUrl}/rest/v1/${table}?select=id&limit=1`, {
      method: "GET",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "count=exact"
      },
      cache: "no-store"
    });

    const contentRange = response.headers.get("content-range") || "";
    const countText = contentRange.includes("/") ? contentRange.split("/").pop() || "0" : "0";
    const count = Number.isFinite(Number(countText)) ? Number(countText) : 0;

    return {
      table,
      ok: response.ok,
      count,
      status: response.status,
      message: response.ok ? "OK" : await response.text()
    };
  } catch (error) {
    return {
      table,
      ok: false,
      count: 0,
      status: "error",
      message: error instanceof Error ? error.message : "Bilinmeyen hata"
    };
  }
}

export async function GET() {
  const checks = await Promise.all(tables.map((table) => checkTable(table)));
  const envReady = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
  const databaseReachable = checks.every((item) => item.ok);

  return NextResponse.json({
    ok: true,
    project: siteConfig.name,
    version: siteConfig.version,
    targetVersion: siteConfig.targetVersion,
    phase: siteConfig.phase,
    demoData: false,
    supabaseRun: "v1.1.0 schema çalıştıysa tekrar zorunlu değil; eski/null kayıt varsa v1.1.1 data fix SQL çalıştırılabilir.",
    environment: {
      ready: envReady,
      supabaseUrl: maskValue(SUPABASE_URL),
      supabaseAnonKey: maskValue(SUPABASE_ANON_KEY)
    },
    database: {
      reachable: databaseReachable,
      tables: checks
    },
    status: envReady && databaseReachable ? "ready" : "needs-check",
    nextVersion: "v1.1.2"
  });
}
