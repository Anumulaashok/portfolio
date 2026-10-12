import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { education, certificates } from "@/content/profile";

export function EducationSection() {
  return (
    <section id="education" className="section-padding border-b border-[var(--border)] px-6">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="04" title="Education" />

        <div className="space-y-6">
          {education.map((item) => (
            <Reveal key={item.school}>
              <div className="grid gap-1 border-b border-[var(--border)] pb-6 md:grid-cols-[220px_1fr_auto] md:items-baseline md:gap-6">
                <h3 className="font-display text-lg font-semibold text-[var(--text-primary)]">
                  {item.school}
                </h3>
                <p className="text-[var(--text-secondary)]">
                  {item.program}
                  {item.inProgress && (
                    <span className="ml-2 font-mono text-xs text-[var(--accent)]">
                      in progress
                    </span>
                  )}
                </p>
                <p className="font-mono text-xs text-[var(--text-tertiary)]">
                  {item.period} · {item.location}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {certificates.length > 0 && (
          <div className="mt-10">
            <h3 className="font-mono text-xs uppercase tracking-wide text-[var(--text-tertiary)]">
              Certificates
            </h3>
            <ul className="mt-3 space-y-1">
              {certificates.map((cert) => (
                <li key={cert.name} className="text-sm text-[var(--text-secondary)]">
                  {cert.issuer} · {cert.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
