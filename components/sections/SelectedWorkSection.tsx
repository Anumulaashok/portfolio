import Link from "next/link";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Divider } from "@/components/ui/Divider";
import { TagList } from "@/components/ui/TagList";
import { Reveal } from "@/components/ui/Reveal";
import { caseStudies, otherProjects } from "@/content/profile";

export function SelectedWorkSection() {
  return (
    <section id="work" className="section-padding border-b border-[var(--border)] px-6">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="01" title="Selected work" />

        <div className="divide-y divide-[var(--border)] border-t border-[var(--border)]">
          {caseStudies.map((study, index) => (
            <Reveal key={study.slug} delay={index * 0.04}>
              <Link
                href={`/work/${study.slug}`}
                className="group grid gap-2 py-8 transition-colors duration-150 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-8"
              >
                <span className="font-mono text-sm text-[var(--text-tertiary)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                    {study.title}
                  </h3>
                  <p className="mt-1 text-[var(--text-secondary)]">{study.summary}</p>
                  <div className="mt-3">
                    <TagList tags={study.stack} />
                  </div>
                </div>
                <span className="font-mono text-sm text-[var(--accent)] md:self-start">
                  {study.company} →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Divider className="my-14" />

        <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">
          Other engineering work
        </h3>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {otherProjects.map((project) => (
            <Reveal key={project.title}>
              <div className="h-full rounded-[var(--radius-md)] border border-[var(--border)] p-6">
                <h4 className="font-display text-base font-semibold text-[var(--text-primary)]">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[var(--accent)]"
                    >
                      {project.title} ↗
                    </a>
                  ) : (
                    project.title
                  )}
                </h4>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {project.description}
                </p>
                {project.note && (
                  <p className="mt-2 font-mono text-xs text-[var(--text-tertiary)]">
                    {project.note}
                  </p>
                )}
                <div className="mt-4">
                  <TagList tags={project.tags} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
