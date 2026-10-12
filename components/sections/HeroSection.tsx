import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { MetricStat } from "@/components/ui/MetricStat";
import { hero, site } from "@/content/profile";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="section-padding border-b border-[var(--border)] px-6"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
        <div>
          <p className="font-mono text-sm uppercase tracking-wide text-[var(--accent)]">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-display font-semibold text-[var(--text-primary)]">
            {hero.name}
          </h1>
          <p className="prose-measure mt-6 text-lg text-[var(--text-secondary)]">
            {hero.supportingLine}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              href={site.resumeFile}
              target="_blank"
              rel="noreferrer"
            >
              Download resume
            </Button>
            <Button variant="secondary" href="#work">
              View case studies
            </Button>
            <Button variant="link" href={`mailto:${site.email}`}>
              {site.email}
            </Button>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {hero.proofRow.map((stat) => (
              <MetricStat key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="h-40 w-40 overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] lg:h-48 lg:w-48">
            <Image
              src="/profile.jpg"
              alt="Anumula Ashok, Generative AI engineer and backend developer"
              width={480}
              height={480}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
