import type { IconName } from "../Icon";

export type TxType = "expense" | "income" | "transfer";

export interface TxItem {
  name: string;
  qty: number;
  price: number;
}

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TxType;
  category: string;
  wallet: string;
  toWallet?: string;
  date: string;
  icon: IconName;
  today?: boolean;
  isNew?: boolean;
  items?: TxItem[];
}

export type Tone = "cyan" | "mint" | "paper";

export interface Wallet {
  id: string;
  name: string;
  short: string;
  balance: number;
  icon: IconName;
  tone: Tone;
}

export const INITIAL_WALLETS: Wallet[] = [
  { id: "1", name: "BCA Tabungan", short: "BCA", balance: 7500000, icon: "bank", tone: "cyan" },
  { id: "2", name: "Dompet Kas", short: "Kas", balance: 650000, icon: "cash", tone: "mint" },
  { id: "3", name: "GoPay / OVO", short: "GoPay", balance: 350000, icon: "wallet", tone: "paper" },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    title: "Kopi & Makan Siang",
    amount: 45000,
    type: "expense",
    category: "Makanan",
    wallet: "Dompet Kas",
    date: "Hari ini, 12:30",
    icon: "coffee",
    today: true,
    items: [
      { name: "Kopi susu", qty: 1, price: 18000 },
      { name: "Nasi ayam geprek", qty: 1, price: 27000 },
    ],
  },
  { id: "2", title: "Gaji Bulanan", amount: 8000000, type: "income", category: "Gaji", wallet: "BCA Tabungan", date: "Kemarin, 09:00", icon: "cash" },
  { id: "3", title: "Bensin Motor", amount: 30000, type: "expense", category: "Transport", wallet: "Dompet Kas", date: "28 Sep", icon: "fuel" },
];

export const CATEGORIES: { id: string; icon: IconName }[] = [
  { id: "Makanan", icon: "food" },
  { id: "Transport", icon: "car" },
  { id: "Belanja", icon: "bag" },
  { id: "Lainnya", icon: "spark" },
];

/** Anggaran per kategori. `base` = pemakaian yang sudah ada sebelum demo dimulai. */
export const BUDGETS: Record<string, { limit: number; base: number }> = {
  Makanan: { limit: 1500000, base: 750000 },
  Transport: { limit: 500000, base: 200000 },
};

/** Jumlah hari menuju tanggal Awal Pembukuan berikutnya (contoh demo). */
export const CYCLE_DAYS_LEFT = 25;

export const GOAL = { name: "Liburan Akhir Tahun", target: 10000000, saved: 6500000, step: 500000 };

/* ---------- Tema ---------- */

export interface PhoneTheme {
  id: string;
  name: string;
  swatch: string;
  vars: Record<string, string>;
}

const dark = (
  id: string,
  name: string,
  signal: string,
  c950: string,
  c900: string,
  c800: string,
  c700: string,
  c600: string
): PhoneTheme => ({
  id,
  name,
  swatch: signal,
  vars: {
    "--color-ink-950": c950,
    "--color-ink-900": c900,
    "--color-ink-800": c800,
    "--color-ink-700": c700,
    "--color-ink-600": c600,
    "--color-signal": signal,
  },
});

// Palet ini perkiraan dari nama tema di aplikasi, bukan nilai asli ThemeContext.
export const THEMES: PhoneTheme[] = [
  dark("emerald", "Emerald Finance", "#34d399", "#04170f", "#0a2a1f", "#0f3a2b", "#17513c", "#24705a"),
  dark("navy", "Navy Gold", "#e0b84c", "#050b1c", "#0b1630", "#121f42", "#1c2d5c", "#2d4380"),
  dark("indigo", "Indigo Modern", "#8c9aff", "#0b0e26", "#151a3d", "#1d2450", "#2b3470", "#3f4b9a"),
  dark("purple", "Deep Purple", "#b78cff", "#12071f", "#20103a", "#2c1950", "#402670", "#5b3a9a"),
  dark("teal", "Teal Calm", "#2dd4bf", "#051a1d", "#0b2b30", "#103a40", "#19535b", "#287882"),
  dark("rose", "Rose Pink", "#ff8fb1", "#1f0711", "#35101f", "#471a2c", "#632640", "#8a3a5a"),
  dark("ruby", "Ruby Red", "#ff6b6b", "#1d0709", "#330f12", "#461719", "#632226", "#8c353a"),
  {
    id: "light",
    name: "Light Clean",
    swatch: "#f4f7f6",
    vars: {
      "--color-ink-950": "#ffffff",
      "--color-ink-900": "#f1f5f3",
      "--color-ink-800": "#ffffff",
      "--color-ink-700": "#e1e9e5",
      "--color-ink-600": "#c5d2cd",
      "--color-mist": "#5c706b",
      "--color-paper-50": "#0c2723",
      "--color-paper-100": "#1b3a35",
      "--color-signal": "#0f8f70",
      "--color-mint": "#0b8a5f",
      "--color-coral": "#d4402c",
      "--color-amber": "#b7791f",
    },
  },
];

