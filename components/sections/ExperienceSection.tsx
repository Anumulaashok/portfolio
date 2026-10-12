import { experience } from "@/content/profile";
import { RoleHighlights } from "@/components/ui/RoleHighlights";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      tabIndex={-1}
      aria-labelledby="experience-title"
      className="section-y gutter border-t border-line focus:outline-none"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <h2 id="experience-title" data-reveal className="display-lg text-ink lg:sticky lg:top-24 lg:self-start">
          Experience
        </h2>

        <ol className="relative border-l border-line">
          {experience.map((employer) =>
            employer.roles.map((role, i) => (
              <li key={`${employer.company}-${role.title}`} data-reveal className="relative pb-14 pl-8 last:pb-0 md:pl-10">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full border border-bg ${
                    role.period.includes("Present") ? "bg-accent" : "bg-muted"
                  }`}
                />
                <p className="text-[14px] text-muted">
                  <time>{role.period}</time>
                  {role.period.includes("Present") && <span className="ml-2 text-accent">· Current</span>}
                </p>
                <h3 className="mt-1 font-display text-[clamp(22px,2.4vw,30px)] font-semibold leading-tight tracking-tight text-ink">
                  {role.title}
                </h3>
                <p className="mt-1 text-[15px] text-ink">
                  {employer.company}
                  {i === 0 && <span className="text-muted"> · {employer.location}</span>}
                </p>
                <RoleHighlights highlights={role.highlights} />
              </li>
            ))
          )}
        </ol>
      </div>
    </section>
  );
}
