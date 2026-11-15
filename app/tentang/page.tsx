import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Tentang" };

const fitur = [
  {
    icon: "🎟️",
    judul: "Pesan Tiket",
    deskripsi: "Pilih event, cek sisa tiket, langsung pesan tanpa ribet.",
    warna: "bg-gradient-to-br from-amber-400 to-orange-500 shadow-[0_8px_20px_rgba(249,115,22,0.35)]",
    kotak: "bg-[#FFF7D6] border-orange-100",
  },
  {
    icon: "❤️",
    judul: "Simpan Favorit",
    deskripsi: "Suka eventnya? Simpan dulu, pesan nanti kalau udah yakin.",
    warna: "bg-gradient-to-br from-pink-400 to-rose-500 shadow-[0_8px_20px_rgba(236,72,153,0.35)]",
    kotak: "bg-[#FDF2F8] border-pink-100",
  },
  {
    icon: "📦",
    judul: "Kelola Pesanan",
    deskripsi: "Semua pesananmu tersimpan rapi di halaman Pesanan.",
    warna: "bg-gradient-to-br from-violet-400 to-indigo-500 shadow-[0_8px_20px_rgba(139,92,246,0.35)]",
    kotak: "bg-[#F5F3FF] border-violet-100",
  },
];

const langkah = [
  { angka: "1", judul: "Jelajahi Event", deskripsi: "Cari event di halaman Event, filter sesuai minat kamu." },
  { angka: "2", judul: "Pesan Tiket", deskripsi: "Isi nama & jumlah tiket, lalu konfirmasi pesananmu." },
  { angka: "3", judul: "Datang & Nikmati", deskripsi: "Tunjukkan pesananmu di lokasi, nikmati acaranya!" },
];

export default function Tentang() {
  return (
    <div className="space-y-6">
      {/* HERO */}
      <div className="relative overflow-hidden rounded- bg-gradient-to-br from-[#FFC837] via-[#FFB020] to-[#FF7A18] border-2 border-amber-300 p-8 md:p-12 text-center shadow-[0_16px_40px_rgba(255,122,24,0.28)]">
        {/* dekorasi */}
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/20" />
        <div className="absolute -right-8 -bottom-12 h-48 w-48 rounded-full bg-[#FFFEF7]/30" />
        <div className="absolute right-16 top-8 hidden md:block rounded-full bg-zinc-900 px-3 py-1.5 text- font-black text-[#FFC837] rotate-6 shadow-lg">✨ EVENT SEKOLAH ✨</div>

        <div className="relative">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded- bg-[#FFFEF7] border-2 border-amber-200 text-4xl shadow-xl -rotate-3">🎪</div>
          <span className="mt-5 inline-flex rounded-full bg-zinc-900 px-4 py-1.5 text- font-black tracking-widest text-[#FFC837]">TENTANG EVENTKU</span>
          <h1 className="mt-3 text-3xl md:text-4xl font-black tracking-tight text-zinc-900 leading-tight">
            Semua Event Sekolah,<br className="hidden md:block" /> Dalam Satu Tempat.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm md:text- font-bold leading-relaxed text-zinc-800/85">
            EventKu adalah katalog event sekolah. Pesan tiket, simpan favorit, dan kelola pesananmu di sini — tanpa ribet, tanpa antre.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/event" className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-black text-[#FFC837] shadow-lg hover:-translate-y-0.5 transition">Jelajahi Event →</Link>
            <Link href="/favorit" className="rounded-full bg-[#FFFEF7] border-2 border-amber-200 px-6 py-3 text-sm font-black text-zinc-900 hover:-translate-y-0.5 transition">❤️ Lihat Favorit</Link>
          </div>
        </div>
      </div>

      {/* STATISTIK */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {[
          { angka: "20+", label: "Event Seru", emoji: "🎪" },
          { angka: "6", label: "Kategori", emoji: "✨" },
          { angka: "100%", label: "Gratis Jelajah", emoji: "🎉" },
        ].map((s) => (
          <div key={s.label} className="rounded- bg-[#FFFEF7] border-2 border-orange-100 p-4 md:p-6 text-center shadow-sm hover:-translate-y-1 hover:shadow-md transition">
            <p className="text-xl md:text-3xl">{s.emoji}</p>
            <p className="mt-1 text-xl md:text-3xl font-black text-zinc-900">{s.angka}</p>
            <p className="text- md:text-xs font-black text-zinc-500 tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>

      {/* FITUR */}
      <div>
        <h2 className="text-xl md:text-2xl font-black text-zinc-900">Kenapa Pakai EventKu? 🤔</h2>
        <p className="mt-1 text-sm font-medium text-zinc-600">Semua yang kamu butuhin buat ikut event sekolah, udah ada di sini.</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {fitur.map((f) => (
            <div key={f.judul} className={`rounded- border-2 p-6 hover:-translate-y-1 hover:shadow-lg transition ${f.kotak}`}>
              <div className={`grid h-12 w-12 place-items-center rounded-2xl text-2xl text-white ${f.warna}`}>{f.icon}</div>
              <h3 className="mt-4 text- font-black text-zinc-900">{f.judul}</h3>
              <p className="mt-1.5 text-sm font-medium leading-relaxed text-zinc-600">{f.deskripsi}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CARA PAKAI */}
      <div className="rounded- bg-zinc-900 p-6 md:p-8 shadow-xl">
        <span className="inline-flex rounded-full bg-[#FFC837] px-3 py-1.5 text- font-black text-zinc-900">CARA PAKAI</span>
        <h2 className="mt-3 text-xl md:text-2xl font-black text-white">Gampang Banget, 3 Langkah Doang 👇</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {langkah.map((l) => (
            <div key={l.angka} className="rounded-2xl bg-white/10 border border-white/10 p-5 backdrop-blur">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#FFC837] text- font-black text-zinc-900 shadow-md">{l.angka}</span>
              <h3 className="mt-3 font-black text-white">{l.judul}</h3>
              <p className="mt-1 text-sm font-medium leading-relaxed text-zinc-300">{l.deskripsi}</p>
            </div>
          ))}
        </div>
        <Link href="/event" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#FFC837] px-6 py-3 text-sm font-black text-zinc-900 hover:bg-[#FFD95E] transition">
          Mulai Jelajah Sekarang
          <span className="grid h-5 w-5 place-items-center rounded-full bg-zinc-900 text- text-[#FFC837]">→</span>
        </Link>
      </div>

      {/* FOOTER CREDIT */}
      <p className="text-center text-xs font-bold text-zinc-500">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#FFFBEB] border-2 border-orange-100 px-4 py-2">🎪 EventKu · dibuat oleh kelas XII RPL 1</span>
      </p>
    </div>
  );
}