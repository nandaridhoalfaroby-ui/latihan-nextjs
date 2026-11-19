import { supabase } from "@/lib/supabase";
import type { Event } from "./events";

export async function ambilEvents(): Promise<Event[]> {
  const { data, error } = await supabase.from("events").select("*").order("id", { ascending: true });
  if (error) return [];
  return (data ?? []) as Event[];
}

export async function ambilEvent(id: number): Promise<Event | null> {
  if (!Number.isFinite(id)) return null;
  const { data, error } = await supabase.from("events").select("*").eq("id", id).single();
  if (error || !data) return null;
  return data as Event;
}

// INI YANG HILANG KEMARIN, MAKANYA EventTerkait.tsx MERAH ts(2305)
// Ambil event lain yang kategorinya sama, tapi bukan event yang lagi dibuka
export async function ambilEventTerkait(id: number, kategori: string): Promise<Event[]> {
  if (!Number.isFinite(id) || !kategori) return [];
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("kategori", kategori)
    .neq("id", id)
    .order("id", { ascending: true })
    .limit(3);
  if (error) return [];
  return (data ?? []) as Event[];
}

export async function ambilPesanan(): Promise<any[]> {
  const { data, error } = await supabase
    .from("pesanan")
    .select("*, events(judul)")
    .order("nomor", { ascending: false });
  if (error) return [];
  return data ?? [];
}