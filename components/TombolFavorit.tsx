"use client";

import { useEffect, useState } from "react";

function bacaFavorit(id: number) {
  if (typeof window === "undefined") return false;
  try {
    const ids: number[] = JSON.parse(localStorage.getItem("favorit") ?? "[]");
    return ids.includes(id);
  } catch {
    return false;
  }
}

export default function TombolFavorit({ id }: { id: number }) {
  const [aktif, setAktif] = useState(() => bacaFavorit(id));
  const [ngePop, setNgePop] = useState(false);

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
    setNgePop(true);
    setTimeout(() => setNgePop(false), 250);
  };

  return (
    <button
      onClick={toggle}
      aria-pressed={aktif}
      aria-label={aktif ? "Hapus dari favorit" : "Simpan ke favorit"}
      className={`inline-flex items-center gap-2 rounded-full border-2 px-4 py-2.5 text-xs font-black transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
        aktif
          // SEBELUM: bg-gradient-to-r -> SESUDAH: bg-linear-to-r
          ? "border-pink-400 bg-linear-to-r from-pink-500 to-rose-500 text-white shadow-[0_6px_18px_rgba(236,72,153,0.4)]"
          // SEBELUM: bg-[#FFFEF7] + border-orange-100 + text-zinc-700 + hover:bg-[#FFF7D6] -> SESUDAH: dark glass anti-white
          : "border-white/15 bg-[#2A1B52]/90 text-white/85 shadow-[0_6px_18px_rgba(0,0,0,0.35)] backdrop-blur hover:border-pink-400/50 hover:bg-pink-500/20 hover:text-white"
      } ${ngePop ? "scale-110" : ""}`}
    >
      <span className={`text- transition-transform duration-200 ${ngePop ? "scale-125" : ""}`}>
        {aktif ? "❤" : "🤍"}
      </span>
      {aktif ? "Disimpan!" : "Favorit"}
      {aktif && (
        <span className="grid h-5 w-5 place-items-center rounded-full bg-white/25 text-">✓</span>
      )}
    </button>
  );
}