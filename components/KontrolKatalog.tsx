"use client";

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
  const inputCls = "rounded-xl bg-[#FFFEF7] border border-orange-100 px-3.5 py-2.5 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-amber-300 focus:ring-2 focus:ring-[#FFC837]/40 transition";
  const selectCls = "rounded-xl bg-[#FFFEF7] border border-orange-100 px-3.5 py-2.5 text-sm font-bold text-zinc-900 outline-none focus:border-amber-300 focus:ring-2 focus:ring-[#FFC837]/40 transition cursor-pointer";

  return (
    <div className="mb-6 rounded- bg-[#FFFBEB] border border-orange-100 p-4 shadow-sm">
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">🔍</span>
          <input 
            value={cari} 
            onChange={(e) => setCari(e.target.value)} 
            placeholder="Cari event..." 
            className={`${inputCls} w-full pl-9`} 
          />
        </div>

        <select value={kategori} onChange={(e) => setKategori(e.target.value)} className={selectCls}>
          {daftarKategori.map((k) => <option key={k} value={k}>{k}</option>)}
        </select>

        <select value={urut} onChange={(e) => setUrut(e.target.value as "tanggal" | "harga" | "nama")} className={selectCls}>
          <option value="tanggal">📅 Terdekat</option>
          <option value="harga">💸 Termurah</option>
          <option value="nama">🔤 Nama A-Z</option>
        </select>

        <label className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm font-bold transition select-none ${
          hanyaTersedia 
            ? "bg-[#FFC837] border-amber-300 text-zinc-900 shadow-sm" 
            : "bg-[#FFFEF7] border-orange-100 text-zinc-700 hover:border-amber-300"
        }`}>
          <input 
            type="checkbox" 
            checked={hanyaTersedia} 
            onChange={(e) => setHanyaTersedia(e.target.checked)} 
            className="h-4 w-4 accent-amber-500 cursor-pointer"
          />
          Hanya yang masih ada tiket
        </label>

        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-black text-zinc-500">Rp</span>
          <input 
            type="number" 
            value={hargaMaks} 
            onChange={(e) => setHargaMaks(e.target.value)} 
            placeholder="Harga maksimal" 
            className={`${inputCls} w-44 pl-9`} 
          />
        </div>
      </div>
    </div>
  );
}