import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ambilEvent } from "@/data/ambil";
import FormEvent from "@/components/FormEvent";

export const metadata: Metadata = { title: "Ubah Event" };

export default async function Ubah({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await ambilEvent(Number(id));
  if (!event) notFound();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="relative overflow-hidden rounded- border border-white/10 bg-[#1E103A]/90 p-6 shadow-xl">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/25 blur-" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-pink-500/25 blur-" />
        <div className="relative flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="inline-flex rounded-full bg-black/40 px-3.5 py-1 text- font-black tracking-widest text-amber-300 ring-1 ring-white/15">✏️ UBAH EVENT • ID {event.id}</span>
            <h1 className="mt-3 text- font-black leading-tight">Ubah Event, <span className="bg-linear-to-r from-amber-300 via-orange-400 to-pink-400 bg-clip-text text-transparent">{event.judul}</span></h1>
            <p className="mt-1 text-sm text-white/60">📍 {event.lokasi} • 📅 {String(event.tanggal).slice(0, 10)} • Terisi {event.terisi}/{event.kuota} • Kuota tidak boleh di bawah tiket terisi.</p>
          </div>
          <Link href="/admin/event" className="shrink-0 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text- font-black transition hover:bg-white hover:text-zinc-900">← Kembali ke Event</Link>
        </div>
      </div>

      {/* BENER: event dari Supabase langsung dikirim, FormEvent-nya udah boleh null sekarang */}
      {/* Jadi gak perlu lagi String(data.gambar ?? "") satu-satu, langsung event={event} */}
      <FormEvent event={event} />
    </div>
  );
}