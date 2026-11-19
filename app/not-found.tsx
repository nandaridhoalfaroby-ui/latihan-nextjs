import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto mt-2 max-w-xl space-y-5">
      {/* KARTU 404 UTAMA */}
      {/* SEBELUM: bg-[#FFFEF7] + border-orange-100 (putih) -> SESUDAH: dark glass anti-white */}
      <div className="overflow-hidden rounded- bg-[#1E103A]/90 border border-white/10 shadow-[0_25px_50px_-15px_rgba(0,0,0,0.6)] text-center backdrop-blur">
        {/* Banner gradient */}
        {/* SEBELUM: bg-gradient-to-br -> SESUDAH: bg-linear-to-br */}
        <div className="relative bg-linear-to-br from-[#FFC837] via-[#FFB020] to-[#FF7A18] px-6 py-8 md:py-10">
          <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-white/20" />
          {/* SEBELUM: bg-[#FFFEF7]/30 -> SESUDAH: bg-white/30 */}
          <div className="absolute -right-6 -bottom-8 h-32 w-32 rounded-full bg-white/30" />
          <div className="relative">
            {/* SEBELUM: bg-[#FFFEF7] + border-amber-200 -> SESUDAH: dark glass */}
            <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-[#120826]/85 border border-white/20 text-4xl shadow-xl -rotate-3 animate-float backdrop-blur">🎪</div>
            {/* SEBELUM: text-zinc-900 -> SESUDAH: text-white */}
            <h1 className="mt-4 text-6xl md:text-7xl font-black tracking-tight text-white leading-none drop-shadow-lg">
              404
            </h1>
            {/* SEBELUM: bg-zinc-900 + text-[#FFC837] -> SESUDAH: dark glass, tetep kuning */}
            <span className="mt-2 inline-flex rounded-full bg-black/40 px-3.5 py-1.5 text- font-black tracking-widest text-[#FFC837] ring-1 ring-white/20 backdrop-blur">HALAMAN TIDAK DITEMUKAN</span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* SEBELUM: text-zinc-700 -> SESUDAH: text-white/85 */}
          <p className="text- font-bold text-white/85 leading-relaxed">
            Yah, halaman yang kamu cari tidak ada. 😅
          </p>
          {/* SEBELUM: text-zinc-500 -> SESUDAH: text-white/50 */}
          <p className="mt-1 text-xs font-medium text-white/50">
            Mungkin eventnya udah selesai atau linknya salah ketik.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 px-6 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/30 hover:-translate-y-0.5 transition-all"
            >
              ← Kembali ke Beranda
            </Link>
            {/* SEBELUM: bg-[#FFF7D6] + border-orange-100 + text-zinc-900 (putih) -> SESUDAH: dark glass */}
            <Link
              href="/event"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-6 py-3 text-sm font-black text-white backdrop-blur hover:bg-white/15 hover:-translate-y-0.5 transition-all"
            >
              Lihat Event →
            </Link>
          </div>

          {/* SEBELUM: text-zinc-400 + bg-orange-200 -> SESUDAH: text-white/40 + bg-white/20 */}
          <div className="mt-6 flex items-center justify-center gap-2 text- font-bold tracking-wider text-white/40">
            <span className="h-px w-6 bg-white/20" />
            EVENTKU • 404
            <span className="h-px w-6 bg-white/20" />
          </div>
        </div>
      </div>

      {/* SHORTCUT WARNA-WARNI - DARK GLASS, BUKAN PASTEL PUTIH */}
      <div className="grid grid-cols-3 gap-3">
        {/* SEBELUM: bg-[#FFF7D6] + border-orange-100 + text-zinc-900 -> SESUDAH: dark orange glass */}
        <Link href="/" className="rounded-2xl bg-orange-500/15 border border-orange-400/25 p-4 text-center hover:-translate-y-1 hover:shadow-lg hover:bg-orange-500/20 transition">
          <p className="text-2xl">🏠</p>
          <p className="mt-1 text-xs font-black text-white">Beranda</p>
        </Link>
        {/* SEBELUM: bg-[#F0FDF4] + border-emerald-100 + text-zinc-900 -> SESUDAH: dark emerald glass */}
        <Link href="/event" className="rounded-2xl bg-emerald-500/15 border border-emerald-400/25 p-4 text-center hover:-translate-y-1 hover:shadow-lg hover:bg-emerald-500/20 transition">
          <p className="text-2xl">🎪</p>
          <p className="mt-1 text-xs font-black text-white">Event</p>
        </Link>
        {/* SEBELUM: bg-[#FDF2F8] + border-pink-100 + text-zinc-900 -> SESUDAH: dark pink glass */}
        <Link href="/favorit" className="rounded-2xl bg-pink-500/15 border border-pink-400/25 p-4 text-center hover:-translate-y-1 hover:shadow-lg hover:bg-pink-500/20 transition">
          <p className="text-2xl">❤</p>
          <p className="mt-1 text-xs font-black text-white">Favorit</p>
        </Link>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: rotate(-3deg) translateY(0); }
          50% { transform: rotate(-3deg) translateY(-6px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
}