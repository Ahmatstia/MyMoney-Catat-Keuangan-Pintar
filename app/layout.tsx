import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

// Judul: karakter kuat dan sedikit "dicetak", bukan font bawaan template.
const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

// Isi teks: bersih dan mudah dibaca di layar kecil.
const sans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});

// Hanya untuk angka dan isi struk, seperti printer kasir.
const mono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  themeColor: "#082A26",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "MyMoney: Catat Keuangan Pintar | Aplikasi Pengelola Keuangan Offline & Aman",
  description:
    "Kelola keuangan harian, catat pemasukan & pengeluaran, pantau anggaran belanja, dan capai target tabungan secara 100% offline, privat, dan aman bersama MyMoney.",
  keywords: [
    "MyMoney",
    "catat keuangan",
    "aplikasi keuangan pribadi",
    "budgeting offline",
    "pengatur anggaran",
    "buku kas pintar",
    "split bill indonesia",
  ],
  authors: [{ name: "Lexanova" }],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "MyMoney: Catat Keuangan Pintar",
    description:
      "Aplikasi pengelola keuangan pribadi offline-first terbaik. Privasi 100% aman di perangkat Anda.",
    type: "website",
    locale: "id_ID",
    siteName: "MyMoney",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-ink-900 font-sans text-paper-100 antialiased">
        {children}
      </body>
    </html>
  );
}
