"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { pastikanAdmin } from "@/lib/sesi";

export type HasilEvent = {
  pesan: string;
  galat: Partial<Record<"judul" | "kategori" | "tanggal" | "lokasi" | "harga" | "kuota" | "terisi" | "gambar", string>>;
  isi: Record<string, string>;
};

function segarkan(id?: number) {
  revalidatePath("/admin");
  revalidatePath("/admin/event");
  revalidatePath("/event");
  if (id) revalidatePath(`/event/${id}`);
}

export async function simpanEvent(sebelum: HasilEvent, formData: FormData): Promise<HasilEvent> {
  await pastikanAdmin(); // Server Action bisa dipanggil langsung, jadi periksa lagi

  const idTeks = String(formData.get("id") ?? "");
  const isian = {
    id: idTeks,
    judul: String(formData.get("judul") ?? "").trim(),
    kategori: String(formData.get("kategori") ?? "").trim(),
    tanggal: String(formData.get("tanggal") ?? "").trim(),
    lokasi: String(formData.get("lokasi") ?? "").trim(),
    harga: String(formData.get("harga") ?? "").trim(),
    kuota: String(formData.get("kuota") ?? "").trim(),
    gambar: String(formData.get("gambar") ?? "").trim(),
  };

  const galat: HasilEvent["galat"] = {};
  if (isian.judul.length < 3 || isian.judul.length > 80) galat.judul = "Judul 3 sampai 80 huruf.";
  if (isian.kategori.length < 3 || isian.kategori.length > 30) galat.kategori = "Kategori 3 sampai 30 huruf.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isian.tanggal) || Number.isNaN(Date.parse(isian.tanggal))) galat.tanggal = "Tanggal tidak valid.";
  if (isian.lokasi.length < 2) galat.lokasi = "Lokasi minimal 2 huruf.";
  const harga = Number(isian.harga);
  if (isian.harga === "" || Number.isNaN(harga) || harga < 0 || harga > 1_000_000) galat.harga = "Harga 0 sampai 1.000.000 (bilangan bulat).";
  const kuota = Number(isian.kuota);
  if (!Number.isInteger(kuota) || kuota < 1 || kuota > 1000) galat.kuota = "Kuota 1 sampai 1000 (bilangan bulat).";

  if (Object.keys(galat).length > 0) {
    return { pesan: "Periksa lagi isian yang merah.", galat, isi: isian };
  }

  const id = idTeks ? Number(idTeks) : null;

  // Kalau ubah, kuota tidak boleh lebih kecil dari tiket yang sudah terisi
  if (id) {
    const { data } = await supabaseAdmin.from("events").select("terisi").eq("id", id).single();
    if (!data) return { pesan: "Event tidak ditemukan.", galat: {}, isi: isian };
    if (kuota < Number(data.terisi)) return { pesan: `Kuota tidak boleh di bawah tiket terisi (${data.terisi}).`, galat: {}, isi: isian };
  }

  const baris = {
    judul: isian.judul,
    kategori: isian.kategori,
    tanggal: isian.tanggal,
    lokasi: isian.lokasi,
    harga,
    kuota,
    gambar: isian.gambar || null,
  };

  const { error } = id
    ? await supabaseAdmin.from("events").update(baris).eq("id", id)
    : await supabaseAdmin.from("events").insert(baris);

  if (error) return { pesan: `Gagal menyimpan: ${error.message}`, galat: {}, isi: isian };

  segarkan(id ?? undefined);
  redirect("/admin/info?pesan=" + encodeURIComponent(id === null ? "Event ditambahkan." : "Perubahan disimpan."));
}

export async function hapusEvent(formData: FormData) {
  await pastikanAdmin();
  const id = Number(formData.get("id"));
  if (Number.isNaN(id)) redirect("/admin");

  const { error } = await supabaseAdmin.from("events").delete().eq("id", id);
  if (error) {
    // 23503 = masih dipakai tabel lain (foreign key): event ini sudah punya pesanan
    const pesan = error.code === "23503" ? "Event ini sudah punya pesanan, jadi tidak bisa dihapus." : `Gagal menghapus: ${error.message}`;
    redirect("/admin?galat=" + encodeURIComponent(pesan));
  }

  segarkan(id);
  redirect("/admin/info?pesan=" + encodeURIComponent("Event dihapus."));
}