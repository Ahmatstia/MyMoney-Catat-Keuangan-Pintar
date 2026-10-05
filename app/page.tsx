import type { CSSProperties } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import InteractivePhoneDemo from "./components/InteractivePhoneDemo";
import FeatureLab from "./components/FeatureLab";
import DataJourney from "./components/DataJourney";
import CompareReceipts from "./components/CompareReceipts";
import Faq from "./components/Faq";
import { PLAY_STORE_URL } from "./site";

const HEADLINE = ["Catat", "setiap", "rupiah,", "simpan", "di", "ponsel", "Anda."];

const PLAY_ICON =
  "M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-.22-.916V2.73c0-.34.08-.658.22-.916zM15.206 13.414l2.585 2.585-11.834 6.83 9.249-9.415zm0-2.828L5.957 1.171l11.834 6.83-2.585 2.585zm1.414 1.414l3.197 1.846c.928.536.928 1.414 0 1.95l-3.197 1.846-2.121-2.121 2.121-2.121z";

export default function Home() {
  const downloadHref = PLAY_STORE_URL || "#download";

  return (
    <>
      <Nav />

      <main>
        {/* Hero */}
        <section className="surface-ink">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-28 pt-12 sm:px-8 lg:grid-cols-12 lg:pt-20">
            <div className="lg:col-span-6 lg:self-center">
              <h1 className="font-display text-[clamp(2.75rem,6vw,4.9rem)] font-extrabold leading-[0.98] tracking-tight text-paper-50 [text-wrap:balance]">
                {HEADLINE.map((w, i) => (
                  <span key={i}>
                    <span className="word" style={{ "--i": i } as CSSProperties}>
                      <span>{w}</span>
                    </span>{" "}
                  </span>
                ))}
              </h1>

              <p className="lede mt-8 text-mist">
                Catat transaksi harian dalam hitungan detik, buat limit anggaran bulanan, dan nikmati fitur Split Bill
                pintar tanpa takut data keuangan Anda dibagikan ke pihak ketiga.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                <a
                  href={downloadHref}
                  className="inline-flex items-center gap-2.5 rounded-md bg-signal px-6 py-3.5 text-sm font-bold text-ink-950 transition-colors hover:bg-paper-50"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={PLAY_ICON} />
                  </svg>
                  Download di Play Store
                </a>
                <a
                  href="#fitur"
                  className="text-sm font-semibold text-paper-100 underline decoration-ink-600 decoration-2 underline-offset-8 transition-colors hover:decoration-signal"
                >
                  Pelajari fitur
                </a>
              </div>

              <p className="mt-6 text-sm text-mist">Gratis. Tanpa akun. Tanpa iklan.</p>
            </div>

            <div id="demo" className="scroll-mt-24 lg:col-span-6">
              <InteractivePhoneDemo />
            </div>
          </div>
        </section>

        {/* Fitur */}
        <section id="fitur" className="surface-paper tear-top scroll-mt-16 py-24 md:py-32">
          <FeatureLab />
        </section>

        {/* Keamanan */}
        <section id="keamanan" className="surface-ink tear-top scroll-mt-16 py-24 md:py-32">
          <DataJourney />
        </section>

        {/* Perbandingan */}
        <section id="perbandingan" className="surface-paper tear-top scroll-mt-16 py-24 md:py-32">
          <CompareReceipts />
        </section>

        {/* FAQ */}
        <section id="faq" className="surface-ink tear-top scroll-mt-16 py-24 md:py-32">
          <Faq />
        </section>

        {/* Unduh */}
        <section id="download" className="surface-signal tear-top scroll-mt-16 py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="font-display text-[clamp(2.75rem,8vw,6.5rem)] font-extrabold leading-[0.95] tracking-tight [text-wrap:balance]">
              Mulai catat hari ini.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed">
              Gratis, tanpa akun, dan tetap jalan tanpa internet. Data keuangan Anda tinggal di ponsel Anda.
            </p>
            <a
              href={downloadHref}
              className="mt-10 inline-flex items-center gap-3 rounded-md bg-ink-950 px-7 py-4 text-base font-bold text-paper-50 transition-colors hover:bg-ink-800"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d={PLAY_ICON} />
              </svg>
              {PLAY_STORE_URL ? "Unduh di Google Play" : "Tersedia di Google Play"}
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
