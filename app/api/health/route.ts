import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config/site";
import { publicRoutes, stabilityChecks } from "@/lib/data/site-routes";

export async function GET() {
  return NextResponse.json({
    ok: true,
    project: siteConfig.name,
    version: siteConfig.version,
    targetVersion: siteConfig.targetVersion,
    phase: siteConfig.phase,
    status: "stable-before-supabase",
    supabaseRun: "Gerekli değil",
    nextVersion: "v1.1.0",
    checks: stabilityChecks,
    routes: publicRoutes.map((route) => route.path)
  });
}
