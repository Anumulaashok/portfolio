import { footer, resume, site } from "@/content/profile";

const external = { target: "_blank", rel: "noopener" } as const;

export function Footer() {
  const links = [
    { label: site.email, href: `mailto:${site.email}` },
    { label: site.phoneDisplay, href: site.phoneHref },
    { label: "Resume", href: resume.viewUrl, ...external },
    { label: "LinkedIn", href: site.linkedin, ...external },
    { label: "GitHub", href: site.github, ...external },
  ];

  return (
    <footer className="gutter border-t border-line pb-10 pt-24 md:pt-32">
      <p data-reveal className="display-xl max-w-[14ch] text-ink">
        {footer.line}
        <span className="text-accent">.</span>
      </p>
      <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
        {links.map(({ label, ...rest }) => (
          <li key={label}>
            <a {...rest} className="text-ink underline decoration-line underline-offset-[6px] transition-colors duration-200 ease-out hover:text-accent hover:decoration-accent">
              {label}
              {"target" in rest && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-16 text-[13px] text-muted">
        © {new Date().getFullYear()} {site.name} · {site.location}
      </p>
    </footer>
  );
}
