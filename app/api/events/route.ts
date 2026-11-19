// app/api/events/route.ts - GET semua event + POST tambah event
// FIX: Baca 2 nama (Vercel baru + laptop lama), biar jalan di 2 tempat
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// POTONGAN WAJIB - HARUS ADA DI SEMUA FILE app/api/**/route.ts
function supabaseAdmin() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    "";
  if (!url || !key) throw new Error("SUPABASE_URL / KEY belum ada di .env.local / Vercel Env");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET /api/events - Dipake Beranda, /event, /admin, /admin/event
export async function GET() {
  try {
    const sb = supabaseAdmin();
    // Jangan maksa order tanggal, biar gak error kalau format tanggal beda
    const { data, error } = await sb.from("events").select("*");
    if (error) {
      console.error("Supabase GET events error ASLI:", error);
      return NextResponse.json(
        { ok: false, error: `Supabase nolak: ${error.message} (code: ${error.code}) - Cek .env.local / Vercel Env` },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: true, events: data ?? [] });
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Gagal ambil events" },
      { status: 500 }
    );
  }
}

// POST /api/events - Buat Admin tambah event baru
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const sb = supabaseAdmin();

    const payload = {
      judul: String(body.judul ?? ""),
      deskripsi: String(body.deskripsi ?? ""),
      kategori: String(body.kategori ?? "Workshop"),
      tanggal: String(body.tanggal ?? ""), // format YYYY-MM-DD, di Supabase tipe DATE
      lokasi: String(body.lokasi ?? ""),
      harga: Number(body.harga ?? 0),
      kuota: Number(body.kuota ?? 50),
      terisi: Number(body.terisi ?? 0),
      gambar: String(body.gambar ?? ""),
    };

    if (!payload.judul || !payload.tanggal) {
      return NextResponse.json({ ok: false, error: "Judul + Tanggal wajib ada" }, { status: 400 });
    }

    const { data, error } = await sb.from("events").insert(payload).select().single();
    if (error) {
      console.error("Supabase POST events error ASLI:", error);
      return NextResponse.json(
        { ok: false, error: `Supabase nolak: ${error.message} (code: ${error.code})` },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: true, event: data });
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Gagal tambah event" },
      { status: 500 }
    );
  }
}