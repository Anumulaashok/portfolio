"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BlurText } from "@/components/reactbits/BlurText";
import { GradientText } from "@/components/reactbits/GradientText";
import { GradientBlob } from "@/components/ui/GradientBlob";
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
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      <GradientBlob mouseX={offset.x} mouseY={offset.y} />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-4 font-display text-sm uppercase tracking-[0.3em] text-[var(--text-secondary)]"
        >
          Backend Engineer | AI Agent Engineer
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
          className="mt-6 max-w-2xl text-lg text-[var(--text-secondary)] md:text-xl"
        >
          Building scalable backend systems, intelligent AI agents, and
          data-driven products that turn complex problems into elegant solutions.
        </motion.p>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="#projects" variant="primary">
            View Projects
          </MagneticButton>
          <MagneticButton href="#contact" variant="secondary">
            Contact Me
          </MagneticButton>
          <MagneticButton href="https://drive.google.com/file/d/12_JFyz8pS60h2bOqEBe8CWg5xdMOzFdm/view?usp=sharing" variant="secondary">
            Download Resume
          </MagneticButton>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
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
      </div>
    </section>
  );
}
