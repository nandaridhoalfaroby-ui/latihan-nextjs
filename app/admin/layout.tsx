import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { keluar } from "@/app/login/actions";
import { pastikanAdmin } from "@/lib/sesi";

export const metadata: Metadata = { title: { default: "Admin", template: "%s • Admin EventKu" } };

// BENER: di Next.js 16, LayoutProps gak ada di "next", jadi pake ReactNode aja
// SALAH: import type { LayoutProps } from "next" -> makanya error ts(2614)
export default async function AdminLayout({ children }: { children: ReactNode }) {
  await pastikanAdmin();

  return (
    <div className="w-full min-h-screen bg-[#120826] text-white" style={{ colorScheme: "dark" }}>
      {/* HEADER ADMIN */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-[#1E103A]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex h-10 w-10 items-center justify-center rounded- bg-linear-to-br from-violet-600 via-pink-500 to-orange-500 text- font-black shadow-lg">E</Link>
            <div>
              <p className="text- font-black leading-tight">Panel Admin <span className="bg-linear-to-r from-amber-300 to-pink-400 bg-clip-text text-transparent">EventKu</span></p>
              <p className="text- text-white/50">Kelola event & pesanan • Login sebagai admin</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/admin" className="rounded-full bg-white/10 px-4 py-2 text- font-black ring-1 ring-white/10 transition hover:bg-white hover:text-zinc-900">📊 Dashboard</Link>
            <Link href="/admin/event" className="rounded-full bg-white/10 px-4 py-2 text- font-black ring-1 ring-white/10 transition hover:bg-white hover:text-zinc-900">🎪 Event</Link>
            <Link href="/admin/pesanan" className="rounded-full bg-white/10 px-4 py-2 text- font-black ring-1 ring-white/10 transition hover:bg-white hover:text-zinc-900">🧾 Pesanan</Link>
            <Link href="/" className="rounded-full bg-white/10 px-4 py-2 text- font-black ring-1 ring-white/10 transition hover:bg-white hover:text-zinc-900">🏠 Lihat Web</Link>
            <form action={keluar}>
              <button className="rounded-full bg-linear-to-r from-red-500 to-rose-500 px-4 py-2 text- font-black shadow-lg transition hover:scale-[1.03]">🚪 Keluar</button>
            </form>
          </div>
        </div>
      </div>

      {/* ISI HALAMAN ADMIN */}
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {children}
      </div>
    </div>
  );
}