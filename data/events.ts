export type Event = {
  id: number;
  judul: string;
  kategori: string;
  tanggal: string;
  lokasi: string;
  harga: number;
  kapasitas: number;
  sisa: number;
  gambar?: string;
  deskripsi?: string;
};

export const events: Event[] = [
  {
    id: 1,
    judul: "Workshop React",
    kategori: "Workshop",
    tanggal: "2026-11-20",
    lokasi: "Lab RPL",
    harga: 50000,
    kapasitas: 30,
    sisa: 18,
    gambar: "/img/event-1.png",
    deskripsi: "Belajar React dari nol bareng kakak kelas. Cocok buat pemula, bawa laptop sendiri ya.",
  },
  {
    id: 2,
    judul: "Futsal Bareng",
    kategori: "Olahraga",
    tanggal: "2026-11-22",
    lokasi: "Lapangan Sekolah",
    harga: 25000,
    kapasitas: 20,
    sisa: 0,
    gambar: "/img/event-2.png",
    deskripsi: "Futsal santai antar kelas, hadiah buat juara 1, 2, 3.",
  },
  {
    id: 3,
    judul: "Seminar AI",
    kategori: "Seminar",
    tanggal: "2026-11-25",
    lokasi: "Aula",
    harga: 0,
    kapasitas: 100,
    sisa: 80,
    gambar: "/img/event-3.png",
    deskripsi: "Seminar AI untuk pemula, bahas ChatGPT, cara pakai AI buat belajar, dan demo langsung.",
  },
  {
    id: 4,
    judul: "Lomba Desain Poster",
    kategori: "Lomba",
    tanggal: "2026-11-28",
    lokasi: "Lab RPL",
    harga: 15000,
    kapasitas: 40,
    sisa: 35,
    gambar: "/img/event-4.png",
    deskripsi: "Lomba desain poster tema lingkungan. Karya terbaik dipajang di mading sekolah.",
  },
  {
    id: 5,
    judul: "Bazar Buku",
    kategori: "Bazar",
    tanggal: "2026-12-01",
    lokasi: "Halaman Sekolah",
    harga: 10000,
    kapasitas: 50,
    sisa: 45,
    gambar: "/img/event-5.png",
    deskripsi: "Bazar buku bekas, komik, dan novel murah. Bawa uang pas ya.",
  },
  {
    id: 6,
    judul: "Konser Musik Sekolah",
    kategori: "Musik",
    tanggal: "2026-12-05",
    lokasi: "Gedung Serbaguna",
    harga: 30000,
    kapasitas: 200,
    sisa: 150,
    gambar: "/img/event-6.png",
    deskripsi: "Konser musik dari band-band sekolah, ada guest star dari alumni juga.",
  },
];

export function rupiah(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}