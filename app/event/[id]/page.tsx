// app/event/[id]/page.tsx - FIX: Jangan di-build statis, biar gak Failed to collect page data
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { notFound } from "next/navigation";
import { ambilEvent, ambilEvents } from "@/data/ambil";
import { rupiah } from "@/data/events";
import KartuEvent from "@/components/KartuEvent";

export default async function Detail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await ambilEvent(Number(id));
  if (!event) notFound();

  // Sisa dihitung dari terisi di Supabase, bukan dari hitung pesanan lagi
  // Biar konsisten sama yang tampil di Katalog + Pesan
  const terisi = Number(event.terisi ?? 0);
  const sisa = Math.max(0, Number(event.kuota ?? 0) - terisi);
  const habis = sisa <= 0;
  const persenTerisi = event.kuota > 0 ? Math.min(100, Math.round((terisi / event.kuota) * 100)) : 0;

  // Event terkait: kategori sama, id beda, ambil 3 aja
  const semua = await ambilEvents().catch(() => []);
  const terkait = semua.filter((e) => e.kategori === event.kategori && e.id !== event.id).slice(0, 3);

  return (
    <div className="w-full bg-[#120826] text-white" style={{ colorScheme: "dark" }}>
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text- font-bold text-white/50">
          <Link href="/" className="hover:text-white">🏠 Beranda</Link><span>›</span>
          <Link href="/event" className="hover:text-white">🎪 Event</Link><span>›</span>
          <span className="truncate text-amber-300">{event.judul}</span>
        </div>

        {/* GAMBAR / HEADER */}
        <div className="relative mt-4 overflow-hidden rounded- border border-white/10 shadow-2xl">
          {event.gambar ? (
            <img src={event.gambar} alt={event.judul ?? "Event"} className="h-64 w-full object-cover sm:h-80" />
          ) : (
            <div className="flex h-64 w-full flex-col items-center justify-center bg-linear-to-br from-violet-600 via-pink-500 to-orange-500 sm:h-80">
              <p className="text- drop-shadow-lg">🎪</p>
              <p className="mt-2 rounded-full bg-black/30 px-4 py-1.5 text- font-black tracking-widest backdrop-blur">{event.kategori.toUpperCase()}</p>
              <p className="mt-3 max-w-md px-6 text-center text- font-black leading-tight">{event.judul}</p>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#120826] to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-black/50 px-3.5 py-1.5 text- font-black text-amber-300 ring-1 ring-white/20 backdrop-blur">{event.kategori}</span>
            <span className={`rounded-full px-3.5 py-1.5 text- font-black backdrop-blur ${habis ? "bg-red-500" : "bg-emerald-500"}`}>{habis ? "❌ HABIS" : `✅ ${sisa} TERSISA`}</span>
          </div>
        </div>

        {/* INFO UTAMA - GELAP, BUKAN #FFF8E7 LAGI - ANTI-WHITE, BERWARNA, MODERN, MEMUKAU, RAPI */}
        <div className="relative mt-5 overflow-hidden rounded- border border-white/10 bg-[#1E103A]/90 p-6 shadow-xl sm:p-8">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/25 blur-" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-pink-500/25 blur-" />
          <div className="relative">
            <h1 className="text- font-black leading-tight sm:text-">{event.judul}</h1>
            <p className="mt-2 text-sm text-white/60">📍 {event.lokasi} • 📅 {event.tanggal}</p>
            <p className="mt-4 leading-relaxed text- text-white/70">{event.deskripsi || "Belum ada deskripsi untuk event ini."}</p>

            {/* PROGRESS TERISI */}
            <div className="mt-6 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <div className="flex items-center justify-between text- font-black">
                <span className="text-white/60">🔥 TERISI {terisi} / {event.kuota} • {persenTerisi}%</span>
                <span className="text-amber-300">{sisa} SISA</span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 transition-all" style={{ width: `${persenTerisi}%` }} />
              </div>
            </div>

            {/* 3 KARTU STATS - GELAP, BUKAN amber-100 / emerald-100 / pink-100 */}
            <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
              <div className="rounded-2xl bg-linear-to-br from-amber-500/20 to-orange-500/10 p-3 text-center ring-1 ring-amber-400/25 sm:p-4">
                <p className="text- font-black sm:text-">{event.harga === 0 ? "GRATIS" : rupiah(event.harga)}</p>
                <p className="mt-0.5 text- font-black tracking-widest text-white/40">HARGA</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-3 text-center ring-1 ring-white/10 sm:p-4">
                <p className="text- font-black sm:text-">{terisi}</p>
                <p className="mt-0.5 text- font-black tracking-widest text-white/40">TERPESAN</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-3 text-center ring-1 ring-white/10 sm:p-4">
                <p className={`text- font-black sm:text- ${habis ? "text-red-400" : "text-emerald-300"}`}>{sisa}</p>
                <p className="mt-0.5 text- font-black tracking-widest text-white/40">SISA KUOTA</p>
              </div>
            </div>

            {/* TOMBOL PESAN - UDAH DIBENERIN JADI ?event= BUKAN ?event_id= */}
            <Link href={`/pesan?event=${event.id}`} className={`mt-6 block rounded-full py-4 text-center text- font-black shadow-lg transition hover:scale-[1.01] ${habis ? "cursor-not-allowed bg-white/10 text-white/40" : "bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 shadow-[0_18px_40px_-10px_rgba(249,115,22,0.7)]"}`}>
              {habis ? "❌ Tiket Habis" : "🎟 Pesan Tiket →"}
            </Link>
            <div className="mt-3 flex gap-2">
              <Link href="/event" className="flex-1 rounded-full border border-white/20 bg-white/10 py-3 text-center text-sm font-black transition hover:bg-white/20 hover:text-white">← Semua Event</Link>
              <Link href="/pesanan" className="flex-1 rounded-full border border-white/20 bg-white/10 py-3 text-center text-sm font-black transition hover:bg-white/20 hover:text-white">📋 Pesanan Saya</Link>
            </div>
          </div>
        </div>

        {/* EVENT TERKAIT */}
        {terkait.length > 0 && (
          <div className="mt-8">
            <div className="flex items-end justify-between">
              <div>
                <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text- font-black tracking-widest text-white ring-1 ring-white/20 backdrop-blur">🎪 EVENT TERKAIT</span>
                <h2 className="mt-3 text- font-black">Mungkin Kamu Juga Suka</h2>
              </div>
              <Link href="/event" className="shrink-0 rounded-full border border-white/20 bg-white/10 px-4 py-2 text- font-black transition hover:bg-white/20 hover:text-white">Semua →</Link>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {terkait.map((e) => <KartuEvent key={e.id} event={e} />)}
            </div>
          </div>
        )}
        <div className="h-10" />
      </div>
    </div>
  );
}