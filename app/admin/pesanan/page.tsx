"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { rupiah } from "@/data/events";
import { batalkanPesanan } from "@/app/actions";

type PesananRow = any;

export default function AdminPesanan() {
  const [pesanan, setPesanan] = useState<PesananRow[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncMsg, setSyncMsg] = useState("");
  const [syncing, setSyncing] = useState(false);

  // FIX HYDRATION: dariLokalCount jadi state, diisi CUMA di useEffect (setelah mount)
  const [mounted, setMounted] = useState(false);
  const [dariLokalCount, setDariLokalCount] = useState(0);

  async function muat() {
    setLoading(true);
    let dariDB: PesananRow[] = [];
    try {
      // SEBELUM (SALAH, 404): fetch("/api/admin/pesanan")
      // SESUDAH (BENER): fetch("/api/pesanan") -> file-nya ada di File 3
      const r = await fetch("/api/pesanan", { cache: "no-store" });
      const j = await r.json().catch(() => ({ pesanan: [] }));
      dariDB = Array.isArray(j.pesanan) ? j.pesanan : [];
    } catch { dariDB = []; }
    try {
      const r = await fetch("/api/events", { cache: "no-store" }).catch(() => null);
      if (r) { const ej = await r.json().catch(() => []); setEvents(Array.isArray(ej) ? ej : ej.events ?? []); }
    } catch {}
    let dariLokal: PesananRow[] = [];
    try { dariLokal = JSON.parse(localStorage.getItem("pesanan-eventku") || "[]"); if (!Array.isArray(dariLokal)) dariLokal = []; } catch { dariLokal = []; }

    setDariLokalCount(dariLokal.length);

    const kunci = (p: any) => [Number(p.event_id), p.nama, p.email, Number(p.jumlah), Number(p.total)].join("|");
    const kunciDB = new Set(dariDB.map(kunci));
    const lokalBaru = dariLokal.filter((p) => !kunciDB.has(kunci(p)));
    const gabung = [...dariDB, ...lokalBaru].sort((a, b) => {
      const ta = new Date(a.dibuat ?? a.created_at ?? 0).getTime();
      const tb = new Date(b.dibuat ?? b.created_at ?? 0).getTime();
      return tb - ta;
    });
    setPesanan(gabung);
    setLoading(false);
  }

  useEffect(() => {
    setMounted(true);
    muat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const h = () => muat();
    window.addEventListener("pesanan-berubah", h);
    window.addEventListener("storage", h);
    return () => { window.removeEventListener("pesanan-berubah", h); window.removeEventListener("storage", h); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Tombol Sync - sekarang file API-nya ADA, jadi gak 404 lagi
  async function syncKeDB() {
    setSyncing(true); setSyncMsg("");
    try {
      const lokal = JSON.parse(localStorage.getItem("pesanan-eventku") || "[]");
      if (!Array.isArray(lokal) || lokal.length === 0) {
        setSyncMsg("✅ Udah gak ada yang perlu di-sync.");
        setSyncing(false);
        return;
      }
      // SESUDAH: /api/pesanan/sync -> file-nya dibikinin di File 2, nerima { pesanan: [...] } + balikin { ok, inserted }
      const r = await fetch("/api/pesanan/sync", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pesanan: lokal }) });
      const j = await r.json();
      if (!j.ok) { setSyncMsg(`❌ Gagal sync: ${j.error}. Cek SUPABASE_SERVICE_ROLE_KEY + RLS di Supabase.`); }
      else if (j.inserted === 0) { setSyncMsg("✅ Semua pesanan udah ada di database."); }
      else { setSyncMsg(`✅ Berhasil! ${j.inserted} pesanan dipindah dari perangkat ke database. Sekarang permanen.`); }
      await muat();
    } catch (e) {
      console.error(e);
      setSyncMsg("❌ Gagal sync, cek console (F12).");
    }
    setSyncing(false);
  }

  const namaEvent = (p: any) => {
    if (p.events?.judul) return p.events.judul;
    if (p.events?.nama) return p.events.nama;
    const e = events.find((x) => x.id === Number(p.event_id));
    return e?.judul ?? `Event ${p.event_id}`;
  };

  const totalTiket = pesanan.reduce((a: number, p: any) => a + (Number(p.jumlah) || 0), 0);
  const totalBayar = pesanan.reduce((a: number, p: any) => a + (Number(p.total) || 0), 0);

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded- border border-white/10 bg-[#1E103A]/90 p-6 shadow-xl sm:p-7">
        {/* SEBELUM: blur- doang -> SESUDAH: blur- */}
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/25 blur-" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-pink-500/25 blur-" />
        <div className="relative">
          {/* SEBELUM: text- doang -> SESUDAH: text- */}
          <span className="inline-flex rounded-full bg-black/40 px-3.5 py-1 text- font-black tracking-widest text-amber-300 ring-1 ring-white/15">🧾 KELOLA PESANAN</span>
          {/* SEBELUM: text- doang -> SESUDAH: text- */}
          <h1 className="mt-3 text- font-black leading-tight sm:text-">Semua Pesanan, <span className="bg-linear-to-r from-amber-300 via-orange-400 to-pink-400 bg-clip-text text-transparent">Aman Tersimpan.</span></h1>
          <p className="mt-1 text-sm text-white/60">Gabungan database Supabase + pesanan di perangkat ini (browser yang sama). Batalin di sini langsung balikin kuota event-nya.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {/* SEBELUM: text- doang -> SESUDAH: text- */}
            <span className="rounded-full bg-white/10 px-4 py-1.5 text- font-black ring-1 ring-white/10">🧾 {pesanan.length} Pesanan</span>
            <span className="rounded-full bg-white/10 px-4 py-1.5 text- font-black ring-1 ring-white/10">🎟 {totalTiket} Tiket</span>
            <span className="rounded-full bg-linear-to-r from-amber-400/20 to-pink-500/20 px-4 py-1.5 text- font-black text-amber-300 ring-1 ring-amber-400/30">💰 {totalBayar === 0 ? "Gratis" : rupiah(totalBayar)}</span>
          </div>

          {mounted && dariLokalCount > 0 && (
            // SEBELUM: rounded- doang -> SESUDAH: rounded-
            <div className="mt-4 flex flex-wrap items-center gap-3 rounded- border border-amber-400/30 bg-amber-400/10 p-3">
              {/* SEBELUM: text- doang -> SESUDAH: text- */}
              <p className="text- font-bold text-amber-200">⚠ Ada {dariLokalCount} pesanan yang masih cuma di perangkat ini, belum di database. Klik Sync biar permanen + kebaca di HP lain.</p>
              {/* SEBELUM: text- doang -> SESUDAH: text- */}
              <button onClick={syncKeDB} disabled={syncing} className="rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 px-5 py-2 text- font-black text-white shadow-lg transition hover:scale-[1.03] disabled:opacity-50">{syncing ? "⏳ Sync..." : "🔄 Sync ke Database"}</button>
              {/* SEBELUM: text- doang -> SESUDAH: text- */}
              {syncMsg && <p className="w-full text- font-bold text-white/80">{syncMsg}</p>}
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">{[1, 2].map((i) => (<div key={i} className="animate-pulse rounded- border border-white/10 bg-white/5 p-5"><div className="h-5 w-1/3 rounded-full bg-white/10" /><div className="mt-3 h-4 w-1/2 rounded-full bg-white/10" /></div>))}</div>
      ) : pesanan.length === 0 ? (
        // SEBELUM: rounded- doang -> SESUDAH: rounded-
        <div className="rounded- border border-dashed border-white/20 bg-[#1E103A]/90 p-10 text-center shadow-xl">
          {/* SEBELUM: rounded- + text- doang -> SESUDAH: rounded- + text- */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded- bg-linear-to-br from-violet-600 via-pink-500 to-orange-500 text- shadow-lg">🧾</div>
          {/* SEBELUM: text- doang -> SESUDAH: text- */}
          <p className="mt-4 text- font-black">Belum ada pesanan</p>
          <p className="mt-1 text-sm text-white/60">Pesanan baru dari user bakal muncul di sini otomatis.</p>
          <Link href="/event" className="mt-5 inline-block rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 px-7 py-3 text-sm font-black text-white shadow-lg transition hover:scale-[1.03]">🎪 Lihat Event →</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {pesanan.map((p: any) => {
            const nomor = p.nomor ?? p.id;
            const tgl = p.dibuat ?? p.created_at;
            let tglTampil = "";
            if (tgl) { const d = new Date(tgl); if (!isNaN(d.getTime())) tglTampil = d.toLocaleString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }); }
            const isLokal = String(nomor).length >= 13 && !p.dibuat;
            return (
              // SEBELUM: rounded- doang -> SESUDAH: rounded-
              <div key={`${nomor}-${p.event_id}-${p.nama}`} className="relative overflow-hidden rounded- border border-white/10 bg-[#1E103A]/90 p-5 shadow-lg transition hover:border-amber-400/30">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap gap-2">
                      {/* SEBELUM: text- doang -> SESUDAH: text- */}
                      <span className="rounded-full bg-black/40 px-3 py-1 text- font-black text-amber-300 ring-1 ring-white/15">🧾 PESANAN #{nomor}</span>
                      {tglTampil && <span className="rounded-full bg-white/10 px-3 py-1 text- font-bold text-white/60 ring-1 ring-white/10">🕒 {tglTampil}</span>}
                      {mounted && isLokal && <span className="rounded-full bg-amber-400/20 px-3 py-1 text- font-black text-amber-300 ring-1 ring-amber-400/40">📱 Cuma di perangkat ini - klik Sync di atas</span>}
                    </div>
                    {/* SEBELUM: text- doang -> SESUDAH: text- */}
                    <p className="mt-2 text- font-black">{namaEvent(p)}</p>
                    {/* SEBELUM: text- doang -> SESUDAH: text- */}
                    <p className="mt-1 text- text-white/60">👤 {p.nama} • 📧 {p.email}</p>
                    {/* SEBELUM: text- doang -> SESUDAH: text- */}
                    <p className="mt-1 text- text-white/40">🎟 {p.jumlah} tiket • Event ID {p.event_id}</p>
                  </div>
                  {/* SEBELUM: text- doang -> SESUDAH: text- */}
                  <p className="text- font-black text-amber-300">{rupiah(Number(p.total || 0))}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-3">
                  {/* SEBELUM: hover:bg-white/20 + hover:text-white (oke) tapi text- doang -> SESUDAH: text- */}
                  <Link href={`/event/${p.event_id}`} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text- font-black text-white transition hover:bg-white/20 hover:text-white">👁 Lihat Event</Link>
                  <form action={batalkanPesanan} onSubmit={() => { setTimeout(() => muat(), 800); }} className="ml-auto">
                    <input type="hidden" name="nomor" value={nomor} />
                    <input type="hidden" name="eventId" value={p.event_id} />
                    <input type="hidden" name="jumlah" value={p.jumlah} />
                    {/* SEBELUM: text- doang -> SESUDAH: text- */}
                    <button className="rounded-full bg-red-500/15 px-4 py-2 text- font-black text-red-300 ring-1 ring-red-500/30 transition hover:bg-red-500 hover:text-white">🗑 Batalkan & Balikin Kuota</button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}