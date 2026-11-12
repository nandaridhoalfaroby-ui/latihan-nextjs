import { Poppins } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "EventKu",
  description: "Katalog event sekolah",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={poppins.variable}>
      <body className="min-h-screen flex flex-col bg-[#FFFBEB] font-[var(--font-poppins)] text-zinc-900 antialiased">
        <Suspense>
          <Navbar />
        </Suspense>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">{children}</main>
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