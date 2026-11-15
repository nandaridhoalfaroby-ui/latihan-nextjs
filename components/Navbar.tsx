"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const menus = [
  { href: "/", label: "Beranda", icon: "🏠" },
  { href: "/event", label: "Event", icon: "🎪" },
  { href: "/favorit", label: "Favorit", icon: "❤️" },
  { href: "/pesanan", label: "Pesanan", icon: "🎟️" },
  { href: "/tentang", label: "Tentang", icon: "✨" },
  { href: "/kontak", label: "Kontak", icon: "📞" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [jumlahFavorit, setJumlahFavorit] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const hitung = () => {
      try {
        const fav = JSON.parse(localStorage.getItem("favorit") || "[]");
        setJumlahFavorit(Array.isArray(fav) ? fav.length : 0);
      } catch {
        setJumlahFavorit(0);
      }
    };
    hitung();
    window.addEventListener("favorit-berubah", hitung);
    window.addEventListener("storage", hitung);
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("favorit-berubah", hitung);
      window.removeEventListener("storage", hitung);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FFFBEB]/95 shadow-[0_8px_30px_rgba(251,146,60,0.18)] backdrop-blur-xl border-b-2 border-orange-200"
          : "bg-[#FFFBEB] border-b border-orange-100"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        {/* LOGO */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5 group">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[#FFC837] via-[#FFB020] to-[#F97316] border-2 border-amber-300 text-xl font-black text-white shadow-[0_6px_16px_rgba(249,115,22,0.35)] group-hover:rotate-6 group-hover:scale-105 transition-transform">
            E
          </span>
          <span className="leading-none">
            <span className="block text-xl font-black tracking-tight text-zinc-900">
              Event<span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Ku</span>
            </span>
            <span className="block text- font-bold tracking-[0.18em] text-orange-500">JELAJAHI • PESAN • HADIR</span>
          </span>
        </Link>

        {/* NAV DESKTOP - FLOATING PILL */}
        <nav className="hidden lg:flex items-center gap-1 rounded-full bg-[#FFFEF7] border-2 border-orange-100 shadow-[0_4px_20px_rgba(251,146,60,0.12)] p-1.5">
          {menus.map((m) => {
            const aktif = pathname === m.href || (m.href !== "/" && pathname.startsWith(m.href));
            return (
              <Link
                key={m.href}
                href={m.href}
                className={`relative rounded-full px-3.5 py-2 text-xs font-black transition-all duration-200 flex items-center gap-1.5 ${
                  aktif
                    ? "bg-gradient-to-r from-[#FFC837] to-[#FFB020] text-zinc-900 shadow-[0_4px_14px_rgba(255,200,55,0.5)] scale-105"
                    : "text-zinc-500 hover:bg-[#FFF7D6] hover:text-zinc-900"
                }`}
              >
                <span>{m.icon}</span>
                {m.label}
                {m.href === "/favorit" && jumlahFavorit > 0 && (
                  <span className="grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text- font-black text-white shadow-sm">
                    {jumlahFavorit}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <Link
            href="/favorit"
            className="lg:hidden relative grid h-10 w-10 place-items-center rounded-full bg-[#FFFEF7] border-2 border-orange-100 text-lg"
          >
            ❤️
            {jumlahFavorit > 0 && (
              <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text- font-black text-white">
                {jumlahFavorit}
              </span>
            )}
          </Link>
          <Link
            href="/event"
            className="hidden sm:flex items-center gap-1.5 rounded-full bg-zinc-900 px-5 py-2.5 text-xs font-black text-[#FFC837] shadow-[0_6px_18px_rgba(0,0,0,0.18)] hover:bg-zinc-800 hover:-translate-y-0.5 transition-all"
          >
            Cari Event
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#FFC837] text- text-zinc-900">→</span>
          </Link>
        </div>
      </div>

      {/* NAV MOBILE - SCROLL */}
      <nav className="lg:hidden flex gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {menus.map((m) => {
          const aktif = pathname === m.href || (m.href !== "/" && pathname.startsWith(m.href));
          return (
            <Link
              key={m.href}
              href={m.href}
              className={`shrink-0 flex items-center gap-1.5 rounded-full border-2 px-3.5 py-2 text-xs font-black transition ${
                aktif
                  ? "bg-gradient-to-r from-[#FFC837] to-[#FFB020] border-amber-300 text-zinc-900 shadow-md"
                  : "bg-[#FFFEF7] border-orange-100 text-zinc-600"
              }`}
            >
              <span>{m.icon}</span>
              {m.label}
              {m.href === "/favorit" && jumlahFavorit > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text- font-black text-white">
                  {jumlahFavorit}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}