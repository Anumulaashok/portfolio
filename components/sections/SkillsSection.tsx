import { skillGroups } from "@/content/profile";
import { TagList } from "@/components/ui/TagList";

export function SkillsSection() {
  return (
    <section
      id="skills"
      tabIndex={-1}
      aria-labelledby="skills-title"
      className="section-y gutter border-t border-line focus:outline-none"
    >
      <h2 id="skills-title" data-reveal className="display-lg text-ink">
        Skills
      </h2>
      <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 xl:grid-cols-4">
        {skillGroups.map((group) => (
          <div key={group.title} data-reveal className="border-t border-line pt-6">
            <h3 className="text-[19px] font-semibold tracking-tight text-ink">{group.title}</h3>
            <TagList tags={group.skills} className="mt-5" />
          </div>
        ))}
      </div>
    </section>
  );
}
