import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { TagList } from "@/components/ui/TagList";
import { skillGroups } from "@/content/profile";

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding border-b border-[var(--border)] px-6">
      <div className="mx-auto max-w-6xl">
        <SectionLabel index="03" title="Skills" />

        <div className="grid gap-10 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <Reveal key={group.title}>
              <h3 className="font-mono text-xs uppercase tracking-wide text-[var(--text-tertiary)]">
                {group.title}
              </h3>
              <div className="mt-3">
                <TagList tags={group.skills} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
