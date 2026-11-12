"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const rupiah = (angka: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(angka);

type Event = {
  id: number;
  judul: string;
  tanggal: string;
  lokasi: string;
  harga: number;
  kategori: string;
  gambar?: string;
};

export default function FavoritPage() {
  const [semua, setSemua] = useState<Event[]>([]);
  const [status, setStatus] = useState("Memuat...");

  const muat = () => {
    const ids: number[] = JSON.parse(localStorage.getItem("favorit") ?? "[]");
    if (ids.length === 0) {
      setSemua([]);
      setStatus("Belum ada menu favorit.");
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
        setStatus(ketemu.length === 0 ? "Belum ada menu favorit." : "");
      })
      .catch(() => setStatus("Gagal memuat data favorit."));
  };

  useEffect(() => {
    muat();
    window.addEventListener("favorit-berubah", muat);
    window.addEventListener("storage", muat);
    return () => {
      window.removeEventListener("favorit-berubah", muat);
      window.removeEventListener("storage", muat);
    };
  }, []);

  if (status)
    return (
      <div className="rounded- bg-[#FFFBEB] border border-orange-100 p-8 md:p-10 text-center shadow-sm">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#FFFEF7] border border-orange-100 text-3xl">
          ❤️
        </div>
        <p className="mt-4 text-sm font-bold text-zinc-600">{status}</p>
        <Link
          href="/event"
          className="mt-6 inline-block rounded-full bg-[#FFC837] border-2 border-amber-300 px-6 py-3 text-sm font-black text-zinc-900"
        >
          Cari Event →
        </Link>
      </div>
    );

  return (
    <div>
      <div className="rounded- bg-[#FFFBEB] border border-orange-100 p-6 md:p-8 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900">
          Favorit
        </h1>
        <p className="mt-2 text-sm font-medium text-zinc-600">
          {semua.length} event yang kamu simpan.
        </p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {semua.map((e) => (
          <div
            key={e.id}
            className="group flex flex-col overflow-hidden rounded- bg-[#FFFEF7] border border-orange-100 transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative h- overflow-hidden">
              <Image
                src={e.gambar ?? "/img/default.png"}
                alt={e.judul}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-[#FFFEF7] border border-orange-100 px-3 py-1 text- font-black text-zinc-700 shadow-sm">
                {e.kategori}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="text- font-black leading-tight text-zinc-900">
                {e.judul}
              </h2>
              <p className="mt-1.5 text-xs font-bold text-zinc-600">
                📅 {e.tanggal} • 📍 {e.lokasi}
              </p>
              <p className="mt-3 text-xl font-black text-zinc-900">
                {rupiah(e.harga)}
              </p>
              <Link
                href={`/event/${e.id}`}
                className="mt-5 block text-center rounded-full bg-[#FFC837] border-2 border-amber-300 py-2.5 text-sm font-black text-zinc-900 hover:bg-[#FFD95E] transition"
              >
                Lihat Detail →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
