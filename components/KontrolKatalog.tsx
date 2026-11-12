import Link from "next/link";
import type { Saringan } from "@/data/saring";

export default function KontrolKatalog({ s, daftarKategori }: { s: Saringan; daftarKategori: string[] }) {
  return (
    <form method="GET" action="/event" className="rounded-2xl bg-[#FFFEF7] border border-orange-100 p-4">
      <div className="flex flex-wrap gap-3">
        <label className="flex flex-1 min-w- flex-col gap-1.5">
          <span className="text-xs font-black tracking-wide text-zinc-900">Cari</span>
          <input name="cari" defaultValue={s.cari} placeholder="Cari judul..." className="rounded-full bg-white border border-orange-100 px-4 py-2.5 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-amber-300 focus:ring-2 focus:ring-[#FFC837]/30" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-black tracking-wide text-zinc-900">Kategori</span>
          <select name="kategori" defaultValue={s.kategori} className="rounded-full bg-white border border-orange-100 px-4 py-2.5 text-sm font-bold text-zinc-900 outline-none focus:border-amber-300">
            {daftarKategori.map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-black tracking-wide text-zinc-900">Urut</span>
          <select name="urut" defaultValue={s.urut} className="rounded-full bg-white border border-orange-100 px-4 py-2.5 text-sm font-bold text-zinc-900 outline-none focus:border-amber-300">
            <option value="tanggal">Tanggal</option>
            <option value="harga">Harga termurah</option>
            <option value="mahal">Harga termahal</option>
            <option value="nama">Nama A-Z</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-black tracking-wide text-zinc-900">Sisa</span>
          <label className="flex h- items-center gap-2 rounded-full bg-white border border-orange-100 px-4 py-2.5 text-xs font-bold text-zinc-700 cursor-pointer">
            <input type="checkbox" name="sisa" value="1" defaultChecked={s.sisa} className="accent-amber-500 h-4 w-4" />
            Hanya yang masih ada tiket
          </label>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-black tracking-wide text-zinc-900">Max</span>
          <input name="max" type="number" min="0" defaultValue={s.max ?? ""} placeholder="Harga maks" className="w-32 rounded-full bg-white border border-orange-100 px-4 py-2.5 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-amber-300" />
        </label>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="rounded-full bg-[#FFC837] border-2 border-amber-300 px-6 py-2.5 text-sm font-black text-zinc-900 shadow-sm hover:bg-[#FFD95E] transition">Terapkan →</button>
        {(s.cari || s.kategori !== "Semua" || s.sisa || s.max !== null || s.urut !== "tanggal") && (
          <Link href="/event" className="rounded-full bg-white border border-orange-100 px-5 py-2.5 text-sm font-black text-zinc-700 hover:bg-[#FFFBEB] transition">Reset</Link>
        )}
      </div>
    </form>
  );
}