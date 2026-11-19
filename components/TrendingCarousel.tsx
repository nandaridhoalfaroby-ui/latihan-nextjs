"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { rupiah, type Event } from "@/data/events";

// TRENDING CAROUSEL - JUARA 1 DUNIA VIBES
// - Auto-geser tiap 3 detik kaya 【entity-Netflix¦canonical_name=Netflix】 / 【entity-Tiket.com¦canonical_name=Tiket.com】
// - Hover / swipe = auto berhenti, biar gak rebutan sama user
// - Ujung kanan -> balik lagi ke awal (loop)
// - Tombol < > + dot + progress
export default function TrendingCarousel({ events }: { events: Event[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [sedangHover, setSedangHover] = useState(false);
  const [userLagiSwipe, setUserLagiSwipe] = useState(false);
  const [indexAktif, setIndexAktif] = useState(0);

  const totalDot = Math.max(1, events.length - 2);

  useEffect(() => {
    if (sedangHover || userLagiSwipe) return;
    if (events.length <= 3) return;
    const t = setInterval(() => {
      const el = ref.current;
      if (!el) return;
      const kartu = el.querySelector<HTMLElement>("[data-kartu]");
      const lebarKartu = kartu ? kartu.offsetWidth + 16 : 340;
      const udahDiUjung = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;
      if (udahDiUjung) {
        el.scrollTo({ left: 0, behavior: "smooth" });
        setIndexAktif(0);
      } else {
        el.scrollBy({ left: lebarKartu, behavior: "smooth" });
        setIndexAktif((i) => Math.min(i + 1, totalDot - 1));
      }
    }, 3000);
    return () => clearInterval(t);
  }, [sedangHover, userLagiSwipe, events.length, totalDot]);

  function geser(kiri: boolean) {
    const el = ref.current;
    if (!el) return;
    const kartu = el.querySelector<HTMLElement>("[data-kartu]");
    const lebarKartu = kartu ? kartu.offsetWidth + 16 : 340;
    el.scrollBy({ left: kiri ? -lebarKartu : lebarKartu, behavior: "smooth" });
  }

  function keIndex(i: number) {
    const el = ref.current;
    if (!el) return;
    const kartu = el.querySelector<HTMLElement>("[data-kartu]");
    const lebarKartu = kartu ? kartu.offsetWidth + 16 : 340;
    el.scrollTo({ left: i * lebarKartu, behavior: "smooth" });
    setIndexAktif(i);
  }

  if (events.length === 0) return null;

  return (
    <section className="w-full">
      {/* HEADER TRENDING */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-amber-400/20 to-pink-500/20 px-4 py-2 text- font-black tracking-[0.18em] text-amber-300 ring-1 ring-amber-400/30 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
            </span>
            🔥 TRENDING MINGGU INI • LIVE
          </span>
          <h2 className="mt-3 text- font-black leading-[1.05] tracking-tight sm:text-">
            Event Terdekat{" "}
            <span className="bg-linear-to-r from-amber-300 via-orange-400 to-pink-500 bg-clip-text text-transparent">
              Buat Kamu
            </span>
          </h2>
          <p className="mt-1.5 text- font-medium text-white/60">
            Jangan sampai kehabisan tiket, pesan dari sekarang!
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => geser(true)}
            aria-label="Sebelumnya"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#1E103A]/90 text- font-black text-white shadow-lg backdrop-blur transition hover:scale-110 hover:border-amber-400/50 hover:text-amber-300"
          >
            ‹
          </button>
          <button
            onClick={() => geser(false)}
            aria-label="Berikutnya"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 text- font-black text-white shadow-[0_10px_25px_-8px_rgba(249,115,22,0.7)] transition hover:scale-110"
          >
            ›
          </button>
          <Link
            href="/event"
            className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text- font-black text-white backdrop-blur transition hover:border-white/30 hover:bg-white/10"
          >
            Semua Event →
          </Link>
        </div>
      </div>

      {/* LIST KARTU - BISA DI-SWIPE */}
      <div
        ref={ref}
        onMouseEnter={() => setSedangHover(true)}
        onMouseLeave={() => setSedangHover(false)}
        onTouchStart={() => setUserLagiSwipe(true)}
        onTouchEnd={() => setTimeout(() => setUserLagiSwipe(false), 2000)}
        className="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {events.map((e, idx) => {
          const terisi = Number(e.terisi ?? 0);
          const kuota = Number(e.kuota ?? 50);
          const persen = kuota > 0 ? Math.round((terisi / kuota) * 100) : 0;
          const sisa = Math.max(0, kuota - terisi);
          const listWarna = [
            { atas: "from-pink-500 via-orange-400 to-amber-300", badge: "from-pink-500 to-orange-400", bar: "from-amber-300 to-pink-500", emoji: "🎵" },
            { atas: "from-violet-600 via-fuchsia-500 to-pink-500", badge: "from-violet-500 to-pink-500", bar: "from-violet-400 to-pink-500", emoji: "🎨" },
            { atas: "from-emerald-500 via-teal-400 to-cyan-400", badge: "from-emerald-400 to-cyan-400", bar: "from-emerald-400 to-cyan-400", emoji: "⚽" },
            { atas: "from-amber-400 via-orange-500 to-rose-500", badge: "from-amber-400 to-rose-500", bar: "from-amber-400 to-orange-500", emoji: "🏆" },
            { atas: "from-cyan-500 via-blue-500 to-violet-500", badge: "from-cyan-400 to-violet-500", bar: "from-cyan-400 to-violet-500", emoji: "💻" },
            { atas: "from-rose-500 via-pink-500 to-fuchsia-500", badge: "from-rose-400 to-fuchsia-500", bar: "from-rose-400 to-pink-500", emoji: "🛍" },
          ];
          const w = listWarna[idx % listWarna.length];
          return (
            <article
              key={e.id}
              data-kartu
              className="group w- shrink-0 snap-start overflow-hidden rounded- border border-white/10 bg-[#1E103A]/95 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] backdrop-blur transition hover:-translate-y-2 hover:border-amber-400/40 hover:shadow-[0_30px_50px_-15px_rgba(249,115,22,0.5)] sm:w-"
            >
              {/* GAMBAR / COVER BERWARNA */}
              <div className={`relative h-48 overflow-hidden bg-linear-to-br ${w.atas}`}>
                {e.gambar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={e.gambar} alt={e.judul} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text- drop-shadow-2xl">{w.emoji}</div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent" />
                <span className={`absolute left-3 top-3 rounded-full bg-linear-to-r px-3 py-1.5 text- font-black tracking-[0.12em] text-white shadow-lg ${w.badge}`}>
                  {e.kategori === "Workshop" ? "💻 WORKSHOP" : e.kategori === "Musik" ? "🎵 MUSIK" : e.kategori === "Olahraga" ? "⚽ OLAHRAGA" : `🎪 ${e.kategori?.toUpperCase()}`}
                </span>
                <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text- ring-1 ring-white/25 backdrop-blur transition hover:scale-110">
                  ♡
                </span>
                {/* PROGRESS TIKET */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center justify-between text- font-black text-white drop-shadow">
                    <span>🔥 {persen}% tiket habis</span>
                    <span className="rounded-full bg-black/45 px-2 py-0.5 ring-1 ring-white/20 backdrop-blur">{sisa} tersisa</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/25">
                    <div className={`h-full rounded-full bg-linear-to-r ${w.bar}`} style={{ width: `${persen}%` }} />
                  </div>
                  <div className="mt-2.5 flex items-center justify-between gap-2">
                    <span className="rounded-full bg-[#120826]/85 px-3 py-1.5 text- font-black text-white ring-1 ring-white/20 backdrop-blur">
                      📅 {e.tanggal}
                    </span>
                    <span className="rounded-full bg-linear-to-r from-amber-400 to-orange-500 px-3 py-1.5 text- font-black text-white shadow-lg">
                      {e.harga === 0 ? "🆓 GRATIS" : rupiah(e.harga)}
                    </span>
                  </div>
                </div>
              </div>

              {/* ISI KARTU */}
              <div className="p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/5 px-3 py-1 text- font-bold text-white/70 ring-1 ring-white/10">
                    📍 {e.lokasi}
                  </span>
                  <span className="rounded-full bg-amber-400/15 px-3 py-1 text- font-black text-amber-300 ring-1 ring-amber-400/25">
                    ⭐ 4.9 • Super Seru
                  </span>
                </div>
                <h3 className="mt-3 line-clamp-1 text- font-black leading-tight">{e.judul}</h3>
                <p className="mt-1 line-clamp-2 min-h- text- leading-relaxed text-white/60">{e.deskripsi}</p>
                <div className="mt-4 flex items-center justify-between border-t border-dashed border-white/15 pt-3.5">
                  <span className="text- font-bold text-white/70">🎭 {terisi}+ sudah pesan</span>
                  <Link
                    href={`/event/${e.id}`}
                    className="rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 px-4 py-2 text- font-black text-white shadow-lg transition hover:scale-[1.05]"
                  >
                    Lihat Detail →
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* DOT + STATUS */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        {Array.from({ length: totalDot }).map((_, i) => (
          <button
            key={i}
            onClick={() => keIndex(i)}
            aria-label={`Ke slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${i === indexAktif ? "w-8 bg-linear-to-r from-amber-400 to-pink-500 shadow-lg" : "w-2 bg-white/25 hover:bg-white/45"}`}
          />
        ))}
        <span className="ml-2 rounded-full bg-white/5 px-3 py-1 text- font-bold text-white/55 ring-1 ring-white/10">
          {sedangHover ? "⏸️ Berhenti (di-hover)" : "▶️ Auto-geser tiap 3 detik • Swipe juga bisa"}
        </span>
      </div>
    </section>
  );
}