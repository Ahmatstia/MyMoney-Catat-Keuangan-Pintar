"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Icon, { type IconName } from "./Icon";
import AddSheet, { type AddPayload } from "./phone/AddSheet";
import GuideSheet from "./phone/GuideSheet";
import {
  BUDGETS,
  CATEGORIES,
  CYCLE_DAYS_LEFT,
  GOAL,
  INITIAL_TRANSACTIONS,
  INITIAL_WALLETS,
  THEMES,
  type Tone,
  type Transaction,
  type TxType,
  type Wallet,
} from "./phone/data";
import { formatNumber, formatRupiah } from "../format";

type TabId = "home" | "transactions" | "budget" | "splitbill";
type Sheet =
  | null
  | { kind: "add"; type: TxType }
  | { kind: "guide"; topic: string }
  | { kind: "receipt"; txId: string };

const TONE_CLASS: Record<Tone, string> = {
  cyan: "bg-signal text-ink-950",
  mint: "bg-mint text-ink-950",
  paper: "bg-paper-100 text-ink-950",
};

const TABS: { id: TabId; label: string; icon: IconName }[] = [
  { id: "home", label: "Beranda", icon: "home" },
  { id: "transactions", label: "Riwayat", icon: "history" },
  { id: "budget", label: "Budget", icon: "target" },
  { id: "splitbill", label: "Tools", icon: "calc" },
];

const SLIDES = ["Saldo total", "Sisa kas bulan ini", "Pengeluaran terbanyak"];

/** Warna bar anggaran: aman di bawah 70%, waspada 70–100%, overbudget di atas 100%. */
const budgetTone = (pct: number) => (pct > 1 ? "coral" : pct >= 0.7 ? "amber" : "signal");
const BAR_CLASS = { coral: "bg-coral", amber: "bg-amber", signal: "bg-signal" } as const;
const TEXT_CLASS = { coral: "text-coral", amber: "text-amber", signal: "text-signal" } as const;

