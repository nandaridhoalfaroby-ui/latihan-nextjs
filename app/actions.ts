// app/actions.ts
"use server";
import { events } from "@/data/events";
import { tambahPesanan } from "@/data/pesanan";

export type HasilPesan = {
  berhasil: boolean;
  pesan: string;
  galat: { nama: string; email: string; jumlah: string };
};

export async function pesanTiket(_sebelum: HasilPesan, formData: FormData): Promise<HasilPesan> {
  const eventId = Number(formData.get("eventId"));
  const nama = String(formData.get("nama") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const jumlah = Number(formData.get("jumlah"));

  console.log("Pesanan masuk:", nama, jumlah);

  // pura-pura server sedang sibuk, supaya tombol "Memproses..." terlihat
  await new Promise((r) => setTimeout(r, 800));

  const event = events.find((e: { id: number; }) => e.id === eventId);
  if (!event) {
    return { berhasil: false, pesan: "Event tidak ditemukan", galat: { nama: "", email: "", jumlah: "" } };
  }

  const galat = { nama: "", email: "", jumlah: "" };
  if (nama.length < 3) galat.nama = "Nama minimal 3 huruf.";
  else if (nama.length > 40) galat.nama = "Nama maksimal 40 huruf.";
  if (email.length < 3 || !email.includes("@")) galat.email = "Email tidak valid.";
  if (jumlah < 1) galat.jumlah = "Jumlah minimal 1.";
  else if (jumlah > event.sisa) galat.jumlah = "Jumlah tidak boleh lebih dari sisa tiket.";

  if (galat.nama || galat.email || galat.jumlah) {
    return { berhasil: false, pesan: "Periksa lagi isian yang salah.", galat };
  }

  const total = event.harga * jumlah;
  const nomor = tambahPesanan({
    eventId,
    judul: event.judul,
    nama,
    email,
    jumlah,
    total,
    waktu: new Date().toISOString().split("T")[0],
  });

  return {
    berhasil: true,
    pesan: `Pesanan #${nomor} berhasil: ${jumlah} tiket untuk ${event.judul}.`,
    galat: { nama: "", email: "", jumlah: "" },
  };
}