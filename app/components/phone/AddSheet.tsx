"use client";

import { useState } from "react";
import Icon from "../Icon";
import { formatRupiah } from "../../format";
import { CATEGORIES, type TxType, type Wallet } from "./data";

export interface AddPayload {
  type: TxType;
  amount: number;
  title: string;
  category: string;
  wallet: string;
  toWallet?: string;
  fee?: number;
}

const TYPES: { id: TxType; label: string; on: string }[] = [
  { id: "expense", label: "Pengeluaran", on: "bg-coral text-ink-950" },
  { id: "income", label: "Pemasukan", on: "bg-mint text-ink-950" },
  { id: "transfer", label: "Transfer", on: "bg-signal text-ink-950" },
];

const FIELD =
  "w-full rounded-lg border border-ink-600 bg-ink-950 px-2.5 py-2 text-xs text-paper-50 focus:border-signal focus:outline-none";

export default function AddSheet({
  wallets,
  initialType = "expense",
  onClose,
  onSave,
}: {
  wallets: Wallet[];
  initialType?: TxType;
  onClose: () => void;
  onSave: (p: AddPayload) => void;
}) {
  const [type, setType] = useState<TxType>(initialType);
  const [amount, setAmount] = useState(initialType === "transfer" ? "200000" : "35000");
  const [title, setTitle] = useState("Kopi Janji Jiwa");
  const [category, setCategory] = useState("Makanan");
  const [wallet, setWallet] = useState(wallets[1]?.name ?? wallets[0].name);
  const [toWallet, setToWallet] = useState(wallets[2]?.name ?? wallets[0].name);
  const [fee, setFee] = useState(6500);
  const [planOn, setPlanOn] = useState(false);
  const [planDays, setPlanDays] = useState(14);
  const [error, setError] = useState("");

  const num = parseInt(amount.replace(/\D/g, ""), 10) || 0;
  const chips = type === "transfer" ? [100000, 200000, 500000] : [15000, 25000, 50000, 100000, 500000];

  const pickType = (t: TxType) => {
    setType(t);
    setError("");
    if (t === "transfer") {
      setWallet(wallets[0].name);
      setToWallet(wallets[2]?.name ?? wallets[1].name);
      setAmount("200000");
    } else if (wallet === toWallet || type === "transfer") {
      setWallet(wallets[1]?.name ?? wallets[0].name);
      setAmount(t === "income" ? "1400000" : "35000");
    } else if (t === "income") {
      setAmount("1400000");
    } else {
      setAmount("35000");
    }
  };

  const save = () => {
    if (num <= 0) return setError("Isi nominal lebih dari nol.");
    if (type === "transfer") {
      if (wallet === toWallet) return setError("Pilih dompet asal dan tujuan yang berbeda.");
      const src = wallets.find((w) => w.name === wallet);
      if (src && src.balance < num + fee) return setError("Saldo dompet asal tidak cukup.");
      return onSave({ type, amount: num, title: "Transfer", category: "Transfer", wallet, toWallet, fee });
    }
    if (type === "expense") {
      const src = wallets.find((w) => w.name === wallet);
      if (src && src.balance < num) return setError("Saldo dompet ini tidak cukup.");
    }
    onSave({
      type,
      amount: num,
      title: title || (type === "expense" ? "Pengeluaran" : "Pemasukan"),
      category: type === "income" ? "Gaji" : category,
      wallet,
    });
  };

  return (
    <div className="fade-in absolute inset-0 z-40 flex flex-col justify-end bg-ink-950/90 p-2">
      <div className="no-scrollbar max-h-full space-y-2.5 overflow-y-auto rounded-3xl border border-ink-600 bg-ink-800 p-3.5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-ink-600 pb-2">
          <span className="text-xs font-semibold text-paper-50">Catat transaksi</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup"
            className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-700 text-mist hover:text-paper-50"
          >
            <Icon name="close" size={12} strokeWidth={2.4} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-1 rounded-lg bg-ink-950 p-0.5 text-[11px] font-semibold">
          {TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={type === t.id}
              onClick={() => pickType(t.id)}
              className={"rounded-md py-1.5 " + (type === t.id ? t.on : "text-mist")}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex gap-1">
          {chips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setAmount(String(chip))}
              className="flex-1 rounded-md bg-ink-700 py-1.5 font-mono text-[10px] font-medium text-paper-100 hover:bg-ink-600"
            >
              {chip >= 1000000 ? chip / 1000000 + "jt" : chip / 1000 + "rb"}
            </button>
          ))}
        </div>

        <input
          type="number"
          inputMode="numeric"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          aria-label="Nominal"
          className={FIELD + " font-mono text-sm font-medium"}
          placeholder="Nominal"
        />

        {type !== "transfer" && (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Keterangan"
            className={FIELD}
            placeholder="Keterangan (kopi, gaji, dll)"
          />
        )}

        {type === "expense" && (
          <div className="flex gap-1" role="group" aria-label="Kategori">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                aria-pressed={category === c.id}
                onClick={() => setCategory(c.id)}
                className={
                  "flex flex-1 items-center justify-center gap-1 rounded-md border py-1.5 text-[10px] font-semibold " +
                  (category === c.id ? "border-signal bg-signal/15 text-signal" : "border-ink-600 text-mist")
                }
              >
                <Icon name={c.icon} size={11} />
                {c.id}
              </button>
            ))}
          </div>
        )}

        {type !== "transfer" ? (
          <select value={wallet} onChange={(e) => setWallet(e.target.value)} aria-label="Dompet" className={FIELD}>
            {wallets.map((w) => (
              <option key={w.id} value={w.name}>
                {w.name}
              </option>
            ))}
          </select>
        ) : (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <label className="text-[9px] text-mist">
                Dompet asal
                <select value={wallet} onChange={(e) => setWallet(e.target.value)} className={FIELD + " mt-1"}>
                  {wallets.map((w) => (
                    <option key={w.id} value={w.name}>
                      {w.short}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-[9px] text-mist">
                Dompet tujuan
                <select value={toWallet} onChange={(e) => setToWallet(e.target.value)} className={FIELD + " mt-1"}>
                  {wallets.map((w) => (
                    <option key={w.id} value={w.name}>
                      {w.short}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <p className="mb-1 text-[9px] text-mist">Biaya admin (dicatat sebagai pengeluaran)</p>
              <div className="flex gap-1">
                {[0, 2500, 6500].map((f) => (
                  <button
                    key={f}
                    type="button"
                    aria-pressed={fee === f}
                    onClick={() => setFee(f)}
                    className={
                      "flex-1 rounded-md border py-1.5 font-mono text-[10px] font-medium " +
                      (fee === f ? "border-signal bg-signal/15 text-signal" : "border-ink-600 text-mist")
                    }
                  >
                    {f === 0 ? "Tanpa" : formatRupiah(f)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {type === "income" && (
          <div className="rounded-lg border border-ink-600 p-2.5">
            <button
              type="button"
              role="switch"
              aria-checked={planOn}
              onClick={() => setPlanOn((v) => !v)}
              className="flex w-full items-center justify-between text-left"
            >
              <span className="text-[11px] font-semibold text-paper-50">Atur Batas Belanja Harian</span>
              <span className={"relative h-4 w-7 rounded-full transition-colors " + (planOn ? "bg-signal" : "bg-ink-600")}>
                <span
                  className={
                    "absolute top-0.5 h-3 w-3 rounded-full bg-ink-950 transition-all " + (planOn ? "left-[14px]" : "left-0.5")
                  }
                />
              </span>
            </button>
            {planOn && (
              <div className="fade-in mt-2 space-y-1.5">
                <div className="flex gap-1">
                  {[7, 14, 30].map((d) => (
                    <button
                      key={d}
                      type="button"
                      aria-pressed={planDays === d}
                      onClick={() => setPlanDays(d)}
                      className={
                        "flex-1 rounded-md border py-1 text-[10px] font-semibold " +
                        (planDays === d ? "border-signal bg-signal/15 text-signal" : "border-ink-600 text-mist")
                      }
                    >
                      {d} hari
                    </button>
                  ))}
                </div>
                <p className="font-mono text-[10px] text-signal">
                  Simulasi: ~{formatRupiah(Math.floor(num / planDays))}/hari selama {planDays} hari
                </p>
              </div>
            )}
          </div>
        )}

        {error && (
          <p role="alert" className="fade-in rounded-md bg-coral/15 px-2.5 py-1.5 text-[10px] font-medium text-coral">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={save}
          className="w-full rounded-lg bg-signal py-2.5 text-xs font-bold text-ink-950 hover:opacity-90 active:scale-[0.98]"
        >
          {type === "transfer" ? "Simpan transfer" : "Simpan transaksi"}
        </button>
      </div>
    </div>
  );
}
