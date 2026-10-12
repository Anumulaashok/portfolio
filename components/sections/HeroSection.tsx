import { hero, resume, site } from "@/content/profile";
import { FieldPoster } from "@/components/hero/FieldPoster";
import { EmbeddingField } from "@/components/hero/EmbeddingField";

export function HeroSection() {
  return (
    <section
      id="top"
      data-hero
      aria-label="Introduction"
      className="group/hero relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 transition-opacity duration-700 ease-out group-data-[field=live]/hero:opacity-0">
          <FieldPoster />
        </div>
        <EmbeddingField />
        <div aria-hidden="true" className="hero-scrim absolute inset-0" />
      </div>

      <div className="gutter flex flex-1 flex-col justify-between pb-10 pt-[88px] md:pb-14 md:pt-[104px]">
        <div>
          <h1 className="wordmark uppercase text-ink">{site.name}</h1>
          <div className="mt-8 max-w-[280px] space-y-2 text-[14px] leading-[1.55] text-ink">
            {hero.intro.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p className="display-xl text-ink">
            <span className="block">{hero.headlineSans}</span>
            <span className="block font-serif text-[1.08em] font-normal italic tracking-[-0.01em]">
              {hero.headlineSerif}
            </span>
          </p>
          <div className="flex shrink-0 flex-wrap items-center gap-6">
            <a
              href={hero.primaryCta.href}
              className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 text-[15px] font-medium text-ink transition-colors duration-200 ease-out hover:border-accent hover:text-accent"
            >
              {hero.primaryCta.label}
              <span aria-hidden="true">↗</span>
            </a>
            <a
              href={resume.viewUrl}
              target="_blank"
              rel="noopener"
              className="text-[15px] text-ink underline decoration-muted underline-offset-[6px] transition-colors duration-200 ease-out hover:text-accent hover:decoration-accent"
            >
              {hero.secondaryCta.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
