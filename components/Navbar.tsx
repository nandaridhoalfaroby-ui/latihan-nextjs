"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  { href: "/", label: "Beranda" },
  { href: "/event", label: "Event" },
  { href: "/favorit", label: "Favorit" },
  { href: "/pesanan", label: "Pesanan" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-orange-100 bg-[#FFFEF7]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#FFC837] border border-amber-300 text-lg font-black text-zinc-900">E</span>
          <span className="text-lg font-black tracking-tight text-zinc-900">Event<span className="text-amber-600">Ku</span></span>
        </Link>
        <nav className="flex items-center gap-1 rounded-full border border-orange-100 bg-white/50 p-1">
          {menus.map((m) => {
            const aktif = pathname === m.href || (m.href !== "/" && pathname.startsWith(m.href));
            return (
              <Link key={m.href} href={m.href} className={`rounded-full px-3 py-1.5 text- font-bold transition ${aktif ? "bg-[#FFC837] text-zinc-900 shadow-sm" : "text-zinc-600 hover:bg-[#FFFBEB] hover:text-zinc-900"}`}>
                {m.label}
              </Link>
            );
          })}
        </nav>
        <Link href="/event" className="hidden sm:block rounded-full bg-[#FFC837] border-2 border-amber-300 px-4 py-2 text-xs font-black text-zinc-900 shadow-sm hover:bg-[#FFD95E]">Cari Event →</Link>
      </div>
    </header>
  );
}