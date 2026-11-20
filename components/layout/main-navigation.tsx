"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationLinks } from "@/constants/home.constants";

export function MainNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="hidden items-center gap-1 md:flex"
    >
      {navigationLinks.map((link) => {
        const isActive =
          pathname === link.href || pathname.startsWith(`${link.href}/`);

        return (
          <Link
            key={link.label}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={` rounded-lg px-3 py-2 text-sm font-medium transition-[color,background-color,transform] duration-300! ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 ${
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-primary/8 hover:text-primary active:bg-primary/12"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
