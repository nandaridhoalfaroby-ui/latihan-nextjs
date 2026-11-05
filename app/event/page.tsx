import { events, rupiah } from "@/data/events";
import FormPesan from "@/components/FormPesan";
import TombolFavorit from "@/components/TombolFavorit";
import Link from "next/link";

export default function DetailEvent({ params }: { params: { id: string } }) {
  const event = events.find((e) => e.id.toString() === params.id);

  if (!event) {
    return (
      <div className="p-6">
        <p>Event tidak ditemukan</p>
        <Link href="/event" className="text-blue-600">
          ← Kembali
        </Link>
      </div>
    );
  }

  const sisa = event.kuota - event.terisi;

  // LANGKAH 8 - FILTER TERKAIT
  const terkait = events.filter(
    (e) => e.kategori === event.kategori && e.id !== event.id,
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link href="/event" className="text-sm text-blue-600 hover:underline">
        ← Kembali ke event
      </Link>

      <div className="mt-4 rounded-xl border bg-white p-6 shadow-sm">
        <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
          {event.kategori}
        </span>
        <h1 className="mt-2 text-2xl font-bold">{event.judul}</h1>
        <p className="text-slate-500">
          {event.tanggal} - {event.lokasi}
        </p>
        <p className="mt-2 font-semibold">{rupiah(event.harga)}</p>
        <p
          className={`text-sm ${sisa === 0 ? "text-red-600" : "text-green-700"}`}
        >
          {sisa === 0 ? "Tiket habis" : `Sisa ${sisa} tiket`}
        </p>
        <p className="mt-4 text-slate-700">{event.deskripsi}</p>
      </div>

      <div className="mt-6">
        <FormPesan event={event} />
      </div>

      <div className="mt-4">
        <TombolFavorit id={event.id} />
      </div>

      {/* === LANGKAH 8 EVENT TERKAIT === */}
      <div className="mt-8 border-t pt-6">
        <h2 className="mb-3 text-lg font-semibold">Event terkait</h2>
        {terkait.length === 0 ? (
          <p className="text-sm text-slate-500">Belum ada event terkait.</p>
        ) : (
          <ul className="list-disc space-y-1 pl-5">
            {terkait.map((e) => (
              <li key={e.id}>
                <Link
                  href={`/event/${e.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {e.judul}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
