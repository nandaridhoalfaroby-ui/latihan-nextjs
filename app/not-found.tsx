import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto mt-2 max-w-xl space-y-5">
      {/* KARTU 404 UTAMA */}
      <div className="overflow-hidden rounded- bg-[#FFFEF7] border-2 border-orange-100 shadow-sm text-center">
        {/* Banner gradient */}
        <div className="relative bg-gradient-to-br from-[#FFC837] via-[#FFB020] to-[#FF7A18] px-6 py-8 md:py-10">
          <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full bg-white/20" />
          <div className="absolute -right-6 -bottom-8 h-32 w-32 rounded-full bg-[#FFFEF7]/30" />
          <div className="relative">
            <div className="mx-auto grid h-20 w-20 place-items-center rounded- bg-[#FFFEF7] border-2 border-amber-200 text-4xl shadow-xl -rotate-3 animate-float">🎪</div>
            <h1 className="mt-4 text-6xl md:text-7xl font-black tracking-tight text-zinc-900 leading-none">
              404
            </h1>
            <span className="mt-2 inline-flex rounded-full bg-zinc-900 px-3.5 py-1.5 text- font-black tracking-widest text-[#FFC837]">HALAMAN TIDAK DITEMUKAN</span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          <p className="text- font-bold text-zinc-700 leading-relaxed">
            Yah, halaman yang kamu cari tidak ada. 😅
          </p>
          <p className="mt-1 text-xs font-medium text-zinc-500">
            Mungkin eventnya udah selesai atau linknya salah ketik.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-black text-[#FFC837] shadow-lg hover:-translate-y-0.5 transition-all"
            >
              ← Kembali ke Beranda
            </Link>
            <Link
              href="/event"
              className="inline-flex items-center gap-2 rounded-full bg-[#FFF7D6] border-2 border-orange-100 px-6 py-3 text-sm font-black text-zinc-900 hover:bg-[#FFFBEB] hover:-translate-y-0.5 transition-all"
            >
              Lihat Event →
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text- font-bold tracking-wider text-zinc-400">
            <span className="h-px w-6 bg-orange-200" />
            EVENTKU • 404
            <span className="h-px w-6 bg-orange-200" />
          </div>
        </div>
      </div>

      {/* SHORTCUT WARNA-WARNI */}
      <div className="grid grid-cols-3 gap-3">
        <Link href="/" className="rounded- bg-[#FFF7D6] border-2 border-orange-100 p-4 text-center hover:-translate-y-1 hover:shadow-md transition">
          <p className="text-2xl">🏠</p>
          <p className="mt-1 text-xs font-black text-zinc-900">Beranda</p>
        </Link>
        <Link href="/event" className="rounded- bg-[#F0FDF4] border-2 border-emerald-100 p-4 text-center hover:-translate-y-1 hover:shadow-md transition">
          <p className="text-2xl">🎪</p>
          <p className="mt-1 text-xs font-black text-zinc-900">Event</p>
        </Link>
        <Link href="/favorit" className="rounded- bg-[#FDF2F8] border-2 border-pink-100 p-4 text-center hover:-translate-y-1 hover:shadow-md transition">
          <p className="text-2xl">❤️</p>
          <p className="mt-1 text-xs font-black text-zinc-900">Favorit</p>
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