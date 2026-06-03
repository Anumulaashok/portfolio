"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type AnimatedTextProps = {
  text: string;
  as?: "h1" | "h2" | "p" | "span";
  className?: string;
  splitBy?: "words" | "chars";
  delay?: number;
  /** Use animate on mount instead of whileInView (for above-the-fold content) */
  animateOnMount?: boolean;
};

export function AnimatedText({
  text,
  as: Tag = "p",
  className = "",
  splitBy = "words",
  delay = 0,
  animateOnMount = false,
}: AnimatedTextProps) {
  const reducedMotion = useReducedMotion();
  const parts =
    splitBy === "chars" ? text.split("") : text.split(/(\s+)/).filter(Boolean);

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: splitBy === "chars" ? 0.03 : 0.06,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <Tag className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        animate={animateOnMount ? "visible" : undefined}
        whileInView={animateOnMount ? undefined : "visible"}
        viewport={{ once: true, margin: "-5%" }}
        className="inline"
        aria-label={text}
      >
        {parts.map((part, i) => (
          <motion.span
            key={`${part}-${i}`}
            variants={child}
            className="inline-block"
            style={{ whiteSpace: part.trim() === "" ? "pre" : undefined }}
            aria-hidden
          >
            {part}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}
