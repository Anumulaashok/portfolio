"use client";

import { site } from "@/content/profile";
import { copyText } from "@/lib/theme";
import { useUi } from "@/components/providers/UiProvider";

export function CopyEmailButton({ className = "" }: { className?: string }) {
  const { toast } = useUi();
  return (
    <button
      type="button"
      onClick={async () => toast((await copyText(site.email)) ? "Email copied to clipboard" : `Copy failed — ${site.email}`)}
      className={`rounded-full border border-line px-3 py-1 text-[13px] text-muted transition-colors duration-200 ease-out hover:border-accent hover:text-ink ${className}`}
    >
      Copy<span className="sr-only"> email address</span>
    </button>
  );
}
