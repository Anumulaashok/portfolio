"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BlurText } from "@/components/reactbits/BlurText";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { sectionViewport } from "@/lib/viewport";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ashoksmart143",
  },
  {
    label: "GitHub",
    href: "https://github.com/Anumulaashok",
  },
  {
    label: "Email",
    href: "mailto:anumulaashok85@gmail.com",
  },
  {
    label: "Phone",
    href: "tel:+918179463267",
  },
  {
    label: "Resume",
    href: "https://drive.google.com/file/d/12_JFyz8pS60h2bOqEBe8CWg5xdMOzFdm/view?usp=sharing",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="section-padding px-6 pb-32">
      <div className="mx-auto max-w-6xl text-center">
        <div className="mx-auto mb-8 h-px w-24 bg-gradient-to-r from-transparent via-[var(--accent-violet)] to-transparent" />
        <div className="mb-4">
          <BlurText
            text="Let's build something impactful together."
            as="h2"
            animateBy="words"
            delay={100}
            className="font-display text-h1 font-bold leading-tight"
          />
        </div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          {socials.map((social) => (
            <motion.li key={social.label} variants={staggerItem}>
              <MagneticButton
                href={social.href}
                variant="secondary"
                className="min-w-[140px]"
              >
                {social.label}
              </MagneticButton>
            </motion.li>
          ))}
        </motion.ul>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={sectionViewport}
          className="mt-16 text-sm text-[var(--text-secondary)]"
        >
          © {new Date().getFullYear()} Ashok Anumula. Crafted with Next.js &
          motion.
        </motion.p>
      </div>
    </section>
  );
}
