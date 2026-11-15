import Link from "next/link";
import { events } from "@/data/events";
import KartuEvent from "@/components/KartuEvent";

export default function Beranda() {
  const terdekat = events.slice(0, 3);
  const totalEvent = events.length;
  // BENER - pake sisa langsung, bukan kuota - terisi
  const totalTiket = events.reduce((s, e) => s + e.sisa, 0);

  return (
    <div className="space-y-8">
      {/* HERO GRADIENT */}
      <section className="relative overflow-hidden rounded- bg-gradient-to-br from-[#FFC837] via-[#FFB020] to-[#FF7A18] border-2 border-amber-300 px-6 py-10 md:py-14 text-center shadow-[0_20px_50px_rgba(255,122,24,0.30)]">
        {/* dekorasi */}
        <div className="absolute -top-16 -left-10 h-48 w-48 rounded-full bg-white/20 blur-" />
        <div className="absolute -bottom-16 -right-8 h-56 w-56 rounded-full bg-[#FFFEF7]/30" />
        <div className="absolute top-6 right-6 hidden md:block rounded-full bg-zinc-900 px-3 py-1.5 text- font-black text-[#FFC837] rotate-6 shadow-lg">✨ EVENT SEKOLAH ✨</div>
        <div className="absolute bottom-6 left-6 hidden md:block rounded-full bg-[#FFFEF7] border-2 border-amber-200 px-3 py-1.5 text- font-black text-zinc-800 shadow-md -rotate-3">🎟️ Tanpa Antri</div>

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text- font-black tracking-wider text-[#FFC837] shadow-lg">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            {totalEvent} EVENT AKTIF • {totalTiket} TIKET TERSISA
          </span>

          <h1 className="mx-auto mt-5 max-w-2xl text-4xl md:text-6xl font-black tracking-tight leading-[1.02] text-zinc-900">
            Temukan event seru<br />
            <span className="bg-zinc-900 text-[#FFC837] px-3 rounded-2xl inline-block mt-1 rotate-[-1deg]">di sekolahmu</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm md:text- font-bold leading-relaxed text-zinc-800/85">
            Workshop, lomba, musik, dan bazar. Pesan tiketnya di sini, gak perlu antri.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link href="/event" className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-7 py-3.5 text-sm font-black text-[#FFC837] shadow-xl hover:-translate-y-0.5 hover:bg-zinc-800 transition-all">
              Lihat semua event
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#FFC837] text- text-zinc-900">→</span>
            </Link>
            <Link href="/favorit" className="inline-flex items-center gap-2 rounded-full bg-[#FFFEF7]/95 backdrop-blur border-2 border-amber-200 px-7 py-3.5 text-sm font-black text-zinc-900 hover:bg-[#FFFEF7] hover:-translate-y-0.5 transition-all">
              ❤️ Favoritku
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-[#FFFEF7]/80 px-3 py-1.5 text- font-black text-zinc-700">🎟️ 200+ siswa udah pesan minggu ini</span>
            <span className="rounded-full bg-zinc-900/10 px-3 py-1.5 text- font-black text-zinc-800">⭐ 4.9 / 5 dari siswa</span>
          </div>
        </div>
      </section>

      {/* KATEGORI WARNA-WARNI */}
      <div>
        <h2 className="text-xl font-black tracking-tight text-zinc-900">Cari Sesuai Minat Kamu 👀</h2>
        <p className="mt-1 text-sm font-medium text-zinc-600">Klik salah satu, langsung ke-filter.</p>
        <div className="mt-4 grid grid-cols-3 gap-3 md:gap-4">
          <Link href="/event?kategori=Workshop" className="rounded- bg-[#F5F3FF] border-2 border-violet-100 p-4 md:p-5 hover:-translate-y-1 hover:shadow-lg transition text-center md:text-left">
            <span className="inline-grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-400 to-indigo-500 text-2xl text-white shadow-md">🎨</span>
            <p className="mt-3 font-black text-zinc-900">Workshop</p>
            <p className="text-xs font-medium text-zinc-500">Belajar skill baru</p>
          </Link>
          <Link href="/event?kategori=Musik" className="rounded- bg-[#FDF2F8] border-2 border-pink-100 p-4 md:p-5 hover:-translate-y-1 hover:shadow-lg transition text-center md:text-left">
            <span className="inline-grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-pink-400 to-rose-500 text-2xl text-white shadow-md">🎵</span>
            <p className="mt-3 font-black text-zinc-900">Musik</p>
            <p className="text-xs font-medium text-zinc-500">Konser & pentas</p>
          </Link>
          <Link href="/event?kategori=Olahraga" className="rounded- bg-[#F0FDF4] border-2 border-emerald-100 p-4 md:p-5 hover:-translate-y-1 hover:shadow-lg transition text-center md:text-left">
            <span className="inline-grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 text-2xl text-white shadow-md">⚽</span>
            <p className="mt-3 font-black text-zinc-900">Olahraga</p>
            <p className="text-xs font-medium text-zinc-500">Lomba & turnamen</p>
          </Link>
        </div>
      </div>

      {/* EVENT TERDEKAT */}
      <div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <span className="inline-flex rounded-full bg-[#FFC837] px-3 py-1 text- font-black text-zinc-900">🔥 PALING LARIS</span>
            <h2 className="mt-2 text-xl md:text-2xl font-black tracking-tight text-zinc-900">Event terdekat</h2>
            <p className="mt-1 text-sm font-medium text-zinc-600">Jangan sampai kehabisan tiket</p>
          </div>
          <Link href="/event" className="shrink-0 rounded-full bg-[#FFFEF7] border-2 border-orange-100 px-4 py-2.5 text-xs font-black text-zinc-900 hover:bg-[#FFF7D6] hover:-translate-y-0.5 transition">Semua →</Link>
        </div>

        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {terdekat.map((e) => (
            <KartuEvent key={e.id} event={e} />
          ))}
        </div>
      </div>

      {/* BANNER BAWAH */}
      <div className="rounded- bg-[#FFFEF7] border-2 border-orange-100 p-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <h3 className="font-black text-zinc-900 text-lg">Udah simpan favorit? ❤️</h3>
          <p className="text-sm font-medium text-zinc-600">Cek lagi event yang kamu simpan, siapa tau udah hampir habis.</p>
        </div>
        <Link href="/favorit" className="rounded-full bg-rose-500 px-6 py-3 text-sm font-black text-white shadow-md hover:bg-rose-600 hover:-translate-y-0.5 transition">Lihat Favorit →</Link>
      </div>
    </div>
  );
}