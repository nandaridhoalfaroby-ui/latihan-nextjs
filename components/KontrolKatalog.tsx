import Link from "next/link";
import type { Saringan } from "@/data/saring";

const chips = ["Semua", "Workshop", "Musik", "Olahraga", "Seni", "Teknologi"];

export default function KontrolKatalog({ s, daftarKategori }: { s: Saringan; daftarKategori: string[] }) {
  const adaFilter = s.cari || s.kategori !== "Semua" || s.sisa || s.max !== null || s.urut !== "tanggal";

  return (
    <form method="GET" action="/event" className="overflow-hidden rounded- bg-[#FFFEF7] border-2 border-orange-100 shadow-sm">
      {/* HEADER FILTER */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#FFC837] via-[#FFB020] to-[#FF7A18] px-5 py-3.5">
        <span className="flex items-center gap-2 text-sm font-black text-zinc-900">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-zinc-900 text- text-[#FFC837]">🔍</span>
          Cari & Filter Event
        </span>
        {adaFilter && (
          <span className="rounded-full bg-zinc-900 px-3 py-1 text- font-black text-[#FFC837]">● FILTER AKTIF</span>
        )}
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-3">
          {/* CARI */}
          <label className="flex flex-1 min-w- flex-col gap-1.5">
            <span className="text- font-black tracking-wider text-zinc-500">🔍 CARI</span>
            <input name="cari" defaultValue={s.cari} placeholder="Cari judul / lokasi..." className="rounded-full bg-[#FFFBEB] border-2 border-orange-100 px-4 py-2.5 text-sm font-bold text-zinc-900 placeholder:text-zinc-400 placeholder:font-medium outline-none focus:border-[#FFC837] focus:ring-2 focus:ring-amber-200 transition" />
          </label>

          {/* KATEGORI */}
          <label className="flex flex-col gap-1.5">
            <span className="text- font-black tracking-wider text-zinc-500">🎪 KATEGORI</span>
            <select name="kategori" defaultValue={s.kategori} className="rounded-full bg-[#FFFBEB] border-2 border-orange-100 px-4 py-2.5 text-sm font-bold text-zinc-900 outline-none focus:border-[#FFC837] focus:ring-2 focus:ring-amber-200 transition cursor-pointer">
              {daftarKategori.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </label>

          {/* URUT */}
          <label className="flex flex-col gap-1.5">
            <span className="text- font-black tracking-wider text-zinc-500">↕️ URUT</span>
            <select name="urut" defaultValue={s.urut} className="rounded-full bg-[#FFFBEB] border-2 border-orange-100 px-4 py-2.5 text-sm font-bold text-zinc-900 outline-none focus:border-[#FFC837] focus:ring-2 focus:ring-amber-200 transition cursor-pointer">
              <option value="tanggal">📅 Tanggal</option>
              <option value="harga">💰 Harga termurah</option>
              <option value="mahal">💎 Harga termahal</option>
              <option value="nama">🔤 Nama A-Z</option>
            </select>
          </label>

          {/* MAX HARGA */}
          <label className="flex flex-col gap-1.5">
            <span className="text- font-black tracking-wider text-zinc-500">💰 HARGA MAKS</span>
            <input name="max" type="number" min="0" defaultValue={s.max ?? ""} placeholder="Cth: 50000" className="w-36 rounded-full bg-[#FFFBEB] border-2 border-orange-100 px-4 py-2.5 text-sm font-bold text-zinc-900 placeholder:text-zinc-400 placeholder:font-medium outline-none focus:border-[#FFC837] focus:ring-2 focus:ring-amber-200 transition" />
          </label>

          {/* SISA - TOGGLE KAPSUL */}
          <label className="flex flex-col gap-1.5">
            <span className="text- font-black tracking-wider text-zinc-500">🎟️ SISA</span>
            <label className={`flex h- items-center gap-2 rounded-full border-2 px-4 py-2.5 text-xs font-black cursor-pointer transition ${s.sisa ? "bg-[#DCFCE7] border-emerald-200 text-emerald-800" : "bg-[#FFFBEB] border-orange-100 text-zinc-600"}`}>
              <input type="checkbox" name="sisa" value="1" defaultChecked={s.sisa} className="accent-emerald-500 h-4 w-4" />
              {s.sisa ? "● Ada tiket" : "○ Ada tiket"}
            </label>
          </label>
        </div>

        {/* QUICK CHIPS KATEGORI */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text- font-black tracking-wider text-zinc-400 py-2">CEPAT:</span>
          {chips.map((c) => {
            const aktif = s.kategori === c || (c === "Semua" && (s.kategori === "Semua" || s.kategori === ""));
            return (
              <Link
                key={c}
                href={`/event?kategori=${c === "Semua" ? "" : c}${s.cari ? `&cari=${s.cari}` : ""}${s.urut ? `&urut=${s.urut}` : ""}`}
                className={`rounded-full px-3.5 py-2 text-xs font-black transition hover:-translate-y-0.5 ${
                  aktif
                    ? "bg-zinc-900 text-[#FFC837] shadow-md"
                    : "bg-[#FFF7D6] border-2 border-orange-100 text-zinc-700 hover:bg-[#FFFBEB]"
                }`}
              >
                {c}
              </Link>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap gap-2 border-t border-orange-100 pt-4">
          <button className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-black text-[#FFC837] shadow-md hover:bg-zinc-800 hover:-translate-y-0.5 transition-all">
            Terapkan
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#FFC837] text- text-zinc-900">→</span>
          </button>
          {adaFilter && (
            <Link href="/event" className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF7D6] border-2 border-orange-100 px-5 py-3 text-sm font-black text-zinc-700 hover:bg-[#FFFBEB] transition">↺ Reset Filter</Link>
          )}
          <span className="ml-auto self-center text- font-bold text-zinc-400 hidden md:block">Tip: tekan Terapkan setelah ubah filter ✨</span>
        </div>
      </div>
    </form>
  );
}