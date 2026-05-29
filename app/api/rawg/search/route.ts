import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

type RawgGame = {
  id: number;
  name: string;
  slug: string;
  background_image?: string;
  released?: string;
  rating?: number;
  metacritic?: number;
  genres?: Array<{ name: string }>;
  platforms?: Array<{ platform?: { name: string } }>;
};

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('query')?.trim();
  const pageSize = request.nextUrl.searchParams.get('pageSize') ?? '12';
  const key = process.env.RAWG_API_KEY;

  if (!query) {
    return NextResponse.json({ ok: false, message: 'query parametresi gerekli.' }, { status: 400 });
  }

  if (!key) {
    return NextResponse.json({ ok: false, message: 'RAWG_API_KEY env eksik.' }, { status: 200 });
  }

  const url = new URL('https://api.rawg.io/api/games');
  url.searchParams.set('key', key);
  url.searchParams.set('search', query);
  url.searchParams.set('page_size', pageSize);

  const response = await fetch(url, { next: { revalidate: 60 * 60 } });
  if (!response.ok) {
    return NextResponse.json({ ok: false, message: 'RAWG isteği başarısız.', status: response.status }, { status: 502 });
  }

  const payload = await response.json();
  const results = (payload.results ?? []).map((game: RawgGame) => ({
    rawgId: game.id,
    title: game.name,
    slug: game.slug,
    coverUrl: game.background_image ?? '',
    releaseDate: game.released ?? null,
    rating: game.rating ?? null,
    metacritic: game.metacritic ?? null,
    genres: game.genres?.map((genre) => genre.name) ?? [],
    platforms: game.platforms?.map((item) => item.platform?.name).filter(Boolean) ?? []
  }));

  return NextResponse.json({ ok: true, query, count: results.length, results });
}
