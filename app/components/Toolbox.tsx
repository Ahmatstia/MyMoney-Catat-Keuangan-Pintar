"use client";

import { useState, type ReactNode } from "react";
import Icon, { type IconName } from "./Icon";
import { formatNumber, formatRupiah } from "../format";

/* =====================================================================
   Bagian kecil yang dipakai ulang (di level modul, bukan di dalam render)
===================================================================== */

function Tool({
  icon,
  title,
  hint,
  children,
  className = "",
}: {
  icon: IconName;
  title: string;
  hint: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className={"flex flex-col rounded-xl bg-ink-900 p-6 text-paper-100 shadow-[0_22px_40px_-26px_rgba(5,28,25,0.8)] sm:p-8 " + className}>
      <header className="mb-6 flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-ink-700 text-signal">
          <Icon name={icon} size={20} />
        </span>
        <div>
          <h3 className="font-display text-xl font-bold leading-tight tracking-tight text-paper-50">{title}</h3>
          <p className="mt-0.5 text-sm text-mist">{hint}</p>
        </div>
      </header>
      <div className="flex flex-1 flex-col justify-center">{children}</div>
    </article>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3 text-xs text-mist">
        {label}
        <span className="font-mono text-sm font-medium text-paper-50">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range mt-1"
      />
    </label>
  );
}

/* =====================================================================
   1. Beli atau Tunda?
   Mengukur dampak sebuah pembelian pada batas harian aman.
===================================================================== */

const BUY_CASH = 2400000;
const BUY_DAYS = 18;
const BUY_MIN_DAILY = 30000; // batas harian di bawah ini dianggap terlalu ketat
const SAVE_PER_DAY = 50000; // jatah menabung per hari untuk opsi "tunda"

function BuyOrWait() {
  const [price, setPrice] = useState(850000);
  const before = BUY_CASH / BUY_DAYS;
  const after = (BUY_CASH - price) / BUY_DAYS;
  const ok = after >= BUY_MIN_DAILY;
  const saveDays = Math.ceil(price / SAVE_PER_DAY);

  return (
    <div>
      <Slider
        label="Harga barang yang diincar"
        value={price}
        min={50000}
        max={2400000}
        step={50000}
        display={formatRupiah(price)}
        onChange={setPrice}
      />

      <dl className="mt-5 grid grid-cols-2 gap-3 font-mono text-sm">
        <div className="rounded-lg bg-ink-800 p-3">
          <dt className="font-sans text-xs text-mist">Batas harian sekarang</dt>
          <dd className="mt-0.5 text-base text-paper-50">{formatRupiah(Math.round(before))}</dd>
        </div>
        <div className="rounded-lg bg-ink-800 p-3">
          <dt className="font-sans text-xs text-mist">Setelah membeli</dt>
          <dd className={"mt-0.5 text-base " + (ok ? "text-signal" : "text-coral")}>{formatRupiah(Math.max(0, Math.round(after)))}</dd>
        </div>
      </dl>

      <div className="mt-5 flex items-center gap-4">
        <span key={ok ? "ok" : "no"} className={"stamp stamp-in text-base " + (ok ? "text-mint" : "text-coral")}>
          {ok ? "Aman dibeli" : "Sebaiknya ditunda"}
        </span>
        <p aria-live="polite" className="text-sm leading-relaxed text-mist">
          {ok
            ? `Jatah harian Anda tetap di atas ${formatRupiah(BUY_MIN_DAILY)}.`
            : `Jatah harian turun di bawah ${formatRupiah(BUY_MIN_DAILY)}. Alternatif: tabung ${formatRupiah(SAVE_PER_DAY)} per hari, terkumpul dalam ${saveDays} hari.`}
        </p>
      </div>
      <p className="mt-4 text-[11px] text-mist/70">Contoh dihitung dari sisa kas {formatRupiah(BUY_CASH)} untuk {BUY_DAYS} hari.</p>
    </div>
  );
}

