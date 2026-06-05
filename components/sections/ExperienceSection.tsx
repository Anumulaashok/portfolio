"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionViewport } from "@/lib/viewport";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Role = {
  title: string;
  period: string;
  highlights: string[];
};

type Employer = {
  company: string;
  location: string;
  roles: Role[];
};

const employers: Employer[] = [
  {
    company: "RAGA AI",
    location: "Bangalore",
    roles: [
      {
        title: "Software Development Engineer",
        period: "Present",
        highlights: [
          "Designed and implemented Temporal-based workflow architecture orchestrating distributed workflows for data processing, integrations, retries, and fault-tolerant execution.",
          "Owned Collections and Lab Reports modules end-to-end—architecture, workflow design, feature development, performance optimization, and production support.",
          "Partnered with product teams to translate business requirements into scalable technical solutions delivered on schedule.",
          "Built UI and backend services for production database/schema management with audit logging, change tracking, and automated migration tooling.",
          "Developed multi-tenant, PostgreSQL-driven config workflows enabling dynamic behavior without code changes or redeployments.",
        ],
      },
    ],
  },
  {
    company: "Revlitix India Private Limited",
    location: "Bangalore",
    roles: [
      {
        title: "Software Engineer - 1",
        period: "Dec 2023 — Earlier",
        highlights: [
          "Owned the full lifecycle of a LangChain-based AI agent framework for NLP-driven chart creation and data analysis, with real-time SSE streaming for a responsive UX.",
          "Designed fault-tolerant workflows handling 100K+ daily insertions/updates using RabbitMQ, MongoDB, and Redis caching.",
          "Contributed to React.js frontend development, helping the team deliver 95% of sprint tasks on time.",
          "Migrated Java microservices to Node.js and moved reporting workloads to ClickHouse, achieving ~10× faster analytics with lower infra overhead.",
          "Owned backend code reviews so zero low-quality builds reached development, improving release reliability by ~20%.",
          "Led cross-functional design reviews (+15% architectural compliance) and mentored junior developers on clean coding and full-cycle delivery.",
        ],
      },
      {
        title: "Associate Software Engineer",
        period: "Dec 2022 — Dec 2023",
        highlights: [
          "Engineered a scalable reporting ecosystem with 15+ custom chart types powered by Java and MongoDB aggregations, plus an internal charting library.",
          "Optimized data processing by ~99% (10 minutes → seconds per batch) via batch insertions, enhanced queries, and indexing.",
          "Built goal tracking, pattern analysis, and scheduled reports—automating daily/weekly alerting and increasing platform traffic by ~10%.",
          "Contributed to ETL pipelines integrating 12+ external platforms: Google, LinkedIn, Meta Ads, Salesforce, HubSpot, GA4, GSC, and more.",
        ],
      },
    ],
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

        <div className="space-y-20">
          {employers.map((employer, employerIndex) => (
            <div
              key={employer.company}
              className="grid gap-12 lg:grid-cols-[1fr_1.2fr]"
            >
              <div
                className={
                  employerIndex === 0 ? "lg:sticky lg:top-32 lg:self-start" : ""
                }
              >
                <p className="text-sm text-[var(--accent-violet)]">
                  {employer.location}
                </p>
                <h3 className="mt-2 font-display text-h2 font-bold">
                  {employer.company}
                </h3>
                {employerIndex === 0 && (
                  <div className="relative mt-8 hidden h-48 w-1 overflow-hidden rounded-full bg-[var(--border)] lg:block">
                    <div
                      ref={progressRef}
                      className="absolute top-0 left-0 h-full w-full origin-top scale-y-0 bg-gradient-to-b from-[var(--accent-violet)] to-[var(--accent-cyan)]"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-12">
                {employer.roles.map((role, roleIndex) => (
                  <motion.div
                    key={`${employer.company}-${role.title}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={sectionViewport}
                    transition={{ delay: roleIndex * 0.05, duration: 0.5 }}
                  >
                    {role.period ? (
                      <p className="text-sm text-[var(--accent-cyan)]">
                        {role.period}
                      </p>
                    ) : null}
                    <h4 className="mt-1 font-display text-xl font-semibold text-[var(--text-primary)]">
                      {role.title}
                    </h4>
                    <ul className="mt-4 space-y-4 border-l-2 border-[var(--border)] pl-6">
                      {role.highlights.map((item) => (
                        <li
                          key={item.slice(0, 48)}
                          className="text-[var(--text-secondary)]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
