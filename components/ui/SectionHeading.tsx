"use client";

import { motion } from "framer-motion";
import { BlurText } from "@/components/reactbits/BlurText";
import { ShinyText } from "@/components/reactbits/ShinyText";
import { fadeInUp } from "@/lib/animations";

type SectionHeadingProps = {
  label: string;
  title: string;
  align?: "left" | "center";
};

export function SectionHeading({
  label,
  title,
  align = "left",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center" : "";

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className={`mb-16 ${alignClass}`}
    >
      <p className="mb-2 font-display text-sm uppercase tracking-widest">
        <ShinyText
          text={label}
          color="var(--accent-cyan)"
          shineColor="#fafafa"
          speed={3}
          className="font-display"
        />
      </p>
      <BlurText
        text={title}
        as="h2"
        animateBy="words"
        delay={80}
        triggerOnMount={false}
        className={`font-display text-h1 font-bold ${alignClass}`}
      />
    </motion.div>
  );
}
