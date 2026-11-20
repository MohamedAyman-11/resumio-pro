"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const isDark = mounted && resolvedTheme === "dark";
  const Icon = isDark ? Moon : Sun;
  const nextTheme = isDark ? "light" : "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="size-9 rounded-full border-0 text-muted-foreground  hover:bg-primary/10 hover:text-primary active:scale-95 active:bg-primary/15 focus-visible:ring-2 focus-visible:ring-primary/40 motion-reduce:transition-none motion-reduce:active:scale-100"
    >
      <Icon aria-hidden="true" className="size-[18px]" />
    </Button>
  );
}
