import { Plus, Trash2 } from "lucide-react";
import type { Volunteering } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import CustomInput from "@/components/ui/custom-input";
import { DatePickerInput } from "@/components/editor/date-picker-input";
import { AchievementsEditor } from "@/components/editor/achievements-editor";
import { getTodayDateValue } from "@/lib/utils";

export function VolunteeringSection({ items, onChange }: { items: Volunteering[]; onChange: (items: Volunteering[]) => void }) {
  function update(id: string, field: keyof Volunteering, value: string) {
    onChange(items.map((item) => item.id === id ? { ...item, [field]: value } : item));
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => <section className="rounded-xl border bg-muted/20 p-4 sm:p-5" key={item.id}>
        <div className="mb-4 flex items-center justify-between"><h3 className="text-sm font-semibold">Volunteer role {index + 1}</h3><Button type="button" variant="ghost" size="icon-sm" aria-label={`Remove volunteer role ${index + 1}`} onClick={() => onChange(items.filter(({ id }) => id !== item.id))}><Trash2 className="text-muted-foreground" /></Button></div>
        <FieldGroup className="grid gap-4 sm:grid-cols-2">
          <CustomInput input={{ name: `vol-org-${item.id}`, label: "Organization", placeholder: "Organization name", type: "text" }} value={item.organization} onChange={(event) => update(item.id, "organization", event.target.value)} />
          <CustomInput input={{ name: `vol-position-${item.id}`, label: "Role", placeholder: "Your role", type: "text" }} value={item.position} onChange={(event) => update(item.id, "position", event.target.value)} />
          <CustomInput input={{ name: `vol-location-${item.id}`, label: "Location", placeholder: "City, Country", type: "text" }} value={item.location} onChange={(event) => update(item.id, "location", event.target.value)} />
          <CustomInput input={{ name: `vol-website-${item.id}`, label: "Organization website", placeholder: "https://", type: "text" }} type="url" value={item.organizationWebsite ?? ""} onChange={(event) => update(item.id, "organizationWebsite", event.target.value)} />
          <DatePickerInput id={`vol-start-${item.id}`} label="Start date" value={item.startDate} defaultToToday onChange={(startDate) => update(item.id, "startDate", startDate)} />
          <DatePickerInput id={`vol-end-${item.id}`} label="End date" value={item.endDate} defaultToToday disabled={item.present} onChange={(endDate) => onChange(items.map((entry) => entry.id === item.id ? { ...entry, endDate } : entry))} />
          <Field orientation="horizontal" className="sm:col-span-2"><Checkbox id={`vol-present-${item.id}`} checked={item.present} onCheckedChange={(checked) => onChange(items.map((entry) => entry.id === item.id ? { ...entry, present: checked === true, endDate: checked === true ? null : entry.endDate } : entry))} /><FieldLabel htmlFor={`vol-present-${item.id}`}>I currently volunteer here</FieldLabel></Field>
          <Field className="sm:col-span-2"><FieldLabel htmlFor={`vol-description-${item.id}`}>Description</FieldLabel><Textarea id={`vol-description-${item.id}`} value={item.description ?? ""} onChange={(event) => update(item.id, "description", event.target.value)} /></Field>
          <AchievementsEditor
            id={`volunteering-${item.id}`}
            achievements={item.achievements}
            onChange={(achievements) => onChange(items.map((entry) => entry.id === item.id ? { ...entry, achievements } : entry))}
          />
        </FieldGroup>
      </section>)}
      <Button type="button" variant="outline" onClick={() => onChange([...items, { id: crypto.randomUUID(), organization: "", position: "", location: "", startDate: getTodayDateValue(), endDate: null, present: false, achievements: [] }])}><Plus />Add volunteering</Button>
    </div>
  );
}
