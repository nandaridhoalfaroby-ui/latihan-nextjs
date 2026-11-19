import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Tentang" };

const fitur = [
  {
    icon: "🎟",
    judul: "Pesan Tiket",
    deskripsi: "Pilih event, cek sisa tiket, langsung pesan tanpa ribet. Tinggal klik, tiket langsung aman.",
    warna: "from-amber-400 to-orange-500 shadow-orange-500/40",
    kotak: "from-orange-500/[0.12] to-amber-500/[0.05] border-orange-400/25",
    glow: "hover:shadow-[0_25px_50px_-15px_rgba(249,115,22,0.5)] hover:border-orange-400/50",
  },
  {
    icon: "❤",
    judul: "Simpan Favorit",
    deskripsi: "Suka eventnya? Simpan dulu, pesan nanti kalau udah yakin. Gak akan hilang.",
    warna: "from-pink-400 to-rose-500 shadow-pink-500/40",
    kotak: "from-pink-500/[0.12] to-rose-500/[0.05] border-pink-400/25",
    glow: "hover:shadow-[0_25px_50px_-15px_rgba(236,72,153,0.5)] hover:border-pink-400/50",
  },
  {
    icon: "📦",
    judul: "Kelola Pesanan",
    deskripsi: "Semua pesananmu tersimpan rapi di halaman Pesanan. Kayak boarding pass beneran.",
    warna: "from-violet-400 to-indigo-500 shadow-violet-500/40",
    kotak: "from-violet-500/[0.12] to-indigo-500/[0.05] border-violet-400/25",
    glow: "hover:shadow-[0_25px_50px_-15px_rgba(139,92,246,0.5)] hover:border-violet-400/50",
  },
];

const langkah = [
  { angka: "1", judul: "Jelajahi Event", deskripsi: "Cari event di halaman Event, filter sesuai minat kamu.", emoji: "🔍" },
  { angka: "2", judul: "Pesan Tiket", deskripsi: "Isi nama & jumlah tiket, lalu konfirmasi pesananmu.", emoji: "🎟" },
  { angka: "3", judul: "Datang & Nikmati", deskripsi: "Tunjukkan pesananmu di lokasi, nikmati acaranya!", emoji: "🎉" },
];

