// app/actions.ts
"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { events } from "@/data/events";
import { pesanan, tambahPesanan } from "@/data/pesanan";

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

  await new Promise((r) => setTimeout(r, 800));

  const event = events.find((e) => e.id === eventId);
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
  event.sisa -= jumlah;

  const nomor = tambahPesanan({
    eventId, judul: event.judul, nama, email, jumlah, total,
    waktu: new Date().toISOString().split("T")[0],
  });

  const toples = await cookies();
  toples.set("nama", nama, { maxAge: 60 * 60 * 24 * 30 });

  revalidatePath("/event");
  revalidatePath(`/event/${eventId}`);
  revalidatePath("/pesanan");

  return {
    berhasil: true,
    pesan: `Pesanan #${nomor} berhasil: ${jumlah} tiket untuk ${event.judul}.`,
    galat: { nama: "", email: "", jumlah: "" },
  };
}

// BARU - Langkah 7
export async function batalkanPesanan(formData: FormData) {
  const namaSaya = (await cookies()).get("nama")?.value;
  const nomor = Number(formData.get("nomor"));

  // Jangan percaya browser: periksa lagi di server bahwa ini pesanan miliknya
  const idx = pesanan.findIndex((p) => p.nomor === nomor);
  if (idx < 0) return;
  if (pesanan[idx].nama !== namaSaya) return; // bukan miliknya, tolak diam-diam

  const [batal] = pesanan.splice(idx, 1);
  const event = events.find((e) => e.id === batal.eventId);
  if (event) event.sisa += batal.jumlah;

  revalidatePath("/event");
  revalidatePath(`/event/${batal.eventId}`);
  revalidatePath("/pesanan");
}