/* =====================================================================
   2. Runway dana darurat
===================================================================== */

function Runway() {
  const [fund, setFund] = useState(9000000);
  const [spend, setSpend] = useState(3000000);
  const months = fund / spend;

  const level =
    months >= 6
      ? { label: "Sangat aman", color: "text-mint", bar: "var(--color-mint)" }
      : months >= 3
        ? { label: "Cukup aman", color: "text-signal", bar: "var(--color-signal)" }
        : { label: "Kritis", color: "text-coral", bar: "var(--color-coral)" };

  const filled = Math.min(12, Math.floor(months));
  const partial = months < 12 ? months - Math.floor(months) : 0;

  return (
    <div>
      <div className="space-y-4">
        <Slider label="Dana darurat" value={fund} min={500000} max={60000000} step={500000} display={formatRupiah(fund)} onChange={setFund} />
        <Slider label="Pengeluaran per bulan" value={spend} min={1000000} max={10000000} step={250000} display={formatRupiah(spend)} onChange={setSpend} />
      </div>

      <div className="mt-6 flex items-end justify-between gap-4">
        <p className="font-mono text-4xl font-medium text-paper-50">
          {months.toFixed(1)}
          <span className="ml-2 font-sans text-base text-mist">bulan</span>
        </p>
        <span className={"font-display text-lg font-bold " + level.color}>{level.label}</span>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-1" role="img" aria-label={`Dana darurat cukup untuk ${months.toFixed(1)} bulan`}>
        {Array.from({ length: 12 }, (_, i) => {
          const full = i < filled;
          const half = i === filled && partial > 0;
          return (
            <span key={i} className="relative h-8 overflow-hidden rounded-sm bg-ink-700">
              <span
                className="absolute inset-y-0 left-0 transition-all duration-300"
                style={{ width: full ? "100%" : half ? `${(partial * 100).toFixed(2)}%` : "0%", background: level.bar }}
              />
            </span>
          );
        })}
      </div>
      <p className="mt-2 flex justify-between font-mono text-[11px] text-mist">
        <span>1 bln</span>
        <span>6 bln</span>
        <span>12 bln</span>
      </p>
    </div>
  );
}

/* =====================================================================
   3. Alokasi 50/30/20
===================================================================== */

const BUCKETS = [
  { id: "need", name: "Kebutuhan", pct: 50, color: "var(--color-signal)", eg: "Sewa, makan pokok, listrik, transport, cicilan wajib." },
  { id: "want", name: "Keinginan", pct: 30, color: "var(--color-amber)", eg: "Hiburan, makan di luar, langganan, hobi, belanja." },
  { id: "save", name: "Tabungan", pct: 20, color: "var(--color-mint)", eg: "Dana darurat, investasi, tujuan jangka panjang." },
] as const;

