import type { ReactNode } from "react";

export function ResumePreview() {
  return (
    <article
      aria-label="Sample resume for Karim Nabil"
      className="resume-paper mx-auto w-full min-w-0 max-w-[430px] border border-border bg-white px-4 py-4 text-zinc-950 shadow-[0_16px_45px_-32px_rgba(15,23,42,0.36)] min-[420px]:px-5 min-[420px]:py-5 sm:px-7 sm:py-6"
      style={{ color: "#09090b" }}
    >
      <header className="border-b border-zinc-700 pb-2.5">
        <h3 className="text-[18px] font-bold leading-tight tracking-[-0.035em] min-[420px]:text-[20px] sm:text-[22px]">
          Karim Nabil
        </h3>
        <p className="mt-0.5 text-[8px] leading-[1.45] min-[420px]:text-[8.5px]">
          Software Engineer
        </p>
        <p className="mt-1 text-[7px] leading-[1.5] text-zinc-700 min-[420px]:text-[8px]">
          <span className="text-blue-700">karim.nabil@example.com</span>
          <span aria-hidden="true"> • </span>+20 100 555 0184
          <span aria-hidden="true"> • </span>Cairo, Egypt
        </p>
        <p className="text-[7px] leading-[1.5] text-blue-700 min-[420px]:text-[8px]">
          LinkedIn <span aria-hidden="true">•</span> GitHub <span aria-hidden="true">•</span> Portfolio
        </p>
      </header>

      <ResumeSection title="Profile">
        <p>
          Software engineer focused on building reliable web products, clear user experiences, and maintainable services for growing teams.
        </p>
      </ResumeSection>

      <ResumeSection title="Education">
        <ResumeEntry title="B.Sc. Computer Science, Nile Valley University" date="2018 – 2022">
          <p><strong>Grade:</strong> Very Good</p>
          <p>Coursework: Data Structures, Databases, Software Engineering, and Computer Networks</p>
        </ResumeEntry>
      </ResumeSection>

      <ResumeSection title="Skills">
        <p><strong>Programming:</strong> TypeScript, JavaScript, Python, SQL</p>
        <p><strong>Web:</strong> React, Next.js, Node.js, REST APIs</p>
        <p><strong>Tools:</strong> Git, Docker, PostgreSQL, AWS</p>
      </ResumeSection>

      <ResumeSection title="Experience">
        <ResumeEntry title="Software Engineer at Cedar Labs, Cairo" date="2023 – Present">
          <ul>
            <li>Built product features used by thousands of customers across web and mobile.</li>
            <li>Improved API response times by 35% through query and caching updates.</li>
          </ul>
        </ResumeEntry>
        <ResumeEntry title="Frontend Developer at Brightside Studio" date="2022 – 2023">
          <ul>
            <li>Created accessible interfaces and reusable components for client projects.</li>
            <li>Worked with design and product teams to ship weekly improvements.</li>
          </ul>
        </ResumeEntry>
      </ResumeSection>

      <ResumeSection title="Projects">
        <ResumeEntry title="Open-source task planner" date="2024">
          <p>Built a lightweight planning app with shared boards, keyboard shortcuts, and offline support.</p>
        </ResumeEntry>
      </ResumeSection>

      <ResumeSection title="Languages" last>
        <p>Arabic - Native</p>
        <p>English - Proficient</p>
      </ResumeSection>
    </article>
  );
}

function ResumeSection({ title, children, last = false }: { title: string; children: ReactNode; last?: boolean }) {
  return (
    <section className={last ? "pt-2" : "py-2"}>
      <h4 className="mb-1 border-b border-zinc-400 pb-0.5 text-[8px] font-bold leading-tight uppercase tracking-[0.02em] min-[420px]:text-[8.5px]">
        {title}
      </h4>
      <div className="space-y-0.5 text-[7px] leading-[1.35] min-[420px]:text-[7.5px] sm:text-[8px] [&_ul]:list-disc [&_ul]:space-y-0 [&_ul]:pl-3">
        {children}
      </div>
    </section>
  );
}

function ResumeEntry({ title, date, children }: { title: string; date: string; children: ReactNode }) {
  return (
    <div className="mb-1.5 last:mb-0">
      <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
        <p className="min-w-0 font-semibold">{title}</p>
        <p className="shrink-0 text-[6.5px] text-zinc-700 min-[420px]:text-[7px]">{date}</p>
      </div>
      <div className="mt-0.5">{children}</div>
    </div>
  );
}
