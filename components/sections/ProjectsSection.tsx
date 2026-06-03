"use client";

import { motion } from "framer-motion";
import { GlareHover } from "@/components/reactbits/GlareHover";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectionViewport } from "@/lib/viewport";

const projects = [
  {
    number: "01",
    title: "AI Agent Platform",
    description:
      "Multi-agent orchestration platform with LangChain, enabling autonomous task execution, tool use, and conversational workflows at scale.",
    tags: ["LangChain", "Node.js", "RAG", "AI Agents"],
    gradient: "from-violet-600/40 via-purple-900/30 to-transparent",
  },
  {
    number: "02",
    title: "Analytics Engine",
    description:
      "Real-time analytics pipeline processing high-volume event streams with custom dashboards and actionable business intelligence.",
    tags: ["Java", "Spring Boot", "MongoDB", "React"],
    gradient: "from-cyan-600/40 via-blue-900/30 to-transparent",
  },
  {
    number: "03",
    title: "Workflow Builder",
    description:
      "Visual workflow automation tool allowing teams to design, deploy, and monitor complex business processes without code.",
    tags: ["Node.js", "React", "REST APIs", "Automation"],
    gradient: "from-fuchsia-600/40 via-violet-900/30 to-transparent",
  },
  {
    number: "04",
    title: "Stock Market AI Assistant",
    description:
      "AI-powered financial assistant using RAG and market data APIs to deliver personalized insights and portfolio analysis.",
    tags: ["Python", "LangChain", "RAG", "OpenAI"],
    gradient: "from-emerald-600/40 via-cyan-900/30 to-transparent",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="section-padding px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading label="Projects" title="Featured Work" />

        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={sectionViewport}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
            <GlareHover className="group rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <article className="relative min-h-[280px] md:min-h-[320px]">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
                aria-hidden
              />
              <div className="relative flex flex-col justify-between p-8 md:flex-row md:items-end md:p-12">
                <div>
                  <span className="font-display text-sm text-[var(--accent-violet)]">
                    {project.number}
                  </span>
                  <h3 className="mt-2 font-display text-h2 font-bold transition-transform duration-500 group-hover:translate-x-2">
                    {project.title}
                  </h3>
                </div>
                <div className="mt-6 max-w-md md:mt-0 md:translate-y-8 md:opacity-0 md:transition-all md:duration-500 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  <p className="text-[var(--text-secondary)]">
                    {project.description}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-primary)]"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
            </GlareHover>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
