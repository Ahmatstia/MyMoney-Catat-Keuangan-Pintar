"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";
import { formatNumber, formatRupiah } from "../format";

const FEATURES = [
  {
    id: "cepat",
    title: "Pencatatan secepat kilat",
    body: "Catat pengeluaran kasir dalam < 3 detik. Didukung rincian sub-transaksi item per item seperti struk belanja asli.",
  },
  {
    id: "limit",
    title: "Limit anggaran pintar",
    body: "Pasang batas pengeluaran per kategori (makanan, jajan, transportasi). Dapatkan peringatan visual sebelum overbudget.",
  },
  {
    id: "split",
    title: "Split bill dan financial tools",
    body: "Bagi tagihan makan bersama teman dengan hitungan pajak dan tip otomatis, siap dibagikan ke WhatsApp dengan rapi.",
  },
] as const;

type FeatureId = (typeof FEATURES)[number]["id"];

export default function FeatureLab() {
  const [active, setActive] = useState<FeatureId>("cepat");

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <h2 className="h-section max-w-3xl">Dirancang untuk kedisiplinan finansial Anda</h2>

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div role="tablist" aria-label="Fitur MyMoney" className="flex flex-col lg:col-span-5">
          {FEATURES.map((f) => {
            const selected = active === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                id={`tab-${f.id}`}
                aria-selected={selected}
                aria-controls="feature-panel"
                onClick={() => setActive(f.id)}
                className={
                  "border-t-2 py-6 text-left transition-colors last:border-b-2 " +
                  (selected ? "border-leaf" : "border-paper-300 hover:border-moss")
                }
              >
                <span
                  className={
                    "block font-display text-2xl font-bold tracking-tight transition-colors sm:text-3xl " +
                    (selected ? "text-leaf" : "text-moss")
                  }
                >
                  {f.title}
                </span>
                {selected && (
                  <span className="fade-in mt-3 block max-w-md text-base leading-relaxed text-moss">{f.body}</span>
                )}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id="feature-panel"
          aria-labelledby={`tab-${active}`}
          className="min-h-[26rem] rounded-xl bg-ink-900 p-6 text-paper-100 sm:p-8 lg:col-span-7"
        >
          {active === "cepat" && <QuickLog />}
          {active === "limit" && <BudgetLimit />}
          {active === "split" && <SplitBill />}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Pencatatan cepat ---------------- */

const LOG_ITEMS = [
  { at: 300, name: "Kopi susu", price: 18000 },
  { at: 900, name: "Roti bakar", price: 12000 },
  { at: 1500, name: "Es teh", price: 5000 },
];
const LOG_DONE = 2100;
const LOG_END = 2400;

function QuickLog() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const t0 = performance.now();
    const id = setInterval(() => {
      const e = Math.min(LOG_END, performance.now() - t0);
      setElapsed(e);
      if (e >= LOG_END) {
        clearInterval(id);
        setRunning(false);
      }
    }, 60);
    return () => clearInterval(id);
  }, [running]);

  const shown = LOG_ITEMS.filter((i) => elapsed >= i.at);
  const done = elapsed >= LOG_END;
  const idle = elapsed === 0 && !running;

  return (
    <div className="flex h-full flex-col justify-between gap-8">
      <div>
        <p className="font-mono text-6xl font-medium tracking-tight text-paper-50 sm:text-7xl" aria-live="off">
          {(elapsed / 1000).toFixed(1).replace(".", ",")}
          <span className="ml-2 text-2xl text-mist">detik</span>
        </p>
        <p className="mt-2 text-sm text-mist">
          {idle && "Tekan tombol dan lihat berapa lama satu catatan selesai."}
          {running && "Mencatat item satu per satu..."}
          {done && "Tercatat lengkap dengan rincian item."}
        </p>
      </div>

      <div className="min-h-[9.5rem] rounded-lg bg-ink-800 p-4 font-mono text-sm">
        {shown.length === 0 && <p className="text-mist">Belum ada item.</p>}
        <ul className="space-y-1.5">
          {shown.map((i) => (
            <li key={i.name} className="line-in flex items-baseline gap-2">
              <span>{i.name}</span>
              <span className="leader" />
              <span>{formatNumber(i.price)}</span>
            </li>
          ))}
          {elapsed >= LOG_DONE && (
            <li className="line-in flex items-baseline gap-2 border-t border-dashed border-ink-600 pt-1.5 font-medium text-signal">
              <span>Total</span>
              <span className="leader" />
              <span>{formatNumber(LOG_ITEMS.reduce((a, i) => a + i.price, 0))}</span>
            </li>
          )}
        </ul>
      </div>

      <button
        type="button"
        onClick={() => {
          setElapsed(0);
          setRunning(true);
        }}
        disabled={running}
        className="self-start rounded-md bg-signal px-5 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-paper-50 disabled:opacity-60"
      >
        {running ? "Mencatat..." : done ? "Ulangi" : "Catat satu transaksi"}
      </button>
    </div>
  );
}

/* ---------------- Limit anggaran ---------------- */

const LIMIT = 1500000;

function BudgetLimit() {
  const [spent, setSpent] = useState(750000);
  const pct = spent / LIMIT;
  const near = pct >= 0.8 && pct <= 1;
  const over = pct > 1;
  const warn = near || over;

  return (
    <div className="flex h-full flex-col justify-between gap-8">
      <div>
        <p className="text-sm text-mist">Makanan dan jajan, batas bulanan {formatRupiah(LIMIT)}</p>
        <p className="mt-2 font-mono text-4xl font-medium tracking-tight text-paper-50 sm:text-5xl">{formatRupiah(spent)}</p>
        <p className={"mt-2 text-sm font-medium " + (warn ? "text-coral" : "text-signal")} aria-live="polite">
          {!warn && `Aman. Sisa kuota ${formatRupiah(LIMIT - spent)}.`}
          {near && `Mendekati limit 80%. Sisa ${formatRupiah(LIMIT - spent)}.`}
          {over && `Melebihi limit sebesar ${formatRupiah(spent - LIMIT)}.`}
        </p>
      </div>

      <div>
        <div className="relative h-4 w-full overflow-hidden rounded-full bg-ink-700">
          <div
            className={"h-full rounded-full transition-[width,background-color] duration-200 " + (warn ? "bg-coral" : "bg-signal")}
            style={{ width: `${Math.min(100, pct * 100)}%` }}
          />
          <span className="absolute inset-y-0 left-[80%] w-0.5 bg-paper-50/70" aria-hidden="true" />
        </div>
        <div className="relative mt-2 h-4 font-mono text-xs text-mist">
          <span className="absolute left-0">Rp 0</span>
          <span className="absolute left-[80%] -translate-x-1/2">Batas 80%</span>
          <span className="absolute right-0">{formatNumber(LIMIT)}</span>
        </div>

        <label htmlFor="budget-slider" className="mt-6 block text-sm text-paper-100">
          Geser untuk mengubah pengeluaran
        </label>
        <input
          id="budget-slider"
          type="range"
          className="range mt-1"
          min={0}
          max={1800000}
          step={50000}
          value={spent}
          onChange={(e) => setSpent(Number(e.target.value))}
        />
      </div>

      <div className="h-8">
        {warn && (
          <span className={"stamp fade-in " + "text-coral"}>{over ? "Overbudget" : "Hampir limit"}</span>
        )}
      </div>
    </div>
  );
}

/* ---------------- Split bill ---------------- */

const BILL = 150000;
const TAX = 11;
const TIP = 10000;

function SplitBill() {
  const [people, setPeople] = useState(3);
  const tax = (BILL * TAX) / 100;
  const total = BILL + tax + TIP;
  const per = Math.ceil(total / people);

  return (
    <div className="flex h-full flex-col justify-between gap-8">
      <div>
        <p className="text-sm text-mist">Setiap orang bayar</p>
        <p className="mt-2 font-mono text-4xl font-medium tracking-tight text-paper-50 sm:text-5xl" aria-live="polite">
          {formatRupiah(per)}
        </p>
      </div>

      <div className="flex gap-1.5" aria-hidden="true">
        {Array.from({ length: people }).map((_, i) => (
          <span key={i} className="fade-in flex h-14 flex-1 items-end justify-center rounded-md bg-ink-700 pb-1.5 text-mist">
            <Icon name="users" size={16} />
          </span>
        ))}
      </div>

      <dl className="space-y-1.5 rounded-lg bg-ink-800 p-4 font-mono text-sm">
        <div className="flex items-baseline gap-2">
          <dt>Tagihan</dt>
          <span className="leader" />
          <dd>{formatNumber(BILL)}</dd>
        </div>
        <div className="flex items-baseline gap-2">
          <dt>PPN {TAX}%</dt>
          <span className="leader" />
          <dd>{formatNumber(tax)}</dd>
        </div>
        <div className="flex items-baseline gap-2">
          <dt>Tip</dt>
          <span className="leader" />
          <dd>{formatNumber(TIP)}</dd>
        </div>
        <div className="flex items-baseline gap-2 border-t border-dashed border-ink-600 pt-1.5 font-medium text-signal">
          <dt>Total</dt>
          <span className="leader" />
          <dd>{formatNumber(total)}</dd>
        </div>
      </dl>

      <div className="flex items-center gap-4">
        <span className="text-sm text-paper-100">Jumlah orang</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Kurangi orang"
            onClick={() => setPeople((p) => Math.max(1, p - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-ink-600 hover:bg-ink-800"
          >
            <Icon name="minus" size={16} />
          </button>
          <span className="w-12 text-center font-mono text-lg font-medium text-signal">{people}</span>
          <button
            type="button"
            aria-label="Tambah orang"
            onClick={() => setPeople((p) => Math.min(8, p + 1))}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-ink-600 hover:bg-ink-800"
          >
            <Icon name="plus" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
