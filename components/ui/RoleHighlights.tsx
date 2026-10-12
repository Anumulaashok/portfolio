"use client";

import { useId, useState } from "react";

const VISIBLE = 2;

export function RoleHighlights({ highlights }: { highlights: string[] }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const rest = highlights.slice(VISIBLE);

  return (
    <>
      <ul className="mt-4 space-y-3 text-[16px] text-muted">
        {highlights.slice(0, VISIBLE).map((item) => (
          <Item key={item} text={item} />
        ))}
      </ul>
      {rest.length > 0 && (
        <>
          <ul id={id} hidden={!open} className="mt-3 space-y-3 text-[16px] text-muted">
            {rest.map((item) => (
              <Item key={item} text={item} />
            ))}
          </ul>
          <button
            type="button"
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((v) => !v)}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-[14px] text-ink transition-colors duration-200 ease-out hover:border-accent"
          >
            {open ? "Hide details" : `Show details (${rest.length} more)`}
            <svg
              viewBox="0 0 12 12"
              width="12"
              height="12"
              aria-hidden="true"
              className={`transition-transform duration-200 ease-out ${open ? "rotate-180" : ""}`}
            >
              <path d="M2 4.5 6 8l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </>
      )}
    </>
  );
}

function Item({ text }: { text: string }) {
  return (
    <li className="prose-measure relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-muted">
      {text}
    </li>
  );
}
