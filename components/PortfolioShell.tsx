"use client";

import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { SplashCursorEffect } from "@/components/reactbits/SplashCursor";
import { Navigation } from "@/components/ui/Navigation";
import type { ReactNode } from "react";

export function PortfolioShell({ children }: { children: ReactNode }) {
  return (
    <SmoothScrollProvider>
      {/* Splash fluid cursor — disable via enabled={false} or NEXT_PUBLIC_SPLASH_CURSOR=false */}
      <SplashCursorEffect />
      <Navigation />
      <div className="grain-overlay" aria-hidden />
      <main>{children}</main>
    </SmoothScrollProvider>
  );
}
