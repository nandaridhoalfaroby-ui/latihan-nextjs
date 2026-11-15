import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
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
      <div className="overflow-hidden rounded- bg-[#FFFBEB] border-2 border-orange-100 shadow-sm">
        <div className="bg-gradient-to-r from-[#FFC837] via-[#FFB020] to-[#FF7A18] px-6 py-8 md:py-10 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded- bg-[#FFFEF7] border-2 border-amber-200 text-4xl shadow-lg rotate-3">🧾</div>
          <h1 className="mt-4 text-2xl md:text-3xl font-black text-zinc-900">Daftar Pesanan</h1>
          <p className="mt-1 text-sm font-bold text-zinc-700/80">Semua pesananmu bakal muncul di sini</p>
        </div>
        <div className="p-8 md:p-10 text-center">
          <p className="text-sm font-bold text-zinc-600">Belum ada pesanan. Pilih event dulu.</p>
          <Link href="/event" className="mt-6 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-black text-[#FFC837] shadow-lg hover:-translate-y-0.5 transition">
            Cari Event
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#FFC837] text- text-zinc-900">→</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* HEADER BANNER */}
      <div className="relative overflow-hidden rounded- bg-gradient-to-r from-[#FFC837] via-[#FFB020] to-[#FF7A18] border-2 border-amber-300 p-6 md:p-8 shadow-[0_12px_30px_rgba(255,122,24,0.25)]">
        <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-white/20" />
        <div className="absolute -right-2 top-16 h-20 w-20 rounded-full bg-[#FFFEF7]/40" />
        <div className="relative">
          <span className="inline-flex rounded-full bg-zinc-900 px-3 py-1.5 text- font-black text-[#FFC837]">🧾 DAFTAR PESANAN</span>
          <h1 className="mt-3 text-2xl md:text-3xl font-black tracking-tight text-zinc-900">Daftar Pesanan</h1>
          {namaSaya ? (
            <p className="mt-1.5 text-sm font-bold text-zinc-800/85">Halo, <span className="font-black text-zinc-900">{namaSaya}</span>! Ini semua pesanan yang tercatat.</p>
          ) : (
            <p className="mt-1.5 text-sm font-bold text-zinc-800/85">Ini semua pesanan yang tercatat di EventKu.</p>
          )}
        </div>
      </div>

      {/* STATISTIK */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <div className="rounded- bg-[#FFFEF7] border-2 border-orange-100 p-4 md:p-5 text-center shadow-sm hover:-translate-y-1 transition">
          <p className="text-xl md:text-2xl">📦</p>
          <p className="mt-1 text-xl md:text-2xl font-black text-zinc-900">{pesanan.length}</p>
          <p className="text- font-black text-zinc-500">PESANAN</p>
        </div>
        <div className="rounded- bg-[#F0FDF4] border-2 border-emerald-100 p-4 md:p-5 text-center shadow-sm hover:-translate-y-1 transition">
          <p className="text-xl md:text-2xl">🎟️</p>
          <p className="mt-1 text-xl md:text-2xl font-black text-emerald-700">{totalTiket}</p>
          <p className="text- font-black text-zinc-500">TIKET</p>
        </div>
        <div className="rounded- bg-[#F5F3FF] border-2 border-violet-100 p-4 md:p-5 text-center shadow-sm hover:-translate-y-1 transition">
          <p className="text-xl md:text-2xl">💰</p>
          <p className="mt-1 text-sm md:text-2xl font-black text-violet-700 leading-tight">{rupiah(pendapatan)}</p>
          <p className="text- font-black text-zinc-500">PENDAPATAN</p>
        </div>
      </div>

      {/* TABEL DESKTOP */}
      <div className="hidden md:block overflow-hidden rounded- bg-[#FFFEF7] border-2 border-orange-100 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#FFFBEB] border-b-2 border-orange-100">
                <th className="p-4 text-left text- font-black tracking-wider text-zinc-500">NOMOR</th>
                <th className="p-4 text-left text- font-black tracking-wider text-zinc-500">EVENT</th>
                <th className="p-4 text-left text- font-black tracking-wider text-zinc-500">NAMA</th>
                <th className="p-4 text-left text- font-black tracking-wider text-zinc-500">JUMLAH</th>
                <th className="p-4 text-left text- font-black tracking-wider text-zinc-500">TOTAL</th>
                <th className="p-4 text-left text- font-black tracking-wider text-zinc-500">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {pesanan.map((p) => {
                const milikSaya = p.nama === namaSaya && namaSaya !== "";
                return (
                  <tr key={p.nomor} className={`border-b border-orange-100 last:border-0 hover:bg-[#FFFBEB]/60 transition ${milikSaya ? "bg-[#DCFCE7]/60" : ""}`}>
                    <td className="p-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text- font-black ${milikSaya ? "bg-emerald-500 text-white" : "bg-[#FFF7D6] border border-orange-100 text-zinc-800"}`}>#{p.nomor}</span>
                    </td>
                    <td className="p-4 font-bold text-zinc-900">
                      {p.judul}
                      {milikSaya && <span className="ml-2 rounded-full bg-emerald-500 px-2.5 py-1 text- font-black text-white">✦ Kamu</span>}
                    </td>
                    <td className="p-4 font-medium text-zinc-600">{p.nama}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-3 py-1 text-xs font-black text-violet-700">🎟️ {p.jumlah} tiket</span>
                    </td>
                    <td className="p-4 font-black text-zinc-900">{rupiah(p.total)}</td>
                    <td className="p-4">
                      {milikSaya ? (
                        <form action={batalkanPesanan}>
                          <input type="hidden" name="nomor" value={p.nomor} />
                          <button className="rounded-full bg-rose-500 px-4 py-2 text-xs font-black text-white shadow-md hover:bg-rose-600 hover:-translate-y-0.5 transition">Batalkan ✕</button>
                        </form>
                      ) : (
                        <span className="text-xs font-bold text-zinc-400">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* KARTU MOBILE - biar gak kepotong di HP */}
      <div className="md:hidden space-y-3">
        {pesanan.map((p) => {
          const milikSaya = p.nama === namaSaya && namaSaya !== "";
          return (
            <div key={p.nomor} className={`rounded- border-2 p-5 shadow-sm ${milikSaya ? "bg-[#DCFCE7]/60 border-emerald-200" : "bg-[#FFFEF7] border-orange-100"}`}>
              <div className="flex items-center justify-between">
                <span className={`rounded-full px-3 py-1 text- font-black ${milikSaya ? "bg-emerald-500 text-white" : "bg-[#FFF7D6] border border-orange-100 text-zinc-800"}`}>#{p.nomor}</span>
                {milikSaya && <span className="rounded-full bg-emerald-500 px-2.5 py-1 text- font-black text-white">✦ Kamu</span>}
              </div>
              <h3 className="mt-3 font-black text-zinc-900 leading-tight">{p.judul}</h3>
              <p className="mt-1 text-xs font-bold text-zinc-600">👤 {p.nama} • 🎟️ {p.jumlah} tiket</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text- font-black text-zinc-900">{rupiah(p.total)}</span>
                {milikSaya && (
                  <form action={batalkanPesanan}>
                    <input type="hidden" name="nomor" value={p.nomor} />
                    <button className="rounded-full bg-rose-500 px-4 py-2 text-xs font-black text-white shadow-md">Batalkan ✕</button>
                  </form>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}