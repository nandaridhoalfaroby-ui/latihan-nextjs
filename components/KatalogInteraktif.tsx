"use client";
import { useState } from "react";
import { rupiah, type Event } from "@/data/events";
import KartuEvent from "./KartuEvent";

export default function KatalogInteraktif({ events }: { events: Event[] }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urut, setUrut] = useState<"tanggal" | "harga" | "nama">("tanggal");

  const daftarKategori = ["Semua", ...new Set(events.map((e) => e.kategori))];
  
  const hasil = events.filter(
    (e) =>
      e.judul.toLowerCase().includes(cari.toLowerCase()) &&
      (kategori === "Semua" || e.kategori === kategori)
  );

  const terurut = [...hasil].sort((a, b) => {
    if (urut === "nama") return a.judul.localeCompare(b.judul);
    if (urut === "harga") return a.harga - b.harga;
    return a.tanggal.localeCompare(b.tanggal);
  });

  // === STATISTIK BARU LANGKAH 5 ===
  const totalHarga = terurut.reduce((sum, e) => sum + e.harga, 0);
  const rataRata = terurut.length > 0 ? totalHarga / terurut.length : 0;
  const totalSisa = terurut.reduce((sum, e) => sum + (e.kuota - e.terisi), 0);

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          value={cari}
          onChange={(e) => setCari(e.target.value)}
          placeholder="Cari event..."
          className="rounded border bg-white px-3 py-2"
        />
        <select
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          className="rounded border bg-white px-3 py-2"
        >
          {daftarKategori.map((k) => (
            <option key={k}>{k}</option>
          ))}
        </select>
        <select
          value={urut}
          onChange={(e) => setUrut(e.target.value as any)}
          className="rounded border bg-white px-3 py-2"
        >
          <option value="tanggal">terdekat</option>
          <option value="harga">termurah</option>
          <option value="nama">nama A-Z</option>
        </select>
      </div>

      <p className="mb-1 text-sm text-slate-500">
        {terurut.length} event ditemu (terurut {urut})
      </p>
      <p className="mb-3 text-sm font-medium text-slate-700">
        Rata-rata harga {rupiah(rataRata)} · Total sisa tiket {totalSisa}
      </p>

      {terurut.length === 0 ? (
        <p className="text-slate-500">Tidak ada event yang cocok.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {terurut.map((e) => (
            <KartuEvent key={e.id} event={e} />
          ))}
        </div>
      )}
    </div>
  );
}