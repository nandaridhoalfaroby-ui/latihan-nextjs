"use client"; // boleh ada boleh enggak, lihat jawaban bawah

type Props = {
  cari: string;
  setCari: (v: string) => void;
  kategori: string;
  setKategori: (v: string) => void;
  daftarKategori: string[];
  urut: "tanggal" | "harga" | "nama";
  setUrut: (v: "tanggal" | "harga" | "nama") => void;
  hanyaTersedia: boolean;
  setHanyaTersedia: (v: boolean) => void;
  hargaMaks: string;
  setHargaMaks: (v: string) => void;
};

export default function KontrolKatalog({
  cari, setCari,
  kategori, setKategori,
  daftarKategori,
  urut, setUrut,
  hanyaTersedia, setHanyaTersedia,
  hargaMaks, setHargaMaks
}: Props) {
  return (
    <div className="mb-4 flex flex-wrap gap-3 items-center">
      <input value={cari} onChange={(e) => setCari(e.target.value)} placeholder="Cari event..." className="rounded border bg-white px-3 py-2" />
      <select value={kategori} onChange={(e) => setKategori(e.target.value)} className="rounded border bg-white px-3 py-2">
        {daftarKategori.map((k) => <option key={k}>{k}</option>)}
      </select>
      <select value={urut} onChange={(e) => setUrut(e.target.value as any)} className="rounded border bg-white px-3 py-2">
        <option value="tanggal">terdekat</option>
        <option value="harga">termurah</option>
        <option value="nama">nama A-Z</option>
      </select>
      <label className="flex items-center gap-2 text-sm bg-white px-3 py-2 rounded border">
        <input type="checkbox" checked={hanyaTersedia} onChange={(e) => setHanyaTersedia(e.target.checked)} />
        Hanya yang masih ada tiket
      </label>
      <input type="number" value={hargaMaks} onChange={(e) => setHargaMaks(e.target.value)} placeholder="Harga maksimal" className="rounded border bg-white px-3 py-2 w-40" />
    </div>
  );
}