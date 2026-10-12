"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Opts [data-reveal] elements into a fade-up once in view. Anything already on screen
// is revealed before the hidden state applies, so nothing flashes or stays invisible.
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)"));
    const viewport = window.innerHeight;
    for (const el of elements) {
      const rect = el.getBoundingClientRect();
      if (rect.top < viewport && rect.bottom > 0) el.classList.add("is-revealed");
    }
    root.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    elements.forEach((el) => {
      if (!el.classList.contains("is-revealed")) observer.observe(el);
    });

    // Anchor jumps and printing must never land on hidden content.
    const revealAll = () => elements.forEach((el) => el.classList.add("is-revealed"));
    window.addEventListener("beforeprint", revealAll);
    return () => {
      observer.disconnect();
      window.removeEventListener("beforeprint", revealAll);
    };
  }, [pathname]);

  return null;
}
