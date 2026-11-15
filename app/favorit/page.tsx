"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Event } from "@/data/events";
import { rupiah } from "@/data/events";

function warnaKategori(kategori: string) {
  const k = kategori.toLowerCase();
  if (k.includes("musik") || k.includes("konser")) return "bg-pink-500 text-white shadow-[0_4px_14px_rgba(236,72,153,0.4)]";
  if (k.includes("workshop") || k.includes("kelas") || k.includes("seminar")) return "bg-violet-500 text-white shadow-[0_4px_14px_rgba(139,92,246,0.4)]";
  if (k.includes("olahraga") || k.includes("sport")) return "bg-emerald-500 text-white shadow-[0_4px_14px_rgba(16,185,129,0.4)]";
  if (k.includes("seni") || k.includes("budaya")) return "bg-sky-500 text-white shadow-[0_4px_14px_rgba(14,165,233,0.4)]";
  if (k.includes("teknologi") || k.includes("tech")) return "bg-indigo-500 text-white shadow-[0_4px_14px_rgba(99,102,241,0.4)]";
  return "bg-amber-500 text-zinc-900 shadow-[0_4px_14px_rgba(245,158,11,0.4)]";
}

export default function FavoritPage() {
  const [semua, setSemua] = useState<Event[]>([]);
  const [status, setStatus] = useState("Memuat...");

  const muat = useCallback(() => {
    const ids: number[] = JSON.parse(localStorage.getItem("favorit") ?? "[]");
    if (ids.length === 0) {
      setSemua([]);
      setStatus("Belum ada event favorit.");
      return;
    }
    fetch("/api/events")
      .then((r) => {
        if (!r.ok) throw new Error("Gagal memuat");
        return r.json();
      })
      .then((data: Event[]) => {
        const ketemu = data.filter((e) => ids.includes(e.id));
        setSemua(ketemu);
        setStatus(ketemu.length === 0 ? "Belum ada event favorit." : "");
      })
      .catch(() => setStatus("Gagal memuat data favorit."));
  }, []);

  useEffect(() => {
    const t = setTimeout(muat, 0);
    window.addEventListener("favorit-berubah", muat);
    window.addEventListener("storage", muat);
    return () => {
      clearTimeout(t);
      window.removeEventListener("favorit-berubah", muat);
      window.removeEventListener("storage", muat);
    };
  }, [muat]);

  const hapusSatu = (id: number) => {
    const ids: number[] = JSON.parse(localStorage.getItem("favorit") ?? "[]");
    const baru = ids.filter((x) => x !== id);
    localStorage.setItem("favorit", JSON.stringify(baru));
    window.dispatchEvent(new Event("favorit-berubah"));
    muat();
  };

  const hapusSemua = () => {
    if (!confirm("Hapus semua favorit?")) return;
    localStorage.setItem("favorit", JSON.stringify([]));
    window.dispatchEvent(new Event("favorit-berubah"));
    muat();
  };

  if (status) return (
    <div className="overflow-hidden rounded- bg-[#FFFBEB] border-2 border-orange-100 shadow-sm">
      <div className="bg-gradient-to-r from-[#FFC837] via-[#FFB020] to-[#FF7A18] px-6 py-8 md:py-10 text-center">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded- bg-[#FFFEF7] border-2 border-amber-200 text-4xl shadow-lg rotate-3">💛</div>
        <h1 className="mt-4 text-2xl md:text-3xl font-black text-zinc-900">Favorit Kamu</h1>
        <p className="mt-1 text-sm font-bold text-zinc-700/80">Event yang kamu simpan bakal muncul di sini</p>
      </div>
      <div className="p-8 md:p-10 text-center">
        <p className="text-sm font-bold text-zinc-600">{status}</p>
        <Link href="/event" className="mt-6 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-black text-[#FFC837] shadow-lg hover:-translate-y-0.5 transition">
          Cari Event
          <span className="grid h-5 w-5 place-items-center rounded-full bg-[#FFC837] text- text-zinc-900">→</span>
        </Link>
      </div>
    </div>
  );

  return (
    <div>
      {/* HEADER BANNER */}
      <div className="relative overflow-hidden rounded- bg-gradient-to-r from-[#FFC837] via-[#FFB020] to-[#FF7A18] border-2 border-amber-300 p-6 md:p-8 shadow-[0_12px_30px_rgba(255,122,24,0.25)]">
        {/* dekorasi bulat */}
        <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-white/20 blur-" />
        <div className="absolute -right-2 top-16 h-20 w-20 rounded-full bg-[#FFFEF7]/40" />
        <div className="relative flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1.5 text- font-black text-[#FFC837]">❤️ KOLEKSI KAMU</span>
            <h1 className="mt-3 text-2xl md:text-3xl font-black tracking-tight text-zinc-900">Favorit</h1>
            <p className="mt-1.5 text-sm font-bold text-zinc-800/80">{semua.length} event yang kamu simpan. Jangan sampai kehabisan tiketnya!</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#FFFEF7] border-2 border-amber-200 text-2xl font-black text-zinc-900 shadow-md rotate-3">{semua.length}</div>
            <button onClick={hapusSemua} className="rounded-full bg-white/80 backdrop-blur border border-white/60 px-4 py-2.5 text-xs font-black text-red-600 hover:bg-white transition">Hapus Semua ✕</button>
          </div>
        </div>
      </div>

      {/* GRID KARTU */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {semua.map((e) => (
          <div key={e.id} className="group relative flex flex-col overflow-hidden rounded- bg-[#FFFEF7] border-2 border-orange-100 shadow-[0_6px_24px_rgba(251,146,60,0.10)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(251,146,60,0.22)]">
            <div className="relative h- overflow-hidden">
              <Image src={e.gambar ?? "/img/default.png"} alt={e.judul} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
              <span className={`absolute left-3 top-3 rounded-full px-3 py-1.5 text- font-black tracking-wide ${warnaKategori(e.kategori)}`}>{e.kategori}</span>

              {/* Tombol hapus favorit */}
              <button
                onClick={() => hapusSatu(e.id)}
                title="Hapus dari favorit"
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-[#FFFEF7] border border-orange-100 text- shadow-lg hover:scale-110 active:scale-95 transition"
              >
                ❤️
              </button>

              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div className="rounded-2xl bg-[#FFFEF7]/95 backdrop-blur px-3.5 py-2 shadow-lg border border-orange-100">
                  <p className="text- font-black tracking-widest text-orange-600">HARGA TIKET</p>
                  <p className="text- font-black leading-none text-zinc-900">{rupiah(e.harga)}</p>
                </div>
                <span className="rounded-full bg-zinc-900/80 backdrop-blur px-3 py-1.5 text- font-bold text-white">📅 {e.tanggal}</span>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h2 className="text- font-black leading-tight text-zinc-900 group-hover:text-orange-600 transition line-clamp-2 min-h-">{e.judul}</h2>
              <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-zinc-600">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#FFF7D6] border border-orange-100 text-">📍</span>
                <span className="line-clamp-1">{e.lokasi}</span>
              </p>
              <Link href={`/event/${e.id}`} className="mt-4 flex items-center justify-center gap-2 rounded-full bg-zinc-900 py-3 text-sm font-black text-[#FFC837] shadow-[0_8px_20px_rgba(0,0,0,0.18)] hover:bg-zinc-800 hover:-translate-y-0.5 transition-all">
                Lihat Detail
                <span className="grid h-5 w-5 place-items-center rounded-full bg-[#FFC837] text- text-zinc-900">→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}