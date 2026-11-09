// app/pesanan/page.tsx
import Link from "next/link";
import { cookies } from "next/headers";
import { pesanan } from "@/data/pesanan";
import { rupiah } from "@/data/events";
import { batalkanPesanan } from "@/app/actions";

export default async function HalamanPesanan() {
  const namaSaya = (await cookies()).get("nama")?.value ?? "";
  const totalTiket = pesanan.reduce((t, p) => t + p.jumlah, 0);
  const pendapatan = pesanan.reduce((t, p) => t + p.total, 0);

  if (pesanan.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded- bg-[#FFFBEB] border border-dashed border-orange-200 p-12 text-center">
        <p className="text-5xl">🧾</p>
        {namaSaya && <p className="mt-4 inline-flex rounded-full bg-[#DCFCE7] border border-emerald-200 px-4 py-1.5 text-sm font-black text-emerald-800">👋 Halo, {namaSaya}!</p>}
        <h2 className="mt-4 text-xl font-black text-zinc-900">Belum ada pesanan</h2>
        <p className="mt-1 text-sm font-medium text-zinc-600">Pesan tiket dulu, bakal muncul di sini</p>
        <Link href="/event" className="mt-6 inline-block rounded-full bg-[#FFC837] border-2 border-amber-300 px-6 py-2.5 text-sm font-black text-zinc-900 hover:bg-[#FFD95E] transition">Pilih event →</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="rounded- bg-[#FFFBEB] border border-orange-100 p-5 md:p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-zinc-900">Daftar Pesanan</h1>
            {namaSaya && <p className="mt-2 inline-flex rounded-full bg-[#DCFCE7] border border-emerald-200 px-3.5 py-1.5 text-xs font-black text-emerald-800">👋 Halo, {namaSaya}!</p>}
          </div>
          <Link href="/event" className="rounded-full bg-[#FFC837] border-2 border-amber-300 px-5 py-2.5 text-xs font-black text-zinc-900 shadow-sm hover:bg-[#FFD95E] transition">+ Pesan Lagi</Link>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#FFFEF7] border border-orange-100 px-3.5 py-1.5 text-xs font-black text-zinc-900">🧾 {pesanan.length} pesanan</span>
          <span className="rounded-full bg-[#FFFEF7] border border-orange-100 px-3.5 py-1.5 text-xs font-bold text-zinc-700">🎟️ {totalTiket} tiket</span>
          <span className="rounded-full bg-[#FFC837] border border-amber-300 px-3.5 py-1.5 text-xs font-black text-zinc-900">💰 {rupiah(pendapatan)}</span>
        </div>
        {namaSaya && <p className="mt-3 text-xs font-bold text-zinc-600">Pesananmu ditandai <span className="ml-1 rounded-full bg-[#DCFCE7] border border-emerald-200 px-2.5 py-0.5 text- font-black text-emerald-800">Kamu</span></p>}
      </div>

      {/* TABLE - DESKTOP */}
      <div className="mt-4 hidden md:block overflow-hidden rounded- bg-[#FFFEF7] border border-orange-100 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-[#FFFBEB] border-b border-orange-100 text-left">
            <tr>
              <th className="p-4 text- font-black tracking-wider text-zinc-500">#</th>
              <th className="p-4 text- font-black tracking-wider text-zinc-500">EVENT</th>
              <th className="p-4 text- font-black tracking-wider text-zinc-500">PEMESAN</th>
              <th className="p-4 text- font-black tracking-wider text-zinc-500 text-center">TIKET</th>
              <th className="p-4 text- font-black tracking-wider text-zinc-500 text-right">TOTAL</th>
              <th className="p-4 text- font-black tracking-wider text-zinc-500 text-right">AKSI</th>
            </tr>
          </thead>
          <tbody>
            {pesanan.map((p) => {
              const milikSaya = namaSaya !== "" && p.nama === namaSaya;
              return (
                <tr key={p.nomor} className={`border-t border-orange-50 ${milikSaya ? "bg-[#DCFCE7]/50" : "hover:bg-[#FFFBEB]"}`}>
                  <td className="p-4"><span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#FFFBEB] border border-orange-100 text-xs font-black text-zinc-900">#{p.nomor}</span></td>
                  <td className="p-4"><p className="font-black text-zinc-900">{p.judul}</p><p className="text-xs font-medium text-zinc-500">{p.waktu}</p></td>
                  <td className="p-4"><p className="font-bold text-zinc-900 flex items-center gap-2">{p.nama}{milikSaya && <span className="rounded-full bg-[#DCFCE7] border border-emerald-200 px-2.5 py-0.5 text- font-black text-emerald-800">Kamu</span>}</p><p className="text-xs font-medium text-zinc-500">{p.email}</p></td>
                  <td className="p-4 text-center"><span className="rounded-full bg-[#FFFBEB] border border-orange-100 px-3 py-1 text-xs font-black text-zinc-900">{p.jumlah} tiket</span></td>
                  <td className="p-4 text-right font-black text-zinc-900">{rupiah(p.total)}</td>
                  <td className="p-4 text-right">
                    {milikSaya && (
                      <form action={batalkanPesanan}>
                        <input type="hidden" name="nomor" value={p.nomor} />
                        <button className="rounded-full bg-[#FFE4E6] border border-red-200 px-4 py-1.5 text-xs font-black text-red-700 hover:bg-red-100 transition">Batalkan</button>
                      </form>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* CARD - MOBILE */}
      <div className="mt-4 space-y-3 md:hidden">
        {pesanan.map((p) => {
          const milikSaya = namaSaya !== "" && p.nama === namaSaya;
          return (
            <div key={p.nomor} className={`rounded-2xl border p-4 shadow-sm ${milikSaya ? "bg-[#DCFCE7]/50 border-emerald-200" : "bg-[#FFFEF7] border-orange-100"}`}>
              <div className="flex justify-between items-center gap-3">
                <p className="font-black text-sm text-zinc-900">Pesanan #{p.nomor} - {p.judul}</p>
                <span className="shrink-0 rounded-full bg-[#FFC837] border border-amber-300 px-3 py-1 text-xs font-black text-zinc-900">{rupiah(p.total)}</span>
              </div>
              <p className="mt-2 text-xs font-bold text-zinc-600 flex items-center gap-2">{p.nama}{milikSaya && <span className="rounded-full bg-[#DCFCE7] border border-emerald-200 px-2.5 py-0.5 text- font-black text-emerald-800">Kamu</span>}</p>
              <p className="mt-1 text-xs font-medium text-zinc-500">{p.jumlah} tiket • {p.waktu} • {p.email}</p>
              {milikSaya && (
                <form action={batalkanPesanan} className="mt-3">
                  <input type="hidden" name="nomor" value={p.nomor} />
                  <button className="w-full rounded-full bg-[#FFE4E6] border border-red-200 py-2.5 text-xs font-black text-red-700">Batalkan Pesanan</button>
                </form>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}