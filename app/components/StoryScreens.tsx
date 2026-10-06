"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Icon from "./Icon";
import { formatNumber, formatRupiah } from "../format";

export type SceneId = "pagi" | "siang" | "sore" | "malam" | "tidur";

const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

/** Bingkai ponsel untuk satu adegan. */
export function StoryPhone({ time, children }: { time: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto h-[560px] w-[min(300px,100%)] rounded-[40px] border border-ink-600 bg-ink-950 p-2 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.9)]">
      <div className="relative flex h-full flex-col overflow-hidden rounded-[32px] bg-ink-900 px-4 pb-4 pt-3">
        <div className="flex items-center justify-between font-mono text-[11px] text-mist">
          <span>{time}</span>
          <span className="h-3.5 w-14 rounded-full bg-ink-950" aria-hidden="true" />
          <span>5G</span>
        </div>
        <div className="mt-4 flex-1">{children}</div>
      </div>
    </div>
  );
}

export default function StoryScreen({ id }: { id: SceneId }) {
  switch (id) {
    case "pagi":
      return <Pagi />;
    case "siang":
      return <Siang />;
    case "sore":
      return <Sore />;
    case "malam":
      return <Malam />;
    default:
      return <Tidur />;
  }
}

/* 07:30 — Batas Harian Aman */
function Pagi() {
  const r = 70;
  const len = 2 * Math.PI * r;
  return (
    <div className="flex h-full flex-col items-center">
      <p className="self-start text-xs text-mist">Selamat pagi, Ahmat</p>
      <p className="self-start text-sm font-semibold text-paper-50">Batas harian aman</p>

      <div className="relative mt-5 h-[190px] w-[190px]">
        <svg viewBox="0 0 190 190" className="-rotate-90" aria-hidden="true">
          <circle cx="95" cy="95" r={r} fill="none" stroke="var(--color-ink-700)" strokeWidth="14" />
          <circle
            cx="95"
            cy="95"
            r={r}
            fill="none"
            stroke="var(--color-signal)"
            strokeWidth="14"
            strokeLinecap="round"
            className="dash-draw"
            style={{ "--len": len, "--off": 0 } as CSSProperties}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="fade-in font-mono text-[26px] font-medium tracking-tight text-paper-50" style={delay(0.5)}>
            {formatRupiah(318800)}
          </span>
          <span className="fade-in text-[10px] text-mist" style={delay(0.7)}>
            jatah aman per hari
          </span>
        </div>
      </div>

      <div className="fade-in mt-5 w-full rounded-xl bg-ink-800 p-3 font-mono text-[11px]" style={delay(0.9)}>
        <p className="flex items-baseline gap-1.5">
          <span className="text-mist">Sisa kas</span>
          <span className="leader" />
          <span className="text-paper-50">{formatNumber(7970000)}</span>
        </p>
        <p className="mt-1 flex items-baseline gap-1.5">
          <span className="text-mist">÷ Sisa hari</span>
          <span className="leader" />
          <span className="text-paper-50">25</span>
        </p>
        <p className="mt-1.5 flex items-baseline gap-1.5 border-t border-dashed border-ink-600 pt-1.5 font-medium text-signal">
          <span>Batas harian</span>
          <span className="leader" />
          <span>{formatNumber(318800)}</span>
        </p>
      </div>
    </div>
  );
}

/* 12:30 — catat transaksi */
function Siang() {
  return (
    <div className="flex h-full flex-col gap-3">
      <p className="text-sm font-semibold text-paper-50">Catat transaksi</p>
      <div className="grid grid-cols-3 gap-1 rounded-lg bg-ink-950 p-0.5 text-[11px] font-semibold">
        <span className="rounded-md bg-coral py-1.5 text-center text-ink-950">Pengeluaran</span>
        <span className="py-1.5 text-center text-mist">Pemasukan</span>
        <span className="py-1.5 text-center text-mist">Transfer</span>
      </div>

      <div className="rounded-xl bg-ink-800 p-3">
        <p className="text-[10px] text-mist">Nominal</p>
        <p className="mt-0.5 font-mono text-3xl font-medium text-paper-50">
          Rp <span className="type-in">45.000</span>
        </p>
      </div>

      <div className="flex gap-1.5">
        {["Makanan", "Transport", "Belanja"].map((c, i) => (
          <span
            key={c}
            className={
              "flex-1 rounded-md border py-1.5 text-center text-[10px] font-semibold " +
              (i === 0 ? "border-signal bg-signal/15 text-signal" : "border-ink-600 text-mist")
            }
          >
            {c}
          </span>
        ))}
      </div>
      <p className="flex items-center gap-2 rounded-lg bg-ink-800 px-3 py-2 text-[11px] text-paper-100">
        <Icon name="cash" size={14} className="text-mint" /> Dompet Kas
      </p>

      <div className="fade-in mt-auto rounded-xl border border-signal/50 p-3" style={delay(1.7)}>
        <p className="flex items-center gap-1.5 text-[10px] text-mist">
          <Icon name="check" size={12} className="text-signal" /> Tersimpan. Sisa jatah hari ini:
        </p>
        <p className="font-mono text-xl font-medium text-paper-50">{formatRupiah(273800)}</p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-700">
          <div className="h-full w-[14%] rounded-full bg-signal" />
        </div>
      </div>
    </div>
  );
}

