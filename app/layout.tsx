import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#080C14",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "MyMoney: Catat Keuangan Pintar | Aplikasi Pengelola Keuangan Offline & Aman",
  description: "Kelola keuangan harian, catat pemasukan & pengeluaran, pantau anggaran belanja, dan capai target tabungan secara 100% offline, privat, dan aman bersama MyMoney.",
  keywords: [
    "MyMoney",
    "catat keuangan",
    "aplikasi keuangan pribadi",
    "budgeting offline",
    "pengatur anggaran",
    "buku kas pintar",
    "split bill indonesia"
  ],
  authors: [{ name: "Lexanova" }],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "MyMoney: Catat Keuangan Pintar",
    description: "Aplikasi pengelola keuangan pribadi offline-first terbaik. Privasi 100% aman di perangkat Anda.",
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
    <html lang="id" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#080C14] text-slate-100 antialiased selection:bg-cyan-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
