import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { experience } from "@/content/profile";

export function ExperienceSection() {
  return (
    <section id="experience" className="section-padding border-b border-[var(--border)] px-6">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="02" title="Experience" />

        <div className="space-y-16">
          {experience.map((employer) => (
            <div key={employer.company} className="grid gap-6 md:grid-cols-[220px_1fr] md:gap-12">
              <div>
                <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                  {employer.company}
                </h3>
                <p className="mt-1 font-mono text-xs text-[var(--text-tertiary)]">
                  {employer.location}
                </p>
              </div>

              <div className="space-y-10">
                {employer.roles.map((role) => (
                  <Reveal key={role.title}>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h4 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                          {role.title}
                        </h4>
                        <span className="font-mono text-xs text-[var(--accent)]">
                          {role.period}
                        </span>
                      </div>
                      <ul className="mt-4 space-y-3 border-l border-[var(--border)] pl-5 text-[var(--text-secondary)]">
                        {role.highlights.map((item) => (
                          <li key={item.slice(0, 48)}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
