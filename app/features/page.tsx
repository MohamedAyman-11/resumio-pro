import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  Eye,
  FileCheck2,
  FolderKanban,
  LockKeyhole,
  Rows3,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { homePrimaryButtonClass } from "@/components/shared/home-styles";
import { absoluteSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume Builder Features",
  description:
    "Explore ResumeKit features: live resume preview, ten guided sections, a searchable PDF download, and browser-based resume storage.",
  alternates: {
    canonical: absoluteSiteUrl("/features"),
  },
};

const features = [
  {
    title: "A live A4 preview",
    description:
      "See your resume update as you write, with your content arranged in a clean, single-column layout.",
    icon: Eye,
  },
  {
    title: "Ten focused sections",
    description:
      "Add personal details, a profile, experience, internships, skills, projects, education, certifications, languages, and volunteering.",
    icon: Rows3,
  },
  {
    title: "A real PDF download",
    description:
      "Download selectable, searchable text with clickable links. Your resume is a document, not a screenshot.",
    icon: FileCheck2,
  },
  {
    title: "A library for multiple resumes",
    description:
      "Keep separate versions for different roles and open any of them from My resumes.",
    icon: FolderKanban,
  },
  {
    title: "Saved in this browser",
    description:
      "ResumeKit stores your resume data in this browser’s local storage. There is no account or cloud sync.",
    icon: LockKeyhole,
  },
  {
    title: "Ready to share",
    description:
      "The PDF keeps a familiar page size, readable type, clear headings, dates, achievements, and links together.",
    icon: Download,
  },
];

const resumeSections = [
  "Personal information",
  "Profile summary",
  "Experience",
  "Internships",
  "Skills",
  "Projects",
  "Education",
  "Certifications",
  "Languages",
  "Volunteering",
];

export default function FeaturesPage() {
  return (
    <main>
      <section className="border-b border-border bg-background py-16 sm:py-20">
        <div className="container">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            ResumeKit features
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
            Everything you need to make a clear resume.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Write in focused sections, check the live preview, and download a
            polished PDF. No account or design experience required.
          </p>
          <Button
            nativeButton={false}
            render={
              <Link href="/resumes">
                Create my resume
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            }
            size="lg"
            className={`${homePrimaryButtonClass} mt-7`}
          />
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="BUILT AROUND THE WORK"
            title="A straightforward path from details to PDF."
            description="The tools support the resume you are building without adding extra steps."
          />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="rounded-2xl border border-border bg-card p-5 sm:p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h2 className="mt-4 text-base font-semibold tracking-tight">
                  {title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30 py-16 sm:py-20">
        <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
          <SectionHeading
            align="left"
            eyebrow="YOUR EXPERIENCE, ORGANIZED"
            title="Choose the sections that fit your story."
            description="Each section has fields for the information people expect to find, with room for your own details and achievements."
            className="w-full"
          />
          <ul className="grid gap-2 sm:grid-cols-2">
            {resumeSections.map((section, index) => (
              <li
                key={section}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary/10 text-[11px] font-semibold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <div className="rounded-2xl border border-border bg-card px-6 py-8 sm:px-9 sm:py-10">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                Your data
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                Your resumes stay in your browser.
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                ResumeKit saves resumes in local storage on the browser and
                device you use. There is no account or cloud sync, so your
                library will not follow you to another browser. Download a PDF
                if you need a portable copy.
              </p>
            </div>
            <Button
              nativeButton={false}
              render={
                <Link href="/resume-guide">
                  Read the resume guide
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              }
              variant="outline"
              size="lg"
              className="mt-6"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
