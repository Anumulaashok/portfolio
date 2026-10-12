"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const EmbeddingCanvas = dynamic(() => import("./EmbeddingCanvas"), { ssr: false });

function canRenderField() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches) return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (connection?.saveData) return false;
  try {
    const probe = document.createElement("canvas");
    return Boolean(probe.getContext("webgl2") ?? probe.getContext("webgl"));
  } catch {
    return false;
  }
}

// Poster renders on the server; the WebGL field loads only on capable desktops, after first paint.
export function EmbeddingField() {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!canRenderField()) return;
    let idle: number | undefined;
    let timeout: number | undefined;
    const schedule = () => {
      if (typeof window.requestIdleCallback === "function") {
        idle = window.requestIdleCallback(() => setLoad(true), { timeout: 2500 });
      } else {
        timeout = window.setTimeout(() => setLoad(true), 1200);
      }
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idle !== undefined) window.cancelIdleCallback(idle);
      window.clearTimeout(timeout);
    };
  }, []);

  return load ? <EmbeddingCanvas /> : null;
}
