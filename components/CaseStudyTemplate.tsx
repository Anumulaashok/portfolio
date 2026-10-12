import Link from "next/link";
import type { CaseStudy } from "@/content/profile";
import { TagList } from "@/components/ui/TagList";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { RagAgentDiagram } from "@/components/diagrams/RagAgentDiagram";
import { TemporalWorkflowDiagram } from "@/components/diagrams/TemporalWorkflowDiagram";
import { ChendaVasoolDiagram } from "@/components/diagrams/ChendaVasoolDiagram";

const diagrams = {
  ragAgent: RagAgentDiagram,
  temporalWorkflow: TemporalWorkflowDiagram,
  chendaVasool: ChendaVasoolDiagram,
};

export function CaseStudyTemplate({ study }: { study: CaseStudy }) {
  const Diagram = diagrams[study.diagram];

  return (
    <article className="section-padding px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/#work"
          className="font-mono text-sm text-[var(--text-secondary)] hover:text-[var(--accent)]"
        >
          ← Back to selected work
        </Link>

        <p className="mt-8 font-mono text-sm uppercase tracking-wide text-[var(--accent)]">
          {study.company}
        </p>
        <h1 className="mt-3 font-display text-h1 font-semibold text-[var(--text-primary)]">
          {study.title}
        </h1>
        <p className="prose-measure mt-4 text-lg text-[var(--text-secondary)]">
          {study.summary}
        </p>

        {(study.liveUrl || study.storeUrl) && (
          <div className="mt-6">
            <div className="flex flex-wrap gap-3">
              {study.liveUrl && (
                <Button variant="secondary" href={study.liveUrl} target="_blank" rel="noreferrer">
                  Live site
                </Button>
              )}
              {study.storeUrl && (
                <Button variant="secondary" href={study.storeUrl} target="_blank" rel="noreferrer">
                  {study.storeLabel ?? "Google Play"}
                </Button>
              )}
            </div>
            {study.storeNote && (
              <p className="mt-2 font-mono text-xs text-[var(--text-tertiary)]">
                {study.storeNote}
              </p>
            )}
          </div>
        )}

        <Divider className="my-10" />

        <Section title="Context">{study.context}</Section>
        <Section title="Problem">{study.problem}</Section>
        <Section title="My role">{study.role}</Section>

        <h2 className="mt-10 font-display text-h2 font-semibold text-[var(--text-primary)]">
          Architecture
        </h2>
        <div className="prose-measure mt-4 overflow-x-auto rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-6">
          <Diagram />
        </div>
        <p className="prose-measure mt-4 text-[var(--text-secondary)]">{study.architecture}</p>

        <h2 className="mt-10 font-display text-h2 font-semibold text-[var(--text-primary)]">
          Key decisions &amp; trade-offs
        </h2>
        <ul className="prose-measure mt-4 space-y-3 border-l-2 border-[var(--border)] pl-6 text-[var(--text-secondary)]">
          {study.decisions.map((d) => (
            <li key={d.slice(0, 40)}>{d}</li>
          ))}
        </ul>

        <h2 className="mt-10 font-display text-h2 font-semibold text-[var(--text-primary)]">
          Results
        </h2>
        <ul className="prose-measure mt-4 space-y-3 border-l-2 border-[var(--accent)] pl-6 text-[var(--text-secondary)]">
          {study.results.map((r) => (
            <li key={r.slice(0, 40)}>{r}</li>
          ))}
        </ul>

        <h2 className="mt-10 font-display text-h2 font-semibold text-[var(--text-primary)]">
          Stack
        </h2>
        <div className="mt-4">
          <TagList tags={study.stack} />
        </div>

        <h2 className="mt-10 font-display text-h2 font-semibold text-[var(--text-primary)]">
          What I&apos;d do next
        </h2>
        <p className="prose-measure mt-4 text-[var(--text-secondary)]">{study.nextSteps}</p>
      </div>
    </article>
  );
}

function Section({ title, children }: { title: string; children: string }) {
  return (
    <div className="mt-8 first:mt-0">
      <h2 className="font-display text-h2 font-semibold text-[var(--text-primary)]">
        {title}
      </h2>
      <p className="prose-measure mt-3 text-[var(--text-secondary)]">{children}</p>
    </div>
  );
}
