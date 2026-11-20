import Link from "next/link";
import { ArrowRight, FileCheck2 } from "lucide-react";
import { ResumePreview } from "@/components/home/resume-preview";
import { Button } from "@/components/ui/button";
import {
  homePrimaryButtonClass,
  homeSecondaryButtonClass,
} from "@/components/shared/home-styles";

export function HeroSection() {
  return (
    <section className="hero-section relative isolate overflow-hidden border-b border-border bg-background">
      <div className="container grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-14 lg:py-20">
        <div className="min-w-0 max-w-xl mx-auto text-center lg:mx-0 lg:text-left">
          <p className="relative inline-flex rounded-md border border-primary/25 bg-primary/5 px-2 py-1 text-xs font-medium text-primary sm:text-sm lg:-translate-y-8">
            No signup · No hidden fees · Ready in minutes
          </p>
          <h1 className="mt-3 text-[36px] font-semibold leading-[1.1] tracking-[-0.045em] min-[400px]:text-[40px] sm:text-[44px] lg:text-[52px]">
            A free resume builder that{" "}
            <span className="relative inline-block whitespace-nowrap text-primary">
              stays free.
              <svg
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-2 w-full overflow-visible"
                viewBox="0 0 220 8"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 6 C 48 2, 113 8, 218 3"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-4 lg:max-w-lg text-base leading-7 text-muted-foreground sm:text-[17px] sm:leading-7 text-center lg:text-left">
            Build and preview your resume in your browser, then download a
            clean, ATS-ready PDF.
          </p>
          <div className="mt-6 flex items-start gap-3 flex-col sm:flex-row justify-center lg:justify-start">
            <Button
              nativeButton={false}
              render={
                <Link href="/builder">
                  Create my resume{" "}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              }
              className={`${homePrimaryButtonClass} w-full sm:w-auto `}
            ></Button>
            <Button
              nativeButton={false}
              render={<Link href="#how-it-works">See how it works</Link>}
              variant="outline"
              className={`${homeSecondaryButtonClass} w-full sm:w-auto `}
            ></Button>
          </div>
        </div>
        <div className="relative mx-auto w-full min-w-0 max-w-[490px] lg:ml-auto">
          <div
            aria-hidden="true"
            className="absolute inset-3 translate-y-3 rotate-1 rounded-xl border border-border bg-card shadow-sm"
          />
          <div
            aria-hidden="true"
            className="absolute -inset-8 -z-10 rounded-full bg-primary/[0.08] blur-3xl"
          />
          <div className="relative rounded-2xl border border-primary/10 bg-primary/[0.035] p-3 shadow-lg shadow-primary/[0.06] sm:p-4">
            <ResumePreview />
          </div>
          <div className="absolute -right-2 -top-4 flex items-center gap-2 rounded-lg border border-border bg-card/95 px-3 py-2 text-xs font-medium text-foreground shadow-md shadow-foreground/[0.06] backdrop-blur sm:-right-5">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary/10 text-primary">
              <FileCheck2 aria-hidden="true" className="size-4" />
            </span>
            <span>ATS-ready PDF</span>
          </div>
        </div>
      </div>
    </section>
  );
}
