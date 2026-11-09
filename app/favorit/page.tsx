import Link from "next/link";
import DaftarFavorit from "@/components/DaftarFavorit";

export default function Favorit() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded- bg-[#FFFBEB] border border-orange-100 p-6 md:p-8 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-flex rounded-full bg-[#FFFEF7] border border-orange-100 px-3.5 py-1.5 text- font-black tracking-wider text-zinc-700 shadow-sm">
              ♡ FAVORITKU
            </span>
            <h1 className="mt-3 text-2xl md:text-3xl font-black tracking-tight text-zinc-900">
              Event Favorit
            </h1>
            <p className="mt-1 text-sm font-medium text-zinc-600">
              Semua event yang lo tandai ♥ bakal tersimpan di sini
            </p>
          </div>
          <Link href="/event" className="shrink-0 rounded-full bg-[#FFC837] border-2 border-amber-300 px-5 py-2.5 text-xs font-black text-zinc-900 shadow-sm hover:bg-[#FFD95E] transition">
            Cari Event →
          </Link>
        </div>

        <div className="mt-6">
          <DaftarFavorit />
        </div>
      </div>
    </div>
  );
}