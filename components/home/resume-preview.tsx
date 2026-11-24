import type { ReactNode } from "react";

export function ResumePreview() {
  return (
    <article
      aria-label="Sample resume preview for Maya Chen"
      className="marketing-resume-card mx-auto w-full min-w-0 max-w-[430px] rounded-sm border border-slate-200 bg-white px-4 py-4 text-slate-950 shadow-[0_16px_45px_-32px_rgba(15,23,42,0.36)] min-[420px]:px-5 min-[420px]:py-5 sm:px-7 sm:py-6"
    >
      <header className="border-b border-slate-300 pb-2.5">
        <h2 className="text-[18px] font-bold leading-tight tracking-[-0.035em] min-[420px]:text-[20px] sm:text-[22px]">
          MAYA CHEN
        </h2>
        <p className="mt-0.5 text-[8px] font-semibold uppercase leading-[1.35] min-[420px]:text-[8.5px]">
          Product Designer
        </p>
        <p className="mt-1 text-[7px] leading-[1.45] text-slate-600 min-[420px]:text-[8px]">
          <span className="text-blue-700">maya.chen@example.com</span>
          <span aria-hidden="true"> · </span>+1 555 014 8820
          <span aria-hidden="true"> · </span>Brooklyn, NY
        </p>
        <p className="text-[7px] leading-[1.45] text-blue-700 min-[420px]:text-[8px]">
          Portfolio <span aria-hidden="true"> · </span> LinkedIn
        </p>
      </header>

      <ResumeSection title="Profile">
        <p>
          Product designer creating clear, accessible experiences for complex
          tools. I bring research, systems thinking, and close collaboration
          with engineering to every project.
        </p>
      </ResumeSection>

      <ResumeSection title="Experience">
        <ResumeEntry title="Product Designer at Northstar, New York" date="2022 - Present">
          <ul>
            <li>Led research and design for a workflow used by 18,000 customers.</li>
            <li>Reduced onboarding drop-off by 24% with clearer guidance.</li>
          </ul>
        </ResumeEntry>
        <ResumeEntry title="UX Designer at Fieldwork Studio" date="2020 - 2022">
          <ul>
            <li>Built a reusable component library with product engineers.</li>
          </ul>
        </ResumeEntry>
      </ResumeSection>

      <ResumeSection title="Skills">
        <p><strong>Design:</strong> Figma, prototyping, design systems</p>
        <p><strong>Research:</strong> Interviews, usability testing, synthesis</p>
      </ResumeSection>

      <ResumeSection title="Projects">
        <ResumeEntry title="Open-access design system" date="2024">
          <p>Created accessible patterns and documentation for small teams.</p>
        </ResumeEntry>
      </ResumeSection>

      <ResumeSection title="Education">
        <ResumeEntry title="B.A. Interaction Design, Parsons School of Design" date="2016 - 2020" />
      </ResumeSection>

      <ResumeSection title="Certificates">
        <p>Accessibility for UX Designers from Interaction Design Foundation</p>
      </ResumeSection>

      <ResumeSection title="Languages">
        <p>English - Native · Mandarin - Conversational</p>
      </ResumeSection>

      <ResumeSection title="Volunteering" last>
        <p>Mentor, Design Buddies - Portfolio reviews for early-career designers</p>
      </ResumeSection>
    </article>
  );
}

function ResumeSection({
  title,
  children,
  last = false,
}: {
  title: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <section className={last ? "pt-2" : "py-2"}>
      <h3 className="mb-1 border-b border-blue-500/70 pb-0.5 text-[8px] font-bold leading-tight uppercase tracking-[0.02em] text-blue-700 min-[420px]:text-[8.5px]">
        {title}
      </h3>
      <div className="space-y-0.5 text-[7px] leading-[1.25] min-[420px]:text-[7.5px] sm:text-[8px] [&_ul]:list-disc [&_ul]:space-y-0 [&_ul]:pl-3">
        {children}
      </div>
    </section>
  );
}

function ResumeEntry({
  title,
  date,
  children,
}: {
  title: string;
  date?: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-1.5 last:mb-0">
      <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
        <p className="min-w-0 font-semibold">{title}</p>
        {date && <p className="shrink-0 text-[6.5px] text-slate-600 min-[420px]:text-[7px]">{date}</p>}
      </div>
      {children && <div className="mt-0.5">{children}</div>}
    </div>
  );
}
