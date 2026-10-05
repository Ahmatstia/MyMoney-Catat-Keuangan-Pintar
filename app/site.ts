// Pengaturan situs yang sering berubah. Edit di sini, tidak perlu menyentuh komponen.

// Tautan Google Play Store MyMoney:
// Untuk Closed Testing: "https://play.google.com/apps/testing/com.lexanova.mymoney"
// Untuk Publik / Production: "https://play.google.com/store/apps/details?id=com.lexanova.mymoney"
export const PLAY_STORE_URL =
  "https://play.google.com/apps/testing/com.lexanova.mymoney";

// Set true jika masih dalam tahap Closed Testing (khusus tester terdaftar),
// Ubah ke false jika aplikasi sudah rilis publik di Google Play (Production).
export const IS_CLOSED_TESTING = true;

export const APP_VERSION = "v1.1.0";
export const SUPPORT_EMAIL = "support.lexanova@gmail.com";

export const NAV_LINKS = [
  { href: "/#demo", label: "Coba demo" },
  { href: "/#fitur", label: "Fitur" },
  { href: "/#keamanan", label: "Privasi dan keamanan" },
  { href: "/#perbandingan", label: "Perbandingan" },
  { href: "/#faq", label: "FAQ" },
] as const;
