import Link from "next/link";
import Image from "next/image";
import { rupiah, type Event } from "@/data/events";

function warnaKategori(kategori: string) {
  const k = kategori.toLowerCase();
  if (k.includes("musik") || k.includes("konser")) return "bg-pink-500 text-white shadow-[0_4px_14px_rgba(236,72,153,0.4)]";
  if (k.includes("workshop") || k.includes("kelas") || k.includes("seminar")) return "bg-violet-500 text-white shadow-[0_4px_14px_rgba(139,92,246,0.4)]";
  if (k.includes("olahraga") || k.includes("sport")) return "bg-emerald-500 text-white shadow-[0_4px_14px_rgba(16,185,129,0.4)]";
  if (k.includes("seni") || k.includes("budaya")) return "bg-sky-500 text-white shadow-[0_4px_14px_rgba(14,165,233,0.4)]";
  if (k.includes("teknologi") || k.includes("tech")) return "bg-indigo-500 text-white shadow-[0_4px_14px_rgba(99,102,241,0.4)]";
  return "bg-amber-500 text-zinc-900 shadow-[0_4px_14px_rgba(245,158,11,0.4)]";
}

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
    <div
      className={`group relative flex flex-col overflow-hidden rounded- border-2 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(251,146,60,0.22)] ${
        habis
          ? "bg-[#F3EEE2] border-orange-100 opacity-80"
          : "bg-[#FFFEF7] border-orange-100 shadow-[0_6px_24px_rgba(251,146,60,0.10)]"
      }`}
    >
      {/* GAMBAR */}
      <div className="relative overflow-hidden">
        <Image
          src={event.gambar ?? "/img/default.png"}
          alt={event.judul}
          width={400}
          height={210}
          className={`h- w-full object-cover transition-transform duration-700 group-hover:scale-110 ${habis ? "grayscale" : ""}`}
        />
        {/* Overlay gradient biar teks badge kebaca */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />

        {/* BADGE ATAS */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className={`inline-flex rounded-full px-3 py-1.5 text- font-black tracking-wide ${warnaKategori(event.kategori)}`}>
            {event.kategori}
          </span>
          {laris && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#FFC837] to-[#FF7A18] px-3 py-1.5 text- font-black text-zinc-900 shadow-[0_4px_14px_rgba(255,122,24,0.45)]">
              🔥 Laris
            </span>
          )}
          {habis && (
            <span className="inline-flex rounded-full bg-red-500 px-3 py-1.5 text- font-black text-white shadow-md">
              HABIS
            </span>
          )}
        </div>

        {/* HARGA MELAYANG */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div className="rounded-2xl bg-[#FFFEF7]/95 backdrop-blur px-3.5 py-2 shadow-lg border border-orange-100">
            <p className="text- font-black tracking-widest text-orange-600">HARGA TIKET</p>
            <p className="text- font-black leading-none text-zinc-900">{rupiah(event.harga)}</p>
          </div>
          <span className="rounded-full bg-zinc-900/80 backdrop-blur px-3 py-1.5 text- font-bold text-white">
            📅 {event.tanggal}
          </span>
        </div>
      </div>

      {/* ISI */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text- font-black leading-tight text-zinc-900 group-hover:text-orange-600 transition line-clamp-2 min-h-">
          {event.judul}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-zinc-600">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#FFF7D6] border border-orange-100 text-">📍</span>
          <span className="line-clamp-1">{event.lokasi}</span>
        </p>

        {/* PROGRESS TIKET */}
        <div className="mt-4 rounded-2xl bg-[#FFFBEB] border border-orange-100 p-3">
          <div className="flex items-center justify-between text- font-black">
            <span className={habis ? "text-red-600" : laris ? "text-orange-600" : "text-emerald-600"}>
              {habis ? "● Tiket habis" : laris ? "● Hampir habis!" : "● Tiket tersedia"}
            </span>
            <span className="text-zinc-500">{persen}% terisi</span>
          </div>
          <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white border border-orange-100 shadow-inner">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                habis
                  ? "bg-gradient-to-r from-red-400 to-red-500"
                  : laris
                  ? "bg-gradient-to-r from-[#FFC837] to-[#FF7A18]"
                  : "bg-gradient-to-r from-emerald-400 to-teal-500"
              }`}
              style={{ width: `${persen}%` }}
            />
          </div>
          <p className="mt-1.5 text- font-bold text-zinc-600">
            {habis ? "Yah, kehabisan 😭" : `Sisa ${sisa} dari ${kapasitas} tiket`}
          </p>
        </div>

        <Link
          href={`/event/${event.id}`}
          className={`mt-4 flex items-center justify-center gap-2 rounded-full py-3 text-sm font-black transition-all ${
            habis
              ? "bg-[#E9E2CE] border-2 border-orange-100 text-zinc-500"
              : "bg-zinc-900 text-[#FFC837] shadow-[0_8px_20px_rgba(0,0,0,0.18)] hover:bg-zinc-800 hover:-translate-y-0.5"
          }`}
        >
          Lihat Detail
          <span className="grid h-5 w-5 place-items-center rounded-full bg-[#FFC837] text- text-zinc-900">→</span>
        </Link>
      </div>
    </div>
  );
}