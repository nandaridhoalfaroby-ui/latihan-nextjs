"use client";
import { useEffect, useState } from "react";

export default function TombolFavorit({ id }: { id: number }) {
  const [favorit, setFavorit] = useState(false);

  useEffect(() => {
    const simpan: number[] = JSON.parse(localStorage.getItem("favorit") ?? "[]");
    setFavorit(simpan.includes(id));
  }, [id]);

  function ubah() {
    const simpan: number[] = JSON.parse(localStorage.getItem("favorit") ?? "[]");
    const baru = simpan.includes(id) ? simpan.filter((x) => x !== id) : [...simpan, id];
    localStorage.setItem("favorit", JSON.stringify(baru));
    setFavorit(!favorit);
    window.dispatchEvent(new Event("favorit-berubah"));
  }

  return (
    <button 
      onClick={ubah} 
      className={`mt-3 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-black border-2 transition-all hover:-translate-y-0.5 active:translate-y-0 ${
        favorit 
          ? "bg-[#FFE4E6] border-red-200 text-red-700 shadow-sm hover:bg-red-100" 
          : "bg-[#FFFBEB] border-orange-100 text-zinc-900 hover:border-amber-300 hover:bg-[#FFFEF7]"
      }`}
    >
      {favorit ? "♥ Favorit" : "♡ Tambah favorit"}
    </button>
  );
}