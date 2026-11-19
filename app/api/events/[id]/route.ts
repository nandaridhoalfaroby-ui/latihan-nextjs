// app/api/events/[id]/route.ts - GET 1 event + PUT ubah + DELETE hapus
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!url || !key) throw new Error("SUPABASE_URL / KEY belum ada di .env.local");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

// GET /api/events/1 - Buat halaman /event/1
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const sb = supabaseAdmin();
    const { data, error } = await sb.from("events").select("*").eq("id", Number(id)).single();
    if (error) throw error;
    return NextResponse.json({ ok: true, event: data });
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Event gak ketemu" },
      { status: 404 }
    );
  }
}

// PUT /api/events/1 - Buat Admin ubah event
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json().catch(() => ({}));
    const sb = supabaseAdmin();

    const payload: Record<string, unknown> = {};
    if (body.judul !== undefined) payload.judul = String(body.judul);
    if (body.deskripsi !== undefined) payload.deskripsi = String(body.deskripsi);
    if (body.kategori !== undefined) payload.kategori = String(body.kategori);
    if (body.tanggal !== undefined) payload.tanggal = String(body.tanggal);
    if (body.lokasi !== undefined) payload.lokasi = String(body.lokasi);
    if (body.harga !== undefined) payload.harga = Number(body.harga);
    if (body.kuota !== undefined) payload.kuota = Number(body.kuota);
    if (body.terisi !== undefined) payload.terisi = Number(body.terisi);
    if (body.gambar !== undefined) payload.gambar = String(body.gambar);

    const { data, error } = await sb.from("events").update(payload).eq("id", Number(id)).select().single();
    if (error) throw error;
    return NextResponse.json({ ok: true, event: data });
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Gagal ubah event" },
      { status: 500 }
    );
  }
}

// DELETE /api/events/1 - Buat Admin hapus event
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const sb = supabaseAdmin();
    const { error } = await sb.from("events").delete().eq("id", Number(id));
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Gagal hapus event" },
      { status: 500 }
    );
  }
}