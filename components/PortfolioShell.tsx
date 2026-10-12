import type { ReactNode } from "react";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/sections/Footer";
import { UiProvider } from "@/components/providers/UiProvider";
import { RevealObserver } from "@/components/RevealObserver";

export function PortfolioShell({ children }: { children: ReactNode }) {
  return (
    <UiProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
      <Footer />
      <RevealObserver />
    </UiProvider>
  );
}
