// app/api/seed/route.ts - POST /api/seed buat isi 6 event contoh
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!url || !key) throw new Error("SUPABASE_URL / KEY belum ada di .env.local");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

const CONTOH = [
  { judul: "Workshop React Dasar", deskripsi: "Belajar React dari nol, bikin web interaktif bareng mentor.", kategori: "Workshop", tanggal: "2026-11-25", lokasi: "Lab Komputer", harga: 0, kuota: 50, terisi: 32, gambar: "" },
  { judul: "Konser Musik Sekolah", deskripsi: "Pentas band sekolah, nyanyi bareng, seru-seruan.", kategori: "Musik", tanggal: "2026-11-28", lokasi: "Aula Sekolah", harga: 15000, kuota: 200, terisi: 164, gambar: "" },
  { judul: "Turnamen Futsal Antar Kelas", deskripsi: "Rebut piala juara, dukung kelasmu jadi yang terbaik.", kategori: "Olahraga", tanggal: "2026-11-30", lokasi: "Lapangan Sekolah", harga: 0, kuota: 80, terisi: 45, gambar: "" },
  { judul: "Bazar Makanan & Kreativitas", deskripsi: "Jajan enak + beli karya teman-teman, murah meriah.", kategori: "Bazar", tanggal: "2026-12-02", lokasi: "Halaman Sekolah", harga: 0, kuota: 100, terisi: 60, gambar: "" },
  { judul: "Lomba Desain Poster", deskripsi: "Tunjukin bakat desainmu, hadiah menarik menanti.", kategori: "Workshop", tanggal: "2026-12-05", lokasi: "Ruang Seni", harga: 5000, kuota: 30, terisi: 18, gambar: "" },
  { judul: "Workshop Fotografi HP", deskripsi: "Bikin foto HP lo jadi kaya fotografer profesional.", kategori: "Workshop", tanggal: "2026-12-08", lokasi: "Perpustakaan", harga: 0, kuota: 40, terisi: 12, gambar: "" },
];

export async function POST() {
  try {
    const sb = supabaseAdmin();
    // Cek dulu, kalau udah ada event, jangan duplikat
    const { data: ada } = await sb.from("events").select("id").limit(1);
    if (ada && ada.length > 0) {
      return NextResponse.json({ ok: true, message: "Event udah ada, gak perlu seed lagi." });
    }
    const { data, error } = await sb.from("events").insert(CONTOH).select();
    if (error) throw error;
    return NextResponse.json({ ok: true, inserted: data?.length ?? 0, events: data });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "Gagal seed" }, { status: 500 });
  }
}