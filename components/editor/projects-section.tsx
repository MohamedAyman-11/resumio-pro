import { Plus, Trash2 } from "lucide-react";
import type { Project } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import CustomInput from "@/components/ui/custom-input";
import { DatePickerInput } from "@/components/editor/date-picker-input";
import { Checkbox } from "@/components/ui/checkbox";
import { AchievementsEditor } from "@/components/editor/achievements-editor";
import { getTodayDateValue } from "@/lib/utils";

type Props = { projects: Project[]; onChange: (projects: Project[]) => void };

export function ProjectsSection({ projects, onChange }: Props) {
  function updateItem(id: string, field: keyof Project, value: string) {
    onChange(projects.map((item) => item.id === id ? { ...item, [field]: value } : item));
  }

  function addItem() {
    onChange([...projects, { id: crypto.randomUUID(), name: "", description: "", technologies: "", startDate: getTodayDateValue(), endDate: null, present: false, achievements: [] }]);
  }

  return (
    <div className="space-y-4">
      {projects.map((item, index) => (
        <section className="rounded-xl border bg-muted/20 p-4 sm:p-5" key={item.id}>
          <div className="mb-4 flex items-center justify-between"><h3 className="text-sm font-semibold">Project {index + 1}</h3><Button type="button" variant="ghost" size="icon-sm" aria-label={`Remove project ${index + 1}`} onClick={() => onChange(projects.filter((entry) => entry.id !== item.id))}><Trash2 className="text-muted-foreground" /></Button></div>
          <FieldGroup className="gap-4">
            <CustomInput input={{ name: `project-name-${item.id}`, label: "Project name", placeholder: "Project title", type: "text" }} value={item.name} onChange={(event) => updateItem(item.id, "name", event.target.value)} />
            <Field><FieldLabel htmlFor={`project-description-${item.id}`}>Description</FieldLabel><Textarea id={`project-description-${item.id}`} className="min-h-24" value={item.description} onChange={(event) => updateItem(item.id, "description", event.target.value)} /></Field>
            <CustomInput input={{ name: `project-technologies-${item.id}`, label: "Tools and technologies", placeholder: "React, TypeScript", type: "text" }} value={item.technologies} onChange={(event) => updateItem(item.id, "technologies", event.target.value)} />
            <DatePickerInput id={`project-start-${item.id}`} label="Start date" value={item.startDate} defaultToToday onChange={(startDate) => onChange(projects.map((entry) => entry.id === item.id ? { ...entry, startDate } : entry))} />
            <DatePickerInput id={`project-end-${item.id}`} label="End date" value={item.endDate} defaultToToday disabled={item.present} onChange={(endDate) => onChange(projects.map((entry) => entry.id === item.id ? { ...entry, endDate } : entry))} />
            <Field orientation="horizontal"><Checkbox id={`project-present-${item.id}`} checked={item.present} onCheckedChange={(checked) => onChange(projects.map((entry) => entry.id === item.id ? { ...entry, present: checked === true, endDate: checked === true ? null : entry.endDate } : entry))} /><FieldLabel htmlFor={`project-present-${item.id}`}>Ongoing project</FieldLabel></Field>
            <AchievementsEditor
              id={`project-${item.id}`}
              achievements={item.achievements}
              onChange={(achievements) => onChange(projects.map((entry) => entry.id === item.id ? { ...entry, achievements } : entry))}
            />
          </FieldGroup>
        </section>
      ))}
      <Button type="button" variant="outline" onClick={addItem}><Plus />Add project</Button>
    </div>
  );
}
