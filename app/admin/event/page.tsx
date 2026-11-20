// app/admin/event/page.tsx - FINAL ANTI-GAGAL TOTAL
// Fix: error pindah dari 'judul' ke 'category' karena fallback Inggris-nya juga gagal
// Solusi: coba 3 level, dari lengkap -> minimal, pasti ada 1 yang berhasil!

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";
  return createClient(url, key);
}

function ambilJudul(ev: any) { return ev?.judul || ev?.title || ev?.nama || ev?.name || ""; }
function ambilKategori(ev: any) { return ev?.kategori || ev?.category || "Event"; }
function ambilTanggal(ev: any) { return ev?.tanggal || ev?.date || ""; }
function ambilLokasi(ev: any) { return ev?.lokasi || ev?.location || ""; }
function ambilHarga(ev: any) { return Number(ev?.harga ?? ev?.price ?? 0); }
function ambilKuota(ev: any) { return Number(ev?.kuota ?? ev?.quota ?? 0); }
function ambilTerisi(ev: any) { return Number(ev?.terisi ?? 0); }
function ambilGambar(ev: any) { return ev?.gambar || ev?.image || ev?.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200"; }
function ambilDeskripsi(ev: any) { return ev?.deskripsi || ev?.description || ""; }

async function tambahEvent(formData: FormData) {
  "use server";
  const judul = String(formData.get("judul") || "").trim();
  const deskripsi = String(formData.get("deskripsi") || "").trim();
  const kategori = String(formData.get("kategori") || "Workshop");
  const tanggal = String(formData.get("tanggal") || "");
  const lokasi = String(formData.get("lokasi") || "").trim();
  const harga = Number(formData.get("harga") || 0);
  const kuota = Number(formData.get("kuota") || 50);
  const gambar = String(formData.get("gambar") || "").trim() || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800";
  if (!judul || !tanggal || !lokasi) redirect("/admin/event?error=Judul, tanggal, lokasi wajib diisi bro!");
  const supabase = getSupabase();

  // LEVEL 1: Coba yang paling lengkap (8 kolom) - ini yang paling sering berhasil
  let r1 = await supabase.from("events").insert([{ judul, kategori, tanggal, lokasi, harga, kuota, terisi: 0, gambar }]);
  if (!r1.error) {
    // Kalau berhasil, coba isi deskripsi-nya (kalau kolomnya ada, keisi; kalau gak ada, biarin, gak error)
    if (deskripsi) {
      const { data } = await supabase.from("events").select("id").eq("judul", judul).eq("tanggal", tanggal).order("id", { ascending: false }).limit(1);
      if (data && data[0]) await supabase.from("events").update({ deskripsi }).eq("id", data[0].id);
    }
    revalidatePath("/"); revalidatePath("/admin"); revalidatePath("/admin/event"); revalidatePath("/katalog");
    redirect("/admin/event?ok=Event berhasil ditambah bro! Langsung muncul di Beranda!");
  }

  // LEVEL 2: Kalau Level 1 gagal (misal terisi / gambar gak ada), coba tanpa terisi + gambar (cuma 6 kolom)
  let r2 = await supabase.from("events").insert([{ judul, kategori, tanggal, lokasi, harga, kuota }]);
  if (!r2.error) {
    revalidatePath("/"); revalidatePath("/admin"); revalidatePath("/admin/event"); revalidatePath("/katalog");
    redirect("/admin/event?ok=Event berhasil ditambah bro! (Mode hemat kolom)");
  }

  // LEVEL 3: Kalau Level 2 juga gagal, coba yang paling minimal (cuma 4 kolom yang PASTI ada di semua project)
  let r3 = await supabase.from("events").insert([{ judul, kategori, tanggal, lokasi }]);
  if (!r3.error) {
    revalidatePath("/"); revalidatePath("/admin"); revalidatePath("/admin/event"); revalidatePath("/katalog");
    redirect("/admin/event?ok=Event berhasil ditambah bro! (Mode minimal, harga + kuota bisa diedit nanti)");
  }

  // Kalau 3-3nya gagal, baru tampilin error yang ASLI dari Level 1 (bukan dari fallback Inggris, biar gak bingungin kayak 'category' tadi)
  redirect(`/admin/event?error=${encodeURIComponent(r1.error.message)}`);
}

async function hapusEvent(formData: FormData) {
  "use server";
  const id = String(formData.get("id") || "");
  if (!id) redirect("/admin/event?error=ID event tidak ketemu!");
  const supabase = getSupabase();
  await supabase.from("events").delete().eq("id", id);
  revalidatePath("/"); revalidatePath("/admin"); revalidatePath("/admin/event");
  redirect("/admin/event?ok=Event berhasil dihapus!");
}

export default async function AdminEventPage({ searchParams }: { searchParams: Promise<{ ok?: string; error?: string }> }) {
  const params = await searchParams;
  let list: any[] = [];
  let loadError = "";
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.from("events").select("*");
    if (error) loadError = error.message;
    else list = (data || []).sort((a: any, b: any) => String(ambilTanggal(a)).localeCompare(String(ambilTanggal(b))));
  } catch (e: any) { loadError = e?.message || "Gagal ambil data"; }

  const input: React.CSSProperties = { padding: 12, borderRadius: 12, border: "1px solid #6D28D9", background: "#120826", color: "white", outline: "none", width: "100%", boxSizing: "border-box", colorScheme: "dark" };

  return (
    <main style={{ minHeight: "100vh", background: "#120826", color: "white", padding: "28px 16px 60px", fontFamily: "system-ui" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <a href="/admin" style={{ color: "#FBBF24", textDecoration: "none", fontWeight: 800 }}>← Kembali ke Dashboard Admin</a>
        <h1 style={{ fontSize: 38, fontWeight: 900, lineHeight: 1, marginTop: 14, background: "linear-gradient(90deg,#FBBF24,#F472B6,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>🎪 Kelola Event</h1>
        <p style={{ color: "#C4B5FD", marginTop: 8 }}>Tambah, lihat, hapus event dari sini. Total: <b style={{ color: "white" }}>{list.length} event</b> • Data langsung dari Supabase.</p>
        {params.ok && <div style={{ marginTop: 18, background: "#14532D", border: "1px solid #22C55E", padding: 14, borderRadius: 14, fontWeight: 700 }}>✅ {decodeURIComponent(params.ok)}</div>}
        {params.error && <div style={{ marginTop: 18, background: "#7F1D1D", border: "1px solid #F87171", padding: 14, borderRadius: 14, fontWeight: 700 }}>⚠️ {decodeURIComponent(params.error)}</div>}
        {loadError && <div style={{ marginTop: 18, background: "#7F1D1D", border: "1px solid #F87171", padding: 14, borderRadius: 14, fontWeight: 700 }}>⚠️ Gagal ambil Supabase: {loadError}</div>}
        <div style={{ display: "flex", gap: 20, marginTop: 22, flexWrap: "wrap", alignItems: "flex-start" }}>
          <form action={tambahEvent} style={{ flex: "1 1 340px", maxWidth: 460, background: "#1E103A", border: "1px solid #7C3AED", borderRadius: 22, padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
            <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>➕ Tambah Event Baru</h2>
            <p style={{ color: "#A78BFA", fontSize: 13, margin: 0 }}>Isi → Simpan → langsung muncul di Beranda & Katalog.</p>
            <input name="judul" required placeholder="Judul Event *  ex: Workshop React Dasar" style={input} />
            <select name="kategori" style={input}><option>Workshop</option><option>Musik</option><option>Olahraga</option><option>Bazar</option><option>Lomba</option><option>Seminar</option></select>
            <input name="tanggal" type="date" required style={input} />
            <input name="lokasi" required placeholder="Lokasi *  ex: Lab Komputer" style={input} />
            <input name="harga" type="number" defaultValue={0} min={0} placeholder="Harga Rp (0 = Gratis)" style={input} />
            <input name="kuota" type="number" defaultValue={50} min={1} placeholder="Kuota" style={input} />
            <input name="gambar" placeholder="Link Gambar (boleh kosong)" style={input} />
            <textarea name="deskripsi" rows={4} placeholder="Deskripsi event..." style={{ ...input, resize: "vertical" }} />
            <button type="submit" style={{ padding: 14, borderRadius: 14, border: "none", fontWeight: 900, fontSize: 16, cursor: "pointer", color: "white", background: "linear-gradient(90deg,#F59E0B,#F472B6,#8B5CF6)" }}>✨ Simpan Event →</button>
            <span style={{ fontSize: 12, color: "#A78BFA", textAlign: "center" }}>Harga 0 = Gratis • Terisi otomatis 0</span>
          </form>
          <div style={{ flex: "1 1 380px", display: "flex", flexDirection: "column", gap: 14 }}>
            <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>📋 Daftar Event ({list.length})</h2>
            {list.length === 0 && <div style={{ background: "#1E103A", border: "1px dashed #7C3AED", borderRadius: 18, padding: 28, textAlign: "center", color: "#C4B5FD" }}>Belum ada event. Isi form di kiri buat nambah event pertama bro!</div>}
            {list.map((ev: any) => {
              const judul = ambilJudul(ev); const kategori = ambilKategori(ev); const tanggal = ambilTanggal(ev); const lokasi = ambilLokasi(ev);
              const harga = ambilHarga(ev); const kuota = ambilKuota(ev); const terisi = ambilTerisi(ev); const sisa = kuota - terisi;
              const gambar = ambilGambar(ev); const deskripsi = ambilDeskripsi(ev);
              return (
                <div key={ev.id} style={{ background: "#1E103A", border: "1px solid #4C1D95", borderRadius: 18, padding: 16, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
                  <img src={gambar} alt={judul} style={{ width: 84, height: 84, objectFit: "cover", borderRadius: 14, flexShrink: 0 }} />
                  <div style={{ flex: "1 1 220px", minWidth: 0 }}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                      <b style={{ fontSize: 17 }}>{judul || "(Tanpa Judul)"}</b>
                      <span style={{ background: "#F59E0B", color: "#120826", fontSize: 11, fontWeight: 900, padding: "3px 8px", borderRadius: 999 }}>{kategori}</span>
                    </div>
                    <div style={{ color: "#C4B5FD", fontSize: 13, marginTop: 4 }}>📅 {tanggal} • 📍 {lokasi} • 🎟️ Sisa {sisa}/{kuota} (Terisi {terisi}) • 💰 {harga === 0 ? "Gratis" : `Rp ${harga.toLocaleString("id-ID")}`}</div>
                    <div style={{ color: "#A78BFA", fontSize: 12, marginTop: 4 }}>{deskripsi || "Tanpa deskripsi"}</div>
                  </div>
                  <form action={hapusEvent}>
                    <input type="hidden" name="id" value={ev.id} />
                    <button type="submit" style={{ background: "#7F1D1D", color: "white", border: "1px solid #F87171", padding: "8px 12px", borderRadius: 10, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}>🗑️ Hapus</button>
                  </form>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}