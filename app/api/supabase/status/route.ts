import { NextResponse } from 'next/server';
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!hasSupabaseServerEnv()) {
    return NextResponse.json({
      ok: false,
      message: 'Supabase env eksik. NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY girilmeli.'
    }, { status: 200 });
  }

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from('site_schema_versions')
    .select('version,note,created_at')
    .order('created_at', { ascending: false })
    .limit(1);

  return NextResponse.json({
    ok: !error,
    connected: !error,
    versionRow: data?.[0] ?? null,
    error: error?.message ?? null
  });
}
