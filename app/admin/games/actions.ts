'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient, hasSupabaseServerEnv } from '@/lib/supabase/server';
import { ensureSlug } from '@/lib/utils/slug';
import type { GameStatus } from '@/types/game';

function stringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

function optionalString(formData: FormData, key: string) {
  const value = stringValue(formData, key);
  return value.length ? value : null;
}

function numberValue(formData: FormData, key: string) {
  const value = stringValue(formData, key);
  if (!value) return null;
  const parsed = Number(value.replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : null;
}

function integerValue(formData: FormData, key: string, fallback = 0) {
  const value = stringValue(formData, key);
  if (!value) return fallback;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function listValue(formData: FormData, key: string) {
  return stringValue(formData, key)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function checkboxValue(formData: FormData, key: string) {
  return formData.get(key) === 'on';
}

function statusValue(formData: FormData): GameStatus {
  const status = stringValue(formData, 'status');
  if (status === 'playing' || status === 'completed' || status === 'planned' || status === 'paused') return status;
  return 'planned';
}

function envGuard() {
  if (!hasSupabaseServerEnv()) {
    redirect('/admin/games?error=supabase-env-eksik');
  }
}

function gamePayload(formData: FormData) {
  const title = stringValue(formData, 'title');
  const slug = ensureSlug(title, optionalString(formData, 'slug'));

  return {
    title,
    slug,
    description: optionalString(formData, 'description'),
    cover_url: optionalString(formData, 'cover_url'),
    banner_url: optionalString(formData, 'banner_url'),
    genre: optionalString(formData, 'genre'),
    tags: listValue(formData, 'tags'),
    platforms: listValue(formData, 'platforms'),
    status: statusValue(formData),
    release_date: optionalString(formData, 'release_date'),
    score: numberValue(formData, 'score'),
    progress_current: integerValue(formData, 'progress_current'),
    progress_total: integerValue(formData, 'progress_total'),
    rawg_id: integerValue(formData, 'rawg_id') || null,
    rawg_slug: optionalString(formData, 'rawg_slug'),
    youtube_playlist_id: optionalString(formData, 'youtube_playlist_id'),
    youtube_playlist_url: optionalString(formData, 'youtube_playlist_url'),
    series_name: optionalString(formData, 'series_name'),
    series_order: integerValue(formData, 'series_order'),
    featured: checkboxValue(formData, 'featured'),
    is_public: checkboxValue(formData, 'is_public')
  };
}

export async function createGameAction(formData: FormData) {
  envGuard();
  const payload = gamePayload(formData);

  if (!payload.title) {
    redirect('/admin/games?error=baslik-zorunlu');
  }

  const supabase = createServerSupabaseClient();
  const { error } = await supabase.from('games').insert(payload);

  if (error) {
    redirect(`/admin/games?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath('/');
  revalidatePath('/admin/games');
  redirect('/admin/games?success=oyun-eklendi');
}

export async function updateGameAction(formData: FormData) {
  envGuard();
  const id = stringValue(formData, 'id');

  if (!id) {
    redirect('/admin/games?error=oyun-id-eksik');
  }

  const payload = gamePayload(formData);
  if (!payload.title) {
    redirect('/admin/games?error=baslik-zorunlu');
  }

  const supabase = createServerSupabaseClient();
  const { error } = await supabase.from('games').update(payload).eq('id', id);

  if (error) {
    redirect(`/admin/games?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath('/');
  revalidatePath('/admin/games');
  redirect('/admin/games?success=oyun-guncellendi');
}

export async function deleteGameAction(formData: FormData) {
  envGuard();
  const id = stringValue(formData, 'id');

  if (!id) {
    redirect('/admin/games?error=oyun-id-eksik');
  }

  const supabase = createServerSupabaseClient();
  const { error } = await supabase.from('games').delete().eq('id', id);

  if (error) {
    redirect(`/admin/games?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath('/');
  revalidatePath('/admin/games');
  redirect('/admin/games?success=oyun-silindi');
}
