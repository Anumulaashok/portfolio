"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type GradientBlobProps = {
  className?: string;
  mouseX?: number;
  mouseY?: number;
};

export function GradientBlob({
  className = "",
  mouseX = 0,
  mouseY = 0,
}: GradientBlobProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <motion.div
        className="absolute -top-1/4 -left-1/4 h-[60vh] w-[60vh] rounded-full opacity-40 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, var(--accent-violet) 0%, transparent 70%)",
        }}
        animate={
          reducedMotion
            ? undefined
            : {
                x: mouseX * 0.02,
                y: mouseY * 0.02,
                scale: [1, 1.05, 1],
              }
        }
        transition={{
          x: { type: "spring", stiffness: 50, damping: 20 },
          y: { type: "spring", stiffness: 50, damping: 20 },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      <motion.div
        className="absolute -right-1/4 top-1/4 h-[50vh] w-[50vh] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, var(--accent-cyan) 0%, transparent 70%)",
        }}
        animate={
          reducedMotion
            ? undefined
            : {
                x: -mouseX * 0.015,
                y: -mouseY * 0.015,
                scale: [1.05, 1, 1.05],
              }
        }
        transition={{
          x: { type: "spring", stiffness: 50, damping: 20 },
          y: { type: "spring", stiffness: 50, damping: 20 },
          scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
        }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[40vh] w-[40vh] rounded-full opacity-25 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, var(--accent-fuchsia) 0%, transparent 70%)",
        }}
        animate={
          reducedMotion
            ? undefined
            : { scale: [1, 1.08, 1], rotate: [0, 5, 0] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
