// app/admin/event/page.tsx - FULL CODE FIX
// Halaman Kelola + Tambah Event - Semua tombol Event di Admin nyangkut ke sini
// Jadi: Event, Tambah Event, Kelola Event -> semuanya jalan, bukan hiasan!

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

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

// --- TAMBAH EVENT ---
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
  if (!judul || !tanggal || !lokasi) redirect("/admin/event?error=Judul, tanggal, lokasi wajib diisi!");
  const supabase = getSupabase();
  const { error } = await supabase.from("events").insert([{ judul, deskripsi, kategori, tanggal, lokasi, harga, kuota, gambar, sisa_kuota: kuota }]);
  if (error) redirect(`/admin/event?error=${encodeURIComponent(error.message)}`);
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/event");
  revalidatePath("/katalog");
  redirect("/admin/event?ok=Event berhasil ditambah bro! Langsung muncul di Beranda!");
}

// --- HAPUS EVENT ---
async function hapusEvent(formData: FormData) {
  "use server";
  const id = String(formData.get("id") || "");
  if (!id) return;
  const supabase = getSupabase();
  await supabase.from("events").delete().eq("id", id);
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/event");
  redirect("/admin/event?ok=Event berhasil dihapus!");
}

export default async function AdminEventPage({ searchParams }: { searchParams: Promise<{ ok?: string; error?: string }> }) {
  const params = await searchParams;
  const supabase = getSupabase();
  const { data: events } = await supabase.from("events").select("*").order("tanggal", { ascending: true });

  const list = events || [];

  return (
    <main style={{ minHeight: "100vh", background: "#120826", color: "white", padding: "28px 16px 60px", fontFamily: "system-ui" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* HEADER */}
        <a href="/admin" style={{ color: "#FBBF24", textDecoration: "none", fontWeight: 800 }}>← Kembali ke Dashboard Admin</a>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 12, marginTop: 14 }}>
          <div>
            <h1 style={{ fontSize: 38, fontWeight: 900, lineHeight: 1, background: "linear-gradient(90deg,#FBBF24,#F472B6,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>🎪 Kelola Event</h1>
            <p style={{ color: "#C4B5FD", marginTop: 8 }}>Tambah, lihat, hapus event dari sini. Total: <b style={{ color: "white" }}>{list.length} event</b> • Data langsung dari Supabase.</p>
          </div>
          <a href="/" style={{ background: "white", color: "#120826", padding: "10px 18px", borderRadius: 999, fontWeight: 800, textDecoration: "none" }}>👀 Lihat Web →</a>
        </div>

        {params.ok && <div style={{ marginTop: 18, background: "#14532D", border: "1px solid #22C55E", padding: 14, borderRadius: 14, fontWeight: 700 }}>✅ {decodeURIComponent(params.ok)}</div>}
        {params.error && <div style={{ marginTop: 18, background: "#7F1D1D", border: "1px solid #F87171", padding: 14, borderRadius: 14, fontWeight: 700 }}>⚠️ {decodeURIComponent(params.error)}</div>}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 20, marginTop: 22 }}>
          {/* FORM TAMBAH - KIRI */}
          <form action={tambahEvent} style={{ background: "#1E103A", border: "1px solid #7C3AED", borderRadius: 22, padding: 22, display: "flex", flexDirection: "column", gap: 14, height: "fit-content", position: "sticky", top: 20 }}>
            <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>➕ Tambah Event Baru</h2>
            <p style={{ color: "#A78BFA", fontSize: 13, margin: 0 }}>Isi → Simpan → langsung muncul di Beranda & Katalog.</p>
            <input name="judul" required placeholder="Judul Event *  ex: Workshop React Dasar" style={inputStyle} />
            <select name="kategori" style={inputStyle}><option>Workshop</option><option>Musik</option><option>Olahraga</option><option>Bazar</option><option>Seminar</option></select>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <input name="tanggal" type="date" required style={inputStyle} />
              <input name="lokasi" required placeholder="Lokasi *" style={inputStyle} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <input name="harga" type="number" defaultValue={0} min={0} placeholder="Harga Rp" style={inputStyle} />
              <input name="kuota" type="number" defaultValue={50} min={1} placeholder="Kuota" style={inputStyle} />
            </div>
            <input name="gambar" placeholder="Link Gambar (boleh kosong)" style={inputStyle} />
            <textarea name="deskripsi" rows={4} placeholder="Deskripsi event..." style={{ ...inputStyle, resize: "vertical" }} />
            <button type="submit" style={{ padding: 14, borderRadius: 14, border: "none", fontWeight: 900, fontSize: 16, cursor: "pointer", color: "white", background: "linear-gradient(90deg,#F59E0B,#F472B6,#8B5CF6)" }}>✨ Simpan Event →</button>
            <span style={{ fontSize: 12, color: "#A78BFA", textAlign: "center" }}>Harga 0 = Gratis • Kuota otomatis jadi sisa kuota</span>
          </form>

          {/* DAFTAR EVENT - KANAN */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>📋 Daftar Event ({list.length})</h2>
            {list.length === 0 && <div style={{ background: "#1E103A", border: "1px dashed #7C3AED", borderRadius: 18, padding: 28, textAlign: "center", color: "#C4B5FD" }}>Belum ada event. Isi form di kiri buat nambah event pertama bro!</div>}
            {list.map((ev: any) => (
              <div key={ev.id} style={{ background: "#1E103A", border: "1px solid #4C1D95", borderRadius: 18, padding: 16, display: "flex", gap: 14, alignItems: "center" }}>
                <img src={ev.gambar || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200"} alt={ev.judul} style={{ width: 84, height: 84, objectFit: "cover", borderRadius: 14, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                    <b style={{ fontSize: 17 }}>{ev.judul}</b>
                    <span style={{ background: "#F59E0B", color: "#120826", fontSize: 11, fontWeight: 900, padding: "3px 8px", borderRadius: 999 }}>{ev.kategori}</span>
                  </div>
                  <div style={{ color: "#C4B5FD", fontSize: 13, marginTop: 4 }}>📅 {ev.tanggal} • 📍 {ev.lokasi} • 🎟️ {ev.sisa_kuota ?? ev.kuota}/{ev.kuota} • 💰 {Number(ev.harga) === 0 ? "Gratis" : `Rp ${Number(ev.harga).toLocaleString("id-ID")}`}</div>
                  <div style={{ color: "#A78BFA", fontSize: 12, marginTop: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ev.deskripsi || "Tanpa deskripsi"}</div>
                </div>
                <form action={hapusEvent} onSubmit={(e) => { if (!confirm(`Hapus event "${ev.judul}"?`)) e.preventDefault(); }}>
                  <input type="hidden" name="id" value={ev.id} />
                  <button type="submit" style={{ background: "#7F1D1D", color: "white", border: "1px solid #F87171", padding: "8px 12px", borderRadius: 10, fontWeight: 800, cursor: "pointer", whiteSpace: "nowrap" }}>🗑️ Hapus</button>
                </form>
              </div>
            ))}
          </div>
        </div>

        <style>{`@media(max-width: 860px){ div[style*="grid-template-columns: 1fr 1.2fr"]{ grid-template-columns: 1fr !important; } }`}</style>
      </div>
    </main>
  );
}

const inputStyle: React.CSSProperties = { padding: 12, borderRadius: 12, border: "1px solid #6D28D9", background: "#120826", color: "white", outline: "none", width: "100%", boxSizing: "border-box", colorScheme: "dark" };