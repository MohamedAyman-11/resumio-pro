import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/shared/section-heading";
import { homePrimaryButtonClass } from "@/components/shared/home-styles";

export function CtaSection() {
  return (
    <section className="pb-16 sm:pb-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-muted/35 px-6 py-8 sm:px-9 sm:py-9">
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <SectionHeading
              align="left"
              className="max-w-2xl"
              eyebrow="START WITH WHAT YOU HAVE"
              title="A stronger resume starts with a clear story."
              description="Bring your experience together, refine it in the live preview, and keep a PDF ready for your next opportunity."
            />
            <div className=" flex justify-center lg:justify-start">
              <Button
                nativeButton={false}
                render={
                <Link href="/resumes">
                  Get started{" "}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover/button:translate-x-0.5"
                    />
                  </Link>
                }
                size="lg"
                className={`${homePrimaryButtonClass} shrink-0 self-start lg:self-center`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
