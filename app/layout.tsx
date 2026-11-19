import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
// SEBELUM (salah, bikin Build Error): import SplashScreen from "@/components/Splashscreen";
// SESUDAH (bener): S-nya GEDE, sama persis kaya nama file-nya components/SplashScreen.tsx
// PENTING: di folder components/ harus cuma ada 1 file: SplashScreen.tsx. Kalau ada Splashscreen.tsx (s kecil), hapus!
import SplashScreen from "@/components/SplashScreen";

export const metadata: Metadata = {
  title: "EventKu - Jelajahi, Pesan, Hadir",
  description: "Semua event sekolah dalam satu tempat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen overflow-x-hidden bg-[#120826] text-white antialiased" style={{ colorScheme: "dark" }}>
        {/* SPLASH: video intro pintu kebuka -> cahaya -> logo -> loading -> Beranda */}
        {/* Muncul 1x per sesi, di atas semua halaman, di atas Navbar + Footer */}
        <SplashScreen />

        {/* BACKGROUND UNIVERSE - GELAP + GLOW WARNA WARNI */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#120826]">
          {/* Glow utama */}
          {/* SEBELUM: blur- doang (kepotong) -> SESUDAH: blur- */}
          <div className="absolute -left-32 -top-25 h-96 w-96 rounded-full bg-fuchsia-600/25 blur-" />
          <div className="absolute -right-32 top-[30%] h-96 w-96 rounded-full bg-orange-500/20 blur-" />
          <div className="absolute -bottom-25 left-[30%] h-96 w-96 rounded-full bg-cyan-500/15 blur-" />
          {/* Grid halus ala website juara */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-size-[60px_60px] mask-[radial-gradient(ellipse_at_top,black_20%,transparent_80%)]" />
          {/* Noise biar gak flat */}
          <div className="absolute inset-0 opacity-[0.04] [background-image:url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
        </div>

        <Navbar />

        {/* KONTEN - FULL WIDTH, BIAR HERO BISA FULL BLEED */}
        <main className="w-full">{children}</main>

        {/* FOOTER - MEGA FOOTER ALA WEBSITE JUARA, BUKAN LAGI KOTAK KECIL */}
        <footer className="relative w-full overflow-hidden border-t border-white/10">
          {/* Glow footer */}
          <div className="pointer-events-none absolute inset-0">
            {/* SEBELUM: blur- doang (kepotong) -> SESUDAH: blur- */}
            <div className="absolute -top-20 left-1/4 h-56 w-96 rounded-full bg-violet-600/30 blur-" />
            <div className="absolute -top-20 right-1/4 h-56 w-96 rounded-full bg-pink-500/25 blur-" />
          </div>

          {/* CTA BESAR DI ATAS FOOTER */}
          <div className="relative mx-auto w-full max-w-7xl px-4 pt-14 sm:px-6">
            {/* SEBELUM: rounded- doang (kepotong) -> SESUDAH: rounded- */}
            <div className="relative overflow-hidden rounded- bg-linear-to-r from-violet-600 via-pink-500 to-orange-500 p-[1.5px] shadow-[0_30px_60px_-20px_rgba(236,72,153,0.5)]">
              <div className="flex flex-col items-start justify-between gap-5 rounded-[26.5px] bg-[#1A0B2E]/95 px-6 py-7 sm:px-8 md:flex-row md:items-center">
                <div>
                  {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
                  <p className="text- font-black tracking-[0.2em] text-amber-300">✨ GRATIS • TANPA RIBET • LANGSUNG HADIR</p>
                  {/* SEBELUM: text- + md:text- doang (kepotong) -> SESUDAH: text- + md:text- */}
                  <p className="mt-2 text- font-black leading-tight md:text-">
                    Event Seru Nungguin Kamu, <span className="bg-linear-to-r from-amber-300 to-pink-400 bg-clip-text text-transparent">Jangan Sampai Ketinggalan!</span>
                  </p>
                </div>
                <a
                  href="/event"
                  className="group relative shrink-0 overflow-hidden rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 px-7 py-3.5 text-sm font-black text-white shadow-lg transition hover:scale-[1.04]"
                >
                  <span className="relative z-10">🎪 Cari Event Sekarang →</span>
                  <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition duration-700 group-hover:translate-x-full" />
                </a>
              </div>
            </div>
          </div>

          {/* ISI FOOTER */}
          <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
            <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
              {/* BRAND - LEBIH BESAR & HIDUP */}
              <div>
                <a href="/" className="flex items-center gap-3">
                  {/* SEBELUM: rounded- + text- doang (kepotong) -> SESUDAH: rounded- + text- */}
                  <span className="relative flex h-11 w-11 items-center justify-center rounded- bg-linear-to-br from-amber-300 via-orange-500 to-pink-600 text- font-black text-white shadow-[0_10px_25px_-5px_rgba(249,115,22,0.6)]">
                    E
                  </span>
                  {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
                  <span className="text- font-black tracking-tight">
                    Event<span className="bg-linear-to-r from-amber-300 to-pink-400 bg-clip-text text-transparent">Ku</span>
                  </span>
                  {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text- font-black tracking-widest text-amber-300 ring-1 ring-white/20">
                    XII RPL 1
                  </span>
                </a>
                {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
                <p className="mt-4 max-w-sm text- leading-relaxed text-white/60">
                  🎪 Semua event sekolah dalam satu tempat. Jelajahi, pesan, hadir. Gak pake ribet, langsung gas!
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
                  <span className="rounded-full border border-orange-400/30 bg-orange-500/15 px-3 py-1.5 text- font-bold text-orange-200">🎪 Event Seru</span>
                  <span className="rounded-full border border-pink-400/30 bg-pink-500/15 px-3 py-1.5 text- font-bold text-pink-200">❤ Favorit</span>
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1.5 text- font-bold text-emerald-200">🎟 Pesanan Cepat</span>
                </div>
                {/* Social */}
                <div className="mt-5 flex gap-2">
                  {["📸", "🎵", "💬", "▶"].map((s, i) => (
                    // SEBELUM: bg-white/7 (gak ada di Tailwind) + text- doang -> SESUDAH: bg-white/10 + text-
                    <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text- transition hover:scale-110 hover:bg-pink-500/20 hover:border-pink-400/40 hover:text-white">
                      {s}
                    </a>
                  ))}
                </div>
              </div>

              {/* MENU */}
              <div>
                {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
                <p className="text- font-black tracking-[0.2em] text-white/40">JELAJAHI</p>
                {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
                <ul className="mt-4 space-y-2.5 text- font-bold text-white/75">
                  <li><a href="/" className="transition hover:text-amber-300">🏠 Beranda</a></li>
                  <li><a href="/event" className="transition hover:text-amber-300">🎪 Semua Event</a></li>
                  <li><a href="/favorit" className="transition hover:text-amber-300">❤ Favorit Saya</a></li>
                  <li><a href="/pesanan" className="transition hover:text-amber-300">🎟 Pesanan Saya</a></li>
                </ul>
              </div>

              {/* KATEGORI */}
              <div>
                <p className="text- font-black tracking-[0.2em] text-white/40">KATEGORI</p>
                <ul className="mt-4 space-y-2.5 text- font-bold text-white/75">
                  <li><a href="/event?kategori=Workshop" className="transition hover:text-orange-300">💻 Workshop</a></li>
                  <li><a href="/event?kategori=Musik" className="transition hover:text-pink-300">🎵 Musik</a></li>
                  <li><a href="/event?kategori=Olahraga" className="transition hover:text-emerald-300">⚽ Olahraga</a></li>
                  <li><a href="/event?kategori=Bazar" className="transition hover:text-amber-300">🛍 Bazar & Lomba</a></li>
                </ul>
              </div>

              {/* STATS MINI */}
              {/* SEBELUM: rounded- doang (kepotong) -> SESUDAH: rounded- */}
              <div className="rounded- border border-white/10 bg-white/5 p-4 backdrop-blur">
                {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
                <p className="text- font-black tracking-[0.18em] text-white/40">LIVE HARI INI</p>
                <div className="mt-3 space-y-3">
                  <div className="flex items-center justify-between">
                    {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- / text- */}
                    <span className="text- font-bold text-white/70">🎟 Tiket Terjual</span>
                    <span className="text- font-black text-amber-300">1.240+</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[82%] rounded-full bg-linear-to-r from-amber-400 to-pink-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text- font-bold text-white/70">⭐ Rating</span>
                    <span className="text- font-black text-white">4.9 / 5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text- font-bold text-white/70">👥 Pelajar Hadir</span>
                    <span className="text- font-black text-emerald-300">800+</span>
                  </div>
                </div>
                {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
                <a href="/event" className="mt-4 block rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 py-2.5 text-center text- font-black text-white shadow-lg shadow-orange-500/30 transition hover:scale-[1.02]">
                  Lihat Event →
                </a>
              </div>
            </div>
          </div>

          {/* BAWAH FOOTER + GARIS PELANGI */}
          <div className="h-1 w-full bg-[linear-gradient(90deg,#f43f5e,#f97316,#eab308,#22c55e,#06b6d4,#8b5cf6,#f43f5e)]" />
          {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-center text- text-white/50 sm:px-6 md:flex-row md:text-left">
            <p>© 2026 <span className="font-black text-white">EventKu</span> • Dibuat dengan ❤ oleh kelas XII RPL 1</p>
            <p className="font-bold">V2026.11.17</p>
          </div>
        </footer>
      </body>
    </html>
  );
}