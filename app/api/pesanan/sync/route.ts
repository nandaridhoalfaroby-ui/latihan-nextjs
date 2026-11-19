// app/api/pesanan/sync/route.ts - FIX NOMOR + JUDUL
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!url || !key) throw new Error("SUPABASE_URL / KEY belum ada di .env.local");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const list = Array.isArray(body) ? body : Array.isArray(body.pesanan) ? body.pesanan : [];
    if (list.length === 0) return NextResponse.json({ ok: true, inserted: 0 });
    const sb = supabaseAdmin();
    let inserted = 0;
    let pesanError = "";
    for (const item of list) {
      const nomor = String(item.nomor ?? item.id ?? Date.now());
      const nama = String(item.nama ?? item.namaPemesan ?? "");
      const email = String(item.email ?? "");
      const eventId = Number(item.eventId ?? item.event_id ?? item.eventID ?? 0);
      const judul = String(item.judul ?? item.judulEvent ?? "");
      const jumlah = Number(item.jumlah ?? item.jumlahTiket ?? 1);
      const total = Number(item.total ?? item.totalHarga ?? 0);
      if (!nama || !eventId) { pesanError = "Nama + Event ID wajib ada"; continue; }
      const { error } = await sb.from("pesanan").upsert({ nomor, nama, email, event_id: eventId, judul, jumlah, total }, { onConflict: "nomor" });
      if (error) { pesanError = error.message; console.error("Sync gagal:", error.message); }
      else inserted++;
    }
    if (inserted === 0) return NextResponse.json({ ok: false, error: pesanError || "Gagal sync" }, { status: 500 });
    return NextResponse.json({ ok: true, inserted, total: list.length });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "Gagal sync" }, { status: 500 });
  }
}