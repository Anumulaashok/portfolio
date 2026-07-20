"use client";

import { useCallback, useState } from "react";
import {
  CrackerBurstOverlay,
  createCrackerBursts,
  getRandomCrackerCount,
  type CrackerBurst,
} from "@/components/ui/CrackerBurstOverlay";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function BlastIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0"
    >
      <path
        d="M12 2l1.2 4.2L17 7l-3.8 1.8L12 13l-1.2-4.2L7 7l3.8-1.8L12 2z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M5 14l.8 2.8L8.5 17l-2.7 1.2L5 21l-.8-2.8L1.5 17l2.7-1.2L5 14z"
        fill="currentColor"
        opacity="0.75"
      />
      <path
        d="M19 14l.8 2.8L22.5 17l-2.7 1.2L19 21l-.8-2.8L15.5 17l2.7-1.2L19 14z"
        fill="currentColor"
        opacity="0.75"
      />
    </svg>
  );
}

export function BlastButton() {
  const reducedMotion = useReducedMotion();
  const [bursts, setBursts] = useState<CrackerBurst[]>([]);

  const handleClick = useCallback(() => {
    if (reducedMotion) return;

    const count = getRandomCrackerCount();
    const newBursts = createCrackerBursts(count);
    setBursts((prev) => [...prev, ...newBursts]);
  }, [reducedMotion]);

  const handleComplete = useCallback((id: number) => {
    setBursts((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label="Launch fireworks"
        className="fixed bottom-6 right-6 z-[9995] inline-flex items-center gap-2 rounded-full border border-white/20 bg-[rgba(20,20,20,0.82)] px-4 py-2.5 text-sm font-medium text-[var(--text-primary)] shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors hover:border-[var(--accent-violet)]/50 hover:bg-[rgba(30,30,30,0.92)] md:bottom-8 md:right-8"
      >
        <BlastIcon />
        Blast
      </button>
      <CrackerBurstOverlay bursts={bursts} onComplete={handleComplete} />
    </>
  );
}
