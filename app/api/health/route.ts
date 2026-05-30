import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    name: "Hayatımız Oyun",
    version: "v0.0.1"
  });
}
