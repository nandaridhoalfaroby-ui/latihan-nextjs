"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// GABUNGAN: menu lama lo + Admin di akhir, setelah Kontak
const menu = [
  { href: "/", label: "Beranda", icon: "🏠" },
  { href: "/event", label: "Event", icon: "🎪" },
  { href: "/favorit", label: "Favorit", icon: "❤" },
  { href: "/pesanan", label: "Pesanan", icon: "🎟" },
  { href: "/tentang", label: "Tentang", icon: "✨" },
  { href: "/kontak", label: "Kontak", icon: "💬" },
  { href: "/admin", label: "Admin", icon: "⚙" },
];

// DARI NAVBAR 1: hitung aman, kalau localStorage rusak gak crash
function hitung(key: string) {
  try {
    const d = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(d) ? d.length : 0;
  } catch { return 0; }
}

export default function Navbar() {
  const pathname = usePathname();
  const [jumlahFavorit, setJumlahFavorit] = useState(0);
  const [jumlahPesanan, setJumlahPesanan] = useState(0);
  const [bukaMenu, setBukaMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // GABUNGAN - DARI NAVBAR 1 + NAVBAR 2:
  // SEBELUM (Navbar 2): cuma baca sekali pas pathname berubah -> pas balik dari /pesan, badge Pesanan ilang / gak ke-update
  // SESUDAH (Navbar 1): baca ulang tiap pathname + pesanan-berubah + favorit-berubah + storage + focus
  // JADI: badge Pesanan + Favorit selalu bener, gak ilang pas pindah halaman
  function refresh() {
    setJumlahFavorit(hitung("favorit-eventku"));
    setJumlahPesanan(hitung("pesanan-eventku"));
  }

  useEffect(() => {
    refresh();
    setBukaMenu(false);
  }, [pathname]);

  useEffect(() => {
    refresh();
    const h = () => refresh();
    window.addEventListener("pesanan-berubah", h);
    window.addEventListener("favorit-berubah", h);
    window.addEventListener("storage", h);
    window.addEventListener("focus", h);
    return () => {
      window.removeEventListener("pesanan-berubah", h);
      window.removeEventListener("favorit-berubah", h);
      window.removeEventListener("storage", h);
      window.removeEventListener("focus", h);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* GARIS WARNA PELANGI ATAS - ciri khas website juara */}
      {/* SEBELUM: bg-[length:200%_100%] -> SESUDAH: bg-size-[200%_100%] */}
      <div className="h-1 w-full bg-[linear-gradient(90deg,#f43f5e,#f97316,#eab308,#22c55e,#06b6d4,#8b5cf6,#f43f5e)] bg-size-[200%_100%] animate-[rainbow_6s_linear_infinite]" />

      <div
        className={`relative w-full overflow-hidden border-b transition-all duration-500 ${
          scrolled
            ? "border-white/10 bg-[#120826]/95 shadow-[0_20px_60px_-15px_rgba(139,92,246,0.5)] backdrop-blur-xl"
            : "border-white/5 bg-[#1A0B2E]/95 backdrop-blur-xl"
        }`}
      >
        {/* GLOW - DIDALAM, GAK NYEBRANG */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 left-[10%] h-32 w-72 rounded-full bg-fuchsia-500/25 blur-2xl" />
          <div className="absolute -top-20 right-[20%] h-32 w-72 rounded-full bg-orange-500/25 blur-2xl" />
          <div className="absolute -top-20 left-[45%] h-24 w-56 rounded-full bg-cyan-400/15 blur-2xl" />
        </div>

        {/* ========== BAR UTAMA - 3 KOLOM RAPI, GAK PAKE ABSOLUTE LAGI ========== */}
        <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          {/* KIRI - LOGO */}
          <Link href="/" className="group flex shrink-0 items-center gap-3">
            <div className="relative">
              {/* SEBELUM: bg-gradient-to-br -> SESUDAH: bg-linear-to-br */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-amber-400 via-pink-500 to-violet-600 opacity-70 blur-md transition group-hover:blur-lg" />
              {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
              <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-amber-300 via-orange-500 to-pink-600 text- font-black text-white shadow-lg ring-1 ring-white/30 transition duration-300 group-hover:rotate-[-8deg] group-hover:scale-105">
                E
                <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300 opacity-75" />
                  <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-[#1A0B2E] bg-amber-300" />
                </span>
              </span>
            </div>
            <span className="leading-none">
              {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
              <span className="block text- font-black tracking-tight text-white">
                Event<span className="bg-linear-to-r from-amber-300 via-pink-400 to-violet-400 bg-clip-text text-transparent">Ku</span>
              </span>
              {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
              <span className="mt-1 flex items-center gap-1.5 text- font-bold tracking-[0.22em] text-white/60">
                <span className="h-1 w-1 rounded-full bg-emerald-400" />
                JELAJAHI • PESAN • HADIR
              </span>
            </span>
          </Link>

          {/* TENGAH - MENU DESKTOP */}
          {/* SEBELUM: bg-white/[0.06] -> SESUDAH: bg-white/6 */}
          <nav className="mx-auto hidden items-center gap-1 rounded-full border border-white/10 bg-white/6 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl lg:flex">
            {menu.map((m) => {
              const aktif = pathname === m.href || (m.href === "/admin" && pathname.startsWith("/admin"));
              const badge = m.href === "/favorit" ? jumlahFavorit : m.href === "/pesanan" ? jumlahPesanan : 0;
              const isAdmin = m.href === "/admin";
              return (
                <Link
                  key={m.href}
                  href={m.href}
                  // SEBELUM: bg-gradient-to-r -> SESUDAH: bg-linear-to-r
                  // SEBELUM: text- doang (kepotong) -> SESUDAH: text-
                  className={`relative flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text- font-bold transition-all duration-300 ${
                    aktif
                      ? "bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 text-white shadow-[0_8px_20px_-5px_rgba(249,115,22,0.6)]"
                      : isAdmin
                        ? "bg-white/10 text-amber-300 ring-1 ring-amber-400/30 hover:bg-amber-400 hover:text-white"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
                  <span className="text-">{m.icon}</span>
                  {m.label}
                  {badge > 0 && (
                    // SEBELUM: text- doang (kepotong) -> SESUDAH: text-
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2A1B52] px-1 text- font-black text-white ring-1 ring-white/20">
                      {badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* KANAN */}
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/event"
              // SEBELUM: text- doang (kepotong) -> SESUDAH: text-
              className="hidden h-10 items-center gap-2 rounded-full border border-white/10 bg-[#2A1B52] px-4 text- font-medium text-white/50 transition hover:border-amber-400/40 hover:text-white xl:flex"
            >
              <span>🔍</span> Cari konser, festival...
              {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
              <kbd className="rounded-md bg-white/10 px-1.5 py-0.5 text- font-bold text-white/70">⌘K</kbd>
            </Link>

            <Link
              href="/favorit"
              // SEBELUM: bg-white/7 masih oke di v4, tapi biar konsisten -> bg-white/10
              // SEBELUM: text- doang (kepotong) -> SESUDAH: text-
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text- transition hover:scale-105 hover:bg-pink-500/20 hover:border-pink-400/40"
            >
              ❤
              {jumlahFavorit > 0 && (
                // SEBELUM: text- doang (kepotong) -> SESUDAH: text-
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-linear-to-r from-pink-500 to-rose-500 px-1 text- font-black text-white ring-2 ring-[#1A0B2E]">
                  {jumlahFavorit}
                </span>
              )}
            </Link>

            <Link
              href="/event"
              // SEBELUM: bg-gradient-to-r -> SESUDAH: bg-linear-to-r
              // SEBELUM: text- doang (kepotong) -> SESUDAH: text-
              className="group relative hidden overflow-hidden rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 px-5 py-2.5 text- font-black text-white shadow-[0_10px_30px_-8px_rgba(249,115,22,0.7)] transition hover:scale-[1.03] hover:shadow-[0_15px_35px_-8px_rgba(236,72,153,0.7)] sm:block"
            >
              <span className="relative z-10">Cari Event →</span>
              <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition duration-700 group-hover:translate-x-full" />
            </Link>

            <button
              onClick={() => setBukaMenu(!bukaMenu)}
              aria-label="Buka menu"
              // SEBELUM: text- doang (kepotong) -> SESUDAH: text-
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#2A1B52] text- font-black text-white transition hover:rotate-90 hover:border-amber-400/50 lg:hidden"
            >
              {bukaMenu ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* ========== MENU HP - KARTU BERWARNA, RAPI 2 KOLOM ========== */}
        {bukaMenu && (
          <div className="relative border-t border-white/10 bg-[#150A2A] px-4 pb-5 pt-3 lg:hidden">
            <div className="grid grid-cols-2 gap-2.5">
              {menu.map((m, i) => {
                const aktif = pathname === m.href || (m.href === "/admin" && pathname.startsWith("/admin"));
                const badge = m.href === "/favorit" ? jumlahFavorit : m.href === "/pesanan" ? jumlahPesanan : 0;
                const colors = [
                  "from-amber-400/20 to-orange-500/10 border-amber-400/20",
                  "from-pink-500/20 to-rose-500/10 border-pink-500/20",
                  "from-violet-500/20 to-purple-500/10 border-violet-500/20",
                  "from-cyan-400/20 to-blue-500/10 border-cyan-400/20",
                  "from-emerald-400/20 to-teal-500/10 border-emerald-400/20",
                  "from-yellow-400/20 to-amber-500/10 border-yellow-400/20",
                  "from-zinc-400/20 to-slate-500/10 border-white/20",
                ];
                const isAdmin = m.href === "/admin";
                return (
                  <Link
                    key={m.href}
                    href={m.href}
                    // SEBELUM: bg-gradient-to-br -> SESUDAH: bg-linear-to-br
                    className={`flex items-center justify-between rounded-2xl border bg-linear-to-br p-3.5 transition active:scale-[0.97] ${
                      aktif ? "border-white/30 bg-white/10" : colors[i % colors.length]
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-">
                        {m.icon}
                      </span>
                      {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
                      <span className={`text- font-bold ${aktif ? "text-white" : isAdmin ? "text-amber-300" : "text-white/90"}`}>
                        {m.label}
                      </span>
                    </span>
                    {badge > 0 ? (
                      // SEBELUM: text- doang (kepotong) -> SESUDAH: text-
                      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1.5 text- font-black text-white">
                        {badge}
                      </span>
                    ) : (
                      <span className="text-white/30">›</span>
                    )}
                  </Link>
                );
              })}
            </div>
            <Link
              href="/event"
              // SEBELUM: bg-gradient-to-r -> SESUDAH: bg-linear-to-r
              // SEBELUM: text- doang (kepotong) -> SESUDAH: text-
              className="mt-3 block rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 py-3.5 text-center text- font-black text-white shadow-lg shadow-pink-500/30"
            >
              🎪 Cari Event Sekarang
            </Link>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </header>
  );
}