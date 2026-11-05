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
    const s = localStorage.getItem("urut") as any;
    if (s) setUrut(s);
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
      <p className="mb-1 text-sm text-slate-500">{terurut.length} event ditemu</p>
      <p className="mb-3 text-sm font-medium">Rata-rata harga {rupiah(rataRata)} · Total sisa tiket {totalSisa}</p>
      {ditampilkan.length === 0 ? <p>Tidak ada event yang cocok.</p> : <>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ditampilkan.map((e) => <KartuEvent key={e.id} event={e} />)}
        </div>
        {sisa > 0 && <div className="mt-6 text-center"><button onClick={() => setTampil(tampil + 4)} className="rounded bg-slate-800 px-4 py-2 text-white">Tampilkan lagi ({sisa} lagi)</button></div>}
      </>}
    </div>
  );
}