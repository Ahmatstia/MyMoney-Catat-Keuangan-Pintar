"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** Memasang children baru saat elemen terlihat, supaya animasi masuk baru jalan di saat yang tepat. */
export default function InView({
  children,
  className,
  rootMargin = "0px 0px -15% 0px",
}: {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {seen ? children : null}
    </div>
  );
}
