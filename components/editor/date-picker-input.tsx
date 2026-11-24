"use client";

import { addMonths, format, isValid, parse, parseISO, subMonths } from "date-fns";
import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

function parseDate(value?: string | null) {
  if (!value) return undefined;
  const normalized = /^\d{4}$/.test(value) ? `${value}-01-01` : /^\d{4}-\d{2}$/.test(value) ? `${value}-01` : value;
  const parsed = parseISO(normalized);
  return isValid(parsed) ? parsed : undefined;
}

function parseTypedDate(value: string) {
  const text = value.trim();
  if (!text) return undefined;
  const isoDate = parseDate(text);
  if (isoDate) return isoDate;
  for (const pattern of ["MMM d, yyyy", "MMMM d, yyyy", "MM/dd/yyyy", "dd/MM/yyyy", "M/d/yyyy"]) {
    const parsed = parse(text, pattern, new Date());
    if (isValid(parsed) && format(parsed, pattern) === text) return parsed;
  }
  return undefined;
}

function displayDate(value?: string | null) {
  const date = parseDate(value);
  return date ? format(date, "MMM d, yyyy") : "";
}

export function DatePickerInput({ id, label, value, onChange, disabled }: { id: string; label: string; value?: string | null; onChange: (value: string) => void; disabled?: boolean }) {
  const [open, setOpen] = useState(false);
  const selectedDate = parseDate(value);
  const [calendarMonth, setCalendarMonth] = useState(() => selectedDate ?? new Date());
  const [draftState, setDraftState] = useState({ sourceValue: value, text: displayDate(value) });
  const draft = draftState.sourceValue === value ? draftState.text : displayDate(value);

  function commitDraft() {
    if (!draft.trim()) {
      onChange("");
      return;
    }
    const parsed = parseTypedDate(draft);
    if (parsed) {
      const normalized = format(parsed, "yyyy-MM-dd");
      onChange(normalized);
      setDraftState({ sourceValue: normalized, text: format(parsed, "MMM d, yyyy") });
    } else {
      setDraftState({ sourceValue: value, text: displayDate(value) });
    }
  }
  return (
    <Field className="w-full min-w-0" data-disabled={disabled || undefined}>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <InputGroup className="!h-10 min-h-10 rounded-lg bg-background transition-[border-color,box-shadow] duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 has-disabled:opacity-50">
          <InputGroupInput id={id} type="text" disabled={disabled} value={draft} placeholder="Type a date or choose from calendar" className="h-full text-sm" aria-label={label} aria-haspopup="dialog" onChange={(event) => {
            const nextValue = event.target.value;
            setDraftState({ sourceValue: value, text: nextValue });
            if (!nextValue.trim()) onChange("");
            else {
              const parsed = parseTypedDate(nextValue);
              if (parsed) onChange(format(parsed, "yyyy-MM-dd"));
            }
          }} onBlur={commitDraft} />
          <InputGroupAddon align="inline-end" className="pr-1.5">
            <PopoverTrigger render={<InputGroupButton aria-label={`Choose ${label.toLowerCase()}`} disabled={disabled} />}>
              <CalendarDays className="size-4" />
            </PopoverTrigger>
          </InputGroupAddon>
        </InputGroup>
        <PopoverContent align="start" className="p-2">
          <div className="mb-2 flex items-center justify-between px-1">
            <Button type="button" variant="ghost" size="icon-sm" aria-label="Previous month" onClick={() => setCalendarMonth((month) => subMonths(month, 1))}><ChevronLeft /></Button>
            <span className="text-sm font-medium">{format(calendarMonth, "MMMM yyyy")}</span>
            <Button type="button" variant="ghost" size="icon-sm" aria-label="Next month" onClick={() => setCalendarMonth((month) => addMonths(month, 1))}><ChevronRight /></Button>
          </div>
          <Calendar hideNavigation classNames={{ month_caption: "hidden" }} mode="single" month={calendarMonth} onMonthChange={setCalendarMonth} selected={selectedDate} onSelect={(date) => { if (date) { const normalized = format(date, "yyyy-MM-dd"); onChange(normalized); setDraftState({ sourceValue: normalized, text: format(date, "MMM d, yyyy") }); setCalendarMonth(date); setOpen(false); } }} />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
