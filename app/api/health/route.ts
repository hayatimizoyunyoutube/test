import { NextResponse } from 'next/server';
import { siteConfig } from '@/lib/config/site';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    ok: true,
    project: siteConfig.name,
    version: siteConfig.version,
    architecture: 'nextjs-app-router',
    api: {
      rawg: Boolean(process.env.RAWG_API_KEY),
      youtube: Boolean(process.env.YOUTUBE_API_KEY),
      supabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL),
      supabaseService: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)
    },
    time: new Date().toISOString()
  });
}
