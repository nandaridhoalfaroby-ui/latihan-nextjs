"use client";

export default function TombolHapus({
  id,
  judul,
  hapusEvent,
}: {
  id: number;
  judul: string;
  hapusEvent: (form: FormData) => Promise<void>;
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
        className="rounded-full bg-red-500/15 px-4 py-2 text- font-black text-red-300 ring-1 ring-red-500/30 transition hover:bg-red-500 hover:text-white"
      >
        🗑 Hapus
      </button>
    </form>
  );
}