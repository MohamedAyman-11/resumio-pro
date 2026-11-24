import Link from "next/link";
import { ArrowRight, Check, Download, Eye, LockKeyhole } from "lucide-react";
import { ResumePreview } from "@/components/home/resume-preview";
import { Button } from "@/components/ui/button";
import {
  homePrimaryButtonClass,
  homeSecondaryButtonClass,
} from "@/components/shared/home-styles";

const assurances = [
  { label: "Free to use", icon: Check },
  { label: "No account needed", icon: LockKeyhole },
  { label: "Searchable PDF", icon: Download },
];

export function HeroSection() {
  return (
    <section className="hero-section relative isolate overflow-hidden border-b border-border bg-background">
      <div className="container grid items-center gap-12 py-14 sm:py-16 lg:min-h-[650px] lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1fr)] lg:gap-14 lg:py-20">
        <div className="mx-auto min-w-0 max-w-xl text-center lg:mx-0 lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary sm:text-sm">
            <span className="size-1.5 rounded-full bg-primary" />
            A free resume builder, made to stay simple
          </p>
          <h1 className="mt-6 text-[38px] font-semibold leading-[1.08] tracking-[-0.045em] min-[400px]:text-[42px] sm:text-[48px] lg:text-[56px]">
            Make your experience easy to see.
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-[17px] sm:leading-8 lg:mx-0">
            Build a clear, professional resume with a live preview. Add the
            sections that tell your story, then download a ready-to-share A4 PDF.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Button
              nativeButton={false}
              render={
                <Link href="/resumes">
                  Create my resume
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              }
              size="lg"
              className={`${homePrimaryButtonClass} w-full sm:w-auto`}
            />
            <Button
              nativeButton={false}
              render={<Link href="/features">Explore features</Link>}
              variant="outline"
              size="lg"
              className={`${homeSecondaryButtonClass} w-full sm:w-auto`}
            />
          </div>
          <ul className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground sm:text-sm lg:justify-start">
            {assurances.map(({ label, icon: Icon }) => (
              <li key={label} className="inline-flex items-center gap-1.5">
                <Icon aria-hidden="true" className="size-3.5 text-primary" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full min-w-0 max-w-[500px] lg:ml-auto">
          <div
            aria-hidden="true"
            className="absolute -inset-8 -z-10 rounded-full bg-primary/[0.09] blur-3xl"
          />
          <div className="absolute inset-3 translate-y-3 rotate-1 rounded-2xl border border-border/80 bg-card shadow-sm" />
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-xl shadow-foreground/[0.07] sm:p-4">
            <div className="mb-3 flex items-center justify-between px-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <span className="size-2 rounded-full bg-success" />
                Live resume preview
              </div>
              <span className="rounded-md bg-muted px-2 py-1 text-[10px] font-semibold text-muted-foreground">
                A4 · Classic
              </span>
            </div>
            <ResumePreview />
          </div>
          <div className="absolute -bottom-4 -right-2 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-xs font-medium text-foreground shadow-lg sm:-right-5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Eye aria-hidden="true" className="size-4" />
            </span>
            <span>Review, then download</span>
          </div>
        </div>
      </div>
    </section>
  );
}
