"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  LOCAL_HERO_PORTRAIT,
  LOCAL_HERO_PORTRAIT_FALLBACK,
} from "@/lib/heroPortrait";

type HeroPortraitProps = {
  parallaxX?: number;
  parallaxY?: number;
};

export function HeroPortrait({ parallaxX = 0, parallaxY = 0 }: HeroPortraitProps) {
  const reducedMotion = useReducedMotion();
  const [src, setSrc] = useState(LOCAL_HERO_PORTRAIT);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[380px]"
      style={
        reducedMotion
          ? undefined
          : {
              x: parallaxX * 0.03,
              y: parallaxY * 0.03,
            }
      }
    >
      <motion.div
        animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
        transition={
          reducedMotion
            ? undefined
            : { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }
        className="relative"
      >
        <div
          className="absolute -inset-[3px] rounded-full bg-gradient-to-br from-[var(--accent-violet)] via-[var(--accent-cyan)] to-[var(--accent-fuchsia)] opacity-80 blur-sm"
          aria-hidden
        />

        <div className="relative aspect-square w-full overflow-hidden rounded-full border border-white/15 bg-[var(--surface)] shadow-2xl shadow-violet-500/25">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt="Ashok Anumula"
            width={800}
            height={800}
            decoding="async"
            onError={() => {
              if (src !== LOCAL_HERO_PORTRAIT_FALLBACK) {
                setSrc(LOCAL_HERO_PORTRAIT_FALLBACK);
              }
            }}
            className="absolute inset-0 h-full w-full scale-[1.08] object-cover object-top"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