/* 17:00 — transfer netral */
function Sore() {
  return (
    <div className="flex h-full flex-col gap-3">
      <p className="text-sm font-semibold text-paper-50">Transfer antar dompet</p>

      <div className="relative flex items-center justify-between gap-2 rounded-xl bg-ink-800 p-3">
        <div className="w-[88px] rounded-lg bg-signal p-2 text-ink-950">
          <Icon name="bank" size={14} />
          <p className="mt-1 text-[9px] font-medium opacity-80">BCA Tabungan</p>
          <p className="font-mono text-[11px] font-medium">7.500.000</p>
        </div>
        <div className="relative h-8 flex-1" aria-hidden="true">
          <span className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-ink-600" />
          <span className="hop grid h-5 w-8 place-items-center rounded-sm bg-signal font-mono text-[9px] font-medium text-ink-950">Rp</span>
        </div>
        <div className="w-[88px] rounded-lg bg-paper-100 p-2 text-ink-950">
          <Icon name="wallet" size={14} />
          <p className="mt-1 text-[9px] font-medium opacity-80">GoPay / OVO</p>
          <p className="font-mono text-[11px] font-medium">350.000</p>
        </div>
      </div>

      <div className="rounded-xl bg-ink-800 p-3 font-mono text-[11px]">
        <p className="flex items-baseline gap-1.5">
          <span className="text-mist">Dipindahkan</span>
          <span className="leader" />
          <span className="text-paper-50">200.000</span>
        </p>
        <p className="mt-1 flex items-baseline gap-1.5">
          <span className="text-mist">Biaya admin</span>
          <span className="leader" />
          <span className="text-coral">- 6.500</span>
        </p>
      </div>

      <div className="fade-in mt-auto space-y-2" style={delay(1)}>
        <p className="flex items-start gap-2 rounded-lg border border-signal/50 p-2.5 text-[10px] leading-snug text-paper-100">
          <Icon name="swap" size={14} className="mt-px shrink-0 text-signal" />
          Perpindahan dana bersifat netral. Yang tercatat sebagai pengeluaran hanya biaya admin Rp 6.500.
        </p>
      </div>
    </div>
  );
}

/* 20:00 — peringatan anggaran */
function Malam() {
  const [pct, setPct] = useState(62);
  const [warn, setWarn] = useState(false);
  useEffect(() => {
    const a = setTimeout(() => setPct(80), 250);
    const b = setTimeout(() => setWarn(true), 1200);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);

  return (
    <div className="relative flex h-full flex-col gap-3">
      {warn && (
        <div className="toast-in absolute inset-x-0 -top-1 z-10 flex items-start gap-2 rounded-xl border border-amber/60 bg-ink-800 px-3 py-2 text-[10px] leading-snug text-amber shadow-lg">
          <Icon name="bell" size={13} className="mt-px shrink-0" />
          Anggaran Makanan sudah mencapai 80%.
        </div>
      )}
      <p className="text-sm font-semibold text-paper-50">Anggaran bulan ini</p>

      <div className="space-y-2 rounded-xl bg-ink-800 p-3">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 font-semibold text-paper-50">
            <Icon name="food" size={14} /> Makanan
          </span>
          <span className={"font-mono text-[11px] font-medium transition-colors " + (warn ? "text-amber" : "text-signal")}>{pct}%</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-ink-700">
          <div
            className={"h-full rounded-full transition-[width,background-color] duration-[1100ms] ease-out " + (warn ? "bg-amber" : "bg-signal")}
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="font-mono text-[10px] text-mist">
          {formatRupiah(Math.round((1500000 * pct) / 100))} / {formatRupiah(1500000)}
        </p>
      </div>

      <div className="space-y-2 rounded-xl bg-ink-800 p-3">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 font-semibold text-paper-50">
            <Icon name="car" size={14} /> Transport
          </span>
          <span className="font-mono text-[11px] font-medium text-signal">40%</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-ink-700">
          <div className="h-full w-[40%] rounded-full bg-signal" />
        </div>
        <p className="font-mono text-[10px] text-mist">
          {formatRupiah(200000)} / {formatRupiah(500000)}
        </p>
      </div>

      <p className="mt-auto text-[10px] leading-snug text-mist">
        Hijau di bawah 70%, kuning saat mendekati batas, merah setelah 100%. Notifikasi muncul di 80%, 90%, dan 100%.
      </p>
    </div>
  );
}

/* 21:30 — streak */
function Tidur() {
  const days = ["S", "S", "R", "K", "J", "S", "M"];
  return (
    <div className="flex h-full flex-col items-center gap-3">
      <p className="self-start text-sm font-semibold text-paper-50">Check-in harian</p>

      <div className="mt-2 flex flex-col items-center">
        <span className="flicker text-amber">
          <Icon name="flame" size={64} strokeWidth={1.5} />
        </span>
        <p className="mt-1 font-mono text-5xl font-medium text-paper-50">12</p>
        <p className="text-xs text-mist">hari berturut-turut</p>
      </div>

      <div className="mt-2 flex w-full justify-between">
        {days.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span
              className={
                "pop flex h-8 w-8 items-center justify-center rounded-full " +
                (i === 6 ? "bg-signal text-ink-950" : "bg-ink-700 text-signal")
              }
              style={delay(0.25 + i * 0.12)}
            >
              <Icon name="check" size={14} strokeWidth={2.6} />
            </span>
            <span className="text-[9px] text-mist">{d}</span>
          </div>
        ))}
      </div>

      <div className="fade-in mt-auto w-full rounded-xl bg-ink-800 p-3" style={delay(1.3)}>
        <p className="mb-2 flex items-center gap-1.5 text-[10px] text-mist">
          <Icon name="trophy" size={12} className="text-amber" /> Level finansial
        </p>
        <div className="relative h-1.5 w-full rounded-full bg-ink-700">
          <div className="h-full w-[38%] rounded-full bg-signal" />
          <span className="absolute left-[38%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink-800 bg-signal" />
        </div>
        <p className="mt-2 flex justify-between text-[9px] text-mist">
          <span>Pemula Finansial</span>
          <span>Sultan Hemat</span>
        </p>
      </div>
    </div>
  );
}
