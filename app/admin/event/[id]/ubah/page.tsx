import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";
import FormEvent from "@/components/FormEvent";

export default async function UbahEvent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await supabaseAdmin.from("events").select("*").eq("id", Number(id)).single();
  if (!data) notFound();

  return (
    <div className="mx-auto max-w-2xl">
      <FormEvent
        event={{
          id: Number(data.id),
          judul: String(data.judul ?? ""),
          kategori: String(data.kategori ?? ""),
          tanggal: String(data.tanggal ?? "").slice(0, 10),
          lokasi: String(data.lokasi ?? ""),
          harga: Number(data.harga ?? 0),
          kuota: Number(data.kuota ?? 0),
          gambar: String(data.gambar ?? ""),
          deskripsi: String(data.deskripsi ?? ""),
        }}
      />
    </div>
  );
}