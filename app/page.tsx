import Link from "next/link";
import { events } from "@/data/events";
import KartuEvent from "@/components/KartuEvent";

export default function Beranda() {
  const terdekat = events.slice(0, 3);
  const totalEvent = events.length;
  const totalTiket = events.reduce((s, e) => s + (e.kuota - e.terisi), 0);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden rounded- bg-[#FFFBEB] border border-orange-100 px-6 py-12 md:py-16 text-center shadow-sm">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-[#FFC837]/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-orange-200/40 blur-3xl" />
        <div className="absolute -bottom-24 -right-10 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl" />

        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFFEF7] border border-orange-100 px-3.5 py-1.5 text- font-black tracking-wider text-zinc-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            {totalEvent} EVENT AKTIF • {totalTiket} TIKET TERSISA
          </span>

          <h1 className="mx-auto mt-5 max-w-2xl text-4xl md:text-5xl font-black tracking-tight leading-[1.05] text-zinc-900">
            Temukan event seru<br />di sekolahmu
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm md:text-base font-medium leading-relaxed text-zinc-600">
            Workshop, lomba, musik, dan bazar. Pesan tiketnya di sini, gak perlu antri.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/event"
              className="inline-flex items-center rounded-full bg-[#FFC837] border-2 border-amber-300 px-7 py-3 text-sm font-black text-zinc-900 shadow-md hover:bg-[#FFD95E] hover:-translate-y-0.5 transition-all"
            >
              Lihat semua event →
            </Link>
            <Link
              href="/favorit"
              className="inline-flex items-center rounded-full bg-[#FFFEF7] border border-orange-100 px-7 py-3 text-sm font-black text-zinc-900 hover:bg-white transition"
            >
              ♡ Favoritku
            </Link>
          </div>

          <p className="mt-6 text-xs font-bold text-zinc-500">
            🎟️ 200+ siswa udah pesan minggu ini
          </p>
        </div>
      </section>

      {/* EVENT TERDEKAT */}
      <div className="mt-10 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-black tracking-tight text-zinc-900">Event terdekat</h2>
          <p className="mt-1 text-sm font-medium text-zinc-600">Jangan sampai kehabisan tiket</p>
        </div>
        <Link href="/event" className="shrink-0 rounded-full bg-[#FFFEF7] border border-orange-100 px-4 py-2 text-xs font-black text-zinc-900 hover:bg-[#FFFBEB] transition">
          Semua →
        </Link>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {terdekat.map((e) => (
          <KartuEvent key={e.id} event={e} />
        ))}
      </div>
    </div>
  );
}