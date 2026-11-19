import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac, timingSafeEqual } from "node:crypto";

export const NAMA_COOKIE = "eventku-admin";
export const NAMA_COOKIE_GAGAL = "eventku-login-gagal";
export const MAKS_GAGAL = 5;
export const BLOKIR_MENIT = 1;

function rahasia() {
  return process.env.ADMIN_PASSWORD || "ganti-sandi-admin-di-env";
}

export function buatToken(sandi: string) {
  return createHmac("sha256", rahasia()).update(sandi).digest("hex");
}

// BENER: pake timingSafeEqual, bukan !==
// Kenapa? Kalau pake !==, komputer berhenti di huruf pertama yang beda,
// jadi waktu responnya beda-beda, hacker bisa nebak sandi dari waktu respon (timing attack).
// timingSafeEqual selalu cek semua huruf sampai habis, waktunya selalu sama.
export function sandiSama(input: string, benar: string) {
  const a = Buffer.from(input);
  const b = Buffer.from(benar);
  // Panjang beda -> langsung tolak, tapi tetep dibandingin biar waktunya gak bocor
  // Kita samain panjangnya dulu biar timingSafeEqual gak error
  if (a.length !== b.length) {
    // Bandingin sama dummy yang panjangnya sama, biar waktunya tetep konsisten
    const dummy = Buffer.alloc(a.length, 0);
    try { timingSafeEqual(a, dummy); } catch {}
    return false;
  }
  try {
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

// Dipake di proxy.ts + login/page.tsx
export async function tokenSah(token?: string | null) {
  if (!token) return false;
  try {
    const benar = buatToken(process.env.ADMIN_PASSWORD || "");
    const a = Buffer.from(token);
    const b = Buffer.from(benar);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

// Dipake di app/admin/layout.tsx
export async function pastikanAdmin() {
  const token = (await cookies()).get(NAMA_COOKIE)?.value;
  if (!(await tokenSah(token))) {
    redirect("/login?dari=/admin");
  }
}