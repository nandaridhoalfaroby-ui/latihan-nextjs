"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NAMA_COOKIE, NAMA_COOKIE_GAGAL, MAKS_GAGAL, BLOKIR_MENIT, buatToken, sandiSama } from "@/lib/sesi";

type Hasil = { pesan: string; sisaPercobaan?: number; diblokirSampai?: number };

export async function masuk(_prev: Hasil, form: FormData): Promise<Hasil> {
  const sandi = String(form.get("sandi") || "");
  const dari = String(form.get("dari") || "/admin");
  const benar = process.env.ADMIN_PASSWORD || "";
  const store = await cookies();

  // Cek apakah lagi diblokir
  const dataGagal = store.get(NAMA_COOKIE_GAGAL)?.value;
  let gagal = 0;
  let blokirSampai = 0;
  try {
    if (dataGagal) {
      const parsed = JSON.parse(dataGagal);
      gagal = Number(parsed.gagal || 0);
      blokirSampai = Number(parsed.blokirSampai || 0);
    }
  } catch {}

  const sekarang = Date.now();
  if (blokirSampai > sekarang) {
    const sisaDetik = Math.ceil((blokirSampai - sekarang) / 1000);
    return {
      pesan: `Terlalu banyak percobaan salah. Coba lagi dalam ${sisaDetik} detik.`,
      sisaPercobaan: 0,
      diblokirSampai: blokirSampai,
    };
  }

  if (blokirSampai !== 0 && blokirSampai <= sekarang) {
    gagal = 0;
    blokirSampai = 0;
  }

  // Bandingin pake timingSafeEqual, bukan !==
  const cocok = benar !== "" && sandiSama(sandi, benar);

  if (!cocok) {
    gagal += 1;
    const sisa = Math.max(0, MAKS_GAGAL - gagal);

    if (gagal >= MAKS_GAGAL) {
      blokirSampai = Date.now() + BLOKIR_MENIT * 60 * 1000;
      store.set(NAMA_COOKIE_GAGAL, JSON.stringify({ gagal, blokirSampai }), {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 5,
      });
      return {
        pesan: `Salah 5 kali. Akun login diblokir selama ${BLOKIR_MENIT} menit.`,
        sisaPercobaan: 0,
        diblokirSampai: blokirSampai,
      };
    }

    store.set(NAMA_COOKIE_GAGAL, JSON.stringify({ gagal, blokirSampai: 0 }), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 5,
    });
    return {
      pesan: `Kata sandi salah. Sisa percobaan: ${sisa} kali lagi.`,
      sisaPercobaan: sisa,
    };
  }

  // Berhasil: hapus hitungan gagal, set cookie login
  store.delete(NAMA_COOKIE_GAGAL);
  const token = buatToken(sandi);
  store.set(NAMA_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect(dari.startsWith("/") ? dari : "/admin");
}

// INI YANG HILANG KEMARIN, MAKANYA layout.tsx MERAH
// Harus di-export, namanya harus persis 'keluar', bukan 'logout' / 'keluarAdmin'
export async function keluar() {
  const store = await cookies();
  store.delete(NAMA_COOKIE);
  redirect("/login");
}