import Link from 'next/link';
import { AdminDashboardMock } from '@/components/admin-dashboard-mock';
import { ProHeader } from '@/components/pro-header';

export default function AdminPage() {
  return (
    <main className="site-shell admin-shell">
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <ProHeader />
      <section className="admin-hero panel">
        <div>
          <span className="eyebrow">Admin Panel v0.0.3</span>
          <h1>Yeni panel iskeleti aktif modüllere ayrıldı.</h1>
          <p>
            v0.0.3 ile oyun yönetimi aktif edildi. Sıradaki sürümlerde RAWG kapak çekme, YouTube senkronizasyonu ve sürüm notları paneli eklenecek.
          </p>
        </div>
        <Link className="ghost-button" href="/">Siteye dön</Link>
      </section>
      <AdminDashboardMock />
    </main>
  );
}
