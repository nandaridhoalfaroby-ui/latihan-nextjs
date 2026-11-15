import Link from "next/link";

export default function KontakPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-5">
      {/* HERO BANNER */}
      <div className="relative overflow-hidden rounded- bg-gradient-to-br from-[#FFC837] via-[#FFB020] to-[#FF7A18] border-2 border-amber-300 p-8 md:p-10 shadow-[0_16px_40px_rgba(255,122,24,0.28)]">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/20" />
        <div className="absolute -left-8 -bottom-12 h-36 w-36 rounded-full bg-[#FFFEF7]/30" />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3.5 py-1.5 text- font-black tracking-widest text-[#FFC837]">💬 HUBUNGI KAMI</span>
          <h1 className="mt-4 text-3xl md:text-4xl font-black tracking-tight text-zinc-900 leading-tight">Ngobrol Yuk,<br />Kami Fast Respon! ⚡</h1>
          <p className="mt-2 max-w-lg text-sm md:text- font-bold leading-relaxed text-zinc-800/85">
            Ada pertanyaan soal tiket, event, atau mau ngadain event di sekolah? Hubungi kami aja, dibalas secepatnya.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#FFFEF7]/90 border border-amber-200 px-3 py-1.5 text- font-black text-zinc-800">⚡ Balas &lt; 1x24 jam</span>
            <span className="rounded-full bg-[#FFFEF7]/90 border border-amber-200 px-3 py-1.5 text- font-black text-zinc-800">📍 Ruang OSIS, Gedung A Lt. 2</span>
          </div>
        </div>
      </div>

      {/* KARTU KONTAK - WARNA WARNI */}
      <div className="grid gap-4 sm:grid-cols-2">
        <a href="mailto:eventku@mail.com" className="group rounded- bg-[#FFF7ED] border-2 border-orange-100 p-5 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(249,115,22,0.18)] transition-all">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-2xl shadow-[0_8px_18px_rgba(249,115,22,0.35)]">📧</div>
          <p className="mt-3 text-sm font-black text-zinc-900">Email</p>
          <p className="mt-1 text-sm font-black text-orange-600 group-hover:underline">eventku@mail.com</p>
          <p className="mt-1 text-xs font-medium text-zinc-500">Balas maks 1x24 jam</p>
          <p className="mt-3 inline-flex items-center gap-1 text- font-black text-zinc-700">Kirim Email <span>→</span></p>
        </a>

        <a href="https://wa.me/6281234567890" target="_blank" className="group rounded- bg-[#F0FDF4] border-2 border-emerald-100 p-5 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(16,185,129,0.18)] transition-all">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 text-2xl shadow-[0_8px_18px_rgba(16,185,129,0.35)]">💬</div>
          <p className="mt-3 text-sm font-black text-zinc-900">WhatsApp</p>
          <p className="mt-1 text-sm font-black text-emerald-600 group-hover:underline">+62 812-3456-7890</p>
          <p className="mt-1 text-xs font-medium text-zinc-500">Senin - Jumat, 08.00 - 16.00 WIB</p>
          <p className="mt-3 inline-flex items-center gap-1 text- font-black text-zinc-700">Chat Sekarang <span>→</span></p>
        </a>

        <div className="rounded- bg-[#F5F3FF] border-2 border-violet-100 p-5 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(139,92,246,0.15)] transition-all">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-400 to-indigo-500 text-2xl shadow-[0_8px_18px_rgba(139,92,246,0.35)]">📍</div>
          <p className="mt-3 text-sm font-black text-zinc-900">Lokasi</p>
          <p className="mt-1 text-sm font-bold text-zinc-700">Ruang OSIS, Gedung A Lantai 2</p>
          <p className="mt-1 text-xs font-medium text-zinc-500">Datang langsung pas jam istirahat</p>
        </div>

        <div className="rounded- bg-[#EFF6FF] border-2 border-sky-100 p-5 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(14,165,233,0.15)] transition-all">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 text-2xl shadow-[0_8px_18px_rgba(14,165,233,0.35)]">⏰</div>
          <p className="mt-3 text-sm font-black text-zinc-900">Jam Layanan</p>
          <p className="mt-1 text-sm font-bold text-zinc-700">Senin - Jumat • 08.00 - 16.00 WIB</p>
          <p className="mt-1 text-xs font-medium text-zinc-500">Sabtu - Minggu libur</p>
        </div>
      </div>

      {/* BANNER BAWAH HITAM */}
      <div className="rounded- bg-zinc-900 p-6 md:p-8 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white leading-tight">Mau Ngadain Event di Sekolah? 🎪</h2>
          <p className="mt-1 text-sm font-medium text-zinc-300">Ceritain ide event kamu, kami bantu daftarin ke EventKu.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="https://wa.me/6281234567890" target="_blank" className="inline-flex items-center gap-2 rounded-full bg-[#FFC837] px-6 py-3 text-sm font-black text-zinc-900 hover:bg-[#FFD95E] hover:-translate-y-0.5 transition">
            Chat WA →
          </a>
          <Link href="/event" className="inline-flex items-center rounded-full bg-white/10 border border-white/15 px-6 py-3 text-sm font-black text-white hover:bg-white/15 transition">
            Lihat Event
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="inline-flex rounded-full bg-[#FFFBEB] border-2 border-orange-100 px-6 py-3 text-sm font-black text-zinc-900 hover:bg-[#FFF7D6] transition">
          ← Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}