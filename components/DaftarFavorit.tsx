"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { rupiah, type Event } from "@/data/events";

type EventAny = Event & { judul?: string; title?: string; name?: string };

export default function DaftarFavorit() {
  const [events, setEvents] = useState<EventAny[]>([]);
  const [favIds, setFavIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((data: EventAny[]) => setEvents(data))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));

    // Baca favorit di useEffect biar gak hydration error
    const raw: string[] = JSON.parse(localStorage.getItem("favorit") || "[]");
    setFavIds(raw.map((x) => Number(x)));
  }, []);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1,2,3].map(i => (
          <div key={i} className="h- animate-pulse rounded-2xl bg-[#FFFBEB] border border-orange-100" />
        ))}
        <p className="text-center text-sm font-bold text-zinc-500">Memuat favorit...</p>
      </div>
    );
  }

  const favEvents = events.filter((e) => favIds.includes(Number(e.id)));

  if (favEvents.length === 0) {
    return (
      <div className="rounded- bg-[#FFFBEB] border border-dashed border-orange-200 p-10 text-center">
        <p className="text-5xl">♡</p>
        <h3 className="mt-3 text-lg font-black text-zinc-900">Belum ada favorit</h3>
        <p className="mt-1 text-sm font-medium text-zinc-600">Tap ♥ di event yang lo suka, bakal muncul di sini</p>
        <Link href="/event" className="mt-5 inline-block rounded-full bg-[#FFC837] border-2 border-amber-300 px-6 py-2.5 text-sm font-black text-zinc-900 hover:bg-[#FFD95E] transition">
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
      {favEvents.map((e) => {
        const namaEvent = e.judul || e.title || e.name || "Event";
        return (
          <Link key={e.id} href={`/event/${e.id}`} className="group flex items-center justify-between gap-3 rounded-2xl bg-[#FFFEF7] border border-orange-100 px-4 py-3.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="flex items-center gap-3 min-w-0">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#FFE4E6] border border-red-200 text-red-600">♥</span>
              <div className="min-w-0">
                <p className="truncate font-black text-sm text-zinc-900 group-hover:text-amber-700">{namaEvent}</p>
                <p className="text-xs font-bold text-zinc-500">{e.kategori} • {e.tanggal}</p>
              </div>
            </div>
            <span className="shrink-0 rounded-full bg-[#FFC837] border border-amber-300 px-3 py-1 text-xs font-black text-zinc-900">
              {rupiah(e.harga)}
            </span>
          </Link>
        );
      })}
    </div>
  );
}