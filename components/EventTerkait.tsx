import Link from "next/link";
import { ambilEventTerkait } from "@/data/ambil";
import type { Event } from "@/data/events";
import { rupiah } from "@/data/events";

export default async function EventTerkait({ id, kategori }: { id: number; kategori: string }) {
  const terkait: Event[] = await ambilEventTerkait(id, kategori).catch(() => []);

  if (terkait.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="inline-flex rounded-full bg-white px-4 py-1.5 text- font-black tracking-widest text-zinc-900">🎪 EVENT TERKAIT</span>
          <h2 className="mt-3 text- font-black text-white">Mungkin Kamu Juga Suka</h2>
        </div>
        <Link href="/event" className="shrink-0 rounded-full border border-white/20 bg-white/10 px-4 py-2 text- font-black text-white transition hover:bg-white hover:text-zinc-900">Semua →</Link>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {terkait.map((e: Event) => {
          const terisi = Number(e.terisi ?? 0);
          const sisa = Math.max(0, Number(e.kuota ?? 0) - terisi);
          const habis = sisa <= 0;
          return (
            <Link key={e.id} href={`/event/${e.id}`} className="group overflow-hidden rounded- border border-white/10 bg-[#1E103A]/90 shadow-lg transition hover:-translate-y-1 hover:border-white/20">
              {/* SEBELUM: bg-gradient-to-br -> SESUDAH: bg-linear-to-br, warning hilang */}
              {/* SEBELUM: h- doang -> SESUDAH: h-36 */}
              <div className="flex h-36 flex-col justify-end bg-linear-to-br from-violet-600 via-pink-500 to-orange-500 p-4">
                <span className="w-fit rounded-full bg-black/40 px-3 py-1 text- font-black text-amber-300 ring-1 ring-white/20 backdrop-blur">{e.kategori}</span>
                <p className="mt-2 text- font-black leading-tight text-white">{e.judul}</p>
              </div>
              <div className="p-4">
                <p className="text- text-white/60">📍 {e.lokasi} • 📅 {String(e.tanggal).slice(0, 10)}</p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text- font-black text-amber-300">{rupiah(e.harga)}</p>
                  <span className={`rounded-full px-3 py-1 text- font-black ${habis ? "bg-red-500 text-white" : "bg-emerald-500 text-white"}`}>{habis ? "HABIS" : `${sisa} SISA`}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}