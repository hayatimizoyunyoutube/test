export default function HomePage() {
  return (
    <main className="home">
      <section className="hero">
        <div>
          <p className="badge">v0.0.1 · YouTube Arşiv Video Sitesi</p>

          <h1>
            Oyun Anıları Burada <span>Arşivleniyor.</span>
          </h1>

          <p className="text">
            Hayatımız Oyun YouTube serilerini düzenli, erişilebilir ve profesyonel
            bir arşivde topluyoruz. Tamamlanan, devam eden ve yakında gelecek
            seriler tek merkezde.
          </p>

          <div className="actions">
            <a href="/series">Serileri Keşfet</a>
            <a href="/auth" className="ghost">Giriş / Kayıt</a>
          </div>
        </div>

        <div className="panel">
          <h2>Arşiv Durumu</h2>
          <div className="card">Tamamlanan Seriler: 0</div>
          <div className="card">Devam Eden Seriler: 0</div>
          <div className="card">Yakında Gelecek Seriler: 0</div>
        </div>
      </section>
    </main>
  );
}
