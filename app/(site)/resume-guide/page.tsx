import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { homePrimaryButtonClass } from "@/components/shared/home-styles";
import { absoluteSiteUrl } from "@/lib/site";
import { Reveal } from "@/components/shared/reveal";

export const metadata: Metadata = {
  title: "How to Write a Resume: A Practical Guide",
  description:
    "Learn how to organize resume sections, describe experience clearly, choose relevant skills, and review your resume before sending it.",
  alternates: {
    canonical: absoluteSiteUrl("/resume-guide"),
  },
};

const contents = [
  { id: "start-with-the-role", label: "Start with the role" },
  { id: "write-a-clear-profile", label: "Write a clear profile" },
  { id: "describe-your-work", label: "Describe your work" },
  { id: "choose-relevant-sections", label: "Choose relevant sections" },
  { id: "review-before-sending", label: "Review before sending" },
];

const checklist = [
  "The most relevant experience is easy to find.",
  "Dates, job titles, and organization names are consistent.",
  "Achievements describe work you actually did.",
  "Links open the portfolio or project you intended.",
  "The PDF is readable at normal zoom and on paper.",
];

export default function ResumeGuidePage() {
  return (
    <main>
      <header className="border-b border-border bg-background py-16 sm:py-20">
        <Reveal className="container" mode="mount" duration={1}>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Resume writing guide
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
            How to write a resume that is clear and easy to scan.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            A practical guide to deciding what to include, describing your work,
            and reviewing a resume before you send it.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Start with your real experience. Keep each detail accurate and
            relevant to the role.
          </p>
        </Reveal>
      </header>

      <div className="container grid gap-12 py-12 sm:py-16 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
        <Reveal className="h-fit lg:sticky lg:top-24" duration={1}>
        <nav
          aria-label="On this page"
          className="rounded-2xl border border-border bg-card p-5"
        >
          <h2 className="text-sm font-semibold">On this page</h2>
          <ul className="mt-3 space-y-2.5">
            {contents.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        </Reveal>

        <article className="min-w-0 max-w-3xl space-y-10">
          <Reveal duration={1}>
          <section id="start-with-the-role" className="scroll-mt-28">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Start with the role you want
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              Read the job description and note the work, tools, and
              responsibilities that genuinely match your background. Put the
              most relevant details where a reader will see them first. A
              resume can be tailored for each role without changing the facts.
            </p>
          </section>
          </Reveal>

          <Reveal delay={0.08} duration={1}>
          <section id="write-a-clear-profile" className="scroll-mt-28">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Write a clear profile
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              Use a few direct sentences to explain your area of work, the
              problems you solve, and strengths relevant to the role. Avoid
              vague claims; a specific summary is easier to trust and remember.
            </p>
          </section>
          </Reveal>

          <Reveal delay={0.08} duration={1}>
          <section id="describe-your-work" className="scroll-mt-28">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Describe your work with useful detail
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              Start each bullet with an action, then add the scope or result
              when you can support it. Name the project, audience, or process
              you worked on. Use numbers only when they are accurate and you
              can explain what they measure.
            </p>
            <div className="mt-5 rounded-xl border border-border bg-muted/40 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                A useful pattern
              </p>
              <p className="mt-2 text-sm leading-6 text-foreground">
                Action + what you worked on + a specific outcome or scope.
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                For example: “Reduced report preparation time by automating
                weekly data checks for a five-person operations team.” Use an
                example like this only when it accurately describes your work.
              </p>
            </div>
          </section>
          </Reveal>

          <Reveal delay={0.08} duration={1}>
          <section id="choose-relevant-sections" className="scroll-mt-28">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Choose sections that support your story
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              Work experience, projects, education, skills, internships,
              certifications, languages, and volunteering can all help show
              relevant experience. Include the sections that add context for
              this application and leave out empty ones.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              Keep skills specific. Group related tools or strengths together
              so the list is quick to scan. For projects, explain what you
              built or contributed and include a working link when you have
              one.
            </p>
          </section>
          </Reveal>

          <Reveal delay={0.08} duration={1}>
          <section id="review-before-sending" className="scroll-mt-28">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Review the resume before sending
            </h2>
            <ul className="mt-5 space-y-3">
              {checklist.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 sm:text-base">
                  <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              A readable structure can help a person or an applicant tracking
              system identify your information, but different systems process
              documents differently. Review the downloaded PDF yourself
              before you submit it.
            </p>
          </section>
          </Reveal>

          <Reveal delay={0.08} duration={1}>
          <section className="rounded-2xl border border-border bg-muted/35 p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Ready to put it together?
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Build a resume section by section, check the live preview, and
              keep a PDF copy for each application.
            </p>
            <Button
              nativeButton={false}
              render={
                <Link href="/resumes">
                  Create a resume
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              }
              size="lg"
              className={`${homePrimaryButtonClass} mt-5`}
            />
          </section>
          </Reveal>
        </article>
      </div>
    </main>
  );
}
