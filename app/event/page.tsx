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
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="relative overflow-hidden rounded- bg-gradient-to-br from-[#FFC837] via-[#FFB020] to-[#FF7A18] border-2 border-amber-300 p-6 md:p-8 shadow-[0_16px_40px_rgba(255,122,24,0.28)]">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20" />
        <div className="absolute -right-4 top-20 h-20 w-20 rounded-full bg-[#FFFEF7]/40" />
        <div className="relative">
          <span className="inline-flex rounded-full bg-zinc-900 px-3.5 py-1.5 text- font-black tracking-widest text-[#FFC837]">🎪 KATALOG EVENT</span>
          <h1 className="mt-3 text-2xl md:text-3xl font-black tracking-tight text-zinc-900 leading-tight">Jelajahi Semua Event Sekolah 🎉</h1>
          <p className="mt-1.5 max-w-xl text-sm font-bold leading-relaxed text-zinc-800/85">Semua event sekolah, pilih yang kamu suka, pesan tiketnya langsung dari sini.</p>
        </div>
      </div>

      {/* STATISTIK */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <div className="rounded- bg-[#FFFEF7] border-2 border-orange-100 p-4 md:p-5 text-center shadow-sm hover:-translate-y-1 transition">
          <p className="text-xl md:text-2xl">🎪</p>
          <p className="mt-1 text-xl md:text-2xl font-black text-zinc-900">{terurut.length}</p>
          <p className="text- font-black text-zinc-500">EVENT DITEMUKAN</p>
        </div>
        <div className="rounded- bg-[#F5F3FF] border-2 border-violet-100 p-4 md:p-5 text-center shadow-sm hover:-translate-y-1 transition">
          <p className="text-xl md:text-2xl">💰</p>
          <p className="mt-1 text- md:text-2xl font-black text-violet-700 leading-tight">{rupiah(rataRata)}</p>
          <p className="text- font-black text-zinc-500">RATA-RATA HARGA</p>
        </div>
        <div className="rounded- bg-[#F0FDF4] border-2 border-emerald-100 p-4 md:p-5 text-center shadow-sm hover:-translate-y-1 transition">
          <p className="text-xl md:text-2xl">🎟️</p>
          <p className="mt-1 text-xl md:text-2xl font-black text-emerald-700">{totalSisa}</p>
          <p className="text- font-black text-zinc-500">SISA TIKET</p>
        </div>
      </div>

      {/* FILTER */}
      <div className="rounded- bg-[#FFFEF7] border-2 border-orange-100 p-5 md:p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#FFC837] text-">🔍</span>
          <h2 className="font-black text-zinc-900">Cari & Filter Event</h2>
        </div>
        {/* key: bila URL berubah, formulir dibuat ulang agar isiannya ikut URL */}
        <div className="mt-4">
          <KontrolKatalog key={JSON.stringify(s)} s={s} daftarKategori={daftarKategori} />
        </div>
      </div>

      {terurut.length === 0 ? (
        <div className="overflow-hidden rounded- bg-[#FFFBEB] border-2 border-orange-100 shadow-sm text-center">
          <div className="bg-gradient-to-r from-[#FFC837] to-[#FF7A18] py-6">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded- bg-[#FFFEF7] border-2 border-amber-200 text-3xl shadow-lg rotate-3">🔍</div>
          </div>
          <div className="p-8">
            <h2 className="text-lg font-black text-zinc-900">Tidak ada event yang cocok.</h2>
            <p className="mt-1 text-sm font-medium text-zinc-600">Coba ubah kata kunci atau reset filter di atas.</p>
            <a href="/event" className="mt-4 inline-flex rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-black text-[#FFC837]">Reset Filter ↺</a>
          </div>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ditampilkan.map((e) => <KartuEvent key={e.id} event={e} />)}
        </div>
      )}

      {/* Pagination - saringan dibawa terus */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {hal > 1 && (
          <a href={alamatKatalog(s, hal - 1)} className="rounded-full bg-[#FFFEF7] border-2 border-orange-100 px-5 py-2.5 text-sm font-black text-zinc-900 hover:bg-[#FFF7D6] hover:-translate-y-0.5 transition">
            ← Sebelumnya
          </a>
        )}
        <span className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-black text-[#FFC837] shadow-md">Halaman {hal} dari {jumlahHal}</span>
        {hal < jumlahHal && (
          <a href={alamatKatalog(s, hal + 1)} className="rounded-full bg-gradient-to-r from-[#FFC837] to-[#FFB020] border-2 border-amber-300 px-5 py-2.5 text-sm font-black text-zinc-900 shadow-md hover:-translate-y-0.5 transition">
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
          <label key={nama} className="grid flex-1 min-w- gap-1.5 text- font-black tracking-wider text-zinc-500 uppercase">
            {nama === "q" ? "🔍 Cari" : nama === "kategori" ? "🎪 Kategori" : nama}
            {nama.toLowerCase().includes("kategori") ? (
              <select name={nama} defaultValue={String(nilai)} className="rounded-xl border-2 border-orange-100 bg-[#FFFBEB] px-3.5 py-2.5 text-sm font-bold text-zinc-900 normal-case tracking-normal focus:border-[#FFC837] focus:ring-2 focus:ring-amber-200">
                {daftarKategori.map((kategori) => (
                  <option key={kategori} value={kategori === "Semua" ? "" : kategori}>{kategori}</option>
                ))}
              </select>
            ) : (
              <input
                name={nama}
                defaultValue={String(nilai)}
                placeholder={nama === "q" ? "Cari judul / lokasi..." : ""}
                className="rounded-xl border-2 border-orange-100 bg-[#FFFBEB] px-3.5 py-2.5 text-sm font-bold text-zinc-900 placeholder:text-zinc-400 normal-case tracking-normal focus:border-[#FFC837] focus:ring-2 focus:ring-amber-200"
              />
            )}
          </label>
        ))}
      <button type="submit" className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-black text-[#FFC837] shadow-md hover:bg-zinc-800 hover:-translate-y-0.5 transition-all">
        Terapkan ✓
      </button>
      <a href="/event" className="rounded-full bg-[#FFF7D6] border-2 border-orange-100 px-5 py-3 text-sm font-black text-zinc-700 hover:bg-[#FFFBEB] transition">Reset ↺</a>
    </form>
  );
}