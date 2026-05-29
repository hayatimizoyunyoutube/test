import Link from 'next/link';
import { AdminGameManager } from '@/components/admin-game-manager';
import { ProHeader } from '@/components/pro-header';
import { getAdminGames } from '@/lib/data/admin-games';

type AdminGamesPageProps = {
  searchParams?: {
    success?: string;
    error?: string;
  };
};

function readableMessage(value?: string) {
  if (!value) return null;
  const map: Record<string, string> = {
    'oyun-eklendi': 'Oyun başarıyla eklendi.',
    'oyun-guncellendi': 'Oyun başarıyla güncellendi.',
    'oyun-silindi': 'Oyun başarıyla silindi.',
    'supabase-env-eksik': 'Supabase server env eksik. `.env.local` içinde SUPABASE_SERVICE_ROLE_KEY girilmeden admin kayıt işlemleri çalışmaz.',
    'baslik-zorunlu': 'Oyun adı zorunlu.',
    'oyun-id-eksik': 'Oyun ID bilgisi eksik.'
  };
  return map[value] || decodeURIComponent(value);
}

export default async function AdminGamesPage({ searchParams }: AdminGamesPageProps) {
  const { games, usingMock, error } = await getAdminGames();
  const successMessage = readableMessage(searchParams?.success);
  const errorMessage = readableMessage(searchParams?.error) || error;

  return (
    <main className="site-shell admin-shell">
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <ProHeader />

      <section className="admin-hero panel">
        <div>
          <span className="eyebrow">Admin Panel v0.0.3</span>
          <h1>Oyun yönetimi aktif.</h1>
          <p>
            Bu sürümde oyun ekleme, düzenleme, silme ve listeleme modülü eklendi. Sistem eski projeden taşınmadı;
            Supabase `games` tablosuyla temiz ve kontrollü çalışır.
          </p>
        </div>
        <div className="hero-actions small-actions">
          <Link className="ghost-button" href="/admin">Admin ana ekran</Link>
          <Link className="primary-button" href="/">Siteye dön</Link>
        </div>
      </section>

      {successMessage ? <div className="notice success-notice">{successMessage}</div> : null}
      {errorMessage ? <div className="notice danger-notice">{errorMessage}</div> : null}
      {usingMock ? <div className="notice warning-notice">Şu anda örnek veriler görüntüleniyor. Gerçek kayıt için Supabase env değerlerini gir.</div> : null}

      <AdminGameManager games={games} usingMock={usingMock} />
    </main>
  );
}
