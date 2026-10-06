"use client";

import { useEffect, useState } from "react";
import Icon, { type IconName } from "./Icon";
import { formatNumber, formatRupiah } from "../format";

/* =====================================================================
   1. Catat secepat kilat
===================================================================== */

const LOG_ITEMS = [
  { at: 300, name: "Kopi susu", price: 18000 },
  { at: 900, name: "Roti bakar", price: 12000 },
  { at: 1500, name: "Es teh", price: 5000 },
];
const LOG_DONE = 2100;
const LOG_END = 2400;

export function QuickLog() {
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

/* =====================================================================
   2. Batas harian aman (sisa kas ÷ sisa hari, koreksi dua arah)
===================================================================== */

const DAYS = 15;
const KAS0 = 3000000;
const SPEND_CHOICES = [0, 100000, 200000, 350000, 500000];
const SCALE = 500000;

export function DailyLimitSim() {
  const [kas, setKas] = useState(KAS0);
  const [d, setD] = useState(0);
  const [log, setLog] = useState<{ spend: number; limit: number }[]>([]);
  const [pick, setPick] = useState(100000);
  const [note, setNote] = useState("");

  const daysLeft = DAYS - d;
  const broke = kas <= 0 && d < DAYS;
  const finished = d >= DAYS || broke;
  const limit = daysLeft > 0 ? Math.floor(kas / daysLeft) : 0;

  const close = () => {
    const spend = Math.min(pick, kas);
    const nextKas = kas - spend;
    const nextD = d + 1;
    setLog((l) => [...l, { spend, limit }]);
    setKas(nextKas);
    setD(nextD);
    if (nextKas <= 0 && nextD < DAYS) {
      setNote(`Kas habis di hari ke-${nextD}, padahal masih ada ${DAYS - nextD} hari.`);
    } else if (nextD < DAYS) {
      const nextLimit = Math.floor(nextKas / (DAYS - nextD));
      const diff = nextLimit - limit;
      setNote(
        diff >= 0
          ? `Hemat. Batas besok naik ${formatRupiah(diff)} menjadi ${formatRupiah(nextLimit)}.`
          : `Melebihi jatah. Batas besok turun ${formatRupiah(-diff)} menjadi ${formatRupiah(nextLimit)}.`
      );
    } else {
      setNote(`Pembukuan selesai. Sisa kas ${formatRupiah(nextKas)}.`);
    }
  };

  const reset = () => {
    setKas(KAS0);
    setD(0);
    setLog([]);
    setNote("");
    setPick(100000);
  };

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-mist">
            Hari ke-{Math.min(d + 1, DAYS)} dari {DAYS} · sisa kas {formatRupiah(Math.max(0, kas))}
          </p>
          <p className="mt-1 font-mono text-4xl font-medium tracking-tight text-paper-50 sm:text-5xl">
            {formatRupiah(finished ? 0 : limit)}
          </p>
          <p className="mt-1 font-mono text-xs text-mist">
            {formatNumber(Math.max(0, kas))} ÷ {Math.max(0, daysLeft)} hari = batas harian aman
          </p>
        </div>
      </div>

      {/* Riwayat hari: batang = belanja, garis putus = batas hari itu */}
      <div>
        <div className="flex h-32 items-end gap-1" role="img" aria-label="Grafik belanja per hari dibanding batas harian">
          {Array.from({ length: DAYS }).map((_, i) => {
            const entry = log[i];
            const current = i === d && !finished;
            const spend = entry ? entry.spend : current ? Math.min(pick, kas) : 0;
            const lim = entry ? entry.limit : current ? limit : 0;
            const over = entry ? entry.spend > entry.limit : false;
            return (
              <div key={i} className="relative h-full flex-1">
                <span
                  className={
                    "absolute inset-x-0 bottom-0 rounded-t-sm transition-all duration-300 " +
                    (entry ? (over ? "bg-coral" : "bg-signal") : current ? "border border-dashed border-signal bg-signal/20" : "")
                  }
                  style={{ height: `${Math.min(100, (spend / SCALE) * 100).toFixed(2)}%` }}
                />
                {(entry || current) && (
                  <span
                    className="absolute inset-x-[-1px] border-t-2 border-paper-50/80"
                    style={{ bottom: `${Math.min(100, (lim / SCALE) * 100).toFixed(2)}%` }}
                  />
                )}
                {!entry && !current && <span className="absolute inset-x-0 bottom-0 h-0.5 rounded bg-ink-700" />}
              </div>
            );
          })}
        </div>
        <p className="mt-2 flex items-center gap-4 text-[11px] text-mist">
          <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-sm bg-signal" /> di bawah batas</span>
          <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-sm bg-coral" /> melebihi</span>
          <span className="flex items-center gap-1.5"><i className="h-0.5 w-3 bg-paper-50/80" /> batas hari itu</span>
        </p>
      </div>

      <p aria-live="polite" className={"min-h-[2.5rem] text-sm font-medium " + (note.startsWith("Melebihi") || note.startsWith("Kas habis") ? "text-coral" : "text-signal")}>
        {note || "Pilih berapa yang Anda belanjakan hari ini, lalu tutup hari."}
      </p>

      {!finished ? (
        <div className="mt-auto">
          <p className="mb-2 text-xs text-mist">Belanja hari ini</p>
          <div className="flex flex-wrap items-center gap-2">
            {SPEND_CHOICES.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={pick === c}
                onClick={() => setPick(c)}
                className={
                  "rounded-md border px-3 py-2 font-mono text-xs font-medium transition-colors " +
                  (pick === c ? "border-signal bg-signal/15 text-signal" : "border-ink-600 text-paper-100 hover:bg-ink-800")
                }
              >
                {c === 0 ? "Tidak belanja" : formatNumber(c)}
              </button>
            ))}
            <button
              type="button"
              onClick={close}
              className="ml-auto rounded-md bg-signal px-4 py-2.5 text-sm font-semibold text-ink-950 transition-colors hover:bg-paper-50"
            >
              Tutup hari ini
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={reset}
          className="mt-auto self-start rounded-md bg-signal px-5 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-paper-50"
        >
          Ulangi dari awal
        </button>
      )}
    </div>
  );
}

