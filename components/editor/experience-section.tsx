import { Plus, Trash2 } from "lucide-react";
import type { Experience } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import CustomInput from "@/components/ui/custom-input";
import { DatePickerInput } from "@/components/editor/date-picker-input";
import { Checkbox } from "@/components/ui/checkbox";
import { AchievementsEditor } from "@/components/editor/achievements-editor";
import { getTodayDateValue } from "@/lib/utils";

type Props = { experience: Experience[]; onChange: (experience: Experience[]) => void; title?: string };

export function ExperienceSection({ experience, onChange, title = "Experience" }: Props) {
  function updateItem(id: string, field: keyof Experience, value: string) {
    onChange(experience.map((item) => item.id === id ? { ...item, [field]: value } : item));
  }

  function addItem() {
    onChange([...experience, { id: crypto.randomUUID(), position: "", company: "", location: "", startDate: getTodayDateValue(), endDate: null, present: false, description: "", achievements: [] }]);
  }

  return (
    <div className="space-y-4">
      {experience.map((item, index) => (
        <section className="rounded-xl border bg-muted/20 p-4 sm:p-5" key={item.id}>
          <div className="mb-4 flex items-center justify-between"><h3 className="text-sm font-semibold">{title} {index + 1}</h3><Button type="button" variant="ghost" size="icon-sm" aria-label={`Remove ${title.toLowerCase()} ${index + 1}`} onClick={() => onChange(experience.filter((entry) => entry.id !== item.id))}><Trash2 className="text-muted-foreground" /></Button></div>
          <FieldGroup className="grid gap-4 sm:grid-cols-2">
            <CustomInput input={{ name: `experience-position-${item.id}`, label: "Job title", placeholder: "e.g. Software Engineer", type: "text" }} value={item.position} onChange={(event) => updateItem(item.id, "position", event.target.value)} />
            <CustomInput input={{ name: `experience-company-${item.id}`, label: "Company", placeholder: "Company name", type: "text" }} value={item.company} onChange={(event) => updateItem(item.id, "company", event.target.value)} />
            <CustomInput input={{ name: `experience-location-${item.id}`, label: "Location", placeholder: "City, Country", type: "text" }} value={item.location} onChange={(event) => updateItem(item.id, "location", event.target.value)} />
            <DatePickerInput id={`experience-start-${item.id}`} label="Start date" value={item.startDate} defaultToToday onChange={(startDate) => onChange(experience.map((entry) => entry.id === item.id ? { ...entry, startDate } : entry))} />
            <DatePickerInput id={`experience-end-${item.id}`} label="End date" value={item.endDate} defaultToToday disabled={item.present} onChange={(endDate) => onChange(experience.map((entry) => entry.id === item.id ? { ...entry, endDate } : entry))} />
            <Field orientation="horizontal" className="sm:col-span-2"><Checkbox id={`experience-present-${item.id}`} checked={item.present} onCheckedChange={(checked) => onChange(experience.map((entry) => entry.id === item.id ? { ...entry, present: checked === true, endDate: checked === true ? null : entry.endDate } : entry))} /><FieldLabel htmlFor={`experience-present-${item.id}`}>I currently work here</FieldLabel></Field>
            <Field className="sm:col-span-2"><FieldLabel htmlFor={`experience-description-${item.id}`}>Description</FieldLabel><Textarea id={`experience-description-${item.id}`} className="min-h-20" value={item.description ?? ""} onChange={(event) => updateItem(item.id, "description", event.target.value)} /></Field>
            <AchievementsEditor
              id={`experience-${item.id}`}
              achievements={item.achievements}
              onChange={(achievements) => onChange(experience.map((entry) => entry.id === item.id ? { ...entry, achievements } : entry))}
            />
          </FieldGroup>
        </section>
      ))}
      <Button type="button" variant="outline" onClick={addItem}><Plus />Add {title.toLowerCase()}</Button>
    </div>
  );
}
