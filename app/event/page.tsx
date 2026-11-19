"use client";

import { useEffect, useState } from "react";
import { ambilEvents } from "@/data/ambil";
import type { Event } from "@/data/events";
import KartuEvent from "@/components/KartuEvent";

const semuaKategori = [
  "Semua",
  "Workshop",
  "Olahraga",
  "Musik",
  "Bazar",
  "Lomba",
];

function warnaPill(kategori: string, aktif: boolean) {
  if (aktif) {
    // SEBELUM: bg-white + text-zinc-900 (putih) -> SESUDAH: gradient juara, dark
    return "bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 text-white shadow-xl shadow-orange-500/40 scale-[1.03] border-transparent";
  }

  if (kategori === "Workshop")
    return "border-orange-400/30 bg-orange-500/15 text-orange-300 hover:bg-orange-500/25";

  if (kategori === "Olahraga")
    return "border-emerald-400/30 bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25";

  if (kategori === "Musik")
    return "border-pink-400/30 bg-pink-500/15 text-pink-300 hover:bg-pink-500/25";

  if (kategori === "Bazar")
    return "border-amber-400/30 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25";

  if (kategori === "Lomba")
    return "border-yellow-400/30 bg-yellow-500/15 text-yellow-300 hover:bg-yellow-500/25";

  // SEBELUM: bg-white/[0.07] + hover:bg-white/[0.12] -> SESUDAH: bg-white/7 + hover:bg-white/12
  return "border-white/15 bg-white/7 text-white/80 hover:bg-white/12";
}

