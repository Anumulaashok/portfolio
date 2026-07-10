"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { ScrollProgress } from "./ScrollProgress";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#education", label: "Education" },
  { href: "#timeline", label: "Timeline" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const { lenis } = useLenis();
  const [active, setActive] = useState("#hero");
  const [scrolled, setScrolled] = useState(false);
  const scrollY = useMotionValue(0);
  const smoothScrollY = useSpring(scrollY, { stiffness: 120, damping: 28 });
  const navOpacity = useTransform(smoothScrollY, [0, 80], [0.6, 1]);

  useEffect(() => {
    const updateScrolled = (y: number) => setScrolled(y > 40);

    if (!lenis) {
      const onScroll = () => {
        const y = window.scrollY;
        scrollY.set(y);
        updateScrolled(y);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener("scroll", onScroll);
    }

    const onLenisScroll = () => {
      const y = lenis.scroll;
      scrollY.set(y);
      updateScrolled(y);
    };

    onLenisScroll();
    lenis.on("scroll", onLenisScroll);
    return () => lenis.off("scroll", onLenisScroll);
  }, [lenis, scrollY]);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.startsWith("#") || !lenis) return;
    e.preventDefault();
    lenis.scrollTo(href, { offset: -80 });
  };

  return (
    <>
      <ScrollProgress />
      <motion.header
        style={{ opacity: navOpacity }}
        className={`fixed top-0 left-0 right-0 z-[9996] transition-all duration-300 ${
          scrolled
            ? "border-b border-[var(--border)] bg-[rgba(10,10,10,0.85)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
          aria-label="Main navigation"
        >
          <Link
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="font-display text-lg font-semibold tracking-tight text-[var(--text-primary)]"
          >
            Ashok<span className="text-[var(--accent-violet)]">.</span>
          </Link>
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                    active === link.href
                      ? "text-[var(--accent-violet)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="rounded-full border border-[var(--border)] px-4 py-1.5 text-sm text-[var(--text-primary)] transition-colors hover:border-[var(--accent-violet)] md:hidden"
          >
            Contact
          </Link>
        </nav>
      </motion.header>
    </>
  );
}
