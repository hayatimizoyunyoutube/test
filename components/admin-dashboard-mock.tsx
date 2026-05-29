import Link from 'next/link';

const cards = [
  ['Oyun Yönetimi', 'Aktif', 'Oyun ekle, düzenle, sil ve Supabase kayıtlarını yönet.', '/admin/games'],
  ['RAWG Merkezi', 'v0.0.3', 'Kapak, tür, tarih ve meta bilgisi çekme modülü eklenecek.', '#'],
  ['YouTube Merkezi', 'v0.0.4', 'Playlist ve video senkronizasyon paneli eklenecek.', '#'],
  ['Sürüm Notları', 'v0.0.5', 'Site içinden güncelleme notu yönetimi eklenecek.', '#']
];

export function AdminDashboardMock() {
  return (
    <section className="admin-grid">
      {cards.map(([title, status, text, href]) => (
        <article className="admin-card panel" key={title}>
          <span className="admin-icon">◆</span>
          <small>{status}</small>
          <h2>{title}</h2>
          <p>{text}</p>
          {href !== '#' ? <Link className="ghost-button admin-card-link" href={href}>Modülü aç</Link> : <button type="button" disabled>Sonraki sürümde açılacak</button>}
        </article>
      ))}
    </section>
  );
}
