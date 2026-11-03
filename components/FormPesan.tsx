"use client";
import { useState } from "react";
import { rupiah, type Event } from "@/data/events";

export default function FormPesan({ event }: { event: Event }) {
  const sisa = event.kuota - event.terisi;
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [jumlah, setJumlah] = useState(1);
  const [pesan, setPesan] = useState("");
  const [berhasil, setBerhasil] = useState(false);

  function kirim(e: React.FormEvent) {
    e.preventDefault();
    setPesan("");
    if (nama.trim().length < 3) return setPesan("Nama minimal 3 huruf.");
    if (!email.includes("@")) return setPesan("Email harus mengandung @.");
    if (jumlah < 1) return setPesan("Jumlah tiket minimal 1.");
    if (jumlah > sisa) return setPesan(`Sisa tiket hanya ${sisa}.`);
    setPesan("");
    setBerhasil(true);
  }

  if (sisa === 0) {
    return <p className="mt-6 font-medium text-red-500">Tiket sudah habis.</p>;
  }

  return (
    <form onSubmit={kirim} className="mt-6 space-y-3 rounded-xl border border-slate-700 bg-slate-900 p-4">
      <h2 className="text-lg font-semibold text-slate-100">Pesan tiket</h2>
      
      <input
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        placeholder="Nama pemesan"
        className="block w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email pemesan"
        className="block w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none"
      />
      <input
        type="number"
        value={jumlah}
        min={1}
        onChange={(e) => setJumlah(Number(e.target.value))}
        className="block w-32 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-100 focus:border-blue-500 focus:outline-none"
      />
      
      <p className="text-slate-300">Total: <span className="font-bold text-white">{rupiah(event.harga * jumlah)}</span></p>
      
      {pesan && <p className="text-red-400">{pesan}</p>}
      {berhasil && (
        <p className="text-green-400">
          Terima kasih {nama}! {jumlah} tiket dipesan
        </p>
      )}
      
      <button className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500">
        Pesan
      </button>
    </form>
  );
}