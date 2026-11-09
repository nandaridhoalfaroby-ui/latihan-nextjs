export default function Tentang() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative overflow-hidden rounded- bg-[#FFFBEB] border border-orange-100 p-8 md:p-10 shadow-sm">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#FFC837]/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-200/40 blur-3xl" />

        <div className="relative">
          <span className="inline-flex rounded-full bg-[#FFFEF7] border border-orange-100 px-3.5 py-1.5 text- font-black tracking-wider text-zinc-700 shadow-sm">
            🎪 TENTANG EVENTKU
          </span>

          <h1 className="mt-4 text-3xl md:text-4xl font-black tracking-tight leading-tight text-zinc-900">
            Tentang EventKu
          </h1>

          <p className="mt-3 text-sm md:text-base font-medium leading-relaxed text-zinc-600">
            EventKu dibuat oleh siswa RPL untuk memudahkan pemesanan tiket event sekolah.
            Gak perlu lagi antri, catat manual, atau takut kehabisan tiket. Semua bisa dicek
            langsung dari HP.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-[#FFFEF7] border border-orange-100 p-4">
              <p className="text-2xl">🎟️</p>
              <p className="mt-2 text-sm font-black text-zinc-900">Pesan Cepat</p>
              <p className="mt-1 text-xs font-medium leading-relaxed text-zinc-600">Pilih event, isi nama, langsung dapat tiket.</p>
            </div>
            <div className="rounded-2xl bg-[#FFFEF7] border border-orange-100 p-4">
              <p className="text-2xl">📅</p>
              <p className="mt-2 text-sm font-black text-zinc-900">Selalu Update</p>
              <p className="mt-1 text-xs font-medium leading-relaxed text-zinc-600">Stok tiket & jadwal update real-time.</p>
            </div>
            <div className="rounded-2xl bg-[#FFFEF7] border border-orange-100 p-4">
              <p className="text-2xl">♡</p>
              <p className="mt-2 text-sm font-black text-zinc-900">Favorit</p>
              <p className="mt-1 text-xs font-medium leading-relaxed text-zinc-600">Simpan event yang lo suka buat nanti.</p>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3 rounded-2xl bg-[#FFFEF7] border border-orange-100 p-4">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#FFC837] border-2 border-amber-300 text-sm font-black text-zinc-900">R</span>
            <div>
              <p className="text-sm font-black text-zinc-900">Dibuat oleh kelas XII RPL 1</p>
              <p className="text-xs font-medium text-zinc-500">Untuk sekolah, oleh siswa sekolah</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}