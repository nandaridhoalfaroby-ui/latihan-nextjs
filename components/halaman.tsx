import Link from "next/link";
import { alamatKatalog, type Saringan } from "@/data/saring";

export default function Halaman({
  s,
  hal,
  jumlah,
}: {
  s: Saringan;
  hal: number;
  jumlah: number;
}) {
  if (jumlah <= 1) return null;

  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      {/* KAPSUL PAGINATION MELAYANG - ANTI-WHITE, DARK + GLOW */}
      <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#1E103A]/90 p-1.5 shadow-xl backdrop-blur">
        {/* Sebelumnya */}
        {hal > 1 ? (
          <Link
            href={alamatKatalog(s, hal - 1)}
            className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-xs font-black text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-zinc-900"
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-zinc-900 text- text-[#FFC837]">
              ←
            </span>
            Sebelumnya
          </Link>
        ) : (
          <span className="flex cursor-not-allowed items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-black text-white/30">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-white/10 text- text-white/40">
              ←
            </span>
            Sebelumnya
          </span>
        )}

        {/* Garis pemisah */}
        <span className="hidden h-6 w-px bg-white/10 sm:block" />

        {/* Angka halaman */}
        <div className="flex items-center gap-1">
          {Array.from({ length: jumlah }, (_, i) => i + 1).map((nomor) => (
            <Link
              key={nomor}
              href={alamatKatalog(s, nomor)}
              className={
                nomor === hal
                  // SEBELUM: bg-gradient-to-br -> SESUDAH: bg-linear-to-br, warning Ln 50 hilang
                  ? "grid h-10 w-10 scale-105 place-items-center rounded-full border-2 border-amber-300 bg-linear-to-br from-[#FFC837] to-[#FFB020] text-sm font-black text-zinc-900 shadow-[0_4px_14px_rgba(255,180,0,0.45)]"
                  : "grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-white/60 transition-all hover:scale-105 hover:bg-white/10 hover:text-white"
              }
            >
              {nomor}
            </Link>
          ))}
        </div>

        <span className="hidden h-6 w-px bg-white/10 sm:block" />

        {/* Berikutnya */}
        {hal < jumlah ? (
          <Link
            href={alamatKatalog(s, hal + 1)}
            className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-xs font-black text-zinc-900 shadow-md transition-all hover:-translate-y-0.5 hover:bg-amber-300"
          >
            Berikutnya
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#FFC837] text- text-zinc-900">
              →
            </span>
          </Link>
        ) : (
          <span className="flex cursor-not-allowed items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-black text-white/30">
            Berikutnya
            <span className="grid h-5 w-5 place-items-center rounded-full bg-white/10 text- text-white/40">
              →
            </span>
          </span>
        )}
      </div>

      {/* Label halaman - ANTI-WHITE JUGA */}
      <p className="text- font-black tracking-wider text-white/40">
        HALAMAN <span className="text-amber-300">{hal}</span> DARI{" "}
        <span className="text-amber-300">{jumlah}</span> • {jumlah} HALAMAN TOTAL
      </p>
    </div>
  );
}