"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { NAV_LINKS } from "../site";

/** Menu ponsel berbasis <details>. Menutup sendiri setelah tautan dipilih atau saat menekan Esc. */
export default function MobileMenu() {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && ref.current?.open) ref.current.open = false;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => {
    if (ref.current) ref.current.open = false;
  };

  return (
    <details ref={ref} className="group relative xl:hidden">
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
          <Link key={l.href} href={l.href} onClick={close} className="block rounded-md px-3 py-2.5 text-sm text-paper-100 hover:bg-ink-700">
            {l.label}
          </Link>
        ))}
        <Link href="/privacy-policy" onClick={close} className="block rounded-md px-3 py-2.5 text-sm text-paper-100 hover:bg-ink-700">
          Kebijakan privasi
        </Link>
      </div>
    </details>
  );
}
