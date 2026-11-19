export default function MemuatDetail() {
  return (
    <div className="w-full bg-[#120826] text-white" style={{ colorScheme: "dark" }}>
      <div className="mx-auto max-w-5xl space-y-4 px-4 py-6 sm:px-6">
        {/* LABEL LOADING - GELAP + GLOW KUNING */}
        <div className="flex items-center gap-2">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-amber-400/30 border-t-amber-400" />
          {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
          <span className="rounded-full bg-[#2A1B52] px-3 py-1.5 text- font-black tracking-widest text-amber-300 ring-1 ring-white/15">MEMUAT DETAIL EVENT...</span>
        </div>

        <div className="grid items-start gap-6 md:grid-cols-[1.1fr_0.9fr]">
          {/* ========== KIRI - SKELETON INFO - GELAP ========== */}
          {/* SEBELUM: rounded- doang (kepotong) -> SESUDAH: rounded- */}
          <div className="overflow-hidden rounded- border border-white/10 bg-[#1E103A]/90 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur">
            {/* Gambar skeleton - shimmer UNGU-PINK-ORANYE, bukan kuning pucat */}
            {/* SEBELUM: h- doang + sm:h- doang (kepotong) + bg-gradient-to-r + bg-[length:200%_100%] -> SESUDAH: h-64 + sm:h-80 + bg-linear-to-r + bg-size-[200%_100%] */}
            <div className="relative h-64 overflow-hidden bg-linear-to-r from-violet-600/40 via-pink-500/40 to-orange-500/40 bg-size-[200%_100%] animate-[shimmer_1.6s_linear_infinite] sm:h-80">
              <div className="absolute left-4 top-4 flex gap-2">
                <div className="h-7 w-24 rounded-full bg-white/20 backdrop-blur" />
                <div className="h-7 w-20 rounded-full bg-white/20 backdrop-blur" />
              </div>
              {/* SEBELUM: rounded- doang (kepotong) -> SESUDAH: rounded- */}
              <div className="absolute bottom-4 left-4 h-10 w-36 rounded- bg-white/20 backdrop-blur" />
              {/* SEBELUM: text- doang (kepotong) -> SESUDAH: text- */}
              <div className="absolute inset-0 flex items-center justify-center text-">🎪</div>
            </div>

            <div className="p-6 md:p-8">
              {/* judul - shimmer gelap */}
              {/* SEBELUM: bg-gradient-to-r + bg-[length:200%_100%] -> SESUDAH: bg-linear-to-r + bg-size-[200%_100%] */}
              <div className="h-8 w-3/4 rounded-full bg-linear-to-r from-white/10 via-white/20 to-white/10 bg-size-[200%_100%] animate-[shimmer_1.6s_linear_infinite]" />
              <div className="mt-2.5 h-8 w-1/2 rounded-full bg-linear-to-r from-white/10 via-white/20 to-white/10 bg-size-[200%_100%] animate-[shimmer_1.6s_linear_infinite]" />

              {/* tanggal + lokasi */}
              <div className="mt-4 flex gap-2">
                <div className="h-6 w-32 rounded-full bg-white/10" />
                <div className="h-6 w-28 rounded-full bg-white/10" />
              </div>

              {/* deskripsi */}
              <div className="mt-5 space-y-2.5">
                <div className="h-4 w-full rounded-full bg-white/10" />
                <div className="h-4 w-full rounded-full bg-white/10" />
                <div className="h-4 w-2/3 rounded-full bg-white/10" />
              </div>

              {/* harga + progress - GELAP + BORDER BERWARNA */}
              {/* SEBELUM: rounded- doang (kepotong) + bg-white/[0.05] -> SESUDAH: rounded- + bg-white/5 */}
              <div className="mt-7 rounded- border border-amber-400/20 bg-white/5 p-4">
                <div className="h-6 w-32 rounded-full bg-amber-400/30" />
                <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                  {/* SEBELUM: bg-gradient-to-r -> SESUDAH: bg-linear-to-r */}
                  <div className="h-full w-2/3 rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500" />
                </div>
                <div className="mt-2 h-4 w-40 rounded-full bg-white/10" />
              </div>

              {/* tombol favorit + detail */}
              <div className="mt-5 flex gap-3">
                {/* SEBELUM: bg-gradient-to-r + bg-[length:200%_100%] -> SESUDAH: bg-linear-to-r + bg-size-[200%_100%] */}
                <div className="h-11 w-40 rounded-full bg-linear-to-r from-pink-500/40 via-rose-500/40 to-pink-500/40 bg-size-[200%_100%] animate-[shimmer_1.6s_linear_infinite]" />
                <div className="h-11 flex-1 rounded-full bg-white/10" />
              </div>

              {/* Event terkait */}
              <div className="mt-8 h-5 w-36 rounded-full bg-white/10" />
              <div className="mt-3 space-y-3">
                {/* SEBELUM: bg-white/[0.05] -> SESUDAH: bg-white/5 */}
                <div className="h-16 w-full rounded-2xl border border-white/10 bg-white/5" />
                <div className="h-16 w-full rounded-2xl border border-white/10 bg-white/5" />
              </div>
            </div>
          </div>

          {/* ========== KANAN - SKELETON FORM - GELAP + STICKY RAPI ========== */}
          {/* SEBELUM: rounded- doang (kepotong) -> SESUDAH: rounded- */}
          <div className="sticky top-24 rounded- border border-white/10 bg-[#1E103A]/90 p-6 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur">
            {/* SEBELUM: bg-gradient-to-r -> SESUDAH: bg-linear-to-r */}
            <div className="h-6 w-36 rounded-full bg-linear-to-r from-amber-400/40 to-pink-500/40" />
            <div className="mt-2 h-4 w-48 rounded-full bg-white/10" />
            <div className="mt-5 space-y-3">
              <div className="h-12 w-full rounded-xl border border-white/10 bg-[#2A1B52]" />
              <div className="h-12 w-full rounded-xl border border-white/10 bg-[#2A1B52]" />
              <div className="h-12 w-full rounded-xl border border-white/10 bg-[#2A1B52]" />
            </div>
            <div className="mt-4 h-16 w-full rounded-2xl border border-white/10 bg-[#2A1B52]" />
            {/* SEBELUM: bg-gradient-to-r + bg-[length:200%_100%] -> SESUDAH: bg-linear-to-r + bg-size-[200%_100%] */}
            <div className="mt-4 h-12 w-full rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 bg-size-[200%_100%] animate-[shimmer_1.6s_linear_infinite] shadow-lg shadow-pink-500/30" />
            <div className="mx-auto mt-3 h-4 w-32 rounded-full bg-white/10" />
          </div>
        </div>

        <style>{`
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
      </div>
    </div>
  );
}