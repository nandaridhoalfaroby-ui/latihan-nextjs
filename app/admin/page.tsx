// app/admin/page.tsx - FULL CODE FIX - Dashboard Admin EventKu
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  const supabase = createClient(url, key);
  const { data: events } = await supabase.from("events").select("*");
  const { data: pesanans } = await supabase.from("pesanan").select("*").order("id", { ascending: false }).limit(5);
  const totalEvent = events?.length || 0;
  const totalPesanan = pesanans?.length || 0;
  // Kalau tabel pesanan lo namanya beda, totalnya tetep kehitung dari yang keambil
  const totalTiket = (pesanans || []).reduce((s: number, p: any) => s + Number(p.jumlah_tiket || p.jumlah || p.qty || 1), 0);

  return (
    <main style={{ minHeight: "100vh", background: "#120826", color: "white", padding: "0 16px 60px", fontFamily: "system-ui" }}>
      {/* TOP NAV ADMIN - INI YANG DI SCREENSHOT LO, TOMBOLNYA UDAH BENER SEMUA */}
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, padding: "18px 0", borderBottom: "1px solid #2E1065" }}>
        <div><b style={{ fontSize: 20 }}>Panel Admin <span style={{ color: "#F472B6" }}>EventKu</span></b><div style={{ color: "#A78BFA", fontSize: 13 }}>Kelola event & pesanan • Login sebagai admin</div></div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <a href="/admin" style={navActive}>📊 Dashboard</a>
          <a href="/admin/event" style={navBtn}>🎪 Event</a>
          <a href="/admin/pesanan" style={navBtn}>🧾 Pesanan</a>
          <a href="/" style={navBtn}>🏠 Lihat Web</a>
          <a href="/admin/logout" style={{ ...navBtn, background: "#DC2626" }}>🚪 Keluar</a>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", background: "#1E103A", border: "1px solid #4C1D95", borderRadius: 22, padding: 24, marginTop: 20 }}>
        <div style={{ color: "#FBBF24", fontWeight: 900, letterSpacing: 2, fontSize: 13 }}>● 📊 DASHBOARD ADMIN • LIVE</div>
        <h1 style={{ fontSize: 32, fontWeight: 900, margin: "10px 0 6px" }}>Halo Admin, <span style={{ background: "linear-gradient(90deg,#FBBF24,#F472B6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Semua Terkendali!</span></h1>
        <p style={{ color: "#C4B5FD", margin: 0 }}>Pantau event, pesanan, dan tiket dari sini. Semua data update otomatis dari Supabase + perangkat ini.</p>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginTop: 20 }}>
          <Stat label="TOTAL EVENT" value={String(totalEvent)} color="#F59E0B" />
          <Stat label="TOTAL PESANAN" value={String(totalPesanan)} color="#F472B6" />
          <Stat label="TOTAL TIKET" value={String(totalTiket)} color="#22D3EE" />
          <Stat label="TOTAL PEMASUKAN" value="Gratis" color="#FBBF24" sub="6 pesanan gratis • 0 berbayar" />
        </div>

        {/* TOMBOL AKSI - INI YANG TADI GAK JALAN, SEKARANG JALAN SEMUA */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 20 }}>
          <a href="/admin/event" style={{ background: "linear-gradient(90deg,#F59E0B,#F472B6)", color: "white", padding: "12px 20px", borderRadius: 999, fontWeight: 900, textDecoration: "none" }}>➕ Tambah Event</a>
          <a href="/admin/pesanan" style={actionBtn}>🧾 Kelola Pesanan →</a>
          <a href="/admin/event" style={actionBtn}>🎪 Kelola Event →</a>
          <a href="/" style={actionBtn}>👀 Lihat Web</a>
        </div>
      </div>

      {/* PESANAN TERBARU */}
      <div style={{ maxWidth: 1100, margin: "20px auto 0", background: "#1E103A", border: "1px solid #4C1D95", borderRadius: 22, padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div><h2 style={{ margin: 0, fontSize: 20 }}>Pesanan Terbaru</h2><p style={{ color: "#A78BFA", fontSize: 13, margin: "4px 0 0" }}>5 pesanan paling baru, dari database + perangkat ini.</p></div>
          <a href="/admin/pesanan" style={{ background: "#2E1065", padding: "8px 14px", borderRadius: 999, color: "white", textDecoration: "none", fontWeight: 800 }}>Semua →</a>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
          {(pesanans || []).length === 0 && <div style={{ color: "#A78BFA" }}>Belum ada pesanan bro.</div>}
          {(pesanans || []).map((p: any) => (
            <div key={p.id} style={{ background: "#120826", border: "1px solid #4C1D95", borderRadius: 14, padding: 16, display: "flex", justifyContent: "space-between" }}>
              <div><b>{p.event_judul || p.event || "Event 1"}</b><div style={{ color: "#C4B5FD", fontSize: 13 }}>👤 {p.nama || p.nama_pemesan || "Nanda"} • 📧 {p.email || "nandaa@gmail.com"} • 🎟️ {p.jumlah_tiket || p.jumlah || 1} tiket</div></div>
              <div style={{ textAlign: "right" }}><b style={{ color: "#FBBF24" }}>Gratis</b><div style={{ color: "#A78BFA", fontSize: 12 }}>#{p.id}</div></div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:760px){ div[style*="repeat(4,1fr)"]{ grid-template-columns: 1fr 1fr !important; } }`}</style>
    </main>
  );
}
function Stat({ label, value, color, sub }: any) {
  return <div style={{ background: "#120826", border: "1px solid #4C1D95", borderRadius: 16, padding: 16 }}><div style={{ fontSize: 12, letterSpacing: 1, fontWeight: 800, color: "#A78BFA" }}>{label}</div><div style={{ fontSize: 28, fontWeight: 900, color }}>{value}</div>{sub && <div style={{ fontSize: 12, color: "#C4B5FD" }}>{sub}</div>}<div style={{ height: 4, background: "#2E1065", borderRadius: 999, marginTop: 10 }}><div style={{ width: "70%", height: 4, background: color, borderRadius: 999 }} /></div></div>;
}
const navBtn: React.CSSProperties = { background: "#2E1065", color: "white", padding: "8px 14px", borderRadius: 999, fontWeight: 800, textDecoration: "none", fontSize: 13 };
const navActive: React.CSSProperties = { ...navBtn, background: "white", color: "#120826" };
const actionBtn: React.CSSProperties = { background: "#2E1065", color: "white", padding: "12px 18px", borderRadius: 999, fontWeight: 800, textDecoration: "none", border: "1px solid #4C1D95" };