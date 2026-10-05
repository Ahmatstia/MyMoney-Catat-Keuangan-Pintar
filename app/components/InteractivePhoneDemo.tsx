"use client";

import React, { useState } from "react";
import Icon, { type IconName } from "./Icon";
import { formatNumber, formatRupiah } from "../format";

type TabId = "home" | "transactions" | "budget" | "splitbill";
type Tone = "cyan" | "mint" | "paper";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "expense" | "income";
  category: string;
  wallet: string;
  date: string;
  icon: IconName;
}

interface Wallet {
  id: string;
  name: string;
  balance: number;
  icon: IconName;
  tone: Tone;
}

const INITIAL_WALLETS: Wallet[] = [
  { id: "1", name: "BCA Tabungan", balance: 7500000, icon: "bank", tone: "cyan" },
  { id: "2", name: "Dompet Kas", balance: 650000, icon: "cash", tone: "mint" },
  { id: "3", name: "GoPay / OVO", balance: 350000, icon: "wallet", tone: "paper" },
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: "1", title: "Kopi & Makan Siang", amount: 45000, type: "expense", category: "Makanan", wallet: "Dompet Kas", date: "Hari ini, 12:30", icon: "coffee" },
  { id: "2", title: "Gaji Bulanan", amount: 8000000, type: "income", category: "Gaji", wallet: "BCA Tabungan", date: "Kemarin, 09:00", icon: "cash" },
  { id: "3", title: "Bensin Motor", amount: 30000, type: "expense", category: "Transport", wallet: "Dompet Kas", date: "28 Sep", icon: "fuel" },
];

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

