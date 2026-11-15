import Link from "next/link";
import Image from "next/image";
import { ambilTerkait } from "@/data/ambil";
import type { Event } from "@/data/events";
import { rupiah } from "@/data/events";

function warnaKategori(kategori: string) {
  const k = kategori.toLowerCase();
  if (k.includes("musik") || k.includes("konser")) return "bg-pink-500 text-white";
  if (k.includes("workshop") || k.includes("kelas") || k.includes("seminar")) return "bg-violet-500 text-white";
  if (k.includes("olahraga") || k.includes("sport")) return "bg-emerald-500 text-white";
  if (k.includes("seni") || k.includes("budaya")) return "bg-sky-500 text-white";
  if (k.includes("teknologi") || k.includes("tech")) return "bg-indigo-500 text-white";
  return "bg-amber-500 text-zinc-900";
}

export default async function EventTerkait({ event }: { event: Event }) {
  const terkait = await ambilTerkait(event);

  if (terkait.length === 0) {
    return (
      <div className="rounded- bg-gradient-to-br from-[#FFF7D6] to-[#FFFBEB] border-2 border-dashed border-orange-200 p-6 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[#FFFEF7] border-2 border-amber-200 text-2xl shadow-sm -rotate-3">🔍</div>
        <p className="mt-3 text-sm font-black text-zinc-900">Belum ada event terkait.</p>
        <p className="text-xs font-medium text-zinc-500">Coba cek katalog lainnya</p>
        <Link href="/event" className="mt-4 inline-flex rounded-full bg-zinc-900 px-5 py-2.5 text-xs font-black text-[#FFC837]">Jelajahi Katalog →</Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1.5 text- font-black tracking-wider text-[#FFC837]">✨ EVENT TERKAIT</span>
        <span className="grid h-6 min-w-6 place-items-center rounded-full bg-[#FFC837] px-1.5 text- font-black text-zinc-900">{terkait.length}</span>
      </div>

      <ul className="space-y-3">
        {terkait.map((e) => (
          <li key={e.id}>
            <Link
              href={`/event/${e.id}`}
              className="group flex items-center gap-3 rounded- bg-[#FFFEF7] border-2 border-orange-100 p-3 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-amber-200 transition-all"
            >
              {/* Thumbnail */}
              <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-2xl">
                <Image src={e.gambar ?? "/img/default.png"} alt={e.judul} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              </span>

              <span className="flex-1 min-w-0">
                <span className={`inline-flex rounded-full px-2.5 py-1 text- font-black tracking-wide ${warnaKategori(e.kategori)}`}>{e.kategori}</span>
                <span className="mt-1 block truncate text-sm font-black text-zinc-900 group-hover:text-orange-600 transition">
                  {e.judul}
                </span>
                <span className="mt-0.5 block truncate text- font-bold text-zinc-500">
                  📅 {e.tanggal} • 📍 {e.lokasi}
                </span>
              </span>

              <span className="shrink-0 text-right">
                <span className="block rounded-full bg-gradient-to-r from-[#FFC837] to-[#FFB020] border border-amber-300 px-3 py-1.5 text-xs font-black text-zinc-900 shadow-sm">
                  {rupiah(e.harga)}
                </span>
                <span className="mt-1.5 mx-auto grid h-6 w-6 place-items-center rounded-full bg-zinc-900 text- text-[#FFC837]">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Link href="/event" className="block text-center rounded-full bg-[#FFF7D6] border-2 border-orange-100 py-2.5 text-xs font-black text-zinc-800 hover:bg-[#FFFBEB] transition">
        Lihat Semua Event →
      </Link>
    </div>
  );
}