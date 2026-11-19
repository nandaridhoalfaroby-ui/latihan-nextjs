"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { pesanTiket, type HasilPesan } from "@/app/actions";
import { rupiah, type Event } from "@/data/events";

// BENER: initialState harus lengkap, ada isian-nya
// SALAH: { berhasil: false, pesan: "", galat: {...} } doang -> missing 'isian'
const AWAL: HasilPesan = {
  berhasil: false,
  pesan: "",
  galat: {},
  isian: { nama: "", email: "", jumlah: "1" },
};

export default function FormPesan({ event }: { event: Event }) {
  const [hasil, jalankan, lagiLoading] = useActionState(pesanTiket, AWAL);
  const [jumlah, setJumlah] = useState(1);

  // BENER: sisa dihitung dari kuota - terisi, bukan event.sisa
  // SALAH: event.sisa -> di type Event gak ada sisa, makanya error ts(2339)
  const terisi = Number(event.terisi ?? 0);
  const kuota = Number(event.kuota ?? 0);
  const sisa = Math.max(0, kuota - terisi);
  const habis = sisa <= 0;

  const jumlahAman = Math.min(5, Math.max(1, jumlah));
  const total = Number(event.harga ?? 0) * jumlahAman;

  const inputClass =
    "mt-2 w-full rounded-full border border-white/15 bg-[#2A1B52] px-5 py-3.5 text- font-semibold text-white placeholder:text-white/30 shadow-[inset_0_0_0_1000px_#2A1B52] outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 [-webkit-text-fill-color:white]";

  return (
    <div className="w-full">
      {/* KARTU EVENT */}
      <div className="relative overflow-hidden rounded- border border-white/10 bg-[#1E103A]/90 p-6 shadow-xl">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pink-500/25 blur-" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-amber-500/25 blur-" />
        <div className="relative flex items-start gap-4">
          {/* SEBELUM: bg-gradient-to-br -> SESUDAH: bg-linear-to-br */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded- bg-linear-to-br from-violet-600 via-pink-500 to-orange-500 text- shadow-lg">🎪</div>
          <div className="min-w-0 flex-1">
            <span className="rounded-full bg-black/40 px-3 py-1 text- font-black text-amber-300 ring-1 ring-white/15">{event.kategori}</span>
            <h1 className="mt-2 text- font-black leading-tight text-white sm:text-">{event.judul}</h1>
            <p className="mt-1 text- text-white/60">📍 {event.lokasi} • 📅 {String(event.tanggal).slice(0, 10)}</p>
          </div>
          <span className={`shrink-0 rounded-full px-3.5 py-1.5 text- font-black text-white ${habis ? "bg-red-500" : "bg-emerald-500"}`}>
            {habis ? "❌ HABIS" : `✅ ${sisa} TERSISA`}
          </span>
        </div>
        <div className="relative mt-5 grid grid-cols-3 gap-2">
          {/* SEBELUM: bg-white/[0.05] -> SESUDAH: bg-white/5 */}
          <div className="rounded-2xl bg-white/5 p-3 text-center ring-1 ring-white/10">
            <p className="text- font-black tracking-widest text-white/40">HARGA</p>
            <p className="mt-1 text- font-black text-white">{event.harga === 0 ? "GRATIS" : rupiah(event.harga)}</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-3 text-center ring-1 ring-white/10">
            <p className="text- font-black tracking-widest text-white/40">TERISI</p>
            <p className="mt-1 text- font-black text-white">{terisi} / {kuota}</p>
          </div>
          {/* SEBELUM: bg-gradient-to-br -> SESUDAH: bg-linear-to-br */}
          <div className="rounded-2xl bg-linear-to-br from-amber-500/20 to-pink-500/10 p-3 text-center ring-1 ring-amber-400/25">
            <p className="text- font-black tracking-widest text-amber-300">TOTAL</p>
            <p className="mt-1 text- font-black text-white">{total === 0 ? "GRATIS" : rupiah(total)}</p>
          </div>
        </div>
      </div>

      {/* FORM */}
      <form action={jalankan} autoComplete="off" className="relative mt-5 overflow-hidden rounded- border border-white/10 bg-[#1E103A]/90 p-6 shadow-xl sm:p-7">
        <div className="relative">
          <h2 className="text- font-black text-white">📝 Formulir Pesan</h2>
          <p className="mt-1 text- text-white/50">Validasi di server, harga + sisa dibaca dari database, bukan dari form.</p>
          <input type="hidden" name="eventId" value={event.id} />
          <input type="text" name="__prevent_autofill" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <label className="mt-5 block">
            <span className="text- font-black text-white/70">👤 NAMA LENGKAP *</span>
            <input name="nama" defaultValue={hasil.isian.nama} placeholder="Contoh: Ahmad Fauzi" autoComplete="new-password" autoCorrect="off" autoCapitalize="off" spellCheck={false} className={inputClass} style={{ colorScheme: "dark" }} />
            {hasil.galat.nama && <p className="mt-1.5 text- font-bold text-red-400">⚠ {hasil.galat.nama}</p>}
          </label>

          <label className="mt-4 block">
            <span className="text- font-black text-white/70">📧 EMAIL *</span>
            <input name="email" type="email" defaultValue={hasil.isian.email} placeholder="kamu@email.com" autoComplete="new-password" autoCorrect="off" spellCheck={false} className={inputClass} style={{ colorScheme: "dark" }} />
            {hasil.galat.email && <p className="mt-1.5 text- font-bold text-red-400">⚠ {hasil.galat.email}</p>}
          </label>

          <label className="mt-4 block">
            <span className="text- font-black text-white/70">🎟 JUMLAH TIKET * (Maks 5)</span>
            <input
              name="jumlah"
              type="number"
              min={1}
              max={5}
              defaultValue={hasil.isian.jumlah}
              onChange={(e) => setJumlah(Number(e.target.value) || 1)}
              autoComplete="off"
              // SEBELUM: "text-center !text- !font-black" -> SESUDAH: "text-center text- font-black!"
              // Di Tailwind v4, ! pindah ke belakang: font-black! bukan !font-black, dan !text- doang itu gak valid
              className={inputClass + " text-center text- font-black!"}
              style={{ colorScheme: "dark" }}
            />
            {hasil.galat.jumlah && <p className="mt-1.5 text- font-bold text-red-400">⚠ {hasil.galat.jumlah}</p>}
            <p className="mt-2 text- text-white/50">Sisa kuota: <b className="text-amber-300">{sisa}</b> tiket • Terisi: {terisi} / {kuota}</p>
          </label>

          {hasil.pesan && (
            <p className={`mt-4 rounded-full px-4 py-2.5 text-center text- font-bold ring-1 ${hasil.berhasil ? "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30" : "bg-red-500/15 text-red-300 ring-red-500/30"}`}>
              {hasil.berhasil ? "✅ " : "⚠ "}{hasil.pesan}
            </p>
          )}

          {/* SEBELUM: bg-gradient-to-r -> SESUDAH: bg-linear-to-r */}
          <button type="submit" disabled={lagiLoading || habis} className={`mt-5 w-full rounded-full py-4 text- font-black shadow-lg transition hover:scale-[1.01] ${habis ? "cursor-not-allowed bg-white/10 text-white/40" : "bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 shadow-[0_18px_40px_-10px_rgba(249,115,22,0.7)] text-white"}`}>
            {habis ? "❌ Tiket Habis" : lagiLoading ? "⏳ Menyimpan ke Database..." : "🎟 Pesan Tiket →"}
          </button>
          {hasil.berhasil && <Link href="/pesanan" className="mt-3 block rounded-full border border-white/20 bg-white/10 py-3 text-center text-sm font-black text-white transition hover:bg-white hover:text-zinc-900">Lihat Pesanan Saya →</Link>}
        </div>
      </form>
    </div>
  );
}