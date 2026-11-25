import Link from "next/link";
import { FileText } from "lucide-react";
import { footerLinks } from "@/constants/home.constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container flex flex-col gap-8 py-9 md:flex-row md:items-center md:justify-between">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-semibold tracking-tight"
          >
            <FileText aria-hidden="true" className="size-4 text-primary" />{" "}
            Resum<span className="-ml-2 text-primary">io</span>
          </Link>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            A simpler way to tell your professional story.
          </p>
        </div>
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap gap-x-6 gap-y-2"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors duration-300 ease-out hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-muted-foreground">
          © 2026 Resumio. Made by{" "}
          <a
            href="https://github.com/MohamedAyman-11"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground underline-offset-4 transition-colors hover:text-primary duration-300 ease-out hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            Mohamed Ayman
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
