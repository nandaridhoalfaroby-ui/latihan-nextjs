"use client";

import { useEffect, useRef, useState } from "react";

// ALUR: 1. Video pintu kebuka (0-7 detik, awalnya mute karena aturan Chrome) -> klik tombol suara -> suara Welcome to EventKu! nyala -> 2. Loading -> 3. Beranda
export default function SplashScreen() {
  const [tahap, setTahap] = useState<"video" | "loading" | "selesai">("video");
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);
  const [bersuara, setBersuara] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("eventku-splash") === "done") {
      setTahap("selesai");
      return;
    }
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // FIX SUARA 1: set muted lewat ref, JANGAN lewat attribute JSX doang.
  // Di React, <video muted> itu cuma set attribute awal, pas di-toggle lewat state kadang gak ngaruh ke video-nya.
  // Makanya video-nya harus di-set manual: video.muted = false + video.play()
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = true;
  }, [tahap]);

  function videoSelesai() {
    setTahap("loading");
    setProgress(0);
  }

  useEffect(() => {
    if (tahap !== "loading") return;
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + 8;
        if (next >= 100) {
          clearInterval(interval);
          setFade(true);
          setTimeout(() => {
            setTahap("selesai");
            sessionStorage.setItem("eventku-splash", "done");
            document.body.style.overflow = "";
          }, 500);
          return 100;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [tahap]);

  function skip() {
    videoRef.current?.pause();
    videoSelesai();
  }

  // FIX SUARA 2: ini fungsi yang beneran nyalain suara
  async function nyalakanSuara() {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.muted = false; // <-- INI KUNCINYA, set langsung ke elemen video-nya
      v.volume = 1;
      await v.play(); // <-- habis unmute, play lagi biar suaranya ke-trigger
      setBersuara(true);
    } catch {}
  }

  function matikanSuara() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    setBersuara(false);
  }

  // FIX SUARA 3: klik di mana aja di video = nyalain suara. Biar user yang gak liat tombol kecil tetep bisa nyalain.
  // Ini yang dipake YouTube / 【entity-Instagram¦canonical_name=Instagram】 juga: klik pertama = unmute.
  function klikVideo() {
    if (!bersuara) nyalakanSuara();
  }

  if (tahap === "selesai") return null;

  const teksLoading = progress < 33 ? "Menyiapkan panggung..." : progress < 66 ? "Memuat event terbaik..." : "Siap menjelajah!";

  return (
    <div className={`fixed inset-0 z-9999 flex flex-col overflow-hidden bg-[#120826] text-white transition-opacity duration-500 ${fade ? "opacity-0" : "opacity-100"}`} style={{ colorScheme: "dark" }}>
      {tahap === "video" ? (
        <>
          <video
            ref={videoRef}
            src="/EventKu_video_intro_opening_671ca743.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={videoSelesai}
            onError={videoSelesai}
            onClick={klikVideo}
            className="h-full w-full cursor-pointer object-cover"
          />

          {/* TOMBOL SUARA GEDE DI TENGAH - MUNCUL KALAU SUARA MASIH MATI */}
          {/* Biar user langsung tau: oh suaranya belum nyala, harus klik ini */}
          {!bersuara && (
            <button
              onClick={nyalakanSuara}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-black/60 px-7 py-4 text- font-black ring-2 ring-amber-400/60 backdrop-blur transition hover:scale-[1.05] hover:bg-black/80"
            >
              🔊 Klik untuk Nyalakan Suara
              <span className="mt-1 block text- font-bold text-white/70">Welcome to EventKu!</span>
            </button>
          )}

          {/* Tombol bawah */}
          <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-3">
            <button
              onClick={bersuara ? matikanSuara : nyalakanSuara}
              className="rounded-full bg-black/50 px-4 py-2 text- font-black ring-1 ring-white/25 backdrop-blur transition hover:bg-black/70"
            >
              {bersuara ? "🔊 Suara Nyala" : "🔇 Suara Mati"}
            </button>
            <button
              onClick={skip}
              className="rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 px-6 py-2 text- font-black shadow-lg transition hover:scale-[1.03]"
            >
              Lewati Intro →
            </button>
          </div>
          <p className="absolute bottom-6 right-6 hidden text- font-bold text-white/50 sm:block">EventKu • Intro • Klik video untuk suara</p>
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-violet-600/30 blur-" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-pink-600/30 blur-" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/20 blur-" />

          <div className="relative flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="flex items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded- bg-linear-to-br from-amber-300 via-orange-400 to-pink-500 text- font-black shadow-[0_20px_50px_-10px_rgba(249,115,22,0.8)]">E</div>
              <div className="text-left">
                <p className="text- font-black leading-none">EventKu</p>
                <p className="mt-1 text- font-black tracking-[0.25em] text-white/60">JELAJAHI • PESAN • HADIR</p>
              </div>
            </div>
            <p className="mt-6 text- font-bold text-white/70">{teksLoading}</p>
            <div className="mt-4 h-2.5 w-full max-w-xs overflow-hidden rounded-full bg-white/10 ring-1 ring-white/15">
              <div className="h-full rounded-full bg-linear-to-r from-amber-400 via-orange-500 to-pink-500 transition-all duration-100" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text- font-black text-amber-300">{progress}%</p>
            <div className="mt-6 flex gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text- font-bold ring-1 ring-white/15">🎪 Konser</span>
              <span className="rounded-full bg-white/10 px-3 py-1 text- font-bold ring-1 ring-white/15">💻 Workshop</span>
              <span className="rounded-full bg-white/10 px-3 py-1 text- font-bold ring-1 ring-white/15">🎨 Festival</span>
            </div>
          </div>
          <p className="relative pb-6 text-center text- font-bold text-white/40">© 2026 EventKu • Dibuat dengan ❤️ di Indonesia</p>
        </>
      )}
    </div>
  );
}