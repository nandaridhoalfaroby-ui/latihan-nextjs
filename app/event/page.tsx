import type { Metadata } from "next";
import { ambilEvents } from "@/data/ambil";
import KatalogInteraktif from "@/components/KatalogInteraktif";

export const metadata: Metadata = { title: "Katalog Event" };

export default async function Katalog() {
  const events = await ambilEvents();
  return (
    <div>
      <div className="rounded- bg-[#FFFBEB] border border-orange-100 p-6 md:p-8 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900">Katalog Event</h1>
        <p className="mt-2 text-sm font-medium text-zinc-600">Semua event sekolah, pilih yang kamu suka, pesan tiketnya langsung dari sini.</p>
        <div className="mt-6">
          <KatalogInteraktif events={events} />
        </div>
      </div>
    </div>
  );
}