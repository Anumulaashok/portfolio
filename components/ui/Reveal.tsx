import type { ReactNode } from "react";

/**
 * Deliberately not a scroll-triggered animation. An IntersectionObserver
 * + whileInView reveal was tried here and left content stuck at opacity:0
 * for real scrolled-into-view sections in testing (verified in a headless
 * browser: scrolled a section into view, waited, and it was still
 * invisible). Content visibility must never depend on animation timing on
 * a job-hunting portfolio, so this is a plain passthrough.
 */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return <div className={className}>{children}</div>;
}
