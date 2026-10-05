import Link from "next/link";
import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { SUPPORT_EMAIL } from "../site";

export const metadata: Metadata = {
  title: "Kebijakan Privasi | MyMoney: Catat Keuangan Pintar",
  description:
    "Kebijakan Privasi resmi aplikasi MyMoney. Penjelasan lengkap komitmen kami terhadap keamanan data dan privasi 100% offline-first.",
};

const PERMISSIONS = [
  {
    name: "Notifikasi (POST_NOTIFICATIONS)",
    body: "Digunakan untuk mengirimkan pengingat pencatatan transaksi harian dan peringatan saat anggaran bulanan Anda mendekati batas limit.",
  },
  {
    name: "Alarm tepat waktu (SCHEDULE_EXACT_ALARM)",
    body: "Memastikan pengingat transaksi harian berbunyi tepat waktu pada jam yang Anda tentukan tanpa terhambat oleh fitur optimasi baterai sistem operasi.",
  },
  {
    name: "Biometrik dan kunci layar (USE_BIOMETRIC)",
    body: "Digunakan untuk mengunci akses ke aplikasi dengan sidik jari atau Face Unlock perangkat Anda. Data biometrik diproses langsung oleh sensor ponsel Anda dan tidak pernah dapat dibaca oleh aplikasi.",
  },
  {
    name: "Penyimpanan berkas (dokumen dan foto)",
    body: "Digunakan saat Anda memilih foto profil/cover secara manual, mengekspor laporan transaksi ke berkas PDF, atau membuat cadangan data (Backup) ke memori ponsel Anda.",
  },
];

const H2 = "font-display text-2xl font-bold tracking-tight md:text-3xl";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav />

      <main>
        <section className="surface-ink">
          <div className="mx-auto max-w-3xl px-5 pb-24 pt-14 sm:px-8 md:pt-20">
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1] tracking-tight text-paper-50 [text-wrap:balance]">
              Kebijakan Privasi
            </h1>
            <p className="mt-6 text-sm text-mist">
              Terakhir diperbarui 30 September 2026. Pengembang: Lexanova. Aplikasi: MyMoney: Catat Keuangan Pintar.
            </p>
            <p className="lede mt-8 text-paper-100">
              Kami di <strong className="font-semibold text-paper-50">MyMoney</strong> percaya bahwa catatan keuangan
              adalah salah satu data paling sensitif dan privat dalam hidup Anda. Oleh karena itu, aplikasi MyMoney
              dibangun dengan filosofi <strong className="font-semibold text-paper-50">Penyimpanan Lokal Mandiri</strong>:
              seluruh data transaksi, saldo, anggaran, dan foto struk tersimpan secara eksklusif di dalam memori ponsel
              Anda sendiri tanpa pernah dikirimkan atau dipantau oleh server eksternal kami.
            </p>
          </div>
        </section>

        <section className="surface-paper tear-top py-20 md:py-28">
          <div className="mx-auto max-w-3xl space-y-16 px-5 sm:px-8">
            <section aria-labelledby="p1">
              <h2 id="p1" className={H2}>1. Prinsip utama: penyimpanan lokal penuh</h2>
              <ul className="mt-6 space-y-4 text-base leading-relaxed text-moss">
                <li>
                  <strong className="font-semibold text-leaf">Kepemilikan penuh.</strong> Anda adalah satu-satunya
                  pemilik sah dari data Anda. Kami tidak memiliki akun pengguna terpusat, tidak mewajibkan registrasi
                  email, dan tidak mengumpulkan informasi identitas Anda.
                </li>
                <li>
                  <strong className="font-semibold text-leaf">Bekerja tanpa internet.</strong> Seluruh fitur
                  pencatatan, kalkulasi finansial, split bill, dan pemantauan anggaran berfungsi 100% lancar saat
                  ponsel Anda dalam mode pesawat (<em>airplane mode</em>) atau tanpa kuota internet.
                </li>
                <li>
                  <strong className="font-semibold text-leaf">Tidak ada penjualan data.</strong> Kami tidak pernah
                  menjual, menyewakan, atau memonetisasi data keuangan Anda kepada lembaga pinjaman, bank, analitik
                  iklan, atau pihak ketiga mana pun.
                </li>
              </ul>
            </section>

            <section aria-labelledby="p2">
              <h2 id="p2" className={H2}>2. Izin perangkat yang digunakan (device permissions)</h2>
              <p className="mt-6 text-base leading-relaxed text-moss">
                Aplikasi MyMoney hanya meminta izin sistem Android/iOS yang benar-benar esensial:
              </p>
              <dl className="mt-4">
                {PERMISSIONS.map((p) => (
                  <div key={p.name} className="border-t border-paper-300 py-5 last:border-b">
                    <dt className="font-mono text-sm font-medium text-signal-deep">{p.name}</dt>
                    <dd className="mt-1.5 text-base leading-relaxed text-moss">{p.body}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="p3">
              <h2 id="p3" className={H2}>3. Cadangan dan pemulihan data (backup dan restore)</h2>
              <p className="mt-6 text-base leading-relaxed text-moss">
                MyMoney menyediakan fitur <strong className="font-semibold text-leaf">Cadangkan Data (Backup)</strong>{" "}
                dalam bentuk file berkas terenkripsi JSON. Berkas ini disimpan di folder pilihan Anda sendiri
                (misalnya Google Drive pribadi atau kartu memori SD). Anda memegang kendali 100% kapan ingin
                memindahkan atau menghapus berkas cadangan tersebut.
              </p>
            </section>

            <section aria-labelledby="p4">
              <h2 id="p4" className={H2}>4. Privasi anak dan ketentuan usia</h2>
              <p className="mt-6 text-base leading-relaxed text-moss">
                Aplikasi MyMoney dapat digunakan oleh siapa saja yang ingin belajar mengelola uang saku, anggaran, dan
                tabungan secara mandiri. Kami tidak pernah membedakan atau mengumpulkan data demografi pengguna dari
                segala usia.
              </p>
            </section>

            <section aria-labelledby="p5">
              <h2 id="p5" className={H2}>5. Kontak resmi pengembang</h2>
              <p className="mt-6 text-base leading-relaxed text-moss">
                Jika Anda memiliki saran, pertanyaan seputar kebijakan privasi, atau laporan kendala teknis terkait
                aplikasi MyMoney, silakan hubungi tim kami:
              </p>
              <dl className="mt-4 space-y-2 text-base">
                <div className="flex flex-wrap gap-x-3">
                  <dt className="font-semibold text-leaf">Email dukungan:</dt>
                  <dd>
                    <a href={`mailto:${SUPPORT_EMAIL}`} className="text-signal-deep underline underline-offset-4">
                      {SUPPORT_EMAIL}
                    </a>
                  </dd>
                </div>
                <div className="flex flex-wrap gap-x-3">
                  <dt className="font-semibold text-leaf">Situs resmi:</dt>
                  <dd>
                    <Link href="/" className="text-signal-deep underline underline-offset-4">
                      MyMoney Web Portal
                    </Link>
                  </dd>
                </div>
              </dl>
            </section>

            <div className="border-t border-paper-300 pt-8">
              <Link
                href="/"
                className="inline-flex rounded-md bg-ink-900 px-6 py-3 text-sm font-semibold text-paper-50 transition-colors hover:bg-ink-700"
              >
                Kembali ke halaman utama
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
