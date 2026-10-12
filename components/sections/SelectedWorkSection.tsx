import Link from "next/link";
import { caseStudies, otherProjects } from "@/content/projects";
import { diagrams } from "@/components/diagrams";
import { TagList } from "@/components/ui/TagList";

export function SelectedWorkSection() {
  return (
    <section id="work" tabIndex={-1} aria-labelledby="work-title" className="section-y gutter focus:outline-none">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="work-title" data-reveal className="display-lg text-ink">
          Selected work
        </h2>
        <p data-reveal className="max-w-[36ch] text-[15px] text-muted">
          Architecture-level case studies. Company work is described without proprietary code or client names.
        </p>
      </div>

      <ol className="mt-14 border-t border-line">
        {caseStudies.map((study) => {
          const Diagram = diagrams[study.diagram];
          return (
            <li
              key={study.slug}
              data-reveal
              className="group relative grid gap-8 border-b border-line py-10 transition-colors duration-200 ease-out hover:bg-surface/40 md:py-14 lg:grid-cols-[1.15fr_1fr] lg:gap-14"
            >
              <div>
                <p className="eyebrow">{study.company}</p>
                <h3 className="display-lg mt-3 text-ink transition-colors duration-200 ease-out group-hover:text-accent">
                  <Link
                    href={`/work/${study.slug}`}
                    className="after:absolute after:inset-0 after:content-[''] focus:outline-none"
                  >
                    {study.shortTitle}
                  </Link>
                </h3>
                <div
                  aria-hidden="true"
                  className="mt-8 max-w-[520px] rounded-block border border-line bg-surface p-4 transition-opacity duration-200 ease-out lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100"
                >
                  <Diagram />
                </div>
              </div>

              <div className="grid content-start gap-6">
                <dl className="grid gap-6 text-[15px]">
                  <div>
                    <dt className="eyebrow">Problem</dt>
                    <dd className="mt-2 text-ink">{study.rowProblem}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Outcome</dt>
                    <dd className="mt-2 font-display text-[22px] font-semibold leading-snug tracking-tight text-accent">
                      {study.rowOutcome}
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Stack</dt>
                    <dd className="mt-3">
                      <TagList tags={study.stack} />
                    </dd>
                  </div>
                </dl>
                <p aria-hidden="true" className="text-[14px] text-muted transition-colors duration-200 ease-out group-hover:text-ink">
                  Read case study →
                </p>
              </div>
              <span className="pointer-events-none absolute inset-0 rounded-block ring-accent group-has-[:focus-visible]:ring-2" />
            </li>
          );
        })}
      </ol>

      <h3 data-reveal className="display-md mt-24 text-ink">
        Other engineering work
      </h3>
      <ul className="mt-8 grid gap-x-14 border-t border-line md:grid-cols-2">
        {otherProjects.map((project) => (
          <li key={project.title} data-reveal className="border-b border-line py-8">
            <h4 className="text-[19px] font-semibold tracking-tight text-ink">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener"
                  className="underline decoration-line underline-offset-[6px] transition-colors duration-200 ease-out hover:text-accent hover:decoration-accent"
                >
                  {project.title} ↗<span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                project.title
              )}
            </h4>
            <p className="prose-measure mt-3 text-[15px] text-muted">{project.description}</p>
            {project.note && <p className="mt-3 text-[14px] text-ink">{project.note}</p>}
            <TagList tags={project.tags} className="mt-4" />
          </li>
        ))}
      </ul>
    </section>
  );
}
