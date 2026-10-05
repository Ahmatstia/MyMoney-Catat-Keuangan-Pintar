import Image from "next/image";
import Link from "next/link";
import { APP_VERSION, IS_CLOSED_TESTING, NAV_LINKS, PLAY_STORE_URL } from "../site";

export default function Nav() {
  const downloadHref = PLAY_STORE_URL || "/#download";

  return (
    <header className="sticky top-0 z-50 border-b border-ink-700 bg-ink-900">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9 rounded-lg object-cover"
            priority
          />
          <span className="font-display text-xl font-bold tracking-tight text-paper-50">MyMoney</span>
          <span className="hidden font-mono text-xs text-mist sm:inline">{APP_VERSION}</span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-7 text-sm text-mist xl:flex">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-paper-50">
              {l.label}
            </Link>
          ))}
          <Link href="/privacy-policy" className="transition-colors hover:text-paper-50">
            Kebijakan privasi
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={downloadHref}
            target={PLAY_STORE_URL ? "_blank" : undefined}
            rel={PLAY_STORE_URL ? "noopener noreferrer" : undefined}
            className="whitespace-nowrap rounded-md bg-signal px-4 py-2 text-sm font-semibold text-ink-950 transition-colors hover:bg-paper-50"
          >
            <span className="sm:hidden">{IS_CLOSED_TESTING ? "Uji Coba" : "Unduh"}</span>
            <span className="hidden sm:inline">{IS_CLOSED_TESTING ? "Uji Coba Beta" : "Unduh aplikasi"}</span>
          </a>

          {/* Menu ponsel tanpa JavaScript */}
          <details className="group relative xl:hidden">
            <summary
              aria-label="Buka menu"
              className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-md border border-ink-600 text-paper-100 marker:content-none [&::-webkit-details-marker]:hidden"
            >
              <span className="relative block h-3 w-5">
                <span className="absolute left-0 top-0 h-0.5 w-5 bg-current transition-transform group-open:translate-y-[5px] group-open:rotate-45" />
                <span className="absolute left-0 top-[5px] h-0.5 w-5 bg-current transition-opacity group-open:opacity-0" />
                <span className="absolute left-0 top-[10px] h-0.5 w-5 bg-current transition-transform group-open:-translate-y-[5px] group-open:-rotate-45" />
              </span>
            </summary>
            <div className="absolute right-0 top-12 w-64 rounded-lg border border-ink-600 bg-ink-800 p-2 shadow-xl shadow-black/40">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="block rounded-md px-3 py-2.5 text-sm text-paper-100 hover:bg-ink-700">
                  {l.label}
                </Link>
              ))}
              <Link href="/privacy-policy" className="block rounded-md px-3 py-2.5 text-sm text-paper-100 hover:bg-ink-700">
                Kebijakan privasi
              </Link>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
