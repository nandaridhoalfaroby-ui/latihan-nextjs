"use client";
export default function GalatEvent({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pesan = error instanceof Error ? error.message : "Terjadi kesalahan.";
  return (
    <div className="mx-auto max-w-xl rounded- bg-[#FFFBEB] border border-red-200 p-8 md:p-10 text-center shadow-sm">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#FFE4E6] border border-red-200 text-3xl">
        ⚠️
      </div>

      <h2 className="mt-4 text-xl font-black tracking-tight text-zinc-900">
        Data event gagal dimuat
      </h2>
      <p className="mt-2 text-sm font-medium leading-relaxed text-zinc-600">
        {pesan}
      </p>

      {error.digest && (
        <p className="mt-3 inline-flex rounded-full bg-[#FFFEF7] border border-orange-100 px-3 py-1 text- font-mono font-bold text-zinc-500">
          ID: {error.digest}
        </p>
      )}

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => reset()}
          className="rounded-full bg-[#FFC837] border-2 border-amber-300 px-6 py-3 text-sm font-black text-zinc-900 shadow-md hover:bg-[#FFD95E] hover:-translate-y-0.5 transition-all"
        >
          Coba lagi →
        </button>
        <button
          onClick={() => (window.location.href = "/event")}
          className="rounded-full bg-[#FFFEF7] border border-orange-100 px-6 py-3 text-sm font-black text-zinc-900 hover:bg-white transition"
        >
          Kembali ke Katalog
        </button>
      </div>
    </div>
  );
}
