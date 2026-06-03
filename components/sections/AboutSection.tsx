"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";
import { sectionViewport } from "@/lib/viewport";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const skills = [
  "Java",
  "Spring Boot",
  "Node.js",
  "React",
  "TypeScript",
  "MongoDB",
  "PostgreSQL",
  "LangChain",
  "RAG",
  "AI Agents",
  "Microservices",
  "REST APIs",
];

const stats = [
  { label: "Years Experience", value: 3, suffix: "+" },
  { label: "Projects Delivered", value: 15, suffix: "+" },
  { label: "Technologies", value: 20, suffix: "+" },
];

function CountUp({
  end,
  suffix = "",
  duration = 2,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const reducedMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setCount(end);
      return;
    }
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration, reducedMotion]);

  return (
    <span ref={ref} className="font-display text-4xl font-bold text-[var(--text-primary)] md:text-5xl">
      {count}
      {suffix}
    </span>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="section-padding px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="About" title="Who I Am" />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
          viewport={sectionViewport}
          className="space-y-6 text-[var(--text-secondary)]"
          >
            <p>
              Dynamic Software Engineer with 3+ years of experience building
              scalable backend systems, AI-driven solutions, and real-time
              analytics platforms. I specialize in turning complex business
              requirements into reliable, high-performance software.
            </p>
            <p>
              Proficient across the full stack with deep expertise in Java,
              Spring Boot, Node.js, and modern AI tooling including LangChain,
              RAG pipelines, and autonomous AI agents. Passionate about system
              performance, data workflows, and products that deliver measurable
              business impact.
            </p>
          </motion.div>

          <GlowCard>
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={sectionViewport}
              className="flex flex-wrap gap-2"
            >
              {skills.map((skill) => (
                <motion.li
                  key={skill}
                  variants={staggerItem}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--text-primary)] transition-colors hover:border-[var(--accent-violet)]"
                >
                  {skill}
                </motion.li>
              ))}
            </motion.ul>
          </GlowCard>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="mt-20 grid gap-8 sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center"
            >
              <CountUp end={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
