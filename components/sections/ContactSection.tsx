import { contact, resume, site } from "@/content/profile";
import { ContactForm } from "@/components/ui/ContactForm";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { Button } from "@/components/ui/Button";

const newTab = { target: "_blank", rel: "noopener" } as const;

export function ContactSection() {
  return (
    <section
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-title"
      className="section-y gutter border-t border-line focus:outline-none"
    >
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-20">
        <div data-reveal>
          <h2 id="contact-title" className="display-lg text-ink">
            {contact.heading}
          </h2>
          <p className="mt-5 max-w-[40ch] text-[17px] text-muted">{contact.intro}</p>

          <dl className="mt-10 divide-y divide-line border-y border-line text-[16px]">
            <Row label="Email">
              <a href={`mailto:${site.email}`} className="break-all text-ink underline decoration-line underline-offset-[6px] hover:text-accent hover:decoration-accent">
                {site.email}
              </a>
              <CopyEmailButton className="ml-3" />
            </Row>
            <Row label="Phone">
              <a href={site.phoneHref} className="text-ink underline decoration-line underline-offset-[6px] hover:text-accent hover:decoration-accent">
                {site.phoneDisplay}
              </a>
            </Row>
            <Row label="Profiles">
              <a href={site.linkedin} {...newTab} className="text-ink underline decoration-line underline-offset-[6px] hover:text-accent hover:decoration-accent">
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
              <span aria-hidden="true" className="mx-2 text-muted">·</span>
              <a href={site.github} {...newTab} className="text-ink underline decoration-line underline-offset-[6px] hover:text-accent hover:decoration-accent">
                GitHub<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </Row>
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button variant="solid" href={resume.viewUrl} {...newTab}>
              View resume ↗<span className="sr-only"> (opens in a new tab)</span>
            </Button>
            <Button variant="outline" href={resume.downloadUrl} rel="noopener">
              Download resume
            </Button>
          </div>
        </div>

        <div data-reveal>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-1 py-4">
      <dt className="w-20 shrink-0 text-[14px] text-muted">{label}</dt>
      <dd className="flex flex-wrap items-center">{children}</dd>
    </div>
  );
}
