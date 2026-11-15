import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Suspense } from "react";
import Link from "next/link";
import "./globals.css";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "EventKu", template: "%s - EventKu" },
  description: "Katalog event sekolah — jelajahi, pesan tiket, simpan favorit.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={poppins.variable}>
      <body className="min-h-screen flex flex-col bg-[#FFFBEB] font-[var(--font-poppins)] text-zinc-900 antialiased">
        <Suspense>
          <Navbar />
        </Suspense>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:py-8">{children}</main>

        {/* CTA SEBELUM FOOTER */}
        <div className="mx-auto w-full max-w-6xl px-4 pb-2">
          <div className="relative overflow-hidden rounded- bg-zinc-900 p-6 md:p-7 flex flex-wrap items-center justify-between gap-4 shadow-xl">
            <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-[#FFC837]/20" />
            <div className="relative">
              <h2 className="text-lg md:text-xl font-black text-white leading-tight">Jangan Sampai Kehabisan Tiket! 🎟️</h2>
              <p className="mt-1 text-sm font-medium text-zinc-300">Event favorit kamu bisa habis kapan aja. Cek sekarang.</p>
            </div>
            <Link href="/event" className="relative inline-flex items-center gap-2 rounded-full bg-[#FFC837] px-6 py-3 text-sm font-black text-zinc-900 hover:bg-[#FFD95E] hover:-translate-y-0.5 transition">
              Lihat Event
              <span className="grid h-5 w-5 place-items-center rounded-full bg-zinc-900 text- text-[#FFC837]">→</span>
            </Link>
          </div>
        </div>

        <footer className="mt-6 border-t-2 border-orange-100 bg-[#FFFEF7]">
          <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
              {/* Logo */}
              <div className="flex items-center gap-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-[#FFC837] via-[#FFB020] to-[#FF7A18] border-2 border-amber-300 text-xl font-black text-white shadow-md">E</span>
                <div className="leading-none">
                  <p className="text-lg font-black text-zinc-900">
                    Event<span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">Ku</span>
                  </p>
                  <p className="mt-0.5 text- font-bold tracking-[0.18em] text-orange-500">JELAJAHI • PESAN • HADIR</p>
                </div>
              </div>

              {/* Link */}
              <nav className="flex flex-wrap gap-2">
                {[
                  { href: "/event", label: "🎪 Event" },
                  { href: "/favorit", label: "❤️ Favorit" },
                  { href: "/pesanan", label: "🎟️ Pesanan" },
                  { href: "/tentang", label: "✨ Tentang" },
                  { href: "/kontak", label: "📞 Kontak" },
                ].map((m) => (
                  <Link key={m.href} href={m.href} className="rounded-full bg-[#FFFBEB] border-2 border-orange-100 px-3.5 py-2 text-xs font-black text-zinc-700 hover:bg-[#FFF7D6] hover:text-zinc-900 transition">
                    {m.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-orange-100 pt-4">
              <p className="text-xs font-bold text-zinc-500">🎪 EventKu · dibuat oleh kelas XII RPL 1</p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#DCFCE7] border border-emerald-200 px-3 py-1 text- font-black text-emerald-700">● Semua event sekolah dalam satu tempat</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}