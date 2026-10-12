import { about, certificates, education } from "@/content/profile";

export function AboutSection() {
  return (
    <section
      id="about"
      tabIndex={-1}
      aria-labelledby="about-title"
      className="section-y gutter border-t border-line focus:outline-none"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
        <h2 id="about-title" data-reveal className="display-lg text-ink">
          About
        </h2>
        <div>
          <div data-reveal className="prose-measure space-y-5 text-[clamp(18px,1.6vw,21px)] leading-relaxed text-ink">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-[2fr_1fr]">
            <div data-reveal>
              <h3 className="eyebrow">Education</h3>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {education.map((item) => (
                  <li key={item.program} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                    <div>
                      <p className="text-[16px] font-medium text-ink">{item.program}</p>
                      <p className="text-[14px] text-muted">{item.school}</p>
                    </div>
                    <p className="text-[14px] text-muted">
                      {item.period}
                      {item.inProgress && <span className="ml-2 text-accent">· In progress</span>}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div data-reveal>
              <h3 className="eyebrow">Certification</h3>
              <ul className="mt-4 border-t border-line">
                {certificates.map((cert) => (
                  <li key={cert.name} className="py-4">
                    <p className="text-[16px] font-medium text-ink">{cert.name}</p>
                    <p className="text-[14px] text-muted">{cert.issuer}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
