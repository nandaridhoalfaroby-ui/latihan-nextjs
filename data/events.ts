// data/events.ts - VERSI FIX BUILD

export type Event = {
  id: number;
  judul: string;
  nama: string;
  title: string;
  name?: string;
  kategori: string;
  tanggal: string;
  lokasi: string;
  harga: number;
  kuota: number;
  terisi: number;
  sisa: number;
  deskripsi: string;
  namaEvent?: string;
};

function makeEvent(e: Omit<Event, 'nama' | 'title' | 'deskripsi' | 'sisa'> & { judul: string }): Event {
  return {
    ...e,
    nama: e.judul,
    title: e.judul,
    name: e.judul,
    namaEvent: e.judul,
    deskripsi: `${e.judul} - ${e.kategori} di ${e.lokasi}`,
    sisa: e.kuota - e.terisi,
  };
}

export const events: Event[] = [
  makeEvent({ id: 1, judul: "Workshop React untuk Pemula", kategori: "Workshop", tanggal: "2026-11-14", lokasi: "Lab RPL", harga: 50000, kuota: 30, terisi: 12 }),
  makeEvent({ id: 2, judul: "Turnamen Futsal", kategori: "Olahraga", tanggal: "2026-11-15", lokasi: "Lapangan Sekolah", harga: 0, kuota: 16, terisi: 16 }),
  makeEvent({ id: 3, judul: "Lomba Desain Poster", kategori: "Lomba", tanggal: "2026-11-16", lokasi: "Aula", harga: 25000, kuota: 20, terisi: 5 }),
  makeEvent({ id: 4, judul: "Bazar Kewirausahaan", kategori: "Bazar", tanggal: "2026-11-17", lokasi: "Halaman Sekolah", harga: 0, kuota: 50, terisi: 20 }),
  makeEvent({ id: 5, judul: "Konser Musik Akustik", kategori: "Musik", tanggal: "2026-11-18", lokasi: "Aula", harga: 35000, kuota: 100, terisi: 60 }),
  makeEvent({ id: 6, judul: "Seminar Karir IT", kategori: "Seminar", tanggal: "2026-11-19", lokasi: "Lab RPL", harga: 0, kuota: 40, terisi: 10 }),
].map(e => ({ ...e, sisa: e.kuota - e.terisi }));

export function rupiah(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}