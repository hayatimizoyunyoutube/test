import { allUpdates, completedUpdates, plannedUpdates, type UpdateNote } from "@/lib/data/updates";

function statusLabel(status: UpdateNote["status"]) {
  if (status === "completed") return "Tamamlandı";
  if (status === "planned") return "Planlandı";
  return "Ana Hedef";
}

function statusClass(status: UpdateNote["status"]) {
  if (status === "completed") return "completedUpdate";
  if (status === "planned") return "plannedUpdate";
  return "targetUpdate";
}

export default function UpdatesPage() {
  return (
    <main className="updatesPage updatesPageV009">
      <header className="updatesHero updatesHeroV009">
        <div>
          <a href="/" className="backLink">← Ana sayfaya dön</a>
          <p className="eyebrow">v0.0.9 · PUBLIC CİLA</p>
          <h1>
            Güncellemeler Artık <span>Tek Akışta.</span>
          </h1>
          <p>
            Tamamlananlar, sıradaki planlar ve ana yayın hedefi artık daha
            kompakt, alt alta ve kaydırması kolay bir görünümle listeleniyor.
          </p>
        </div>

        <div className="updatesStats">
          <div>
            <strong>{completedUpdates.length}</strong>
            <span>Tamamlanan</span>
          </div>
          <div>
            <strong>{plannedUpdates.length}</strong>
            <span>Planlanan</span>
          </div>
          <div>
            <strong>v4.0.0</strong>
            <span>Ana Hedef</span>
          </div>
        </div>
      </header>

      <section className="updatesIntro updatesIntroV009">
        <strong>v0.0.9 düzeni</strong>
        <span>
          Güncelleme kartları artık yan yana sayfayı kaplamıyor. Her sürüm tek
          kolon halinde, sırayla ve daha okunabilir şekilde gösteriliyor.
        </span>
      </section>

      <section className="updateFlowShell">
        <div className="updateFlowHead">
          <div>
            <p className="eyebrow">SÜRÜM AKIŞI</p>
            <h2>Alt Alta Güncelleme Listesi</h2>
          </div>

          <div className="updateLegend">
            <span className="legendDone">Tamamlandı</span>
            <span className="legendPlan">Planlandı</span>
            <span className="legendTarget">Ana Hedef</span>
          </div>
        </div>

        <div className="updateFlow">
          {allUpdates.map((update) => (
            <article key={update.version} className={`updateFlowCard ${statusClass(update.status)}`}>
              <div className="updateFlowVersion">
                <strong>{update.version}</strong>
                <span>{statusLabel(update.status)}</span>
              </div>

              <div className="updateFlowContent">
                <div className="updateFlowTitle">
                  <h3>{update.title}</h3>
                  <span>{update.supabaseRun}</span>
                </div>

                <p>{update.summary}</p>

                <ul>
                  {update.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
