"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      title="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="size-9 rounded-full border-0 text-muted-foreground  hover:bg-primary/10 hover:text-primary active:scale-95 active:bg-primary/15 focus-visible:ring-2 focus-visible:ring-primary/40 motion-reduce:transition-none motion-reduce:active:scale-100"
    >
      <Sun aria-hidden="true" className="size-[18px] dark:hidden" />
      <Moon aria-hidden="true" className="hidden size-[18px] dark:block" />
    </Button>
  );
}
