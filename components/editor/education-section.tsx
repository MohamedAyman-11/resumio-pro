import { Plus, Trash2 } from "lucide-react";
import type { Education } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import CustomInput from "@/components/ui/custom-input";
import { DatePickerInput } from "@/components/editor/date-picker-input";
import { Checkbox } from "@/components/ui/checkbox";
import { AchievementsEditor } from "@/components/editor/achievements-editor";

type Props = { education: Education[]; onChange: (education: Education[]) => void };

export function EducationSection({ education, onChange }: Props) {
  function updateItem(id: string, field: keyof Education, value: string) {
    onChange(education.map((item) => item.id === id ? { ...item, [field]: value } : item));
  }

  function addItem() {
    onChange([...education, { id: crypto.randomUUID(), institution: "", degree: "", location: "", gpa: "", startDate: "", endDate: null, present: false, description: "", achievements: [] }]);
  }

  return (
    <div className="space-y-4">
      {education.map((item, index) => (
        <section className="rounded-xl border bg-muted/20 p-4 sm:p-5" key={item.id}>
          <div className="mb-4 flex items-center justify-between"><h3 className="text-sm font-semibold">Education {index + 1}</h3><Button type="button" variant="ghost" size="icon-sm" aria-label={`Remove education ${index + 1}`} onClick={() => onChange(education.filter((entry) => entry.id !== item.id))}><Trash2 className="text-muted-foreground" /></Button></div>
          <FieldGroup className="grid gap-4 sm:grid-cols-2">
            <CustomInput input={{ name: `education-institution-${item.id}`, label: "School or university", placeholder: "Institution name", type: "text" }} value={item.institution} onChange={(event) => updateItem(item.id, "institution", event.target.value)} />
            <CustomInput input={{ name: `education-degree-${item.id}`, label: "Degree", placeholder: "Degree or field of study", type: "text" }} value={item.degree} onChange={(event) => updateItem(item.id, "degree", event.target.value)} />
            <CustomInput input={{ name: `education-location-${item.id}`, label: "Location", placeholder: "City, Country", type: "text" }} value={item.location} onChange={(event) => updateItem(item.id, "location", event.target.value)} />
            <DatePickerInput id={`education-start-${item.id}`} label="Start date" value={item.startDate} onChange={(startDate) => onChange(education.map((entry) => entry.id === item.id ? { ...entry, startDate } : entry))} />
            <DatePickerInput id={`education-end-${item.id}`} label="End date" value={item.endDate} disabled={item.present} onChange={(endDate) => onChange(education.map((entry) => entry.id === item.id ? { ...entry, endDate } : entry))} />
            <Field orientation="horizontal" className="sm:col-span-2"><Checkbox id={`education-present-${item.id}`} checked={item.present} onCheckedChange={(checked) => onChange(education.map((entry) => entry.id === item.id ? { ...entry, present: checked === true, endDate: checked === true ? null : entry.endDate } : entry))} /><FieldLabel htmlFor={`education-present-${item.id}`}>I currently study here</FieldLabel></Field>
            <CustomInput input={{ name: `education-gpa-${item.id}`, label: "Grade (optional)", placeholder: "e.g. 3.8 / 4.0", type: "text" }} value={item.gpa} onChange={(event) => updateItem(item.id, "gpa", event.target.value)} />
            <Field className="sm:col-span-2"><FieldLabel htmlFor={`education-description-${item.id}`}>Details (optional)</FieldLabel><Textarea id={`education-description-${item.id}`} className="min-h-20" value={item.description ?? ""} onChange={(event) => updateItem(item.id, "description", event.target.value)} /></Field>
            <AchievementsEditor
              id={`education-${item.id}`}
              achievements={item.achievements}
              onChange={(achievements) => onChange(education.map((entry) => entry.id === item.id ? { ...entry, achievements } : entry))}
            />
          </FieldGroup>
        </section>
      ))}
      <Button type="button" variant="outline" onClick={addItem}><Plus />Add education</Button>
    </div>
  );
}
