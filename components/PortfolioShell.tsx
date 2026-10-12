import { Navigation } from "@/components/ui/Navigation";
import type { ReactNode } from "react";

export function PortfolioShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main id="main">{children}</main>
    </>
  );
}
