"use client";

// Kenapa file ini harus "use client"?
// 1. window.confirm() cuma ada di browser, gak ada di server.
// 2. onSubmit / onClick itu event handler, HARAM di Server Component.
// Jadi confirm-nya dipisah ke sini, cuma tombol Hapus doang yang jadi Client Component.
// page.tsx-nya tetep Server Component, hapusnya tetep Server Action dari app/admin/actions.ts
export default function TombolHapus({
  id,
  judul,
  hapusEvent,
  kecil = false,
}: {
  id: number;
  judul: string;
  hapusEvent: (form: FormData) => Promise<void>;
  kecil?: boolean;
}) {
  return (
    <form
      action={hapusEvent}
      onSubmit={(e) => {
        const yakin = window.confirm(`Hapus "${judul}"?\n\nPesanan yang nyangkut ke event ini juga ikut kehapus.`);
        if (!yakin) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className={`rounded-full bg-red-500/15 font-black text-red-300 ring-1 ring-red-500/30 transition hover:bg-red-500 hover:text-white ${kecil ? "px-3 py-1.5 text-" : "px-4 py-2 text-"}`}
      >
        🗑 Hapus
      </button>
    </form>
  );
}