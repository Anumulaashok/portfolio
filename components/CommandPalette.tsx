"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { commands, type Command } from "@/content/commands";
import { copyText, toggleTheme } from "@/lib/theme";
import { useUi } from "@/components/providers/UiProvider";

export function CommandPalette({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useUi();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.group} ${c.hint ?? ""}`.toLowerCase().includes(q)
    );
  }, [query]);

  useEffect(() => {
    inputRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, listId]);

  const run = async (command: Command) => {
    if (command.kind === "copy") {
      const ok = await copyText(command.value);
      onClose();
      toast(ok ? command.toast : `Copy failed — ${command.value}`);
      return;
    }
    if (command.kind === "theme") {
      const next = toggleTheme();
      toast(`${next === "dark" ? "Dark" : "Light"} theme on`);
      return;
    }
    onClose();
    if (command.kind === "external") {
      if (command.href.startsWith("http")) window.open(command.href, "_blank", "noopener");
      else window.location.href = command.href;
      return;
    }
    const hash = command.href.split("#")[1];
    if (pathname === "/" && hash) {
      const target = document.getElementById(hash);
      window.history.replaceState(null, "", `#${hash}`);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
      target?.focus({ preventScroll: true });
    } else {
      router.push(command.href);
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape" || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k")) {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(Math.max(results.length - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const command = results[active];
      if (command) void run(command);
    } else if (e.key === "Tab") {
      // Single focus stop: keep focus trapped on the search input.
      e.preventDefault();
    }
  };

  let lastGroup = "";

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]">
      <div className="absolute inset-0 bg-bg/70" aria-hidden="true" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onKeyDown={onKeyDown}
        className="animate-fade-in relative w-full max-w-[560px] overflow-hidden rounded-block border border-line bg-surface shadow-soft"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <span aria-hidden="true" className="font-mono text-sm text-muted">
            ⌘K
          </span>
          <input
            ref={inputRef}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={results.length ? `${listId}-${active}` : undefined}
            aria-label="Search commands"
            placeholder="Jump to a section, copy email, open resume…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-14 w-full bg-transparent text-base text-ink placeholder:text-muted focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-line px-2 py-0.5 font-mono text-xs text-muted hover:text-ink"
          >
            Esc
          </button>
        </div>
        <ul id={listId} role="listbox" aria-label="Commands" className="max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <li role="presentation" className="px-3 py-6 text-center text-sm text-muted">
              No matching commands
            </li>
          )}
          {results.map((command, index) => {
            const showGroup = command.group !== lastGroup;
            lastGroup = command.group;
            return (
              <li key={command.id} role="presentation">
                {showGroup && (
                  <p aria-hidden="true" className="eyebrow px-3 pb-1 pt-3 text-[11px]">
                    {command.group}
                  </p>
                )}
                <div
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={index === active}
                  onMouseMove={() => setActive(index)}
                  onClick={() => void run(command)}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-[8px] px-3 py-2.5 text-[15px] ${
                    index === active ? "bg-bg text-ink" : "text-ink"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {index === active && (
                      <span aria-hidden="true" className="text-accent">
                        →
                      </span>
                    )}
                    {command.label}
                  </span>
                  {command.hint && <span className="truncate text-sm text-muted">{command.hint}</span>}
                </div>
              </li>
            );
          })}
        </ul>
        <p className="border-t border-line px-4 py-2 text-xs text-muted">
          <span aria-hidden="true">↑↓</span> to move · Enter to run · Esc to close
        </p>
      </div>
    </div>
  );
}
