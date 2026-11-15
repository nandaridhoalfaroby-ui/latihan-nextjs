import Link from "next/link";
import { alamatKatalog, type Saringan } from "@/data/saring";

export default function Halaman({ s, hal, jumlah }: { s: Saringan; hal: number; jumlah: number }) {
  if (jumlah <= 1) return null;

  return (
    <div className="mt-8 flex flex-col items-center gap-3">
      {/* KAPSUL PAGINATION MELAYANG */}
      <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FFFEF7] border-2 border-orange-100 p-1.5 shadow-[0_8px_24px_rgba(251,146,60,0.15)]">
        {/* Sebelumnya */}
        {hal > 1 ? (
          <Link
            href={alamatKatalog(s, hal - 1)}
            className="flex items-center gap-1.5 rounded-full bg-[#FFF7D6] border border-orange-100 px-4 py-2.5 text-xs font-black text-zinc-800 hover:bg-[#FFFBEB] hover:-translate-y-0.5 transition-all"
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-zinc-900 text- text-[#FFC837]">←</span>
            Sebelumnya
          </Link>
        ) : (
          <span className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-black text-zinc-300 cursor-not-allowed">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-zinc-100 text- text-zinc-400">←</span>
            Sebelumnya
          </span>
        )}

        {/* Garis pemisah */}
        <span className="hidden sm:block h-6 w-px bg-orange-100" />

        {/* Angka halaman */}
        <div className="flex items-center gap-1">
          {Array.from({ length: jumlah }, (_, i) => i + 1).map((nomor) => (
            <Link
              key={nomor}
              href={alamatKatalog(s, nomor)}
              className={
                nomor === hal
                  ? "grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#FFC837] to-[#FFB020] border-2 border-amber-300 text-sm font-black text-zinc-900 shadow-[0_4px_14px_rgba(255,180,0,0.45)] scale-105"
                  : "grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-zinc-500 hover:bg-[#FFF7D6] hover:text-zinc-900 hover:scale-105 transition-all"
              }
            >
              {nomor}
            </Link>
          ))}
        </div>

        <span className="hidden sm:block h-6 w-px bg-orange-100" />

        {/* Berikutnya */}
        {hal < jumlah ? (
          <Link
            href={alamatKatalog(s, hal + 1)}
            className="flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2.5 text-xs font-black text-[#FFC837] shadow-md hover:bg-zinc-800 hover:-translate-y-0.5 transition-all"
          >
            Berikutnya
            <span className="grid h-5 w-5 place-items-center rounded-full bg-[#FFC837] text- text-zinc-900">→</span>
          </Link>
        ) : (
          <span className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-black text-zinc-300 cursor-not-allowed">
            Berikutnya
            <span className="grid h-5 w-5 place-items-center rounded-full bg-zinc-100 text- text-zinc-400">→</span>
          </span>
        )}
      </div>

      {/* Label halaman */}
      <p className="text- font-black tracking-wider text-zinc-400">
        HALAMAN <span className="text-zinc-900">{hal}</span> DARI <span className="text-zinc-900">{jumlah}</span> • {jumlah} HALAMAN TOTAL
      </p>
    </div>
  );
}