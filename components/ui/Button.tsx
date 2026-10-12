import type { AnchorHTMLAttributes } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary" | "link";
};

export function Button({
  variant = "secondary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 font-mono text-sm transition-colors duration-150";
  const styles = {
    primary:
      "rounded-[var(--radius-sm)] bg-[var(--accent)] px-5 py-2.5 text-[var(--accent-ink)] hover:opacity-90",
    secondary:
      "rounded-[var(--radius-sm)] border border-[var(--border)] px-5 py-2.5 text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
    link: "text-[var(--accent)] underline underline-offset-4 hover:opacity-80",
  } as const;

  return (
    <a className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}
