"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { masuk } from "@/app/login/actions";

type Hasil = { pesan: string; sisaPercobaan?: number; diblokirSampai?: number };

export default function FormMasuk({ dari }: { dari: string }) {
  const [hasil, kirim, sedangKirim] = useActionState(masuk, { pesan: "" } as Hasil);
  const [lihatSandi, setLihatSandi] = useState(false);
  const [sisaDetik, setSisaDetik] = useState(0);

  // Hitung mundur kalau lagi diblokir
  useEffect(() => {
    if (!hasil.diblokirSampai) { setSisaDetik(0); return; }
    const update = () => {
      const sisa = Math.max(0, Math.ceil((hasil.diblokirSampai! - Date.now()) / 1000));
      setSisaDetik(sisa);
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [hasil.diblokirSampai]);

  const diblokir = sisaDetik > 0 || (hasil.diblokirSampai ? hasil.diblokirSampai > Date.now() : false);
  const sisaPercobaan = hasil.sisaPercobaan ?? 5;

  return (
    <div className="w-full min-h-screen bg-[#120826] text-white flex items-center justify-center px-4 py-10" style={{ colorScheme: "dark" }}>
      <div className="w-full max-w-md">
        <div className="text-center">
          {/* SEBELUM: bg-gradient-to-br -> SESUDAH: bg-linear-to-br */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-violet-600 via-pink-500 to-orange-500 text- font-black shadow-lg shadow-pink-500/30">E</div>
          {/* SEBELUM: bg-gradient-to-r -> SESUDAH: bg-linear-to-r */}
          <p className="mt-3 text- font-black tracking-tight">Event<span className="bg-linear-to-r from-amber-300 to-pink-400 bg-clip-text text-transparent">Ku</span> <span className="text-white/40 text- font-bold">• ADMIN</span></p>
          <p className="mt-1 text- text-white/50">Masuk untuk kelola event & pesanan</p>
        </div>

        <form action={kirim} autoComplete="off" className="relative mt-6 overflow-hidden rounded- border border-white/10 bg-[#1E103A]/90 p-6 shadow-2xl sm:p-7">
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet-500/25 blur-" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-pink-500/25 blur-" />
          <div className="relative">
            <span className="inline-flex rounded-full bg-black/40 px-3.5 py-1 text- font-black tracking-widest text-amber-300 ring-1 ring-white/15">🔐 MASUK ADMIN</span>
            <h1 className="mt-3 text- font-black leading-tight">Selamat Datang<br />Kembali, Admin 👋</h1>

            {/* INDIKATOR SISA PERCOBAAN - BARU DI LANGKAH 11 */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  // SEBELUM: bg-gradient-to-r -> SESUDAH: bg-linear-to-r
                  <div key={i} className={`h-2 w-6 rounded-full ${i < sisaPercobaan ? "bg-linear-to-r from-amber-400 to-pink-500" : "bg-white/10"}`} />
                ))}
              </div>
              <span className="text- font-bold text-white/50">{diblokir ? "⛔ Diblokir" : `Sisa ${sisaPercobaan}/5 percobaan`}</span>
            </div>

            <input type="hidden" name="dari" value={dari} />
            <input type="text" name="__prevent_autofill" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <label className="mt-5 block">
              <span className="text- font-black text-white/70">🔑 KATA SANDI ADMIN *</span>
              <div className="relative mt-2">
                <input
                  type={lihatSandi ? "text" : "password"}
                  name="sandi"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  required
                  disabled={diblokir}
                  className="w-full rounded-full border border-white/15 bg-[#2A1B52] px-5 py-3.5 pr-14 text- font-semibold text-white placeholder:text-white/30 shadow-[inset_0_0_0_1000px_#2A1B52] outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 [-webkit-text-fill-color:white] disabled:opacity-50"
                  style={{ colorScheme: "dark" }}
                />
                <button
                  type="button"
                  onClick={() => setLihatSandi(!lihatSandi)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-1.5 text- font-black text-white/70 ring-1 ring-white/10 transition hover:bg-white hover:text-zinc-900"
                >
                  {lihatSandi ? "🙈 Sembunyi" : "👁 Lihat"}
                </button>
              </div>
            </label>

            {hasil.pesan && (
              <div className={`mt-4 rounded-2xl px-4 py-3 text-center text- font-bold ring-1 ${diblokir ? "bg-red-500/20 text-red-200 ring-red-500/40" : "bg-red-500/15 text-red-300 ring-red-500/30"}`}>
                <p>⚠ {hasil.pesan}</p>
                {diblokir && sisaDetik > 0 && (
                  <p className="mt-1 text- font-black tabular-nums">⏳ {Math.floor(sisaDetik / 60)}:{String(sisaDetik % 60).padStart(2, "0")}</p>
                )}
                {diblokir && <p className="mt-1 text- font-normal text-white/60">Tombol login terkunci sampai hitungan selesai. Jangan refresh berulang-ulang.</p>}
              </div>
            )}

            <button
              type="submit"
              disabled={sedangKirim || diblokir}
              // SEBELUM: bg-gradient-to-r -> SESUDAH: bg-linear-to-r
              className="mt-5 w-full rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 py-4 text- font-black shadow-lg shadow-orange-500/30 transition hover:scale-[1.01] disabled:opacity-50 disabled:scale-100"
            >
              {diblokir ? `⛔ Diblokir - Tunggu ${sisaDetik} detik` : sedangKirim ? "⏳ Memeriksa..." : "🔓 Masuk ke Admin →"}
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text- text-white/40">
              <span>🔒 Sesi aman, cookie httpOnly</span>
              <span>•</span>
              <Link href="/" className="font-black text-white/70 hover:text-white">Balik ke Beranda</Link>
            </div>
          </div>
        </form>

        {/* SEBELUM: bg-white/[0.04] -> SESUDAH: bg-white/4 */}
        <div className="mt-4 rounded-2xl border border-white/10 bg-white/4 p-4 text- leading-relaxed text-white/50">
          <p className="font-black text-white">🛡 Kenapa dibatasi & pake timingSafeEqual?</p>
          <p className="mt-1"><b className="text-white">1. Batas 5x:</b> biar hacker gak bisa brute force nebak sandi ribuan kali. Hitungan disimpen di cookie <b className="text-white">eventku-login-gagal</b>, jadi mudah dilewati kalau user hapus cookie-nya. Yang ideal simpen di server / database per IP.</p>
          <p className="mt-1"><b className="text-white">2. timingSafeEqual:</b> biar waktu respon selalu sama, gak bisa ditebak huruf per huruf dari waktu respon (timing attack). Kalau pake <b className="text-white">!==</b>, komputer berhenti di huruf pertama yang beda, waktunya beda-beda.</p>
        </div>
      </div>
    </div>
  );
}