import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  summary: string;
  onChange: (summary: string) => void;
};

export function ProfileSection({ summary, onChange }: Props) {
  return (
    <Field>
      <FieldLabel htmlFor="resume-profile">Professional summary</FieldLabel>
      <Textarea
        id="resume-profile"
        className="min-h-28 resize-y"
        placeholder="Write a few sentences about your experience and goals"
        value={summary}
        onChange={(event) => onChange(event.target.value)}
      />
      <p className="text-xs text-muted-foreground">A concise summary helps employers understand your strengths quickly.</p>
    </Field>
  );
}
