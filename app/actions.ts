"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

// INI YANG KEMARIN HILANG -> MAKANYA ERROR ts(2305) DI app/pesan/page.tsx
// Halaman /pesan ngimpor type ini: import { pesanTiket, type HasilPesan } from "@/app/actions"
export type HasilPesan = {
  berhasil: boolean;
  pesan: string;
  galat: { nama?: string; email?: string; jumlah?: string };
  isian: { nama: string; email: string; jumlah: string };
};

function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  // WAJIB ada biar bisa bypass RLS. Kalau ini kosong, insert ditolak RLS -> pesanan cuma di localStorage, admin 0
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key, { auth: { persistSession: false } });
}

const GAGAL: HasilPesan = { berhasil: false, pesan: "", galat: {}, isian: { nama: "", email: "", jumlah: "1" } };

// SEBELUM: pesanTiket(prev: any, ...) return { ok, error } -> gak nyambung sama useActionState(pesanTiket, AWAL) di /pesan
// SESUDAH: pesanTiket(prev: HasilPesan, formData) return HasilPesan -> nyambung, error ts(2305) ilang
export async function pesanTiket(prev: HasilPesan, formData: FormData): Promise<HasilPesan> {
  const eventId = Number(formData.get("eventId"));
  const nama = String(formData.get("nama") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const jumlahStr = String(formData.get("jumlah") ?? "1");
  const jumlah = Number(jumlahStr);
  const isian = { nama, email, jumlah: jumlahStr };

  // Validasi server (biar gak bisa di-bypass inspect element)
  const galat: HasilPesan["galat"] = {};
  if (!nama) galat.nama = "Nama wajib diisi.";
  if (!email) galat.email = "Email wajib diisi.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) galat.email = "Format email gak valid.";
  if (!jumlah || jumlah < 1 || jumlah > 5) galat.jumlah = "Jumlah tiket 1 - 5.";
  if (Object.keys(galat).length > 0) return { berhasil: false, pesan: "Cek lagi form-nya, masih ada yang salah.", galat, isian };
  if (!eventId) return { berhasil: false, pesan: "Event gak ketemu.", galat: {}, isian };

  const supabase = supabaseAdmin();

  // Ambil harga + kuota dari DB, BUKAN dari form (aman dari inspect element)
  const { data: event, error: errEvent } = await supabase.from("events").select("*").eq("id", eventId).single();
  if (errEvent || !event) return { berhasil: false, pesan: "Event gak ketemu di database.", galat: {}, isian };
  const harga = Number(event.harga ?? 0);
  const total = harga * jumlah;
  const terisi = Number(event.terisi ?? 0);
  const kapasitas = Number(event.kapasitas ?? event.kuota ?? 9999);
  if (terisi + jumlah > kapasitas) return { berhasil: false, pesan: `Sisa kuota tinggal ${kapasitas - terisi} tiket.`, galat: { jumlah: `Sisa kuota tinggal ${kapasitas - terisi} tiket.` }, isian };

  // 1. INSERT KE DB - INI YANG KEMARIN GAGAL, MAKANYA ADMIN 0
  // Kalau gagal, JANGAN pura-pura sukses. Return pesan error-nya biar keliatan di /pesan
  const { error: errInsert } = await supabase
    .from("pesanan")
    .insert([{ event_id: eventId, nama, email, jumlah, total }]);
  if (errInsert) {
    console.error("GAGAL INSERT PESANAN:", errInsert.message);
    return { berhasil: false, pesan: `Gagal simpan ke database: ${errInsert.message}. Cek SUPABASE_SERVICE_ROLE_KEY + RLS pesanan.`, galat: {}, isian };
  }

  // 2. UPDATE TERISI - biar kuota di /event berkurang beneran
  await supabase.from("events").update({ terisi: terisi + jumlah }).eq("id", eventId);

  // 3. SIMPAN COOKIE NAMA
  const jar = await cookies();
  jar.set("namaSaya", nama, { path: "/", maxAge: 60 * 60 * 24 * 30 });

  revalidatePath("/pesanan");
  revalidatePath("/admin/pesanan");
  revalidatePath("/event");
  revalidatePath("/");
  return { berhasil: true, pesan: `Berhasil! ${jumlah} tiket ${event.judul} udah tersimpan. Mengalihkan ke Daftar Pesanan...`, galat: {}, isian };
}

export async function batalkanPesanan(formData: FormData) {
  const nomor = formData.get("nomor");
  const eventId = Number(formData.get("eventId"));
  const jumlah = Number(formData.get("jumlah") ?? 0);
  const supabase = supabaseAdmin();
  const { error } = await supabase.from("pesanan").delete().eq("nomor", nomor);
  if (error) await supabase.from("pesanan").delete().match({ event_id: eventId, jumlah });
  if (eventId && jumlah) {
    const { data: event } = await supabase.from("events").select("terisi").eq("id", eventId).single();
    if (event) await supabase.from("events").update({ terisi: Math.max(0, Number(event.terisi ?? 0) - jumlah) }).eq("id", eventId);
  }
  revalidatePath("/pesanan");
  revalidatePath("/admin/pesanan");
  revalidatePath("/event");
  revalidatePath("/");
}