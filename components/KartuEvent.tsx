"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { rupiah, type Event } from "@/data/events";

function styleKategori(kategori: string) {
  const k = (kategori || "").toLowerCase();
  if (k.includes("workshop"))
    return {
      badge: "bg-linear-to-r from-orange-500 to-amber-500 text-white shadow-orange-500/40",
      emoji: "💻",
      gradasi: "from-orange-600 via-amber-500 to-yellow-400",
      glow: "group-hover:shadow-[0_30px_60px_-15px_rgba(249,115,22,0.55)]",
      border: "hover:border-orange-400/50",
      text: "group-hover:text-orange-300",
    };
  if (k.includes("musik"))
    return {
      badge: "bg-linear-to-r from-pink-500 to-rose-500 text-white shadow-pink-500/40",
      emoji: "🎵",
      gradasi: "from-pink-600 via-rose-500 to-fuchsia-500",
      glow: "group-hover:shadow-[0_30px_60px_-15px_rgba(236,72,153,0.55)]",
      border: "hover:border-pink-400/50",
      text: "group-hover:text-pink-300",
    };
  if (k.includes("olahraga"))
    return {
      badge: "bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-emerald-500/40",
      emoji: "⚽",
      gradasi: "from-emerald-600 via-teal-500 to-cyan-500",
      glow: "group-hover:shadow-[0_30px_60px_-15px_rgba(16,185,129,0.55)]",
      border: "hover:border-emerald-400/50",
      text: "group-hover:text-emerald-300",
    };
  if (k.includes("bazar"))
    return {
      badge: "bg-linear-to-r from-amber-500 to-yellow-500 text-zinc-900 shadow-amber-500/40",
      emoji: "🛍",
      gradasi: "from-amber-500 via-yellow-400 to-orange-400",
      glow: "group-hover:shadow-[0_30px_60px_-15px_rgba(245,158,11,0.55)]",
      border: "hover:border-amber-400/50",
      text: "group-hover:text-amber-300",
    };
  if (k.includes("lomba"))
    return {
      badge: "bg-linear-to-r from-yellow-400 to-amber-400 text-zinc-900 shadow-yellow-400/40",
      emoji: "🏆",
      gradasi: "from-yellow-500 via-amber-400 to-orange-500",
      glow: "group-hover:shadow-[0_30px_60px_-15px_rgba(250,204,21,0.55)]",
      border: "hover:border-yellow-400/50",
      text: "group-hover:text-yellow-300",
    };
  return {
    badge: "bg-linear-to-r from-violet-500 to-purple-500 text-white shadow-violet-500/40",
    emoji: "🎉",
    gradasi: "from-violet-600 via-purple-500 to-pink-500",
    glow: "group-hover:shadow-[0_30px_60px_-15px_rgba(139,92,246,0.55)]",
    border: "hover:border-violet-400/50",
    text: "group-hover:text-violet-300",
  };
}