export default function InteractivePhoneDemo() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [hideBalance, setHideBalance] = useState(false);
  const [sheet, setSheet] = useState<Sheet>(null);
  const [airplane, setAirplane] = useState(false);
  const [themeId, setThemeId] = useState<string | null>(null);
  const [hintDismissed, setHintDismissed] = useState(false);
  const [slide, setSlide] = useState(0);
  const [filter, setFilter] = useState("Semua");
  const [toast, setToast] = useState<{ text: string; tone: "ok" | "warn" } | null>(null);

  const [wallets, setWallets] = useState<Wallet[]>(INITIAL_WALLETS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [goalSaved, setGoalSaved] = useState(GOAL.saved);

  // Split Bill State
  const [billAmount, setBillAmount] = useState(150000);
  const [billPeople, setBillPeople] = useState(3);
  const [billTax] = useState(11);
  const [billTip] = useState(10000);
  const [copiedBill, setCopiedBill] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  const theme = THEMES.find((t) => t.id === themeId);
  const themeVars = (theme?.vars ?? {}) as CSSProperties;

  /* ---------- Hitungan ---------- */
  const totalBalance = wallets.reduce((a, w) => a + w.balance, 0);
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((a, t) => a + t.amount, 0);
  const totalExpense = transactions.filter((t) => t.type === "expense").reduce((a, t) => a + t.amount, 0);
  const sisaKas = totalIncome - totalExpense;
  const spentToday = transactions.filter((t) => t.type === "expense" && t.today).reduce((a, t) => a + t.amount, 0);
  const baseDaily = Math.floor((sisaKas + spentToday) / CYCLE_DAYS_LEFT);
  const remainingToday = baseDaily - spentToday;
  const tomorrowDaily = Math.floor(sisaKas / (CYCLE_DAYS_LEFT - 1));

  const topCategory = useMemo(() => {
    const sums: Record<string, number> = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => (sums[t.category] = (sums[t.category] ?? 0) + t.amount));
    const [name, amount] = Object.entries(sums).sort((a, b) => b[1] - a[1])[0] ?? ["-", 0];
    return { name, amount, share: totalExpense ? amount / totalExpense : 0 };
  }, [transactions, totalExpense]);

  const budgetSpent = useCallback(
    (cat: string, list: Transaction[] = transactions) =>
      BUDGETS[cat].base +
      list.filter((t) => t.isNew && t.type === "expense" && t.category === cat).reduce((a, t) => a + t.amount, 0),
    [transactions]
  );

  const mask = (value: string, dots = "••••••") => (hideBalance ? dots : value);

  /* ---------- Efek ---------- */
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3600);
    return () => clearTimeout(id);
  }, [toast]);

  const onCarouselScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    setSlide(Math.round(el.scrollLeft / el.clientWidth));
  };
  const goSlide = (i: number) => {
    const el = carouselRef.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  /* ---------- Aksi ---------- */
  const handleSave = (p: AddPayload) => {
    const id = Date.now().toString();

    if (p.type === "transfer") {
      const fee = p.fee ?? 0;
      const to = wallets.find((w) => w.name === p.toWallet);
      const from = wallets.find((w) => w.name === p.wallet);
      setWallets((prev) =>
        prev.map((w) =>
          w.name === p.wallet
            ? { ...w, balance: w.balance - p.amount - fee }
            : w.name === p.toWallet
            ? { ...w, balance: w.balance + p.amount }
            : w
        )
      );
      const rows: Transaction[] = [
        {
          id,
          title: `${from?.short} ke ${to?.short}`,
          amount: p.amount,
          type: "transfer",
          category: "Transfer",
          wallet: p.wallet,
          toWallet: p.toWallet,
          date: "Baru saja",
          icon: "swap",
          isNew: true,
        },
      ];
      if (fee > 0) {
        rows.unshift({
          id: id + "f",
          title: "Biaya admin transfer",
          amount: fee,
          type: "expense",
          category: "Lainnya",
          wallet: p.wallet,
          date: "Baru saja",
          icon: "card",
          today: true,
          isNew: true,
        });
      }
      setTransactions((prev) => [...rows, ...prev]);
      setToast({
        text:
          fee > 0
            ? `Dipindahkan ${formatRupiah(p.amount)}. Total kekayaan tetap, hanya biaya admin ${formatRupiah(fee)} yang tercatat.`
            : `Dipindahkan ${formatRupiah(p.amount)}. Total kekayaan tidak berubah.`,
        tone: "ok",
      });
      setSheet(null);
      return;
    }

    const cat = CATEGORIES.find((c) => c.id === p.category);
    const tx: Transaction = {
      id,
      title: p.title,
      amount: p.amount,
      type: p.type,
      category: p.category,
      wallet: p.wallet,
      date: "Baru saja",
      icon: p.type === "income" ? "cash" : cat?.icon ?? "spark",
      today: p.type === "expense",
      isNew: true,
    };

    setWallets((prev) =>
      prev.map((w) =>
        w.name === p.wallet
          ? { ...w, balance: p.type === "expense" ? Math.max(0, w.balance - p.amount) : w.balance + p.amount }
          : w
      )
    );

    // Peringatan anggaran saat melewati 80%, 90%, dan 100%.
    if (p.type === "expense" && BUDGETS[p.category]) {
      const before = budgetSpent(p.category) / BUDGETS[p.category].limit;
      const after = (budgetSpent(p.category) + p.amount) / BUDGETS[p.category].limit;
      const crossed = [1, 0.9, 0.8].find((t) => before < t && after >= t);
      if (crossed) {
        setToast({
          text:
            crossed === 1
              ? `Anggaran ${p.category} terlampaui. Saatnya mengerem belanja.`
              : `Anggaran ${p.category} sudah mencapai ${Math.round(crossed * 100)}%.`,
          tone: "warn",
        });
      }
    }

    setTransactions((prev) => [tx, ...prev]);
    setSheet(null);
  };

  const handleSetor = () => {
    const bca = wallets.find((w) => w.short === "BCA");
    if (!bca || bca.balance < GOAL.step) {
      setToast({ text: "Saldo BCA tidak cukup untuk menyetor.", tone: "warn" });
      return;
    }
    if (goalSaved >= GOAL.target) return;
    const next = Math.min(GOAL.target, goalSaved + GOAL.step);
    const moved = next - goalSaved;
    setGoalSaved(next);
    setWallets((prev) => prev.map((w) => (w.short === "BCA" ? { ...w, balance: w.balance - moved } : w)));
    setTransactions((prev) => [
      {
        id: Date.now().toString(),
        title: "Setor ke " + GOAL.name,
        amount: moved,
        type: "transfer",
        category: "Tabungan",
        wallet: bca.name,
        toWallet: GOAL.name,
        date: "Baru saja",
        icon: "piggy",
        isNew: true,
      },
      ...prev,
    ]);
    setToast({
      text: next >= GOAL.target ? "Target tabungan tercapai." : `Disetor ${formatRupiah(moved)}. Kas turun, total kekayaan tetap.`,
      tone: "ok",
    });
  };

  const handleResetDemo = () => {
    setWallets(INITIAL_WALLETS);
    setTransactions(INITIAL_TRANSACTIONS);
    setGoalSaved(GOAL.saved);
    setActiveTab("home");
    setAirplane(false);
    setHintDismissed(false);
    setSheet(null);
    setFilter("Semua");
  };

  // Split bill calc
  const taxAmount = (billAmount * billTax) / 100;
  const grandTotal = billAmount + taxAmount + billTip;
  const perPerson = Math.ceil(grandTotal / (billPeople || 1));

  const handleCopyBill = () => {
    const text =
      "*Rincian Split Bill MyMoney*\nTotal Tagihan: " +
      formatRupiah(grandTotal) +
      "\nJumlah Orang: " +
      billPeople +
      "\n*Per Orang: " +
      formatRupiah(perPerson) +
      "*\n\n_Dihitung dengan MyMoney App_";
    navigator.clipboard?.writeText(text);
    setCopiedBill(true);
    setTimeout(() => setCopiedBill(false), 2500);
  };

  /* ---------- Tilt mengikuti kursor (hanya mouse, hormati reduced motion) ---------- */
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = phoneRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateY(${(x * 9).toFixed(2)}deg) rotateX(${(-y * 6).toFixed(2)}deg)`;
  };
  const onPointerLeave = () => {
    if (phoneRef.current) phoneRef.current.style.transform = "";
  };

  const receiptTx = sheet?.kind === "receipt" ? transactions.find((t) => t.id === sheet.txId) : undefined;
  const visibleTx = transactions.filter((t) => filter === "Semua" || wallets.find((w) => w.short === filter)?.name === t.wallet);
  const goalPct = goalSaved / GOAL.target;

  return (
    <div className="relative flex w-full flex-col items-center xl:items-end">
      {/* Kontrol demo */}
      <div className="mb-5 flex w-full max-w-[340px] flex-wrap items-center gap-2 xl:max-w-[640px] xl:justify-end">
        <button
          type="button"
          onClick={() => {
            setActiveTab("home");
            setSheet({ kind: "add", type: "expense" });
          }}
          className="inline-flex items-center gap-1.5 rounded-md bg-signal px-3 py-2 text-xs font-semibold text-ink-950 transition-colors hover:bg-paper-50"
        >
          <Icon name="plus" size={14} strokeWidth={2.4} />
          Catat transaksi
        </button>
        <button
          type="button"
          onClick={() => setSheet({ kind: "add", type: "transfer" })}
          className="inline-flex items-center gap-1.5 rounded-md border border-ink-600 px-3 py-2 text-xs font-semibold text-paper-100 transition-colors hover:bg-ink-800"
        >
          <Icon name="swap" size={14} />
          Transfer
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("splitbill")}
          className="inline-flex items-center gap-1.5 rounded-md border border-ink-600 px-3 py-2 text-xs font-semibold text-paper-100 transition-colors hover:bg-ink-800"
        >
          <Icon name="calc" size={14} />
          Split bill
        </button>
        <button
          type="button"
          onClick={() => setAirplane((v) => !v)}
          aria-pressed={airplane}
          className={
            "inline-flex items-center gap-1.5 rounded-md border px-3 py-2 text-xs font-semibold transition-colors " +
            (airplane ? "border-signal bg-ink-800 text-signal" : "border-ink-600 text-paper-100 hover:bg-ink-800")
          }
        >
          <Icon name="plane" size={14} />
          Mode pesawat {airplane ? "aktif" : ""}
        </button>
        <button
          type="button"
          onClick={handleResetDemo}
          aria-label="Reset data demo"
          title="Reset data demo"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-ink-600 text-mist transition-colors hover:bg-ink-800 hover:text-paper-50"
        >
          <Icon name="reset" size={14} />
        </button>
      </div>

      <div className="relative flex w-full items-start justify-center xl:justify-end">
        {/* Struk langsung: isinya mengikuti transaksi di ponsel */}
        <aside
          aria-label="Struk langsung dari demo"
          className="relative z-0 mr-[-0.5rem] mt-16 hidden w-[224px] shrink-0 -rotate-3 drop-shadow-[0_18px_28px_rgba(0,0,0,0.4)] xl:block"
        >
          <div className="print-feed">
            <div className="receipt px-4 pt-5 text-[11px] leading-snug">
              <p className="font-display text-lg font-bold leading-none">MyMoney</p>
              <p className="mt-1 text-[10px] text-moss">Struk langsung dari demo</p>
              <div className="my-3 border-t border-dashed border-leaf/40" />

              <ul className="space-y-2">
                {transactions.slice(0, 5).map((t) => (
                  <li key={t.id} className="line-in">
                    <p className="truncate">{t.title}</p>
                    <p className="flex items-baseline gap-1 text-moss">
                      <span className="truncate">{t.type === "transfer" ? "Transfer netral" : t.wallet}</span>
                      <span className="leader" />
                      <span
                        className={
                          t.type === "income" ? "text-signal-deep" : t.type === "transfer" ? "text-moss" : "text-stamp"
                        }
                      >
                        {t.type === "income" ? "+" : t.type === "transfer" ? "" : "-"}
                        {formatNumber(t.amount)}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>

              <div className="my-3 border-t border-dashed border-leaf/40" />
              <dl className="space-y-1">
                <div className="flex items-baseline gap-1">
                  <dt>Pemasukan</dt>
                  <span className="leader" />
                  <dd>{formatNumber(totalIncome)}</dd>
                </div>
                <div className="flex items-baseline gap-1">
                  <dt>Pengeluaran</dt>
                  <span className="leader" />
                  <dd>{formatNumber(totalExpense)}</dd>
                </div>
                <div className="flex items-baseline gap-1 font-medium">
                  <dt>Saldo</dt>
                  <span className="leader" />
                  <dd>{formatNumber(totalBalance)}</dd>
                </div>
              </dl>

              <div className="mt-4 flex items-end justify-between gap-2">
                <p className="text-[10px] leading-tight text-moss">
                  {airplane ? "Tanpa sinyal. Tetap tercatat." : "Tersimpan di ponsel ini."}
                </p>
                <span className={"stamp shrink-0 text-[10px] " + (airplane ? "text-stamp" : "text-signal-deep")}>
                  {airplane ? "Offline" : "Lokal"}
                </span>
              </div>
            </div>
          </div>
        </aside>

        {/* Ponsel */}
        <div onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} className="relative z-10 shrink-0">
          <div
            ref={phoneRef}
            style={themeVars}
            className="flex h-[660px] w-[min(340px,calc(100vw-2.5rem))] select-none flex-col overflow-hidden rounded-[44px] border border-[#23665d] bg-[#051c19] p-[10px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] transition-transform duration-200 ease-out"
          >
            {/* Status bar */}
            <div className="relative z-30 flex items-center justify-between px-5 pb-1 pt-1.5 font-mono text-[11px] text-[#9fbdb6]">
              <span>09:41</span>
              <span className="h-4 w-16 rounded-full bg-[#082a26]" aria-hidden="true" />
              <span className="flex items-center gap-1.5">
                {airplane ? <Icon name="plane" size={12} className="text-[#3bdce6]" /> : <span>5G</span>}
                <span className="flex h-2 w-4 items-center rounded-[3px] border border-[#9fbdb6] p-[1px]">
                  <span className="h-full w-full rounded-[1px] bg-[#9fbdb6]" />
                </span>
              </span>
            </div>

            {/* Layar */}
            <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[30px] bg-ink-900 text-paper-100 transition-colors duration-300">
              {/* Toast notifikasi */}
              {toast && (
                <div
                  role="status"
                  className={
                    "toast-in absolute inset-x-2 top-2 z-50 flex items-start gap-2 rounded-xl border px-3 py-2 text-[10px] leading-snug shadow-lg " +
                    (toast.tone === "warn"
                      ? "border-amber/60 bg-ink-800 text-amber"
                      : "border-signal/50 bg-ink-800 text-paper-50")
                  }
                >
                  <Icon name={toast.tone === "warn" ? "bell" : "check"} size={13} className="mt-px shrink-0" />
                  <span>{toast.text}</span>
                </div>
              )}

              <div className="flex min-h-0 flex-1 flex-col px-3.5 pt-3">
                {airplane && (
                  <p className="fade-in mb-2 flex items-center gap-1.5 rounded-md bg-ink-800 px-2.5 py-1.5 text-[10px] text-signal">
                    <Icon name="plane" size={11} />
                    Tanpa sinyal. Semua fitur tetap jalan.
                  </p>
                )}

                {/* TAB: BERANDA */}
                {activeTab === "home" && (
                  <div className="fade-in no-scrollbar flex-1 space-y-3 overflow-y-auto pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-signal text-xs font-bold text-ink-950">
                          AS
                        </div>
                        <div>
                          <p className="text-[10px] text-mist">Selamat datang,</p>
                          <p className="text-xs font-semibold leading-none text-paper-50">Ahmat Setiadi</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setHideBalance(!hideBalance)}
                        aria-label={hideBalance ? "Tampilkan saldo" : "Sembunyikan saldo"}
                        className="inline-flex items-center gap-1 rounded-md border border-ink-600 px-2 py-1 text-[10px] text-mist transition-colors hover:text-paper-50"
                      >
                        <Icon name={hideBalance ? "eyeOff" : "eye"} size={12} />
                        {hideBalance ? "Buka" : "Intip"}
                      </button>
                    </div>

                    {/* Kartu saldo yang bisa digeser */}
                    <div>
                      <div
                        ref={carouselRef}
                        onScroll={onCarouselScroll}
                        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-xl"
                      >
                        <div className="min-w-full snap-center rounded-xl border border-ink-600 bg-ink-800 p-3.5">
                          <p className="text-[10px] text-mist">{SLIDES[0]}</p>
                          <p className="mt-0.5 font-mono text-xl font-medium tracking-tight text-paper-50">
                            {mask(formatRupiah(totalBalance), "Rp ••••••••")}
                          </p>
                          <div className="mt-2.5 grid grid-cols-2 gap-2 border-t border-ink-600 pt-2.5 text-[10px]">
                            <div>
                              <p className="text-mist">Pemasukan</p>
                              <p className="font-mono font-medium text-mint">{mask(formatRupiah(totalIncome), "•••")}</p>
                            </div>
                            <div>
                              <p className="text-mist">Pengeluaran</p>
                              <p className="font-mono font-medium text-coral">{mask(formatRupiah(totalExpense), "•••")}</p>
                            </div>
                          </div>
                        </div>

                        <div className="min-w-full snap-center rounded-xl border border-ink-600 bg-ink-800 p-3.5">
                          <p className="text-[10px] text-mist">{SLIDES[1]}</p>
                          <p className="mt-0.5 font-mono text-xl font-medium tracking-tight text-paper-50">
                            {mask(formatRupiah(sisaKas), "Rp ••••••••")}
                          </p>
                          <p className="mt-2.5 border-t border-ink-600 pt-2.5 text-[10px] leading-snug text-mist">
                            Pemasukan bulan ini dikurangi belanja bulan ini. Pakai angka ini untuk keputusan belanja harian.
                          </p>
                        </div>

                        <div className="min-w-full snap-center rounded-xl border border-ink-600 bg-ink-800 p-3.5">
                          <p className="text-[10px] text-mist">{SLIDES[2]}</p>
                          <p className="mt-0.5 flex items-center gap-2 text-xl font-medium tracking-tight text-paper-50">
                            <Icon name={CATEGORIES.find((c) => c.id === topCategory.name)?.icon ?? "spark"} size={20} className="text-signal" />
                            {topCategory.name}
                          </p>
                          <p className="mt-2.5 flex items-baseline justify-between border-t border-ink-600 pt-2.5 text-[10px]">
                            <span className="font-mono font-medium text-coral">{mask(formatRupiah(topCategory.amount), "•••")}</span>
                            <span className="text-mist">{Math.round(topCategory.share * 100)}% dari pengeluaran</span>
                          </p>
                        </div>
                      </div>
                      <div className="mt-1.5 flex justify-center gap-1.5" role="tablist" aria-label="Kartu saldo">
                        {SLIDES.map((s, i) => (
                          <button
                            key={s}
                            type="button"
                            role="tab"
                            aria-selected={slide === i}
                            aria-label={s}
                            onClick={() => goSlide(i)}
                            className={"h-1.5 rounded-full transition-all " + (slide === i ? "w-4 bg-signal" : "w-1.5 bg-ink-600")}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Batas harian aman */}
                    <div className="rounded-xl border border-ink-600 p-3">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-paper-100">
                          <Icon name="shield" size={13} className="text-signal" />
                          Batas harian aman
                        </span>
                        <span className="font-mono text-[9px] text-mist">
                          {CYCLE_DAYS_LEFT} hari lagi
                        </span>
                      </div>
                      <p
                        className={
                          "mt-1 font-mono text-lg font-medium tracking-tight " +
                          (remainingToday < 0 ? "text-coral" : "text-paper-50")
                        }
                      >
                        {mask(formatRupiah(Math.max(0, remainingToday)))}
                        <span className="ml-1 text-[9px] font-normal text-mist">sisa jatah hari ini</span>
                      </p>
                      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-ink-700">
                        <div
                          className={"h-full rounded-full transition-all duration-300 " + (remainingToday < 0 ? "bg-coral" : "bg-signal")}
                          style={{ width: `${Math.min(100, (spentToday / Math.max(1, baseDaily)) * 100).toFixed(2)}%` }}
                        />
                      </div>
                      <p className="mt-1.5 flex items-center justify-between text-[9px] text-mist">
                        <span>
                          {hideBalance ? "•••" : formatRupiah(sisaKas)} ÷ {CYCLE_DAYS_LEFT} hari
                        </span>
                        <span className={tomorrowDaily >= baseDaily ? "text-mint" : "text-coral"}>
                          Besok ~{hideBalance ? "•••" : formatRupiah(tomorrowDaily)} {tomorrowDaily >= baseDaily ? "▲" : "▼"}
                        </span>
                      </p>
                    </div>

                    {/* Dompet */}
                    <div>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-paper-100">Dompet dan rekening</span>
                        <button
                          type="button"
                          onClick={() => setSheet({ kind: "add", type: "transfer" })}
                          className="inline-flex items-center gap-1 text-[10px] font-semibold text-signal hover:underline"
                        >
                          <Icon name="swap" size={11} /> Transfer
                        </button>
                      </div>
                      <div className="flex gap-2">
                        {wallets.map((w) => (
                          <div key={w.id} className={"flex min-w-0 flex-1 flex-col justify-between rounded-lg p-2 " + TONE_CLASS[w.tone]}>
                            <Icon name={w.icon} size={14} />
                            <div className="mt-1.5 min-w-0">
                              <p className="truncate text-[9px] font-medium opacity-80">{w.name}</p>
                              <p className="truncate font-mono text-[11px] font-medium">{mask(formatRupiah(w.balance), "••••")}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Kartu tips kontekstual (mengikuti ContextualCycleHint di aplikasi) */}
                    {!hintDismissed && (
                      <div className="fade-in rounded-xl border border-signal/35 bg-signal/10 p-3">
                        <div className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-signal/20 text-signal">
                            <Icon name="bulb" size={15} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-[11px] font-semibold text-paper-50">Atur Batas Belanja Harian</p>
                              <button
                                type="button"
                                onClick={() => setHintDismissed(true)}
                                aria-label="Tutup tips"
                                className="text-mist hover:text-paper-50"
                              >
                                <Icon name="close" size={13} />
                              </button>
                            </div>
                            <p className="mt-0.5 text-[10px] leading-snug text-mist">
                              Saat mencatat Pemasukan, aktifkan opsi <span className="font-semibold text-signal">Batas Belanja Harian</span>{" "}
                              agar aplikasi menghitung batas belanja aman harian Anda.
                            </p>
                            <div className="mt-2 flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setSheet({ kind: "guide", topic: "cycle" })}
                                className="inline-flex items-center gap-1 rounded-md bg-signal px-2.5 py-1.5 text-[10px] font-bold text-ink-950"
                              >
                                <Icon name="file" size={11} /> Pelajari cara kerja
                              </button>
                              <button type="button" onClick={() => setHintDismissed(true)} className="px-1.5 text-[10px] font-semibold text-mist">
                                Saya paham
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-paper-100">Transaksi terkini</span>
                        <button type="button" onClick={() => setActiveTab("transactions")} className="text-[10px] text-signal hover:underline">
                          Semua
                        </button>
                      </div>
                      {transactions.slice(0, 2).map((t) => (
                        <TxRow key={t.id} t={t} hide={hideBalance} onReceipt={() => setSheet({ kind: "receipt", txId: t.id })} compact />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setSheet({ kind: "add", type: "expense" })}
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-signal py-2.5 text-xs font-bold text-ink-950 transition-opacity hover:opacity-90 active:scale-[0.98]"
                    >
                      <Icon name="plus" size={14} strokeWidth={2.4} />
                      Catat transaksi
                    </button>
                  </div>
                )}

                {/* TAB: RIWAYAT */}
                {activeTab === "transactions" && (
                  <div className="fade-in flex min-h-0 flex-1 flex-col gap-2 pb-3">
                    <div className="flex items-center justify-between border-b border-ink-600 pb-2">
                      <h4 className="text-xs font-semibold text-paper-50">Riwayat transaksi</h4>
                      <span className="text-[10px] text-mist">{visibleTx.length} data</span>
                    </div>
                    <div className="flex gap-1" role="group" aria-label="Filter dompet">
                      {["Semua", ...wallets.map((w) => w.short)].map((f) => (
                        <button
                          key={f}
                          type="button"
                          aria-pressed={filter === f}
                          onClick={() => setFilter(f)}
                          className={
                            "rounded-md border px-2.5 py-1 text-[10px] font-semibold " +
                            (filter === f ? "border-signal bg-signal/15 text-signal" : "border-ink-600 text-mist")
                          }
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                    <div className="no-scrollbar min-h-0 flex-1 space-y-1.5 overflow-y-auto">
                      {visibleTx.length === 0 && <p className="py-6 text-center text-[10px] text-mist">Belum ada transaksi di dompet ini.</p>}
                      {visibleTx.map((t) => (
                        <TxRow key={t.id} t={t} hide={hideBalance} onReceipt={() => setSheet({ kind: "receipt", txId: t.id })} />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setSheet({ kind: "add", type: "expense" })}
                      className="w-full rounded-lg bg-signal py-2.5 text-xs font-bold text-ink-950 transition-opacity hover:opacity-90"
                    >
                      Tambah transaksi
                    </button>
                  </div>
                )}

                {/* TAB: BUDGET */}
                {activeTab === "budget" && (
                  <div className="fade-in no-scrollbar flex-1 space-y-2.5 overflow-y-auto pb-3">
                    <div className="flex items-center justify-between border-b border-ink-600 pb-2">
                      <h4 className="text-xs font-semibold text-paper-50">Anggaran dan tabungan</h4>
                      <span className="text-[10px] text-mist">Reset tiap awal pembukuan</span>
                    </div>

                    {Object.keys(BUDGETS).map((cat) => {
                      const spent = budgetSpent(cat);
                      const limit = BUDGETS[cat].limit;
                      const pct = spent / limit;
                      const tone = budgetTone(pct);
                      const icon = CATEGORIES.find((c) => c.id === cat)?.icon ?? "spark";
                      return (
                        <div key={cat} className="space-y-1.5 rounded-lg bg-ink-800 p-2.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1.5 font-semibold text-paper-50">
                              <Icon name={icon} size={13} /> {cat}
                            </span>
                            <span className={"font-mono text-[10px] font-medium " + TEXT_CLASS[tone]}>
                              {Math.round(pct * 100)}%
                            </span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-ink-700">
                            <div
                              className={"h-full rounded-full transition-all duration-300 " + BAR_CLASS[tone]}
                              style={{ width: `${Math.min(100, pct * 100).toFixed(2)}%` }}
                            />
                          </div>
                          <p className="font-mono text-[9px] text-mist">
                            {formatRupiah(spent)} / {formatRupiah(limit)}
                            {pct > 1 ? " · terlampaui" : ""}
                          </p>
                        </div>
                      );
                    })}
                    <p className="flex items-center justify-center gap-3 text-[9px] text-mist">
                      <span className="flex items-center gap-1"><i className="h-1.5 w-1.5 rounded-full bg-signal" /> Aman &lt;70%</span>
                      <span className="flex items-center gap-1"><i className="h-1.5 w-1.5 rounded-full bg-amber" /> Waspada</span>
                      <span className="flex items-center gap-1"><i className="h-1.5 w-1.5 rounded-full bg-coral" /> Over &gt;100%</span>
                    </p>

                    <div className="space-y-1.5 rounded-lg border border-signal/40 p-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-1.5 font-semibold text-signal">
                          <Icon name="target" size={13} /> {GOAL.name}
                        </span>
                        <span className="font-mono text-[10px] font-medium text-signal">{Math.round(goalPct * 100)}%</span>
                      </div>
                      <p className="font-mono text-xs font-medium text-paper-50">
                        {formatRupiah(goalSaved)} / {formatRupiah(GOAL.target)}
                      </p>
                      <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-700">
                        <div className="h-full rounded-full bg-signal transition-all duration-300" style={{ width: `${(goalPct * 100).toFixed(2)}%` }} />
                      </div>
                      <button
                        type="button"
                        onClick={handleSetor}
                        disabled={goalSaved >= GOAL.target}
                        className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-md bg-signal py-2 text-[10px] font-bold text-ink-950 transition-opacity hover:opacity-90 disabled:opacity-50"
                      >
                        <Icon name={goalSaved >= GOAL.target ? "trophy" : "piggy"} size={13} />
                        {goalSaved >= GOAL.target ? "Target tercapai" : `Setor ${formatRupiah(GOAL.step)} dari BCA`}
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB: SPLIT BILL */}
                {activeTab === "splitbill" && (
                  <div className="fade-in flex flex-1 flex-col justify-between gap-2 pb-3">
                    <div className="flex items-center justify-between border-b border-ink-600 pb-2">
                      <h4 className="text-xs font-semibold text-paper-50">Kalkulator split bill</h4>
                      <span className="text-[10px] font-medium text-signal">Instan</span>
                    </div>

                    <div className="my-auto space-y-2">
                      <div className="rounded-lg bg-ink-800 p-2.5">
                        <label htmlFor="demo-bill" className="text-[10px] text-mist">
                          Total tagihan (Rp)
                        </label>
                        <input
                          id="demo-bill"
                          type="number"
                          value={billAmount}
                          onChange={(e) => setBillAmount(Number(e.target.value) || 0)}
                          className="w-full bg-transparent font-mono text-sm font-medium text-paper-50 focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center justify-between rounded-lg bg-ink-800 p-2.5">
                        <span className="text-xs font-semibold text-paper-50">Jumlah orang</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            aria-label="Kurangi orang"
                            onClick={() => setBillPeople(Math.max(1, billPeople - 1))}
                            className="flex h-7 w-7 items-center justify-center rounded-md bg-ink-700 text-paper-50 hover:bg-ink-600"
                          >
                            <Icon name="minus" size={14} />
                          </button>
                          <span className="w-10 text-center font-mono text-xs font-medium text-signal">{billPeople} org</span>
                          <button
                            type="button"
                            aria-label="Tambah orang"
                            onClick={() => setBillPeople(billPeople + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-md bg-ink-700 text-paper-50 hover:bg-ink-600"
                          >
                            <Icon name="plus" size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="rounded-lg border border-signal/50 p-3 text-center">
                        <p className="text-[10px] text-mist">Setiap orang bayar (+PPN 11%)</p>
                        <p className="font-mono text-xl font-medium tracking-tight text-paper-50">{formatRupiah(perPerson)}</p>
                        <p className="text-[9px] text-mist">Total + pajak dan tip: {formatRupiah(grandTotal)}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyBill}
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-signal py-2.5 text-xs font-bold text-ink-950 transition-opacity hover:opacity-90 active:scale-[0.98]"
                    >
                      <Icon name={copiedBill ? "check" : "copy"} size={14} strokeWidth={2.2} />
                      {copiedBill ? "Tersalin" : "Salin ke WhatsApp"}
                    </button>
                  </div>
                )}
              </div>

              {/* Navigasi bawah */}
              <nav aria-label="Navigasi aplikasi demo" className="relative z-30 flex items-center justify-around border-t border-ink-600 bg-ink-800 px-1 pb-2 pt-2">
                {TABS.map((tab) => {
                  const active = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      aria-current={active ? "page" : undefined}
                      className={
                        "flex flex-col items-center gap-0.5 px-3 text-[9px] font-semibold transition-colors " +
                        (active ? "text-signal" : "text-mist hover:text-paper-50")
                      }
                    >
                      <Icon name={tab.icon} size={17} />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>

              {/* Lembar-lembar */}
              {sheet?.kind === "add" && (
                <AddSheet wallets={wallets} initialType={sheet.type} onClose={() => setSheet(null)} onSave={handleSave} />
              )}
              {sheet?.kind === "guide" && <GuideSheet initialTopic={sheet.topic} onClose={() => setSheet(null)} />}
              {sheet?.kind === "receipt" && receiptTx?.items && (
                <div className="fade-in absolute inset-0 z-40 flex flex-col justify-end bg-ink-950/90 p-2">
                  <div className="rounded-3xl border border-ink-600 bg-ink-800 p-3.5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold text-paper-50">Rincian item struk</span>
                      <button
                        type="button"
                        onClick={() => setSheet(null)}
                        aria-label="Tutup"
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-700 text-mist hover:text-paper-50"
                      >
                        <Icon name="close" size={12} strokeWidth={2.4} />
                      </button>
                    </div>
                    <div className="rounded-md bg-[#f3f7f4] p-3 font-mono text-[10px] leading-snug text-[#0c2723]">
                      <p className="font-display text-sm font-bold">{receiptTx.title}</p>
                      <p className="text-[#476560]">{receiptTx.date}</p>
                      <div className="my-2 border-t border-dashed border-[#0c2723]/40" />
                      <ul className="space-y-1">
                        {receiptTx.items.map((it) => (
                          <li key={it.name} className="flex items-baseline gap-1">
                            <span>
                              {it.qty}x {it.name}
                            </span>
                            <span className="leader" />
                            <span>{formatNumber(it.qty * it.price)}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="my-2 border-t border-dashed border-[#0c2723]/40" />
                      <p className="flex items-baseline gap-1 font-medium">
                        <span>Total</span>
                        <span className="leader" />
                        <span>{formatNumber(receiptTx.items.reduce((a, i) => a + i.qty * i.price, 0))}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pemilih tema: meniru 8 tema di aplikasi */}
      <div className="mt-5 flex w-full max-w-[340px] flex-col gap-2 xl:max-w-[640px] xl:items-end">
        <p className="flex items-center gap-1.5 text-xs text-mist">
          <Icon name="palette" size={13} />
          Tema aplikasi: <span className="font-medium text-paper-100">{theme?.name ?? "warna situs"}</span>
        </p>
        <div className="flex items-center gap-2" role="group" aria-label="Pilih tema aplikasi">
          <button
            type="button"
            aria-pressed={themeId === null}
            aria-label="Warna situs"
            title="Warna situs"
            onClick={() => setThemeId(null)}
            className={
              "h-6 w-6 rounded-full border-2 bg-gradient-to-br from-ink-900 to-signal transition-transform hover:scale-110 " +
              (themeId === null ? "border-paper-50" : "border-transparent")
            }
          />
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={themeId === t.id}
              aria-label={t.name}
              title={t.name}
              onClick={() => setThemeId(t.id)}
              style={{ background: t.swatch }}
              className={
                "h-6 w-6 rounded-full border-2 transition-transform hover:scale-110 " +
                (themeId === t.id ? "border-paper-50" : "border-ink-600")
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TxRow({
  t,
  hide,
  compact,
  onReceipt,
}: {
  t: Transaction;
  hide: boolean;
  compact?: boolean;
  onReceipt: () => void;
}) {
  const sign = t.type === "income" ? "+" : t.type === "transfer" ? "" : "-";
  const color = t.type === "income" ? "text-mint" : t.type === "transfer" ? "text-mist" : compact ? "text-paper-100" : "text-coral";
  return (
    <div className="rounded-lg bg-ink-800 p-2">
      <div className="flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-ink-700 text-paper-100">
            <Icon name={t.icon} size={14} />
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-paper-50">{t.title}</p>
            <p className="truncate text-[9px] text-mist">
              {t.type === "transfer" ? `Transfer netral · ${t.date}` : `${t.wallet} · ${t.date}`}
            </p>
          </div>
        </div>
        <p className={"shrink-0 pl-2 font-mono text-[11px] font-medium " + color}>
          {sign}
          {hide ? "•••" : formatRupiah(t.amount)}
        </p>
      </div>
      {t.items && (
        <button type="button" onClick={onReceipt} className="mt-1.5 inline-flex items-center gap-1 text-[9px] font-semibold text-signal hover:underline">
          <Icon name="receipt" size={11} /> Lihat {t.items.length} item struk
        </button>
      )}
    </div>
  );
}
