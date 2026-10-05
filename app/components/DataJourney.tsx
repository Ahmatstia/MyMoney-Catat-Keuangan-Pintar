"use client";

import { useState, type CSSProperties } from "react";
import Icon, { type IconName } from "./Icon";

type Mode = "cloud" | "local";

const FACTS: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "shield",
    title: "100% offline-first",
    body: "Semua data Anda tersimpan di memori perangkat sendiri. Tanpa server luar, bebas kebocoran.",
  },
  {
    icon: "userOff",
    title: "Tanpa wajib login",
    body: "Buka aplikasi dan langsung gunakan tanpa ribet daftar email, nomor HP, atau password.",
  },
  {
    icon: "fingerprint",
    title: "Biometrik dan PIN",
    body: "Kunci akses aplikasi dengan sensor sidik jari (fingerprint), Face ID, atau PIN keamanan.",
  },
  {
    icon: "backup",
    title: "Cadangan lokal (backup)",
    body: "Ekspor data Anda kapan saja ke file JSON terenkripsi untuk dipulihkan saat ganti HP.",
  },
];

const CAPTION: Record<Mode, string> = {
  cloud:
    "Pada aplikasi berbasis cloud, setiap catatan dikirim ke server dan disimpan di sana. Anda bergantung pada pihak yang mengelolanya.",
  local:
    "Transaksi, saldo, anggaran, dan foto struk tinggal di memori ponsel Anda. Tidak ada yang dikirim ke server kami.",
};

export default function DataJourney() {
  const [mode, setMode] = useState<Mode>("cloud");
  const cloud = mode === "cloud";

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <h2 className="h-section max-w-3xl text-paper-50">Data keuangan Anda adalah rahasia pribadi Anda</h2>
      <p className="lede mt-5 text-mist">
        Lihat ke mana catatan keuangan pergi. Bandingkan dua cara kerja ini.
      </p>

      {/* Saklar */}
      <div role="group" aria-label="Pilih cara kerja aplikasi" className="mt-10 inline-flex rounded-lg border border-ink-600 p-1">
        <button
          type="button"
          aria-pressed={cloud}
          onClick={() => setMode("cloud")}
          className={
            "rounded-md px-4 py-2.5 text-sm font-semibold transition-colors " +
            (cloud ? "bg-coral text-ink-950" : "text-mist hover:text-paper-50")
          }
        >
          Aplikasi cloud biasa
        </button>
        <button
          type="button"
          aria-pressed={!cloud}
          onClick={() => setMode("local")}
          className={
            "rounded-md px-4 py-2.5 text-sm font-semibold transition-colors " +
            (!cloud ? "bg-signal text-ink-950" : "text-mist hover:text-paper-50")
          }
        >
          MyMoney
        </button>
      </div>

      {/* Diagram aliran data */}
      <div className="mt-10 grid items-center gap-0 md:grid-cols-[auto_1fr_auto_1fr_auto]">
        <Node icon="phone" label="Ponsel Anda" note={cloud ? "Catatan keluar dari sini" : "Data tinggal di sini"} accent={!cloud} />
        <Track active={cloud} />
        <Node icon="server" label="Server cloud" note={cloud ? "Disimpan di server" : "Tidak dipakai"} dim={!cloud} />
        <Track active={cloud} delay />
        <Node icon="users" label="Pihak ketiga" note={cloud ? "Mengelola server dan layanan" : "Tidak ada"} dim={!cloud} />
      </div>

      <p aria-live="polite" className="mt-10 max-w-2xl text-lg leading-relaxed text-paper-100">
        {CAPTION[mode]}
      </p>

      {/* Fakta keamanan */}
      <dl className="mt-20 grid gap-x-14 gap-y-0 md:grid-cols-2">
        {FACTS.map((f) => (
          <div key={f.title} className="flex gap-4 border-t border-ink-600 py-7">
            <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-ink-800 text-signal">
              <Icon name={f.icon} size={18} />
            </span>
            <div>
              <dt className="font-display text-xl font-bold tracking-tight text-paper-50">{f.title}</dt>
              <dd className="mt-1.5 max-w-md text-base leading-relaxed text-mist">{f.body}</dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Node({
  icon,
  label,
  note,
  dim,
  accent,
}: {
  icon: IconName;
  label: string;
  note: string;
  dim?: boolean;
  accent?: boolean;
}) {
  return (
    <div
      className={
        "flex items-center gap-4 rounded-xl border p-5 transition-all duration-300 md:w-56 md:flex-col md:items-start " +
        (accent ? "border-signal bg-ink-800" : "border-ink-600 bg-ink-800/60") +
        (dim ? " opacity-40" : "")
      }
    >
      <span className={"flex h-11 w-11 shrink-0 items-center justify-center rounded-lg " + (accent ? "bg-signal text-ink-950" : "bg-ink-700 text-paper-100")}>
        <Icon name={accent ? "lock" : icon} size={22} />
      </span>
      <div>
        <p className="font-display text-lg font-bold leading-tight text-paper-50">{label}</p>
        <p className="mt-0.5 text-sm text-mist">{note}</p>
      </div>
    </div>
  );
}

function Track({ active, delay }: { active: boolean; delay?: boolean }) {
  const offsets = delay ? ["0.4s", "1.3s", "2.2s"] : ["0s", "0.9s", "1.8s"];
  return (
    <div className="relative mx-auto h-24 w-full md:h-12" aria-hidden="true">
      <span
        className={
          "absolute left-1/2 top-0 h-full border-l-2 md:left-0 md:top-1/2 md:h-0 md:w-full md:border-l-0 md:border-t-2 " +
          (active ? "border-coral/70" : "border-dashed border-ink-600")
        }
      />
      {active &&
        offsets.map((d) => (
          <span
            key={d}
            style={{ "--d": d } as CSSProperties}
            className="packet grid h-5 w-8 place-items-center rounded-sm bg-coral font-mono text-[10px] font-medium text-ink-950"
          >
            Rp
          </span>
        ))}
      {!active && (
        <span className="absolute left-1/2 top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink-900 text-mist">
          <Icon name="close" size={12} strokeWidth={2.4} />
        </span>
      )}
    </div>
  );
}
