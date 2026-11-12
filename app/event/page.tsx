import type { Metadata } from "next";
import { ambilEvents } from "@/data/ambil";
import { rupiah } from "@/data/events";
import { bacaSaringan, saringEvents, PER_HALAMAN, alamatKatalog } from "@/data/saring";
import KartuEvent from "@/components/KartuEvent";

export const metadata: Metadata = { title: "Katalog Event" };

export default async function Katalog({ searchParams }: { searchParams: Promise<{ [kunci: string]: string | string[] | undefined }> }) {
  const s = bacaSaringan(await searchParams);
  const events = await ambilEvents();
  const terurut = saringEvents(events, s);

  const jumlahHal = Math.max(1, Math.ceil(terurut.length / PER_HALAMAN));
  const hal = Math.min(s.hal, jumlahHal);
  const ditampilkan = terurut.slice((hal - 1) * PER_HALAMAN, hal * PER_HALAMAN);
  const daftarKategori = ["Semua", ...new Set(events.map((e) => e.kategori))];
  const totalSisa = terurut.reduce((t, e) => t + e.sisa, 0);
  const rataRata = terurut.length === 0 ? 0 : Math.round(terurut.reduce((t, e) => t + e.harga, 0) / terurut.length);

  return (
    <div>
      <div className="rounded- bg-[#FFFBEB] border border-orange-100 p-6 md:p-8 shadow-sm">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-900">Katalog Event</h1>
        <p className="mt-2 text-sm font-medium text-zinc-600">Semua event sekolah, pilih yang kamu suka, pesan tiketnya langsung dari sini.</p>

        {/* key: bila URL berubah, formulir dibuat ulang agar isiannya ikut URL */}
        <div className="mt-6">
          <KontrolKatalog key={JSON.stringify(s)} s={s} daftarKategori={daftarKategori} />
        </div>

        <p className="mt-4 inline-flex flex-wrap gap-2">
          <span className="rounded-full bg-[#FFFEF7] border border-orange-100 px-3 py-1 text-xs font-bold text-zinc-600">{terurut.length} event ditemukan</span>
          <span className="rounded-full bg-[#FFFEF7] border border-orange-100 px-3 py-1 text-xs font-bold text-zinc-600">Rata-rata harga {rupiah(rataRata)}</span>
          <span className="rounded-full bg-[#DCFCE7] border border-emerald-200 px-3 py-1 text-xs font-black text-emerald-800">Total sisa tiket {totalSisa}</span>
        </p>
      </div>

      {terurut.length === 0 ? (
        <div className="mt-6 rounded- bg-[#FFFBEB] border border-orange-100 p-8 md:p-10 text-center shadow-sm">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#FFFEF7] border border-orange-100 text-3xl">🔍</div>
          <h2 className="mt-4 text-lg font-black text-zinc-900">Tidak ada event yang cocok.</h2>
          <p className="mt-1 text-sm font-medium text-zinc-600">Coba ubah kata kunci atau reset filter di atas.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ditampilkan.map((e) => <KartuEvent key={e.id} event={e} />)}
        </div>
      )}

      {/* Pagination - saringan dibawa terus */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {hal > 1 && (
          <a href={alamatKatalog(s, hal - 1)} className="rounded-full bg-[#FFFEF7] border border-orange-100 px-4 py-2 text-sm font-black text-zinc-900 hover:bg-white transition">
            ← Sebelumnya
          </a>
        )}
        <span className="rounded-full bg-[#FFFBEB] border border-orange-100 px-4 py-2 text-sm font-bold text-zinc-600">Halaman {hal} dari {jumlahHal}</span>
        {hal < jumlahHal && (
          <a href={alamatKatalog(s, hal + 1)} className="rounded-full bg-[#FFC837] border-2 border-amber-300 px-4 py-2 text-sm font-black text-zinc-900 hover:bg-[#FFD95E] transition">
            Berikutnya →
          </a>
        )}
      </div>
    </div>
  );
}

function KontrolKatalog({
  s,
  daftarKategori,
}: {
  s: ReturnType<typeof bacaSaringan>;
  daftarKategori: string[];
}) {
  return (
    <form action="/event" method="get" className="flex flex-wrap items-end gap-3">
      {Object.entries(s)
        .filter(([nama]) => nama !== "hal")
        .map(([nama, nilai]) => (
          <label key={nama} className="grid gap-1 text-xs font-bold capitalize text-zinc-700">
            {nama}
            {nama.toLowerCase().includes("kategori") ? (
              <select name={nama} defaultValue={String(nilai)} className="rounded-lg border border-orange-200 bg-white px-3 py-2 text-sm">
                {daftarKategori.map((kategori) => (
                  <option key={kategori} value={kategori === "Semua" ? "" : kategori}>{kategori}</option>
                ))}
              </select>
            ) : (
              <input
                name={nama}
                defaultValue={String(nilai)}
                className="rounded-lg border border-orange-200 bg-white px-3 py-2 text-sm"
              />
            )}
          </label>
        ))}
      <button type="submit" className="rounded-lg bg-[#FFC837] px-4 py-2 text-sm font-black text-zinc-900 hover:bg-[#FFD95E]">
        Terapkan
      </button>
    </form>
  );
}