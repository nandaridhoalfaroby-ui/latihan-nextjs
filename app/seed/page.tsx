"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { rupiah, type Event } from "@/data/events";
import KartuEvent from "@/components/KartuEvent";

export default function Katalog() {
  const [semua, setSemua] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [pesanSeed, setPesanSeed] = useState("");
  const [lagiSeed, setLagiSeed] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/events");
      const data = await res.json().catch(() => []);
      setSemua(Array.isArray(data) ? data : []);
    } catch { setSemua([]); }
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function isiDataContoh() {
    setLagiSeed(true);
    setPesanSeed("⏳ Lagi ngisi data ke Supabase...");
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const d = await res.json();
      if (!res.ok) {
        setPesanSeed(`❌ Gagal: ${d.error || "Gak tau"} - ${JSON.stringify(d.detail || "").slice(0, 300)}`);
      } else {
        setPesanSeed(`✅ ${d.pesan}`);
        await load();
      }
    } catch {
      setPesanSeed("❌ Failed to fetch ke Supabase. Cek .env.local + internet lo.");
    }
    setLagiSeed(false);
  }

  const kategoriList = useMemo(() => ["Semua", ...Array.from(new Set(semua.map((e) => e.kategori)))], [semua]);
  const tampil = useMemo(() => semua.filter((e) => {
    const cocokCari = e.judul.toLowerCase().includes(cari.toLowerCase()) || e.lokasi.toLowerCase().includes(cari.toLowerCase());
    const cocokKategori = kategori === "Semua" || e.kategori === kategori;
    return cocokCari && cocokKategori;
  }), [semua, cari, kategori]);

  return (
    <div className="w-full bg-[#120826] text-white" style={{ colorScheme: "dark" }}>
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        <div className="relative overflow-hidden rounded- border border-white/10 bg-[#1E103A]/90 p-7 shadow-xl">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/25 blur-" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-pink-500/25 blur-" />
          <div className="relative">
            <h1 className="text- font-black leading-tight md:text-">Jelajahi Semua <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-pink-400 bg-clip-text text-transparent">Event Seru.</span></h1>
            <p className="mt-2 text-sm text-white/60">Semua event dari Supabase, update real-time.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-4 py-1.5 text- font-black ring-1 ring-white/10">✅ {semua.length} Event Tersedia</span>
              <span className="rounded-full bg-white/10 px-4 py-1.5 text- font-black ring-1 ring-white/10">⚡ Update dari Supabase</span>
            </div>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <input value={cari} onChange={(e) => setCari(e.target.value)} placeholder="🔍 Cari event, lokasi..." autoComplete="off" className="flex-1 rounded-full border border-white/15 bg-[#2A1B52] px-5 py-3 text- font-semibold text-white placeholder:text-white/30 shadow-[inset_0_0_0_1000px_#2A1B52] outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 [-webkit-text-fill-color:white]" style={{ colorScheme: "dark" }} />
              <select value={kategori} onChange={(e) => setKategori(e.target.value)} className="rounded-full border border-white/15 bg-[#2A1B52] px-5 py-3 text- font-black text-white outline-none" style={{ colorScheme: "dark" }}>
                {kategoriList.map((k) => <option key={k} value={k} className="bg-[#2A1B52] text-white">{k}</option>)}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {["Semua", "Workshop", "Olahraga", "Musik", "Bazar", "Lomba"].map((k) => (
            <button key={k} onClick={() => setKategori(k)} className={`rounded-full px-4 py-2 text- font-black transition ${kategori === k ? "bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 text-white shadow-lg" : "bg-white/10 text-white/70 ring-1 ring-white/10 hover:bg-white/20"}`}>{k === "Semua" ? "🏠 Semua" : k === "Workshop" ? "💻 Workshop" : k === "Olahraga" ? "🏃 Olahraga" : k === "Musik" ? "🎵 Musik" : k === "Bazar" ? "🛍️ Bazar" : "🏆 Lomba"}</button>
          ))}
        </div>

        <p className="mt-5 text- font-bold text-white/40">Menampilkan <b className="text-amber-300">{tampil.length}</b> event</p>

        {loading ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (<div key={i} className="animate-pulse rounded- border border-white/10 bg-[#1E103A]/90 p-5"><div className="h-36 rounded- bg-white/10" /><div className="mt-4 h-4 w-3/4 rounded bg-white/10" /></div>))}
          </div>
        ) : tampil.length === 0 ? (
          <div className="mt-4 rounded- border border-dashed border-white/20 bg-[#1E103A]/90 p-10 text-center shadow-xl">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded- bg-gradient-to-br from-violet-600 via-pink-500 to-orange-500 text- shadow-lg">🔍</div>
            <p className="mt-4 text- font-black">Event tidak ditemukan</p>
            <p className="mx-auto mt-1 max-w- text-sm text-white/60">Coba kata kunci atau kategori lain, atau isi data contoh dulu bro, 1 klik aja.</p>
            {/* INI TOMBOLNYA - KALAU GAK MUNCUL, BERARTI FILE BELUM KE-TIMPA */}
            <button onClick={isiDataContoh} disabled={lagiSeed} className="mt-5 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 px-7 py-3.5 text-sm font-black shadow-lg transition hover:scale-[1.03] disabled:opacity-50">
              {lagiSeed ? "⏳ Lagi Ngisi..." : "✨ Isi 3 Event Contoh Sekarang"}
            </button>
            {pesanSeed && <p className="mx-auto mt-3 max-w- rounded-2xl bg-black/30 p-3 text-left text- leading-relaxed text-white/70 ring-1 ring-white/10">{pesanSeed}</p>}
            <button onClick={() => { setCari(""); setKategori("Semua"); load(); }} className="mt-3 block mx-auto rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text- font-black transition hover:bg-white hover:text-zinc-900">Tampilkan Semua Event</button>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tampil.map((e) => <KartuEvent key={e.id} event={e} />)}
          </div>
        )}
      </div>
    </div>
  );
}