/* =====================================================================
   3. Transfer antar dompet (netral, hanya biaya admin yang jadi pengeluaran)
===================================================================== */

interface SimWallet {
  id: string;
  name: string;
  icon: IconName;
  balance: number;
}

const SIM_WALLETS: SimWallet[] = [
  { id: "bca", name: "BCA", icon: "bank", balance: 7500000 },
  { id: "kas", name: "Tunai", icon: "cash", balance: 650000 },
  { id: "gopay", name: "GoPay", icon: "wallet", balance: 350000 },
  { id: "celengan", name: "Tabungan Liburan", icon: "piggy", balance: 6500000 },
];

function WalletPicker({
  label,
  value,
  onChange,
  wallets,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  wallets: SimWallet[];
}) {
  return (
    <div>
      <p className="mb-1.5 text-xs text-mist">{label}</p>
      <div className="flex flex-wrap gap-1.5" role="group" aria-label={label}>
        {wallets.map((w) => (
          <button
            key={w.id}
            type="button"
            aria-pressed={value === w.id}
            onClick={() => onChange(w.id)}
            className={
              "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-2 text-xs font-semibold transition-colors " +
              (value === w.id ? "border-signal bg-signal/15 text-signal" : "border-ink-600 text-paper-100 hover:bg-ink-800")
            }
          >
            <Icon name={w.icon} size={13} />
            {w.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export function TransferSim() {
  const [wallets, setWallets] = useState(SIM_WALLETS);
  const [from, setFrom] = useState("bca");
  const [to, setTo] = useState("gopay");
  const [amount, setAmount] = useState(200000);
  const [fee, setFee] = useState(6500);
  const [fees, setFees] = useState(0);
  const [msg, setMsg] = useState<{ text: string; bad?: boolean } | null>(null);
  const [flash, setFlash] = useState<string[]>([]);
  const [tick, setTick] = useState(0);

  const total = wallets.reduce((a, w) => a + w.balance, 0);

  const move = () => {
    if (from === to) return setMsg({ text: "Pilih dompet asal dan tujuan yang berbeda.", bad: true });
    const src = wallets.find((w) => w.id === from)!;
    if (src.balance < amount + fee) return setMsg({ text: `Saldo ${src.name} tidak cukup.`, bad: true });
    setWallets((ws) =>
      ws.map((w) =>
        w.id === from ? { ...w, balance: w.balance - amount - fee } : w.id === to ? { ...w, balance: w.balance + amount } : w
      )
    );
    setFees((f) => f + fee);
    setFlash([from, to]);
    setTick((t) => t + 1);
    setMsg({
      text:
        fee > 0
          ? `Dipindahkan ${formatRupiah(amount)}. Total kekayaan hanya berkurang sebesar biaya admin ${formatRupiah(fee)}.`
          : `Dipindahkan ${formatRupiah(amount)}. Total kekayaan tidak berubah sama sekali.`,
    });
  };

  const reset = () => {
    setWallets(SIM_WALLETS);
    setFees(0);
    setMsg(null);
    setFlash([]);
  };

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {wallets.map((w) => (
          <div
            key={w.id + (flash.includes(w.id) ? tick : "")}
            className={"rounded-lg bg-ink-800 p-3 " + (flash.includes(w.id) ? "pop ring-1 ring-signal" : "")}
          >
            <Icon name={w.icon} size={16} className="text-signal" />
            <p className="mt-1.5 truncate text-[11px] text-mist">{w.name}</p>
            <p className="font-mono text-sm font-medium text-paper-50">{formatNumber(w.balance)}</p>
          </div>
        ))}
      </div>

      <dl className="grid grid-cols-2 gap-3 rounded-lg border border-ink-600 p-3 font-mono text-xs">
        <div>
          <dt className="text-mist">Total kekayaan</dt>
          <dd className="mt-0.5 text-base font-medium text-paper-50">{formatRupiah(total)}</dd>
        </div>
        <div>
          <dt className="text-mist">Pengeluaran dari transfer</dt>
          <dd className={"mt-0.5 text-base font-medium " + (fees > 0 ? "text-coral" : "text-signal")}>{formatRupiah(fees)}</dd>
        </div>
      </dl>

      <WalletPicker label="Dari" value={from} onChange={setFrom} wallets={wallets} />
      <WalletPicker label="Ke" value={to} onChange={setTo} wallets={wallets} />

      <div className="flex flex-wrap gap-6">
        <div>
          <p className="mb-1.5 text-xs text-mist">Nominal</p>
          <div className="flex gap-1.5">
            {[100000, 200000, 500000].map((a) => (
              <button
                key={a}
                type="button"
                aria-pressed={amount === a}
                onClick={() => setAmount(a)}
                className={
                  "rounded-md border px-2.5 py-2 font-mono text-xs font-medium " +
                  (amount === a ? "border-signal bg-signal/15 text-signal" : "border-ink-600 text-paper-100 hover:bg-ink-800")
                }
              >
                {formatNumber(a)}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-1.5 text-xs text-mist">Biaya admin</p>
          <div className="flex gap-1.5">
            {[0, 2500, 6500].map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={fee === f}
                onClick={() => setFee(f)}
                className={
                  "rounded-md border px-2.5 py-2 font-mono text-xs font-medium " +
                  (fee === f ? "border-signal bg-signal/15 text-signal" : "border-ink-600 text-paper-100 hover:bg-ink-800")
                }
              >
                {f === 0 ? "Tanpa" : formatNumber(f)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p aria-live="polite" className={"min-h-[2.5rem] text-sm font-medium " + (msg?.bad ? "text-coral" : "text-signal")}>
        {msg?.text ?? "Atur dompet dan nominal, lalu pindahkan. Perhatikan total kekayaan."}
      </p>

      <div className="mt-auto flex items-center gap-3">
        <button
          type="button"
          onClick={move}
          className="rounded-md bg-signal px-5 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-paper-50"
        >
          Pindahkan
        </button>
        <button type="button" onClick={reset} className="text-sm font-medium text-mist underline-offset-4 hover:text-paper-50 hover:underline">
          Reset
        </button>
      </div>
    </div>
  );
}

/* =====================================================================
   4. Rincian struk belanja (sub-transaksi)
===================================================================== */

const CATALOG = [
  { name: "Beras 5 kg", price: 68000, cat: "Kebutuhan pokok" },
  { name: "Minyak goreng", price: 19500, cat: "Kebutuhan pokok" },
  { name: "Sabun cuci piring", price: 12500, cat: "Kebersihan" },
  { name: "Sabun mandi", price: 4500, cat: "Kebersihan" },
  { name: "Keripik singkong", price: 11000, cat: "Jajan" },
  { name: "Kopi sachet", price: 2500, cat: "Jajan" },
] as const;
const CATS = ["Kebutuhan pokok", "Kebersihan", "Jajan"] as const;

export function ReceiptSim() {
  const [qty, setQty] = useState<Record<string, number>>({
    "Beras 5 kg": 1,
    "Minyak goreng": 1,
    "Sabun mandi": 2,
    "Keripik singkong": 1,
  });

  const add = (name: string, by: number) =>
    setQty((q) => {
      const n = Math.max(0, (q[name] ?? 0) + by);
      const next = { ...q, [name]: n };
      if (n === 0) delete next[name];
      return next;
    });

  const rows = CATALOG.filter((c) => qty[c.name]);
  const total = rows.reduce((a, c) => a + c.price * qty[c.name], 0);
  const byCat = CATS.map((cat) => ({
    cat,
    sum: rows.filter((c) => c.cat === cat).reduce((a, c) => a + c.price * qty[c.name], 0),
  }));

  return (
    <div className="grid h-full gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-5">
        <div>
          <p className="mb-2 text-xs text-mist">Tambah item ke struk</p>
          <div className="flex flex-wrap gap-1.5">
            {CATALOG.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => add(c.name, 1)}
                className="inline-flex items-center gap-1.5 rounded-md border border-ink-600 px-2.5 py-2 text-xs font-semibold text-paper-100 transition-colors hover:border-signal hover:text-signal"
              >
                <Icon name="plus" size={12} strokeWidth={2.4} />
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs text-mist">Satu struk, dibagi ke pos yang tepat</p>
          <ul className="space-y-2.5">
            {byCat.map((b) => (
              <li key={b.cat}>
                <div className="flex items-baseline justify-between text-xs">
                  <span className="text-paper-100">{b.cat}</span>
                  <span className="font-mono font-medium text-paper-50">{formatRupiah(b.sum)}</span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-ink-700">
                  <div
                    className="h-full rounded-full bg-signal transition-all duration-300"
                    style={{ width: `${total ? ((b.sum / total) * 100).toFixed(2) : 0}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="drop-shadow-[0_14px_22px_rgba(0,0,0,0.35)]">
        <div className="receipt px-5 pt-5 text-[12px] leading-snug">
          <p className="font-display text-lg font-bold leading-none">Minimarket Sejahtera</p>
          <p className="mt-1 text-[10px] text-moss">Rincian item struk</p>
          <div className="my-3 border-t border-dashed border-leaf/40" />
          {rows.length === 0 && <p className="py-3 text-moss">Belum ada item. Tambah dari daftar.</p>}
          <ul className="space-y-2">
            {rows.map((c) => (
              <li key={c.name} className="line-in">
                <p className="flex items-baseline gap-1.5">
                  <span>{c.name}</span>
                  <span className="leader" />
                  <span>{formatNumber(c.price * qty[c.name])}</span>
                </p>
                <p className="mt-0.5 flex items-center gap-2 text-moss">
                  <span className="inline-flex items-center overflow-hidden rounded border border-leaf/30">
                    <button type="button" aria-label={`Kurangi ${c.name}`} onClick={() => add(c.name, -1)} className="px-1.5 py-0.5 hover:bg-leaf/10">
                      −
                    </button>
                    <span className="px-1.5">{qty[c.name]}</span>
                    <button type="button" aria-label={`Tambah ${c.name}`} onClick={() => add(c.name, 1)} className="px-1.5 py-0.5 hover:bg-leaf/10">
                      +
                    </button>
                  </span>
                  <span>× {formatNumber(c.price)}</span>
                </p>
              </li>
            ))}
          </ul>
          <div className="my-3 border-t border-dashed border-leaf/40" />
          <p className="flex items-baseline gap-1.5 text-sm font-medium">
            <span>Total transaksi</span>
            <span className="leader" />
            <span>{formatNumber(total)}</span>
          </p>
          <p className="mt-1 text-[10px] text-moss">Nominal transaksi utama terisi otomatis dari rincian.</p>
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
   5. Anggaran kategori (hijau < 70%, kuning 70–100%, merah > 100%)
===================================================================== */

const LIMIT = 1500000;

export function BudgetLimit() {
  const [spent, setSpent] = useState(750000);
  const pct = spent / LIMIT;
  const tone = pct > 1 ? "coral" : pct >= 0.7 ? "amber" : "signal";
  const barClass = { coral: "bg-coral", amber: "bg-amber", signal: "bg-signal" }[tone];
  const textClass = { coral: "text-coral", amber: "text-amber", signal: "text-signal" }[tone];
  const alerts = [0.8, 0.9, 1];

  return (
    <div className="flex h-full flex-col justify-between gap-8">
      <div>
        <p className="text-sm text-mist">Makanan dan jajan, batas bulanan {formatRupiah(LIMIT)}</p>
        <p className="mt-2 font-mono text-4xl font-medium tracking-tight text-paper-50 sm:text-5xl">{formatRupiah(spent)}</p>
        <p className={"mt-2 text-sm font-medium " + textClass} aria-live="polite">
          {pct < 0.7 && `Aman. Sisa kuota ${formatRupiah(LIMIT - spent)}.`}
          {pct >= 0.7 && pct <= 1 && `Waspada. Sisa kuota ${formatRupiah(LIMIT - spent)}.`}
          {pct > 1 && `Melebihi limit sebesar ${formatRupiah(spent - LIMIT)}.`}
        </p>
      </div>

      <div>
        <div className="relative h-4 w-full overflow-hidden rounded-full bg-ink-700">
          <div
            className={"h-full rounded-full transition-[width,background-color] duration-200 " + barClass}
            style={{ width: `${Math.min(100, pct * 100).toFixed(2)}%` }}
          />
          <span className="absolute inset-y-0 left-[70%] w-0.5 bg-paper-50/60" aria-hidden="true" />
        </div>
        <div className="relative mt-2 h-4 font-mono text-xs text-mist">
          <span className="absolute left-0">Rp 0</span>
          <span className="absolute left-[70%] -translate-x-1/2">70%</span>
          <span className="absolute right-0">{formatNumber(LIMIT)}</span>
        </div>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Notifikasi anggaran">
          {alerts.map((a) => {
            const on = pct >= a;
            return (
              <li
                key={a}
                className={
                  "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-mono text-[11px] font-medium transition-colors " +
                  (on ? "border-amber/60 bg-amber/10 text-amber" : "border-ink-600 text-mist")
                }
              >
                <Icon name="bell" size={12} />
                Notifikasi {Math.round(a * 100)}%
              </li>
            );
          })}
        </ul>

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

      <div className="h-8">{pct > 1 && <span className="stamp stamp-in text-coral">Overbudget</span>}</div>
    </div>
  );
}

/* =====================================================================
   6. Split bill (bagi rata dan per orang, pajak proporsional)
===================================================================== */

const TAX = 11;
const TIP = 10000;

export function SplitBill() {
  const [mode, setMode] = useState<"equal" | "each">("equal");
  const [bill, setBill] = useState(150000);
  const [people, setPeople] = useState(3);
  const [orders, setOrders] = useState([45000, 62000, 43000]);
  const [copied, setCopied] = useState(false);
  const names = ["Kamu", "Dita", "Raka"];

  const base = mode === "equal" ? bill : orders.reduce((a, b) => a + b, 0);
  const extra = (base * TAX) / 100 + TIP;
  const total = base + extra;
  const shares =
    mode === "equal"
      ? Array.from({ length: people }, () => Math.ceil(total / people))
      : orders.map((o) => Math.ceil(o + (base ? (extra * o) / base : 0)));

  const copy = () => {
    const lines = shares.map((s, i) => `${mode === "equal" ? `Orang ${i + 1}` : names[i]}: ${formatRupiah(s)}`);
    navigator.clipboard?.writeText(
      `*Rincian Split Bill MyMoney*\nTotal: ${formatRupiah(total)}\n${lines.join("\n")}\n\n_Dihitung dengan MyMoney_`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="flex h-full flex-col gap-6">
      <div role="group" aria-label="Mode patungan" className="inline-flex self-start rounded-lg border border-ink-600 p-1">
        {(
          [
            ["equal", "Bagi rata"],
            ["each", "Per orang"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            aria-pressed={mode === id}
            onClick={() => setMode(id)}
            className={
              "rounded-md px-4 py-2 text-sm font-semibold transition-colors " +
              (mode === id ? "bg-signal text-ink-950" : "text-mist hover:text-paper-50")
            }
          >
            {label}
          </button>
        ))}
      </div>

      <div>
        <p className="text-sm text-mist">{mode === "equal" ? "Setiap orang bayar" : "Bagian masing-masing (pajak dan tip proporsional)"}</p>
        {mode === "equal" ? (
          <p className="mt-2 font-mono text-4xl font-medium tracking-tight text-paper-50 sm:text-5xl" aria-live="polite">
            {formatRupiah(shares[0])}
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {orders.map((o, i) => (
              <li key={i} className="flex items-center gap-3 rounded-lg bg-ink-800 p-3">
                <span className="w-12 text-sm font-semibold text-paper-50">{names[i]}</span>
                <label className="flex flex-1 items-center gap-2 font-mono text-xs text-mist">
                  <span className="sr-only">Pesanan {names[i]}</span>
                  Rp
                  <input
                    type="number"
                    inputMode="numeric"
                    value={o}
                    onChange={(e) => setOrders((os) => os.map((v, j) => (j === i ? Number(e.target.value) || 0 : v)))}
                    className="w-24 rounded border border-ink-600 bg-ink-950 px-2 py-1.5 text-paper-50 focus:border-signal focus:outline-none"
                  />
                </label>
                <span className="font-mono text-sm font-medium text-signal">{formatRupiah(shares[i])}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {mode === "equal" && (
        <>
          <div className="flex gap-1.5" aria-hidden="true">
            {Array.from({ length: people }).map((_, i) => (
              <span key={i} className="fade-in flex h-12 flex-1 items-end justify-center rounded-md bg-ink-700 pb-1.5 text-mist">
                <Icon name="users" size={16} />
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <label className="flex items-center gap-3 text-sm text-paper-100">
              Tagihan Rp
              <input
                type="number"
                inputMode="numeric"
                value={bill}
                onChange={(e) => setBill(Number(e.target.value) || 0)}
                className="w-28 rounded border border-ink-600 bg-ink-950 px-2 py-1.5 font-mono text-paper-50 focus:border-signal focus:outline-none"
              />
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm text-paper-100">Jumlah orang</span>
              <button
                type="button"
                aria-label="Kurangi orang"
                onClick={() => setPeople((p) => Math.max(1, p - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-ink-600 hover:bg-ink-800"
              >
                <Icon name="minus" size={16} />
              </button>
              <span className="w-8 text-center font-mono text-lg font-medium text-signal">{people}</span>
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
        </>
      )}

      <dl className="space-y-1.5 rounded-lg bg-ink-800 p-4 font-mono text-sm">
        <div className="flex items-baseline gap-2">
          <dt>Pesanan</dt>
          <span className="leader" />
          <dd>{formatNumber(base)}</dd>
        </div>
        <div className="flex items-baseline gap-2">
          <dt>PPN {TAX}%</dt>
          <span className="leader" />
          <dd>{formatNumber((base * TAX) / 100)}</dd>
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

      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-2 self-start rounded-md bg-signal px-5 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-paper-50"
      >
        <Icon name={copied ? "check" : "copy"} size={16} strokeWidth={2.2} />
        {copied ? "Tersalin" : "Salin ke WhatsApp"}
      </button>
    </div>
  );
}
