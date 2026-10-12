export function ChendaVasoolDiagram() {
  return (
    <svg
      viewBox="0 0 640 200"
      role="img"
      aria-labelledby="chenda-diagram-title chenda-diagram-desc"
      className="w-full"
    >
      <title id="chenda-diagram-title">Chenda Vasool architecture</title>
      <desc id="chenda-diagram-desc">
        A Flutter mobile app and a Next.js web app both call one NestJS and
        Prisma backend, backed by PostgreSQL, with role-based access per
        organization.
      </desc>
      <defs>
        <marker id="cv-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--text-secondary)" />
        </marker>
      </defs>

      <rect x="20" y="20" width="160" height="56" rx="4" fill="var(--surface)" stroke="var(--border)" />
      <text x="100" y="44" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="var(--text-primary)">Flutter app</text>
      <text x="100" y="62" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--text-tertiary)">collectors · Google Play</text>

      <rect x="20" y="110" width="160" height="56" rx="4" fill="var(--surface)" stroke="var(--border)" />
      <text x="100" y="134" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="var(--text-primary)">Next.js web</text>
      <text x="100" y="152" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--text-tertiary)">treasurers · Vercel</text>

      <rect x="260" y="65" width="180" height="56" rx="4" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
      <text x="350" y="89" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="var(--text-primary)">NestJS + Prisma</text>
      <text x="350" y="107" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--text-tertiary)">RBAC per org</text>

      <rect x="500" y="65" width="120" height="56" rx="4" fill="var(--surface)" stroke="var(--border)" />
      <text x="560" y="97" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="13" fill="var(--text-primary)">PostgreSQL</text>

      <line x1="180" y1="48" x2="258" y2="85" stroke="var(--text-secondary)" markerEnd="url(#cv-arrow)" />
      <line x1="180" y1="138" x2="258" y2="105" stroke="var(--text-secondary)" markerEnd="url(#cv-arrow)" />
      <line x1="440" y1="93" x2="498" y2="93" stroke="var(--text-secondary)" markerEnd="url(#cv-arrow)" />
    </svg>
  );
}
