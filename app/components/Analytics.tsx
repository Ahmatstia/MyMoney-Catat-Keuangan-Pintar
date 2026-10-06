"use client";

import { useState, type ReactNode } from "react";
import Icon, { type IconName } from "./Icon";
import { formatNumber, formatRupiah } from "../format";

/* =====================================================================
   Data contoh (fiktif). Angka sengaja bulat supaya mudah diikuti.
===================================================================== */

interface Cat {
  id: string;
  name: string;
  icon: IconName;
  color: string;
  amount: number;
  items: [string, number][];
}

const CATS: Cat[] = [
  {
    id: "makan",
    name: "Makan",
    icon: "food",
    color: "#07656c",
    amount: 1250000,
    items: [
      ["Warung Bu Sari", 35000],
      ["Nasi padang", 28000],
      ["Kopi susu", 18000],
    ],
  },
  {
    id: "belanja",
    name: "Belanja",
    icon: "bag",
    color: "#3bdce6",
    amount: 720000,
    items: [
      ["Supermarket", 214500],
      ["Pakaian", 150000],
      ["Perlengkapan rumah", 89000],
    ],
  },
  {
    id: "tagihan",
    name: "Tagihan",
    icon: "receipt",
    color: "#f4c14d",
    amount: 640000,
    items: [
      ["Listrik", 250000],
      ["Internet", 220000],
      ["Pulsa", 50000],
    ],
  },
  {
    id: "transport",
    name: "Transport",
    icon: "car",
    color: "#ff7a66",
    amount: 480000,
    items: [
      ["Bensin", 100000],
      ["Parkir bulanan", 60000],
      ["Ojek online", 24000],
    ],
  },
  {
    id: "hiburan",
    name: "Hiburan",
    icon: "spark",
    color: "#476560",
    amount: 310000,
    items: [
      ["Langganan musik", 55000],
      ["Bioskop", 50000],
      ["Game", 30000],
    ],
  },
];

const CAT_TOTAL = CATS.reduce((a, c) => a + c.amount, 0);

/* Posisi awal tiap irisan pada lingkaran berkeliling 100. */
const SEGMENTS = CATS.map((c, i) => {
  const before = CATS.slice(0, i).reduce((a, x) => a + x.amount, 0);
  return { ...c, pct: (c.amount / CAT_TOTAL) * 100, start: (before / CAT_TOTAL) * 100 };
});

/* =====================================================================
   1. Donut kategori
===================================================================== */

