"use client";

import { useEffect, useState } from "react";
import { rupiah, type Event } from "@/data/events";

type EventAny = Event & { judul?: string; title?: string; name?: string };

export default function DaftarFavorit() {
  const [events, setEvents] = useState<EventAny[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((data: EventAny[]) => setEvents(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-400">Memuat...</p>;

  const raw: string[] = JSON.parse(localStorage.getItem("favorit") || "[]");
  const favIds: number[] = raw.map((x) => Number(x));
  const favEvents = events.filter((e) => favIds.includes(Number(e.id)));

  if (favEvents.length === 0) return <p className="text-slate-400">Belum ada favorit.</p>;

  return (
    <div className="space-y-2">
      {favEvents.map((e) => {
        const namaEvent = e.nama || e.judul || e.title || e.name;
        return (
          <div key={e.id} className="flex justify-between rounded-lg border border-slate-700 bg-slate-900 px-4 py-3">
            <span className="font-medium text-slate-100">{namaEvent}</span>
            <span className="text-slate-300">{rupiah(e.harga)}</span>
          </div>
        );
      })}
    </div>
  );
}