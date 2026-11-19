import Link from "next/link";
import { ambilEvents } from "@/data/ambil";
// NAMA FILE HARUS PERSIS: components/TrendingCarousel.tsx (T + C gede)
// Kalau masih ada file kembar-nya, hapus dulu pake Terminal di Langkah 1, kalau enggak ts(1261) balik lagi
import TrendingCarousel from "@/components/TrendingCarousel";

export default async function Beranda() {
  const semua = await ambilEvents();
  const terdekat = semua.slice(0, 6);
  const totalGratis = semua.filter((e) => e.harga === 0).length;

  return (
    <div className="w-full overflow-hidden bg-[#120826] text-white">
      {/* HERO */}
      <section className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          {/* SEBELUM: blur- doang (kepotong) -> SESUDAH: blur- */}
          <div className="absolute -top-32 left-[-10%] h-72 w-72 rounded-full bg-fuchsia-600/40 blur-" />
          <div className="absolute top-20 right-[-5%] h-72 w-72 rounded-full bg-orange-500/40 blur-" />
          <div className="absolute bottom-0 left-[35%] h-64 w-64 rounded-full bg-cyan-500/25 blur-" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-10 sm:px-6 md:pt-14">
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {/* SEBELUM: text- doang -> SESUDAH: text- */}
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text- font-black tracking-[0.16em] text-white backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  🎪 EVENTKU • LIVE SEKARANG
                </span>
                <span className="rounded-full bg-linear-to-r from-amber-400 to-pink-500 px-3 py-2 text- font-black tracking-widest text-white">
                  🔥 1.240+ TIKET TERJUAL
                </span>
              </div>

              {/* SEBELUM: text- + sm:text- + md:text- doang -> SESUDAH: text- + sm:text- + md:text- */}
              <h1 className="mt-6 text- font-black leading-[0.95] tracking-tight sm:text- md:text-">
                Temukan Event
                <br />
                <span className="bg-linear-to-r from-amber-300 via-orange-400 to-pink-500 bg-clip-text text-transparent">
                  Paling Seru
                </span>
                <br />
                di Sekolahmu!
              </h1>

              {/* SEBELUM: text- + md:text- doang -> SESUDAH: text- + md:text- */}
              <p className="mt-5 max-w-xl text- font-medium leading-relaxed text-white/70 md:text-">
                Workshop, lomba, konser, dan bazar. Semua event sekolah dalam satu tempat yang berwarna, cepat, dan gak pake ribet.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link href="/event" className="group relative overflow-hidden rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 px-7 py-3.5 text-sm font-black text-white shadow-[0_18px_40px_-10px_rgba(249,115,22,0.7)] transition hover:scale-[1.03]">
                  <span className="relative z-10">Jelajahi Event →</span>
                  <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition duration-700 group-hover:translate-x-full" />
                </Link>
                <Link href="/pesanan" className="rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-black text-white backdrop-blur transition hover:bg-white/20 hover:text-white">
                  🎟 Pesanan Saya
                </Link>
              </div>

              <div className="mt-9 grid max-w-xl grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/7 p-4 backdrop-blur">
                  <p className="text- font-black leading-none">{semua.length}</p>
                  <p className="mt-1.5 text- font-bold tracking-wide text-white/60">TOTAL EVENT</p>
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[85%] rounded-full bg-linear-to-r from-amber-400 to-orange-500" />
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/7 p-4 backdrop-blur">
                  <p className="text- font-black leading-none text-emerald-300">{totalGratis}</p>
                  <p className="mt-1.5 text- font-bold tracking-wide text-white/60">EVENT GRATIS</p>
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[70%] rounded-full bg-linear-to-r from-emerald-400 to-cyan-400" />
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/7 p-4 backdrop-blur">
                  <p className="text- font-black leading-none text-pink-300">100%</p>
                  <p className="mt-1.5 text- font-bold tracking-wide text-white/60">SERU DIJAMIN</p>
                  <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-full rounded-full bg-linear-to-r from-pink-400 to-violet-400" />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["🎸", "🎨", "⚽", "🎤"].map((e, i) => (
                    <span key={i} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#120826] bg-linear-to-br from-violet-500 to-pink-500 text-">
                      {e}
                    </span>
                  ))}
                </div>
                <p className="text- font-medium text-white/70">
                  <span className="font-black text-white">⭐ 4.9/5</span> dari 800+ pelajar yang sudah hadir
                </p>
              </div>
            </div>

            {/* SEBELUM: w- doang -> SESUDAH: w- */}
            <div className="relative mx-auto hidden w- shrink-0 lg:block">
              {/* SEBELUM: rounded- doang -> SESUDAH: rounded- */}
              <div className="absolute -inset-6 rounded- bg-linear-to-br from-amber-400/30 via-pink-500/30 to-violet-500/30 blur-2xl" />
              <div className="relative rotate-2 rounded- border border-white/15 bg-[#1E103A]/90 p-4 shadow-2xl backdrop-blur">
                <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br from-pink-500 via-orange-400 to-amber-300 text-">
                  🎵
                  <span className="absolute left-3 top-3 rounded-full bg-black/40 px-3 py-1 text- font-black tracking-widest text-white backdrop-blur">
                    🔥 RAMAI
                  </span>
                  <span className="absolute bottom-3 right-3 rounded-full bg-[#120826]/85 px-3 py-1 text- font-black text-emerald-300 ring-1 ring-white/20 backdrop-blur">
                    GRATIS
                  </span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-2">
                  <div>
                    <p className="font-black leading-tight">Konser Musik Sekolah</p>
                    <p className="mt-1 text- text-white/60">Aula Sekolah • 25 Nov • 19.00 WIB</p>
                  </div>
                  <span className="text-">🎸</span>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-dashed border-white/15 pt-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[82%] rounded-full bg-linear-to-r from-amber-400 to-pink-500" />
                    </div>
                    <span className="text- font-bold text-white/60">82% habis</span>
                  </div>
                  <span className="rounded-full bg-white/10 px-3 py-1.5 text- font-black text-white ring-1 ring-white/20">Lihat →</span>
                </div>
              </div>
              <div className="absolute -left-10 -top-6 -rotate-6 rounded-2xl border border-white/15 bg-[#2A1B52]/95 px-3.5 py-2.5 text-white shadow-xl backdrop-blur">
                <p className="text- font-bold text-white/60">Tiket Terjual</p>
                <p className="text- font-black">1.240+ 🎟</p>
              </div>
              <div className="absolute -bottom-6 -right-4 rotate-3 rounded-2xl border border-white/15 bg-zinc-900/95 px-4 py-3 shadow-xl backdrop-blur">
                <p className="text- font-bold text-amber-300">⭐ RATING EVENT</p>
                <p className="text- font-black text-white">4.9 • Super Seru!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-white/10 bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 py-2.5">
        <div className="flex w-max animate-[marquee_18s_linear_infinite] gap-8 whitespace-nowrap text- font-black tracking-widest text-white">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex gap-8">
              <span>🎪 WORKSHOP •</span><span>🎵 KONSER •</span><span>⚽ OLAHRAGA •</span><span>🛍 BAZAR •</span><span>🏆 LOMBA •</span><span>🎨 SENI •</span><span>🎪 WORKSHOP •</span><span>🎵 KONSER •</span><span>⚽ OLAHRAGA •</span><span>🛍 BAZAR •</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>

      {/* KATEGORI */}
      <section className="mx-auto w-full max-w-7xl px-4 pt-10 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text- font-black tracking-[0.2em] text-amber-300">✨ MAU NGAPAIN HARI INI?</p>
            <h2 className="mt-2 text- font-black tracking-tight md:text-">Pilih Vibes Kamu</h2>
          </div>
          <span className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text- font-bold text-white/70 sm:block">4 Kategori • Update Tiap Minggu</span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { label: "Workshop", emoji: "💻", desc: "Belajar skill baru", warna: "from-orange-500/25 to-amber-500/10 border-orange-400/25", iconBg: "from-orange-400 to-amber-400", href: "/event?kategori=Workshop" },
            { label: "Olahraga", emoji: "⚽", desc: "Sehat & kompetitif", warna: "from-emerald-500/25 to-teal-500/10 border-emerald-400/25", iconBg: "from-emerald-400 to-teal-400", href: "/event?kategori=Olahraga" },
            { label: "Musik", emoji: "🎵", desc: "Konser & pentas", warna: "from-pink-500/25 to-rose-500/10 border-pink-400/25", iconBg: "from-pink-400 to-rose-500", href: "/event?kategori=Musik" },
            { label: "Bazar & Lomba", emoji: "🛍", desc: "Jajan & berkompetisi", warna: "from-violet-500/25 to-purple-500/10 border-violet-400/25", iconBg: "from-violet-400 to-purple-500", href: "/event?kategori=Bazar" },
          ].map((k) => (
            <Link key={k.label} href={k.href} className={`group flex items-center gap-3 rounded-2xl border bg-linear-to-br p-4 transition hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] ${k.warna}`}>
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br text- shadow-lg transition group-hover:rotate-[-8deg] group-hover:scale-110 ${k.iconBg}`}>
                {k.emoji}
              </span>
              <span className="min-w-0">
                <span className="block truncate font-black">{k.label}</span>
                <span className="block truncate text- font-medium text-white/60">{k.desc}</span>
                <span className="mt-1 block text- font-black text-white/80 group-hover:text-amber-300">Lihat →</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* EVENT TERDEKAT - AUTO-GESER SENDIRI */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-10 pt-12 sm:px-6">
        <TrendingCarousel events={terdekat} />
        {terdekat.length === 0 && (
          <div className="mt-7 rounded-2xl border border-dashed border-white/20 bg-white/5 p-10 text-center">
            <p className="text-">🎪</p>
            <p className="mt-2 font-black">Belum ada event</p>
            <p className="text-sm text-white/60">Coba tambah event dari Supabase dulu bro.</p>
          </div>
        )}
      </section>

      {/* BANNER BAWAH */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6">
        <div className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded- bg-linear-to-r from-violet-600 via-pink-500 to-orange-500 p-7 shadow-[0_30px_60px_-20px_rgba(236,72,153,0.6)] sm:p-9 md:flex-row md:items-center">
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
          <div className="relative">
            <span className="rounded-full bg-black/25 px-3 py-1 text- font-black tracking-widest text-white backdrop-blur">⏰ JANGAN DITUNDA</span>
            <p className="mt-3 text- font-black leading-tight md:text-">
              Jangan Sampai Kehabisan Tiket! 🎟
            </p>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/85">
              Event favorit kamu bisa habis kapan aja. Cek sekarang, pesan sekarang, hadir bareng teman-teman.
            </p>
          </div>
          <Link href="/event" className="relative shrink-0 rounded-full bg-white px-7 py-3.5 text-sm font-black text-zinc-900 shadow-xl transition hover:scale-[1.04]">
            Lihat Event →
          </Link>
        </div>
      </section>
    </div>
  );
}