"use client";

import { useActionState, useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { pesanTiket, type HasilPesan } from "@/app/actions";
import { rupiah, type Event } from "@/data/events";

const AWAL: HasilPesan = { berhasil: false, pesan: "", galat: {}, isian: { nama: "", email: "", jumlah: "1" } };

function PesanInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventId = Number(searchParams.get("event") || "");
  const [event, setEvent] = useState<Event | null>(null);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [hasil, jalankan, lagiLoading] = useActionState(pesanTiket, AWAL);

  // Kunci biar gak kepental sendiri
  // SEBELUM: useEffect cek hasil.berhasil doang -> kalau hasil lama masih true, langsung kepental ke /pesanan padahal belum ngisi form
  // SESUDAH: cuma jalan kalau barusan submit (pernah lagiLoading) + berhasil berubah false -> true + belum pernah disimpen
  const pernahSubmit = useRef(false);
  const berhasilSebelumnya = useRef(false);
  const sudahDisimpan = useRef(false);

  // Reset kunci tiap ganti event, biar hasil pesanan event lama gak kebawa ke event baru
  useEffect(() => {
    pernahSubmit.current = false;
    berhasilSebelumnya.current = false;
    sudahDisimpan.current = false;
  }, [eventId]);

  // Tandain kalau user beneran lagi submit
  useEffect(() => {
    if (lagiLoading) pernahSubmit.current = true;
  }, [lagiLoading]);

  // Sync + redirect CUMA kalau transisi false -> true + barusan submit
  useEffect(() => {
    const baruBerhasil = hasil.berhasil && !berhasilSebelumnya.current;
    berhasilSebelumnya.current = hasil.berhasil;

    if (!baruBerhasil) return;
    if (!pernahSubmit.current) return; // <-- INI KUNCINYA: kalau belum submit, JANGAN redirect
    if (sudahDisimpan.current) return;
    if (!event) return;
    sudahDisimpan.current = true;

    try {
      const lama = JSON.parse(localStorage.getItem("pesanan-eventku") || "[]");
      const listLama = Array.isArray(lama) ? lama : [];
      const jumlah = Number(hasil.isian.jumlah) || 1;
      const baru = {
        nomor: Date.now(),
        event_id: event.id,
        nama: hasil.isian.nama,
        email: hasil.isian.email,
        jumlah,
        total: (event.harga ?? 0) * jumlah,
        dibuat: new Date().toISOString(),
        events: { judul: event.judul },
      };
      // Jangan double kalau nomor / event + nama + jumlah-nya sama
      const sudahAda = listLama.some((p: any) => p.event_id === baru.event_id && p.nama === baru.nama && p.jumlah === baru.jumlah && p.email === baru.email);
      if (!sudahAda) {
        localStorage.setItem("pesanan-eventku", JSON.stringify([...listLama, baru]));
      }
      localStorage.setItem("namaSaya", hasil.isian.nama);
      window.dispatchEvent(new Event("pesanan-berubah"));
    } catch {}

    // GAK LANGSUNG PENTAL: kasih liat dulu pesan sukses 1,5 detik, baru pindah
    const t = setTimeout(() => router.push("/pesanan"), 1500);
    return () => clearTimeout(t);
  }, [hasil.berhasil, hasil.isian, event, router]);

  // Ambil event CUMA dari API / Supabase, TANPA fallback lokal lagi
  useEffect(() => {
    async function load() {
      if (!Number.isFinite(eventId) || eventId <= 0) { setLoadingEvent(false); return; }
      try {
        const res = await fetch(`/api/events/${eventId}`);
        if (!res.ok) { setEvent(null); setLoadingEvent(false); return; }
        const d = await res.json();
        setEvent({
          id: Number(d.id),
          judul: d.judul ?? d.nama ?? "Event Tanpa Nama",
          kategori: d.kategori ?? "Workshop",
          tanggal: d.tanggal ?? "",
          lokasi: d.lokasi ?? "-",
          harga: Number(d.harga ?? 0),
          kuota: Number(d.kuota ?? 50),
          terisi: Number(d.terisi ?? 0),
          gambar: d.gambar ?? null,
          deskripsi: d.deskripsi ?? "",
        });
      } catch {
        setEvent(null);
      }
      setLoadingEvent(false);
    }
    load();
  }, [eventId]);

  if (loadingEvent) {
    return (
      <div className="w-full bg-[#120826] py-16 text-center text-white" style={{ colorScheme: "dark" }}>
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-amber-400" />
        <p className="mt-4 text-sm font-bold text-white/60">Memuat event dari database...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="w-full bg-[#120826] py-10 text-center text-white" style={{ colorScheme: "dark" }}>
        <div className="mx-auto max-w-3xl px-4">
          {/* SEBELUM: rounded- doang (kepotong) -> SESUDAH: rounded- */}
          <div className="rounded- border border-white/10 bg-[#1E103A]/90 p-10">
            {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
            <p className="text-">😢</p>
            {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
            <p className="mt-2 text- font-black">Event Tidak Ditemukan</p>
            <p className="mt-1 text-sm text-white/60">Event ini gak ada di database. Cek lagi di katalog.</p>
            <Link href="/event" className="mt-5 inline-block rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 px-7 py-3 text-sm font-black text-white shadow-lg transition hover:scale-[1.03]">Lihat Semua Event →</Link>
          </div>
        </div>
      </div>
    );
  }

  const terisi = Number(event.terisi ?? 0);
  const sisa = Math.max(0, (event.kuota ?? 50) - terisi);
  const habis = sisa <= 0;
  const jumlahPreview = Number(hasil.isian.jumlah) || 1;
  const totalPreview = (event.harga ?? 0) * Math.min(5, Math.max(1, jumlahPreview));

  // SEBELUM: text- doang (kepotong) -> SESUDAH: text-
  const inputClass = "mt-2 w-full rounded-full border border-white/15 bg-[#2A1B52] px-5 py-3.5 text- font-semibold text-white placeholder:text-white/30 shadow-[inset_0_0_0_1000px_#2A1B52] outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 [-webkit-text-fill-color:white]";

  return (
    <div className="w-full bg-[#120826] text-white" style={{ colorScheme: "dark" }}>
      <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
        {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
        <div className="mb-4 flex items-center gap-2 text- font-bold text-white/50">
          <Link href="/" className="hover:text-white">🏠 Beranda</Link><span>›</span>
          <Link href="/event" className="hover:text-white">🎪 Event</Link><span>›</span>
          <span className="truncate text-amber-300">{event.judul}</span>
        </div>

        {/* SEBELUM: rounded- doang (kepotong) -> SESUDAH: rounded- */}
        <div className="relative overflow-hidden rounded- border border-white/10 bg-[#1E103A]/90 p-6 shadow-xl">
          {/* SEBELUM: blur- doang (kepotong) -> SESUDAH: blur- */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pink-500/25 blur-" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-amber-500/25 blur-" />
          <div className="relative flex items-start gap-4">
            {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-violet-600 via-pink-500 to-orange-500 text- shadow-lg">🎪</div>
            <div className="min-w-0 flex-1">
              {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
              <span className="rounded-full bg-black/40 px-3 py-1 text- font-black text-amber-300 ring-1 ring-white/15">{event.kategori}</span>
              {/* SEBELUM: text- + sm:text- doang (kepotong) -> SESUDAH: text- + sm:text- */}
              <h1 className="mt-2 text- font-black leading-tight sm:text-">{event.judul}</h1>
              {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
              <p className="mt-1 text- text-white/60">📍 {event.lokasi} • 📅 {event.tanggal}</p>
            </div>
            {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
            <span className={`shrink-0 rounded-full px-3.5 py-1.5 text- font-black ${habis ? "bg-red-500" : "bg-emerald-500"}`}>{habis ? "❌ HABIS" : `✅ ${sisa} TERSISA`}</span>
          </div>
          <div className="relative mt-5 grid grid-cols-3 gap-2">
            {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- / text- */}
            <div className="rounded-2xl bg-white/5 p-3 text-center ring-1 ring-white/10"><p className="text- font-black tracking-widest text-white/40">HARGA</p><p className="mt-1 text- font-black">{event.harga === 0 ? "GRATIS" : rupiah(event.harga)}</p></div>
            <div className="rounded-2xl bg-white/5 p-3 text-center ring-1 ring-white/10"><p className="text- font-black tracking-widest text-white/40">TERISI</p><p className="mt-1 text- font-black">{terisi} / {event.kuota}</p></div>
            <div className="rounded-2xl bg-linear-to-br from-amber-500/20 to-pink-500/10 p-3 text-center ring-1 ring-amber-400/25"><p className="text- font-black tracking-widest text-amber-300">TOTAL</p><p className="mt-1 text- font-black">{totalPreview === 0 ? "GRATIS" : rupiah(totalPreview)}</p></div>
          </div>
        </div>

        {/* SEBELUM: rounded- doang (kepotong) -> SESUDAH: rounded- */}
        <form action={jalankan} autoComplete="off" className="relative mt-5 overflow-hidden rounded- border border-white/10 bg-[#1E103A]/90 p-6 shadow-xl sm:p-7">
          <div className="relative">
            {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
            <h2 className="text- font-black">📝 Formulir Pesan</h2>
            {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
            <p className="mt-1 text- text-white/50">Validasi di server, harga + sisa dibaca dari database, bukan dari form. Aman dari inspect element.</p>
            <input type="hidden" name="eventId" value={event.id} />
            <input type="text" name="__prevent_autofill" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <label className="mt-5 block">
              {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
              <span className="text- font-black text-white/70">👤 NAMA LENGKAP *</span>
              <input name="nama" defaultValue={hasil.isian.nama} placeholder="Contoh: Ahmad Fauzi" autoComplete="new-password" autoCorrect="off" autoCapitalize="off" spellCheck={false} className={inputClass} style={{ colorScheme: "dark" }} />
              {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
              {hasil.galat.nama && <p className="mt-1.5 text- font-bold text-red-400">⚠ {hasil.galat.nama}</p>}
            </label>

            <label className="mt-4 block">
              <span className="text- font-black text-white/70">📧 EMAIL *</span>
              <input name="email" type="email" defaultValue={hasil.isian.email} placeholder="kamu@email.com" autoComplete="new-password" autoCorrect="off" spellCheck={false} className={inputClass} style={{ colorScheme: "dark" }} />
              {hasil.galat.email && <p className="mt-1.5 text- font-bold text-red-400">⚠ {hasil.galat.email}</p>}
            </label>

            <label className="mt-4 block">
              <span className="text- font-black text-white/70">🎟 JUMLAH TIKET * (Maks 5)</span>
              {/* SEBELUM: text-! doang (kepotong) -> SESUDAH: text-! */}
              <input name="jumlah" type="number" min={1} max={5} defaultValue={hasil.isian.jumlah} autoComplete="off" className={inputClass + " text-center text-! font-black!"} style={{ colorScheme: "dark" }} />
              {hasil.galat.jumlah && <p className="mt-1.5 text- font-bold text-red-400">⚠ {hasil.galat.jumlah}</p>}
              {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
              <p className="mt-2 text- text-white/50">Sisa kuota: <b className="text-amber-300">{sisa}</b> tiket • Terisi: {terisi} / {event.kuota}</p>
            </label>

            {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
            {hasil.pesan && <p className={`mt-4 rounded-full px-4 py-2.5 text-center text- font-bold ring-1 ${hasil.berhasil ? "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30" : "bg-red-500/15 text-red-300 ring-red-500/30"}`}>{hasil.berhasil ? "✅ " : "⚠ "}{hasil.pesan}</p>}

            {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
            <button type="submit" disabled={lagiLoading || habis} className={`mt-5 w-full rounded-full py-4 text- font-black shadow-lg transition hover:scale-[1.01] ${habis ? "cursor-not-allowed bg-white/10 text-white/40" : "bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 shadow-[0_18px_40px_-10px_rgba(249,115,22,0.7)]"}`}>
              {habis ? "❌ Tiket Habis" : lagiLoading ? "⏳ Menyimpan ke Database..." : "🎟 Pesan Tiket →"}
            </button>
            {hasil.berhasil && <Link href="/pesanan" className="mt-3 block rounded-full border border-white/20 bg-white/10 py-3 text-center text-sm font-black transition hover:bg-white/15 hover:text-white">Lihat Pesanan Saya →</Link>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Pesan() {
  return <Suspense fallback={<div className="w-full bg-[#120826] py-10 text-center text-white">Memuat...</div>}><PesanInner /></Suspense>;
}