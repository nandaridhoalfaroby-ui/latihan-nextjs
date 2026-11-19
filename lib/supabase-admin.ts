import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function ambilEnv() {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "").replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  return { url, key };
}

let _client: SupabaseClient | null = null;

function buatClient(): SupabaseClient {
  if (_client) return _client;
  const { url, key } = ambilEnv();
  if (!url || !key) {
    _client = createClient("https://placeholder.supabase.co", "placeholder-key-untuk-cegah-crash", {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    (_client as any).__IS_DUMMY__ = true;
    return _client;
  }
  _client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  return _client;
}

export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = buatClient();
    const val = (client as any)[prop];
    if (typeof val === "function") return val.bind(client);
    return val;
  },
});

export function supabaseAdminSiap(): boolean {
  const { url, key } = ambilEnv();
  return Boolean(url && key && !url.includes("placeholder"));
}

// Cek apakah Supabase-nya beneran bisa dihubungi, bukan cuma env-nya ada
export async function cekKoneksiSupabase(): Promise<{ ok: boolean; kenapa: string }> {
  const { url } = ambilEnv();
  if (!url) return { ok: false, kenapa: "NEXT_PUBLIC_SUPABASE_URL kosong di .env.local" };
  try {
    const res = await fetch(`${url}/rest/v1/`, { method: "GET", signal: AbortSignal.timeout(5000) });
    // Kalau dapet 401 / 404 / 200, berarti server-nya HIDUP, cuma butuh key. Itu OK.
    return { ok: true, kenapa: "" };
  } catch (e: any) {
    const msg = String(e?.cause?.message || e?.message || "");
    if (msg.includes("ENOTFOUND") || msg.includes("getaddrinfo")) {
      return { ok: false, kenapa: `ENOTFOUND ${url} - Project Supabase tidak ketemu. Kemungkinan: project ke-PAUSED, kehapus, atau URL di .env.local salah ketik. Buka supabase.com/dashboard -> Resume project / copy ulang Project URL.` };
    }
    if (msg.includes("timeout") || msg.includes("aborted")) {
      return { ok: false, kenapa: "Koneksi ke Supabase timeout - internet lambat / Supabase lagi down. Coba lagi 1 menit." };
    }
    return { ok: false, kenapa: `Tidak bisa hubungi Supabase: ${msg}` };
  }
}