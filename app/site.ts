// Pengaturan situs yang sering berubah. Edit di sini, tidak perlu menyentuh komponen.

// Tempel tautan Google Play MyMoney di sini setelah aplikasinya terbit,
// contoh: "https://play.google.com/store/apps/details?id=com.lexanova.mymoney".
// Selama kosong, tombol unduh hanya menggulir ke bagian "Unduh".
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
  { href: "/#demo", label: "Demo", id: "demo" },
  { href: "/#fitur", label: "Fitur", id: "fitur" },
  { href: "/#cerita", label: "Satu hari", id: "cerita" },
  { href: "/#analisis", label: "Analisis", id: "analisis" },
  { href: "/#keamanan", label: "Keamanan", id: "keamanan" },
  { href: "/#alat", label: "Alat", id: "alat" },
  { href: "/#faq", label: "FAQ", id: "faq" },
] as const;
