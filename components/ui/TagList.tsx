export function TagList({ tags, className = "" }: { tags: readonly string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[12px] leading-5 text-muted"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
