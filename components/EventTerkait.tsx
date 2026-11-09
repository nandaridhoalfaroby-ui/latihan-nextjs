import Link from "next/link";
import { ambilTerkait } from "@/data/ambil";
import type { Event } from "@/data/events";
import { rupiah } from "@/data/events";

export default async function EventTerkait({ event }: { event: Event }) {
  const terkait = await ambilTerkait(event);
  
  if (terkait.length === 0) {
    return (
      <div className="rounded-2xl bg-[#FFFBEB] border border-dashed border-orange-200 p-5 text-center">
        <p className="text-2xl">🔍</p>
        <p className="mt-2 text-sm font-bold text-zinc-600">Belum ada event terkait.</p>
        <p className="text-xs font-medium text-zinc-500">Coba cek katalog lainnya</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text- font-bold tracking-widest text-zinc-500">EVENT TERKAIT • {terkait.length}</p>
      <ul className="space-y-2">
        {terkait.map((e) => (
          <li key={e.id}>
            <Link 
              href={`/event/${e.id}`} 
              className="group flex items-center justify-between gap-3 rounded-2xl bg-[#FFFEF7] border border-orange-100 px-4 py-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-black text-zinc-900 group-hover:text-amber-700 transition">
                  {e.judul}
                </p>
                <p className="mt-0.5 text-xs font-bold text-zinc-500">
                  {e.kategori} • 📅 {e.tanggal}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-[#FFC837] border border-amber-300 px-3 py-1 text-xs font-black text-zinc-900">
                {rupiah(e.harga)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}