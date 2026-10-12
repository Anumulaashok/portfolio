"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { CommandPalette } from "@/components/CommandPalette";

type UiContextValue = {
  toast: (message: string) => void;
  openPalette: (trigger?: HTMLElement | null) => void;
};

const UiContext = createContext<UiContextValue | null>(null);

export function useUi() {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUi must be used inside UiProvider");
  return ctx;
}

export function UiProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const returnFocus = useRef<HTMLElement | null>(null);

  const toast = useCallback((text: string) => {
    window.clearTimeout(timer.current);
    setMessage(text);
    timer.current = window.setTimeout(() => setMessage(""), 2400);
  }, []);

  const openPalette = useCallback((trigger?: HTMLElement | null) => {
    returnFocus.current = trigger ?? (document.activeElement as HTMLElement | null);
    setPaletteOpen(true);
  }, []);

  const closePalette = useCallback(() => {
    setPaletteOpen(false);
    window.requestAnimationFrame(() => returnFocus.current?.focus());
  }, []);

  useEffect(() => {
    // Opening only; the palette closes itself on Esc or a second ⌘K.
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k" && !paletteOpen) {
        e.preventDefault();
        returnFocus.current = document.activeElement as HTMLElement | null;
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen]);

  return (
    <UiContext.Provider value={{ toast, openPalette }}>
      {children}
      {paletteOpen && <CommandPalette onClose={closePalette} />}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4"
      >
        {message && (
          <p className="animate-fade-in rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink shadow-soft">
            {message}
          </p>
        )}
      </div>
    </UiContext.Provider>
  );
}
