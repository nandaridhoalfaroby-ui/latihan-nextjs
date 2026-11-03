"use client";

import { useEffect, useState } from "react";
import { rupiah, type Event } from "@/data/events";

export default function DaftarFavorit() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events").then(r => r.json()).then(setEvents).finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-400">Memuat...</p>;

  const raw = JSON.parse(localStorage.getItem("favorit") || "[]");
  const favIds = raw.map((x: any) => Number(x));
  const favEvents = events.filter((e: any) => favIds.includes(Number(e.id)));

  if (favEvents.length === 0) return <p className="text-slate-400">Belum ada favorit.</p>;

  return (
    <div className="space-y-2">
      {favEvents.map((e: any) => {
        // INI KUNCI FIX NYA - CEK SEMUA KEMUNGKINAN NAMA
        const namaEvent = e.nama || e.judul || e.title || e.name || e.namaEvent;
        console.log(e); // buka F12 console biar keliatan struktur aslinya
        
        return (
          <div key={e.id} className="flex justify-between rounded-lg border border-slate-700 bg-slate-900 px-4 py-3">
            <span className="font-medium text-slate-100">{namaEvent || "Tanpa Nama"}</span>
            <span className="text-slate-300">{rupiah(e.harga || e.price || 0)}</span>
          </div>
        );
      })}
    </div>
  );
}