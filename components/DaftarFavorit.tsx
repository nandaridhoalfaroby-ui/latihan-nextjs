"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { events, rupiah } from "@/data/events";

export default function DaftarFavorit() {
  const [favIds, setFavIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const bacaFavorit = () => {
    const raw: (string | number)[] = JSON.parse(localStorage.getItem("favorit") || "[]");
    setFavIds(raw.map((x) => String(x)));
  };

  useEffect(() => {
    bacaFavorit();
    setLoading(false);
    // INI KUNCINYA: dengerin kalau tombol favorit dipencet di halaman lain
    window.addEventListener("favorit-berubah", bacaFavorit);
    window.addEventListener("storage", bacaFavorit);
    return () => {
      window.removeEventListener("favorit-berubah", bacaFavorit);
      window.removeEventListener("storage", bacaFavorit);
    };
  }, []);

  if (loading) return <p className="text-center text-sm font-bold text-zinc-500">Memuat favorit...</p>;

  const favEvents = events.filter((e) => favIds.includes(String(e.id)));

  if (favEvents.length === 0) {
    return (
      <div className="rounded- bg-[#FFFBEB] border border-dashed border-orange-200 p-10 text-center">
        <p className="text-5xl">♡</p>
        <h3 className="mt-3 text-lg font-black text-zinc-900">Belum ada favorit</h3>
        <p className="mt-1 text-sm font-medium text-zinc-600">Tap ♥ di event yang lo suka, bakal muncul di sini</p>
        <Link href="/event" className="mt-5 inline-block rounded-full bg-[#FFC837] border-2 border-amber-300 px-6 py-2.5 text-sm font-black text-zinc-900">
          Cari Event →
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm font-bold text-zinc-600">
        <span className="font-black text-zinc-900">{favEvents.length} event</span> favorit lo
      </p>
      {favEvents.map((e) => (
        <Link key={e.id} href={`/event/${e.id}`} className="flex items-center justify-between gap-3 rounded-2xl bg-[#FFFEF7] border border-orange-100 px-4 py-3.5 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 min-w-0">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#FFE4E6] border border-red-200 text-red-600">♥</span>
            <div className="min-w-0">
              <p className="truncate font-black text-sm text-zinc-900">{e.judul}</p>
              <p className="text-xs font-bold text-zinc-500">{e.kategori} • {e.tanggal}</p>
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-[#FFC837] border border-amber-300 px-3 py-1 text-xs font-black text-zinc-900">
            {rupiah(e.harga)}
          </span>
        </Link>
      ))}
    </div>
  );
}