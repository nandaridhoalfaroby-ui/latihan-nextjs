"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Event } from "@/data/events";
import { rupiah } from "@/data/events";

function warnaKategori(kategori: string) {
  const k = kategori.toLowerCase();
  if (k.includes("musik") || k.includes("konser")) return "bg-pink-500 text-white";
  if (k.includes("workshop") || k.includes("kelas") || k.includes("seminar")) return "bg-violet-500 text-white";
  if (k.includes("olahraga") || k.includes("sport")) return "bg-emerald-500 text-white";
  if (k.includes("seni") || k.includes("budaya")) return "bg-sky-500 text-white";
  if (k.includes("teknologi") || k.includes("tech")) return "bg-indigo-500 text-white";
  return "bg-amber-500 text-zinc-900";
}

export default function DaftarFavorit() {
  const [favorit, setFavorit] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const bacaFavorit = useCallback(() => {
    const ids: number[] = JSON.parse(localStorage.getItem("favorit") ?? "[]");
    if (ids.length === 0) {
      setFavorit([]);
      setLoading(false);
      return;
    }
    fetch("/api/events")
      .then((r) => r.json())
      .then((data: Event[]) => {
        setFavorit(data.filter((e) => ids.includes(e.id)));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const t = setTimeout(bacaFavorit, 0);
    window.addEventListener("favorit-berubah", bacaFavorit);
    window.addEventListener("storage", bacaFavorit);
    return () => {
      clearTimeout(t);
      window.removeEventListener("favorit-berubah", bacaFavorit);
      window.removeEventListener("storage", bacaFavorit);
    };
  }, [bacaFavorit]);

  const hapus = (id: number, ev: React.MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    const ids: number[] = JSON.parse(localStorage.getItem("favorit") ?? "[]");
    localStorage.setItem("favorit", JSON.stringify(ids.filter((x) => x !== id)));
    window.dispatchEvent(new Event("favorit-berubah"));
    bacaFavorit();
  };

  if (loading) return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3 rounded- bg-[#FFFEF7] border-2 border-orange-100 p-3">
          <div className="h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-r from-[#FFF7D6] via-[#FFD95E] to-[#FFF7D6] bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded-full bg-[#FFF7D6]" />
            <div className="h-3 w-1/2 rounded-full bg-[#FFF7D6]" />
          </div>
          <div className="h-8 w-16 rounded-full bg-[#FFF7D6]" />
        </div>
      ))}
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
    </div>
  );

  if (favorit.length === 0) return (
    <div className="rounded- bg-gradient-to-br from-[#FFF7D6] to-[#FFFBEB] border-2 border-orange-100 p-6 text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded- bg-[#FFFEF7] border-2 border-amber-200 text-3xl shadow-md -rotate-3">💛</div>
      <p className="mt-3 font-black text-zinc-900">Belum ada favorit.</p>
      <p className="mt-1 text-xs font-medium text-zinc-500">Yuk simpan event yang kamu suka dulu.</p>
      <Link href="/event" className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-5 py-2.5 text-xs font-black text-[#FFC837]">Cari Event →</Link>
    </div>
  );

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1.5 text- font-black text-[#FFC837]">❤️ {favorit.length} FAVORIT KAMU</span>
        <Link href="/favorit" className="text- font-black text-orange-600 hover:underline">Lihat Semua →</Link>
      </div>

      <div className="grid gap-3">
        {favorit.map((e) => (
          <div key={e.id} className="group relative flex items-center gap-3 rounded- bg-[#FFFEF7] border-2 border-orange-100 p-3 shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-amber-200 transition-all">
            {/* Thumbnail */}
            <Link href={`/event/${e.id}`} className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl">
              <Image src={e.gambar ?? "/img/default.png"} alt={e.judul} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
            </Link>

            {/* Info */}
            <Link href={`/event/${e.id}`} className="flex-1 min-w-0">
              <span className={`inline-flex rounded-full px-2.5 py-1 text- font-black tracking-wide ${warnaKategori(e.kategori)}`}>{e.kategori}</span>
              <p className="mt-1 truncate text-sm font-black text-zinc-900 group-hover:text-orange-600 transition">{e.judul}</p>
              <p className="mt-0.5 truncate text- font-bold text-zinc-500">📅 {e.tanggal} • 📍 {e.lokasi}</p>
            </Link>

            {/* Harga + aksi */}
            <div className="shrink-0 text-right">
              <p className="text- font-black text-zinc-900">{rupiah(e.harga)}</p>
              <div className="mt-1.5 flex items-center justify-end gap-1.5">
                <Link href={`/event/${e.id}`} className="grid h-7 w-7 place-items-center rounded-full bg-[#FFC837] text- font-black text-zinc-900 shadow-sm">→</Link>
                <button onClick={(ev) => hapus(e.id, ev)} title="Hapus dari favorit" className="grid h-7 w-7 place-items-center rounded-full bg-[#FDF2F8] border border-pink-100 text- hover:scale-110 active:scale-95 transition">❤️</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}