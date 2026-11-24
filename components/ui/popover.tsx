"use client";

import * as React from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "cn";

function Popover(props: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root {...props} />;
}

function PopoverTrigger(props: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({ className, align = "center", side = "bottom", sideOffset = 6, ...props }: React.ComponentProps<typeof PopoverPrimitive.Popup> & { align?: "start" | "center" | "end"; side?: "top" | "bottom" | "left" | "right"; sideOffset?: number }) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner side={side} align={align} sideOffset={sideOffset} className="z-50 outline-none">
        <PopoverPrimitive.Popup data-slot="popover-content" className={cn("z-50 w-fit origin-[var(--transform-origin)] rounded-xl border !bg-popover p-3 text-popover-foreground shadow-lg shadow-black/10 outline-none transition duration-150 ease-out data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0", className)} {...props} />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

export { Popover, PopoverTrigger, PopoverContent };
