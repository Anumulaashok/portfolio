"use client";

import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { sectionViewport } from "@/lib/viewport";

const education = [
  {
    school: "Masai School",
    program: "Full Stack Web Development (Full-Time)",
    period: "Feb 2022 — Nov 2022",
    location: "Remote",
    details: [
      "Specialized in Java, Spring Boot, MySQL, Hibernate, and React.js.",
      "Assembled and deployed full-stack applications with REST APIs and modern frontends.",
    ],
  },
  {
    school: "Government Degree College",
    program: "Bachelor of Commerce",
    period: "Jun 2017 — Jan 2021",
    location: "Hyderabad, India",
    details: [],
  },
];

const certificates = [
  {
    name: "Prompt Design in Vertex AI Skill Badge",
    issuer: "Google Cloud",
  },
];

export function EducationSection() {
  return (
    <section id="education" className="section-padding px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="Education" title="Learning Path" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="grid gap-6 md:grid-cols-2"
        >
          {education.map((item) => (
            <motion.div key={item.school} variants={staggerItem}>
              <GlowCard className="h-full">
                <p className="text-sm text-[var(--accent-violet)]">
                  {item.period} · {item.location}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold">
                  {item.school}
                </h3>
                <p className="mt-1 text-[var(--text-secondary)]">
                  {item.program}
                </p>
                {item.details.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                )}
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={sectionViewport}
          className="mt-12"
        >
          <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">
            Certificates
          </h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {certificates.map((cert) => (
              <li
                key={cert.name}
                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--text-primary)]"
              >
                <span className="text-[var(--accent-cyan)]">{cert.issuer}</span>
                {" · "}
                {cert.name}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
