"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BlurText } from "@/components/reactbits/BlurText";
import { GradientText } from "@/components/reactbits/GradientText";
import { GradientBlob } from "@/components/ui/GradientBlob";
import { HeroPortrait } from "@/components/ui/HeroPortrait";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useMousePosition } from "@/hooks/useMousePosition";
import { fadeInUp } from "@/lib/animations";

export function HeroSection() {
  const { x, y } = useMousePosition();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setOffset({
      x: x - window.innerWidth / 2,
      y: y - window.innerHeight / 2,
    });
  }, [x, y]);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24"
    >
      <GradientBlob mouseX={offset.x} mouseY={offset.y} />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16 lg:text-left">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mb-4 font-display text-sm uppercase tracking-[0.3em] text-[var(--text-secondary)]"
          >
            Software Development Engineer · RAGA AI
          </motion.p>
          <h1 className="font-display text-display font-bold tracking-tight">
            <GradientText className="font-display text-display font-bold tracking-tight">
              <BlurText
                text="Ashok"
                as="span"
                animateBy="letters"
                delay={60}
                triggerOnMount
                className="inline-block"
              />
            </GradientText>
          </h1>
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="mt-6 max-w-xl text-lg text-[var(--text-secondary)] md:text-xl"
          >
            Currently building scalable systems at RAGA AI. Previously at
            Revlitix—LangChain AI agents, analytics platforms, and integrations
            across Java, Node.js, React, and ClickHouse.
          </motion.p>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <MagneticButton href="#projects" variant="primary">
              View Projects
            </MagneticButton>
            <MagneticButton href="#contact" variant="secondary">
              Contact Me
            </MagneticButton>
          </motion.div>
        </div>

        <HeroPortrait parallaxX={offset.x} parallaxY={offset.y} />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2"
        aria-hidden
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-[var(--border)] p-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-1.5 w-1 rounded-full bg-[var(--accent-violet)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
