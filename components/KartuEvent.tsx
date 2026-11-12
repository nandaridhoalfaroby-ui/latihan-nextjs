import Link from "next/link";
import Image from "next/image";
import { rupiah, type Event } from "@/data/events";

export default function KartuEvent({ event }: { event: Event }) {
  // AMAN BUAT 2 SKEMA - baru (sisa/kapasitas) & lama (kuota/terisi)
  const e = event as Event & { kuota?: number; terisi?: number };
  const sisa = typeof e.sisa === "number" ? e.sisa : (e.kuota ?? 0) - (e.terisi ?? 0);
  const kapasitas = typeof e.kapasitas === "number" ? e.kapasitas : (e.kuota ?? 1);
  const terisi = kapasitas - sisa;
  const persen = kapasitas > 0 ? Math.round((terisi / kapasitas) * 100) : 0;

  const habis = sisa === 0;
  const laris = sisa > 0 && persen > 80;

  return (
    <div className={`group relative flex flex-col overflow-hidden rounded- border transition-all hover:-translate-y-1 hover:shadow-md ${
      habis 
        ? "bg-[#F3EEE2] border-orange-100 opacity-80" 
        : "bg-[#FFFEF7] border-orange-100"
    }`}>
      <div className="relative overflow-hidden">
        <Image
          src={event.gambar ?? "/img/default.png"}
          alt={event.judul}
          width={400}
          height={210}
          className="h- w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="inline-flex rounded-full bg-[#FFFEF7] border border-orange-100 px-3 py-1 text- font-black tracking-wide text-zinc-700 shadow-sm">
            {event.kategori}
          </span>
          {laris && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#FFC837] border border-amber-300 px-3 py-1 text- font-black text-zinc-900 shadow-sm">
              🔥 Laris
            </span>
          )}
          {habis && (
            <span className="inline-flex rounded-full bg-[#FFE4E6] border border-red-200 px-3 py-1 text- font-black text-red-700 shadow-sm">
              HABIS
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text- font-black leading-tight text-zinc-900 group-hover:text-amber-700 transition">
          {event.judul}
        </h3>
        <p className="mt-1.5 text-xs font-bold text-zinc-600">
          📅 {event.tanggal} <span className="mx-1 text-zinc-300">•</span> 📍 {event.lokasi}
        </p>

        <p className="mt-4 text-xl font-black text-zinc-900">{rupiah(event.harga)}</p>

        <div className="mt-3">
          <div className="flex items-center justify-between text- font-bold">
            <span className={habis ? "text-red-700" : "text-emerald-700"}>
              {habis ? "Tiket habis" : `Sisa ${sisa} dari ${kapasitas} tiket`}
            </span>
            <span className="text-zinc-500">{persen}% terisi</span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-[#FFFBEB] border border-orange-100">
            <div 
              className={`h-full rounded-full transition-all ${habis ? "bg-red-300" : laris ? "bg-[#FFC837]" : "bg-emerald-400"}`}
              style={{ width: `${persen}%` }}
            />
          </div>
        </div>

        <Link
          href={`/event/${event.id}`}
          className={`mt-5 block text-center rounded-full py-2.5 text-sm font-black transition-all ${
            habis
              ? "bg-[#E9E2CE] border border-orange-100 text-zinc-500"
              : "bg-[#FFC837] border-2 border-amber-300 text-zinc-900 shadow-sm hover:bg-[#FFD95E]"
          }`}
        >
          Lihat Detail →
        </Link>
      </div>
    </div>
  );
}