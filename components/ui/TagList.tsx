type TagListProps = {
  tags: readonly string[];
};

/** Tech tags in mono, small, low-contrast. */
export function TagList({ tags }: TagListProps) {
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
      {tags.map((tag) => (
        <li
          key={tag}
          className="font-mono text-xs text-[var(--text-tertiary)] before:mr-3 before:text-[var(--border)] before:content-['·'] first:before:content-none"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
