"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "../site";

/** Tautan navigasi desktop. Tautan bagian yang sedang di layar diberi garis bawah. */
export default function NavLinks({ className = "" }: { className?: string }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const els = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Navigasi utama" className={className}>
      {NAV_LINKS.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          aria-current={active === l.id ? "location" : undefined}
          className={
            "border-b-2 py-1 transition-colors hover:text-paper-50 " +
            (active === l.id ? "border-signal text-paper-50" : "border-transparent")
          }
        >
          {l.label}
        </Link>
      ))}
      <Link href="/privacy-policy" className="border-b-2 border-transparent py-1 transition-colors hover:text-paper-50">
        Privasi
      </Link>
    </nav>
  );
}
