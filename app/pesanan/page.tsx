import type { Metadata } from "next";
import { cookies } from "next/headers";
import { pesanan } from "@/data/pesanan";
import { rupiah } from "@/data/events";
import { batalkanPesanan } from "@/app/actions";

export const metadata: Metadata = { title: "Daftar Pesanan" };

export default async function PesananPage() {
  const namaSaya = (await cookies()).get("nama")?.value ?? "";
  const totalTiket = pesanan.reduce((a, p) => a + p.jumlah, 0);
  const pendapatan = pesanan.reduce((a, p) => a + p.total, 0);

  if (pesanan.length === 0) {
    return (
      <div className="rounded- bg-[#FFFBEB] border border-orange-100 p-8 md:p-10 text-center shadow-sm">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#FFFEF7] border border-orange-100 text-3xl">🧾</div>
        <h1 className="mt-4 text-2xl font-black tracking-tight text-zinc-900">Daftar Pesanan</h1>
        <p className="mt-2 text-sm font-medium text-zinc-600">Belum ada pesanan. Pilih event dulu.</p>
      </div>
    );
  }

  return (
    <div className="rounded- bg-[#FFFBEB] border border-orange-100 p-6 md:p-8 shadow-sm">
      <h1 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900">Daftar Pesanan</h1>
      {namaSaya && <p className="mt-1 text-sm font-bold text-zinc-600">Halo, <span className="font-black text-zinc-900">{namaSaya}</span>!</p>}
      <p className="mt-2 inline-flex rounded-full bg-[#FFFEF7] border border-orange-100 px-3 py-1 text-xs font-bold text-zinc-600">
        {pesanan.length} pesanan • {totalTiket} tiket • pendapatan {rupiah(pendapatan)}
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-orange-100 bg-[#FFFEF7]">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[#FFFBEB] border-b border-orange-100">
              <th className="p-3 text-left text-xs font-black text-zinc-900">Nomor</th>
              <th className="p-3 text-left text-xs font-black text-zinc-900">Event</th>
              <th className="p-3 text-left text-xs font-black text-zinc-900">Nama</th>
              <th className="p-3 text-left text-xs font-black text-zinc-900">Jumlah</th>
              <th className="p-3 text-left text-xs font-black text-zinc-900">Total</th>
              <th className="p-3 text-left text-xs font-black text-zinc-900">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {pesanan.map((p) => {
              const milikSaya = p.nama === namaSaya && namaSaya !== "";
              return (
                <tr key={p.nomor} className={`border-b border-orange-100 last:border-0 ${milikSaya ? "bg-[#DCFCE7]/50" : ""}`}>
                  <td className="p-3 font-bold text-zinc-900">#{p.nomor}</td>
                  <td className="p-3 font-bold text-zinc-900">
                    {p.judul} {milikSaya && <span className="ml-1 rounded-full bg-[#DCFCE7] border border-emerald-200 px-2 py-0.5 text- font-black text-emerald-800">Kamu</span>}
                  </td>
                  <td className="p-3 font-medium text-zinc-600">{p.nama}</td>
                  <td className="p-3 font-bold text-zinc-900">{p.jumlah}</td>
                  <td className="p-3 font-black text-zinc-900">{rupiah(p.total)}</td>
                  <td className="p-3">
                    {milikSaya && (
                      <form action={batalkanPesanan}>
                        <input type="hidden" name="nomor" value={p.nomor} />
                        <button className="rounded-full bg-[#FFE4E6] border border-red-200 px-3 py-1.5 text-xs font-black text-red-700 hover:bg-[#FECDD3] transition">Batalkan</button>
                      </form>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}