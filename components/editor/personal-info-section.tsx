import { Plus, Trash2 } from "lucide-react";
import type { PersonalInfo, Platform } from "@/types/resume";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import CustomInput from "@/components/ui/custom-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  info: PersonalInfo;
  onChange: (info: PersonalInfo) => void;
};

type TextField = "firstName" | "lastName" | "position" | "email" | "phone" | "address";

const platforms: Platform[] = ["LinkedIn", "GitHub", "Twitter", "Medium", "Portfolio", "Other"];

export function PersonalInfoSection({ info, onChange }: Props) {
  function update(field: TextField, value: string) {
    onChange({ ...info, [field]: value });
  }

  function updateSocialLink(id: string, field: "platform" | "url", value: string) {
    onChange({
      ...info,
      socialLinks: info.socialLinks.map((link) =>
        link.id === id
          ? { ...link, [field]: field === "platform" ? (value as Platform) : value }
          : link,
      ),
    });
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-sm font-semibold">Contact details</h3>
        <FieldGroup className="grid gap-4 sm:grid-cols-2">
          <CustomInput input={{ name: "resume-first-name", label: "First name", placeholder: "e.g. Daniel", type: "text" }} autoComplete="given-name" value={info.firstName} onChange={(event) => update("firstName", event.target.value)} />
          <CustomInput input={{ name: "resume-last-name", label: "Last name", placeholder: "e.g. Okafor", type: "text" }} autoComplete="family-name" value={info.lastName} onChange={(event) => update("lastName", event.target.value)} />
          <CustomInput input={{ name: "resume-position", label: "Job title", placeholder: "e.g. Software Engineer", type: "text" }} value={info.position} onChange={(event) => update("position", event.target.value)} />
          <CustomInput input={{ name: "resume-location", label: "Location", placeholder: "City, Country", type: "text" }} autoComplete="address-level2" value={info.address} onChange={(event) => update("address", event.target.value)} />
          <CustomInput input={{ name: "resume-email", label: "Email", placeholder: "you@example.com", type: "email" }} autoComplete="email" value={info.email} onChange={(event) => update("email", event.target.value)} />
          <CustomInput input={{ name: "resume-phone", label: "Phone", placeholder: "+1 555 000 0000", type: "tel" }} autoComplete="tel" value={info.phone} onChange={(event) => update("phone", event.target.value)} />
        </FieldGroup>
      </div>

      <div className="border-t pt-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div><h3 className="text-sm font-semibold">Social links</h3><p className="mt-1 text-xs text-muted-foreground">Add professional profiles or a portfolio.</p></div>
          <Button type="button" variant="outline" size="sm" onClick={() => onChange({ ...info, socialLinks: [...info.socialLinks, { id: crypto.randomUUID(), platform: "LinkedIn", url: "" }] })}><Plus />Add link</Button>
        </div>
        {info.socialLinks.length > 0 && <FieldGroup className="gap-3">{info.socialLinks.map((link) => <div className="flex items-end gap-2" key={link.id}>
          <Field className="w-36 shrink-0"><FieldLabel htmlFor={`social-platform-${link.id}`}>Platform</FieldLabel><Select value={link.platform} onValueChange={(value) => { if (value) updateSocialLink(link.id, "platform", value); }}><SelectTrigger id={`social-platform-${link.id}`} className="h-10"><SelectValue /></SelectTrigger><SelectContent>{platforms.map((platform) => <SelectItem key={platform} value={platform}>{platform}</SelectItem>)}</SelectContent></Select></Field>
          <div className="min-w-0 flex-1"><CustomInput input={{ name: `social-url-${link.id}`, label: "URL", placeholder: "https://", type: "text" }} type="url" value={link.url} onChange={(event) => updateSocialLink(link.id, "url", event.target.value)} /></div>
          <Button type="button" variant="ghost" size="icon" className="!h-10 !w-10" aria-label={`Remove ${link.platform} link`} onClick={() => onChange({ ...info, socialLinks: info.socialLinks.filter((item) => item.id !== link.id) })}><Trash2 className="text-muted-foreground" /></Button>
        </div>)}</FieldGroup>}
      </div>
    </div>
  );
}
