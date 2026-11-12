import { Suspense } from "react";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";
import { ambilEvent } from "@/data/ambil";
import FormPesan from "@/components/FormPesan";
import TombolFavorit from "@/components/TombolFavorit";
import EventTerkait from "@/components/EventTerkait";

function rupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

export default async function Detail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await ambilEvent(Number(id));
  if (!event) notFound();

  const sisa = event.sisa;
  const namaAwal = (await cookies()).get("nama")?.value ?? "";
  const terisi = Math.round(((event.kapasitas - sisa) / event.kapasitas) * 100);
  const laris = sisa > 0 && terisi > 80;
  const habis = sisa === 0;

  return (
    <div className="mx-auto max-w-5xl grid md:grid-cols-[1.1fr_0.9fr] gap-6">
      {/* KIRI - INFO */}
      <article className="relative overflow-hidden rounded- bg-[#FFFBEB] border border-orange-100 p-6 md:p-8 shadow-sm">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#FFC837]/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-200/40 blur-3xl" />

        <div className="relative">
          <div className="relative mb-4 aspect-[40/21] w-full overflow-hidden rounded-2xl border border-orange-100">
            <Image
              src={event.gambar ?? "/img/default.png"}
              alt={event.judul}
              fill
              sizes="(max-width: 1024px) 100vw, 960px"
              priority
              className="object-cover"
            />
            <div className="absolute left-3 top-3 flex gap-2">
              <span className="rounded-full bg-[#FFFEF7] border border-orange-100 px-3 py-1 text- font-black text-zinc-700 shadow-sm">{event.kategori}</span>
              {laris && <span className="rounded-full bg-[#FFC837] border border-amber-300 px-3 py-1 text- font-black text-zinc-900 shadow-sm">🔥 Laris</span>}
              {habis && <span className="rounded-full bg-[#FFE4E6] border border-red-200 px-3 py-1 text- font-black text-red-700 shadow-sm">HABIS</span>}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight text-zinc-900">{event.judul}</h1>
          <p className="mt-3 text-sm font-bold text-zinc-600">📅 {event.tanggal} <span className="mx-1 text-zinc-300">•</span> 📍 {event.lokasi}</p>
          <p className="mt-4 text-sm font-medium leading-relaxed text-zinc-600">{event.deskripsi}</p>

          {namaAwal && (
            <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#FFFEF7] border border-orange-100 px-3 py-1.5 text-xs font-bold text-zinc-700">
              👋 Halo lagi, <span className="font-black text-zinc-900">{namaAwal}</span>
            </p>
          )}

          <p className="mt-6 text-4xl font-black text-zinc-900">{rupiah(event.harga)}</p>
          <div className="mt-6">
            <div className="flex justify-between text- font-bold"><span className="text-zinc-600">Sisa {sisa} dari {event.kapasitas} tiket</span><span className="text-zinc-500">{terisi}% terisi</span></div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-[#FFFEF7] border border-orange-100"><div className={`h-full rounded-full ${habis ? "bg-red-300" : laris ? "bg-[#FFC837]" : "bg-emerald-400"}`} style={{ width: `${terisi}%` }} /></div>
          </div>

          <div className="mt-6">
            <TombolFavorit id={event.id} />
          </div>

          {/* EVENT TERKAIT */}
          <section className="mt-8 rounded-2xl bg-[#FFFEF7] border border-orange-100 p-5">
            <h2 className="text-sm font-black tracking-tight text-zinc-900">Event terkait</h2>
            <div className="mt-3">
              <Suspense fallback={
                <div className="space-y-2">
                  {[1,2].map(i => <div key={i} className="h-14 animate-pulse rounded-2xl bg-[#FFFBEB] border border-orange-100" />)}
                  <p className="text-center text-xs font-bold text-zinc-500">Memuat event terkait...</p>
                </div>
              }>
                <EventTerkait event={event} />
              </Suspense>
            </div>
          </section>
        </div>
      </article>

      {/* KANAN - FORM */}
      <div>
        <FormPesan event={event} namaAwal={namaAwal} />
      </div>
    </div>
  );
}