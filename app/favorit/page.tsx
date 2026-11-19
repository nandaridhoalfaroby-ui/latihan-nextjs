"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ambilEvents } from "@/data/ambil";
import { rupiah, type Event } from "@/data/events";

function warnaKategori(kategori: string) {
  if (kategori === "Workshop") return "bg-orange-500 text-white shadow-orange-500/40";
  if (kategori === "Musik") return "bg-pink-500 text-white shadow-pink-500/40";
  if (kategori === "Olahraga") return "bg-emerald-500 text-white shadow-emerald-500/40";
  // SEBELUM: bg-amber-400 + text-zinc-900 (putih nyangkut) -> SESUDAH: dark text
  if (kategori === "Bazar") return "bg-amber-400 text-[#120826] shadow-amber-500/40";
  if (kategori === "Lomba") return "bg-yellow-400 text-[#120826] shadow-yellow-500/40";
  return "bg-violet-500 text-white shadow-violet-500/40";
}

// BARU: helper sisa, karena di type Event gak ada field 'sisa'
function sisaTiket(e: Event) {
  return Math.max(0, (e.kuota ?? 0) - (e.terisi ?? 0));
}

export default function FavoritPage() {
  const [semua, setSemua] = useState<Event[]>([]);
  const [favoritIds, setFavoritIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ambilEvents().then((data) => {
      setSemua(data);
      setLoading(false);
    });
    try {
      const dari1 = JSON.parse(localStorage.getItem("favorit-eventku") || "[]");
      const dari2 = JSON.parse(localStorage.getItem("favorit") || "[]");
      const gabung = [...dari1, ...dari2].map((x) => Number(typeof x === "object" ? x.id ?? x.eventId : x));
      setFavoritIds([...new Set(gabung)].filter((n) => !Number.isNaN(n)));
    } catch {
      setFavoritIds([]);
    }
  }, []);

  function hapusFavorit(id: number) {
    const sisa = favoritIds.filter((x) => x !== id);
    setFavoritIds(sisa);
    localStorage.setItem("favorit-eventku", JSON.stringify(sisa));
    localStorage.setItem("favorit", JSON.stringify(sisa));
    window.dispatchEvent(new Event("favorit-berubah"));
  }

  const favorit = semua.filter((e) => favoritIds.includes(e.id));

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            // SEBELUM: bg-white/[0.05] -> SESUDAH: bg-white/5
            <div key={i} className="animate-pulse rounded- border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="h-48 rounded-2xl bg-white/10" />
              <div className="mt-4 h-5 w-3/4 rounded-full bg-white/10" />
              <div className="mt-2 h-4 w-1/2 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm font-black tracking-widest text-white/50">MEMUAT FAVORIT...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-6">
      {/* HERO FAVORIT - DARK + PINK GLOW */}
      <div className="relative overflow-hidden rounded- border border-white/10 bg-[#1E103A]/90 p-7 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur md:p-10">
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-pink-500/30 blur-" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-rose-500/25 blur-" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-24 w-72 rounded-full bg-violet-500/20 blur-" />
        {/* SEBELUM: bg-white + text-zinc-900 (putih) -> SESUDAH: dark glass */}
        <div className="pointer-events-none absolute right-8 top-6 hidden rotate-12 rounded-full bg-white/10 px-3 py-1.5 text- font-black tracking-widest text-white ring-1 ring-white/20 shadow-lg backdrop-blur md:block">
          ❤ {favorit.length} DISUKAI
        </div>

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-pink-400/30 bg-pink-500/15 px-4 py-2 text- font-black tracking-[0.16em] text-pink-300 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-400" />
            </span>
            ❤ FAVORIT SAYA
          </span>
          <h1 className="mt-4 text- font-black leading-[0.95] tracking-tight text-white md:text-">
            Event yang Kamu
            <br />
            {/* SEBELUM: bg-gradient-to-r -> SESUDAH: bg-linear-to-r */}
            <span className="bg-linear-to-r from-pink-400 via-rose-400 to-amber-300 bg-clip-text text-transparent">
              Suka
            </span>{" "}
            Semua di Sini!
          </h1>
          <p className="mt-3 max-w-xl text- font-medium leading-relaxed text-white/65 md:text-">
            {favorit.length === 0
              ? "Belum ada favorit. Yuk tandai event yang kamu suka!"
              : `Kamu punya ${favorit.length} event favorit. Jangan sampai kehabisan tiket!`}
          </p>

          {/* MINI STATS */}
          <div className="mt-6 flex flex-wrap gap-2">
            {/* SEBELUM: bg-white/[0.08] -> SESUDAH: bg-white/8 */}
            <span className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text- font-black text-white backdrop-blur">
              ❤ {favorit.length} Favorit
            </span>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/15 px-4 py-2 text- font-black text-emerald-300 backdrop-blur">
              🆓 {favorit.filter((e) => e.harga === 0).length} Gratis
            </span>
            <span className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text- font-black text-white backdrop-blur">
              {/* ERROR SEBELUM: e.sisa gak ada -> SESUDAH: sisaTiket(e) = kuota - terisi */}
              🎟 {favorit.filter((e) => sisaTiket(e) > 0).length} Masih Tersedia
            </span>
          </div>
        </div>
      </div>

      {favorit.length === 0 ? (
        // SEBELUM: bg-white/[0.04] -> SESUDAH: bg-white/4
        <div className="mt-10 rounded- border border-dashed border-white/20 bg-white/4 p-10 text-center backdrop-blur">
          {/* SEBELUM: bg-gradient-to-br -> SESUDAH: bg-linear-to-br */}
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-linear-to-br from-pink-500 to-rose-500 text- shadow-lg shadow-pink-500/30">
            💔
          </div>
          <p className="mt-3 text- font-black text-white">Belum ada favorit</p>
          <p className="mt-1 text-sm text-white/60">
            Buka katalog, klik tombol hati di kartu event, nanti muncul di sini.
          </p>
          <Link
            href="/event"
            className="mt-6 inline-block rounded-full bg-linear-to-r from-pink-500 via-rose-500 to-orange-400 px-7 py-3.5 text-sm font-black text-white shadow-[0_15px_30px_-10px_rgba(236,72,153,0.6)] transition hover:scale-[1.03]"
          >
            Cari Event →
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorit.map((e) => {
            const sisa = sisaTiket(e);
            return (
            <div
              key={e.id}
              className="group flex flex-col overflow-hidden rounded- border border-white/10 bg-[#1E103A]/90 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur transition hover:-translate-y-1.5 hover:border-pink-400/40 hover:shadow-[0_25px_50px_-15px_rgba(236,72,153,0.4)]"
            >
              <div className="relative h-48 w-full overflow-hidden">
                {e.gambar ? (
                  <Image
                    src={e.gambar}
                    // ERROR SEBELUM: alt={e.nama} -> string | undefined, gak boleh. SESUDAH: e.judul ?? "Event"
                    alt={e.judul ?? "Event"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-pink-600 via-rose-500 to-orange-400 text-">
                    ❤
                  </div>
                )}
                {/* SEBELUM: bg-gradient-to-t -> SESUDAH: bg-linear-to-t */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/60 to-transparent" />
                <span className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text- font-black tracking-widest shadow-lg ${warnaKategori(e.kategori)}`}>
                  {e.kategori.toUpperCase()}
                </span>
                <button
                  onClick={() => hapusFavorit(e.id)}
                  className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1.5 text- font-black text-white backdrop-blur transition hover:bg-red-500 hover:text-white"
                >
                  ♥ Hapus
                </button>
                {/* SEBELUM: bg-white + text-zinc-900 (putih) -> SESUDAH: dark glass */}
                <span className="absolute bottom-3 left-4 rounded-full bg-[#120826]/85 px-3 py-1 text- font-black text-white ring-1 ring-white/20 shadow backdrop-blur">
                  {e.harga === 0 ? "GRATIS 🎉" : rupiah(e.harga)}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text- font-black leading-tight text-white transition group-hover:text-pink-300">
                  {/* SEBELUM: e.nama -> SESUDAH: e.judul */}
                  {e.judul}
                </h3>
                <p className="mt-1.5 text- font-medium text-white/55">
                  📍 {e.lokasi} • 📅 {e.tanggal}
                </p>
                <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-white/65">
                  {e.deskripsi}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-dashed border-white/15 pt-4">
                  <span className="text- font-black tracking-widest text-white/50">
                    {/* ERROR SEBELUM: e.sisa gak ada -> SESUDAH: sisa = kuota - terisi */}
                    {sisa === 0 ? "🔴 HABIS" : `🟢 SISA ${sisa}`}
                  </span>
                  {/* SEBELUM: bg-white + text-zinc-900 (putih) -> SESUDAH: dark glass */}
                  <Link
                    href={`/event/${e.id}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text- font-black text-white ring-1 ring-white/20 shadow transition hover:scale-[1.03] hover:bg-pink-500 hover:text-white"
                  >
                    Lihat Detail →
                  </Link>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      )}

      {/* BANNER BAWAH - GRADIENT MEWAH */}
      {/* SEBELUM: bg-gradient-to-r -> SESUDAH: bg-linear-to-r */}
      <div className="relative mt-12 flex flex-col items-start justify-between gap-4 overflow-hidden rounded- bg-linear-to-r from-pink-600 via-rose-500 to-orange-500 p-7 shadow-[0_30px_60px_-20px_rgba(236,72,153,0.6)] md:flex-row md:items-center md:p-8">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
        <div className="relative">
          <span className="rounded-full bg-black/25 px-3 py-1 text- font-black tracking-widest text-white backdrop-blur">⏰ JANGAN DITUNDA</span>
          <p className="mt-2 text- font-black text-white">Suka semua event ini? 🎟</p>
          <p className="text-sm text-white/85">Pesan sekarang sebelum kehabisan!</p>
        </div>
        {/* SEBELUM: bg-white + text-zinc-900 (putih) -> SESUDAH: dark glass */}
        <Link
          href="/event"
          className="relative shrink-0 rounded-full bg-[#120826]/85 px-7 py-3.5 text-sm font-black text-white ring-1 ring-white/25 shadow-xl backdrop-blur transition hover:scale-105"
        >
          Cari Event Lain →
        </Link>
      </div>
    </main>
  );
}