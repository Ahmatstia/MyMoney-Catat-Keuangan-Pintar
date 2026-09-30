import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | MyMoney: Catat Keuangan Pintar",
  description: "Kebijakan Privasi resmi aplikasi MyMoney. Penjelasan lengkap komitmen kami terhadap keamanan data dan privasi 100% offline-first.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#080C14] text-slate-200">
      {/* Header Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden ring-1 ring-cyan-500/30 group-hover:scale-105 transition-transform">
              <Image src="/logo.png" alt="MyMoney Logo" width={40} height={40} className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                MyMoney <span className="text-cyan-400 text-xs px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30">Privasi</span>
              </span>
            </div>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </header>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          100% Offline-First &amp; Bebas Iklan
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
          Kebijakan Privasi (Privacy Policy)
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 pb-8 border-b border-slate-800 mb-10">
          <div>Terakhir Diperbarui: <strong className="text-slate-200">30 September 2026</strong></div>
          <div>•</div>
          <div>Pengembang: <strong className="text-slate-200">Lexanova</strong></div>
          <div>•</div>
          <div>Aplikasi: <strong className="text-cyan-400">MyMoney: Catat Keuangan Pintar</strong></div>
        </div>

        {/* Highlight Card */}
        <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-emerald-950/30 border border-cyan-500/20 mb-12 shadow-xl shadow-cyan-950/10">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            🛡️ Komitmen Privasi Tertinggi Kami
          </h3>
          <p className="text-sm leading-relaxed text-slate-300">
            Kami di <strong>MyMoney</strong> percaya bahwa catatan keuangan adalah salah satu data paling sensitif dan privat dalam hidup Anda. 
            Oleh karena itu, aplikasi MyMoney dibangun dengan filosofi <strong>Penyimpanan Lokal Mandiri</strong>: seluruh data transaksi, 
            saldo, anggaran, dan foto struk tersimpan secara eksklusif di dalam memori ponsel Anda sendiri tanpa pernah dikirimkan atau dipantau oleh server eksternal kami.
          </p>
        </div>

        {/* Section 1 */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-sm font-black border border-cyan-500/20">1</span>
            Prinsip Utama: Penyimpanan Lokal Penuh
          </h2>
          <div className="pl-10 space-y-3 text-slate-300 text-sm leading-relaxed">
            <p>
              • <strong>Kepemilikan Penuh:</strong> Anda adalah satu-satunya pemilik sah dari data Anda. Kami tidak memiliki akun pengguna terpusat, tidak mewajibkan registrasi email, dan tidak mengumpulkan informasi identitas Anda.
            </p>
            <p>
              • <strong>Bekerja Tanpa Internet:</strong> Seluruh fitur pencatatan, kalkulasi finansial, split bill, dan pemantauan anggaran berfungsi 100% lancar saat ponsel Anda dalam mode pesawat (*airplane mode*) atau tanpa kuota internet.
            </p>
            <p>
              • <strong>Tidak Ada Penjualan Data:</strong> Kami tidak pernah menjual, menyewakan, atau memonetisasi data keuangan Anda kepada lembaga pinjaman, bank, analitik iklan, atau pihak ketiga mana pun.
            </p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-sm font-black border border-cyan-500/20">2</span>
            Izin Perangkat yang Digunakan (Device Permissions)
          </h2>
          <div className="pl-10 space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>Aplikasi MyMoney hanya meminta izin sistem Android/iOS yang benar-benar esensial:</p>
            <div className="grid gap-3">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="font-semibold text-cyan-300">Notifikasi (POST_NOTIFICATIONS):</span>
                <p className="text-xs text-slate-400 mt-1">
                  Digunakan untuk mengirimkan pengingat pencatatan transaksi harian dan peringatan saat anggaran bulanan Anda mendekati batas limit.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="font-semibold text-cyan-300">Alarm Tepat Waktu (SCHEDULE_EXACT_ALARM):</span>
                <p className="text-xs text-slate-400 mt-1">
                  Memastikan pengingat transaksi harian berbunyi tepat waktu pada jam yang Anda tentukan tanpa terhambat oleh fitur optimasi baterai sistem operasi.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="font-semibold text-cyan-300">Biometrik &amp; Kunci Layar (USE_BIOMETRIC):</span>
                <p className="text-xs text-slate-400 mt-1">
                  Digunakan untuk mengunci akses ke aplikasi dengan sidik jari atau Face Unlock perangkat Anda. Data biometrik diproses langsung oleh sensor ponsel Anda dan tidak pernah dapat dibaca oleh aplikasi.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="font-semibold text-cyan-300">Penyimpanan Berkas (Dokumen &amp; Foto):</span>
                <p className="text-xs text-slate-400 mt-1">
                  Digunakan saat Anda memilih foto profil/cover secara manual, mengekspor laporan transaksi ke berkas PDF, atau membuat cadangan data (Backup) ke memori ponsel Anda.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-sm font-black border border-cyan-500/20">3</span>
            Cadangan &amp; Pemulihan Data (Backup &amp; Restore)
          </h2>
          <div className="pl-10 space-y-3 text-slate-300 text-sm leading-relaxed">
            <p>
              MyMoney menyediakan fitur <strong>Cadangkan Data (Backup)</strong> dalam bentuk file berkas terenkripsi JSON. Berkas ini disimpan di folder pilihan Anda sendiri (misalnya Google Drive pribadi atau kartu memori SD). Anda memegang kendali 100% kapan ingin memindahkan atau menghapus berkas cadangan tersebut.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-sm font-black border border-cyan-500/20">4</span>
            Privasi Anak &amp; Ketentuan Usia
          </h2>
          <div className="pl-10 space-y-3 text-slate-300 text-sm leading-relaxed">
            <p>
              Aplikasi MyMoney dapat digunakan oleh siapa saja yang ingin belajar mengelola uang saku, anggaran, dan tabungan secara mandiri. Kami tidak pernah membedakan atau mengumpulkan data demografi pengguna dari segala usia.
            </p>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mb-12 space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-sm font-black border border-cyan-500/20">5</span>
            Kontak Resmi Pengembang
          </h2>
          <div className="pl-10 text-slate-300 text-sm leading-relaxed space-y-2">
            <p>
              Jika Anda memiliki saran, pertanyaan seputar kebijakan privasi, atau laporan kendala teknis terkait aplikasi MyMoney, silakan hubungi tim kami:
            </p>
            <div className="inline-block p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm">
              <div>📧 <strong>Email Dukungan:</strong> <a href="mailto:support@lexanova.com" className="text-cyan-400 hover:underline">support@lexanova.com</a></div>
              <div className="mt-1">🌐 <strong>Situs Resmi:</strong> <Link href="/" className="text-cyan-400 hover:underline">MyMoney Web Portal</Link></div>
            </div>
          </div>
        </section>

        {/* Back button bottom */}
        <div className="pt-8 border-t border-slate-800 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-white font-medium text-sm transition-all"
          >
            ← Kembali ke Halaman Utama
          </Link>
        </div>
      </div>
    </main>
  );
}
