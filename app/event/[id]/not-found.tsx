import Link from "next/link";

export default function EventTidakAda() {
  return (
    <div className="mx-auto mt-6 max-w-xl rounded- bg-[#FFFBEB] border border-orange-100 p-12 text-center shadow-sm">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#FFFEF7] border border-orange-100 text-4xl shadow-sm">
        🎪
      </div>

      <h1 className="mt-6 text-2xl md:text-3xl font-black tracking-tight text-zinc-900">
        Event tidak ditemukan
      </h1>
      <p className="mt-2 text-sm font-medium leading-relaxed text-zinc-600">
        Mungkin event ini sudah dihapus atau alamatnya salah.
        <br />Coba cek katalog lagi ya.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link 
          href="/event" 
          className="inline-flex items-center rounded-full bg-[#FFC837] border-2 border-amber-300 px-7 py-3 text-sm font-black text-zinc-900 shadow-md hover:bg-[#FFD95E] hover:-translate-y-0.5 transition-all"
        >
          ← Kembali ke katalog
        </Link>
        <Link 
          href="/" 
          className="inline-flex items-center rounded-full bg-[#FFFEF7] border border-orange-100 px-7 py-3 text-sm font-black text-zinc-900 hover:bg-white transition"
        >
          Beranda
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