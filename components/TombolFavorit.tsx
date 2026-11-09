"use client";
import { useEffect, useState } from "react";

export default function TombolFavorit({ id }: { id: number | string }) {
  const [favorit, setFavorit] = useState(false);

  useEffect(() => {
    const simpan: (number | string)[] = JSON.parse(localStorage.getItem("favorit") ?? "[]");
    setFavorit(simpan.map(String).includes(String(id)));
  }, [id]);

  function ubah() {
    const simpan: (number | string)[] = JSON.parse(localStorage.getItem("favorit") ?? "[]");
    const simpanStr = simpan.map(String);
    const baru = simpanStr.includes(String(id))
      ? simpanStr.filter((x) => x !== String(id))
      : [...simpanStr, String(id)];
    localStorage.setItem("favorit", JSON.stringify(baru));
    setFavorit(!favorit);
    window.dispatchEvent(new Event("favorit-berubah"));
    window.dispatchEvent(new Event("storage"));
  }

  return (
    <button 
      onClick={ubah} 
      className={`mt-3 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-black border-2 transition-all ${
        favorit 
          ? "bg-[#FFE4E6] border-red-200 text-red-700" 
          : "bg-[#FFFBEB] border-orange-100 text-zinc-900"
      }`}
    >
      {favorit ? "♥ Favorit" : "♡ Tambah favorit"}
    </button>
  );
}