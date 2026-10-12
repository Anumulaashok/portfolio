"use client";

import { useEffect } from "react";

const GA_ID = "G-VNLJB0DHR4";
const EVENTS = ["pointerdown", "keydown", "scroll", "touchstart"] as const;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

// Loads gtag on first interaction (or after a delay) so it stays off the critical path.
export function Analytics() {
  useEffect(() => {
    let loaded = false;
    const load = () => {
      if (loaded) return;
      loaded = true;
      cleanup();
      window.dataLayer = window.dataLayer ?? [];
      // gtag.js expects the arguments object, not an array.
      // eslint-disable-next-line prefer-rest-params
      const gtag = function () { window.dataLayer!.push(arguments); };
      (gtag as (...args: unknown[]) => void)("js", new Date());
      (gtag as (...args: unknown[]) => void)("config", GA_ID);
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script);
    };
    const timer = window.setTimeout(load, 9000);
    const cleanup = () => {
      window.clearTimeout(timer);
      EVENTS.forEach((e) => window.removeEventListener(e, load));
    };
    EVENTS.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }));
    return cleanup;
  }, []);

  return null;
}
