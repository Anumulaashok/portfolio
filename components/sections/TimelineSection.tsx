"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionViewport } from "@/lib/viewport";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const phases = [
  {
    year: "2017 — 2021",
    title: "Bachelor of Commerce",
    description:
      "Completed B.Com at Government Degree College, Hyderabad—building analytical and business foundations.",
    side: "left" as const,
  },
  {
    year: "2022",
    title: "Masai School — Full Stack",
    description:
      "Intensive full-time program in Java, Spring Boot, MySQL, Hibernate, and React.js with deployed REST API projects.",
    side: "right" as const,
  },
  {
    year: "Dec 2022 — Dec 2023",
    title: "Revlitix — Associate Software Engineer",
    description:
      "One year as Associate Software Engineer—15+ chart reporting ecosystem, ETL across 12+ platforms, and ~99% faster data processing.",
    side: "left" as const,
  },
  {
    year: "Dec 2023 — Earlier",
    title: "Revlitix — Software Engineer",
    description:
      "Promoted to Software Engineer—LangChain AI agents, ClickHouse analytics, 100K+ scale workflows, and full-stack delivery.",
    side: "right" as const,
  },
  {
    year: "Present",
    title: "RAGA AI — Software Development Engineer",
    description:
      "Currently at RAGA AI—Temporal workflow orchestration, Collections/Lab Reports ownership, and multi-tenant PostgreSQL configs.",
    side: "left" as const,
  },
  {
    year: "Ahead",
    title: "Future Goals",
    description:
      "Deepening distributed systems, AI infrastructure, and products that scale globally with measurable business impact.",
    side: "right" as const,
  },
];

export function TimelineSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !lineRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="timeline" ref={sectionRef} className="section-padding px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="Timeline" title="My Journey" align="center" />

        <div className="relative">
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 hidden h-full w-px origin-top -translate-x-1/2 bg-gradient-to-b from-[var(--accent-violet)] via-[var(--accent-cyan)] to-[var(--accent-fuchsia)] md:block"
            style={{ transform: reducedMotion ? "scaleY(1)" : "scaleY(0)" }}
            aria-hidden
          />

          <div className="space-y-16 md:space-y-24">
            {phases.map((phase, index) => (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={sectionViewport}
                transition={{ delay: index * 0.1 }}
                className={`relative grid md:grid-cols-2 md:gap-12 ${
                  phase.side === "right" ? "md:text-right" : ""
                }`}
              >
                <div
                  className={`${
                    phase.side === "right"
                      ? "md:order-2 md:pl-12"
                      : "md:pr-12 md:text-right"
                  }`}
                >
                  <span className="font-display text-sm text-[var(--accent-violet)]">
                    {phase.year}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-semibold">
                    {phase.title}
                  </h3>
                  <p className="mt-3 text-[var(--text-secondary)]">
                    {phase.description}
                  </p>
                </div>
                <div
                  className={`hidden md:block ${
                    phase.side === "right" ? "md:order-1" : ""
                  }`}
                />
                <div
                  className="absolute left-1/2 top-6 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[var(--accent-violet)] bg-[var(--bg)] md:block"
                  aria-hidden
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[var(--accent-violet)]"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
