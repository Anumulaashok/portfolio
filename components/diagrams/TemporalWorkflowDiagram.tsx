export function TemporalWorkflowDiagram() {
  return (
    <svg
      viewBox="0 0 640 240"
      role="img"
      aria-labelledby="temporal-diagram-title temporal-diagram-desc"
      className="w-full"
    >
      <title id="temporal-diagram-title">Temporal workflow platform architecture</title>
      <desc id="temporal-diagram-desc">
        A Temporal workflow orchestrates calls to Stripe, Stedi EDI and an
        EHR system, with retries and idempotency on each step, reading
        tenant configuration from multi-tenant PostgreSQL, running on
        Kubernetes.
      </desc>
      <defs>
        <marker id="tw-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--muted)" />
        </marker>
      </defs>

      <rect x="230" y="20" width="180" height="56" rx="8" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="320" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="var(--ink)">
        Temporal workflow
      </text>
      <text x="320" y="62" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--muted)">
        retries · idempotency · concurrency
      </text>

      {[
        { x: 20, y: 130, label: "Stripe" },
        { x: 170, y: 130, label: "Stedi EDI" },
        { x: 320, y: 130, label: "EHR sync" },
        { x: 470, y: 130, label: "RPA" },
      ].map((box) => (
        <g key={box.label}>
          <rect x={box.x} y={box.y} width="120" height="48" rx="8" fill="var(--bg)" stroke="var(--muted)" />
          <text x={box.x + 60} y={box.y + 29} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="12" fill="var(--ink)">
            {box.label}
          </text>
          <line x1={box.x + 60} y1="128" x2="320" y2="78" stroke="var(--muted)" markerEnd="url(#tw-arrow)" />
        </g>
      ))}

      <rect x="150" y="200" width="340" height="30" rx="8" fill="var(--bg)" stroke="var(--muted)" />
      <text x="320" y="219" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="11" fill="var(--muted)">
        multi-tenant PostgreSQL · Kubernetes (GKE)
      </text>
      <line x1="320" y1="76" x2="320" y2="198" stroke="var(--muted)" markerEnd="url(#tw-arrow)" />
    </svg>
  );
}
