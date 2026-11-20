import { homeSteps } from "@/constants/home.constants";
import { SectionHeading } from "@/components/shared/section-heading";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 py-16 sm:py-20">
      <div className="container">
        <SectionHeading
          eyebrow="HOW IT WORKS"
          title="A clear process, step by step."
          description="Move from your first details to a finished resume with a few straightforward steps."
        />
        <div className="mt-9 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {homeSteps.map(({ number, title, description, icon: Icon }) => (
            <article
              key={number}
              className="rounded-xl border border-border bg-card p-5 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Step {number}
                </span>
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
              </div>
              <h3 className="mt-5 text-base font-semibold tracking-tight">
                {title}
              </h3>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