export default function Tentang() {
  return (
    <div className="w-full bg-[#120826] text-white" style={{ colorScheme: "dark" }}>
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-6 sm:px-6">

        {/* ========== HERO - UDAH DIRAPIIN, GAK ADA LAGI BAR NYEBRANG ========== */}
        <div className="relative overflow-hidden rounded- border border-white/10 bg-[#1E103A] p-8 text-center shadow-[0_25px_60px_-20px_rgba(0,0,0,0.6)] md:p-12">
          {/* GLOW - DIDALAM KOTAK, GAK NYEBRANG KE LUAR */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-amber-500/25 blur-" />
            <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-pink-500/25 blur-" />
            <div className="absolute left-1/2 top-0 h-20 w-64 -translate-x-1/2 rounded-full bg-violet-500/20 blur-" />
          </div>

          {/* BADGE KANAN ATAS - DIDALAM, GAK NABRAK */}
          {/* SEBELUM: bg-gradient-to-r -> SESUDAH: bg-linear-to-r */}
          <div className="absolute right-5 top-5 hidden rounded-full bg-linear-to-r from-amber-400 to-pink-500 px-3 py-1.5 text- font-black tracking-widest text-white shadow-lg md:block">
            ✨ EVENT SEKOLAH ✨
          </div>

          <div className="relative mx-auto max-w-2xl">
            {/* LOGO - DITENGAH, RAPI */}
            <div className="relative mx-auto h-16 w-16">
              {/* SEBELUM: bg-gradient-to-br -> SESUDAH: bg-linear-to-br */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-amber-400 via-orange-500 to-pink-500 opacity-70 blur-" />
              <div className="relative grid h-full w-full place-items-center rounded-2xl border border-white/20 bg-linear-to-br from-amber-300 to-pink-500 text- shadow-xl">
                🎪
              </div>
            </div>

            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text- font-black tracking-[0.18em] text-white backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
              TENTANG EVENTKU
            </span>

            <h1 className="mt-4 text- font-black leading-[1.1] tracking-tight text-white md:text-">
              Semua Event Sekolah,
              <br />
              <span className="bg-linear-to-r from-amber-300 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                Dalam Satu Tempat.
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl text- font-medium leading-relaxed text-white/65 md:text-">
              EventKu adalah katalog event sekolah. Pesan tiket, simpan favorit, dan kelola pesananmu di sini — tanpa ribet, tanpa antre, dan pastinya berwarna.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href="/event"
                className="rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 px-7 py-3.5 text-sm font-black text-white shadow-[0_18px_40px_-10px_rgba(249,115,22,0.7)] transition hover:scale-[1.03]"
              >
                Jelajahi Event →
              </Link>
              <Link
                href="/favorit"
                className="rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-black text-white backdrop-blur transition hover:bg-white/15 hover:text-white"
              >
                ❤ Lihat Favorit
              </Link>
            </div>

            {/* MINI TRUST - RAPI, 1 BARIS DI DESKTOP, WRAP RAPI DI HP */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
              {/* SEBELUM: bg-white/[0.06] -> SESUDAH: bg-white/6 */}
              <span className="rounded-full border border-white/10 bg-white/6 px-3.5 py-1.5 text- font-bold text-white/70">⭐ 4.9/5 Rating</span>
              <span className="rounded-full border border-white/10 bg-white/6 px-3.5 py-1.5 text- font-bold text-white/70">🎟 1.240+ Tiket Terjual</span>
              <span className="rounded-full border border-white/10 bg-white/6 px-3.5 py-1.5 text- font-bold text-white/70">⚡ Pesan &lt; 1 Menit</span>
            </div>
          </div>
        </div>

        {/* MARQUEE - DIBAWAH HERO, GAK NEMPEL, GAK NUMPUK */}
        <div className="overflow-hidden rounded-full border border-white/10 bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 py-2.5">
          <div className="flex w-max animate-[marquee_18s_linear_infinite] gap-8 whitespace-nowrap text- font-black tracking-widest text-white">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="flex gap-8">
                <span>🎪 WORKSHOP •</span><span>🎵 KONSER •</span><span>⚽ OLAHRAGA •</span><span>🛍 BAZAR •</span><span>🏆 LOMBA •</span><span>🎨 SENI •</span>
              </span>
            ))}
          </div>
          <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
        </div>

        {/* ========== STATISTIK ========== */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {[
            { angka: "20+", label: "EVENT SERU", emoji: "🎪", grad: "from-amber-400 to-orange-500" },
            { angka: "6", label: "KATEGORI", emoji: "✨", grad: "from-pink-400 to-rose-500" },
            { angka: "100%", label: "GRATIS JELAJAH", emoji: "🎉", grad: "from-emerald-400 to-teal-400" },
          ].map((s) => (
            <div
              key={s.label}
              // SEBELUM: bg-white/[0.06] + hover:bg-white/[0.09] -> SESUDAH: bg-white/6 + hover:bg-white/9
              className="rounded-2xl border border-white/10 bg-white/6 p-4 text-center backdrop-blur transition hover:-translate-y-1 hover:bg-white/9 md:p-6"
            >
              <p className="text- md:text-">{s.emoji}</p>
              <p className={`mt-1 bg-linear-to-r ${s.grad} bg-clip-text text- font-black leading-none text-transparent md:text-`}>
                {s.angka}
              </p>
              <p className="mt-1.5 text- font-black tracking-[0.14em] text-white/50 md:text-">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ========== FITUR ========== */}
        <div>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text- font-black tracking-[0.2em] text-amber-300">✨ KENAPA EVENTKU?</p>
              <h2 className="mt-2 text- font-black tracking-tight text-white md:text-">Kenapa Pakai EventKu? 🤔</h2>
              <p className="mt-1 text-sm font-medium text-white/60">Semua yang kamu butuhin buat ikut event sekolah, udah ada di sini.</p>
            </div>
            <span className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text- font-bold text-white/70 sm:block">3 Fitur Utama • Tanpa Ribet</span>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {fitur.map((f) => (
              <div
                key={f.judul}
                // SEBELUM: bg-gradient-to-br -> SESUDAH: bg-linear-to-br
                className={`group rounded-2xl border bg-linear-to-br p-6 transition hover:-translate-y-1.5 ${f.kotak} ${f.glow}`}
              >
                <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-linear-to-br text- text-white shadow-lg transition group-hover:rotate-[-8deg] group-hover:scale-110 ${f.warna}`}>
                  {f.icon}
                </div>
                <h3 className="mt-4 text- font-black text-white">{f.judul}</h3>
                <p className="mt-1.5 text-[13.5px] font-medium leading-relaxed text-white/60">{f.deskripsi}</p>
                <p className="mt-4 text- font-black text-white/80 group-hover:text-amber-300">Coba Sekarang →</p>
              </div>
            ))}
          </div>
        </div>

        {/* ========== CARA PAKAI ========== */}
        <div className="relative overflow-hidden rounded- border border-white/10 bg-[#1E103A] p-6 shadow-xl md:p-8">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-pink-500/20 blur-" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-violet-500/20 blur-" />
          <div className="relative flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="inline-flex rounded-full bg-[#2A1B52] px-3.5 py-1.5 text- font-black tracking-widest text-white ring-1 ring-white/15">CARA PAKAI</span>
              <h2 className="mt-3 text- font-black leading-tight text-white md:text-">Gampang Banget, 3 Langkah Doang 👇</h2>
            </div>
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text- font-bold text-white/70">⏱ Cuma 1 Menit</span>
          </div>

          <div className="relative mt-6 grid gap-4 md:grid-cols-3">
            {langkah.map((l) => (
              <div key={l.angka} className="relative rounded-2xl border border-white/10 bg-[#120826]/70 p-5 backdrop-blur transition hover:-translate-y-1 hover:border-white/20">
                <div className="flex items-center justify-between">
                  {/* SEBELUM: bg-gradient-to-br + text-zinc-900 (putih nyangkut) -> SESUDAH: bg-linear-to-br + text-white */}
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-linear-to-br from-amber-300 to-pink-500 text- font-black text-white shadow-lg ring-4 ring-[#1E103A]">
                    {l.angka}
                  </span>
                  <span className="text-">{l.emoji}</span>
                </div>
                <h3 className="mt-3 font-black text-white">{l.judul}</h3>
                <p className="mt-1 text-[13.5px] font-medium leading-relaxed text-white/60">{l.deskripsi}</p>
              </div>
            ))}
          </div>

          <Link
            href="/event"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 px-6 py-3.5 text-sm font-black text-white shadow-xl transition hover:scale-[1.03]"
          >
            Mulai Jelajah Sekarang →
          </Link>
        </div>

        {/* ========== QUOTE ========== */}
        {/* SEBELUM: bg-gradient-to-r -> SESUDAH: bg-linear-to-r */}
        <div className="overflow-hidden rounded- bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 p-[1.5px] shadow-[0_25px_50px_-15px_rgba(249,115,22,0.6)]">
          <div className="flex flex-col items-start justify-between gap-4 rounded- bg-[#150A2A] p-6 md:flex-row md:items-center md:p-7">
            <div>
              <p className="text- font-black leading-tight text-white md:text-">
                “Event terbaik bukan yang paling mahal, tapi yang paling seru bareng teman.”
              </p>
              <p className="mt-1.5 text- font-bold tracking-wide text-white/50">— TIM EVENTKU • XII RPL 1</p>
            </div>
            <Link
              href="/event"
              className="shrink-0 rounded-full bg-linear-to-r from-amber-400 to-pink-500 px-6 py-3 text-sm font-black text-white shadow-lg transition hover:scale-[1.03]"
            >
              Cari Event →
            </Link>
          </div>
        </div>

        <p className="pb-2 text-center text-xs font-bold text-white/50">
          {/* SEBELUM: bg-white/[0.06] -> SESUDAH: bg-white/6 */}
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 backdrop-blur">
            🎪 EventKu · dibuat oleh kelas XII RPL 1 • Berwarna • Anti-White • Super Modern
          </span>
        </p>
      </div>
    </div>
  );
}