export default function Katalog() {
  const [events, setEvents] = useState<Event[]>([]);
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ambilEvents()
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error("Gagal mengambil event:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const hasil = events.filter((e) => {
    // ERROR SEBELUM: e.nama possibly undefined -> SESUDAH: (e.judul ?? "") + (e.lokasi ?? "")
    const cocokCari =
      (e.judul ?? "").toLowerCase().includes(cari.toLowerCase()) ||
      (e.lokasi ?? "").toLowerCase().includes(cari.toLowerCase());

    const cocokKategori =
      kategori === "Semua" || e.kategori === kategori;

    return cocokCari && cocokKategori;
  });

  function resetFilter() {
    setCari("");
    setKategori("Semua");
  }

  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-6">

      {/* HERO - DARK + GLOW */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#1E103A]/90 p-7 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur md:p-10">

        {/* BACKGROUND GLOW */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-orange-500/30 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-pink-500/30 blur-3xl" />

        <div className="pointer-events-none absolute left-1/2 top-0 h-24 w-72 rounded-full bg-violet-500/20 blur-3xl" />

        {/* LIVE BADGE - SEBELUM: bg-white + text-zinc-900 (putih) -> SESUDAH: dark glass */}
        <div className="pointer-events-none absolute right-8 top-6 hidden rotate-12 rounded-full bg-white/10 px-3 py-1.5 text-xs font-black tracking-widest text-white ring-1 ring-white/20 shadow-lg backdrop-blur md:block">
          🎪 LIVE!
        </div>

        <div className="relative">

          {/* LABEL */}
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black tracking-[0.16em] text-white backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>

            🎪 KATALOG EVENT • {events.length} EVENT
          </span>

          {/* TITLE */}
          <h1 className="mt-4 text-4xl font-black leading-[0.95] tracking-tight text-white md:text-6xl">
            Cari Event Seru,
            <br />

            {/* SEBELUM: bg-gradient-to-r -> SESUDAH: bg-linear-to-r */}
            <span className="bg-linear-to-r from-amber-300 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              Pesan
            </span>{" "}
            & Hadir!
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-white/65 md:text-base">
            Semua event sekolah dalam satu tempat — dari Supabase,
            update real-time. Tinggal cari, klik, pesan!
          </p>

          {/* SEARCH + FILTER - DARK GLASSMORPHISM */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">

            {/* SEARCH INPUT */}
            <div className="relative flex-1">

              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50">
                🔍
              </span>

              <input
                type="text"
                value={cari}
                onChange={(e) => setCari(e.target.value)}
                placeholder="Cari event, misal: Futsal, Musik, Workshop..."
                autoComplete="off"
                style={{
                  backgroundColor: "#160D2B",
                  color: "#FFFFFF",
                  colorScheme: "dark",
                  borderColor: "rgba(255,255,255,0.15)",
                }}
                // SEBELUM: !box-border !w-full !rounded-full ... !outline-none placeholder:!font-medium ... -> SESUDAH: semua ! pindah ke belakang
                className="box-border! w-full! rounded-full! border! border-white/15! bg-[#160D2B]! py-3.5! pl-12! pr-5! text-sm! font-bold! text-white! shadow-inner shadow-black/20 outline-none! backdrop-blur-xl transition-all duration-300 placeholder:font-medium! placeholder:text-white/40! hover:border-orange-400/50! focus:border-orange-400! focus:bg-[#21133D]! focus:ring-2! focus:ring-orange-400/25!"
              />

            </div>

            {/* CATEGORY SELECT */}
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              style={{
                backgroundColor: "#160D2B",
                color: "#FFFFFF",
                colorScheme: "dark",
                borderColor: "rgba(255,255,255,0.15)",
              }}
              // SEBELUM: !box-border !cursor-pointer ... -> SESUDAH: semua ! pindah ke belakang
              className="box-border! cursor-pointer! rounded-full! border! border-white/15! bg-[#160D2B]! px-6! py-3.5! text-sm! font-bold! text-white! shadow-lg outline-none! transition-all hover:border-orange-400/50! focus:border-orange-400! focus:ring-2! focus:ring-orange-400/25! [&>option]:bg-[#1E103A]! [&>option]:text-white!"
            >
              {semuaKategori.map((k) => (
                <option key={k} value={k}>
                  {k === "Semua" ? "🎪 Semua Kategori" : k}
                </option>
              ))}
            </select>

          </div>

          {/* MINI STATS */}
          <div className="mt-6 flex flex-wrap gap-2">

            {/* SEBELUM: bg-white/[0.08] -> SESUDAH: bg-white/8 */}
            <span className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-black text-white backdrop-blur">
              🎟 {events.length} Event Tersedia
            </span>

            <span className="rounded-full border border-emerald-400/30 bg-emerald-500/15 px-4 py-2 text-xs font-black text-emerald-300 backdrop-blur">
              🆓 {events.filter((e) => e.harga === 0).length} Gratis
            </span>

            <span className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-black text-white backdrop-blur">
              ⚡ Update dari Supabase
            </span>

          </div>

        </div>
      </div>

      {/* CATEGORY PILLS */}
      <div className="mt-8 flex flex-wrap gap-2">

        {semuaKategori.map((k) => (
          <button
            key={k}
            onClick={() => setKategori(k)}
            className={`rounded-full border px-5 py-2.5 text-sm font-black backdrop-blur transition hover:-translate-y-0.5 ${warnaPill(
              k,
              kategori === k
            )}`}
          >
            {k === "Semua"
              ? "🎪 Semua"
              : k === "Workshop"
              ? "💻 Workshop"
              : k === "Olahraga"
              ? "⚽ Olahraga"
              : k === "Musik"
              ? "🎵 Musik"
              : k === "Bazar"
              ? "🛍 Bazar"
              : "🏆 Lomba"}
          </button>
        ))}

      </div>

      {/* RESULT INFORMATION */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">

        <p className="text-sm font-bold text-white/60">
          Menampilkan{" "}
          <span className="font-black text-amber-300">
            {hasil.length}
          </span>{" "}
          event

          {kategori !== "Semua" && (
            <>
              {" "}• Kategori{" "}
              <span className="font-black text-white">
                {kategori}
              </span>
            </>
          )}

          {cari && (
            <>
              {" "}• Cari “
              <span className="font-black text-white">
                {cari}
              </span>
              ”
            </>
          )}
        </p>

        {(cari || kategori !== "Semua") && (
          <button
            onClick={resetFilter}
            className="rounded-full bg-red-500/15 px-4 py-1.5 text-xs font-black text-red-300 ring-1 ring-red-500/30 transition hover:bg-red-500 hover:text-white"
          >
            ✕ Reset Filter
          </button>
        )}

      </div>

      {/* LOADING STATE */}
      {loading ? (

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              // SEBELUM: bg-white/[0.05] -> SESUDAH: bg-white/5
              className="animate-pulse rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur"
            >
              <div className="h-48 rounded-2xl bg-white/10" />

              <div className="mt-4 h-5 w-3/4 rounded-full bg-white/10" />

              <div className="mt-2 h-4 w-1/2 rounded-full bg-white/10" />
            </div>
          ))}

        </div>

      ) : hasil.length === 0 ? (

        /* EMPTY STATE */
        <div className="mt-10 rounded-3xl border border-dashed border-white/20 bg-white/4 p-10 text-center backdrop-blur">

          {/* SEBELUM: bg-gradient-to-br -> SESUDAH: bg-linear-to-br */}
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-linear-to-br from-violet-500 to-pink-500 text-2xl shadow-lg shadow-pink-500/30">
            🔍
          </div>

          <p className="mt-3 text-lg font-black text-white">
            Event tidak ditemukan
          </p>

          <p className="text-sm text-white/60">
            Coba kata kunci atau kategori lain.
          </p>

          <button
            onClick={resetFilter}
            // SEBELUM: bg-gradient-to-r -> SESUDAH: bg-linear-to-r
            className="mt-5 rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 px-6 py-3 text-sm font-black text-white shadow-[0_15px_30px_-10px_rgba(249,115,22,0.6)] transition hover:scale-[1.03]"
          >
            Tampilkan Semua Event
          </button>

        </div>

      ) : (

        /* EVENT GRID */
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {hasil.map((event) => (
            <KartuEvent key={event.id} event={event} />
          ))}

        </div>

      )}

      {/* BOTTOM BANNER */}
      {/* SEBELUM: bg-gradient-to-r -> SESUDAH: bg-linear-to-r */}
      <div className="relative mt-12 flex flex-col items-start justify-between gap-5 overflow-hidden rounded-3xl bg-linear-to-r from-violet-600 via-pink-500 to-orange-500 p-7 shadow-[0_30px_60px_-20px_rgba(236,72,153,0.6)] md:flex-row md:items-center md:p-9">

        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/20 blur-3xl" />

        <div className="relative">

          <span className="rounded-full bg-black/25 px-3 py-1 text-xs font-black tracking-widest text-white backdrop-blur">
            ⏰ JANGAN DITUNDA
          </span>

          <p className="mt-3 text-xl font-black leading-tight text-white md:text-2xl">
            Jangan Sampai Kehabisan Tiket! 🎟
          </p>

          <p className="mt-1 text-sm text-white/85">
            Event favorit kamu bisa habis kapan aja. Cek sekarang, pesan sekarang.
          </p>

        </div>

        <a
          href="#top"
          // SEBELUM: bg-white + text-zinc-900 (putih) -> SESUDAH: dark glass
          className="relative shrink-0 rounded-full bg-[#120826]/85 px-7 py-3.5 text-sm font-black text-white ring-1 ring-white/25 shadow-xl backdrop-blur transition hover:scale-105"
        >
          Lihat Event →
        </a>

      </div>

    </main>
  );
}