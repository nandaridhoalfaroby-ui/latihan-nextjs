"use client";

import { useEffect, useState } from "react";

// FIX 2b: Hapus 2 import ini, karena gak kepake di file ini:
// import Link from "next/link";        <- DIHAPUS, bikin warning no-unused-vars
// import { rupiah } from "@/data/events"; <- DIHAPUS, bikin warning no-unused-vars

export default function SeedPage() {
  const [lagiSeed, setLagiSeed] = useState(false);
  const [pesan, setPesan] = useState("");
  const [jumlahEvent, setJumlahEvent] = useState(0);

  async function load() {
    try {
      const res = await fetch("/api/events", { cache: "no-store" });
      const teks = await res.text();
      const j = teks.startsWith("<") ? null : JSON.parse(teks);
      const list = Array.isArray(j) ? j : j?.events ?? j?.data ?? [];
      setJumlahEvent(Array.isArray(list) ? list.length : 0);
    } catch {
      setJumlahEvent(0);
    }
  }

  useEffect(() => {
    let batal = false;
    (async () => {
      if (!batal) await load();
    })();
    return () => {
      batal = true;
    };
  }, []);

  async function isiDataContoh() {
    setLagiSeed(true);
    setPesan("⏳ Lagi ngisi data ke Supabase...");
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) {
        setPesan(`❌ Gagal: ${d.error || "Gak tau"}`);
      } else {
        setPesan(`✅ ${d.pesan || d.message || "Berhasil!"} (${d.inserted ?? ""} event)`);
        await load();
      }
    } catch {
      setPesan("❌ Failed to fetch. Cek .env.local + internet lo.");
    }
    setLagiSeed(false);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 text-white">
      <div className="rounded- border border-white/10 bg-[#1E103A]/90 p-7 text-center shadow-xl">
        <p className="text-">🌱</p>
        <h1 className="mt-2 text- font-black">Isi Data Contoh</h1>
        <p className="mt-1 text- text-white/60">
          Sekarang ada <b className="text-amber-300">{jumlahEvent}</b> event di Supabase.
        </p>
        <button
          onClick={isiDataContoh}
          disabled={lagiSeed}
          className="mt-5 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 px-7 py-3.5 text-sm font-black shadow-lg transition hover:scale-[1.03] disabled:opacity-50"
        >
          {lagiSeed ? "⏳ Lagi Ngisi..." : "✨ Isi Event Contoh Sekarang"}
        </button>
        {pesan && (
          <p className="mx-auto mt-4 max-w-md rounded-2xl bg-black/30 p-3 text-left text- leading-relaxed text-white/70 ring-1 ring-white/10">
            {pesan}
          </p>
        )}
      </div>
    </div>
  );
}