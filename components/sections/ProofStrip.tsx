import { proof } from "@/content/profile";

export function ProofStrip() {
  return (
    <section aria-label="Highlights" className="gutter border-b border-line py-16 md:py-20">
      <ul className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
        {proof.map((item) => (
          <li key={item.label} data-reveal>
            <p className="font-display text-[clamp(44px,6vw,80px)] font-semibold leading-none tracking-[-0.04em] text-ink">
              {item.value}
              {item.unit && <span className="ml-1 text-[0.42em] font-medium tracking-tight text-accent">{item.unit}</span>}
            </p>
            <p className="mt-3 max-w-[22ch] text-[14px] leading-snug text-muted">{item.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
