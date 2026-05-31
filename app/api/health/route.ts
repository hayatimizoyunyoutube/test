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

function safeMask(value: string | undefined | null) {
  if (!value) {
    return null;
  }

  if (value.length <= 12) {
    return "configured";
  }

  return `${value.slice(0, 8)}...${value.slice(-4)}`;
}

async function checkTable(table: string) {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return {
      table,
      ok: false,
      status: "missing-env",
      message: "Supabase environment variables are missing"
    };
  }

  try {
    const baseUrl = SUPABASE_URL.replace(/\/$/, "");
    const response = await fetch(`${baseUrl}/rest/v1/${table}?select=id&limit=1`, {
      method: "GET",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      },
      cache: "no-store"
    });

    return {
      table,
      ok: response.ok,
      status: response.status
    };
  } catch (error) {
    return {
      table,
      ok: false,
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error"
    };
  }
}

export async function GET() {
  const checks = await Promise.all(tables.map((table) => checkTable(table)));

  const envReady = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
  const databaseReady = checks.every((item) => item.ok);

  return NextResponse.json({
    ok: true,
    project: siteConfig.name,
    version: siteConfig.version,
    targetVersion: siteConfig.targetVersion,
    phase: siteConfig.phase,
    env: {
      supabaseUrl: safeMask(SUPABASE_URL),
      supabaseAnonKey: safeMask(SUPABASE_ANON_KEY),
      ready: envReady
    },
    database: {
      ready: databaseReady,
      tables: checks
    },
    status: envReady && databaseReady ? "ready" : "needs-check"
  });
}
