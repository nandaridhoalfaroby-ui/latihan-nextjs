// app/api/pesanan/route.ts - FIX FINAL: Baca 2 nama + Gak maksa created_at + Error-nya jujur
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

// Buat fallback ke ANON kalau SECRET-nya salah (Invalid API key)
function supabaseAnon() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anonKey =
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    "";
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, { auth: { persistSession: false, autoRefreshToken: false } });
}

type PesananRow = {
  id?: number | string;
  nomor?: string;
  nama?: string;
  email?: string;
  event_id?: number;
  judul?: string;
  jumlah?: number;
  total?: number;
  created_at?: string;
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET /api/pesanan - FIX: Jangan order by created_at, tabel lo belum tentu punya kolom itu
export async function GET() {
  try {
    const sb = supabaseAdmin();

    // COBA 1: Ambil semua, tanpa order (paling aman, gak maksa kolom apapun)
    let { data, error } = await sb.from("pesanan").select("*");

    // FIX: Kalau SECRET_KEY salah (Invalid API key), coba lagi pake ANON_KEY
    if (error && error.message.includes("Invalid API key")) {
      console.warn("SERVICE / SECRET KEY salah, nyoba pake ANON_KEY...");
      const anon = supabaseAnon();
      if (anon) {
        const retry = await anon.from("pesanan").select("*");
        data = retry.data;
        error = retry.error;
      }
    }

    // Kalau gagal, kasih tau error ASLI-nya dari Supabase, jangan ditutup-tutupin
    if (error) {
      console.error("Supabase GET pesanan error ASLI:", error);
      return NextResponse.json(
        {
          ok: false,
          error: `Supabase nolak: ${error.message} (code: ${error.code}) - ${error.details || ""} - ${error.hint || ""}`,
        },
        { status: 500 }
      );
    }

    const list: PesananRow[] = (data ?? []) as PesananRow[];

    // Tempel judul dari events - DIBIKIN AMAN, kalau events error, pesanan tetep jalan
    try {
      if (list.length > 0) {
        const ids = [...new Set(list.map((p) => Number(p.event_id)).filter(Boolean))];
        if (ids.length > 0) {
          const { data: events } = await sb.from("events").select("id, judul").in("id", ids);
          const mapJudul = new Map(
            ((events ?? []) as { id: number; judul: string }[]).map((e) => [Number(e.id), e.judul])
          );
          for (const p of list) {
            p.judul = p.judul || mapJudul.get(Number(p.event_id)) || `Event ${p.event_id}`;
          }
        }
      }
    } catch (e) {
      console.warn("Gagal tempel judul dari events, tapi pesanan tetep jalan:", e);
    }

    return NextResponse.json({ ok: true, pesanan: list });
  } catch (e: unknown) {
    console.error("GET /api/pesanan catch ASLI:", e);
    return NextResponse.json(
      { ok: false, error: `Gagal ambil pesanan: ${e instanceof Error ? e.message : String(e)}` },
      { status: 500 }
    );
  }
}

// POST /api/pesanan
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const sb = supabaseAdmin();
    const nomor = String(body.nomor ?? body.id ?? Date.now());
    const nama = String(body.nama ?? "");
    const email = String(body.email ?? "");
    const eventId = Number(body.eventId ?? body.event_id ?? 0);
    const judul = String(body.judul ?? "");
    const jumlah = Number(body.jumlah ?? 1);
    const total = Number(body.total ?? 0);
    if (!nama || !eventId) return NextResponse.json({ ok: false, error: "Nama + Event ID wajib ada" }, { status: 400 });

    const { data, error } = await sb
      .from("pesanan")
      .upsert({ nomor, nama, email, event_id: eventId, judul, jumlah, total }, { onConflict: "nomor" })
      .select()
      .single();
    if (error) {
      console.error("Supabase POST pesanan error ASLI:", error);
      return NextResponse.json(
        { ok: false, error: `Supabase nolak: ${error.message} (code: ${error.code}) - ${error.details || ""}` },
        { status: 500 }
      );
    }
    return NextResponse.json({ ok: true, pesanan: data });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "Gagal" }, { status: 500 });
  }
}

// DELETE /api/pesanan?nomor=xxx
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const nomor = searchParams.get("nomor");
    if (!nomor) return NextResponse.json({ ok: false, error: "Nomor wajib ada" }, { status: 400 });
    const sb = supabaseAdmin();
    const { error } = await sb.from("pesanan").delete().eq("nomor", nomor);
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, error: e instanceof Error ? e.message : "Gagal hapus" }, { status: 500 });
  }
}