"use client";

import * as React from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { cn } from "cn";

function Calendar({ className, classNames, showOutsideDays = true, ...props }: React.ComponentProps<typeof DayPicker>) {
  const defaults = getDefaultClassNames();
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("bg-popover p-1", className)}
      classNames={{
        ...defaults,
        root: cn(defaults.root, "w-fit"),
        months: cn(defaults.months, "relative flex flex-col sm:flex-row gap-4"),
        month: cn(defaults.month, "space-y-4"),
        month_caption: cn(defaults.month_caption, "relative flex h-8 items-center justify-center px-8"),
        caption_label: cn(defaults.caption_label, "text-sm font-semibold"),
        nav: cn(defaults.nav, "absolute inset-x-0 top-0 flex items-center justify-between"),
        button_previous: cn(defaults.button_previous, "inline-flex size-8 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"),
        button_next: cn(defaults.button_next, "inline-flex size-8 items-center justify-center rounded-md border border-transparent text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"),
        month_grid: cn(defaults.month_grid, "w-full border-collapse"),
        weekdays: cn(defaults.weekdays, "flex"),
        weekday: cn(defaults.weekday, "w-9 rounded-md text-center text-[0.8rem] font-normal text-muted-foreground"),
        week: cn(defaults.week, "mt-1 flex w-full"),
        day: cn(defaults.day, "relative size-9 p-0 text-center text-sm focus-within:z-20"),
        day_button: cn(defaults.day_button, "inline-flex size-9 items-center justify-center rounded-md p-0 font-normal outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring aria-selected:bg-primary aria-selected:text-primary-foreground"),
        today: cn(defaults.today, "font-semibold text-primary"),
        outside: cn(defaults.outside, "text-muted-foreground opacity-50"),
        disabled: cn(defaults.disabled, "pointer-events-none opacity-40"),
        selected: cn(defaults.selected, "bg-primary text-primary-foreground"),
        ...classNames,
      }}
      {...props}
    />
  );
}

export { Calendar };
