import Link from "next/link";

export default function KontakPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="rounded- bg-[#FFFBEB] border border-orange-100 p-8 md:p-10 shadow-sm">
        <span className="inline-flex rounded-full bg-[#FFFEF7] border border-orange-100 px-3.5 py-1.5 text- font-black tracking-wider text-zinc-700 shadow-sm">
          💬 HUBUNGI KAMI
        </span>

        <h1 className="mt-4 text-3xl font-black tracking-tight text-zinc-900">Kontak</h1>
        <p className="mt-2 text-sm font-medium leading-relaxed text-zinc-600">
          Ada pertanyaan soal tiket, event, atau mau ngadain event di sekolah? Hubungi kami aja, dibalas secepatnya.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <a href="mailto:eventku@mail.com" className="group rounded-2xl bg-[#FFFEF7] border border-orange-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <p className="text-2xl">📧</p>
            <p className="mt-2 text-sm font-black text-zinc-900">Email</p>
            <p className="mt-1 text-sm font-bold text-amber-700 group-hover:underline">eventku@mail.com</p>
            <p className="mt-1 text-xs font-medium text-zinc-500">Balas maks 1x24 jam</p>
          </a>

          <a href="https://wa.me/6281234567890" target="_blank" className="group rounded-2xl bg-[#FFFEF7] border border-orange-100 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <p className="text-2xl">💬</p>
            <p className="mt-2 text-sm font-black text-zinc-900">WhatsApp</p>
            <p className="mt-1 text-sm font-bold text-amber-700 group-hover:underline">+62 812-3456-7890</p>
            <p className="mt-1 text-xs font-medium text-zinc-500">Senin - Jumat, 08.00 - 16.00 WIB</p>
          </a>

          <div className="rounded-2xl bg-[#FFFEF7] border border-orange-100 p-5">
            <p className="text-2xl">📍</p>
            <p className="mt-2 text-sm font-black text-zinc-900">Lokasi</p>
            <p className="mt-1 text-sm font-medium text-zinc-600">Ruang OSIS, Gedung A Lantai 2</p>
            <p className="mt-1 text-xs font-medium text-zinc-500">Datang langsung pas jam istirahat</p>
          </div>

          <div className="rounded-2xl bg-[#FFFEF7] border border-orange-100 p-5">
            <p className="text-2xl">⏰</p>
            <p className="mt-2 text-sm font-black text-zinc-900">Jam Layanan</p>
            <p className="mt-1 text-sm font-medium text-zinc-600">Senin - Jumat • 08.00 - 16.00 WIB</p>
            <p className="mt-1 text-xs font-medium text-zinc-500">Sabtu - Minggu libur</p>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/event" className="inline-flex rounded-full bg-[#FFC837] border-2 border-amber-300 px-6 py-3 text-sm font-black text-zinc-900 shadow-md hover:bg-[#FFD95E] hover:-translate-y-0.5 transition-all">
            Lihat Event →
          </Link>
          <Link href="/" className="inline-flex rounded-full bg-[#FFFEF7] border border-orange-100 px-6 py-3 text-sm font-black text-zinc-900 hover:bg-white transition">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}