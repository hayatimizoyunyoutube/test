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

type RawgErrorPayload = {
  error?: string;
  detail?: string;
  message?: string;
};

function rawgErrorMessage(status: number, payload?: RawgErrorPayload) {
  const providerMessage = payload?.error || payload?.detail || payload?.message;

  if (status === 401 || status === 403) {
    return providerMessage
      ? `RAWG API key reddedildi (${status}): ${providerMessage}`
      : `RAWG API key reddedildi (${status}). Vercel/Codespaces RAWG_API_KEY değerini kontrol et.`;
  }

  if (status === 429) {
    return 'RAWG limitine takıldı (429). Biraz sonra tekrar dene.';
  }

  return providerMessage
    ? `RAWG isteği başarısız (${status}): ${providerMessage}`
    : `RAWG isteği başarısız (${status}).`;
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('query')?.trim();
  const pageSize = request.nextUrl.searchParams.get('pageSize') ?? '12';
  const key = process.env.RAWG_API_KEY?.trim();

  if (!query) {
    return NextResponse.json({ ok: false, message: 'query parametresi gerekli.' }, { status: 400 });
  }

  if (!key || key === 'YOUR_RAWG_API_KEY') {
    return NextResponse.json({ ok: false, message: 'RAWG_API_KEY env eksik veya placeholder bırakılmış.' }, { status: 200 });
  }

  const url = new URL('https://api.rawg.io/api/games');
  url.searchParams.set('key', key);
  url.searchParams.set('search', query);
  url.searchParams.set('page_size', pageSize);
  url.searchParams.set('search_precise', 'true');

  try {
    const response = await fetch(url.toString(), {
      cache: 'no-store',
      headers: {
        Accept: 'application/json',
        'User-Agent': 'Hayatimiz-Oyun-Admin/0.0.3'
      }
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      return NextResponse.json(
        {
          ok: false,
          message: rawgErrorMessage(response.status, payload ?? undefined),
          status: response.status
        },
        { status: 200 }
      );
    }

    const results = (payload?.results ?? []).map((game: RawgGame) => ({
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
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? `RAWG bağlantı hatası: ${error.message}` : 'RAWG bağlantı hatası oluştu.'
      },
      { status: 200 }
    );
  }
}
