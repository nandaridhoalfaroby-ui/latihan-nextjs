import type { Event } from "@/data/events";

export const PER_HALAMAN = 4;

export type Saringan = {
  cari: string;
  kategori: string;
  urut: string;
  sisa: boolean;
  max: number | null;
  hal: number;
};

type IsiURL = { [kunci: string]: string | string[] | undefined };

// BARU: helper sisa, karena di type Event gak ada field 'sisa'
// sisa = kuota - terisi (dari Supabase), biar konsisten sama Katalog + Detail + Pesan + Favorit
function sisaTiket(e: Event) {
  return Math.max(0, (e.kuota ?? 0) - (e.terisi ?? 0));
}

// Ubah isi URL (atau tidak ada) jadi saringan yang aman dipakai
export function bacaSaringan(isi: IsiURL): Saringan {
  const teks = (kunci: string) => {
    const nilai = isi[kunci];
    return typeof nilai === "string" ? nilai : "";
  };
  const max = Number(teks("max"));
  const hal = Number(teks("hal"));
  return {
    cari: teks("cari"),
    kategori: teks("kategori") || "Semua",
    urut: teks("urut") || "tanggal",
    sisa: teks("sisa") === "1",
    max: teks("max") !== "" && !isNaN(max) && max >= 0 ? max : null,
    hal: Number.isInteger(hal) && hal > 1 ? hal : 1,
  };
}

export function saringEvents(events: Event[], s: Saringan) {
  const hasil = events.filter(
    (e) =>
      // SEBELUM: e.judul.toLowerCase() -> bisa crash kalau judul undefined. SESUDAH: (e.judul ?? "")
      (e.judul ?? "").toLowerCase().includes(s.cari.toLowerCase()) &&
      (s.kategori === "Semua" || e.kategori === s.kategori) &&
      // ERROR SEBELUM: e.sisa gak ada di type Event -> SESUDAH: sisaTiket(e) = kuota - terisi
      (!s.sisa || sisaTiket(e) > 0) &&
      // SEBELUM: e.harga bisa undefined -> SESUDAH: (e.harga ?? 0)
      (s.max === null || (e.harga ?? 0) <= s.max),
  );
  return [...hasil].sort((a, b) => {
    if (s.urut === "harga") return (a.harga ?? 0) - (b.harga ?? 0);
    // SEBELUM: a.judul.localeCompare -> bisa crash kalau judul undefined. SESUDAH: (a.judul ?? "")
    if (s.urut === "nama") return (a.judul ?? "").localeCompare(b.judul ?? "");
    // SEBELUM: a.tanggal.localeCompare -> bisa crash kalau tanggal undefined. SESUDAH: (a.tanggal ?? "")
    return (a.tanggal ?? "").localeCompare(b.tanggal ?? "");
  });
}

// Alamat katalog untuk halaman tertentu, tanpa kehilangan saringan yang sedang dipakai.
export function alamatKatalog(s: Saringan, hal: number) {
  const q = new URLSearchParams();
  if (s.cari) q.set("cari", s.cari);
  if (s.kategori !== "Semua") q.set("kategori", s.kategori);
  if (s.urut !== "tanggal") q.set("urut", s.urut);
  if (s.sisa) q.set("sisa", "1");
  if (s.max !== null) q.set("max", String(s.max));
  if (hal > 1) q.set("hal", String(hal));
  const teks = q.toString();
  return teks ? `/event?${teks}` : "/event";
}

// Potong hasil saringan jadi per halaman - biar KatalogInteraktif gak perlu ngitung manual
export function potongHalaman<T>(items: T[], hal: number) {
  const totalHal = Math.max(1, Math.ceil(items.length / PER_HALAMAN));
  const halAman = Math.min(Math.max(1, hal), totalHal);
  const mulai = (halAman - 1) * PER_HALAMAN;
  return {
    items: items.slice(mulai, mulai + PER_HALAMAN),
    totalHal,
    hal: halAman,
  };
}