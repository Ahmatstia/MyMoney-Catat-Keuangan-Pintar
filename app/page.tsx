import Image from "next/image";
import Link from "next/link";
import InteractivePhoneDemo from "./components/InteractivePhoneDemo";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 selection:bg-cyan-500 selection:text-white">
      {/* 🔮 BACKGROUND GLOW DECORATIONS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-cyan-500/15 via-emerald-500/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-600/10 blur-[160px] rounded-full" />
      </div>

      {/* 🧭 NAVBAR */}
      <nav className="border-b border-slate-800/80 bg-[#080C14]/80 backdrop-blur-xl sticky top-0 z-50 transition-all">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="w-11 h-11 rounded-2xl overflow-hidden ring-2 ring-cyan-500/30 group-hover:scale-105 transition-all shadow-lg shadow-cyan-500/10 bg-slate-900">
              <Image
                src="/logo.png"
                alt="MyMoney Logo"
                width={44}
                height={44}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-2">
                MyMoney
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-400 border border-cyan-500/30">
                  v1.0.9
                </span>
              </span>
              <span className="text-xs text-slate-400 block -mt-0.5">Catat Keuangan Pintar</span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#demo" className="hover:text-cyan-400 transition-colors">Coba Demo</a>
            <a href="#fitur" className="hover:text-cyan-400 transition-colors">Fitur Unggulan</a>
            <a href="#keamanan" className="hover:text-cyan-400 transition-colors">Privasi &amp; Keamanan</a>
            <a href="#perbandingan" className="hover:text-cyan-400 transition-colors">Keunggulan Offline</a>
            <a href="#faq" className="hover:text-cyan-400 transition-colors">FAQ</a>
            <Link href="/privacy-policy" className="hover:text-cyan-400 transition-colors">Kebijakan Privasi</Link>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-3">
            <a
              href="#download"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
            >
              Unduh Aplikasi
            </a>
          </div>
        </div>
      </nav>

      {/* 🚀 SPLIT 2-COLUMN HERO SECTION */}
      <section className="relative z-10 pt-8 pb-20 md:pt-16 md:pb-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: HERO TEXT & VALUE PROP */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 to-emerald-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider shadow-inner">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              100% Offline-First • Bebas Iklan • Privasi Terjaga
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-[1.12]">
              Kelola Keuangan Jadi Lebih{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                Cerdas &amp; Terkendali.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Catat transaksi harian dalam hitungan detik, buat limit anggaran bulanan, dan nikmati fitur Split Bill pintar tanpa takut data keuangan Anda dibagikan ke pihak ketiga.
            </p>

            {/* Feature Highlights Pills */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
                <span className="text-lg">⚡</span>
                <div className="text-left">
                  <p className="text-xs font-bold text-white">&lt; 3 Detik</p>
                  <p className="text-[10px] text-slate-400">Catat super cepat</p>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center gap-2.5">
                <span className="text-lg">🔒</span>
                <div className="text-left">
                  <p className="text-xs font-bold text-white">100% Offline</p>
                  <p className="text-[10px] text-slate-400">Data aman di HP</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#download"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 hover:opacity-95 text-slate-950 font-extrabold text-sm shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-.22-.916V2.73c0-.34.08-.658.22-.916zM15.206 13.414l2.585 2.585-11.834 6.83 9.249-9.415zm0-2.828L5.957 1.171l11.834 6.83-2.585 2.585zm1.414 1.414l3.197 1.846c.928.536.928 1.414 0 1.95l-3.197 1.846-2.121-2.121 2.121-2.121z" />
                </svg>
                <span>Download di Play Store</span>
              </a>
              <a
                href="#fitur"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-semibold text-sm transition-all flex items-center justify-center gap-2 backdrop-blur-md cursor-pointer"
              >
                <span>Pelajari Fitur</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE PHONE SIMULATOR */}
          <div id="demo" className="lg:col-span-6 flex justify-center scroll-mt-24">
            <InteractivePhoneDemo />
          </div>

        </div>
      </section>

      {/* 🌟 FITUR UTAMA SECTION */}
      <section id="fitur" className="relative z-10 py-20 px-6 border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">FITUR UNGGULAN</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Dirancang untuk Kedisiplinan Finansial Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-2xl mb-5">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Pencatatan Secepat Kilat</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Catat pengeluaran kasir dalam &lt; 3 detik. Didukung rincian sub-transaksi item per item seperti struk belanja asli.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/40 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-2xl mb-5">
                🎯
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Limit Anggaran Pintar</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Pasang batas pengeluaran per kategori (makanan, jajan, transportasi). Dapatkan peringatan visual sebelum overbudget.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/40 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-2xl mb-5">
                🤝
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Split Bill &amp; Financial Tools</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Bagi tagihan makan bersama teman dengan hitungan pajak &amp; tip otomatis, siap dibagikan ke WhatsApp dengan rapi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔒 PRIVASI & KEAMANAN SECTION */}
      <section id="keamanan" className="relative z-10 py-20 px-6 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">KEAMANAN &amp; PRIVASI</h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Data Keuangan Anda Adalah Rahasia Pribadi Anda
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
              <div className="text-2xl mb-3">🛡️</div>
              <h3 className="text-base font-bold text-white mb-1.5">100% Offline-First</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Semua data Anda tersimpan di memori perangkat sendiri. Tanpa server luar, bebas kebocoran.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
              <div className="text-2xl mb-3">🔓</div>
              <h3 className="text-base font-bold text-white mb-1.5">Tanpa Wajib Login</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Buka aplikasi dan langsung gunakan tanpa ribet daftar email, nomor HP, atau password.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
              <div className="text-2xl mb-3">👆</div>
              <h3 className="text-base font-bold text-white mb-1.5">Biometrik &amp; PIN</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kunci akses aplikasi dengan sensor Sidik Jari (Fingerprint), Face ID, atau PIN keamanan.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80">
              <div className="text-2xl mb-3">💾</div>
              <h3 className="text-base font-bold text-white mb-1.5">Cadangan Lokal (Backup)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ekspor data Anda kapan saja ke file JSON terenkripsi untuk dipulihkan saat ganti HP.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 📊 OFFLINE VS CLOUD COMPARISON */}
      <section id="perbandingan" className="relative z-10 py-16 px-6 bg-slate-950/60 border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Mengapa Pendekatan Offline-First Lebih Baik?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Perbandingan transparansi MyMoney dibanding aplikasi pencatat keuangan berbasis server cloud biasa.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Kriteria Keamanan &amp; Fitur</th>
                  <th className="py-3 px-4 text-cyan-400 font-extrabold">MyMoney (Offline-First)</th>
                  <th className="py-3 px-4 text-slate-500">Aplikasi Cloud Biasa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Privasi Data Finansial</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">100% di memori ponsel Anda</td>
                  <td className="py-3 px-4 text-slate-400">Tersimpan di server pihak ketiga</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Bisa Dipakai Tanpa Internet</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Bisa (Lancar tanpa sinyal)</td>
                  <td className="py-3 px-4 text-rose-400">Tidak bisa / butuh kuota</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Wajib Daftar Akun / Email</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Tidak perlu sama sekali</td>
                  <td className="py-3 px-4 text-slate-400">Wajib login &amp; verifikasi data</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Iklan Mengganggu (Ads)</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">Nol Iklan (Bebas Iklan)</td>
                  <td className="py-3 px-4 text-slate-400">Sering muncul banner/pop-up</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ❓ FAQ SECTION */}
      <section id="faq" className="relative z-10 py-20 px-6 border-t border-slate-800/80">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">TANYA JAWAB</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">Pertanyaan yang Sering Diajukan</p>
          </div>

          <div className="space-y-3.5">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="font-bold text-white text-sm mb-1.5">Apakah aplikasi MyMoney gratis?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ya, MyMoney dapat diunduh dan digunakan secara gratis tanpa biaya langganan bulanan tersembunyi.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="font-bold text-white text-sm mb-1.5">Bagaimana jika ponsel saya hilang atau rusak?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Anda dapat memanfaatkan fitur Cadangkan Data (Backup) yang ada di menu Pengaturan untuk menyimpan file cadangan JSON ke Google Drive pribadi Anda.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="font-bold text-white text-sm mb-1.5">Apakah MyMoney bisa membaca saldo rekening bank otomatis?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tidak. Demi menjaga keamanan saldo perbankan Anda dari risiko peretasan, MyMoney menggunakan sistem pencatatan mandiri yang aman dan tidak terhubung ke API bank Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 📥 DOWNLOAD CTA BANNER */}
      <section id="download" className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-cyan-950/70 via-slate-900 to-emerald-950/70 border border-cyan-500/30 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
            Mulai Ambil Kendali Penuh Atas Finansial Anda
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6">
            Bergabunglah bersama ribuan pengguna cerdas yang telah beralih ke cara pencatatan keuangan yang privat, rapi, dan menenangkan.
          </p>
          <div className="inline-flex flex-wrap gap-4 justify-center">
            <span className="px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg flex items-center gap-2 cursor-pointer hover:bg-cyan-400 transition-colors">
              <span>🚀 Segera Tersedia di Google Play Store</span>
            </span>
          </div>
        </div>
      </section>

      {/* 🦶 FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-10 px-6 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="MyMoney Logo" width={30} height={30} className="rounded-lg" />
            <span className="font-bold text-white text-sm">MyMoney</span>
            <span className="text-slate-500">• Catat Keuangan Pintar</span>
          </div>

          <div className="flex flex-wrap justify-center gap-5 text-slate-400">
            <a href="#demo" className="hover:text-cyan-400">Coba Demo</a>
            <a href="#fitur" className="hover:text-cyan-400">Fitur</a>
            <a href="#keamanan" className="hover:text-cyan-400">Keamanan</a>
            <a href="#faq" className="hover:text-cyan-400">FAQ</a>
            <Link href="/privacy-policy" className="hover:text-cyan-400 text-cyan-400 font-semibold">Kebijakan Privasi</Link>
            <a href="mailto:support.lexanova@gmail.com" className="hover:text-cyan-400">Kontak Support</a>
          </div>

          <div className="text-slate-500">
            &copy; 2026 Lexanova. Hak Cipta Dilindungi.
          </div>
        </div>
      </footer>
    </div>
  );
}
