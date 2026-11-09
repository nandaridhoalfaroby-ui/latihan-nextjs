export default function MemuatDetail() {
  return (
    <div className="mx-auto max-w-5xl grid md:grid-cols-[1.1fr_0.9fr] gap-6">
      {/* KIRI - SKELETON INFO */}
      <div className="rounded- bg-[#FFFBEB] border border-orange-100 p-8 md:p-10 shadow-sm">
        {/* kotak kecil untuk kategori */}
        <div className="flex gap-2">
          <div className="h-6 w-24 animate-pulse rounded-full bg-[#FFFEF7] border border-orange-100" />
          <div className="h-6 w-28 animate-pulse rounded-full bg-[#FFC837]/40 border border-amber-200" />
        </div>

        {/* kotak lebar untuk judul */}
        <div className="mt-5 h-9 w-3/4 animate-pulse rounded-full bg-[#FFFEF7] border border-orange-100" />
        <div className="mt-2 h-9 w-1/2 animate-pulse rounded-full bg-[#FFFEF7] border border-orange-100" />

        {/* satu baris untuk tanggal */}
        <div className="mt-4 h-4 w-48 animate-pulse rounded-full bg-[#FFFEF7]" />

        {/* deskripsi */}
        <div className="mt-4 space-y-2">
          <div className="h-4 w-full animate-pulse rounded-full bg-[#FFFEF7]" />
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-[#FFFEF7]" />
        </div>

        {/* harga */}
        <div className="mt-8 h-10 w-40 animate-pulse rounded-full bg-[#FFFEF7] border border-orange-100" />

        {/* sisa tiket */}
        <div className="mt-6 h-2.5 w-full animate-pulse rounded-full bg-[#FFFEF7] border border-orange-100" />
        <div className="mt-2 h-4 w-40 animate-pulse rounded-full bg-[#FFFEF7]" />

        {/* tombol favorit */}
        <div className="mt-6 h-11 w-40 animate-pulse rounded-full bg-[#FFE4E6]/60 border border-red-100" />

        {/* judul Event terkait */}
        <div className="mt-8 h-5 w-32 animate-pulse rounded-full bg-[#FFFEF7]" />
        <div className="mt-3 space-y-2">
          <div className="h-14 w-full animate-pulse rounded-2xl bg-[#FFFEF7] border border-orange-100" />
          <div className="h-14 w-full animate-pulse rounded-2xl bg-[#FFFEF7] border border-orange-100" />
        </div>
      </div>

      {/* KANAN - SKELETON FORM */}
      <div className="rounded- bg-[#FFFBEB] border border-orange-100 p-6 shadow-sm">
        <div className="h-6 w-32 animate-pulse rounded-full bg-[#FFFEF7] border border-orange-100" />
        <div className="mt-4 space-y-3">
          <div className="h-12 w-full animate-pulse rounded-xl bg-[#FFFEF7] border border-orange-100" />
          <div className="h-12 w-full animate-pulse rounded-xl bg-[#FFFEF7] border border-orange-100" />
          <div className="h-12 w-full animate-pulse rounded-xl bg-[#FFFEF7] border border-orange-100" />
        </div>
        <div className="mt-4 h-14 w-full animate-pulse rounded-2xl bg-[#FFFEF7] border border-orange-100" />
        <div className="mt-4 h-12 w-full animate-pulse rounded-full bg-[#FFC837]/40" />
      </div>
    </div>
  );
}