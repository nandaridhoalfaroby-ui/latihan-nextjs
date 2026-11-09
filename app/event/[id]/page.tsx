import { notFound } from "next/navigation";
import { events, rupiah } from "@/data/events";
import FormPesan from "@/components/FormPesan";
import TombolFavorit from "@/components/TombolFavorit";

export default async function Detail({ params }: PageProps<"/event/[id]">) {
  const { id } = await params;
  const event = events.find((e) => e.id === Number(id));
  if (!event) notFound();

  const sisa = event.kuota - event.terisi;
  const habis = sisa === 0;
  const persen = Math.round((event.terisi / event.kuota) * 100);
  const laris = sisa > 0 && event.terisi / event.kuota > 0.8;

  // Biar FormPesan yang pake event.sisa tetep jalan
  const eventDenganSisa = { ...event, sisa };

  return (
    <div className="mx-auto max-w-5xl grid md:grid-cols-[1.1fr_0.9fr] gap-6">
      {/* KIRI - INFO */}
      <article className="relative overflow-hidden rounded- bg-[#FFFBEB] border border-orange-100 p-8 md:p-10 flex flex-col min-h- shadow-sm">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#FFC837]/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-200/40 blur-3xl" />

        <div className="relative">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex rounded-full bg-[#FFFEF7] border border-orange-100 px-3 py-1 text- font-black tracking-wide text-zinc-700 shadow-sm">
              {event.kategori}
            </span>
            {laris && (
              <span className="inline-flex rounded-full bg-[#FFC837] border border-amber-300 px-3 py-1 text- font-black text-zinc-900">
                🔥 Laris
              </span>
            )}
            <span className={`inline-flex rounded-full border px-3 py-1 text- font-black ${habis ? "bg-[#FFE4E6] border-red-200 text-red-700" : "bg-[#DCFCE7] border-emerald-200 text-emerald-800"}`}>
              {habis ? "HABIS" : `SISA ${sisa} TIKET`}
            </span>
          </div>

          <h1 className="mt-5 text-3xl md:text-4xl font-black tracking-tight leading-[1.1] text-zinc-900">
            {event.judul}
          </h1>
          <p className="mt-3 text-sm font-bold text-zinc-600">
            📅 {event.tanggal} <span className="mx-1 text-zinc-300">•</span> 📍 {event.lokasi}
          </p>
          <p className="mt-4 max-w-md text-sm font-medium leading-relaxed text-zinc-600">
            Jangan sampai kehabisan. Pesan sekarang, e-ticket langsung dikirim ke email lo.
          </p>
        </div>

        <div className="relative mt-auto pt-10">
          <p className="text- font-bold tracking-widest text-zinc-500">HARGA TIKET</p>
          <p className="mt-1 text-4xl font-black text-zinc-900">{rupiah(event.harga)}</p>
          
          <div className="mt-4">
            <div className="flex justify-between text- font-bold">
              <span className="text-zinc-600">Sisa {sisa} dari {event.kuota} tiket</span>
              <span className="text-zinc-500">{persen}% terisi</span>
            </div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-[#FFFEF7] border border-orange-100">
              <div className={`h-full rounded-full ${habis ? "bg-red-300" : laris ? "bg-[#FFC837]" : "bg-emerald-400"}`} style={{ width: `${persen}%` }} />
            </div>
          </div>

          <div className="mt-6">
            <TombolFavorit id={event.id} />
          </div>
        </div>
      </article>

      {/* KANAN - FORM */}
      <div>
        <FormPesan event={eventDenganSisa} />
      </div>
    </div>
  );
}