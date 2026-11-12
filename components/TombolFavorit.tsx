"use client";

import { useEffect, useState } from "react";

export default function TombolFavorit({ id }: { id: number }) {
  const [aktif, setAktif] = useState(false);

  useEffect(() => {
    const ids: number[] = JSON.parse(localStorage.getItem("favorit") ?? "[]");
    setAktif(ids.includes(id));
  }, [id]);

  const toggle = () => {
    const ids: number[] = JSON.parse(localStorage.getItem("favorit") ?? "[]");
    const baru = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
    localStorage.setItem("favorit", JSON.stringify(baru));
    window.dispatchEvent(new Event("favorit-berubah"));
    setAktif(!aktif);
  };

  return (
    <button
      onClick={toggle}
      className={`rounded-full border px-4 py-2 text-xs font-black transition ${
        aktif
          ? "bg-[#FFE4E6] border-red-200 text-red-700"
          : "bg-[#FFFEF7] border-orange-100 text-zinc-700 hover:bg-[#FFFBEB]"
      }`}
    >
      {aktif ? "❤️ Favorit" : "🤍 Favorit"}
    </button>
  );
}