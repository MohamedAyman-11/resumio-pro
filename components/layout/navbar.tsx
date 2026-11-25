import Link from "next/link";
import { Suspense } from "react";
import { ArrowUpRight, FileText } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/shared/github-icon";
import { homePrimaryButtonClass } from "@/components/shared/home-styles";
import {
  MainNavigation,
  MainNavigationFallback,
} from "@/components/layout/main-navigation";
import {
  MobileNavigation,
  MobileNavigationFallback,
} from "@/components/layout/mobile-navigation";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="container flex h-[71px] items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold tracking-tight"
          aria-label="Resumio home"
        >
          <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <FileText aria-hidden="true" className="size-4" />
          </span>
          <span className="text-base">
            Resum<span className="text-primary">io</span>
          </span>
        </Link>

        <Suspense fallback={<MainNavigationFallback />}>
          <MainNavigation />
        </Suspense>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <a
            href="https://github.com/MohamedAyman-11/resume-builder"
            target="_blank"
            rel="noreferrer"
            aria-label="View Resumio on GitHub"
            title="GitHub repository"
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-[color,background-color,transform] duration-300 ease-out hover:bg-primary/10 hover:text-primary active:scale-95 active:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 motion-reduce:transition-none motion-reduce:active:scale-100"
          >
            <GithubIcon className="size-[18px]" />
          </a>
          <Button
            nativeButton={false}
            render={
              <Link href="/resumes">
                Create a resume{" "}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            }
            size="lg"
            className={homePrimaryButtonClass}
          />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <a
            href="https://github.com/MohamedAyman-11/resume-builder"
            target="_blank"
            rel="noreferrer"
            aria-label="View Resumio on GitHub"
            title="GitHub repository"
            className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-[color,background-color,transform] duration-300 ease-out hover:bg-primary/10 hover:text-primary active:scale-95 active:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 motion-reduce:transition-none motion-reduce:active:scale-100"
          >
            <GithubIcon className="size-[18px]" />
          </a>
          <Suspense fallback={<MobileNavigationFallback />}>
            <MobileNavigation />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