export default function KartuEvent({ event }: { event: Event }) {
  const [suka, setSuka] = useState(false);
  const s = styleKategori(event.kategori);

  // BENER: di data model kita field-nya judul, bukan nama
  const judul = event.judul ?? "";
  const terisi = Number(event.terisi ?? 0);
  const kuota = Number(event.kuota ?? 0);
  const sisa = Math.max(0, kuota - terisi);
  const persen = kuota > 0 ? Math.min(100, Math.round((terisi / kuota) * 100)) : 0;
  const habis = sisa <= 0;

  useEffect(() => {
    try {
      const fav = JSON.parse(localStorage.getItem("favorit-eventku") || "[]");
      setSuka(fav.includes(event.id));
    } catch {}
  }, [event.id]);

  function toggleFavorit(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      const fav: number[] = JSON.parse(localStorage.getItem("favorit-eventku") || "[]");
      let baru: number[];
      if (fav.includes(event.id)) {
        baru = fav.filter((x) => x !== event.id);
        setSuka(false);
      } else {
        baru = [...fav, event.id];
        setSuka(true);
      }
      localStorage.setItem("favorit-eventku", JSON.stringify(baru));
      localStorage.setItem("favorit", JSON.stringify(baru));
    } catch {}
  }

  return (
    <Link
      href={`/event/${event.id}`}
      className={`group relative flex flex-col overflow-hidden rounded- border border-white/10 bg-[#1E103A]/90 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur transition duration-500 hover:-translate-y-2 ${s.glow} ${s.border}`}
    >
      {/* GAMBAR + GRADASI BERWARNA PEKAT */}
      <div className={`relative h-48 w-full overflow-hidden bg-linear-to-br ${s.gradasi}`}>
        {event.gambar ? (
          <Image
            src={event.gambar}
            // BENER: alt harus string, gak boleh undefined. event.nama -> event.judul, + ?? "" biar aman
            alt={judul}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text- drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)] transition duration-500 group-hover:scale-125 group-hover:-rotate-6">
            {s.emoji}
          </div>
        )}

        {/* Overlay gelap biar badge kebaca + efek kilau */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#120826]/95 via-[#120826]/20 to-transparent" />
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition duration-1000 group-hover:translate-x-full" />

        {/* Badge kategori - glass + gradient */}
        <span className={`absolute left-4 top-4 rounded-full px-3.5 py-1.5 text- font-black tracking-wide shadow-lg backdrop-blur ${s.badge}`}>
          {s.emoji} {event.kategori.toUpperCase()}
        </span>

        {/* Tombol Favorit - glass modern */}
        <button
          onClick={toggleFavorit}
          aria-label="Tambah ke favorit"
          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text- shadow-lg backdrop-blur transition hover:scale-125 active:scale-90 ${
            suka
              ? "bg-linear-to-br from-pink-500 to-rose-600 text-white ring-2 ring-white/30"
              : "bg-black/40 text-white ring-1 ring-white/30 hover:bg-pink-500"
          }`}
        >
          {suka ? "❤" : "♡"}
        </button>

        {/* Progress tiket - SEKARANG BENERAN DARI DATABASE, BUKAN 82% PALSU */}
        <div className="absolute bottom-14 left-4 right-4">
          <div className="flex items-center justify-between text- font-bold text-white/90">
            <span>🔥 {persen}% tiket habis</span>
            <span>{habis ? "HABIS" : `${sisa} tersisa`}</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-linear-to-r from-amber-300 to-pink-400" style={{ width: `${persen}%` }} />
          </div>
        </div>

        {/* Tanggal + Harga */}
        <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
          <span className="rounded-full bg-white/95 px-3 py-1.5 text- font-black text-zinc-900 shadow">
            📅 {String(event.tanggal).slice(0, 10)}
          </span>
          <span
            className={`rounded-full px-3.5 py-1.5 text- font-black shadow-lg ${
              event.harga === 0
                ? "bg-linear-to-r from-emerald-400 to-teal-400 text-white"
                : "bg-white px-3.5 text-zinc-900"
            }`}
          >
            {event.harga === 0 ? "🆓 GRATIS" : rupiah(event.harga)}
          </span>
        </div>
      </div>

      {/* ISI - DARK GLASS */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className={`text- font-black leading-tight text-white transition ${s.text}`}>
          {judul}
        </h3>

        <p className="mt-2.5 flex flex-wrap items-center gap-1.5">
          <span className="rounded-full border border-white/10 bg-white/8 px-2.5 py-1 text- font-bold text-white/80">
            📍 {event.lokasi}
          </span>
          <span className="rounded-full border border-white/10 bg-white/8 px-2.5 py-1 text- font-bold text-amber-300">
            ⭐ 4.9
          </span>
        </p>

        <p className="mt-2.5 line-clamp-2 flex-1 text-[13.5px] leading-relaxed text-white/60">
          {event.deskripsi}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-dashed border-white/15 pt-4">
          <div className="flex items-center gap-2">
            <span className="flex -space-x-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br from-pink-500 to-rose-500 text- ring-2 ring-[#1E103A]">😍</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br from-amber-400 to-orange-500 text- ring-2 ring-[#1E103A]">🔥</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-linear-to-br from-emerald-400 to-teal-500 text- ring-2 ring-[#1E103A]">✨</span>
            </span>
            <span className="text- font-bold text-white/60">
              <span className="text-white">{terisi}+</span> sudah pesan
            </span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text- font-black text-zinc-900 shadow transition group-hover:bg-linear-to-r group-hover:from-amber-400 group-hover:to-pink-500 group-hover:text-white">
            Lihat Detail
            <span className="transition group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>

      {/* GARIS WARNA ATAS - SELALU ADA, BUKAN CUMA PAS HOVER */}
      <div className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r ${s.gradasi}`} />
    </Link>
  );
}