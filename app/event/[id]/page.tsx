import { events, rupiah } from "@/data/events";
import { notFound } from "next/navigation";
import FormPesan from "@/components/FormPesan";
import TombolFavorit from "@/components/TombolFavorit";
import Link from "next/link";

export default async function DetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = events.find((e) => String(e.id) === id);
  if (!event) notFound();

  const terisi = Math.round(((event.kapasitas - event.sisa) / event.kapasitas) * 100);
  const laris = event.sisa > 0 && terisi > 80;
  const habis = event.sisa === 0;

  return (
    <div className="mx-auto max-w-5xl grid md:grid-cols-[1.1fr_0.9fr] gap-6">
      <div className="relative overflow-hidden rounded- bg-[#FFFBEB] border border-orange-100 p-8 md:p-10 shadow-sm">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#FFC837]/30 blur-3xl" />
        <div className="relative">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[#FFFEF7] border border-orange-100 px-3 py-1 text- font-black text-zinc-700">{event.kategori}</span>
            {laris && <span className="rounded-full bg-[#FFC837] border border-amber-300 px-3 py-1 text- font-black text-zinc-900">🔥 Laris</span>}
            <span className={`rounded-full border px-3 py-1 text- font-black ${habis ? "bg-[#FFE4E6] border-red-200 text-red-700" : "bg-[#DCFCE7] border-emerald-200 text-emerald-800"}`}>{habis ? "HABIS" : `SISA ${event.sisa} TIKET`}</span>
          </div>
          <h1 className="mt-5 text-3xl md:text-4xl font-black tracking-tight leading-tight text-zinc-900">{event.judul}</h1>
          <p className="mt-3 text-sm font-bold text-zinc-600">📅 {event.tanggal} • 📍 {event.lokasi}</p>
          <p className="mt-4 text-sm font-medium leading-relaxed text-zinc-600">{event.deskripsi}</p>
          <p className="mt-6 text-4xl font-black text-zinc-900">{rupiah(event.harga)}</p>
          <div className="mt-6">
            <div className="flex justify-between text- font-bold"><span className="text-zinc-600">Sisa {event.sisa} dari {event.kapasitas} tiket</span><span className="text-zinc-500">{terisi}% terisi</span></div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-[#FFFEF7] border border-orange-100"><div className={`h-full rounded-full ${habis ? "bg-red-300" : laris ? "bg-[#FFC837]" : "bg-emerald-400"}`} style={{ width: `${terisi}%` }} /></div>
          </div>
          <div className="mt-6"><TombolFavorit id={event.id} /></div>
        </div>
      </div>
      <div>
        <FormPesan event={event} />
        <Link href="/pesanan" className="mt-4 block text-center rounded-full bg-[#FFFEF7] border border-orange-100 py-3 text-sm font-black text-zinc-900 hover:bg-[#FFFBEB] transition">Lihat Daftar Pesanan →</Link>
      </div>
    </div>
  );
}