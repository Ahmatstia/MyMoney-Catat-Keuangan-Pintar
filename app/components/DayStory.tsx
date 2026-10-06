"use client";

import { useEffect, useRef, useState } from "react";
import InView from "./InView";
import StoryScreen, { StoryPhone, type SceneId } from "./StoryScreens";

const SCENES: { id: SceneId; time: string; title: string; body: string }[] = [
  {
    id: "pagi",
    time: "07:30",
    title: "Cek batas harian sebelum membelanjakan apa pun",
    body: "Buka Beranda dan lihat satu angka: Batas Harian Aman. Rumusnya sederhana, sisa kas dibagi sisa hari menuju tanggal pembukuan berikutnya. Hemat hari ini, jatah besok otomatis bertambah.",
  },
  {
    id: "siang",
    time: "12:30",
    title: "Catat makan siang sebelum kopinya habis",
    body: "Tekan tombol tambah, ketik nominal, pilih kategori dan dompet. Sisa jatah hari ini berkurang saat itu juga, tanpa menunggu rekap akhir bulan.",
  },
  {
    id: "sore",
    time: "17:00",
    title: "Isi e-wallet tanpa pengeluaran palsu",
    body: "Pindahkan dana lewat tab Transfer. Total kekayaan tidak berubah, hanya lokasinya. Kalau ada biaya admin bank, cuma biaya itu yang dihitung sebagai pengeluaran.",
  },
  {
    id: "malam",
    time: "20:00",
    title: "Anggaran memberi lampu kuning sebelum jebol",
    body: "Setiap pengeluaran mengisi bar anggaran kategorinya. Saat mendekati batas bar berubah kuning dan notifikasi muncul. Lewat 100%, bar jadi merah.",
  },
  {
    id: "tidur",
    time: "21:30",
    title: "Satu check-in lagi, streak bertambah",
    body: "Buka MyMoney setiap hari, catat satu transaksi atau cek batas harian, dan api streak terus menyala. Kebiasaan sadar uang dibentuk dari konsistensi kecil.",
  },
];

export default function DayStory() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scene = SCENES[active];

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <h2 className="h-section max-w-3xl text-paper-50">Satu hari bersama MyMoney</h2>
      <p className="lede mt-5 text-mist">
        Gulir untuk mengikuti satu hari biasa, dari cek batas pagi sampai check-in malam. Setiap adegan memakai fitur
        yang benar-benar ada di aplikasi.
      </p>

      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Ponsel yang menempel (desktop) */}
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-24">
            <div className="mb-4 flex items-baseline justify-between px-2 font-mono text-sm text-mist">
              <span>{scene.time}</span>
              <span>
                adegan {active + 1} dari {SCENES.length}
              </span>
            </div>
            <StoryPhone time={scene.time}>
              <div key={scene.id} className="fade-in h-full">
                <StoryScreen id={scene.id} />
              </div>
            </StoryPhone>
          </div>
        </div>

        {/* Adegan */}
        <ol className="lg:col-span-7">
          {SCENES.map((s, i) => (
            <li
              key={s.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-i={i}
              className="flex flex-col justify-center py-10 lg:min-h-[78vh]"
            >
              <div className={"transition-opacity duration-500 " + (i === active ? "lg:opacity-100" : "lg:opacity-35")}>
                <p className="font-mono text-4xl font-medium tracking-tight text-signal sm:text-5xl">{s.time}</p>
                <h3 className="mt-4 max-w-xl font-display text-2xl font-bold tracking-tight text-paper-50 sm:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-mist">{s.body}</p>
              </div>

              {/* Ponsel inline (mobile) */}
              <InView className="mt-8 lg:hidden">
                <StoryPhone time={s.time}>
                  <div className="h-full">
                    <StoryScreen id={s.id} />
                  </div>
                </StoryPhone>
              </InView>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
