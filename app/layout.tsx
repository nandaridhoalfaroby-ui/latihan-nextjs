import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "EventKu",
  description: "Katalog dan pemesanan tiket event sekolah",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="antialiased">
      <body className="min-h-screen flex flex-col bg-[#FFFBEB] text-zinc-900">
        <Navbar />
        <main className="mx-auto w-full max-w-5xl flex-1 p-4 md:p-6">{children}</main>
        <footer className="mt-8 border-t border-orange-100 bg-[#FFFEF7] p-5 text-center">
          <p className="text-sm font-black text-zinc-900">
            🎪 Event<span className="text-amber-600">Ku</span>
          </p>
          <p className="mt-1 text-xs font-medium text-zinc-500">
            EventKu · dibuat oleh kelas XII RPL 1
          </p>
        </footer>
      </body>
    </html>
  );
}