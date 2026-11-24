import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/ui/custom-input";
import { Field, FieldLabel } from "@/components/ui/field";

type Props = {
  id: string;
  achievements?: string[];
  onChange: (achievements: string[]) => void;
};

export function AchievementsEditor({ id, achievements = [], onChange }: Props) {
  function update(index: number, value: string) {
    onChange(achievements.map((achievement, i) => i === index ? value : achievement));
  }

  function move(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= achievements.length) return;
    const next = [...achievements];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    onChange(next);
  }

  return (
    <Field className="sm:col-span-2">
      <div className="flex items-center justify-between gap-3">
        <FieldLabel>Achievements</FieldLabel>
        <Button type="button" variant="outline" size="sm" onClick={() => onChange([...achievements, ""])}>
          <Plus /> Add Achievement
        </Button>
      </div>
      <div className="mt-2 space-y-2">
        {achievements.map((achievement, index) => (
          <div className="flex items-center gap-1.5" key={`${id}-achievement-${index}`}>
            <CustomInput
              input={{
                name: `${id}-achievement-${index}`,
                label: "",
                placeholder: "Describe your key achievements and impact",
                type: "text",
              }}
              aria-label={`Achievement ${index + 1}`}
              value={achievement}
              onChange={(event) => update(index, event.target.value)}
            />
            <Button type="button" variant="outline" size="icon" className="!size-10" aria-label={`Move achievement ${index + 1} up`} disabled={index === 0} onClick={() => move(index, -1)}>
              <ChevronUp />
            </Button>
            <Button type="button" variant="outline" size="icon" className="!size-10" aria-label={`Move achievement ${index + 1} down`} disabled={index === achievements.length - 1} onClick={() => move(index, 1)}>
              <ChevronDown />
            </Button>
            <Button type="button" variant="outline" size="icon" className="!size-10" aria-label={`Remove achievement ${index + 1}`} onClick={() => onChange(achievements.filter((_, i) => i !== index))}>
              <Trash2 />
            </Button>
          </div>
        ))}
      </div>
    </Field>
  );
}
