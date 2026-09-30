import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 selection:bg-cyan-500 selection:text-white">
      {/* ── BACKGROUND GLOW DECORATIONS ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-cyan-500/15 via-emerald-500/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-emerald-600/10 blur-[160px] rounded-full" />
      </div>

      {/* ── NAVBAR ── */}
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
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Unduh Aplikasi
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="relative z-10 pt-16 pb-24 md:pt-24 md:pb-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-950/80 to-emerald-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-8 shadow-inner shadow-cyan-500/10">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            100% Offline-First • Bebas Iklan • Privasi Terjaga
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.12] mb-6">
            Kelola Keuangan Jadi Lebih{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
              Cerdas &amp; Terkendali.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            Catat transaksi harian dalam hitungan detik, buat limit anggaran bulanan, dan capai target impian Anda tanpa takut data keuangan Anda dibagikan ke pihak ketiga.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#download"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500 hover:opacity-95 text-slate-950 font-extrabold text-base shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-3 transition-all hover:scale-105"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-.22-.916V2.73c0-.34.08-.658.22-.916zM15.206 13.414l2.585 2.585-11.834 6.83 9.249-9.415zm0-2.828L5.957 1.171l11.834 6.83-2.585 2.585zm1.414 1.414l3.197 1.846c.928.536.928 1.414 0 1.95l-3.197 1.846-2.121-2.121 2.121-2.121z" />
              </svg>
              <span>Download di Google Play</span>
            </a>
            <a
              href="#fitur"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 text-slate-200 border border-slate-700/80 font-semibold text-base transition-all flex items-center justify-center gap-2 backdrop-blur-md"
            >
              <span>Pelajari Fitur</span>
              <span>↓</span>
            </a>
          </div>

          {/* ── INTERACTIVE PHONE MOCKUP SHOWCASE ── */}
          <div className="relative max-w-sm sm:max-w-md mx-auto pt-4">
            {/* Phone Bezel */}
            <div className="relative rounded-[42px] p-3.5 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 shadow-2xl shadow-cyan-900/30 border border-slate-700/50">
              <div className="rounded-[36px] bg-[#0A0F1D] border border-slate-800/80 overflow-hidden text-left p-5 shadow-inner">
                {/* Notch / Speaker */}
                <div className="w-24 h-4 bg-slate-950 rounded-full mx-auto mb-4 border border-slate-800/50 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-slate-900 mr-2"></div>
                  <div className="w-10 h-1.5 rounded-full bg-slate-900"></div>
                </div>

                {/* Top App Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-500 p-0.5">
                      <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-xs text-cyan-400">
                        M
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400">Halo, Pengguna Bijak 👋</div>
                      <div className="text-sm font-bold text-white">Akun Personal</div>
                    </div>
                  </div>
                  <div className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-semibold text-emerald-400">
                    ● Aktif
                  </div>
                </div>

                {/* Card Saldo Utama */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/30 mb-4 shadow-lg shadow-cyan-950/20 relative overflow-hidden">
                  <div className="text-xs text-slate-400 mb-1">Total Saldo Operasional</div>
                  <div className="text-2xl font-black text-white tracking-tight mb-3">
                    Rp 14.850.000
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80 text-[11px]">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      ▲ +Rp 4.200.000
                    </span>
                    <span className="text-slate-500">bulan ini</span>
                  </div>
                </div>

                {/* Mini Multi-Wallet Chips */}
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Dompet &amp; Rekening
                </div>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400">BCA Gajian</div>
                    <div className="text-xs font-bold text-white">Rp 12.300.000</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400">GoPay Harian</div>
                    <div className="text-xs font-bold text-white">Rp 1.250.000</div>
                  </div>
                </div>

                {/* Budget Tracker Progress */}
                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="text-slate-300 font-semibold">Anggaran Makanan &amp; Jajan</span>
                    <span className="text-cyan-400 font-bold">68%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full w-[68%]"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>Terpakai: Rp 1.700.000</span>
                    <span>Batas: Rp 2.500.000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS / TRUST BAR ── */}
      <section className="relative z-10 border-y border-slate-800/80 bg-slate-950/60 py-10 px-6 backdrop-blur-md">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              100%
            </div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Penyimpanan Lokal Mandiri</div>
          </div>
          <div>
            <div className="text-3xl font-black text-white">0 Iklan</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Bebas Gangguan Selamanya</div>
          </div>
          <div>
            <div className="text-3xl font-black text-emerald-400">&lt; 15 MB</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Super Ringan &amp; Hemat RAM</div>
          </div>
          <div>
            <div className="text-3xl font-black text-cyan-400">Biometrik</div>
            <div className="text-xs text-slate-400 mt-1 font-medium">Proteksi Sidik Jari &amp; PIN</div>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section id="fitur" className="relative z-10 py-24 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">
              FITUR LENGKAP &amp; INTUITIF
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Segala yang Anda Butuhkan untuk Finansial yang Sehat
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all hover:-translate-y-1 shadow-lg shadow-black/40">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center text-2xl mb-5">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Pencatatan Cepat &amp; Sub-Transaksi</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Catat pengeluaran, pemasukan, dan transfer antar dompet dalam hitungan detik. Dukung rincian struk belanjaan per item secara mendetail.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all hover:-translate-y-1 shadow-lg shadow-black/40">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl mb-5">
                💳
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Multi-Dompet &amp; Rekening</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Pisahkan saldo kas tunai, rekening bank (BCA, Mandiri, BRI), hingga e-wallet. Tahu pasti berapa saldo operasional belanja Anda.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all hover:-translate-y-1 shadow-lg shadow-black/40">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center text-2xl mb-5">
                🎯
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Anggaran &amp; Budgeting Disiplin</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Atur limit batas belanja bulanan per kategori. Bar progres visual pintar akan memperingatkan saat pengeluaran mendekati batas bahaya.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all hover:-translate-y-1 shadow-lg shadow-black/40">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-2xl mb-5">
                💰
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Target Tabungan &amp; Wishlist</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Wujudkan impian membeli gadget, dana liburan, atau dana darurat. Pantau riwayat setoran dan persentase pencapaian dengan jelas.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all hover:-translate-y-1 shadow-lg shadow-black/40">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-2xl mb-5">
                🤝
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Split Bill &amp; Financial Tools</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Bagi tagihan makan bareng teman lengkap dengan hitungan pajak &amp; tip otomatis, siap salin dan bagikan via pesan WhatsApp.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all hover:-translate-y-1 shadow-lg shadow-black/40">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center text-2xl mb-5">
                🔒
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Cadangan Lokal (Backup/Restore)</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Ekspor data Anda kapan saja ke file JSON terenkripsi. Pulihkan data saat berganti ponsel tanpa perlu mengandalkan server luar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFLINE VS CLOUD COMPARISON ── */}
      <section id="perbandingan" className="relative z-10 py-20 px-6 bg-slate-950/60 border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Mengapa Pendekatan Offline-First Lebih Baik?
            </h2>
            <p className="text-sm text-slate-400">
              Perbandingan transparansi MyMoney dibanding aplikasi pencatat keuangan berbasis server cloud biasa.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-4 px-4">Kriteria Keamanan &amp; Fitur</th>
                  <th className="py-4 px-4 text-cyan-400 font-extrabold">MyMoney (Offline-First)</th>
                  <th className="py-4 px-4 text-slate-500">Aplikasi Cloud Biasa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="py-4 px-4 font-medium text-white">Privasi Data Finansial</td>
                  <td className="py-4 px-4 text-emerald-400 font-semibold">100% di memori ponsel Anda</td>
                  <td className="py-4 px-4 text-slate-400">Tersimpan di server pihak ketiga</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-white">Bisa Dipakai Tanpa Internet</td>
                  <td className="py-4 px-4 text-emerald-400 font-semibold">Bisa (Lancar tanpa sinyal)</td>
                  <td className="py-4 px-4 text-rose-400">Tidak bisa / butuh kuota</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-white">Wajib Daftar Akun / Email</td>
                  <td className="py-4 px-4 text-emerald-400 font-semibold">Tidak perlu sama sekali</td>
                  <td className="py-4 px-4 text-slate-400">Wajib login &amp; verifikasi data</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-white">Iklan Mengganggu (Ads)</td>
                  <td className="py-4 px-4 text-emerald-400 font-semibold">Nol Iklan (Bebas Iklan)</td>
                  <td className="py-4 px-4 text-slate-400">Sering muncul banner/pop-up</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-medium text-white">Kecepatan Buka Aplikasi</td>
                  <td className="py-4 px-4 text-emerald-400 font-semibold">Instan (&lt; 0.5 detik)</td>
                  <td className="py-4 px-4 text-slate-400">Tergantung koneksi internet</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section id="faq" className="relative z-10 py-24 px-6 border-t border-slate-800/80">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">TANYA JAWAB</h2>
            <p className="text-3xl font-extrabold text-white">Pertanyaan yang Sering Diajukan</p>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="font-bold text-white text-base mb-2">Apakah aplikasi MyMoney gratis?</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Ya, MyMoney dapat diunduh dan digunakan secara gratis tanpa biaya langganan bulanan tersembunyi.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="font-bold text-white text-base mb-2">Bagaimana jika ponsel saya hilang atau rusak?</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Anda dapat memanfaatkan fitur Cadangkan Data (Backup) yang ada di menu Pengaturan. Simpan berkas JSON cadangan Anda secara berkala ke Google Drive pribadi agar dapat dipulihkan kapan saja.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <h3 className="font-bold text-white text-base mb-2">Apakah MyMoney bisa membaca saldo rekening bank otomatis?</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Tidak. Demi menjaga keamanan saldo perbankan Anda dari risiko peretasan atau izin akses rekening, MyMoney menggunakan sistem pencatatan mandiri yang aman dan tidak terhubung ke API bank Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DOWNLOAD CTA BANNER ── */}
      <section id="download" className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-cyan-950/70 via-slate-900 to-emerald-950/70 border border-cyan-500/30 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-2xl sm:text-4xl font-black text-white mb-4">
            Mulai Ambil Kendali Penuh Atas Finansial Anda
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8">
            Bergabunglah bersama ribuan pengguna cerdas yang telah beralih ke cara pencatatan keuangan yang privat, rapi, dan menenangkan.
          </p>
          <div className="inline-flex flex-wrap gap-4 justify-center">
            <span className="px-6 py-3.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-sm shadow-lg flex items-center gap-2 cursor-pointer hover:bg-cyan-400 transition-colors">
              <span>🚀 Segera Tersedia di Play Store</span>
            </span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 px-6 text-sm text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="MyMoney Logo" width={32} height={32} className="rounded-lg" />
            <span className="font-bold text-white text-base">MyMoney</span>
            <span className="text-xs text-slate-500">• Catat Keuangan Pintar</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400">
            <a href="#fitur" className="hover:text-cyan-400">Fitur</a>
            <a href="#keamanan" className="hover:text-cyan-400">Keamanan</a>
            <a href="#faq" className="hover:text-cyan-400">FAQ</a>
            <Link href="/privacy-policy" className="hover:text-cyan-400 text-cyan-400 font-semibold">Kebijakan Privasi</Link>
            <a href="mailto:support.lexanova@gmail.com" className="hover:text-cyan-400">Kontak Support</a>
          </div>

          <div className="text-xs text-slate-500">
            &copy; 2026 Lexanova. Hak Cipta Dilindungi.
          </div>
        </div>
      </footer>
    </div>
  );
}
