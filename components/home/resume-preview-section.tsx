import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ResumePreview } from "@/components/home/resume-preview";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { homeSecondaryButtonClass } from "@/components/shared/home-styles";

export function ResumePreviewSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container grid items-center gap-9 lg:grid-cols-[0.9fr_1fr] lg:gap-16">
        <div className="mx-auto">
          <SectionHeading
            align="left"
            eyebrow="A CLEAN A4 LAYOUT"
            title="Keep the focus on your experience."
            description="The classic single-column format keeps your contact details, work, education, and skills easy to find."
          />
          <div className="mt-6 flex  justify-center lg:justify-start">
            <Button
              nativeButton={false}
              render={
                <Link href="/resumes">
                  Create my resume{" "}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              }
              variant="outline"
              className={`${homeSecondaryButtonClass}  `}
            ></Button>
          </div>
        </div>
        <div className="hidden rounded-2xl bg-muted/60 p-2 min-[420px]:p-4 sm:p-7 lg:block">
          <ResumePreview />
        </div>
      </div>
    </section>
  );
}
