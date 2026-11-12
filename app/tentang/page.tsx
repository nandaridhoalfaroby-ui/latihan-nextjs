import type { Metadata } from "next";

export const metadata: Metadata = { title: "Tentang" };

export default function Tentang() {
  return (
    <div className="rounded- bg-[#FFFBEB] border border-orange-100 p-8 md:p-10 shadow-sm">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#FFC837] border border-amber-300 text-3xl">🎪</div>
      <h1 className="mt-4 text-center text-2xl md:text-3xl font-black tracking-tight text-zinc-900">Tentang EventKu</h1>
      <p className="mx-auto mt-3 max-w-xl text-center text-sm font-medium leading-relaxed text-zinc-600">
        EventKu adalah katalog event sekolah. Pesan tiket, simpan favorit, dan kelola pesananmu di sini.
      </p>
      <p className="mt-6 text-center text-xs font-bold text-zinc-500">EventKu · dibuat oleh kelas XII RPL 1</p>
    </div>
  );
}