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
      <div className="mt-6 rounded- bg-[#FFE4E6] border border-red-200 p-5 text-center">
        <p className="text-2xl">😥</p>
        <p className="mt-2 font-black text-red-700">Tiket sudah habis.</p>
      </div>
    );
  }

  const inputCls = "w-full rounded-xl bg-[#FFFEF7] border border-orange-100 px-4 py-3 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-amber-300 focus:ring-2 focus:ring-[#FFC837]/40 transition";
  const labelCls = "mb-1.5 block text- font-bold tracking-widest text-zinc-500";

  return (
    <form action={formAction} className="mt-6 space-y-4 rounded- border border-orange-100 bg-[#FFFBEB] p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black tracking-tight text-zinc-900">Pesan tiket</h2>
        <span className="rounded-full bg-[#DCFCE7] border border-emerald-200 px-3 py-1 text- font-black text-emerald-800">Sisa {event.sisa} tiket</span>
      </div>

      {namaAwal && (
        <p className="rounded-xl bg-[#FFFEF7] border border-orange-100 px-4 py-2.5 text-xs font-bold text-zinc-700">
          👋 Halo <span className="font-black text-zinc-900">{namaAwal}</span>, selamat datang kembali!
        </p>
      )}

      <input type="hidden" name="eventId" value={event.id} />
      <div>
        <label className={labelCls}>NAMA PEMESAN</label>
        <input name="nama" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama pemesan" className={inputCls} />
        {state.galat.nama && <p className="mt-1.5 rounded-lg bg-[#FFE4E6] border border-red-200 px-3 py-2 text-xs font-bold text-red-700">{state.galat.nama}</p>}
      </div>
      <div>
        <label className={labelCls}>EMAIL PEMESAN</label>
        <input name="email" placeholder="Email pemesan" className={inputCls} />
        {state.galat.email && <p className="mt-1.5 rounded-lg bg-[#FFE4E6] border border-red-200 px-3 py-2 text-xs font-bold text-red-700">{state.galat.email}</p>}
      </div>
      <div>
        <label className={labelCls}>JUMLAH TIKET</label>
        <div className="flex items-center gap-3 rounded-xl bg-[#FFFEF7] border border-orange-100 p-1.5">
          <button type="button" onClick={() => setJumlah(v => Math.max(1, v-1))} className="h-10 w-10 shrink-0 rounded-full bg-[#FFFBEB] border border-orange-100 grid place-items-center font-black text-zinc-900">−</button>
          <input name="jumlah" type="number" value={jumlah} min={1} max={event.sisa} onChange={(e) => setJumlah(Number(e.target.value))} className="w-full bg-transparent text-center text-base font-black text-zinc-900 outline-none" />
          <button type="button" onClick={() => setJumlah(v => Math.min(event.sisa, v+1))} className="h-10 w-10 shrink-0 rounded-full bg-[#FFFBEB] border border-orange-100 grid place-items-center font-black text-zinc-900">+</button>
        </div>
        {state.galat.jumlah && <p className="mt-1.5 rounded-lg bg-[#FFE4E6] border border-red-200 px-3 py-2 text-xs font-bold text-red-700">{state.galat.jumlah}</p>}
      </div>
      <div className="flex items-center justify-between rounded-2xl bg-[#FFFEF7] border border-orange-100 px-4 py-3">
        <span className="text-sm font-bold text-zinc-600">Total</span>
        <span className="text-lg font-black text-zinc-900">{rupiah(event.harga * jumlah)}</span>
      </div>
      {state.pesan && <p className={`rounded-xl border px-4 py-3 text-sm font-bold ${state.berhasil ? "bg-[#DCFCE7] border-emerald-200 text-emerald-800" : "bg-[#FFE4E6] border-red-200 text-red-700"}`}>{state.pesan}</p>}
      <button disabled={isPending} className="w-full rounded-full bg-[#FFC837] border-2 border-amber-300 px-4 py-3.5 text-sm font-black text-zinc-900 shadow-md hover:bg-[#FFD95E] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
        {isPending ? "Memproses..." : "Pesan Sekarang →"}
      </button>
    </form>
  );
}