export default function InteractivePhoneDemo() {
  const [activeTab, setActiveTab] = useState<TabId>("home");
  const [hideBalance, setHideBalance] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [airplane, setAirplane] = useState(false);

  const [wallets, setWallets] = useState<Wallet[]>(INITIAL_WALLETS);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);

  // Form State
  const [formType, setFormType] = useState<"expense" | "income">("expense");
  const [formAmount, setFormAmount] = useState("35000");
  const [formTitle, setFormTitle] = useState("Kopi Janji Jiwa");
  const [formCategory] = useState("Makanan");
  const [formWallet, setFormWallet] = useState("Dompet Kas");

  // Split Bill State
  const [billAmount, setBillAmount] = useState(150000);
  const [billPeople, setBillPeople] = useState(3);
  const [billTax] = useState(11);
  const [billTip] = useState(10000);
  const [copiedBill, setCopiedBill] = useState(false);

  // Calculations
  const totalBalance = wallets.reduce((acc, w) => acc + w.balance, 0);
  const totalIncome = transactions.filter((t) => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter((t) => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseInt(formAmount.replace(/\D/g, ""), 10) || 0;
    if (numAmount <= 0) return;

    const newTx: Transaction = {
      id: Date.now().toString(),
      title: formTitle || (formType === "expense" ? "Pengeluaran" : "Pemasukan"),
      amount: numAmount,
      type: formType,
      category: formCategory,
      wallet: formWallet,
      date: "Baru saja",
      icon: formCategory === "Makanan" ? "food" : formCategory === "Transport" ? "car" : formCategory === "Gaji" ? "cash" : "spark",
    };

    setWallets((prev) =>
      prev.map((w) => {
        if (w.name === formWallet) {
          return {
            ...w,
            balance: formType === "expense" ? Math.max(0, w.balance - numAmount) : w.balance + numAmount,
          };
        }
        return w;
      })
    );

    setTransactions([newTx, ...transactions]);
    setShowAddModal(false);
  };

  const handleResetDemo = () => {
    setWallets(INITIAL_WALLETS);
    setTransactions(INITIAL_TRANSACTIONS);
    setActiveTab("home");
    setAirplane(false);
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

  return (
    <div className="relative flex w-full flex-col items-center xl:items-end">
      {/* Kontrol demo */}
      <div className="mb-5 flex w-full max-w-[340px] flex-wrap items-center gap-2 xl:max-w-[600px] xl:justify-end">
        <button
          type="button"
          onClick={() => {
            setActiveTab("home");
            setShowAddModal(true);
          }}
          className="inline-flex items-center gap-1.5 rounded-md bg-signal px-3 py-2 text-xs font-semibold text-ink-950 transition-colors hover:bg-paper-50"
        >
          <Icon name="plus" size={14} strokeWidth={2.4} />
          Catat transaksi
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
            (airplane
              ? "border-signal bg-ink-800 text-signal"
              : "border-ink-600 text-paper-100 hover:bg-ink-800")
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
                      <span className="truncate">{t.wallet}</span>
                      <span className="leader" />
                      <span className={t.type === "income" ? "text-signal-deep" : "text-stamp"}>
                        {t.type === "income" ? "+" : "-"}
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
        <div className="relative z-10 flex h-[660px] w-[min(340px,100%)] shrink-0 select-none flex-col overflow-hidden rounded-[44px] border border-ink-600 bg-ink-950 p-[10px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]">
          {/* Status bar */}
          <div className="relative z-30 flex items-center justify-between px-5 pb-1 pt-1.5 font-mono text-[11px] text-mist">
            <span>09:41</span>
            <span className="h-4 w-16 rounded-full bg-ink-900" aria-hidden="true" />
            <span className="flex items-center gap-1.5">
              {airplane ? <Icon name="plane" size={12} className="text-signal" /> : <span>5G</span>}
              <span className="flex h-2 w-4 items-center rounded-[3px] border border-mist p-[1px]">
                <span className="h-full w-full rounded-[1px] bg-mist" />
              </span>
            </span>
          </div>

          {/* Layar */}
          <div className="no-scrollbar relative z-20 flex min-h-0 flex-1 flex-col overflow-hidden rounded-[30px] bg-ink-900 px-3.5 py-3">
            {airplane && (
              <p className="fade-in mb-2 flex items-center gap-1.5 rounded-md bg-ink-800 px-2.5 py-1.5 text-[10px] text-signal">
                <Icon name="plane" size={11} />
                Tanpa sinyal. Semua fitur tetap jalan.
              </p>
            )}

            {/* TAB: BERANDA */}
            {activeTab === "home" && (
              <div className="fade-in flex flex-1 flex-col justify-between gap-2.5">
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

                <div className="rounded-xl border border-ink-600 bg-ink-800 p-3.5">
                  <p className="text-[10px] text-mist">Total saldo operasional</p>
                  <p className="mt-0.5 font-mono text-xl font-medium tracking-tight text-paper-50">
                    {hideBalance ? "Rp ••••••••" : formatRupiah(totalBalance)}
                  </p>
                  <div className="mt-2.5 grid grid-cols-2 gap-2 border-t border-ink-600 pt-2.5 text-[10px]">
                    <div>
                      <p className="text-mist">Pemasukan</p>
                      <p className="font-mono font-medium text-mint">{hideBalance ? "•••" : formatRupiah(totalIncome)}</p>
                    </div>
                    <div>
                      <p className="text-mist">Pengeluaran</p>
                      <p className="font-mono font-medium text-coral">{hideBalance ? "•••" : formatRupiah(totalExpense)}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-paper-100">Dompet dan rekening</span>
                    <span className="text-[10px] text-mist">{wallets.length} akun</span>
                  </div>
                  <div className="flex gap-2">
                    {wallets.map((w) => (
                      <div key={w.id} className={"flex min-w-0 flex-1 flex-col justify-between rounded-lg p-2 " + TONE_CLASS[w.tone]}>
                        <Icon name={w.icon} size={14} />
                        <div className="mt-1.5 min-w-0">
                          <p className="truncate text-[9px] font-medium opacity-80">{w.name}</p>
                          <p className="truncate font-mono text-[11px] font-medium">
                            {hideBalance ? "••••" : formatRupiah(w.balance)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-paper-100">Transaksi terkini</span>
                    <button type="button" onClick={() => setActiveTab("transactions")} className="text-[10px] text-signal hover:underline">
                      Semua
                    </button>
                  </div>
                  {transactions.slice(0, 2).map((t) => (
                    <div key={t.id} className="flex items-center justify-between rounded-lg bg-ink-800 p-2">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-ink-700 text-paper-100">
                          <Icon name={t.icon} size={14} />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-paper-50">{t.title}</p>
                          <p className="text-[9px] text-mist">{t.wallet}</p>
                        </div>
                      </div>
                      <p className={"shrink-0 pl-2 font-mono text-[11px] font-medium " + (t.type === "income" ? "text-mint" : "text-paper-100")}>
                        {t.type === "income" ? "+" : "-"}
                        {formatRupiah(t.amount)}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddModal(true)}
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-signal py-2.5 text-xs font-bold text-ink-950 transition-colors hover:bg-paper-50 active:scale-[0.98]"
                >
                  <Icon name="plus" size={14} strokeWidth={2.4} />
                  Catat transaksi
                </button>
              </div>
            )}

            {/* TAB: RIWAYAT */}
            {activeTab === "transactions" && (
              <div className="fade-in flex flex-1 flex-col justify-between gap-2">
                <div className="flex items-center justify-between border-b border-ink-600 pb-2">
                  <h4 className="text-xs font-semibold text-paper-50">Riwayat transaksi</h4>
                  <span className="text-[10px] text-mist">{transactions.length} data</span>
                </div>
                <div className="my-auto space-y-1.5">
                  {transactions.slice(0, 4).map((t) => (
                    <div key={t.id} className="flex items-center justify-between rounded-lg bg-ink-800 p-2.5">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-ink-700 text-paper-100">
                          <Icon name={t.icon} size={14} />
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-paper-50">{t.title}</p>
                          <p className="truncate text-[9px] text-mist">
                            {t.category}, {t.wallet}
                          </p>
                        </div>
                      </div>
                      <p className={"shrink-0 pl-2 font-mono text-[11px] font-medium " + (t.type === "income" ? "text-mint" : "text-coral")}>
                        {t.type === "income" ? "+" : "-"}
                        {formatRupiah(t.amount)}
                      </p>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddModal(true)}
                  className="w-full rounded-lg bg-signal py-2.5 text-xs font-bold text-ink-950 transition-colors hover:bg-paper-50"
                >
                  Tambah transaksi
                </button>
              </div>
            )}

            {/* TAB: BUDGET */}
            {activeTab === "budget" && (
              <div className="fade-in flex flex-1 flex-col justify-between gap-2">
                <div className="flex items-center justify-between border-b border-ink-600 pb-2">
                  <h4 className="text-xs font-semibold text-paper-50">Anggaran dan tabungan</h4>
                  <span className="text-[10px] font-medium text-mint">Terkontrol</span>
                </div>

                <div className="my-auto space-y-2.5">
                  <div className="space-y-1.5 rounded-lg bg-ink-800 p-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 font-semibold text-paper-50">
                        <Icon name="food" size={13} /> Makanan dan jajan
                      </span>
                      <span className="font-mono text-[10px] text-mist">Rp 750rb / 1,5jt</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-ink-700">
                      <div className="h-full w-1/2 rounded-full bg-signal" />
                    </div>
                    <p className="text-[9px] text-mist">Sisa kuota belanja aman: Rp 750.000</p>
                  </div>

                  <div className="space-y-1.5 rounded-lg bg-ink-800 p-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 font-semibold text-paper-50">
                        <Icon name="car" size={13} /> Transport dan bensin
                      </span>
                      <span className="font-mono text-[10px] text-mist">Rp 200rb / 500rb</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-ink-700">
                      <div className="h-full w-2/5 rounded-full bg-signal" />
                    </div>
                    <p className="text-[9px] text-mist">Sisa kuota: Rp 300.000 (40% terpakai)</p>
                  </div>

                  <div className="space-y-1.5 rounded-lg border border-signal/40 p-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 font-semibold text-signal">
                        <Icon name="target" size={13} /> Liburan akhir tahun
                      </span>
                      <span className="font-mono text-[10px] font-medium text-signal">65%</span>
                    </div>
                    <p className="font-mono text-xs font-medium text-paper-50">Rp 6.500.000 / Rp 10.000.000</p>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink-700">
                      <div className="h-full w-[65%] rounded-full bg-signal" />
                    </div>
                  </div>
                </div>

                <p className="rounded-lg bg-ink-800 p-2 text-center text-[10px] text-mist">
                  Peringatan otomatis aktif saat mendekati limit 80%.
                </p>
              </div>
            )}

            {/* TAB: SPLIT BILL */}
            {activeTab === "splitbill" && (
              <div className="fade-in flex flex-1 flex-col justify-between gap-2">
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
                  className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-signal py-2.5 text-xs font-bold text-ink-950 transition-colors hover:bg-paper-50 active:scale-[0.98]"
                >
                  <Icon name={copiedBill ? "check" : "copy"} size={14} strokeWidth={2.2} />
                  {copiedBill ? "Tersalin" : "Salin ke WhatsApp"}
                </button>
              </div>
            )}
          </div>

          {/* Navigasi bawah */}
          <nav aria-label="Navigasi aplikasi demo" className="relative z-30 flex items-center justify-around px-1 pb-1.5 pt-2">
            {TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  aria-current={active ? "page" : undefined}
                  className={"flex flex-col items-center gap-0.5 px-3 text-[9px] font-semibold transition-colors " + (active ? "text-signal" : "text-mist hover:text-paper-50")}
                >
                  <Icon name={tab.icon} size={17} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Lembar tambah transaksi */}
          {showAddModal && (
            <div className="fade-in absolute inset-0 z-40 flex flex-col justify-end bg-ink-950/90 p-2">
              <div className="space-y-2.5 rounded-3xl border border-ink-600 bg-ink-800 p-3.5 shadow-2xl">
                <div className="flex items-center justify-between border-b border-ink-600 pb-2">
                  <span className="text-xs font-semibold text-paper-50">Catat transaksi</span>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    aria-label="Tutup"
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-700 text-mist hover:text-paper-50"
                  >
                    <Icon name="close" size={12} strokeWidth={2.4} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-1 rounded-lg bg-ink-950 p-0.5 text-[11px] font-semibold">
                  <button
                    type="button"
                    onClick={() => setFormType("expense")}
                    className={"rounded-md py-1.5 " + (formType === "expense" ? "bg-coral text-ink-950" : "text-mist")}
                  >
                    Pengeluaran
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormType("income")}
                    className={"rounded-md py-1.5 " + (formType === "income" ? "bg-mint text-ink-950" : "text-mist")}
                  >
                    Pemasukan
                  </button>
                </div>

                <div className="flex gap-1">
                  {["15000", "25000", "50000", "100000"].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setFormAmount(chip)}
                      className="flex-1 rounded-md bg-ink-700 py-1.5 font-mono text-[10px] font-medium text-paper-100 hover:bg-ink-600"
                    >
                      {parseInt(chip) / 1000}rb
                    </button>
                  ))}
                </div>

                <input
                  type="number"
                  value={formAmount}
                  onChange={(e) => setFormAmount(e.target.value)}
                  aria-label="Nominal"
                  className="w-full rounded-lg border border-ink-600 bg-ink-950 px-2.5 py-2 font-mono text-sm font-medium text-paper-50 focus:border-signal focus:outline-none"
                  placeholder="Nominal"
                />

                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  aria-label="Keterangan"
                  className="w-full rounded-lg border border-ink-600 bg-ink-950 px-2.5 py-2 text-xs text-paper-50 focus:border-signal focus:outline-none"
                  placeholder="Keterangan (kopi, gaji, dll)"
                />

                <select
                  value={formWallet}
                  onChange={(e) => setFormWallet(e.target.value)}
                  aria-label="Dompet"
                  className="w-full rounded-lg border border-ink-600 bg-ink-950 p-2 text-xs text-paper-50 focus:border-signal focus:outline-none"
                >
                  {wallets.map((w) => (
                    <option key={w.id} value={w.name}>
                      {w.name}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={handleAddTransaction}
                  className="w-full rounded-lg bg-signal py-2.5 text-xs font-bold text-ink-950 hover:bg-paper-50 active:scale-[0.98]"
                >
                  Simpan transaksi
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
