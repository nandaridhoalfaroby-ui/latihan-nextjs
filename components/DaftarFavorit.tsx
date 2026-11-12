"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { Event } from "@/data/events";

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

  if (loading) return <p className="text-sm font-bold text-zinc-500">Memuat favorit...</p>;
  if (favorit.length === 0) return <p className="text-sm font-bold text-zinc-600">Belum ada favorit.</p>;

  return (
    <div className="grid gap-3">
      {favorit.map((e) => (
        <Link key={e.id} href={`/event/${e.id}`} className="rounded-2xl bg-[#FFFEF7] border border-orange-100 p-4 text-sm font-bold text-zinc-900 hover:bg-[#FFFBEB] transition">
          {e.judul} <span className="text-zinc-500">• {e.tanggal}</span>
        </Link>
      ))}
    </div>
  );
}