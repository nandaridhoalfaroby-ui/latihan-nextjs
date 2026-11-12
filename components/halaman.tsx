import Link from "next/link";
import { alamatKatalog, type Saringan } from "@/data/saring";

export default function Halaman({ s, hal, jumlah }: { s: Saringan; hal: number; jumlah: number }) {
  if (jumlah <= 1) return null;

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
      {hal > 1 && (
        <Link href={alamatKatalog(s, hal - 1)} className="rounded-full bg-[#FFFEF7] border border-orange-100 px-4 py-2 text-sm font-black text-zinc-900 hover:bg-white transition">
          « Sebelumnya
        </Link>
      )}

      {Array.from({ length: jumlah }, (_, i) => i + 1).map((nomor) => (
        <Link
          key={nomor}
          href={alamatKatalog(s, nomor)}
          className={
            nomor === hal
              ? "rounded-full bg-[#FFC837] border-2 border-amber-300 px-4 py-2 text-sm font-black text-zinc-900 shadow-sm"
              : "rounded-full bg-[#FFFEF7] border border-orange-100 px-4 py-2 text-sm font-bold text-zinc-600 hover:bg-white hover:text-zinc-900 transition"
          }
        >
          {nomor}
        </Link>
      ))}

      {hal < jumlah && (
        <Link href={alamatKatalog(s, hal + 1)} className="rounded-full bg-[#FFC837] border-2 border-amber-300 px-4 py-2 text-sm font-black text-zinc-900 hover:bg-[#FFD95E] transition">
          Berikutnya »
        </Link>
      )}
    </div>
  );
}