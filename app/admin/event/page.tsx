// app/admin/event/page.tsx
// Halaman Tambah Event Baru - EventKu
// Dibuka dari: /admin -> tombol Tambah Event -> ke sini /admin/event

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";

// --- Server Action: Simpan Event Baru ke Supabase ---
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

  if (!judul || !tanggal || !lokasi) {
    redirect("/admin/event?error=Judul, tanggal, dan lokasi wajib diisi bro!");
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";

  if (!supabaseUrl || !supabaseKey) {
    redirect("/admin/event?error=Env Supabase belum diisi di Vercel bro!");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error } = await supabase.from("events").insert([
    {
      judul,
      deskripsi,
      kategori,
      tanggal,
      lokasi,
      harga,
      kuota,
      gambar,
      sisa_kuota: kuota,
    },
  ]);

  if (error) {
    redirect(`/admin/event?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/katalog");
  redirect("/admin?ok=Event berhasil ditambah bro!");
}

// --- Halaman-nya ---
export default async function AdminTambahEventPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  // Cek login: kalau belum login, lempar ke /admin dulu
  const cookieStore = await cookies();
  const isLogin =
    cookieStore.get("eventku_admin")?.value === "1" ||
    cookieStore.get("admin_session")?.value === "1" ||
    cookieStore.get("admin")?.value === "1";

  // Kalau lo mau langsung bisa buka tanpa login buat ngetes, hapus 3 baris di bawah ini.
  // Tapi buat aman, biarin aja: harus login dulu di /admin
  if (!isLogin) {
    redirect("/admin");
  }

  const params = await searchParams;
  const errorMsg = params.error || "";

  return (
    <main style={{ minHeight: "100vh", background: "#120826", color: "white", padding: "32px 16px", fontFamily: "system-ui" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {/* Header */}
        <a href="/admin" style={{ color: "#FBBF24", textDecoration: "none", fontWeight: 700 }}>← Kembali ke Admin</a>
        <h1 style={{ fontSize: 36, fontWeight: 900, marginTop: 16, background: "linear-gradient(90deg,#FBBF24,#F472B6,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          ➕ Tambah Event Baru
        </h1>
        <p style={{ color: "#C4B5FD", marginTop: 8 }}>Isi form di bawah, event langsung muncul di Beranda + Katalog.</p>

        {errorMsg && (
          <div style={{ marginTop: 20, background: "#7F1D1D", border: "1px solid #F87171", padding: 14, borderRadius: 14 }}>
            ⚠️ {decodeURIComponent(errorMsg)}
          </div>
        )}

        {/* FORM - INI YANG BIKIN /admin/event JADI BISA DIBUKA */}
        <form
          action={tambahEvent}
          style={{ marginTop: 24, background: "#1E103A", border: "1px solid #4C1D95", borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}
        >
          <label style={{ display: "flex", flexDirection: "column", gap: 6, fontWeight: 700 }}>
            Judul Event *
            <input name="judul" required placeholder="Contoh: Workshop React Dasar" style={{ padding: 12, borderRadius: 12, border: "1px solid #6D28D9", background: "#120826", color: "white", outline: "none" }} />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6, fontWeight: 700 }}>
            Kategori
            <select name="kategori" style={{ padding: 12, borderRadius: 12, border: "1px solid #6D28D9", background: "#120826", color: "white" }}>
              <option>Workshop</option>
              <option>Musik</option>
              <option>Olahraga</option>
              <option>Bazar</option>
              <option>Seminar</option>
            </select>
          </label>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, fontWeight: 700 }}>
              Tanggal *
              <input name="tanggal" type="date" required style={{ padding: 12, borderRadius: 12, border: "1px solid #6D28D9", background: "#120826", color: "white", colorScheme: "dark" }} />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, fontWeight: 700 }}>
              Lokasi *
              <input name="lokasi" required placeholder="Lab Komputer" style={{ padding: 12, borderRadius: 12, border: "1px solid #6D28D9", background: "#120826", color: "white" }} />
            </label>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, fontWeight: 700 }}>
              Harga (Rp, 0 = Gratis)
              <input name="harga" type="number" defaultValue={0} min={0} style={{ padding: 12, borderRadius: 12, border: "1px solid #6D28D9", background: "#120826", color: "white" }} />
            </label>
            <label style={{ display: "flex", flexDirection: "column", gap: 6, fontWeight: 700 }}>
              Kuota
              <input name="kuota" type="number" defaultValue={50} min={1} style={{ padding: 12, borderRadius: 12, border: "1px solid #6D28D9", background: "#120826", color: "white" }} />
            </label>
          </div>

          <label style={{ display: "flex", flexDirection: "column", gap: 6, fontWeight: 700 }}>
            Link Gambar (boleh kosong, nanti pake gambar default)
            <input name="gambar" placeholder="https://..." style={{ padding: 12, borderRadius: 12, border: "1px solid #6D28D9", background: "#120826", color: "white" }} />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6, fontWeight: 700 }}>
            Deskripsi
            <textarea name="deskripsi" rows={4} placeholder="Ceritain event-nya bro..." style={{ padding: 12, borderRadius: 12, border: "1px solid #6D28D9", background: "#120826", color: "white", resize: "vertical" }} />
          </label>

          <button type="submit" style={{ padding: "14px", borderRadius: 14, border: "none", fontWeight: 900, fontSize: 16, cursor: "pointer", color: "white", background: "linear-gradient(90deg,#F59E0B,#F472B6,#8B5CF6)" }}>
            ✨ Simpan Event → Muncul di Beranda
          </button>
        </form>

        <p style={{ marginTop: 16, color: "#A78BFA", fontSize: 13, textAlign: "center" }}>
          Kalau abis Simpan tapi balik ke /admin dan event belum muncul, klik Refresh (Ctrl + Shift + R) atau buka /seed dulu.
        </p>
      </div>
    </main>
  );
}