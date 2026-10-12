import type { AnchorHTMLAttributes } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "solid" | "outline" | "text";
};

const styles = {
  solid:
    "rounded-full bg-accent px-5 py-2.5 text-accent-ink hover:opacity-90",
  outline:
    "rounded-full border border-ink/60 px-5 py-2.5 text-ink hover:border-accent hover:text-accent",
  text: "text-ink underline decoration-line underline-offset-[6px] hover:text-accent hover:decoration-accent",
} as const;

export function Button({ variant = "outline", className = "", children, ...props }: ButtonProps) {
  return (
    <a
      className={`inline-flex items-center gap-2 text-[15px] font-medium transition-colors duration-200 ease-out ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
