"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { formatRupiah } from "../format";

/* =====================================================================
   1. Kunci PIN dan sidik jari
===================================================================== */

const PIN = "1234";
const MAX_TRIES = 5;
const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"] as const;

function PinLock() {
  const [entry, setEntry] = useState("");
  const [tries, setTries] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [note, setNote] = useState("Masukkan PIN untuk membuka aplikasi.");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const lockedOut = tries >= MAX_TRIES;

  const press = (k: string) => {
    if (unlocked || scanning || lockedOut) return;
    if (k === "del") {
      setEntry((e) => e.slice(0, -1));
      return;
    }
    if (entry.length >= PIN.length) return;
    const next = entry + k;
    setEntry(next);
    if (next.length < PIN.length) return;

    if (next === PIN) {
      timer.current = setTimeout(() => setUnlocked(true), 180);
      setNote("PIN benar.");
    } else {
      const t = tries + 1;
      setTries(t);
      setShakeKey((n) => n + 1);
      setNote(t >= MAX_TRIES ? "Terlalu banyak percobaan. Aplikasi terkunci sementara." : `PIN salah. Sisa percobaan ${MAX_TRIES - t}.`);
      timer.current = setTimeout(() => setEntry(""), 420);
    }
  };

  const finger = () => {
    if (unlocked || scanning || lockedOut) return;
    setScanning(true);
    setNote("Memindai sidik jari...");
    timer.current = setTimeout(() => {
      setScanning(false);
      setEntry(PIN);
      setUnlocked(true);
    }, 1100);
  };

  const relock = () => {
    setUnlocked(false);
    setEntry("");
    setTries(0);
    setNote("Masukkan PIN untuk membuka aplikasi.");
  };

  return (
    <div className="rounded-xl bg-ink-800 p-6 sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-xl font-bold text-paper-50">Coba kunci aplikasi</h3>
        <span className="font-mono text-xs text-mist">PIN contoh: 1234</span>
      </div>

      {unlocked ? (
        <div className="fade-in mt-6 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-signal text-ink-950">
            <Icon name="check" size={28} strokeWidth={2.4} />
          </span>
          <p className="mt-4 font-display text-lg font-bold text-paper-50">Terbuka</p>
          <p className="mt-1 text-sm text-mist">Total saldo Anda</p>
          <p className="font-mono text-3xl font-medium text-paper-50">{formatRupiah(14500000)}</p>
          <button
            type="button"
            onClick={relock}
            className="mt-6 inline-flex items-center gap-2 rounded-md border border-ink-600 px-4 py-2.5 text-sm font-semibold text-paper-100 transition-colors hover:bg-ink-700"
          >
            <Icon name="lock" size={15} />
            Kunci lagi
          </button>
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center">
          <div key={shakeKey} className={"flex gap-3 " + (shakeKey > 0 ? "shake" : "")} aria-hidden="true">
            {Array.from({ length: PIN.length }, (_, i) => (
              <span
                key={i}
                className={
                  "h-3.5 w-3.5 rounded-full border-2 transition-colors " +
                  (i < entry.length ? (shakeKey > 0 && entry !== PIN && entry.length === PIN.length ? "border-coral bg-coral" : "border-signal bg-signal") : "border-ink-600")
                }
              />
            ))}
          </div>
          <p aria-live="polite" className={"mt-4 h-5 text-center text-sm " + (lockedOut ? "text-coral" : "text-mist")}>
            {note}
          </p>

          <div className="mt-4 grid w-full max-w-[16rem] grid-cols-3 gap-2.5">
            {KEYS.map((k, i) =>
              k === "" ? (
                <button
                  key={i}
                  type="button"
                  onClick={finger}
                  aria-label="Buka dengan sidik jari"
                  className="relative flex h-14 items-center justify-center rounded-lg text-signal transition-colors hover:bg-ink-700"
                >
                  {scanning && <span className="absolute inset-1 animate-ping rounded-lg border-2 border-signal/60 motion-reduce:animate-none" />}
                  <Icon name="fingerprint" size={26} />
                </button>
              ) : (
                <button
                  key={i}
                  type="button"
                  onClick={() => press(k)}
                  aria-label={k === "del" ? "Hapus satu digit" : k}
                  disabled={lockedOut}
                  className="flex h-14 items-center justify-center rounded-lg bg-ink-700 font-mono text-xl text-paper-50 transition-colors hover:bg-ink-600 active:scale-95 disabled:opacity-40"
                >
                  {k === "del" ? <Icon name="backspace" size={22} /> : k}
                </button>
              )
            )}
          </div>

          {lockedOut && (
            <button type="button" onClick={relock} className="mt-4 text-sm font-semibold text-signal underline underline-offset-4">
              Ulangi simulasi
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* =====================================================================
   2. Cadangkan dan pulihkan
===================================================================== */

type Step = "ready" | "exported" | "wiped" | "restored";

const STATS = [
  ["Transaksi", 128],
  ["Dompet", 6],
  ["Anggaran", 9],
] as const;

const JSON_LINES = [
  '{',
  '  "app": "MyMoney",',
  '  "wallets": [ ...6 ],',
  '  "transactions": [ ...128 ],',
  '  "budgets": [ ...9 ]',
  '}',
];

function BackupRestore() {
  const [step, setStep] = useState<Step>("ready");
  const empty = step === "wiped";

  const action =
    step === "ready"
      ? { label: "1. Cadangkan data", next: "exported" as Step, icon: "backup" as const }
      : step === "exported"
        ? { label: "2. Ganti HP (hapus data)", next: "wiped" as Step, icon: "phone" as const }
        : step === "wiped"
          ? { label: "3. Pulihkan dari file", next: "restored" as Step, icon: "file" as const }
          : null;

  return (
    <div className="rounded-xl bg-ink-800 p-6 sm:p-8">
      <h3 className="font-display text-xl font-bold text-paper-50">Coba cadangkan dan pulihkan</h3>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {STATS.map(([name, n]) => (
          <div key={name} className="rounded-lg bg-ink-700 p-3 text-center">
            <p key={String(empty) + name} className="pop font-mono text-2xl font-medium text-paper-50">
              {empty ? 0 : n}
            </p>
            <p className="text-[11px] text-mist">{name}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 min-h-[9.5rem] rounded-lg border border-dashed border-ink-600 p-4 font-mono text-xs leading-relaxed">
        {step === "ready" && <p className="font-sans text-sm text-mist">Data Anda ada di ponsel. Tekan tombol di bawah untuk menyimpan salinannya ke satu file JSON.</p>}
        {(step === "exported" || step === "restored") && (
          <div className="fade-in">
            <p className="mb-2 flex items-center gap-2 font-sans text-sm text-signal">
              <Icon name="file" size={15} />
              mymoney-backup.json
              <span className="font-mono text-xs text-mist">12 KB</span>
            </p>
            {JSON_LINES.map((l, i) => (
              <p key={i} className="whitespace-pre text-paper-100">
                {l}
              </p>
            ))}
          </div>
        )}
        {step === "wiped" && (
          <p className="fade-in font-sans text-sm text-mist">
            Ponsel baru, aplikasi kosong. File cadangan masih aman di Google Drive pribadi Anda. Pilih file itu untuk memulihkan semuanya.
          </p>
        )}
      </div>

      {step === "restored" && (
        <p className="fade-in mt-3 flex items-center gap-2 text-sm text-mint">
          <Icon name="check" size={16} strokeWidth={2.4} /> Semua data kembali seperti semula.
        </p>
      )}

      <div className="mt-5 flex gap-3">
        {action && (
          <button
            type="button"
            onClick={() => setStep(action.next)}
            className="inline-flex items-center gap-2 rounded-md bg-signal px-5 py-3 text-sm font-bold text-ink-950 transition-colors hover:bg-paper-50"
          >
            <Icon name={action.icon} size={16} />
            {action.label}
          </button>
        )}
        {step !== "ready" && (
          <button
            type="button"
            onClick={() => setStep("ready")}
            aria-label="Ulangi dari awal"
            className="flex h-11 w-11 items-center justify-center rounded-md border border-ink-600 text-paper-100 transition-colors hover:bg-ink-700"
          >
            <Icon name="reset" size={17} />
          </button>
        )}
      </div>
    </div>
  );
}

export default function SecurityLab() {
  return (
    <div className="mt-20">
      <h3 className="font-display text-2xl font-bold tracking-tight text-paper-50 sm:text-3xl">Coba sendiri</h3>
      <p className="mt-2 max-w-xl text-base leading-relaxed text-mist">
        Dua perlindungan yang paling sering dipakai: kunci aplikasi dan cadangan lokal.
      </p>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <PinLock />
        <BackupRestore />
      </div>
    </div>
  );
}
