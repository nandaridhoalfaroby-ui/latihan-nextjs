import Link from "next/link";
import type { Saringan } from "@/data/saring";

const chips = ["Semua", "Workshop", "Musik", "Olahraga", "Seni", "Teknologi"];

const chipWarna: Record<string, string> = {
  Semua: "from-white to-zinc-200 text-zinc-900",
  Workshop: "from-orange-400 to-amber-400 text-white",
  Musik: "from-pink-400 to-rose-500 text-white",
  Olahraga: "from-emerald-400 to-teal-400 text-white",
  Seni: "from-sky-400 to-blue-500 text-white",
  Teknologi: "from-violet-400 to-indigo-500 text-white",
};

export default function KontrolKatalog({
  s,
  daftarKategori,
}: {
  s: Saringan;
  daftarKategori: string[];
}) {
  const adaFilter =
    s.cari ||
    s.kategori !== "Semua" ||
    s.sisa ||
    s.max !== null ||
    s.urut !== "tanggal";

  const inputCls =
    "rounded-full border border-white/15 bg-white/7 px-4 py-2.5 text-sm font-bold text-white placeholder:text-white/40 placeholder:font-medium outline-none backdrop-blur transition focus:border-amber-400 focus:bg-white/10 focus:ring-2 focus:ring-amber-400/30";
  const labelCls = "text- font-black tracking-[0.14em] text-white/60";

  return (
    <form
      method="GET"
      action="/event"
      className="relative overflow-hidden rounded- border border-white/10 bg-[#1E103A]/90 shadow-[0_25px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur"
    >
      {/* SEBELUM: bg-gradient-to-r -> SESUDAH: bg-linear-to-r */}
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-amber-400 via-orange-500 to-pink-500" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-500/25 blur-" />

      {/* HEADER FILTER */}
      {/* SEBELUM: bg-gradient-to-r -> SESUDAH: bg-linear-to-r */}
      <div className="relative flex items-center justify-between gap-3 bg-linear-to-r from-amber-500/20 via-orange-500/15 to-pink-500/20 px-5 py-4">
        <span className="flex items-center gap-2.5 text-sm font-black text-white">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white text- text-zinc-900 shadow">
            🔍
          </span>
          Cari & Filter Event
          <span className="hidden rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text- font-black tracking-widest text-white/70 sm:block">
            {daftarKategori.length} KATEGORI
          </span>
        </span>
        {adaFilter && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text- font-black text-zinc-900 shadow">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            FILTER AKTIF
          </span>
        )}
      </div>

      <div className="relative p-5">
        <div className="flex flex-wrap gap-3">
          {/* CARI */}
          <label className="flex min-w- flex-1 flex-col gap-1.5">
            <span className={labelCls}>🔍 CARI</span>
            <input
              name="cari"
              defaultValue={s.cari}
              placeholder="Cari judul / lokasi..."
              className={`${inputCls} w-full`}
            />
          </label>

          {/* KATEGORI */}
          <label className="flex flex-col gap-1.5">
            <span className={labelCls}>🎪 KATEGORI</span>
            <select
              name="kategori"
              defaultValue={s.kategori}
              className={`${inputCls} cursor-pointer [&>option]:text-zinc-900`}
            >
              {daftarKategori.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </label>

          {/* URUT */}
          <label className="flex flex-col gap-1.5">
            <span className={labelCls}>↕ URUT</span>
            <select
              name="urut"
              defaultValue={s.urut}
              className={`${inputCls} cursor-pointer [&>option]:text-zinc-900`}
            >
              <option value="tanggal">📅 Tanggal</option>
              <option value="harga">💰 Harga termurah</option>
              <option value="mahal">💎 Harga termahal</option>
              <option value="nama">🔤 Nama A-Z</option>
            </select>
          </label>

          {/* MAX HARGA */}
          <label className="flex flex-col gap-1.5">
            <span className={labelCls}>💰 HARGA MAKS</span>
            <input
              name="max"
              type="number"
              min="0"
              defaultValue={s.max ?? ""}
              placeholder="Cth: 50000"
              className={`${inputCls} w-36`}
            />
          </label>

          {/* SISA - TOGGLE KAPSUL */}
          <div className="flex flex-col gap-1.5">
            <span className={labelCls}>🎟 SISA</span>
            <label
              // SEBELUM: hover:bg-white/[0.1] -> SESUDAH: hover:bg-white/10, bg-white/[0.07] -> bg-white/7
              className={`flex h-11 cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text- font-black transition ${s.sisa ? "border-emerald-400/40 bg-emerald-500/20 text-emerald-300" : "border-white/15 bg-white/7 text-white/70 hover:bg-white/10"}`}
            >
              <input
                type="checkbox"
                name="sisa"
                value="1"
                defaultChecked={s.sisa}
                className="h-4 w-4 accent-emerald-400"
              />
              {s.sisa ? "● Ada tiket" : "○ Ada tiket"}
            </label>
          </div>
        </div>

        {/* QUICK CHIPS KATEGORI - BERWARNA */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="py-2 text- font-black tracking-wider text-white/40">
            CEPAT:
          </span>
          {chips.map((c) => {
            const aktif =
              s.kategori === c ||
              (c === "Semua" && (s.kategori === "Semua" || s.kategori === ""));
            return (
              <Link
                key={c}
                href={`/event?kategori=${c === "Semua" ? "" : c}${s.cari ? `&cari=${s.cari}` : ""}${s.urut ? `&urut=${s.urut}` : ""}`}
                // SEBELUM: bg-gradient-to-r + bg-white/[0.06] + hover:bg-white/[0.1] -> SESUDAH: bg-linear-to-r + bg-white/6 + hover:bg-white/10
                className={`rounded-full px-3.5 py-2 text- font-black transition hover:-translate-y-0.5 ${
                  aktif
                    ? `bg-linear-to-r ${chipWarna[c] ?? chipWarna.Semua} shadow-lg`
                    : "border border-white/15 bg-white/6 text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {c}
              </Link>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-dashed border-white/15 pt-4">
          {/* SEBELUM: bg-gradient-to-r x2 -> SESUDAH: bg-linear-to-r x2 */}
          <button className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 px-6 py-3 text-sm font-black text-white shadow-[0_15px_30px_-10px_rgba(249,115,22,0.6)] transition hover:scale-[1.02]">
            <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent transition duration-700 group-hover:translate-x-full" />
            <span className="relative z-10">Terapkan</span>
            <span className="relative z-10 grid h-5 w-5 place-items-center rounded-full bg-white text- text-zinc-900">
              →
            </span>
          </button>
          {adaFilter && (
            <Link
              href="/event"
              // SEBELUM: bg-white/[0.07] -> SESUDAH: bg-white/7
              className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/7 px-5 py-3 text-sm font-black text-white backdrop-blur transition hover:bg-white hover:text-zinc-900"
            >
              ↺ Reset Filter
            </Link>
          )}
          <span className="ml-auto hidden self-center text- font-bold text-white/50 md:block">
            Tip: tekan Terapkan setelah ubah filter ✨
          </span>
        </div>
      </div>
    </form>
  );
}