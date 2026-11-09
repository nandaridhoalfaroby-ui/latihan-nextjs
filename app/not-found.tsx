import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto mt-6 max-w-xl rounded- bg-[#FFFBEB] border border-orange-100 p-12 text-center shadow-sm">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#FFFEF7] border border-orange-100 text-4xl shadow-sm">
        🎪
      </div>

      <h1 className="mt-6 text-6xl font-black tracking-tight text-zinc-900">
        404
      </h1>
      <p className="mt-2 text-sm font-bold text-zinc-600">
        Yah, halaman yang kamu cari tidak ada.
      </p>
      <p className="mt-1 text-xs font-medium text-zinc-500">
        Mungkin eventnya udah selesai atau linknya salah
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center rounded-full bg-[#FFC837] border-2 border-amber-300 px-7 py-3 text-sm font-black text-zinc-900 shadow-md hover:bg-[#FFD95E] hover:-translate-y-0.5 transition-all"
        >
          ← Kembali ke beranda
        </Link>
        <Link
          href="/event"
          className="inline-flex items-center rounded-full bg-[#FFFEF7] border border-orange-100 px-7 py-3 text-sm font-black text-zinc-900 hover:bg-white transition"
        >
          Lihat Event
        </Link>
      </div>

      <div className="mt-8 flex items-center justify-center gap-2 text- font-bold tracking-wider text-zinc-500">
        <span className="h-px w-6 bg-orange-200" />
        EVENTKU • 404
        <span className="h-px w-6 bg-orange-200" />
      </div>
    </div>
  );
}
