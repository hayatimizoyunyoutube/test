export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8">
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <div className="text-2xl font-black tracking-tight">Hayatımız Oyun</div>
            <div className="text-sm text-slate-400">YouTube Arşiv Video Sitesi</div>
          </div>

          <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
            <a href="/" className="text-cyan-300">Ana Sayfa</a>
            <a href="/series">Seriler</a>
            <a href="/categories">Kategoriler</a>
            <a href="/auth">Giriş / Kayıt</a>
          </nav>
        </header>

        <div className="grid flex-1 items-center gap-10 py-16 lg:grid-cols-[1fr_520px]">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200">
              v0.0.1 · Sıfırdan YouTube arşivi
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-tight md:text-7xl">
              Oyun Anıları Burada{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Arşivleniyor.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              YouTube’daki oyun serilerini düzenli, erişilebilir ve profesyonel
              bir arşivde topluyoruz. Tamamlanan, devam eden ve yakında gelecek
              seriler tek merkezde.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/series"
                className="rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-4 font-bold shadow-lg shadow-purple-900/30"
              >
                Serileri Keşfet
              </a>
              <a
                href="/auth"
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-bold text-slate-200"
              >
                Giriş / Kayıt
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-purple-950/30">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-blue-950 p-6">
              <div className="mb-4 text-sm font-bold text-cyan-200">ARŞİV DURUMU</div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-black/30 p-5">
                  <div className="text-sm text-slate-400">Tamamlanan Seriler</div>
                  <div className="mt-2 text-3xl font-black">0</div>
                </div>

                <div className="rounded-2xl bg-black/30 p-5">
                  <div className="text-sm text-slate-400">Devam Eden Seriler</div>
                  <div className="mt-2 text-3xl font-black">0</div>
                </div>

                <div className="rounded-2xl bg-black/30 p-5">
                  <div className="text-sm text-slate-400">Yakında Gelecek Seriler</div>
                  <div className="mt-2 text-3xl font-black">0</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
