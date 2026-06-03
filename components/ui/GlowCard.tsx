"use client";

import { motion } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
};

export function GlowCard({ children, className = "" }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const reducedMotion = useReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setPosition({ x: 50, y: 50 })}
      className={`relative overflow-hidden rounded-2xl glass-card p-6 md:p-8 ${className}`}
      whileHover={reducedMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.3 }}
    >
      {!reducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${position.x}% ${position.y}%, rgba(139, 92, 246, 0.15), transparent 40%)`,
            opacity: 1,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