/* ---------- Pusat Panduan (isi disalin dari GuideCenterModal aplikasi) ---------- */

export interface GuideTopic {
  id: string;
  pill: string;
  title: string;
  summary: string;
  steps: { label: string; sub: string; icon: IconName }[];
  tip: string;
}

export const GUIDE_TOPICS: GuideTopic[] = [
  {
    id: "cycle",
    pill: "Awal Pembukuan",
    title: "Awal Pembukuan & Batas Belanja",
    summary:
      "Ketahui batas belanja harian yang aman agar uang Anda bertahan sampai tanggal pembukuan/gajian berikutnya tanpa tekor di akhir bulan.",
    steps: [
      { label: "Total Saldo Kas", sub: "Seluruh uang Anda yang tersedia saat ini", icon: "wallet" },
      { label: "Hitung Sisa Hari", sub: "Mundur menuju tanggal awal pembukuan", icon: "clock" },
      { label: "Batas Belanja Harian", sub: "Sisa Uang ÷ Sisa Hari = Angka Aman!", icon: "shield" },
    ],
    tip: "Jika Anda belanja di bawah batas hari ini, sisa uang yang belum terpakai otomatis menambah batas belanja hari-hari berikutnya!",
  },
  {
    id: "wallets",
    pill: "Dompet",
    title: "Dompet, Bank & E-Wallet",
    summary:
      "Kelola banyak rekening sekaligus. Kartu pertama adalah Total Saldo, dan geser ke samping untuk melihat rincian per dompet.",
    steps: [
      { label: "Geser Kartu Saldo", sub: "Pilih Dompet Tunai, Bank, atau E-Wallet", icon: "swap" },
      { label: "Transfer Saldo", sub: "Pindah dana tanpa memengaruhi pengeluaran", icon: "swap" },
      { label: "Pilih Saat Transaksi", sub: "Saldo dompet terpotong akurat & rapi", icon: "check" },
    ],
    tip: "Saat mencatat transaksi dengan tombol (+), pilih dompet yang sesuai agar saldo kas Anda selalu cocok 100% dengan saldo rekening bank aslinya.",
  },
  {
    id: "transactions",
    pill: "Transaksi",
    title: "Catat Transaksi & Pecah Struk",
    summary:
      "Catat pemasukan & pengeluaran hanya dalam 5 detik. Manfaatkan fitur 'Pecah Struk' untuk merinci struk belanjaan minimarket/supermarket.",
    steps: [
      { label: "Tekan Tombol (+)", sub: "Tombol mengambang di tengah bawah", icon: "plus" },
      { label: "Pecah Struk / Item", sub: "Rinci barang belanjaan & kuantitas", icon: "receipt" },
      { label: "Mutasi & Saldo Update", sub: "Saldo kas & riwayat langsung tercatat", icon: "check" },
    ],
    tip: "Gunakan fitur Rincian Belanja untuk mencatat struk belanja supermarket berisikan banyak item agar rincian belanjaan Anda rapi dan transparan!",
  },
  {
    id: "budget",
    pill: "Anggaran",
    title: "Pagar Anggaran & Peringatan",
    summary:
      "Kendalikan pos-pos rawan boncos seperti Makan Luar, Ngopi, atau Belanja Online dengan batas maksimal bulanan.",
    steps: [
      { label: "Pasang Batas Kuota", sub: "Misal: Makanan Rp 1.500.000", icon: "target" },
      { label: "Peringatan Dini", sub: "Bar berubah kuning saat mendekati batas", icon: "bell" },
      { label: "Alarm Overbudget", sub: "Warna merah & notifikasi saat terlampaui", icon: "bell" },
    ],
    tip: "Anggaran otomatis di-reset mengikuti siklus 'Awal Pembukuan Bulanan' Anda, sehingga tidak perlu membuat ulang setiap bulan.",
  },
];
