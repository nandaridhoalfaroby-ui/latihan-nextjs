// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { href: "/", teks: "Beranda" },
  { href: "/event", teks: "Event" },
  { href: "/favorit", teks: "Favorit" },
  { href: "/tentang", teks: "Tentang" },
  { href: "/kontak", teks: "Kontak" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-orange-100 bg-[#FFFBEB]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#FFC837] border-2 border-amber-300 text-lg font-black text-zinc-900">
            E
          </span>
          <span className="text-lg font-black tracking-tight text-zinc-900">
            Event<span className="text-amber-600">Ku</span>
          </span>
        </Link>

        <div className="hidden sm:flex items-center gap-1 rounded-full bg-[#FFFEF7] border border-orange-100 p-1.5 shadow-sm">
          {menu.map((m) => {
            const aktif = pathname === m.href;
            return (
              <Link
                key={m.href}
                href={m.href}
                className={`rounded-full px-4 py-1.5 text-sm font-bold transition-all ${
                  aktif
                    ? "bg-[#FFC837] border border-amber-300 text-zinc-900 shadow-sm"
                    : "text-zinc-600 hover:bg-[#FFFBEB] hover:text-zinc-900"
                }`}
              >
                {m.teks}
              </Link>
            );
          })}
        </div>

        <Link
          href="/event"
          className="rounded-full bg-[#FFC837] border-2 border-amber-300 px-4 py-2 text-xs font-black text-zinc-900 shadow-sm hover:bg-[#FFD95E] transition"
        >
          Cari Event →
        </Link>
      </nav>

      {/* Mobile menu */}
      <div className="sm:hidden flex gap-1 overflow-x-auto px-4 pb-3">
        {menu.map((m) => {
          const aktif = pathname === m.href;
          return (
            <Link
              key={m.href}
              href={m.href}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold border ${
                aktif
                  ? "bg-[#FFC837] border-amber-300 text-zinc-900"
                  : "bg-[#FFFEF7] border-orange-100 text-zinc-600"
              }`}
            >
              {m.teks}
            </Link>
          );
        })}
      </div>
    </header>
  );
}