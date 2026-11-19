"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { rupiah } from "@/data/events";

// BACA JSON DENGAN AMAN - BIAR GAK MELEDAK KALAU API 404 / BALIKIN HTML
async function bacaJsonAman(r: Response) {
  const teks = await r.text();
  const teksBersih = teks.trim();
  if (!teksBersih) return { ok: false, error: "Respon kosong dari server" };
  if (teksBersih.startsWith("<")) {
    return {
      ok: false,
      error: `API ${r.url} balikin HTML (status ${r.status}), bukan JSON. File app/api/pesanan/route.ts belum ada / belum ke-restart.`,
    };
  }
  try {
    return JSON.parse(teksBersih);
  } catch {
    return { ok: false, error: "Respon server bukan JSON yang valid" };
  }
}

export default function AdminDashboard() {
  const [events, setEvents] = useState<any[]>([]);
  const [pesanan, setPesanan] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  async function muat() {
    setLoading(true);
    // EVENTS
    try {
      const r = await fetch("/api/events", { cache: "no-store" });
      const j = await bacaJsonAman(r);
      if (Array.isArray(j)) setEvents(j);
      else if (Array.isArray(j.events)) setEvents(j.events);
      else if (Array.isArray(j.data)) setEvents(j.data);
      else setEvents([]);
    } catch (e) {
      console.error("GET /api/events error:", e);
      setEvents([]);
    }

    // PESANAN - INI YANG ERROR DI BARIS 51 TADI
    // SEBELUM: const j = await r.json() -> meledak kalau 404 HTML
    // SESUDAH: const j = await bacaJsonAman(r) -> aman, cuma console.error doang
    let dariDB: any[] = [];
    try {
      const r = await fetch("/api/pesanan", { cache: "no-store" });
      const j = await bacaJsonAman(r);
      if (j.ok && Array.isArray(j.pesanan)) {
        dariDB = j.pesanan;
      } else if (!j.ok) {
        console.error("GET /api/pesanan gagal:", j.error);
      }
    } catch (e) {
      console.error("GET /api/pesanan error:", e);
      dariDB = [];
    }

    // Gabung sama lokal biar Dashboard gak 0 padahal ada pesanan di perangkat ini
    let dariLokal: any[] = [];
    try {
      dariLokal = JSON.parse(localStorage.getItem("pesanan-eventku") || "[]");
      if (!Array.isArray(dariLokal)) dariLokal = [];
    } catch { dariLokal = []; }

    const kunci = (p: any) => [Number(p.event_id), p.nama, p.email, Number(p.jumlah), Number(p.total)].join("|");
    const kunciDB = new Set(dariDB.map(kunci));
    const lokalBaru = dariLokal.filter((p) => !kunciDB.has(kunci(p)));
    setPesanan([...dariDB, ...lokalBaru]);
    setLoading(false);
  }

  useEffect(() => {
    setMounted(true);
    muat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalTiket = pesanan.reduce((s, p) => s + Number(p.jumlah || 0), 0);
  const totalBayar = pesanan.reduce((s, p) => s + Number(p.total || 0), 0);
  const totalGratis = pesanan.filter((p) => Number(p.total || 0) === 0).length;

  return (
    <div className="space-y-6">
      {/* HEADER DASHBOARD - GELAP, BERWARNA, MEMUKAU, ANTI-WHITE */}
      <div className="relative overflow-hidden rounded- border border-white/10 bg-[#1E103A]/90 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] backdrop-blur sm:p-7">
        <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-violet-500/25 blur-" />
        <div className="pointer-events-none absolute -bottom-10 left-[40%] h-40 w-40 rounded-full bg-pink-500/20 blur-" />
        <div className="pointer-events-none absolute right-[30%] top-0 h-24 w-24 rounded-full bg-amber-400/20 blur-" />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3.5 py-1.5 text- font-black tracking-[0.16em] text-amber-300 ring-1 ring-white/15">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            📊 DASHBOARD ADMIN • LIVE
          </span>
          <h1 className="mt-3 text- font-black leading-[1.05] tracking-tight sm:text-">
            Halo Admin,{" "}
            <span className="bg-linear-to-r from-amber-300 via-orange-400 to-pink-500 bg-clip-text text-transparent">
              Semua Terkendali!
            </span>
          </h1>
          <p className="mt-1.5 max-w-2xl text- leading-relaxed text-white/60">
            Pantau event, pesanan, dan tiket dari sini. Semua data update otomatis dari Supabase + perangkat ini.
          </p>

          {/* STATS */}
          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
            <div className="rounded- border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:border-amber-400/30">
              <p className="text- font-black tracking-widest text-white/50">TOTAL EVENT</p>
              <p className="mt-1 text- font-black leading-none">{events.length}</p>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[85%] rounded-full bg-linear-to-r from-amber-400 to-orange-500" />
              </div>
            </div>
            <div className="rounded- border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:border-pink-400/30">
              <p className="text- font-black tracking-widest text-white/50">TOTAL PESANAN</p>
              <p className="mt-1 text- font-black leading-none text-pink-300">{pesanan.length}</p>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[70%] rounded-full bg-linear-to-r from-pink-400 to-violet-400" />
              </div>
            </div>
            <div className="rounded- border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:border-emerald-400/30">
              <p className="text- font-black tracking-widest text-white/50">TOTAL TIKET</p>
              <p className="mt-1 text- font-black leading-none text-emerald-300">{totalTiket}</p>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[60%] rounded-full bg-linear-to-r from-emerald-400 to-cyan-400" />
              </div>
            </div>
            <div className="rounded- border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:border-amber-400/30">
              <p className="text- font-black tracking-widest text-white/50">TOTAL PEMASUKAN</p>
              <p className="mt-1 text- font-black leading-none text-amber-300">{totalBayar === 0 ? "Gratis" : rupiah(totalBayar)}</p>
              <p className="mt-2 text- font-bold text-white/50">{totalGratis} pesanan gratis • {pesanan.length - totalGratis} berbayar</p>
            </div>
          </div>

          {/* TOMBOL CEPAT */}
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/admin/event" className="rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 px-5 py-2.5 text- font-black text-white shadow-lg transition hover:scale-[1.03]">
              ➕ Tambah Event
            </Link>
            <Link href="/admin/pesanan" className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text- font-black text-white backdrop-blur transition hover:bg-white/15">
              🧾 Kelola Pesanan →
            </Link>
            <Link href="/admin/event" className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text- font-black text-white backdrop-blur transition hover:bg-white/15">
              🎪 Kelola Event →
            </Link>
            <Link href="/" className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text- font-black text-white backdrop-blur transition hover:bg-white/15">
              👁 Lihat Web
            </Link>
          </div>
        </div>
      </div>

      {/* PESANAN TERBARU */}
      <div className="rounded- border border-white/10 bg-[#1E103A]/90 p-6 shadow-xl backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text- font-black">Pesanan Terbaru</h2>
            <p className="mt-0.5 text- text-white/50">5 pesanan paling baru, dari database + perangkat ini.</p>
          </div>
          <Link href="/admin/pesanan" className="shrink-0 rounded-full bg-white/10 px-4 py-2 text- font-black ring-1 ring-white/15 transition hover:bg-white/15">
            Semua →
          </Link>
        </div>

        {loading ? (
          <div className="mt-4 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse rounded- border border-white/10 bg-white/5 p-4">
                <div className="h-4 w-1/3 rounded-full bg-white/10" />
                <div className="mt-2 h-3 w-1/2 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        ) : pesanan.length === 0 ? (
          <div className="mt-4 rounded- border border-dashed border-white/20 bg-white/5 p-8 text-center">
            <p className="text-">🎪</p>
            <p className="mt-2 text- font-black">Belum ada pesanan</p>
            <p className="mt-1 text- text-white/50">Pesanan baru bakal muncul di sini otomatis.</p>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {pesanan.slice(0, 5).map((p: any) => (
              <div key={`${p.nomor ?? p.id}-${p.event_id}-${p.nama}`} className="flex flex-wrap items-center justify-between gap-3 rounded- border border-white/10 bg-white/5 p-4 transition hover:border-amber-400/30">
                <div className="min-w-0">
                  <p className="truncate text- font-black">{p.judul || `Event ${p.event_id}`}</p>
                  <p className="mt-0.5 truncate text- text-white/55">👤 {p.nama} • 📧 {p.email} • 🎟 {p.jumlah} tiket</p>
                </div>
                <div className="text-right">
                  <p className="text- font-black text-amber-300">{rupiah(Number(p.total || 0))}</p>
                  <p className="text- font-bold text-white/40">#{p.nomor ?? p.id}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* EVENT TERBARU */}
      <div className="rounded- border border-white/10 bg-[#1E103A]/90 p-6 shadow-xl backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text- font-black">Event Terbaru</h2>
            <p className="mt-0.5 text- text-white/50">Event yang paling baru ditambah.</p>
          </div>
          <Link href="/admin/event" className="shrink-0 rounded-full bg-white/10 px-4 py-2 text- font-black ring-1 ring-white/15 transition hover:bg-white/15">
            Semua →
          </Link>
        </div>
        {loading ? (
          <p className="mt-4 text- font-bold text-white/50">⏳ Lagi muat...</p>
        ) : events.length === 0 ? (
          <p className="mt-4 text- text-white/50">Belum ada event. Tambah dulu dari tombol di atas bro.</p>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {events.slice(0, 4).map((e: any) => (
              <Link key={e.id} href={`/event/${e.id}`} className="group rounded- border border-white/10 bg-white/5 p-4 transition hover:border-violet-400/40 hover:bg-white/10">
                <p className="line-clamp-1 text- font-black group-hover:text-amber-300">{e.judul}</p>
                <p className="mt-1 text- text-white/55">📅 {e.tanggal} • 📍 {e.lokasi}</p>
                <p className="mt-1 text- font-black text-amber-300">{e.harga === 0 ? "🆓 GRATIS" : rupiah(Number(e.harga || 0))}</p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {mounted && <p className="hidden">mounted</p>}
    </div>
  );
}