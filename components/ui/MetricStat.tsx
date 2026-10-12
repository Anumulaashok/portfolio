type MetricStatProps = {
  value: string;
  label: string;
};

/** A prominent number with a label — not a card. */
export function MetricStat({ value, label }: MetricStatProps) {
  return (
    <div className="border-l border-[var(--border)] pl-4">
      <p className="font-display text-3xl font-semibold text-[var(--text-primary)] md:text-4xl">
        {value}
      </p>
      <p className="mt-1 font-mono text-xs uppercase tracking-wide text-[var(--text-tertiary)]">
        {label}
      </p>
    </div>
  );
}
