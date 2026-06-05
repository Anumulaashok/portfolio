"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { GlareHover } from "@/components/reactbits/GlareHover";
import { GlowCard } from "@/components/ui/GlowCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { sectionViewport } from "@/lib/viewport";

const categories = [
  {
    title: "Backend",
    icon: "⚡",
    skills: [
      "Java",
      "Spring Boot",
      "Node.js",
      "Kafka",
      "RabbitMQ",
      "Redis",
      "Hazelcast",
      "REST APIs",
      "Microservices",
      "JWT",
      "OAuth2",
    ],
  },
  {
    title: "Frontend",
    icon: "◈",
    skills: ["React.js", "JavaScript", "HTML", "CSS", "TypeScript", "Next.js"],
  },
  {
    title: "AI & Data",
    icon: "✦",
    skills: [
      "LangChain",
      "RAG",
      "AI Agents",
      "Tavily",
      "Pinecone",
      "Temporal",
      "MongoDB",
      "MySQL",
      "ClickHouse",
      "NoSQL",
    ],
  },
  {
    title: "DevOps & Tools",
    icon: "◎",
    skills: [
      "Git",
      "CI/CD",
      "Docker",
      "Grafana",
      "GCP",
      "Kibana",
      "System Monitoring",
      "GitHub Copilot",
      "Cursor",
    ],
  },
];

export function SkillsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="skills" className="section-padding px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="Skills" title="Tech Stack" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="grid gap-6 sm:grid-cols-2"
        >
          {categories.map((cat, index) => (
            <motion.div
              key={cat.title}
              variants={staggerItem}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <GlareHover
                className={`h-full rounded-2xl transition-all duration-300 ${
                  activeIndex === index
                    ? "ring-1 ring-[var(--accent-violet)]"
                    : ""
                }`}
              >
                <GlowCard className="h-full border-0 bg-transparent">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-2xl" aria-hidden>
                      {cat.icon}
                    </span>
                    <h3 className="font-display text-xl font-semibold">
                      {cat.title}
                    </h3>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <li
                        key={skill}
                        className={`rounded-full px-3 py-1.5 text-sm transition-all duration-300 ${
                          activeIndex === index
                            ? "border border-[var(--accent-violet)] bg-[rgba(139,92,246,0.1)] text-[var(--text-primary)]"
                            : "border border-[var(--border)] text-[var(--text-secondary)]"
                        }`}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </GlowCard>
              </GlareHover>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
