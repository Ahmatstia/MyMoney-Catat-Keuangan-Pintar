"use client";

import { useState, type ReactNode } from "react";
import { BudgetLimit, DailyLimitSim, QuickLog, ReceiptSim, SplitBill, TransferSim } from "./LabSims";

const FEATURES = [
  {
    id: "cepat",
    title: "Pencatatan secepat kilat",
    body: "Catat pengeluaran kasir dalam < 3 detik. Didukung rincian sub-transaksi item per item seperti struk belanja asli.",
  },
  {
    id: "harian",
    title: "Batas harian aman",
    body: "Sisa kas dibagi sisa hari menuju tanggal pembukuan berikutnya. Belanja di bawah batas, jatah besok bertambah. Belanja berlebih, jatah besok mengecil.",
  },
  {
    id: "transfer",
    title: "Transfer antar dompet",
    body: "Pindahkan dana antar tunai, bank, e-wallet, dan tabungan. Total kekayaan tidak berubah, hanya biaya admin yang dicatat sebagai pengeluaran.",
  },
  {
    id: "struk",
    title: "Rincian item struk",
    body: "Bedah satu struk supermarket menjadi item, harga satuan, dan jumlah. Total transaksi terisi otomatis tanpa kalkulator.",
  },
  {
    id: "limit",
    title: "Limit anggaran pintar",
    body: "Pasang batas pengeluaran per kategori. Bar berubah warna saat mendekati batas, dan notifikasi muncul sebelum Anda overbudget.",
  },
  {
    id: "split",
    title: "Split bill dan financial tools",
    body: "Bagi tagihan makan bersama, rata atau per orang, dengan pajak dan tip dibagi proporsional, siap dibagikan ke WhatsApp.",
  },
] as const;

type FeatureId = (typeof FEATURES)[number]["id"];

function Sim({ id }: { id: FeatureId }): ReactNode {
  switch (id) {
    case "cepat":
      return <QuickLog />;
    case "harian":
      return <DailyLimitSim />;
    case "transfer":
      return <TransferSim />;
    case "struk":
      return <ReceiptSim />;
    case "limit":
      return <BudgetLimit />;
    default:
      return <SplitBill />;
  }
}

export default function FeatureLab() {
  const [active, setActive] = useState<FeatureId>("cepat");

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <h2 className="h-section max-w-3xl">Dirancang untuk kedisiplinan finansial Anda</h2>
      <p className="lede mt-5 text-moss">Pilih satu fitur, lalu coba sendiri. Semua perhitungan memakai rumus yang sama dengan aplikasi.</p>

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div role="tablist" aria-label="Fitur MyMoney" className="flex flex-col lg:col-span-4">
          {FEATURES.map((f) => {
            const selected = active === f.id;
            return (
              <div key={f.id} className="border-t-2 last:border-b-2 border-paper-300" style={selected ? { borderColor: "var(--color-leaf)" } : undefined}>
                <button
                  type="button"
                  role="tab"
                  id={`tab-${f.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${f.id}`}
                  onClick={() => setActive(f.id)}
                  className="w-full py-5 text-left"
                >
                  <span
                    className={
                      "block font-display text-xl font-bold tracking-tight transition-colors sm:text-2xl " +
                      (selected ? "text-leaf" : "text-moss hover:text-leaf")
                    }
                  >
                    {f.title}
                  </span>
                  {selected && <span className="fade-in mt-2.5 block max-w-md text-base leading-relaxed text-moss">{f.body}</span>}
                </button>

                {/* Panel inline untuk layar kecil */}
                {selected && (
                  <div
                    role="tabpanel"
                    aria-labelledby={`tab-${f.id}`}
                    className="fade-in mb-6 rounded-xl bg-ink-900 p-5 text-paper-100 lg:hidden"
                  >
                    <Sim id={f.id} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`panel-${active}`}
          aria-labelledby={`tab-${active}`}
          className="hidden min-h-[34rem] rounded-xl bg-ink-900 p-8 text-paper-100 lg:col-span-8 lg:block"
        >
          <div key={active} className="fade-in h-full">
            <Sim id={active} />
          </div>
        </div>
      </div>
    </div>
  );
}
