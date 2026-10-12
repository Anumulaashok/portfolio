import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/profile";

export function ContactSection() {
  return (
    <section id="contact" className="section-padding px-6 pb-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="05" title="Contact" />

        <p className="prose-measure text-lg text-[var(--text-secondary)]">
          Open to Generative AI Engineer and AI-focused backend roles. The
          fastest way to reach me is email.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button variant="primary" href={`mailto:${site.email}`}>
            {site.email}
          </Button>
          <Button variant="secondary" href={site.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </Button>
          <Button variant="secondary" href={site.github} target="_blank" rel="noreferrer">
            GitHub
          </Button>
          <Button variant="secondary" href={site.resumeFile} target="_blank" rel="noreferrer">
            Download resume
          </Button>
        </div>

        <p className="mt-16 font-mono text-xs text-[var(--text-tertiary)]">
          © {new Date().getFullYear()} {site.name}. {site.location}.
        </p>
      </div>
    </section>
  );
}
