export default function MemuatDetail() {
  return (
    <div className="mx-auto max-w-5xl space-y-4">
      {/* LABEL LOADING */}
      <div className="flex items-center gap-2">
        <span className="h-5 w-5 animate-spin rounded-full border- border-[#FFC837] border-t-transparent" />
        <span className="rounded-full bg-zinc-900 px-3 py-1.5 text- font-black tracking-widest text-[#FFC837]">MEMUAT DETAIL EVENT...</span>
      </div>

      <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-6 items-start">
        {/* KIRI - SKELETON INFO */}
        <div className="overflow-hidden rounded- bg-[#FFFEF7] border-2 border-orange-100 shadow-sm">
          {/* Gambar skeleton - gradient shimmer */}
          <div className="relative h- overflow-hidden bg-gradient-to-r from-[#FFF7D6] via-[#FFD95E] to-[#FFF7D6] bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]">
            <div className="absolute left-4 top-4 flex gap-2">
              <div className="h-7 w-24 rounded-full bg-[#FFFEF7]/80" />
              <div className="h-7 w-20 rounded-full bg-[#FFC837]/80" />
            </div>
            <div className="absolute bottom-4 left-4 h-10 w-36 rounded-2xl bg-[#FFFEF7]/90" />
          </div>

          <div className="p-6 md:p-8">
            {/* judul */}
            <div className="h-8 w-3/4 rounded-full bg-gradient-to-r from-[#FFF7D6] via-[#FFD95E] to-[#FFF7D6] bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]" />
            <div className="mt-2.5 h-8 w-1/2 rounded-full bg-gradient-to-r from-[#FFF7D6] via-[#FFD95E] to-[#FFF7D6] bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]" />

            {/* tanggal + lokasi */}
            <div className="mt-4 flex gap-2">
              <div className="h-6 w-32 rounded-full bg-[#FFF7D6]" />
              <div className="h-6 w-28 rounded-full bg-[#FFF7D6]" />
            </div>

            {/* deskripsi */}
            <div className="mt-5 space-y-2.5">
              <div className="h-4 w-full rounded-full bg-[#FFF7D6]" />
              <div className="h-4 w-full rounded-full bg-[#FFF7D6]" />
              <div className="h-4 w-2/3 rounded-full bg-[#FFF7D6]" />
            </div>

            {/* harga + progress */}
            <div className="mt-7 rounded-2xl bg-[#FFFBEB] border-2 border-orange-100 p-4">
              <div className="h-6 w-32 rounded-full bg-[#FFD95E]/70" />
              <div className="mt-3 h-2.5 w-full rounded-full bg-[#FFF7D6] overflow-hidden">
                <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-[#FFC837] to-[#FF7A18]" />
              </div>
              <div className="mt-2 h-4 w-40 rounded-full bg-[#FFF7D6]" />
            </div>

            {/* tombol favorit + detail */}
            <div className="mt-5 flex gap-3">
              <div className="h-11 w-40 rounded-full bg-gradient-to-r from-pink-200 via-rose-200 to-pink-200 bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite]" />
              <div className="h-11 flex-1 rounded-full bg-[#FFF7D6]" />
            </div>

            {/* Event terkait */}
            <div className="mt-8 h-5 w-36 rounded-full bg-[#FFF7D6]" />
            <div className="mt-3 space-y-3">
              <div className="h-16 w-full rounded-2xl bg-[#FFFBEB] border-2 border-orange-100" />
              <div className="h-16 w-full rounded-2xl bg-[#FFFBEB] border-2 border-orange-100" />
            </div>
          </div>
        </div>

        {/* KANAN - SKELETON FORM */}
        <div className="rounded- bg-[#FFFBEB] border-2 border-orange-100 p-6 shadow-sm sticky top-24">
          <div className="h-6 w-36 rounded-full bg-[#FFD95E]/70" />
          <div className="mt-1 h-4 w-48 rounded-full bg-[#FFF7D6]" />
          <div className="mt-5 space-y-3">
            <div className="h-12 w-full rounded-xl bg-[#FFFEF7] border-2 border-orange-100" />
            <div className="h-12 w-full rounded-xl bg-[#FFFEF7] border-2 border-orange-100" />
            <div className="h-12 w-full rounded-xl bg-[#FFFEF7] border-2 border-orange-100" />
          </div>
          <div className="mt-4 h-16 w-full rounded-2xl bg-[#FFFEF7] border-2 border-orange-100" />
          <div className="mt-4 h-12 w-full rounded-full bg-gradient-to-r from-[#FFC837] via-[#FFD95E] to-[#FFC837] bg-[length:200%_100%] animate-[shimmer_1.6s_linear_infinite] shadow-md" />
          <div className="mt-3 h-4 w-32 mx-auto rounded-full bg-[#FFF7D6]" />
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}