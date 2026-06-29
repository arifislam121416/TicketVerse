"use client";

export default function Statistics({ stats }) {
  return (
    <section className="py-20 bg-gradient-to-r from-pink-900/10 via-indigo-900/10 to-transparent border-t border-white/5 w-full">
      <div className="max-w-7xl mx-auto px-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
        <div className="space-y-2">
          <span className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text">
            stats?.totalAdmin ?? 0
          </span>
          <p className="text-slate-300 font-semibold text-sm uppercase tracking-wider">Premium Admin Held</p>
        </div>

        <div className="space-y-2">
          <span className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text">
           (totalUser ?? 0).toLocaleString()
          </span>
          <p className="text-slate-300 font-semibold text-sm uppercase tracking-wider">Happy Users</p>
        </div>

        <div className="space-y-2">
          <span className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text">
            {stats.totalVendor}+
          </span>
          <p className="text-slate-300 font-semibold text-sm uppercase tracking-wider">Vetted Vendors</p>
        </div>
      </div>
    </section>
  );
}
