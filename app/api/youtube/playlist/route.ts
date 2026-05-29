import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

type YouTubePlaylistItem = {
  snippet?: {
    title?: string;
    description?: string;
    publishedAt?: string;
    resourceId?: { videoId?: string };
    thumbnails?: Record<string, { url: string; width?: number; height?: number }>;
  };
};

function getBestThumbnail(item: YouTubePlaylistItem) {
  const thumbnails = item.snippet?.thumbnails ?? {};
  return thumbnails.maxres?.url || thumbnails.standard?.url || thumbnails.high?.url || thumbnails.medium?.url || thumbnails.default?.url || '';
}

export async function GET(request: NextRequest) {
  const playlistId = request.nextUrl.searchParams.get('playlistId')?.trim();
  const maxResults = request.nextUrl.searchParams.get('maxResults') ?? '20';
  const key = process.env.YOUTUBE_API_KEY;

  if (!playlistId) {
    return NextResponse.json({ ok: false, message: 'playlistId parametresi gerekli.' }, { status: 400 });
  }

  if (!key) {
    return NextResponse.json({ ok: false, message: 'YOUTUBE_API_KEY env eksik.' }, { status: 200 });
  }

  const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
  url.searchParams.set('key', key);
  url.searchParams.set('part', 'snippet');
  url.searchParams.set('playlistId', playlistId);
  url.searchParams.set('maxResults', maxResults);

  const response = await fetch(url, { next: { revalidate: 60 * 15 } });
  if (!response.ok) {
    return NextResponse.json({ ok: false, message: 'YouTube isteği başarısız.', status: response.status }, { status: 502 });
  }

  const payload = await response.json();
  const videos = (payload.items ?? []).map((item: YouTubePlaylistItem, index: number) => {
    const videoId = item.snippet?.resourceId?.videoId ?? '';
    return {
      order: index + 1,
      videoId,
      title: item.snippet?.title ?? 'İsimsiz Video',
      description: item.snippet?.description ?? '',
      publishedAt: item.snippet?.publishedAt ?? null,
      thumbnailUrl: getBestThumbnail(item),
      url: videoId ? `https://www.youtube.com/watch?v=${videoId}` : ''
    };
  });

  return NextResponse.json({ ok: true, playlistId, count: videos.length, videos, nextPageToken: payload.nextPageToken ?? null });
}
