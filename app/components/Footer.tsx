import Image from "next/image";
import Link from "next/link";
import { SUPPORT_EMAIL } from "../site";

export default function Footer() {
  return (
    <footer className="surface-ink-deep tear-top py-14 text-sm text-mist">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="" width={32} height={32} className="h-8 w-8 rounded-md object-cover" />
          <div>
            <p className="font-display text-lg font-bold leading-none text-paper-50">MyMoney</p>
            <p className="mt-1">Catat keuangan pintar</p>
          </div>
        </div>

        <nav aria-label="Tautan footer" className="flex flex-wrap gap-x-7 gap-y-3">
          <Link href="/#demo" className="hover:text-paper-50">Coba demo</Link>
          <Link href="/#fitur" className="hover:text-paper-50">Fitur</Link>
          <Link href="/#keamanan" className="hover:text-paper-50">Keamanan</Link>
          <Link href="/#faq" className="hover:text-paper-50">FAQ</Link>
          <Link href="/privacy-policy" className="font-medium text-signal hover:text-paper-50">
            Kebijakan privasi
          </Link>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-paper-50">Kontak support</a>
        </nav>

        <p className="md:text-right">&copy; 2026 Lexanova. Hak cipta dilindungi.</p>
      </div>
    </footer>
  );
}
