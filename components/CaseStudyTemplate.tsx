import Link from "next/link";
import type { CaseStudy } from "@/content/projects";
import { diagrams } from "@/components/diagrams";
import { TagList } from "@/components/ui/TagList";
import { Button } from "@/components/ui/Button";

export function CaseStudyTemplate({ study, next }: { study: CaseStudy; next: CaseStudy }) {
  const Diagram = diagrams[study.diagram];

  return (
    <article className="gutter pb-24 pt-[120px] md:pt-[152px]">
      <Link href="/#work" className="text-[14px] text-muted transition-colors duration-200 ease-out hover:text-ink">
        ← All work
      </Link>

      <header className="mt-10 max-w-[1100px]">
        <p className="eyebrow">{study.company}</p>
        <h1 className="display-xl mt-4 text-ink">{study.title}</h1>
        <p className="prose-measure mt-6 text-[clamp(18px,1.6vw,21px)] text-muted">{study.summary}</p>

        {(study.liveUrl || study.betaUrl) && (
          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-3">
              {study.liveUrl && (
                <Button variant="solid" href={study.liveUrl} target="_blank" rel="noopener">
                  {study.liveLabel ?? "Visit site"} ↗<span className="sr-only"> (opens in a new tab)</span>
                </Button>
              )}
              {study.betaUrl && (
                <Button variant="outline" href={study.betaUrl} target="_blank" rel="noopener">
                  {study.betaLabel} ↗<span className="sr-only"> (opens in a new tab)</span>
                </Button>
              )}
            </div>
            {study.betaNote && <p className="mt-3 text-[14px] text-muted">{study.betaNote}</p>}
          </div>
        )}
      </header>

      <div className="mt-16 flex flex-col gap-14 border-t border-line pt-14">
        <Block title="Context">
          <p>{study.context}</p>
        </Block>
        <Block title="Problem">
          <p>{study.problem}</p>
        </Block>
        <Block title="My role">
          <p>{study.role}</p>
        </Block>
        <Block title="Architecture">
          <figure>
            <div className="overflow-x-auto rounded-block border border-line bg-surface p-5 md:p-8">
              <div className="min-w-[560px]">
                <Diagram />
              </div>
            </div>
            <figcaption className="mt-5">{study.architecture}</figcaption>
          </figure>
        </Block>
        <Block title="Key decisions & trade-offs">
          <ul className="space-y-4">
            {study.decisions.map((d) => (
              <li key={d} className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-muted">
                {d}
              </li>
            ))}
          </ul>
        </Block>
        <Block title="Results">
          <ul className="space-y-4">
            {study.results.map((r) => (
              <li key={r} className="relative pl-5 text-ink before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-accent">
                {r}
              </li>
            ))}
          </ul>
        </Block>
        <Block title="Stack">
          <TagList tags={study.stack} />
        </Block>
        <Block title="What I'd do next">
          <p>{study.nextSteps}</p>
        </Block>
      </div>

      <nav aria-label="Next case study" className="mt-24 border-t border-line pt-10">
        <p className="eyebrow">Next case study</p>
        <Link
          href={`/work/${next.slug}`}
          className="display-lg mt-3 inline-block text-ink transition-colors duration-200 ease-out hover:text-accent"
        >
          {next.shortTitle} →
        </Link>
      </nav>
    </article>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section data-reveal className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
      <h2 className="text-[19px] font-semibold tracking-tight text-ink">{title}</h2>
      <div className="prose-measure text-[17px] text-muted">{children}</div>
    </section>
  );
}
