"use client";

import { useEffect, useState } from "react";

function bacaFavorit(id: number) {
  if (typeof window === "undefined") return false;
  const ids: number[] = JSON.parse(localStorage.getItem("favorit") ?? "[]");
  return ids.includes(id);
}

export default function TombolFavorit({ id }: { id: number }) {
  const [aktif, setAktif] = useState(() => bacaFavorit(id));

  useEffect(() => {
    const sinkron = () => setAktif(bacaFavorit(id));
    sinkron();
    window.addEventListener("favorit-berubah", sinkron);
    window.addEventListener("storage", sinkron);
    return () => {
      window.removeEventListener("favorit-berubah", sinkron);
      window.removeEventListener("storage", sinkron);
    };
  }, [id]);

  const toggle = () => {
    const ids: number[] = JSON.parse(localStorage.getItem("favorit") ?? "[]");
    const baru = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
    localStorage.setItem("favorit", JSON.stringify(baru));
    window.dispatchEvent(new Event("favorit-berubah"));
    setAktif(!aktif);
  };

  return (
    <button onClick={toggle} className={`rounded-full border px-4 py-2 text-xs font-black transition ${aktif ? "bg-[#FFE4E6] border-red-200 text-red-700" : "bg-[#FFFEF7] border-orange-100 text-zinc-700 hover:bg-[#FFFBEB]"}`}>
      {aktif ? "❤️ Favorit" : "🤍 Favorit"}
    </button>
  );
}