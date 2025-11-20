export default function Hero({ onSearch }) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
              Elite Wrestling Events, Synced in Real‑Time
            </h1>
            <p className="mt-4 text-slate-300 text-lg">
              Discover, register, and manage entries with seamless Smoothcomp integration. Built for athletes, coaches, and organizers.
            </p>
            <div className="mt-8 flex gap-3">
              <input
                type="search"
                placeholder="Search events by name or city"
                onChange={(e) => onSearch?.(e.target.value)}
                className="w-full max-w-md rounded-xl bg-slate-800/60 border border-white/10 px-4 py-3 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <a href="#events" className="inline-flex items-center rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-3 transition-colors">Browse</a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-16 bg-blue-500/20 blur-3xl rounded-full" />
            <img src="/ring-hero.webp" alt="Wrestling" className="relative w-full rounded-2xl border border-white/10 shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
