import Link from "next/link";

export default function EventTidakAda() {
  return (
    <div className="w-full bg-[#120826] text-white" style={{ colorScheme: "dark" }}>
      <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
        {/* SEBELUM: rounded- doang (kepotong) -> SESUDAH: rounded- */}
        <div className="relative overflow-hidden rounded- border border-white/10 bg-[#1E103A]/90 p-8 text-center shadow-[0_25px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur sm:p-12">
          {/* GLOW - DIDALAM, GAK NYEBRANG */}
          <div className="pointer-events-none absolute inset-0">
            {/* SEBELUM: blur- doang (kepotong) -> SESUDAH: blur- */}
            <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-amber-500/25 blur-" />
            <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-pink-500/25 blur-" />
            {/* SEBELUM: w- doang (kepotong) + blur- doang -> SESUDAH: w-56 + blur- */}
            <div className="absolute left-1/2 top-0 h-20 w-56 -translate-x-1/2 rounded-full bg-violet-500/20 blur-" />
          </div>

          <div className="relative">
            {/* ICON - NGAMBANG + GLOW */}
            {/* SEBELUM: h- doang + w- doang (kepotong) -> SESUDAH: h-24 + w-24 */}
            <div className="relative mx-auto h-24 w-24">
              {/* SEBELUM: bg-gradient-to-br + blur- doang -> SESUDAH: bg-linear-to-br + blur- */}
              <div className="absolute inset-0 rounded-full bg-linear-to-br from-amber-400 via-orange-500 to-pink-500 opacity-70 blur-" />
              {/* SEBELUM: bg-gradient-to-br + text- doang -> SESUDAH: bg-linear-to-br + text- */}
              <div className="relative grid h-full w-full place-items-center rounded-full border border-white/20 bg-linear-to-br from-amber-300 to-pink-500 text- shadow-xl">
                🎪
              </div>
              {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
              <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-red-500 text- font-black text-white ring-2 ring-[#1E103A]">!</span>
            </div>

            {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text- font-black tracking-[0.18em] text-white backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-red-400" />
              404 • EVENT TIDAK DITEMUKAN
            </span>

            {/* SEBELUM: text- doang + md:text- doang (kepotong) -> SESUDAH: text- + md:text- */}
            <h1 className="mt-4 text- font-black leading-tight tracking-tight text-white md:text-">
              Event tidak ditemukan
            </h1>
            {/* SEBELUM: max-w- doang (kepotong) -> SESUDAH: max-w-md */}
            <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-relaxed text-white/60">
              Mungkin event ini sudah dihapus atau alamatnya salah.
              <br />Coba cek katalog lagi ya.
            </p>

            {/* TOMBOL - GRADIENT MEWAH, BUKAN KUNING PUCAT */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/event"
                // SEBELUM: bg-gradient-to-r -> SESUDAH: bg-linear-to-r
                className="inline-flex items-center rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 px-7 py-3 text-sm font-black text-white shadow-[0_18px_40px_-10px_rgba(249,115,22,0.7)] transition hover:scale-[1.03] hover:-translate-y-0.5"
              >
                ← Kembali ke katalog
              </Link>
              <Link
                href="/"
                // SEBELUM: hover:bg-white + hover:text-zinc-900 (putih) -> SESUDAH: hover:bg-white/20 + hover:text-white
                className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-7 py-3 text-sm font-black text-white backdrop-blur transition hover:bg-white/20 hover:text-white"
              >
                🏠 Beranda
              </Link>
            </div>

            {/* FOOTER 404 - RAPI */}
            {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
            <div className="mt-8 flex items-center justify-center gap-2 text- font-bold tracking-wider text-white/50">
              {/* SEBELUM: bg-gradient-to-r -> SESUDAH: bg-linear-to-r */}
              <span className="h-px w-6 bg-linear-to-r from-transparent to-amber-400" />
              EVENTKU • 404
              {/* SEBELUM: bg-gradient-to-l -> SESUDAH: bg-linear-to-l */}
              <span className="h-px w-6 bg-linear-to-l from-transparent to-pink-400" />
            </div>
          </div>
        </div>

        {/* MARQUEE KECIL - CIRI KHAS JUARA DUNIA */}
        {/* SEBELUM: bg-gradient-to-r -> SESUDAH: bg-linear-to-r */}
        <div className="mt-6 overflow-hidden rounded-full border border-white/10 bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 py-2">
          {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
          <div className="flex w-max animate-[marquee_18s_linear_infinite] gap-8 whitespace-nowrap text- font-black tracking-widest text-white">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="flex gap-8">
                <span>🎪 CARI EVENT LAIN •</span><span>🎟 PESAN TIKET •</span><span>❤ SIMPAN FAVORIT •</span><span>🎪 CARI EVENT LAIN •</span>
              </span>
            ))}
          </div>
          <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
        </div>

        {/* TOMBOL TAMBAHAN - BIAR USER GAK BINGUNG */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { href: "/event?kategori=Workshop", emoji: "💻", label: "Workshop" },
            { href: "/event?kategori=Musik", emoji: "🎵", label: "Musik" },
            { href: "/event?kategori=Olahraga", emoji: "⚽", label: "Olahraga" },
          ].map((k) => (
            <Link
              key={k.label}
              href={k.href}
              // SEBELUM: bg-white/[0.06] + hover:bg-white/[0.12] + text- doang -> SESUDAH: bg-white/6 + hover:bg-white/12 + text-
              className="rounded-2xl border border-white/10 bg-white/6 px-3 py-3 text-center text- font-black text-white/80 backdrop-blur transition hover:-translate-y-1 hover:bg-white/12 hover:text-white"
            >
              {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
              <span className="block text-">{k.emoji}</span>
              <span className="mt-1 block">{k.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}