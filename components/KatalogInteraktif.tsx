"use client";

import { useState } from "react";
import KartuEvent from "./KartuEvent";

export default function KatalogInteraktif({ events }: { events: any[] }) {
  const [keyword, setKeyword] = useState("");
  const [hanyaAdaTiket, setHanyaAdaTiket] = useState(false);

  const filtered = events.filter((e) => {
    // biar gak error toLowerCase kalau e.nama undefined
    const nama = (e.nama || e.title || "").toLowerCase();
    const kata = keyword.toLowerCase();
    const cocokCari = nama.includes(kata);

    // kuota habis = kuota - terisi <= 0 atau kuota === 0
    // sesuaikan sama field di data kamu
    const sisa = e.sisa ?? (e.kuota - (e.terisi ?? 0));
    const cocokTiket = hanyaAdaTiket ? sisa > 0 : true;

    return cocokCari && cocokTiket;
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Cari event..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="mb-4 w-full rounded border px-3 py-2"
      />

      <label className="mb-4 flex items-center gap-2">
        <input
          type="checkbox"
          checked={hanyaAdaTiket}
          onChange={(e) => setHanyaAdaTiket(e.target.checked)}
        />
        <span>Hanya yang masih ada tiket</span>
      </label>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((e) => (
          <KartuEvent key={e.id} event={e} />
        ))}
      </div>
    </div>
  );
}