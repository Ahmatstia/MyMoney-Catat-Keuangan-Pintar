import Image from "next/image";
import Link from "next/link";
import { APP_VERSION, IS_CLOSED_TESTING, PLAY_STORE_URL } from "../site";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import ScrollProgress from "./ScrollProgress";

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

        <NavLinks className="hidden items-center gap-6 text-sm text-mist xl:flex" />

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

          <MobileMenu />
        </div>
      </div>
      <ScrollProgress />
    </header>
  );
}
