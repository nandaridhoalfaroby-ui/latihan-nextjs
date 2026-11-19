"use client";

import { useActionState } from "react";
import { simpanEvent, type HasilEvent } from "@/app/admin/actions";

// BENER: gambar & deskripsi boleh string | null | undefined
// Karena di Supabase, kolom gambar boleh NULL kalau event gak pake gambar
// Kemarin cuma string | undefined, makanya error ts(2322) pas event dari Supabase dikirim ke sini
export type EventAwal = {
  id?: number;
  judul?: string;
  kategori?: string;
  tanggal?: string;
  lokasi?: string;
  harga?: number | null;
  kuota?: number | null;
  terisi?: number | null;
  gambar?: string | null;
  deskripsi?: string | null;
};

function Galat({ teks }: { teks?: string }) {
  if (!teks) return null;
  return <p className="mt-1.5 text- font-bold text-red-300">⚠ {teks}</p>;
}

export default function FormEvent({ event }: { event?: EventAwal }) {
  const awal: HasilEvent = {
    pesan: "",
    galat: {},
    isi: {
      id: event?.id ? String(event.id) : "",
      judul: event?.judul ?? "",
      kategori: event?.kategori ?? "",
      tanggal: event?.tanggal ? String(event.tanggal).slice(0, 10) : "",
      lokasi: event?.lokasi ?? "",
      harga: event?.harga != null ? String(event.harga) : "",
      kuota: event?.kuota != null ? String(event.kuota) : "",
      gambar: event?.gambar ?? "",
      deskripsi: event?.deskripsi ?? "",
    },
  };

  const [hasil, kirim, sedangKirim] = useActionState(simpanEvent, awal);
  const isi = hasil.isi ?? awal.isi;
  const isUbah = !!event?.id;

  const inputCls =
    "w-full rounded- border border-white/15 bg-[#120826] px-4 py-3 text- font-bold text-white placeholder:text-white/30 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30";
  const labelCls = "mb-1.5 block text- font-black tracking-wide text-white/70";

  return (
    <form action={kirim} className="w-full rounded- border border-white/10 bg-[#1E103A]/90 p-6 shadow-xl sm:p-7" style={{ colorScheme: "dark" }}>
      {/* HEADER - bg-linear-to-r, bukan bg-gradient-to-r lagi, biar gak kuning di Tailwind v4 */}
      <div className="relative -mx-6 -mt-6 mb-6 overflow-hidden rounded-t- bg-linear-to-r from-violet-600 via-pink-500 to-orange-500 p-6 sm:-mx-7 sm:-mt-7">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-" />
        <span className="inline-flex rounded-full bg-black/30 px-3.5 py-1 text- font-black tracking-widest text-amber-200 ring-1 ring-white/20">
          {isUbah ? "✏️ UBAH EVENT" : "✨ TAMBAH EVENT BARU"}
        </span>
        <h2 className="mt-2 text- font-black leading-tight text-white">
          {isUbah ? `Ubah: ${event?.judul}` : "Buat Event Baru"}
        </h2>
        <p className="mt-1 text- text-white/80">
          {isUbah ? "Ubah isian di bawah, lalu simpan. Kuota tidak boleh di bawah tiket terisi." : "Isi semua dengan benar, langsung tersimpan ke database."}
        </p>
      </div>

      <input type="hidden" name="id" value={isi.id ?? ""} />

      {hasil.pesan && (
        <p
          className={`mb-5 rounded- px-4 py-3 text- font-black ${
            Object.keys(hasil.galat).length > 0 || hasil.pesan.toLowerCase().includes("gagal")
              ? "bg-red-500/15 text-red-300 ring-1 ring-red-500/30"
              : "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
          }`}
        >
          {hasil.pesan}
        </p>
      )}

      <label className="block">
        <span className={labelCls}>🎪 Judul Event *</span>
        <input name="judul" defaultValue={isi.judul} placeholder="Judul" className={inputCls} required />
        <Galat teks={hasil.galat.judul} />
      </label>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>🏷 Kategori *</span>
          <input name="kategori" defaultValue={isi.kategori} placeholder="Kategori" className={inputCls} required />
          <Galat teks={hasil.galat.kategori} />
        </label>
        <label className="block">
          <span className={labelCls}>📅 Tanggal *</span>
          <input name="tanggal" type="date" defaultValue={isi.tanggal} className={inputCls} required />
          <Galat teks={hasil.galat.tanggal} />
        </label>
      </div>

      <label className="mt-4 block">
        <span className={labelCls}>📍 Lokasi *</span>
        <input name="lokasi" defaultValue={isi.lokasi} placeholder="Lokasi" className={inputCls} required />
        <Galat teks={hasil.galat.lokasi} />
      </label>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>💰 Harga (Rp, 0 = Gratis) *</span>
          <input name="harga" type="number" min={0} max={1000000} defaultValue={isi.harga} placeholder="Harga" className={inputCls} required />
          <Galat teks={hasil.galat.harga} />
        </label>
        <label className="block">
          <span className={labelCls}>🎟 Kuota (1 - 1000) *</span>
          <input name="kuota" type="number" min={1} max={1000} defaultValue={isi.kuota} placeholder="Kuota" className={inputCls} required />
          <Galat teks={hasil.galat.kuota} />
        </label>
      </div>

      <label className="mt-4 block">
        <span className={labelCls}>🖼 Link Gambar (boleh kosong)</span>
        <input name="gambar" defaultValue={isi.gambar} placeholder="Gambar" className={inputCls} />
        <Galat teks={hasil.galat.gambar} />
      </label>

      <label className="mt-4 block">
        <span className={labelCls}>📝 Deskripsi (boleh kosong)</span>
        <textarea name="deskripsi" defaultValue={isi.deskripsi} rows={3} placeholder="Ceritain event-nya..." className={`${inputCls} resize-none`} />
      </label>

      <button
        disabled={sedangKirim}
        className="mt-6 w-full rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 py-3.5 text- font-black text-white shadow-lg transition hover:scale-[1.01] disabled:opacity-50"
      >
        {sedangKirim ? "⏳ Menyimpan..." : "💾 Simpan"}
      </button>

      <p className="mt-3 text-center text- text-white/40">
        Validasi: judul 3-80 huruf • kategori 3-30 huruf • harga 0-1jt • kuota 1-1000 • isian yang salah tidak hilang.
      </p>
    </form>
  );
}