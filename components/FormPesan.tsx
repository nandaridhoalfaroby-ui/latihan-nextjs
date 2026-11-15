"use client";
import { useActionState, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { pesanTiket } from "@/app/actions";
import type { Event } from "@/data/events";
import { rupiah } from "@/data/events";

export default function FormPesan({ event, namaAwal }: { event: Event; namaAwal: string }) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(pesanTiket, {
    berhasil: false, pesan: "", galat: { nama: "", email: "", jumlah: "" },
  });
  const [jumlah, setJumlah] = useState(1);
  const [nama, setNama] = useState(namaAwal);

  useEffect(() => {
    if (state.berhasil) router.refresh();
  }, [state.berhasil, router]);

  if (event.sisa === 0) {
    return (
      <div className="mt-6 overflow-hidden rounded- bg-[#FFE4E6] border-2 border-red-200 text-center shadow-sm">
        <div className="bg-gradient-to-r from-red-400 to-rose-400 py-4">
          <p className="text-3xl">😥</p>
        </div>
        <div className="p-5">
          <p className="font-black text-red-700">Tiket sudah habis.</p>
          <p className="mt-1 text-xs font-medium text-red-600/80">Coba cek event lain yang masih tersedia.</p>
        </div>
      </div>
    );
  }

  const inputCls = "w-full rounded-xl bg-[#FFFEF7] border-2 border-orange-100 px-4 py-3 text-sm font-bold text-zinc-900 placeholder:text-zinc-400 placeholder:font-medium outline-none focus:border-[#FFC837] focus:ring-2 focus:ring-amber-200 transition";
  const labelCls = "mb-1.5 block text- font-black tracking-widest text-zinc-500";

  return (
    <form action={formAction} className="mt-6 overflow-hidden rounded- border-2 border-orange-100 bg-[#FFFBEB] shadow-sm">
      {/* HEADER FORM - GRADIENT */}
      <div className="relative bg-gradient-to-r from-[#FFC837] via-[#FFB020] to-[#FF7A18] px-6 py-5">
        <div className="absolute -right-4 -top-6 h-20 w-20 rounded-full bg-white/20" />
        <div className="relative flex items-center justify-between">
          <div>
            <span className="inline-flex rounded-full bg-zinc-900 px-3 py-1 text- font-black tracking-widest text-[#FFC837]">🎟️ PESAN TIKET</span>
            <h2 className="mt-2 text-lg font-black tracking-tight text-zinc-900">Pesan tiket</h2>
          </div>
          <span className="shrink-0 rounded-full bg-[#DCFCE7] border-2 border-emerald-200 px-3 py-1.5 text- font-black text-emerald-800 shadow-sm">● Sisa {event.sisa} tiket</span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {namaAwal && (
          <p className="rounded-xl bg-[#FFFEF7] border-2 border-orange-100 px-4 py-3 text-xs font-bold text-zinc-700">
            👋 Halo <span className="font-black text-zinc-900">{namaAwal}</span>, selamat datang kembali!
          </p>
        )}

        <input type="hidden" name="eventId" value={event.id} />

        <div>
          <label className={labelCls}>👤 NAMA PEMESAN</label>
          <input name="nama" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama pemesan" className={inputCls} />
          {state.galat.nama && <p className="mt-1.5 rounded-lg bg-[#FFE4E6] border border-red-200 px-3 py-2 text-xs font-bold text-red-700">⚠️ {state.galat.nama}</p>}
        </div>

        <div>
          <label className={labelCls}>📧 EMAIL PEMESAN</label>
          <input name="email" placeholder="Email pemesan" className={inputCls} />
          {state.galat.email && <p className="mt-1.5 rounded-lg bg-[#FFE4E6] border border-red-200 px-3 py-2 text-xs font-bold text-red-700">⚠️ {state.galat.email}</p>}
        </div>

        <div>
          <label className={labelCls}>🎟️ JUMLAH TIKET</label>
          <div className="flex items-center gap-3 rounded-2xl bg-[#FFFEF7] border-2 border-orange-100 p-1.5">
            <button type="button" onClick={() => setJumlah(v => Math.max(1, v - 1))} className="h-11 w-11 shrink-0 rounded-full bg-gradient-to-br from-[#FFC837] to-[#FFB020] border border-amber-300 grid place-items-center text-lg font-black text-zinc-900 shadow-sm hover:scale-105 active:scale-95 transition">−</button>
            <input name="jumlah" type="number" value={jumlah} min={1} max={event.sisa} onChange={(e) => setJumlah(Number(e.target.value))} className="w-full bg-transparent text-center text-xl font-black text-zinc-900 outline-none" />
            <button type="button" onClick={() => setJumlah(v => Math.min(event.sisa, v + 1))} className="h-11 w-11 shrink-0 rounded-full bg-gradient-to-br from-[#FFC837] to-[#FFB020] border border-amber-300 grid place-items-center text-lg font-black text-zinc-900 shadow-sm hover:scale-105 active:scale-95 transition">+</button>
          </div>
          <p className="mt-1.5 text- font-bold text-zinc-500">Maks {event.sisa} tiket • {rupiah(event.harga)} / tiket</p>
          {state.galat.jumlah && <p className="mt-1.5 rounded-lg bg-[#FFE4E6] border border-red-200 px-3 py-2 text-xs font-bold text-red-700">⚠️ {state.galat.jumlah}</p>}
        </div>

        {/* TOTAL - HITAM PREMIUM */}
        <div className="flex items-center justify-between rounded-2xl bg-zinc-900 px-5 py-4 shadow-lg">
          <span className="text-sm font-bold text-zinc-300">Total bayar</span>
          <span className="text-xl font-black text-[#FFC837]">{rupiah(event.harga * jumlah)}</span>
        </div>

        {state.pesan && <p className={`rounded-xl border-2 px-4 py-3 text-sm font-bold ${state.berhasil ? "bg-[#DCFCE7] border-emerald-200 text-emerald-800" : "bg-[#FFE4E6] border-red-200 text-red-700"}`}>{state.pesan}</p>}

        <button disabled={isPending} className="flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-4 py-4 text-sm font-black text-[#FFC837] shadow-lg hover:bg-zinc-800 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0">
          {isPending ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#FFC837] border-t-transparent" />
              Memproses...
            </>
          ) : (
            <>
              Pesan Sekarang
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#FFC837] text- text-zinc-900">→</span>
            </>
          )}
        </button>
        <p className="text-center text- font-bold text-zinc-400">🔒 Pesananmu aman & langsung tercatat</p>
      </div>
    </form>
  );
}