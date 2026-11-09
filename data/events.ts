export type Event = {
  id: number;
  judul: string;
  kategori: string;
  tanggal: string;
  lokasi: string;
  harga: number;
  sisa: number;
  kapasitas: number;
  deskripsi: string;
};

export const events: Event[] = [
  { id: 1, judul: "Workshop React untuk Pemula", kategori: "Workshop", tanggal: "2026-11-14", lokasi: "Lab RPL", harga: 50000, sisa: 18, kapasitas: 30, deskripsi: "Jangan sampai kehabisan. Pesan sekarang, e-ticket langsung dikirim ke email lo." },
  { id: 2, judul: "Turnamen Futsal", kategori: "Olahraga", tanggal: "2026-11-20", lokasi: "Lapangan Sekolah", harga: 0, sisa: 0, kapasitas: 50, deskripsi: "Turnamen futsal antar kelas." },
  { id: 3, judul: "Seminar AI", kategori: "Seminar", tanggal: "2026-11-22", lokasi: "Aula", harga: 25000, sisa: 25, kapasitas: 40, deskripsi: "Seminar AI untuk pemula." },
  { id: 4, judul: "Pameran Seni", kategori: "Seni", tanggal: "2026-11-25", lokasi: "Gedung Serbaguna", harga: 10000, sisa: 40, kapasitas: 60, deskripsi: "Pameran karya seni siswa." },
  { id: 5, judul: "Lomba Coding", kategori: "Lomba", tanggal: "2026-11-28", lokasi: "Lab RPL", harga: 15000, sisa: 12, kapasitas: 20, deskripsi: "Lomba coding antar jurusan." },
  { id: 6, judul: "Bazar Sekolah", kategori: "Bazar", tanggal: "2026-12-01", lokasi: "Halaman Sekolah", harga: 5000, sisa: 100, kapasitas: 200, deskripsi: "Bazar makanan dan kerajinan." },
];

export function rupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}