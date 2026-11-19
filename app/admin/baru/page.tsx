import type { Metadata } from "next";
import Link from "next/link";
import FormEvent from "@/components/FormEvent";

export const metadata: Metadata = { title: "Tambah Event" };

export default function Baru() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="relative overflow-hidden rounded- border border-white/10 bg-[#1E103A]/90 p-6 shadow-xl">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/25 blur-" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-pink-500/25 blur-" />
        <div className="relative flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="inline-flex rounded-full bg-black/40 px-3.5 py-1 text- font-black tracking-widest text-amber-300 ring-1 ring-white/15">✨ TAMBAH EVENT BARU</span>
            <h1 className="mt-3 text- font-black leading-tight">Tambah Event, <span className="bg-linear-to-r from-amber-300 via-orange-400 to-pink-400 bg-clip-text text-transparent">Langsung Live.</span></h1>
            <p className="mt-1 text-sm text-white/60">Isi formulir di bawah, klik Simpan, event langsung muncul di situs publik.</p>
          </div>
          <Link href="/admin/event" className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text- font-black transition hover:bg-white hover:text-zinc-900">← Kembali ke Event</Link>
        </div>
      </div>
      <FormEvent />
    </div>
  );
}