"use client";
import { useState, useEffect } from "react";
import { rupiah, type Event } from "@/data/events";
import KartuEvent from "./KartuEvent";
import KontrolKatalog from "./KontrolKatalog";

export default function KatalogInteraktif({ events }: { events: Event[] }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urut, setUrut] = useState<"tanggal" | "harga" | "nama">("tanggal");
  const [tampil, setTampil] = useState(4);
  const [hanyaTersedia, setHanyaTersedia] = useState(false);
  const [hargaMaks, setHargaMaks] = useState("");

  useEffect(() => {
    const s = localStorage.getItem("urut") as "tanggal" | "harga" | "nama" | null;
    if (s === "tanggal" || s === "harga" || s === "nama") setUrut(s);
  }, []);
  useEffect(() => {
    localStorage.setItem("urut", urut);
  }, [urut]);

  const daftarKategori = ["Semua", ...new Set(events.map((e) => e.kategori))];
  const hasil = events.filter((e) => {
    const cocokCari = e.judul.toLowerCase().includes(cari.toLowerCase());
    const cocokKategori = kategori === "Semua" || e.kategori === kategori;
    const cocokTersedia = !hanyaTersedia || (e.kuota - e.terisi) > 0;
    const cocokHarga = hargaMaks === "" || e.harga <= Number(hargaMaks);
    return cocokCari && cocokKategori && cocokTersedia && cocokHarga;
  });
  const terurut = [...hasil].sort((a, b) => {
    if (urut === "nama") return a.judul.localeCompare(b.judul);
    if (urut === "harga") return a.harga - b.harga;
    return a.tanggal.localeCompare(b.tanggal);
  });
  const totalHarga = terurut.reduce((s, e) => s + e.harga, 0);
  const rataRata = terurut.length > 0 ? totalHarga / terurut.length : 0;
  const totalSisa = terurut.reduce((s, e) => s + (e.kuota - e.terisi), 0);
  useEffect(() => { setTampil(4); }, [cari, kategori, urut, hanyaTersedia, hargaMaks]);

  const ditampilkan = terurut.slice(0, tampil);
  const sisa = terurut.length - tampil;

  return (
    <div>
      <KontrolKatalog
        cari={cari} setCari={setCari}
        kategori={kategori} setKategori={setKategori}
        daftarKategori={daftarKategori}
        urut={urut} setUrut={setUrut}
        hanyaTersedia={hanyaTersedia} setHanyaTersedia={setHanyaTersedia}
        hargaMaks={hargaMaks} setHargaMaks={setHargaMaks}
      />

      {/* STATS BAR - TANPA TULISAN PUTIH */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFFEF7] border border-orange-100 px-3.5 py-1.5 text-xs font-black text-zinc-900 shadow-sm">
          🎟️ <span>{terurut.length} event ditemu</span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFFBEB] border border-orange-100 px-3.5 py-1.5 text-xs font-bold text-zinc-700">
          Rata-rata <span className="font-black text-zinc-900">{rupiah(rataRata)}</span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DCFCE7] border border-emerald-200 px-3.5 py-1.5 text-xs font-bold text-emerald-800">
          Total sisa tiket <span className="font-black">{totalSisa}</span>
        </span>
      </div>

      {ditampilkan.length === 0 ? (
        <div className="rounded- bg-[#FFFBEB] border border-dashed border-orange-200 p-12 text-center">
          <p className="text-5xl">🔍</p>
          <h3 className="mt-4 text-lg font-black text-zinc-900">Tidak ada event yang cocok</h3>
          <p className="mt-1 text-sm font-medium text-zinc-600">Coba ubah kata kunci atau filter harga / kategori</p>
          <button 
            onClick={() => { setCari(""); setKategori("Semua"); setHargaMaks(""); setHanyaTersedia(false); }}
            className="mt-5 rounded-full bg-[#FFC837] border-2 border-amber-300 px-6 py-2.5 text-sm font-black text-zinc-900 hover:bg-[#FFD95E] transition"
          >
            Reset Filter
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ditampilkan.map((e) => <KartuEvent key={e.id} event={e} />)}
          </div>

          {sisa > 0 && (
            <div className="mt-8 text-center">
              <button 
                onClick={() => setTampil(tampil + 4)} 
                className="rounded-full bg-[#FFC837] border-2 border-amber-300 px-7 py-3 text-sm font-black text-zinc-900 shadow-md hover:bg-[#FFD95E] hover:-translate-y-0.5 transition-all"
              >
                Tampilkan lagi ({sisa} lagi)
              </button>
              <p className="mt-2 text-xs font-medium text-zinc-500">Menampilkan {ditampilkan.length} dari {terurut.length} event</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}