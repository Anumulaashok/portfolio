type SectionLabelProps = {
  index: string;
  title: string;
};

/** Mono section label, e.g. "01 — Selected work". */
export function SectionLabel({ index, title }: SectionLabelProps) {
  return (
    <div className="mb-10 flex items-baseline gap-3">
      <span className="font-mono text-sm text-[var(--accent)]">{index}</span>
      <h2 className="font-display text-h1 font-semibold text-[var(--text-primary)]">
        {title}
      </h2>
    </div>
  );
}
