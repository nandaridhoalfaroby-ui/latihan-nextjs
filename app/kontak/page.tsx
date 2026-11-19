import Link from "next/link";

export default function KontakPage() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-5">
      {/* HERO - DARK + GLOW */}
      <div className="relative overflow-hidden rounded- border border-white/10 bg-[#1E103A]/90 p-6 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur md:p-10">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-amber-500/30 blur-" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-44 w-44 rounded-full bg-pink-500/30 blur-" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-24 w-72 rounded-full bg-violet-500/20 blur-" />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text- font-black tracking-[0.16em] text-white backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            💬 HUBUNGI KAMI • ONLINE
          </span>

          <h1 className="mt-5 text- font-black leading-[0.95] tracking-tight text-white md:text-">
            Ngobrol Yuk,
            <br />
            {/* SEBELUM: bg-gradient-to-r -> SESUDAH: bg-linear-to-r */}
            <span className="bg-linear-to-r from-amber-300 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              Kami Fast Respon!
            </span>{" "}
            ⚡
          </h1>

          <p className="mt-3 max-w-xl text- font-medium leading-relaxed text-white/65 md:text-">
            Ada pertanyaan soal tiket, event, atau mau ngadain event di sekolah? Hubungi kami aja, dibalas secepatnya.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {/* SEBELUM: bg-white/[0.08] -> SESUDAH: bg-white/8 */}
            <span className="rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5 text- font-black text-white">
              ⚡ Balas &lt; 1x24 jam
            </span>
            <span className="rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5 text- font-black text-white">
              📍 Ruang OSIS, Gedung A Lt. 2
            </span>
            {/* SEBELUM: bg-white + text-zinc-900 (putih) -> SESUDAH: dark glass */}
            <span className="rounded-full bg-white/10 px-3.5 py-1.5 text- font-black text-white ring-1 ring-white/20 backdrop-blur">
              ⭐ 4.9/5 Pelayanan
            </span>
          </div>
        </div>
      </div>

      {/* KARTU KONTAK - DARK GLASS BERWARNA */}
      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href="mailto:eventku@mail.com"
          // SEBELUM: bg-gradient-to-br + from-orange-500/[0.12] + to-amber-500/[0.05] -> SESUDAH: bg-linear-to-br + from-orange-500/12 + to-amber-500/5
          className="group rounded-2xl border border-orange-400/25 bg-linear-to-br from-orange-500/12 to-amber-500/5 p-5 backdrop-blur transition hover:-translate-y-1.5 hover:border-orange-400/50 hover:shadow-[0_25px_50px_-15px_rgba(249,115,22,0.5)]"
        >
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-linear-to-br from-amber-400 to-orange-500 text- shadow-lg shadow-orange-500/40 transition group-hover:rotate-[-8deg] group-hover:scale-110">
            📧
          </div>
          <p className="mt-3 text- font-black tracking-wide text-white/50">EMAIL</p>
          <p className="mt-1 text- font-black text-orange-300 group-hover:underline">eventku@mail.com</p>
          <p className="mt-1 text- font-medium text-white/60">Balas maks 1x24 jam • Setiap hari</p>
          <p className="mt-4 inline-flex items-center gap-1 text- font-black text-white">
            Kirim Email <span className="transition group-hover:translate-x-1">→</span>
          </p>
        </a>

        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          // SEBELUM: bg-gradient-to-br + from-emerald-500/[0.12] + to-teal-500/[0.05] -> SESUDAH: bg-linear-to-br + from-emerald-500/12 + to-teal-500/5
          className="group rounded-2xl border border-emerald-400/25 bg-linear-to-br from-emerald-500/12 to-teal-500/5 p-5 backdrop-blur transition hover:-translate-y-1.5 hover:border-emerald-400/50 hover:shadow-[0_25px_50px_-15px_rgba(16,185,129,0.5)]"
        >
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-linear-to-br from-emerald-400 to-green-500 text- shadow-lg shadow-emerald-500/40 transition group-hover:rotate-[-8deg] group-hover:scale-110">
            💬
          </div>
          <p className="mt-3 text- font-black tracking-wide text-white/50">WHATSAPP</p>
          <p className="mt-1 text- font-black text-emerald-300 group-hover:underline">+62 812-3456-7890</p>
          <p className="mt-1 text- font-medium text-white/60">Senin - Jumat, 08.00 - 16.00 WIB</p>
          <p className="mt-4 inline-flex items-center gap-1 text- font-black text-white">
            Chat Sekarang <span className="transition group-hover:translate-x-1">→</span>
          </p>
        </a>

        <div className="group rounded-2xl border border-violet-400/25 bg-linear-to-br from-violet-500/12 to-indigo-500/5 p-5 backdrop-blur transition hover:-translate-y-1.5 hover:border-violet-400/50 hover:shadow-[0_25px_50px_-15px_rgba(139,92,246,0.5)]">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-linear-to-br from-violet-400 to-indigo-500 text- shadow-lg shadow-violet-500/40 transition group-hover:rotate-[-8deg] group-hover:scale-110">
            📍
          </div>
          <p className="mt-3 text- font-black tracking-wide text-white/50">LOKASI</p>
          <p className="mt-1 text- font-black text-white">Ruang OSIS, Gedung A Lantai 2</p>
          <p className="mt-1 text- font-medium text-white/60">Datang langsung pas jam istirahat</p>
          <p className="mt-4 inline-flex items-center gap-1 text- font-black text-violet-300">
            📍 Gedung A • Lantai 2
          </p>
        </div>

        <div className="group rounded-2xl border border-sky-400/25 bg-linear-to-br from-sky-500/12 to-blue-500/5 p-5 backdrop-blur transition hover:-translate-y-1.5 hover:border-sky-400/50 hover:shadow-[0_25px_50px_-15px_rgba(14,165,233,0.5)]">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-linear-to-br from-sky-400 to-blue-500 text- shadow-lg shadow-sky-500/40 transition group-hover:rotate-[-8deg] group-hover:scale-110">
            ⏰
          </div>
          <p className="mt-3 text- font-black tracking-wide text-white/50">JAM LAYANAN</p>
          <p className="mt-1 text- font-black text-white">Senin - Jumat • 08.00 - 16.00 WIB</p>
          <p className="mt-1 text- font-medium text-white/60">Sabtu - Minggu libur • Balas Senin</p>
          <p className="mt-4 inline-flex items-center gap-1 text- font-black text-sky-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> Buka Sekarang
          </p>
        </div>
      </div>

      {/* FAQ MINI - BARU, BIAR BERASA JUARA */}
      {/* SEBELUM: bg-white/[0.05] -> SESUDAH: bg-white/5 */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <p className="text- font-black tracking-[0.18em] text-amber-300">❓ SERING DITANYAIN</p>
        <div className="mt-4 space-y-3">
          {[
            { q: "Tiketnya bisa dibatalin gak?", a: "Bisa! Tinggal buka halaman Pesanan, klik Batalkan. Tiket langsung hangus." },
            { q: "Bayar di tempat atau online?", a: "Bisa dua-duanya. Kalau event gratis, langsung pesan aja tanpa bayar." },
            { q: "Mau ngadain event, gimana caranya?", a: "Chat WA kami aja, ceritain ide event kamu. Kami bantu daftarin." },
          ].map((f) => (
            <div key={f.q} className="rounded-2xl border border-white/10 bg-[#120826]/60 p-4">
              <p className="text- font-black text-white">{f.q}</p>
              <p className="mt-1 text- leading-relaxed text-white/60">{f.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* BANNER BAWAH - GRADIENT MEWAH */}
      {/* SEBELUM: bg-gradient-to-r -> SESUDAH: bg-linear-to-r */}
      <div className="relative flex flex-wrap items-center justify-between gap-5 overflow-hidden rounded- bg-linear-to-r from-violet-600 via-pink-500 to-orange-500 p-6 shadow-[0_30px_60px_-20px_rgba(236,72,153,0.6)] md:p-8">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/20 blur-3xl" />
        <div className="relative min-w-0">
          <span className="rounded-full bg-black/25 px-3 py-1 text- font-black tracking-widest text-white backdrop-blur">🎪 PUNYA IDE EVENT?</span>
          <h2 className="mt-3 text- font-black leading-tight text-white">Mau Ngadain Event di Sekolah? 🎪</h2>
          <p className="mt-1 text-sm font-medium text-white/85">
            Ceritain ide event kamu, kami bantu daftarin ke EventKu.
          </p>
        </div>
        <div className="relative flex flex-wrap gap-3">
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            // SEBELUM: bg-white + text-zinc-900 (putih) -> SESUDAH: dark glass
            className="inline-flex items-center gap-2 rounded-full bg-[#120826]/85 px-6 py-3.5 text-sm font-black text-white ring-1 ring-white/25 shadow-xl backdrop-blur transition hover:scale-[1.03]"
          >
            Chat WA →
          </a>
          <Link
            href="/event"
            // SEBELUM: hover:bg-white hover:text-zinc-900 -> SESUDAH: hover:bg-white/15 hover:text-white
            className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-black text-white backdrop-blur transition hover:bg-white/15 hover:text-white"
          >
            Lihat Event
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 pb-2">
        <Link
          href="/"
          // SEBELUM: bg-white/[0.06] + hover:bg-white hover:text-zinc-900 -> SESUDAH: bg-white/6 + hover:bg-white/15 hover:text-white
          className="inline-flex rounded-full border border-white/15 bg-white/6 px-6 py-3 text-sm font-black text-white backdrop-blur transition hover:bg-white/15 hover:text-white"
        >
          ← Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}