"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, site } from "@/content/profile";
import { useUi } from "@/components/providers/UiProvider";
import { ThemeToggle } from "./ThemeToggle";

export function Navigation() {
  const pathname = usePathname();
  const { openPalette } = useUi();
  const [shortcut, setShortcut] = useState("⌘K");

  useEffect(() => {
    if (!/Mac|iPhone|iPad/.test(navigator.platform)) setShortcut("Ctrl K");
  }, []);

  const isHome = pathname === "/";

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav aria-label="Main" className="gutter flex h-[72px] items-center justify-between gap-4">
        {isHome ? (
          <span aria-hidden="true" />
        ) : (
          <Link href="/" className="font-display text-[17px] font-semibold tracking-tight text-ink">
            {site.name}
          </Link>
        )}
        <div className="flex items-center gap-1 rounded-full bg-scrim py-1 pl-4 pr-1 sm:gap-2">
          <ul className="hidden items-center gap-6 pr-2 text-[14px] md:flex">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener"
                    className="text-ink transition-colors duration-200 ease-out hover:text-accent"
                  >
                    {item.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  <Link href={item.href} className="text-ink transition-colors duration-200 ease-out hover:text-accent">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={(e) => openPalette(e.currentTarget)}
            aria-keyshortcuts="Meta+K Control+K"
            className="flex h-9 items-center gap-2 rounded-full border border-line px-3 text-[13px] text-ink transition-colors duration-200 ease-out hover:border-accent"
          >
            <span className="md:hidden">Menu</span>
            <span className="sr-only">Command palette</span>
            <kbd aria-hidden="true" className="font-mono text-[12px] text-muted">
              {shortcut}
            </kbd>
          </button>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
