// app/event/page.tsx - KATALOG EVENT - VERSI PALING AMPUH (SERVER, BUKAN CLIENT!)
// Fix: Katalog 0 event padahal Admin 6 event
// Penyebab: Katalog lama pake NEXT_PUBLIC_ANON_KEY (publik, kena RLS + Invalid API key)
// Solusi: Katalog baru pake SERVER + SECRET_KEY (kayak Admin), bypass RLS, PASTI muncul!

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

function ambilJudul(ev: any) { return ev?.judul || ev?.title || ev?.nama || ev?.name || "(Tanpa Judul)"; }
function ambilKategori(ev: any) { return ev?.kategori || ev?.category || "Event"; }
function ambilTanggal(ev: any) { return ev?.tanggal || ev?.date || ""; }
function ambilLokasi(ev: any) { return ev?.lokasi || ev?.location || ""; }
function ambilHarga(ev: any) { return Number(ev?.harga ?? ev?.price ?? 0); }
function ambilKuota(ev: any) { return Number(ev?.kuota ?? ev?.quota ?? 0); }
function ambilTerisi(ev: any) { return Number(ev?.terisi ?? 0); }
function ambilGambar(ev: any) { return ev?.gambar || ev?.image || ev?.image_url || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800"; }
function ambilDeskripsi(ev: any) { return ev?.deskripsi || ev?.description || ""; }

export default async function KatalogEventPage({ searchParams }: { searchParams: Promise<{ q?: string; kategori?: string }> }) {
  const params = await searchParams;
  const q = (params.q || "").toLowerCase();
  const filterKategori = params.kategori || "Semua";

  let list: any[] = [];
  let loadError = "";
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.from("events").select("*");
    if (error) loadError = error.message;
    else list = data || [];
  } catch (e: any) { loadError = e?.message || "Gagal ambil data"; }

  // Filter di server (biar search + kategori langsung jalan, gak perlu JS client)
  let tampil = list.filter((ev: any) => {
    const judul = ambilJudul(ev).toLowerCase();
    const kategori = ambilKategori(ev);
    const lokasi = ambilLokasi(ev).toLowerCase();
    if (filterKategori !== "Semua" && kategori !== filterKategori) return false;
    if (q && !judul.includes(q) && !lokasi.includes(q) && !kategori.toLowerCase().includes(q)) return false;
    return true;
  });
  tampil = tampil.sort((a: any, b: any) => String(ambilTanggal(a)).localeCompare(String(ambilTanggal(b))));

  const totalGratis = tampil.filter((ev: any) => ambilHarga(ev) === 0).length;
  const kategoris = ["Semua", "Workshop", "Olahraga", "Musik", "Bazar", "Lomba", "Seminar"];

  return (
    <main style={{ minHeight: "100vh", background: "#120826", color: "white", padding: "28px 16px 60px", fontFamily: "system-ui" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* HEADER KATALOG - SAMA KAYAK SCREENSHOT LO, TAPI ANGKA-NYA UDAH BENER */}
        <div style={{ background: "linear-gradient(135deg,#1E103A,#4C1D95,#7C3AED)", borderRadius: 24, padding: 32, position: "relative", overflow: "hidden" }}>
          <span style={{ background: "#F59E0B", color: "#120826", fontSize: 11, fontWeight: 900, padding: "5px 10px", borderRadius: 999 }}>🎪 KATALOG EVENT • {tampil.length} EVENT</span>
          <span style={{ position: "absolute", top: 16, right: 16, background: "#F472B6", fontSize: 11, fontWeight: 900, padding: "5px 10px", borderRadius: 999 }}>● LIVE!</span>
          <h1 style={{ fontSize: 44, fontWeight: 900, lineHeight: 1.05, margin: "16px 0 0" }}>Cari Event Seru,<br /><span style={{ background: "linear-gradient(90deg,#FBBF24,#F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Pesan</span> & <span style={{ color: "white" }}>Hadir!</span></h1>
          <p style={{ color: "#C4B5FD", marginTop: 12 }}>Semua event sekolah dalam satu tempat — dari Supabase, update real-time. Tinggal cari, klik, pesan!</p>

          {/* SEARCH - PAKE FORM BIAR JALAN TANPA JS CLIENT */}
          <form action="/event" method="get" style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
            <input name="q" defaultValue={params.q || ""} placeholder="Cari event, misal: Futsal, Musik, Workshop..." style={{ flex: "1 1 280px", padding: 14, borderRadius: 999, border: "1px solid #7C3AED", background: "#120826", color: "white", outline: "none" }} />
            <select name="kategori" defaultValue={filterKategori} style={{ padding: 14, borderRadius: 999, border: "1px solid #7C3AED", background: "#120826", color: "white" }}>
              {kategoris.map((k) => <option key={k} value={k}>{k === "Semua" ? "Semua Kategori" : k}</option>)}
            </select>
            <button type="submit" style={{ padding: "14px 22px", borderRadius: 999, border: "none", fontWeight: 900, cursor: "pointer", color: "white", background: "linear-gradient(90deg,#F59E0B,#F472B6)" }}>🔍 Cari</button>
          </form>

          <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
            <span style={{ background: "#2E1065", padding: "6px 12px", borderRadius: 999, fontSize: 13 }}>🎟️ {tampil.length} Event Tersedia</span>
            <span style={{ background: "#2E1065", padding: "6px 12px", borderRadius: 999, fontSize: 13 }}>🆓 {totalGratis} Gratis</span>
            <span style={{ background: "#2E1065", padding: "6px 12px", borderRadius: 999, fontSize: 13 }}>⚡ Update dari Supabase</span>
          </div>
        </div>

        {/* TOMBOL KATEGORI */}
        <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
          {kategoris.map((k) => (
            <a key={k} href={`/event?kategori=${k}${q ? `&q=${q}` : ""}`} style={{ padding: "8px 16px", borderRadius: 999, fontWeight: 800, fontSize: 13, textDecoration: "none", color: filterKategori === k ? "white" : "#C4B5FD", background: filterKategori === k ? "linear-gradient(90deg,#F59E0B,#F472B6)" : "#1E103A", border: "1px solid #4C1D95" }}>{k === "Semua" ? "🏠 Semua" : `🎪 ${k}`}</a>
          ))}
        </div>

        <p style={{ color: "#C4B5FD", marginTop: 16 }}>Menampilkan <b style={{ color: "#FBBF24" }}>{tampil.length} event</b> {filterKategori !== "Semua" ? `kategori ${filterKategori}` : ""} {q ? `untuk "${q}"` : ""}</p>

        {loadError && <div style={{ marginTop: 16, background: "#7F1D1D", border: "1px solid #F87171", padding: 14, borderRadius: 14, fontWeight: 700 }}>⚠️ Gagal ambil Supabase: {loadError} • Cek SUPABASE_SECRET_KEY di Vercel bro!</div>}

        {/* DAFTAR EVENT */}
        {tampil.length === 0 ? (
          <div style={{ marginTop: 20, background: "#1E103A", border: "1px dashed #7C3AED", borderRadius: 18, padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 40 }}>🔍</div>
            <b style={{ fontSize: 18 }}>Event tidak ditemukan</b>
            <p style={{ color: "#A78BFA", fontSize: 13 }}>Coba kata kunci atau kategori lain.</p>
            <a href="/event" style={{ display: "inline-block", marginTop: 10, background: "linear-gradient(90deg,#F59E0B,#F472B6)", color: "white", padding: "10px 20px", borderRadius: 999, fontWeight: 900, textDecoration: "none" }}>Tampilkan Semua Event</a>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 20 }}>
            {tampil.map((ev: any) => {
              const judul = ambilJudul(ev); const kategori = ambilKategori(ev); const tanggal = ambilTanggal(ev); const lokasi = ambilLokasi(ev);
              const harga = ambilHarga(ev); const kuota = ambilKuota(ev); const terisi = ambilTerisi(ev); const sisa = kuota - terisi;
              const gambar = ambilGambar(ev); const deskripsi = ambilDeskripsi(ev);
              return (
                <a key={ev.id} href={`/event/${ev.id}`} style={{ textDecoration: "none", color: "white", background: "#1E103A", border: "1px solid #4C1D95", borderRadius: 20, overflow: "hidden", display: "block" }}>
                  <div style={{ position: "relative" }}>
                    <img src={gambar} alt={judul} style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }} />
                    <span style={{ position: "absolute", top: 12, right: 12, background: harga === 0 ? "#22C55E" : "#F59E0B", color: "#120826", fontSize: 12, fontWeight: 900, padding: "5px 10px", borderRadius: 999 }}>{harga === 0 ? "GRATIS" : `Rp ${harga.toLocaleString("id-ID")}`}</span>
                    <span style={{ position: "absolute", top: 12, left: 12, background: "#120826", fontSize: 11, fontWeight: 900, padding: "5px 10px", borderRadius: 999 }}>{kategori}</span>
                  </div>
                  <div style={{ padding: 18 }}>
                    <b style={{ fontSize: 18, lineHeight: 1.3, display: "block" }}>{judul}</b>
                    <div style={{ color: "#C4B5FD", fontSize: 13, marginTop: 8 }}>📅 {tanggal} • 📍 {lokasi}</div>
                    <div style={{ color: "#A78BFA", fontSize: 12, marginTop: 6 }}>{deskripsi || "Tanpa deskripsi"}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
                      <span style={{ fontSize: 13, color: "#C4B5FD" }}>🎟️ Sisa {sisa}/{kuota}</span>
                      <span style={{ background: "linear-gradient(90deg,#F59E0B,#F472B6)", padding: "8px 14px", borderRadius: 999, fontWeight: 900, fontSize: 13 }}>Lihat →</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* BANNER BAWAH - SAMA KAYAK SCREENSHOT LO */}
        <div style={{ marginTop: 28, background: "linear-gradient(90deg,#8B5CF6,#F472B6,#F59E0B)", borderRadius: 20, padding: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div><div style={{ fontSize: 12, fontWeight: 900, letterSpacing: 1 }}>⚡ JANGAN DITUNDA</div><b style={{ fontSize: 20 }}>Jangan Sampai Kehabisan Tiket! 🎟️</b><div style={{ fontSize: 13, opacity: 0.9 }}>Event favorit kamu bisa habis kapan aja. Cek sekarang, pesan sekarang.</div></div>
          <a href="/event" style={{ background: "#120826", color: "white", padding: "12px 20px", borderRadius: 999, fontWeight: 900, textDecoration: "none" }}>Lihat Event →</a>
        </div>
      </div>
    </main>
  );
}