import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/config/site";

export async function GET() {
  return NextResponse.json({
    ok: true,
    project: siteConfig.name,
    version: siteConfig.version,
    targetVersion: siteConfig.targetVersion,
    phase: siteConfig.phase,
    status: "public-beta-fix"
  });
}
