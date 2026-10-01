"use client";

import React, { useState } from "react";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: "expense" | "income";
  category: string;
  wallet: string;
  date: string;
  icon: string;
}

interface Wallet {
  id: string;
  name: string;
  balance: number;
  icon: string;
  color: string;
}

export default function InteractivePhoneDemo() {
  const [activeTab, setActiveTab] = useState<"home" | "transactions" | "budget" | "splitbill">("home");
  const [hideBalance, setHideBalance] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // Initial Wallets
  const [wallets, setWallets] = useState<Wallet[]>([
    { id: "1", name: "BCA Tabungan", balance: 7500000, icon: "🏦", color: "from-blue-600 to-indigo-800" },
    { id: "2", name: "Dompet Kas", balance: 650000, icon: "💵", color: "from-emerald-600 to-teal-800" },
    { id: "3", name: "GoPay / OVO", balance: 350000, icon: "📱", color: "from-cyan-600 to-blue-800" },
  ]);

  // Initial Transactions
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: "1", title: "Kopi & Makan Siang", amount: 45000, type: "expense", category: "Makanan", wallet: "Dompet Kas", date: "Hari ini, 12:30", icon: "☕" },
    { id: "2", title: "Gaji Bulanan", amount: 8000000, type: "income", category: "Gaji", wallet: "BCA Tabungan", date: "Kemarin, 09:00", icon: "💰" },
    { id: "3", title: "Bensin Motor", amount: 30000, type: "expense", category: "Transport", wallet: "Dompet Kas", date: "28 Sep", icon: "⛽" },
  ]);

  // Form State
  const [formType, setFormType] = useState<"expense" | "income">("expense");
  const [formAmount, setFormAmount] = useState("35000");
  const [formTitle, setFormTitle] = useState("Kopi Janji Jiwa");
  const [formCategory, setFormCategory] = useState("Makanan");
  const [formWallet, setFormWallet] = useState("Dompet Kas");

  // Split Bill State
  const [billAmount, setBillAmount] = useState(150000);
  const [billPeople, setBillPeople] = useState(3);
  const [billTax, setBillTax] = useState(11);
  const [billTip, setBillTip] = useState(10000);
  const [copiedBill, setCopiedBill] = useState(false);

  // Calculations
  const totalBalance = wallets.reduce((acc, w) => acc + w.balance, 0);
  const totalIncome = transactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

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
      icon: formCategory === "Makanan" ? "🍔" : formCategory === "Transport" ? "🚗" : formCategory === "Gaji" ? "💵" : "✨",
    };

    setWallets(prev =>
      prev.map(w => {
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
    setWallets([
      { id: "1", name: "BCA Tabungan", balance: 7500000, icon: "🏦", color: "from-blue-600 to-indigo-800" },
      { id: "2", name: "Dompet Kas", balance: 650000, icon: "💵", color: "from-emerald-600 to-teal-800" },
      { id: "3", name: "GoPay / OVO", balance: 350000, icon: "📱", color: "from-cyan-600 to-blue-800" },
    ]);
    setTransactions([
      { id: "1", title: "Kopi & Makan Siang", amount: 45000, type: "expense", category: "Makanan", wallet: "Dompet Kas", date: "Hari ini, 12:30", icon: "☕" },
      { id: "2", title: "Gaji Bulanan", amount: 8000000, type: "income", category: "Gaji", wallet: "BCA Tabungan", date: "Kemarin, 09:00", icon: "💰" },
      { id: "3", title: "Bensin Motor", amount: 30000, type: "expense", category: "Transport", wallet: "Dompet Kas", date: "28 Sep", icon: "⛽" },
    ]);
    setActiveTab("home");
  };

  // Split bill calc
  const taxAmount = (billAmount * billTax) / 100;
  const grandTotal = billAmount + taxAmount + billTip;
  const perPerson = Math.ceil(grandTotal / (billPeople || 1));

  const handleCopyBill = () => {
    const text = "*Rincian Split Bill MyMoney*\nTotal Tagihan: " + formatRupiah(grandTotal) + "\nJumlah Orang: " + billPeople + "\n*Per Orang: " + formatRupiah(perPerson) + "*\n\n_Dihitung dengan MyMoney App_";
    navigator.clipboard?.writeText(text);
    setCopiedBill(true);
    setTimeout(() => setCopiedBill(false), 2500);
  };

  return (
    <div className="relative w-full flex flex-col items-center">
      {/* Interactive Control Pill (Clean & Floating) */}
      <div className="mb-5 inline-flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 backdrop-blur-xl border border-slate-800/90 shadow-2xl z-20">
        <span className="text-[11px] font-bold text-cyan-400 px-2.5 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          Live Demo
        </span>
        <button
          onClick={() => {
            setActiveTab("home");
            setShowAddModal(true);
          }}
          className="px-3 py-1 rounded-xl bg-cyan-500 text-slate-950 text-xs font-bold hover:bg-cyan-400 transition-all cursor-pointer shadow-md active:scale-95"
        >
          + Catat Transaksi
        </button>
        <button
          onClick={() => setActiveTab("splitbill")}
          className="px-3 py-1 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-semibold hover:bg-purple-500/30 transition-all cursor-pointer active:scale-95"
        >
          ⚡ Split Bill
        </button>
        <button
          onClick={handleResetDemo}
          className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs transition-all cursor-pointer active:scale-95"
          title="Reset Data"
        >
          🔄
        </button>
      </div>

      {/* Titanium Phone Chassis (Ultra Realistic, Fixed Heights, ZERO Scrollbar) */}
      <div className="relative w-[340px] sm:w-[360px] h-[670px] rounded-[50px] bg-[#070B12] p-[11px] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9)] border-[5px] border-slate-800/90 ring-1 ring-slate-700/60 flex flex-col justify-between overflow-hidden select-none">
        
        {/* Ambient Inner Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Dynamic Island & Status Bar */}
        <div className="relative z-30 flex items-center justify-between px-5 pt-1 pb-1 text-slate-400 text-[11px] font-semibold">
          <span>09:41</span>
          <div className="w-20 h-4 bg-slate-950 rounded-full border border-slate-800 flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse"></span>
          </div>
          <div className="flex items-center gap-1">
            <span>5G</span>
            <div className="w-4 h-2 rounded-[3px] border border-slate-400 p-[1px] flex items-center">
              <div className="h-full w-full bg-slate-300 rounded-[1px]"></div>
            </div>
          </div>
        </div>

        {/* SCREEN INNER CONTAINER (Zero Scrollbar, Fixed Height View) */}
        <div className="relative z-20 flex-1 px-3.5 py-1.5 flex flex-col justify-between overflow-hidden font-sans">
          
          {/* TAB 1: HOME */}
          {activeTab === "home" && (
            <div className="flex-1 flex flex-col justify-between animate-fadeIn">
              {/* Profile Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-xs shadow-md">
                    AS
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-medium">Selamat Datang,</p>
                    <p className="text-xs font-bold text-white leading-none">Ahmat Setiadi</p>
                  </div>
                </div>
                <button
                  onClick={() => setHideBalance(!hideBalance)}
                  className="px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[10px] text-slate-300 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  {hideBalance ? "🙈 Buka" : "👁️ Intip"}
                </button>
              </div>

              {/* Total Balance Card */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/30 shadow-lg relative overflow-hidden">
                <p className="text-[10px] text-slate-400 font-medium">Total Saldo Operasional</p>
                <h3 className="text-xl font-black text-white tracking-tight mt-0.5">
                  {hideBalance ? "Rp ••••••••" : formatRupiah(totalBalance)}
                </h3>

                <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800/80 text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400 font-bold">↓</span>
                    <div>
                      <span className="text-slate-400 block text-[9px]">Pemasukan</span>
                      <span className="font-bold text-emerald-400">{hideBalance ? "•••" : formatRupiah(totalIncome)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-rose-400 font-bold">↑</span>
                    <div>
                      <span className="text-slate-400 block text-[9px]">Pengeluaran</span>
                      <span className="font-bold text-rose-400">{hideBalance ? "•••" : formatRupiah(totalExpense)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wallets Horizontal */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-slate-300">Dompet &amp; Rekening</span>
                  <span className="text-[10px] text-cyan-400 font-semibold">{wallets.length} Akun</span>
                </div>
                <div className="flex gap-2 overflow-hidden">
                  {wallets.map(w => (
                    <div
                      key={w.id}
                      className={"flex-1 p-2 rounded-xl bg-gradient-to-br " + w.color + " text-white shadow-sm flex flex-col justify-between"}
                    >
                      <span className="text-xs">{w.icon}</span>
                      <div className="mt-1">
                        <p className="text-[9px] opacity-80 font-medium truncate">{w.name}</p>
                        <p className="text-[11px] font-black truncate">{hideBalance ? "••••" : formatRupiah(w.balance)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Transactions List */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-300">Transaksi Terkini</span>
                  <button onClick={() => setActiveTab("transactions")} className="text-[10px] text-cyan-400 hover:underline cursor-pointer">
                    Semua
                  </button>
                </div>
                {transactions.slice(0, 2).map(t => (
                  <div
                    key={t.id}
                    className="p-2 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-xs">
                        {t.icon}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white line-clamp-1">{t.title}</p>
                        <p className="text-[9px] text-slate-400">{t.wallet}</p>
                      </div>
                    </div>
                    <p
                      className={"text-xs font-black " + (t.type === "income" ? "text-emerald-400" : "text-slate-200")}
                    >
                      {t.type === "income" ? "+" : "-"}
                      {formatRupiah(t.amount)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Quick Add Button */}
              <button
                onClick={() => setShowAddModal(true)}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-slate-950 font-black text-xs shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all"
              >
                <span>➕</span> Catat Transaksi (Coba Sekarang)
              </button>
            </div>
          )}

          {/* TAB 2: TRANSACTIONS */}
          {activeTab === "transactions" && (
            <div className="flex-1 flex flex-col justify-between py-1 animate-fadeIn">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                <h4 className="text-xs font-bold text-white">Riwayat Transaksi</h4>
                <span className="text-[10px] text-slate-400">{transactions.length} Data</span>
              </div>
              <div className="space-y-1.5 my-auto">
                {transactions.slice(0, 4).map(t => (
                  <div
                    key={t.id}
                    className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-xs">
                        {t.icon}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{t.title}</p>
                        <p className="text-[9px] text-slate-400">{t.category} • {t.wallet}</p>
                      </div>
                    </div>
                    <p
                      className={"text-xs font-black " + (t.type === "income" ? "text-emerald-400" : "text-rose-400")}
                    >
                      {t.type === "income" ? "+" : "-"}
                      {formatRupiah(t.amount)}
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="w-full py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs cursor-pointer"
              >
                + Tambah Transaksi
              </button>
            </div>
          )}

          {/* TAB 3: BUDGET */}
          {activeTab === "budget" && (
            <div className="flex-1 flex flex-col justify-between py-1 animate-fadeIn">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                <h4 className="text-xs font-bold text-white">Anggaran &amp; Tabungan</h4>
                <span className="text-[10px] text-emerald-400 font-semibold">Terkontrol</span>
              </div>

              <div className="space-y-2.5 my-auto">
                {/* Budget 1 */}
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">🍔 Makanan &amp; Jajan</span>
                    <span className="text-slate-400 text-[10px]">Rp 750rb / 1.5jt</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full w-1/2" />
                  </div>
                  <p className="text-[9px] text-slate-400">Sisa kuota belanja aman: Rp 750.000</p>
                </div>

                {/* Budget 2 */}
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">🚗 Transport &amp; Bensin</span>
                    <span className="text-slate-400 text-[10px]">Rp 200rb / 500rb</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full w-2/5" />
                  </div>
                  <p className="text-[9px] text-slate-400">Sisa kuota: Rp 300.000 (40% terpakai)</p>
                </div>

                {/* Wishlist */}
                <div className="p-2.5 rounded-xl bg-indigo-950/50 border border-indigo-500/30 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-300">🎯 Liburan Akhir Tahun</span>
                    <span className="text-[9px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded-full font-bold">65%</span>
                  </div>
                  <p className="text-xs font-black text-white">Rp 6.500.000 / Rp 10.000.000</p>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full w-[65%]" />
                  </div>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-slate-900/60 text-center text-[10px] text-slate-400">
                Peringatan otomatis aktif saat mendekati limit 80%.
              </div>
            </div>
          )}

          {/* TAB 4: SPLIT BILL */}
          {activeTab === "splitbill" && (
            <div className="flex-1 flex flex-col justify-between py-1 animate-fadeIn">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                <h4 className="text-xs font-bold text-white">⚡ Kalkulator Split Bill</h4>
                <span className="text-[9px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded font-bold">Instan</span>
              </div>

              <div className="space-y-2 my-auto">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <label className="text-[9px] text-slate-400 uppercase font-bold">Total Tagihan (Rp)</label>
                  <input
                    type="number"
                    value={billAmount}
                    onChange={e => setBillAmount(Number(e.target.value) || 0)}
                    className="w-full bg-transparent text-sm font-black text-white focus:outline-none"
                  />
                </div>

                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Jumlah Orang</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setBillPeople(Math.max(1, billPeople - 1))}
                      className="w-6 h-6 rounded bg-slate-800 text-white font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="text-xs font-black text-cyan-400">{billPeople} org</span>
                    <button
                      onClick={() => setBillPeople(billPeople + 1)}
                      className="w-6 h-6 rounded bg-slate-800 text-white font-bold text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-950/80 to-slate-900 border border-purple-500/40 text-center space-y-0.5">
                  <p className="text-[10px] text-purple-200">Setiap Orang Bayar (+PPN 11%):</p>
                  <p className="text-lg font-black text-white tracking-tight">{formatRupiah(perPerson)}</p>
                  <p className="text-[8px] text-slate-400">Total + Pajak &amp; Tip: {formatRupiah(grandTotal)}</p>
                </div>
              </div>

              <button
                onClick={handleCopyBill}
                className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1"
              >
                {copiedBill ? "✅ Tersalin!" : "📲 Salin ke WhatsApp"}
              </button>
            </div>
          )}

        </div>

        {/* BOTTOM NAV BAR */}
        <div className="relative z-30 bg-slate-900/95 border-t border-slate-800/80 px-1 py-1.5 flex items-center justify-around rounded-b-[40px]">
          <button
            onClick={() => setActiveTab("home")}
            className={"flex flex-col items-center text-[9px] font-bold cursor-pointer " + (activeTab === "home" ? "text-cyan-400" : "text-slate-500")}
          >
            <span className="text-sm">🏠</span>
            <span>Beranda</span>
          </button>

          <button
            onClick={() => setActiveTab("transactions")}
            className={"flex flex-col items-center text-[9px] font-bold cursor-pointer " + (activeTab === "transactions" ? "text-cyan-400" : "text-slate-500")}
          >
            <span className="text-sm">📜</span>
            <span>Riwayat</span>
          </button>

          <button
            onClick={() => setActiveTab("budget")}
            className={"flex flex-col items-center text-[9px] font-bold cursor-pointer " + (activeTab === "budget" ? "text-cyan-400" : "text-slate-500")}
          >
            <span className="text-sm">🎯</span>
            <span>Budget</span>
          </button>

          <button
            onClick={() => setActiveTab("splitbill")}
            className={"flex flex-col items-center text-[9px] font-bold cursor-pointer " + (activeTab === "splitbill" ? "text-purple-400" : "text-slate-500")}
          >
            <span className="text-sm">⚡</span>
            <span>Tools</span>
          </button>
        </div>

        {/* MODAL SHEET (Clean Pop-up) */}
        {showAddModal && (
          <div className="absolute inset-0 z-40 bg-slate-950/90 backdrop-blur-md flex flex-col justify-end p-2 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-3.5 space-y-2.5 shadow-2xl">
              <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                <span className="text-xs font-bold text-white">Catat Transaksi</span>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 hover:text-white text-[10px] font-bold flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Type Switcher */}
              <div className="grid grid-cols-2 gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setFormType("expense")}
                  className={"py-1 rounded-md cursor-pointer " + (formType === "expense" ? "bg-rose-500 text-white" : "text-slate-400")}
                >
                  Pengeluaran
                </button>
                <button
                  type="button"
                  onClick={() => setFormType("income")}
                  className={"py-1 rounded-md cursor-pointer " + (formType === "income" ? "bg-emerald-500 text-white" : "text-slate-400")}
                >
                  Pemasukan
                </button>
              </div>

              {/* Quick Amount Chips */}
              <div className="flex gap-1">
                {["15000", "25000", "50000", "100000"].map(chip => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setFormAmount(chip)}
                    className="flex-1 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-[9px] font-bold cursor-pointer"
                  >
                    {parseInt(chip) / 1000}rb
                  </button>
                ))}
              </div>

              {/* Amount Input */}
              <input
                type="number"
                value={formAmount}
                onChange={e => setFormAmount(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-sm font-black text-white focus:outline-none focus:border-cyan-500"
                placeholder="Nominal"
              />

              {/* Title Input */}
              <input
                type="text"
                value={formTitle}
                onChange={e => setFormTitle(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                placeholder="Keterangan (Kopi, Gaji, dll)"
              />

              {/* Wallet Select */}
              <select
                value={formWallet}
                onChange={e => setFormWallet(e.target.value)}
                className="w-full p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none"
              >
                {wallets.map(w => (
                  <option key={w.id} value={w.name}>
                    {w.name}
                  </option>
                ))}
              </select>

              {/* Submit */}
              <button
                type="button"
                onClick={handleAddTransaction}
                className="w-full py-2 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs cursor-pointer shadow-lg active:scale-95"
              >
                Simpan Transaksi
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
