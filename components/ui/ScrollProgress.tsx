"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ScrollProgress() {
  const reducedMotion = useReducedMotion();
  const { lenis } = useLenis();
  const progress = useMotionValue(0);
  const scaleX = useSpring(progress, { stiffness: 100, damping: 30 });
  const width = useTransform(scaleX, (v) => `${Math.max(0, Math.min(1, v)) * 100}%`);

  useEffect(() => {
    if (reducedMotion) return;

    const updateFromWindow = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.set(max > 0 ? window.scrollY / max : 0);
    };

    if (!lenis) {
      updateFromWindow();
      window.addEventListener("scroll", updateFromWindow, { passive: true });
      window.addEventListener("resize", updateFromWindow);
      return () => {
        window.removeEventListener("scroll", updateFromWindow);
        window.removeEventListener("resize", updateFromWindow);
      };
    }

    const onScroll = () => {
      const max = lenis.limit - lenis.dimensions.height;
      progress.set(max > 0 ? lenis.scroll / max : 0);
    };

    onScroll();
    lenis.on("scroll", onScroll);
    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis, reducedMotion, progress]);

  if (reducedMotion) {
    return (
      <div
        className="fixed top-0 left-0 right-0 z-[9997] h-[2px] origin-left bg-[var(--accent-violet)]"
        aria-hidden
      />
    );
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9997] h-[2px] bg-[var(--border)]"
      aria-hidden
    >
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-[var(--accent-violet)] via-[var(--accent-cyan)] to-[var(--accent-fuchsia)]"
        style={{ width }}
      />
    </div>
  );
}