function Allocator() {
  const [income, setIncome] = useState(6500000);
  const [open, setOpen] = useState<string>("need");
  const current = BUCKETS.find((b) => b.id === open) ?? BUCKETS[0];

  return (
    <div>
      <Slider label="Penghasilan bulanan" value={income} min={1000000} max={30000000} step={250000} display={formatRupiah(income)} onChange={setIncome} />

      <div className="mt-5 flex h-4 gap-0.5 overflow-hidden rounded-full" aria-hidden="true">
        {BUCKETS.map((b) => (
          <span key={b.id} style={{ width: `${b.pct.toFixed(2)}%`, background: b.color, opacity: open === b.id ? 1 : 0.45 }} className="transition-opacity" />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2" role="group" aria-label="Pilih kelompok alokasi">
        {BUCKETS.map((b) => (
          <button
            key={b.id}
            type="button"
            aria-pressed={open === b.id}
            onClick={() => setOpen(b.id)}
            className={
              "rounded-lg border p-3 text-left transition-colors " +
              (open === b.id ? "border-paper-300 bg-ink-800" : "border-ink-600 hover:bg-ink-800/60")
            }
          >
            <span className="flex items-center gap-1.5 text-xs text-mist">
              <span className="h-2 w-2 rounded-full" style={{ background: b.color }} />
              {b.name} {b.pct}%
            </span>
            <span className="mt-1 block font-mono text-sm font-medium text-paper-50">{formatNumber((income * b.pct) / 100)}</span>
          </button>
        ))}
      </div>
      <p key={current.id} className="fade-in mt-4 text-sm leading-relaxed text-mist">
        <span className="font-semibold text-paper-100">{current.name}:</span> {current.eg}
      </p>
    </div>
  );
}

/* =====================================================================
   4. Bunga majemuk
===================================================================== */

function futureValue(initial: number, monthly: number, ratePct: number, years: number) {
  const r = ratePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return initial + monthly * n;
  const g = Math.pow(1 + r, n);
  return initial * g + monthly * ((g - 1) / r);
}

function Compound() {
  const [initial, setInitial] = useState(1000000);
  const [monthly, setMonthly] = useState(500000);
  const [rate, setRate] = useState(6);
  const [years, setYears] = useState(10);

  const total = futureValue(initial, monthly, rate, years);
  const deposited = initial + monthly * years * 12;
  const gain = total - deposited;

  // Satu batang per tahun: bagian bawah setoran, bagian atas bunga.
  const bars = Array.from({ length: years }, (_, i) => {
    const y = i + 1;
    const t = futureValue(initial, monthly, rate, y);
    const d = initial + monthly * y * 12;
    return { y, t, d };
  });

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Slider label="Setoran awal" value={initial} min={0} max={20000000} step={500000} display={formatRupiah(initial)} onChange={setInitial} />
        <Slider label="Setoran per bulan" value={monthly} min={0} max={5000000} step={100000} display={formatRupiah(monthly)} onChange={setMonthly} />
        <Slider label="Bunga per tahun" value={rate} min={0} max={15} step={0.5} display={`${rate}%`} onChange={setRate} />
        <Slider label="Lama menabung" value={years} min={1} max={30} step={1} display={`${years} tahun`} onChange={setYears} />
      </div>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs text-mist">Nilai akhir</p>
          <p className="font-mono text-3xl font-medium text-paper-50">{formatRupiah(Math.round(total))}</p>
        </div>
        <p className="font-mono text-sm text-mint">+{formatRupiah(Math.round(gain))} dari bunga</p>
      </div>

      <div className="mt-4 flex h-28 items-end gap-0.5" role="img" aria-label="Grafik pertumbuhan tabungan per tahun">
        {bars.map((b) => {
          const maxT = bars[bars.length - 1].t || 1;
          return (
            <span key={b.y} className="flex h-full flex-1 flex-col justify-end">
              <span className="block rounded-t-sm bg-mint transition-all duration-300" style={{ height: `${Math.max(0, ((b.t - b.d) / maxT) * 100).toFixed(2)}%` }} />
              <span className="block bg-signal transition-all duration-300" style={{ height: `${Math.max(0, (b.d / maxT) * 100).toFixed(2)}%` }} />
            </span>
          );
        })}
      </div>
      <p className="mt-2 flex items-center gap-5 text-[11px] text-mist">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-signal" /> Setoran {formatRupiah(deposited)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-sm bg-mint" /> Bunga
        </span>
      </p>
    </div>
  );
}

/* =====================================================================
   5. Cicilan utang
===================================================================== */

const DEBT = 3000000;

function Installments() {
  const [tenor, setTenor] = useState(6);
  const [paid, setPaid] = useState(0);
  const each = DEBT / tenor;
  const done = paid >= tenor;
  const remaining = Math.max(0, DEBT - each * paid);

  const changeTenor = (n: number) => {
    setTenor(n);
    setPaid((p) => Math.min(p, n));
  };

  return (
    <div className="grid gap-8 md:grid-cols-2 md:items-center">
      <div>
        <Slider label="Lama cicilan" value={tenor} min={3} max={12} step={1} display={`${tenor} bulan`} onChange={changeTenor} />
        <dl className="mt-5 space-y-2 font-mono text-sm">
          <div className="flex items-center gap-2">
            <dt className="font-sans text-mist">Total utang</dt>
            <span className="leader" />
            <dd className="text-paper-50">{formatRupiah(DEBT)}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="font-sans text-mist">Cicilan per bulan</dt>
            <span className="leader" />
            <dd className="text-paper-50">{formatRupiah(Math.round(each))}</dd>
          </div>
          <div className="flex items-center gap-2 border-t border-ink-600 pt-2">
            <dt className="font-sans text-mist">Sisa utang</dt>
            <span className="leader" />
            <dd className={done ? "text-mint" : "text-coral"}>{formatRupiah(Math.round(remaining))}</dd>
          </div>
        </dl>

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            disabled={done}
            onClick={() => setPaid((p) => p + 1)}
            className="rounded-md bg-signal px-5 py-3 text-sm font-bold text-ink-950 transition-colors hover:bg-paper-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Bayar cicilan ke-{Math.min(paid + 1, tenor)}
          </button>
          <button
            type="button"
            onClick={() => setPaid(0)}
            aria-label="Ulangi dari awal"
            className="flex h-11 w-11 items-center justify-center rounded-md border border-ink-600 text-paper-100 transition-colors hover:bg-ink-800"
          >
            <Icon name="reset" size={17} />
          </button>
        </div>
      </div>

      <div className="relative">
        <ol className="grid grid-cols-6 gap-2" aria-label="Kemajuan cicilan">
          {Array.from({ length: tenor }, (_, i) => (
            <li
              key={i}
              className={
                "flex aspect-square items-center justify-center rounded-md font-mono text-xs transition-colors " +
                (i < paid ? "bg-signal text-ink-950" : "bg-ink-700 text-mist")
              }
            >
              {i < paid ? <Icon name="check" size={14} strokeWidth={2.6} /> : i + 1}
            </li>
          ))}
        </ol>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-ink-700">
          <div className="h-full rounded-full bg-signal transition-all duration-500" style={{ width: `${((paid / tenor) * 100).toFixed(2)}%` }} />
        </div>
        {done && (
          <span className="stamp stamp-in pointer-events-none absolute -right-1 -top-6 bg-ink-900 px-3 py-1 text-2xl text-mint">Lunas</span>
        )}
      </div>
    </div>
  );
}

/* =====================================================================
   Section
===================================================================== */

export default function Toolbox() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <h2 className="h-section max-w-3xl">Kotak perkakas untuk keputusan uang yang lebih tenang</h2>
      <p className="lede mt-5 text-moss">
        Lima alat bantu yang ikut terpasang di aplikasi. Semuanya dihitung langsung di ponsel, tanpa internet. Silakan
        coba.
      </p>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Tool icon="bag" title="Beli atau Tunda?" hint="Seberapa berat sebuah pembelian bagi jatah harian.">
          <BuyOrWait />
        </Tool>
        <Tool icon="clock" title="Runway dana darurat" hint="Berapa bulan Anda bertahan tanpa penghasilan.">
          <Runway />
        </Tool>
        <Tool icon="pie" title="Alokasi 50/30/20" hint="Bagi penghasilan jadi kebutuhan, keinginan, tabungan.">
          <Allocator />
        </Tool>
        <Tool icon="trend" title="Bunga majemuk" hint="Lihat tabungan Anda tumbuh dari tahun ke tahun.">
          <Compound />
        </Tool>
        <Tool icon="card" title="Cicilan utang" hint="Lunasi satu per satu dan lihat sisanya menyusut." className="lg:col-span-2">
          <Installments />
        </Tool>
      </div>
    </div>
  );
}
