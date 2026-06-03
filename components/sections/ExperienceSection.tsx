"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionViewport } from "@/lib/viewport";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const highlights = [
  {
    title: "AI Agents & Automation",
    description:
      "Designed and deployed intelligent AI agents using LangChain and RAG pipelines to automate complex workflows and deliver actionable insights.",
  },
  {
    title: "Analytics & Data",
    description:
      "Built real-time analytics engines processing large datasets, enabling data-driven decision making across the organization.",
  },
  {
    title: "Workflow Automation",
    description:
      "Engineered workflow builders and automation tools that reduced manual processes and improved operational efficiency.",
  },
  {
    title: "Backend APIs",
    description:
      "Developed scalable REST APIs and microservices with Java, Spring Boot, and Node.js serving high-traffic production workloads.",
  },
  {
    title: "Full-Stack Delivery",
    description:
      "Shipped end-to-end features with React and Node.js, collaborating across teams to deliver cohesive product experiences.",
  },
];

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !progressRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      });
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding px-6"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="Experience" title="Where I Work" />

        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-sm text-[var(--accent-violet)]">Dec 2022 — Present</p>
            <h3 className="mt-2 font-display text-h2 font-bold">Software Engineer</h3>
            <p className="mt-1 text-xl text-[var(--text-secondary)]">Revlitix</p>
            <div className="relative mt-8 hidden h-48 w-1 overflow-hidden rounded-full bg-[var(--border)] lg:block">
              <div
                ref={progressRef}
                className="absolute top-0 left-0 h-full w-full origin-top scale-y-0 bg-gradient-to-b from-[var(--accent-violet)] to-[var(--accent-cyan)]"
              />
            </div>
          </div>

          <div className="space-y-8">
            {highlights.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={sectionViewport}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group border-l-2 border-[var(--border)] pl-8 transition-colors hover:border-[var(--accent-violet)]"
              >
                <h4 className="font-display text-xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-violet)]">
                  {item.title}
                </h4>
                <p className="mt-3 text-[var(--text-secondary)]">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
