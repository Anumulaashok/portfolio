export function Divider({ className = "" }: { className?: string }) {
  return <hr className={`border-t border-[var(--border)] ${className}`} />;
}