function CategoryDonut() {
  const [sel, setSel] = useState<string | null>(null);
  const active = SEGMENTS.find((s) => s.id === sel) ?? null;

  const toggle = (id: string) => setSel((cur) => (cur === id ? null : id));

  return (
    <div className="grid gap-8 md:grid-cols-[15rem_1fr] md:items-center">
      <div className="relative mx-auto aspect-square w-60 max-w-full">
        <svg viewBox="0 0 42 42" className="h-full w-full -rotate-90" role="img" aria-label="Diagram donut pengeluaran per kategori">
          <circle cx="21" cy="21" r="15.9155" fill="none" stroke="var(--color-paper-200)" strokeWidth="6" />
          {SEGMENTS.map((s) => {
            const on = sel === s.id;
            const dim = sel !== null && !on;
            return (
              <circle
                key={s.id}
                cx="21"
                cy="21"
                r="15.9155"
                fill="none"
                stroke={s.color}
                strokeWidth={on ? 8 : 6}
                strokeDasharray={`${Math.max(s.pct - 0.7, 0)} ${100 - Math.max(s.pct - 0.7, 0)}`}
                strokeDashoffset={-s.start}
                opacity={dim ? 0.28 : 1}
                className="cursor-pointer transition-all duration-300"
                onClick={() => toggle(s.id)}
              />
            );
          })}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          {active ? (
            <div key={active.id} className="fade-in">
              <p className="font-display text-sm font-bold text-moss">{active.name}</p>
              <p className="font-mono text-3xl font-medium leading-tight">{Math.round(active.pct)}%</p>
              <p className="font-mono text-xs text-moss">{formatRupiah(active.amount)}</p>
            </div>
          ) : (
            <div className="fade-in">
              <p className="font-display text-sm font-bold text-moss">Total bulan ini</p>
              <p className="mt-1 font-mono text-lg font-medium leading-tight">{formatRupiah(CAT_TOTAL)}</p>
              <p className="mt-1 text-[11px] text-moss">Ketuk satu irisan</p>
            </div>
          )}
        </div>
      </div>

      <ul className="space-y-1.5">
        {SEGMENTS.map((s) => {
          const on = sel === s.id;
          return (
            <li key={s.id}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => toggle(s.id)}
                className={
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors " +
                  (on ? "bg-paper-200" : "hover:bg-paper-100")
                }
              >
                <span className="h-3.5 w-3.5 shrink-0 rounded-sm" style={{ background: s.color }} />
                <span className="flex items-center gap-1.5 font-medium">
                  <Icon name={s.icon} size={15} className="text-moss" />
                  {s.name}
                </span>
                <span className="leader" />
                <span className="font-mono text-sm">{formatNumber(s.amount)}</span>
                <span className="w-10 text-right font-mono text-xs text-moss">{Math.round(s.pct)}%</span>
              </button>
              {on && (
                <ul className="fade-in mb-1 ml-9 mr-3 mt-1 space-y-1 border-l-2 pl-3 font-mono text-xs text-moss" style={{ borderColor: s.color }}>
                  {s.items.map(([n, v]) => (
                    <li key={n} className="flex items-center gap-2">
                      <span>{n}</span>
                      <span className="leader" />
                      <span>{formatNumber(v)}</span>
                    </li>
                  ))}
                  <li className="pt-0.5 font-sans text-[11px]">Tiga transaksi terbesar</li>
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* =====================================================================
   2. Proyeksi akhir periode
===================================================================== */

const CASH = 2400000;
const DAYS = 18;
const SAFE = CASH / DAYS;

type Verdict = { label: string; color: string; note: string };

function verdictFor(total: number): Verdict {
  const ratio = total / CASH;
  if (ratio > 1)
    return { label: "Defisit", color: "var(--color-stamp)", note: "Kas habis sebelum periode berakhir. Kurangi belanja harian." };
  if (ratio > 0.85)
    return { label: "Mepet", color: "var(--color-amber-deep)", note: "Cukup, tetapi nyaris tanpa sisa untuk kebutuhan tak terduga." };
  return { label: "Surplus", color: "var(--color-signal-deep)", note: "Aman. Masih ada sisa kas di akhir periode." };
}

function Projection() {
  const [burn, setBurn] = useState(110000);
  const total = burn * DAYS;
  const end = CASH - total;
  const v = verdictFor(total);
  const runOut = end < 0 ? Math.floor(CASH / burn) : null;

  // Kurva saldo: dari CASH ke end. Sumbu Y mengikuti nilai terendah.
  const W = 320;
  const H = 150;
  const padX = 8;
  const top = 10;
  const bottom = 18;
  const yMin = Math.min(0, end) * 1.08;
  const yMax = CASH;
  const x = (d: number) => padX + (d / DAYS) * (W - padX * 2);
  const y = (val: number) => top + ((yMax - val) / (yMax - yMin)) * (H - top - bottom);
  const zeroY = y(0);

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs text-moss">Rata-rata belanja per hari</p>
          <p className="font-mono text-2xl font-medium">{formatRupiah(burn)}</p>
        </div>
        <span key={v.label} className="stamp stamp-in" style={{ color: v.color }}>
          {v.label}
        </span>
      </div>

      <input
        type="range"
        min={20000}
        max={200000}
        step={5000}
        value={burn}
        onChange={(e) => setBurn(Number(e.target.value))}
        aria-label="Rata-rata belanja per hari"
        className="range on-paper mt-3"
      />

      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 w-full" role="img" aria-label="Proyeksi saldo kas hingga akhir periode">
        <line x1={padX} x2={W - padX} y1={zeroY} y2={zeroY} stroke="var(--color-moss)" strokeWidth="1" strokeDasharray="3 3" />
        <line x1={x(0)} y1={y(CASH)} x2={x(DAYS)} y2={y(0)} stroke="var(--color-paper-300)" strokeWidth="2" strokeDasharray="5 4" />
        <path
          d={`M ${x(0)} ${y(CASH)} L ${x(DAYS)} ${y(end)}`}
          fill="none"
          stroke={v.color}
          strokeWidth="3"
          strokeLinecap="round"
          className="transition-all duration-200"
        />
        <circle cx={x(0)} cy={y(CASH)} r="4" fill="var(--color-leaf)" />
        <circle cx={x(DAYS)} cy={y(end)} r="5" fill={v.color} />
        {runOut !== null && <circle cx={x(CASH / burn)} cy={zeroY} r="5" fill="var(--color-paper-50)" stroke="var(--color-stamp)" strokeWidth="2.5" />}
        <text x={padX} y={H - 3} fontSize="9" fill="var(--color-moss)" fontFamily="var(--font-mono)">
          hari 0
        </text>
        <text x={W - padX} y={H - 3} fontSize="9" fill="var(--color-moss)" fontFamily="var(--font-mono)" textAnchor="end">
          hari {DAYS}
        </text>
        <text x={padX} y={zeroY - 4} fontSize="9" fill="var(--color-moss)" fontFamily="var(--font-mono)">
          Rp 0
        </text>
      </svg>
      <p className="mt-1 text-[11px] text-moss">Garis putus-putus abu: jalur aman ({formatRupiah(Math.round(SAFE))} per hari).</p>

      <dl className="mt-4 space-y-2 font-mono text-sm">
        <div className="flex items-center gap-2">
          <dt className="font-sans text-moss">Sisa kas sekarang</dt>
          <span className="leader" />
          <dd>{formatRupiah(CASH)}</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="font-sans text-moss">Proyeksi belanja {DAYS} hari</dt>
          <span className="leader" />
          <dd>{formatRupiah(total)}</dd>
        </div>
        <div className="flex items-center gap-2 border-t border-dashed border-leaf/40 pt-2 font-medium">
          <dt className="font-sans">{end >= 0 ? "Sisa akhir periode" : "Kekurangan"}</dt>
          <span className="leader" />
          <dd style={{ color: v.color }}>{formatRupiah(Math.abs(end))}</dd>
        </div>
      </dl>
      <p aria-live="polite" className="mt-3 text-sm leading-relaxed text-moss">
        {runOut !== null ? `Kas habis pada hari ke-${runOut}. ` : ""}
        {v.note}
      </p>
    </div>
  );
}

/* =====================================================================
   3. Kalender keuangan (Oktober, fiktif)
===================================================================== */

type Tx = { name: string; amt: number; kind: "in" | "out" };

const CAL: Record<number, Tx[]> = {
  1: [{ name: "Gaji bulanan", amt: 6500000, kind: "in" }, { name: "Sewa kos", amt: 1200000, kind: "out" }],
  2: [{ name: "Makan siang", amt: 28000, kind: "out" }],
  3: [{ name: "Belanja mingguan", amt: 214500, kind: "out" }, { name: "Bensin", amt: 100000, kind: "out" }],
  4: [{ name: "Nonton bioskop", amt: 50000, kind: "out" }, { name: "Makan malam", amt: 65000, kind: "out" }],
  5: [{ name: "Kopi susu", amt: 18000, kind: "out" }],
  6: [{ name: "Makan siang", amt: 32000, kind: "out" }, { name: "Isi GoPay (transfer)", amt: 200000, kind: "out" }],
  8: [{ name: "Proyek lepas", amt: 750000, kind: "in" }],
  9: [{ name: "Listrik", amt: 250000, kind: "out" }],
  10: [{ name: "Makan siang", amt: 30000, kind: "out" }, { name: "Parkir", amt: 5000, kind: "out" }],
  12: [{ name: "Internet", amt: 220000, kind: "out" }],
  13: [{ name: "Kopi susu", amt: 18000, kind: "out" }, { name: "Ojek online", amt: 24000, kind: "out" }],
  15: [{ name: "Belanja pakaian", amt: 150000, kind: "out" }],
  16: [{ name: "Bonus tugas", amt: 300000, kind: "in" }],
  17: [{ name: "Makan malam", amt: 72000, kind: "out" }],
  19: [{ name: "Langganan musik", amt: 55000, kind: "out" }],
  20: [{ name: "Bensin", amt: 100000, kind: "out" }, { name: "Makan siang", amt: 27000, kind: "out" }],
  22: [{ name: "Perlengkapan rumah", amt: 89000, kind: "out" }],
  24: [{ name: "Makan bersama", amt: 95000, kind: "out" }],
  26: [{ name: "Pulsa", amt: 50000, kind: "out" }, { name: "Kopi susu", amt: 18000, kind: "out" }],
  28: [{ name: "Belanja mingguan", amt: 180000, kind: "out" }],
  30: [{ name: "Game", amt: 30000, kind: "out" }],
};

const MONTH_LEN = 31;
const MONTH_OFFSET = 3; // 1 Oktober jatuh pada hari Kamis (Senin = 0).
const TODAY = 6;
const WEEKDAYS = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];

function FinanceCalendar() {
  const [day, setDay] = useState(TODAY);
  const list = CAL[day] ?? [];
  const income = list.filter((t) => t.kind === "in").reduce((a, t) => a + t.amt, 0);
  const expense = list.filter((t) => t.kind === "out").reduce((a, t) => a + t.amt, 0);

  const cells: (number | null)[] = [
    ...Array.from({ length: MONTH_OFFSET }, () => null),
    ...Array.from({ length: MONTH_LEN }, (_, i) => i + 1),
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
      <div>
        <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wider text-moss">
          {WEEKDAYS.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1">
          {cells.map((d, i) => {
            if (d === null) return <span key={`e${i}`} />;
            const txs = CAL[d] ?? [];
            const hasIn = txs.some((t) => t.kind === "in");
            const outs = txs.filter((t) => t.kind === "out").length;
            const on = day === d;
            return (
              <button
                key={d}
                type="button"
                aria-pressed={on}
                aria-label={`Tanggal ${d} Oktober, ${txs.length} transaksi`}
                onClick={() => setDay(d)}
                className={
                  "relative flex h-14 flex-col items-center justify-center rounded-lg border font-mono text-sm transition-colors sm:h-16 " +
                  (on
                    ? "border-leaf bg-leaf text-paper-50"
                    : d === TODAY
                      ? "border-signal-deep bg-paper-100 hover:bg-paper-200"
                      : "border-transparent hover:bg-paper-200")
                }
              >
                {d}
                <span className="mt-0.5 flex h-1.5 gap-0.5">
                  {hasIn && <span className="h-1.5 w-1.5 rounded-full" style={{ background: on ? "var(--color-mint)" : "var(--color-signal-deep)" }} />}
                  {Array.from({ length: Math.min(outs, 2) }, (_, k) => (
                    <span key={k} className="h-1.5 w-1.5 rounded-full" style={{ background: on ? "var(--color-coral)" : "var(--color-stamp)" }} />
                  ))}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-moss">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-signal-deep" /> Pemasukan
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-stamp" /> Pengeluaran
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm border border-signal-deep" /> Hari ini
          </span>
        </p>
      </div>

      <div key={day} className="fade-in self-start rounded-lg border border-dashed border-leaf/40 p-5 font-mono">
        <p className="font-display text-lg font-bold">{day} Oktober</p>
        {list.length === 0 ? (
          <p className="mt-3 font-sans text-sm leading-relaxed text-moss">Tidak ada transaksi. Hari tanpa belanja menambah jatah hari berikutnya.</p>
        ) : (
          <>
            <ul className="mt-3 space-y-2 text-sm">
              {list.map((t) => (
                <li key={t.name} className="flex items-center gap-2">
                  <span className="font-sans">{t.name}</span>
                  <span className="leader" />
                  <span className={t.kind === "in" ? "text-signal-deep" : "text-stamp"}>
                    {t.kind === "in" ? "+" : "-"}
                    {formatNumber(t.amt)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-1 border-t border-dashed border-leaf/40 pt-3 text-xs text-moss">
              {income > 0 && (
                <p className="flex justify-between">
                  <span className="font-sans">Masuk</span>
                  <span>{formatRupiah(income)}</span>
                </p>
              )}
              {expense > 0 && (
                <p className="flex justify-between">
                  <span className="font-sans">Keluar</span>
                  <span>{formatRupiah(expense)}</span>
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* =====================================================================
   Section
===================================================================== */

function Card({ icon, title, hint, children, className = "" }: { icon: IconName; title: string; hint: string; children: ReactNode; className?: string }) {
  return (
    <article className={"flex flex-col rounded-xl border border-paper-300 bg-paper-50 p-6 shadow-[0_18px_34px_-24px_rgba(8,42,38,0.45)] sm:p-8 " + className}>
      <header className="mb-6 flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-leaf text-signal">
          <Icon name={icon} size={20} />
        </span>
        <div>
          <h3 className="font-display text-xl font-bold leading-tight tracking-tight">{title}</h3>
          <p className="mt-0.5 text-sm text-moss">{hint}</p>
        </div>
      </header>
      <div className="flex flex-1 flex-col justify-center">{children}</div>
    </article>
  );
}

export default function Analytics() {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <h2 className="h-section max-w-3xl">Lihat ke mana uang Anda pergi, sebelum bulan berakhir</h2>
      <p className="lede mt-5 text-moss">
        Analisis di MyMoney dibuat untuk mengambil keputusan, bukan sekadar laporan. Ketuk, geser, dan lihat angkanya
        berubah. Semua data di bawah ini contoh.
      </p>

      <div className="mt-12 grid gap-6 lg:grid-cols-12">
        <Card icon="pie" title="Pengeluaran per kategori" hint="Ketuk irisan atau daftar untuk melihat rinciannya." className="lg:col-span-7">
          <CategoryDonut />
        </Card>
        <Card icon="trend" title="Proyeksi akhir periode" hint="Geser rata-rata belanja harian dan lihat sisa kas." className="lg:col-span-5">
          <Projection />
        </Card>
        <Card icon="calendar" title="Kalender keuangan" hint="Titik menandai hari yang ada transaksinya." className="lg:col-span-12">
          <FinanceCalendar />
        </Card>
      </div>
    </div>
  );
}
