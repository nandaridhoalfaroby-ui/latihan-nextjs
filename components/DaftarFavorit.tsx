"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Event } from "@/data/events";
import { rupiah } from "@/data/events";

export default function DaftarFavorit({ semua }: { semua: Event[] }) {
  const [favorit, setFavorit] = useState<number[]>([]);
  const [siap, setSiap] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("eventku-favorit");
      if (raw) setFavorit(JSON.parse(raw));
    } catch {}
    setSiap(true);
  }, []);

  const hapusFavorit = (id: number) => {
    const baru = favorit.filter((x) => x !== id);
    setFavorit(baru);
    localStorage.setItem("eventku-favorit", JSON.stringify(baru));
  };

  const kosongkan = () => {
    setFavorit([]);
    localStorage.removeItem("eventku-favorit");
  };

  if (!siap) return null;
  const daftar = semua.filter((e) => favorit.includes(e.id));

  return (
    <div className="space-y-6">
      {/* HEADER - SEBELUM: bg-gradient-to-r + bg-[length:200%_100%] -> SESUDAH: bg-linear-to-r + bg-size-[200%_100%] */}
      <div className="relative overflow-hidden rounded- border border-white/10 bg-[#1E103A]/90 p-6 shadow-xl sm:p-7">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/25 blur-" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-pink-500/25 blur-" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex rounded-full bg-black/40 px-3.5 py-1 text- font-black tracking-widest text-amber-300 ring-1 ring-white/15">❤️ FAVORITKU</span>
            <h1 className="mt-3 text- font-black leading-tight">Event yang <span className="bg-linear-to-r from-amber-300 via-orange-400 to-pink-400 bg-clip-text text-transparent bg-size-[200%_100%]">Lo Suka.</span></h1>
            <p className="mt-1 text-sm text-white/60">{daftar.length} event tersimpan di favorit lo.</p>
          </div>
          {daftar.length > 0 && (
            <button onClick={kosongkan} className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text- font-black transition hover:bg-white hover:text-zinc-900">🗑 Kosongkan Semua</button>
          )}
        </div>
      </div>

      {daftar.length === 0 ? (
        <div className="rounded- border border-dashed border-white/20 bg-[#1E103A]/90 p-10 text-center shadow-xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded- bg-linear-to-br from-violet-600 via-pink-500 to-orange-500 text- shadow-lg">💔</div>
          <p className="mt-4 text- font-black">Belum ada favorit</p>
          <p className="mt-1 text-sm text-white/60">Tap ❤️ di event mana aja, langsung kesimpen di sini.</p>
          <Link href="/event" className="mt-5 inline-block rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 px-7 py-3 text-sm font-black shadow-lg transition hover:scale-[1.03]">🎪 Cari Event →</Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {daftar.map((e) => {
            const terisi = Number(e.terisi || 0);
            const sisa = Math.max(0, Number(e.kuota || 0) - terisi);
            return (
              // SEBELUM: bg-white/[0.04] -> SESUDAH: bg-white/4
              <div key={e.id} className="rounded- border border-white/10 bg-white/4 p-5 shadow-lg transition hover:-translate-y-0.5 hover:border-white/20">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="rounded-full bg-black/40 px-3 py-1 text- font-black text-amber-300 ring-1 ring-white/15">{e.kategori}</span>
                    <p className="mt-2 text- font-black leading-tight">{e.judul}</p>
                    <p className="mt-1 text- text-white/50">📍 {e.lokasi} • 📅 {String(e.tanggal).slice(0, 10)}</p>
                  </div>
                  {/* SEBELUM: bg-white/[0.05] -> SESUDAH: bg-white/5 */}
                  <button onClick={() => hapusFavorit(e.id)} className="shrink-0 rounded-full bg-white/5 px-3 py-1.5 text- transition hover:bg-red-500" title="Hapus dari favorit">❤️</button>
                </div>
                <div className="mt-4 flex items-center justify-between text- font-black">
                  <span className="text-white/60">{sisa === 0 ? "HABIS" : `${sisa} kursi sisa`}</span>
                  <span className="text-amber-300">{rupiah(e.harga)}</span>
                </div>
                <div className="mt-4 flex gap-2 border-t border-white/10 pt-3">
                  <Link href={`/event/${e.id}`} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text- font-black transition hover:bg-white hover:text-zinc-900">👁 Lihat</Link>
                  <Link href={`/pesan?event=${e.id}`} className="rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 px-4 py-2 text- font-black shadow transition hover:scale-[1.03]">🎟 Pesan</Link>
                  <button onClick={() => hapusFavorit(e.id)} className="ml-auto rounded-full bg-red-500/15 px-4 py-2 text- font-black text-red-300 ring-1 ring-red-500/30 transition hover:bg-red-500 hover:text-white">🗑 Hapus</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}