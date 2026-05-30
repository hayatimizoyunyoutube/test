import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    project: "Hayatımız Oyun",
    version: "v0.0.1",
    status: "public-start"
  });
}
