import Link from "next/link";
import type { Metadata } from "next";
import { ambilEvents } from "@/data/ambil";
import { bacaSaringan, saringEvents, alamatKatalog, PER_HALAMAN } from "@/data/saring";
import KartuEvent from "@/components/KartuEvent";

export const metadata: Metadata = { title: "Katalog Event" };

export default async function Katalog({ searchParams }: { searchParams: Promise<{ [kunci: string]: string | string[] | undefined }> }) {
  const isi = await searchParams;
  const s = bacaSaringan(isi);
  const semua = await ambilEvents();
  const hasil = saringEvents(semua, s);

  const totalHal = Math.max(1, Math.ceil(hasil.length / PER_HALAMAN));
  const hal = Math.min(s.hal, totalHal);
  const ditampilkan = hasil.slice((hal - 1) * PER_HALAMAN, hal * PER_HALAMAN);
  const daftarKategori = ["Semua", ...new Set(semua.map((e) => e.kategori))];

  return (
    <div>
      <div className="rounded- bg-[#FFFBEB] border border-orange-100 p-6 md:p-8 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900">Katalog Event</h1>
        <p className="mt-2 text-sm font-medium text-zinc-600">Semua event sekolah, pilih yang kamu suka, pesan tiketnya langsung dari sini.</p>

        {/* Form filter - pakai GET biar masuk ke URL */}
        <form method="GET" action="/event" className="mt-6 flex flex-wrap gap-2 rounded-2xl bg-[#FFFEF7] border border-orange-100 p-4">
          <input name="cari" defaultValue={s.cari} placeholder="Cari judul..." className="flex-1 min-w- rounded-full bg-white border border-orange-100 px-4 py-2.5 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-amber-300 focus:ring-2 focus:ring-[#FFC837]/30" />
          <select name="kategori" defaultValue={s.kategori} className="rounded-full bg-white border border-orange-100 px-4 py-2.5 text-sm font-bold text-zinc-900 outline-none focus:border-amber-300">
            {daftarKategori.map((k) => (
              <option key={k} value={k}>{k}</option>
            ))}
          </select>
          <select name="urut" defaultValue={s.urut} className="rounded-full bg-white border border-orange-100 px-4 py-2.5 text-sm font-bold text-zinc-900 outline-none focus:border-amber-300">
            <option value="tanggal">Tanggal</option>
            <option value="harga">Harga termurah</option>
            <option value="nama">Nama A-Z</option>
          </select>
          <label className="flex items-center gap-2 rounded-full bg-white border border-orange-100 px-4 py-2.5 text-xs font-bold text-zinc-700 cursor-pointer">
            <input type="checkbox" name="sisa" value="1" defaultChecked={s.sisa} className="accent-amber-500 h-4 w-4" /> Hanya yang masih ada tiket
          </label>
          <input name="max" type="number" defaultValue={s.max ?? ""} placeholder="Harga maks" className="w-32 rounded-full bg-white border border-orange-100 px-4 py-2.5 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-amber-300" />
          <button className="rounded-full bg-[#FFC837] border-2 border-amber-300 px-6 py-2.5 text-sm font-black text-zinc-900 shadow-sm hover:bg-[#FFD95E] transition">Saring →</button>
          {(s.cari || s.kategori !== "Semua" || s.sisa || s.max !== null || s.urut !== "tanggal") && (
            <Link href="/event" className="rounded-full bg-[#FFFEF7] border border-orange-100 px-5 py-2.5 text-sm font-black text-zinc-700 hover:bg-white transition">Reset</Link>
          )}
        </form>

        <p className="mt-4 inline-flex rounded-full bg-[#FFFEF7] border border-orange-100 px-3 py-1 text-xs font-bold text-zinc-600">{hasil.length} event ditemukan.</p>
      </div>

      {ditampilkan.length === 0 ? (
        <div className="mt-6 rounded- bg-[#FFFBEB] border border-orange-100 p-8 md:p-10 text-center shadow-sm">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#FFFEF7] border border-orange-100 text-3xl">🔍</div>
          <h2 className="mt-4 text-lg font-black text-zinc-900">Event tidak ditemukan.</h2>
          <p className="mt-1 text-sm font-medium text-zinc-600">Coba ubah kata kunci atau reset filter di atas.</p>
          <Link href="/event" className="mt-5 inline-block rounded-full bg-[#FFC837] border-2 border-amber-300 px-6 py-2.5 text-sm font-black text-zinc-900 hover:bg-[#FFD95E] transition">Lihat Semua Event</Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ditampilkan.map((e) => <KartuEvent key={e.id} event={e} />)}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {hal > 1 && <Link href={alamatKatalog(s, hal - 1)} className="rounded-full bg-[#FFFEF7] border border-orange-100 px-4 py-2 text-sm font-black text-zinc-900 hover:bg-white transition">← Sebelumnya</Link>}
        <span className="rounded-full bg-[#FFFBEB] border border-orange-100 px-4 py-2 text-sm font-bold text-zinc-600">Halaman {hal} dari {totalHal}</span>
        {hal < totalHal && <Link href={alamatKatalog(s, hal + 1)} className="rounded-full bg-[#FFC837] border-2 border-amber-300 px-4 py-2 text-sm font-black text-zinc-900 hover:bg-[#FFD95E] transition">Berikutnya →</Link>}
      </div>
    </div>
  );
}