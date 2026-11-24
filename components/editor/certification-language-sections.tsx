import { Plus, Trash2 } from "lucide-react";
import type { Certification, Language, LanguageLevel } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import CustomInput from "@/components/ui/custom-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerInput } from "@/components/editor/date-picker-input";

const languageLevels: LanguageLevel[] = ["Beginner", "Intermediate", "Advanced", "Fluent", "Native"];

export function CertificationSection({ certifications, onChange }: { certifications: Certification[]; onChange: (certifications: Certification[]) => void }) {
  return (
    <div className="space-y-4">
      {certifications.map((item, index) => <section className="rounded-xl border bg-muted/20 p-4 sm:p-5" key={item.id}>
        <div className="mb-4 flex items-center justify-between"><h3 className="text-sm font-semibold">Certification {index + 1}</h3><Button type="button" variant="ghost" size="icon-sm" aria-label={`Remove certification ${index + 1}`} onClick={() => onChange(certifications.filter(({ id }) => id !== item.id))}><Trash2 className="text-muted-foreground" /></Button></div>
        <FieldGroup className="grid gap-4 sm:grid-cols-2">
          <CustomInput input={{ name: `cert-title-${item.id}`, label: "Certificate name", placeholder: "Certificate title", type: "text" }} value={item.title} onChange={(event) => onChange(certifications.map((entry) => entry.id === item.id ? { ...entry, title: event.target.value } : entry))} />
          <CustomInput input={{ name: `cert-issuer-${item.id}`, label: "Issuing organization", placeholder: "Organization", type: "text" }} value={item.issuer} onChange={(event) => onChange(certifications.map((entry) => entry.id === item.id ? { ...entry, issuer: event.target.value } : entry))} />
          <DatePickerInput id={`cert-date-${item.id}`} label="Issue date" value={item.issueDate} onChange={(issueDate) => onChange(certifications.map((entry) => entry.id === item.id ? { ...entry, issueDate } : entry))} />
          <CustomInput input={{ name: `cert-url-${item.id}`, label: "Credential URL", placeholder: "https://", type: "text" }} type="url" value={item.url ?? ""} onChange={(event) => onChange(certifications.map((entry) => entry.id === item.id ? { ...entry, url: event.target.value } : entry))} />
          <Field className="sm:col-span-2"><FieldLabel htmlFor={`cert-description-${item.id}`}>Description (optional)</FieldLabel><Textarea id={`cert-description-${item.id}`} value={item.description ?? ""} onChange={(event) => onChange(certifications.map((entry) => entry.id === item.id ? { ...entry, description: event.target.value } : entry))} /></Field>
        </FieldGroup>
      </section>)}
      <Button type="button" variant="outline" onClick={() => onChange([...certifications, { id: crypto.randomUUID(), title: "", issuer: "", issueDate: "" }])}><Plus />Add certification</Button>
    </div>
  );
}

export function LanguageSection({ languages, onChange }: { languages: Language[]; onChange: (languages: Language[]) => void }) {
  return (
    <div className="space-y-4">
      {languages.map((item, index) => <section className="rounded-xl border bg-muted/20 p-4 sm:p-5" key={item.id}>
        <div className="mb-4 flex items-center justify-between"><h3 className="text-sm font-semibold">Language {index + 1}</h3><Button type="button" variant="ghost" size="icon-sm" aria-label={`Remove language ${index + 1}`} onClick={() => onChange(languages.filter(({ id }) => id !== item.id))}><Trash2 className="text-muted-foreground" /></Button></div>
        <FieldGroup className="grid gap-4 sm:grid-cols-2">
          <CustomInput input={{ name: `language-name-${item.id}`, label: "Language", placeholder: "e.g. English", type: "text" }} value={item.name} onChange={(event) => onChange(languages.map((entry) => entry.id === item.id ? { ...entry, name: event.target.value } : entry))} />
          <Field><FieldLabel htmlFor={`language-level-${item.id}`}>Proficiency</FieldLabel><Select value={item.level} onValueChange={(level) => { if (level) onChange(languages.map((entry) => entry.id === item.id ? { ...entry, level: level as LanguageLevel } : entry)); }}><SelectTrigger id={`language-level-${item.id}`} className="h-10"><SelectValue /></SelectTrigger><SelectContent>{languageLevels.map((level) => <SelectItem key={level} value={level}>{level}</SelectItem>)}</SelectContent></Select></Field>
        </FieldGroup>
      </section>)}
      <Button type="button" variant="outline" onClick={() => onChange([...languages, { id: crypto.randomUUID(), name: "", level: "Intermediate" }])}><Plus />Add language</Button>
    </div>
  );
}
