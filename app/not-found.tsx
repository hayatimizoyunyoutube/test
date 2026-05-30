export default function NotFound() {
  return (
    <main className="notFoundPage">
      <section className="notFoundCard">
        <p className="eyebrow">404 · SAYFA BULUNAMADI</p>
        <h1>Bu arşiv sayfası <span>henüz oluşturulmadı.</span></h1>
        <p>Aradığın sayfa yayında olmayabilir veya sonraki sürümlerde eklenecek olabilir.</p>
        <div className="actions">
          <a href="/">Ana Sayfa</a>
          <a href="/series" className="ghost">Serileri Aç</a>
          <a href="/updates" className="ghost">Güncellemeler</a>
        </div>
      </section>
    </main>
  );
}
