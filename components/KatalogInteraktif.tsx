"use client";
import { useState, useEffect } from "react";
import { rupiah, type Event } from "@/data/events";
import KartuEvent from "./KartuEvent";

export default function KatalogInteraktif({ events }: { events: Event[] }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urut, setUrut] = useState<"tanggal" | "harga" | "nama">("tanggal");
  const [tampil, setTampil] = useState(4); // <--- STATE BARU

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

  const totalHarga = terurut.reduce((sum, e) => sum + e.harga, 0);
  const rataRata = terurut.length > 0 ? totalHarga / terurut.length : 0;
  const totalSisa = terurut.reduce((sum, e) => sum + (e.kuota - e.terisi), 0);

  // RESET KE 4 SETIAP GANTI FILTER
  useEffect(() => {
    setTampil(4);
  }, [cari, kategori, urut]);

  const ditampilkan = terurut.slice(0, tampil);
  const sisa = terurut.length - tampil;

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3">
        <input value={cari} onChange={(e) => setCari(e.target.value)} placeholder="Cari event..." className="rounded border bg-white px-3 py-2" />
        <select value={kategori} onChange={(e) => setKategori(e.target.value)} className="rounded border bg-white px-3 py-2">
          {daftarKategori.map((k) => <option key={k}>{k}</option>)}
        </select>
        <select value={urut} onChange={(e) => setUrut(e.target.value as any)} className="rounded border bg-white px-3 py-2">
          <option value="tanggal">terdekat</option>
          <option value="harga">termurah</option>
          <option value="nama">nama A-Z</option>
        </select>
      </div>

      <p className="mb-1 text-sm text-slate-500">{terurut.length} event ditemu</p>
      <p className="mb-3 text-sm font-medium text-slate-700">Rata-rata harga {rupiah(rataRata)} · Total sisa tiket {totalSisa}</p>

      {ditampilkan.length === 0 ? (
        <p className="text-slate-500">Tidak ada event yang cocok.</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ditampilkan.map((e) => <KartuEvent key={e.id} event={e} />)}
          </div>
          {sisa > 0 && (
            <div className="mt-6 text-center">
              <button onClick={() => setTampil(tampil + 4)} className="rounded bg-slate-800 px-4 py-2 text-white">
                Tampilkan lagi ({sisa} lagi)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}