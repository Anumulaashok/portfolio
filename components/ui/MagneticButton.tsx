"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type MagneticButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
};

export function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.25);
    y.set((e.clientY - centerY) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseClass =
    "inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-medium transition-colors font-display";
  const variantClass =
    variant === "primary"
      ? "bg-[var(--accent-violet)] text-white hover:bg-[#7c3aed]"
      : "border border-[var(--border)] bg-transparent text-[var(--text-primary)] hover:border-[var(--accent-violet)] hover:text-[var(--accent-violet)]";

  const combinedClass = `${baseClass} ${variantClass} ${className}`;

  const motionStyle = reducedMotion ? undefined : { x: springX, y: springY };

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
    return (
      <motion.span
        style={motionStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        <Link
          ref={ref as React.RefObject<HTMLAnchorElement>}
          href={href}
          className={combinedClass}
          {...(isExternal && href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {children}
        </Link>
      </motion.span>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      style={motionStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={reducedMotion ? undefined : { scale: 1.02 }}
      whileTap={reducedMotion ? undefined : { scale: 0.98 }}
      className={combinedClass}
    >
      {children}
    </motion.button>
  );
}
