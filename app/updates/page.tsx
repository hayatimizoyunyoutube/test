import { completedUpdates, plannedUpdates, type UpdateNote } from "@/lib/data/updates";

function statusLabel(status: UpdateNote["status"]) {
  if (status === "completed") return "Tamamlandı";
  if (status === "planned") return "Planlandı";
  return "Ana Hedef";
}

export default function UpdatesPage() {
  return (
    <main className="updatesPage">
      <header className="updatesHero">
        <div>
          <a href="/" className="backLink">← Ana sayfaya dön</a>
          <p className="eyebrow">v0.0.7 · GÜNCELLEME MERKEZİ</p>
          <h1>
            Sitenin Gelişim Süreci <span>Şeffaf Şekilde Burada.</span>
          </h1>
          <p>
            Hayatımız Oyun arşiv sitesi küçük ve kontrollü sürümlerle gelişiyor.
            Bu sayfada tamamlananlar, sıradaki planlar ve ana yayın hedefi
            gösteriliyor.
          </p>
        </div>

        <div className="updatesStats">
          <div>
            <strong>{completedUpdates.length}</strong>
            <span>Tamamlanan Sürüm</span>
          </div>
          <div>
            <strong>{plannedUpdates.length}</strong>
            <span>Planlanan Başlık</span>
          </div>
          <div>
            <strong>v4.0.0</strong>
            <span>Ana Yayın Hedefi</span>
          </div>
        </div>
      </header>

      <section className="updatesIntro">
        <strong>Geliştirme kuralı</strong>
        <span>
          Her şey yavaş yavaş eklenecek. Public kullanıcıya gösterilecek alanlar
          önce yapılacak. Admin ve gizli yönetim özellikleri erken sürümlerde
          public arayüze konulmayacak.
        </span>
      </section>

      <section className="updatesColumns">
        <div className="updatesColumn">
          <div className="updatesColumnHead">
            <p className="eyebrow">TAMAMLANANLAR</p>
            <h2>Bitirilen Sürümler</h2>
          </div>

          <div className="updateTimeline">
            {completedUpdates.map((update) => (
              <article key={update.version} className="updateCard completedUpdate">
                <div className="updateVersion">
                  <strong>{update.version}</strong>
                  <span>{statusLabel(update.status)}</span>
                </div>

                <div className="updateContent">
                  <h3>{update.title}</h3>
                  <p>{update.summary}</p>

                  <ul>
                    {update.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <div className="updateFooter">
                    <span>Supabase Run</span>
                    <strong>{update.supabaseRun}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="updatesColumn">
          <div className="updatesColumnHead">
            <p className="eyebrow">PLANLANANLAR</p>
            <h2>Sıradaki Yol Haritası</h2>
          </div>

          <div className="updateTimeline">
            {plannedUpdates.map((update) => (
              <article key={update.version} className={`updateCard ${update.status === "target" ? "targetUpdate" : "plannedUpdate"}`}>
                <div className="updateVersion">
                  <strong>{update.version}</strong>
                  <span>{statusLabel(update.status)}</span>
                </div>

                <div className="updateContent">
                  <h3>{update.title}</h3>
                  <p>{update.summary}</p>

                  <ul>
                    {update.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <div className="updateFooter">
                    <span>Supabase Run</span>
                    <strong>{update.supabaseRun}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
