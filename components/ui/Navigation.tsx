"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { site } from "@/content/profile";

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#education", label: "Education" },
  { href: site.resumeFile, label: "Resume" },
  { href: "/#contact", label: "Contact" },
];

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-sm">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3"
        aria-label="Main navigation"
      >
        <Link
          href="/#hero"
          className="font-mono text-sm font-medium text-[var(--text-primary)]"
        >
          Anumula Ashok
        </Link>
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isFile = link.href.endsWith(".pdf");
            const className =
              "font-mono text-sm text-[var(--text-secondary)] transition-colors duration-150 hover:text-[var(--accent)]";
            return (
              <li key={link.label}>
                {isFile ? (
                  <a href={link.href} target="_blank" rel="noreferrer" className={className}>
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} className={className}>
                    {link.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
