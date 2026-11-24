import { Plus, Trash2 } from "lucide-react";
import type { Skill } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import CustomInput from "@/components/ui/custom-input";

type Props = { skills: Skill[]; onChange: (skills: Skill[]) => void };

export function SkillsSection({ skills, onChange }: Props) {
  function updateSkill(id: string, field: keyof Skill, value: string) {
    onChange(skills.map((skill) => skill.id === id ? { ...skill, [field]: value } : skill));
  }

  return (
    <div className="space-y-4">
      {skills.map((skill, index) => (
        <section className="rounded-xl border bg-muted/20 p-4 sm:p-5" key={skill.id}>
          <div className="mb-4 flex items-center justify-between"><h3 className="text-sm font-semibold">Skill group {index + 1}</h3><Button type="button" variant="ghost" size="icon-sm" aria-label={`Remove skill group ${index + 1}`} onClick={() => onChange(skills.filter((item) => item.id !== skill.id))}><Trash2 className="text-muted-foreground" /></Button></div>
          <FieldGroup className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <CustomInput input={{ name: `skill-category-${skill.id}`, label: "Category", placeholder: "e.g. Frontend", type: "text" }} value={skill.category} onChange={(event) => updateSkill(skill.id, "category", event.target.value)} />
            <CustomInput input={{ name: `skill-description-${skill.id}`, label: "Skills", placeholder: "React, TypeScript, teamwork", type: "text" }} value={skill.description} onChange={(event) => updateSkill(skill.id, "description", event.target.value)} />
          </FieldGroup>
        </section>
      ))}
      <Button type="button" variant="outline" onClick={() => onChange([...skills, { id: crypto.randomUUID(), category: "", description: "" }])}><Plus />Add skill group</Button>
    </div>
  );
}
