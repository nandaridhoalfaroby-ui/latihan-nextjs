"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ambilPesanan, ambilEvents } from "@/data/ambil";
import { rupiah } from "@/data/events";
import { batalkanPesanan } from "@/app/actions";

type PesananRow = any;

export default function PesananPage() {
  const [pesanan, setPesanan] = useState<PesananRow[]>([]);
  const [semuaEvent, setSemuaEvent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // GABUNGAN - DARI PESANAN 1 + FIX NO. 3:
  // SEBELUM (Pesanan 2, server): cuma ambilPesanan() dari DB ke-filter cookie -> kalau cookie beda, pesanan ilang, padahal badge Navbar 1
  // SEBELUM (bug fix no.3): filter lokal pake nomorDB -> nomor lokal (Date.now) beda sama nomor DB, pesanan baru langsung ke-buang
  // SESUDAH: gabungin DB + localStorage SEMUA, dedupe pake kunci event+nama+email+jumlah+total (BUKAN nomor)
  // JADI: angka di sini SAMA kaya badge Navbar, gak ada yang ilang, gak ada yang double
  async function muat() {
    setLoading(true);
    const [dariDB, dariEvents] = await Promise.all([
      ambilPesanan().catch(() => []),
      ambilEvents().catch(() => []),
    ]);
    setSemuaEvent(dariEvents);

    let dariLokal: PesananRow[] = [];
    try {
      dariLokal = JSON.parse(localStorage.getItem("pesanan-eventku") || "[]");
      if (!Array.isArray(dariLokal)) dariLokal = [];
    } catch { dariLokal = []; }

    // Kunci dedupe: event + nama + email + jumlah + total
    // Kalau pesanan yang sama udah ada di DB, versi lokal-nya jangan diitung lagi (biar gak double)
    // Tapi kalau pesanan lokal beneran beda (event / nama / jumlah beda), tetep kepake
    const kunci = (p: any) => [p.event_id, p.nama, p.email, p.jumlah, p.total].join("|");
    const kunciDB = new Set((dariDB as any[]).map(kunci));
    const lokalBaru = dariLokal.filter((p) => !kunciDB.has(kunci(p)));

    const gabung = [...(dariDB as any[]), ...lokalBaru].sort((a, b) => {
      const ta = new Date(a.dibuat ?? a.created_at ?? 0).getTime();
      const tb = new Date(b.dibuat ?? b.created_at ?? 0).getTime();
      return tb - ta;
    });
    setPesanan(gabung);
    setLoading(false);
  }

  useEffect(() => { muat(); }, []);

  // Kalau ada pesanan baru / batal dari halaman lain, reload otomatis
  useEffect(() => {
    const h = () => muat();
    window.addEventListener("pesanan-berubah", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("pesanan-berubah", h);
      window.removeEventListener("storage", h);
    };
  }, []);

  const namaEvent = (p: any) => {
    // Urutan bener: 1. dari join Supabase p.events.judul (karena di events kolomnya judul)
    // 2. fallback kalau Supabase lama masih ngirim p.events.nama
    // 3. fallback cari di semuaEvent
    if (p.events?.judul) return p.events.judul;
    if (p.events?.nama) return p.events.nama;
    const e = semuaEvent.find((x) => x.id === Number(p.event_id));
    return e?.judul ?? `Event ${p.event_id}`;
  };

  const totalTiket = pesanan.reduce((a: number, p: any) => a + (Number(p.jumlah) || 0), 0);
  const totalBayar = pesanan.reduce((a: number, p: any) => a + (Number(p.total) || 0), 0);

  // Hapus juga dari localStorage biar badge Navbar ikut 0 pas dibatalin
  // Tapi JANGAN hapus pake nomor doang, hapus pake kunci yang sama biar yang di DB + lokal kehapus bareng
  function batalkanLokal(p: any) {
    try {
      const lama = JSON.parse(localStorage.getItem("pesanan-eventku") || "[]");
      const listLama = Array.isArray(lama) ? lama : [];
      const kunciTarget = [p.event_id, p.nama, p.email, p.jumlah, p.total].join("|");
      const sisa = listLama.filter((x: any) => [x.event_id, x.nama, x.email, x.jumlah, x.total].join("|") !== kunciTarget);
      localStorage.setItem("pesanan-eventku", JSON.stringify(sisa));
      window.dispatchEvent(new Event("pesanan-berubah"));
    } catch {}
  }

  return (
    <div className="w-full min-h-screen overflow-x-hidden bg-[#120826] text-white" style={{ colorScheme: "dark" }}>
      {/* SEBELUM (Pesanan 2): max-w-4xl doang -> di screenshot konten ketarik ke kanan + kepotong. SESUDAH: w-full max-w-6xl */}
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        {/* HEADER */}
        {/* SEBELUM: rounded- doang (kepotong) -> SESUDAH: rounded- */}
        <div className="relative overflow-hidden rounded- border border-white/10 bg-[#1E103A]/90 p-6 shadow-xl sm:p-7">
          {/* SEBELUM: blur- doang (kepotong) -> SESUDAH: blur- */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/25 blur-" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-pink-500/25 blur-" />
          <div className="relative">
            {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
            <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text- font-black tracking-widest text-white ring-1 ring-white/20 backdrop-blur">✦ DAFTAR PESANAN • DARI DATABASE</span>
            {/* SEBELUM: text- doang + sm:text- doang (kepotong) -> SESUDAH: text- + sm:text- */}
            <h1 className="mt-4 text- font-black leading-tight sm:text-">Daftar Pesanan, <span className="bg-linear-to-r from-amber-300 via-orange-400 to-pink-400 bg-clip-text text-transparent">Aman Tersimpan.</span></h1>
            <p className="mt-2 text-sm text-white/60">Diambil dari tabel <b className="text-white">pesanan</b> di Supabase + pesanan di perangkat ini. Refresh / restart server pun gak hilang.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {/* ANGKA INI SEKARANG SAMA KAYA BADGE NAVBAR, KARENA SUMBERNYA UDAH DIGABUNG */}
              {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
              <span className="rounded-full bg-white/10 px-4 py-1.5 text- font-black ring-1 ring-white/10">🧾 {pesanan.length} Pesanan</span>
              <span className="rounded-full bg-white/10 px-4 py-1.5 text- font-black ring-1 ring-white/10">🎟 {totalTiket} Tiket Terpesan</span>
              <span className="rounded-full bg-linear-to-r from-amber-400/20 to-pink-500/20 px-4 py-1.5 text- font-black text-amber-300 ring-1 ring-amber-400/30">💰 Total {totalBayar === 0 ? "Gratis" : rupiah(totalBayar)}</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="mt-6 grid gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse rounded- border border-white/10 bg-white/5 p-5">
                <div className="h-5 w-1/3 rounded-full bg-white/10" />
                <div className="mt-3 h-4 w-1/2 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        ) : pesanan.length === 0 ? (
          // SEBELUM: rounded- doang (kepotong) -> SESUDAH: rounded-
          <div className="mt-6 rounded- border border-dashed border-white/20 bg-[#1E103A]/90 p-10 text-center shadow-xl">
            {/* SEBELUM: bg-gradient-to-br + text- doang -> SESUDAH: bg-linear-to-br + text- */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-violet-600 via-pink-500 to-orange-500 text- shadow-lg">🧾</div>
            {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
            <p className="mt-4 text- font-black">Belum ada pesanan</p>
            <p className="mx-auto mt-1 max-w-md text-sm text-white/60">Yuk pesan event pertama kamu, langsung tersimpan ke database!</p>
            <Link href="/event" className="mt-5 inline-block rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 px-7 py-3 text-sm font-black shadow-lg transition hover:scale-[1.03]">🎪 Cari Event →</Link>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {pesanan.map((p: any) => {
              const nomor = p.nomor ?? p.id;
              const tanggalPesan = p.dibuat ?? p.created_at;
              let tglTampil = "";
              if (tanggalPesan) {
                const d = new Date(tanggalPesan);
                if (!isNaN(d.getTime())) tglTampil = d.toLocaleString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });
              }
              return (
                // SEBELUM: rounded- doang (kepotong) -> SESUDAH: rounded-
                <div key={`${nomor}-${p.event_id}-${p.nama}-${p.email}`} className="group relative overflow-hidden rounded- border border-white/10 bg-[#1E103A]/90 p-5 shadow-lg transition hover:-translate-y-0.5 hover:border-white/20">
                  {/* SEBELUM: blur- doang (kepotong) -> SESUDAH: blur- */}
                  <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-pink-500/15 blur-" />
                  <div className="relative flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
                        <span className="rounded-full bg-black/40 px-3 py-1 text- font-black text-amber-300 ring-1 ring-white/15">🧾 PESANAN #{nomor}</span>
                        {tglTampil && <span className="rounded-full bg-white/10 px-3 py-1 text- font-bold text-white/60 ring-1 ring-white/10">🕒 {tglTampil}</span>}
                      </div>
                      {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
                      <p className="mt-2.5 text- font-black leading-tight">{namaEvent(p)}</p>
                      {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
                      <p className="mt-1 text- text-white/60">👤 {p.nama} • 📧 {p.email}</p>
                      {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
                      <p className="mt-1 text- text-white/40">🎟 {p.jumlah} tiket • Event ID {p.event_id}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
                      <p className="text- font-black text-amber-300">{rupiah(Number(p.total || 0))}</p>
                      {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
                      <p className="mt-0.5 text- font-bold text-white/40">{p.jumlah} x tiket</p>
                    </div>
                  </div>
                  <div className="relative mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-3">
                    {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
                    <Link href={`/event/${p.event_id}`} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text- font-black transition hover:bg-white/15 hover:text-white">👁 Lihat Event</Link>
                    <Link href={`/pesan?event=${p.event_id}`} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text- font-black transition hover:bg-white/15 hover:text-white">➕ Pesan Lagi</Link>
                    <form action={batalkanPesanan} onSubmit={() => batalkanLokal(p)} className="ml-auto">
                      <input type="hidden" name="nomor" value={nomor} />
                      <input type="hidden" name="eventId" value={p.event_id} />
                      <input type="hidden" name="jumlah" value={p.jumlah} />
                      {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
                      <button type="submit" className="rounded-full bg-red-500/15 px-4 py-2 text- font-black text-red-300 ring-1 ring-red-500/30 transition hover:bg-red-500 hover:text-white">🗑 Batalkan</button>
                    </form>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {pesanan.length > 0 && (
          // SEBELUM: rounded- doang (kepotong) -> SESUDAH: rounded-
          <div className="mt-6 rounded- bg-linear-to-r from-violet-600 via-pink-500 to-orange-500 p-5 shadow-xl">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
                <p className="text- font-black">Mau nambah pesanan lagi? 🎉</p>
                {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
                <p className="mt-0.5 text- text-white/85">Jangan sampai kehabisan, event favorit kamu bisa habis kapan aja.</p>
              </div>
              <Link href="/event" className="shrink-0 rounded-full bg-[#120826]/85 px-6 py-3 text-center text-sm font-black text-white ring-1 ring-white/25 shadow-lg backdrop-blur transition hover:scale-[1.03]">Cari Event →</Link>
            </div>
          </div>
        )}
        <div className="h-10" />
      </div>
    </div>
  );
}