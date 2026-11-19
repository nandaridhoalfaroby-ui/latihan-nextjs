export type Event = {
  id: number;
  judul: string;
  nama?: string;
  kategori: string;
  tanggal: string;
  lokasi: string;
  deskripsi?: string;
  harga: number;
  kuota: number;
  terisi: number;
  gambar?: string | null;
};

export function rupiah(n: number): string {
  return n === 0 ? "Gratis" : "Rp " + n.toLocaleString("id-ID");
}