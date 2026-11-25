"use client";

import {
  ArrowLeft,
  Award,
  BriefcaseBusiness,
  Download,
  FolderKanban,
  GraduationCap,
  HeartHandshake,
  Languages,
  Save,
  UserRound,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { TResume } from "@/types/resume";
import { getResumes, updateResume } from "@/lib/resume.storage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { EducationSection } from "./education-section";
import { ExperienceSection } from "./experience-section";
import { PersonalInfoSection } from "./personal-info-section";
import { ProfileSection } from "./profile-section";
import { ProjectsSection } from "./projects-section";
import { MobileResumePreview } from "./mobile-resume-preview";
import { ResumePreview } from "./resume-preview";
import { SkillsSection } from "./skills-section";
import {
  CertificationSection,
  LanguageSection,
} from "./certification-language-sections";
import { VolunteeringSection } from "./volunteering-section";

const DownloadResumePdf = dynamic(
  () => import("./pdf/download-resume-pdf").then((module) => module.DownloadResumePdf),
  {
    ssr: false,
    loading: () => (
      <Button type="button" size="lg" disabled>
        <Download className="size-4" />
        <span className="hidden sm:inline">Preparing PDF...</span>
        <span className="sm:hidden">Preparing</span>
      </Button>
    ),
  },
);

type SectionKey =
  | "personal"
  | "experience"
  | "skills"
  | "projects"
  | "education"
  | "certifications"
  | "languages"
  | "internships"
  | "volunteering";

export default function ResumeEditor({ resumeId }: { resumeId: string }) {
  const [resume, setResume] = useState<TResume | null>(null);
  const [saved, setSaved] = useState(true);
  const [loading, setLoading] = useState(true);
  const [openSections, setOpenSections] = useState<string[]>(["personal"]);

  useEffect(() => {
    const savedResume =
      getResumes().find((item) => item.id === resumeId) ?? null;
    // localStorage is only available in the browser, so load the resume after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResume(savedResume);
    setLoading(false);
  }, [resumeId]);

  function changeResume(updatedResume: TResume) {
    setResume(updatedResume);
    setSaved(false);
  }

  function saveChanges() {
    if (!resume) return;
    updateResume(resume);
    setSaved(true);
  }

  if (loading) {
    return (
      <main className="container py-12 text-sm text-muted-foreground">
        Loading your resume...
      </main>
    );
  }

  if (!resume) {
    return (
      <main className="container py-12">
        <h1 className="text-2xl font-semibold">Resume not found</h1>
        <Link
          className="mt-4 inline-block text-primary hover:underline"
          href="/resumes"
        >
          Back to my resumes
        </Link>
      </main>
    );
  }

  const sections: {
    key: SectionKey;
    title: string;
    icon: typeof UserRound;
    complete: boolean;
  }[] = [
    {
      key: "personal",
      title: "Personal information",
      icon: UserRound,
      complete: Boolean(
        resume.personalInfo.firstName ||
        resume.personalInfo.lastName ||
        resume.personalInfo.position ||
        resume.personalInfo.profileSummary.trim(),
      ),
    },
    {
      key: "experience",
      title: "Experience",
      icon: BriefcaseBusiness,
      complete: resume.experience.length > 0,
    },
    {
      key: "skills",
      title: "Skills",
      icon: Wrench,
      complete: resume.skills.length > 0,
    },
    {
      key: "projects",
      title: "Projects",
      icon: FolderKanban,
      complete: resume.projects.length > 0,
    },
    {
      key: "education",
      title: "Education",
      icon: GraduationCap,
      complete: resume.education.length > 0,
    },
    {
      key: "certifications",
      title: "Certifications",
      icon: Award,
      complete: resume.certifications.length > 0,
    },
    {
      key: "languages",
      title: "Languages",
      icon: Languages,
      complete: resume.languages.length > 0,
    },
    {
      key: "internships",
      title: "Internships",
      icon: BriefcaseBusiness,
      complete: resume.internships.length > 0,
    },
    {
      key: "volunteering",
      title: "Volunteering",
      icon: HeartHandshake,
      complete: resume.volunteering.length > 0,
    },
  ];

  return (
    <main className="resume-workspace min-h-[calc(100vh-72px)] animate-in fade-in-0 duration-300 bg-preview-stage motion-reduce:animate-none xl:h-[calc(100dvh-72px)] xl:min-h-0 xl:overflow-hidden">
      <div className="grid min-h-full xl:h-full xl:grid-cols-2">
        <section className="flex min-h-0 flex-col border-b border-border xl:overflow-y-auto xl:overscroll-contain xl:border-b-0 xl:border-r">
          <header className="sticky top-0 z-30 flex min-h-[76px] shrink-0 items-center justify-between gap-4 border-b border-border bg-background px-4 py-3 shadow-sm sm:px-6 xl:px-8">
            <div className="min-w-0">
              <Link
                className="mb-1 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
                href="/resumes"
              >
                <ArrowLeft className="size-3.5" />
                My resumes
              </Link>
              <h1 className="truncate text-lg font-semibold tracking-tight sm:text-xl">
                {resume.name}
              </h1>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span
                aria-live="polite"
                className={`hidden items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[11px] font-medium sm:inline-flex ${
                  saved
                    ? "border-success/30 bg-success/10 text-success"
                    : "border-warning/30 bg-warning/10 text-warning"
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${saved ? "bg-success" : "bg-warning"}`}
                />
                {saved ? "All changes saved" : "Unsaved changes"}
              </span>
              <Button onClick={saveChanges} type="button" size="lg">
                <Save className="size-4" />
                <span className="hidden sm:inline">Save changes</span>
                <span className="sm:hidden">Save</span>
              </Button>
            </div>
          </header>

          <div className="px-3 py-4 pb-24 sm:px-5 sm:py-5 sm:pb-24 xl:pb-5">
            <div className="mx-auto max-w-[850px]">
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  Resume builder
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add your details. Your preview updates as you edit.
                </p>
              </div>
              <Accordion
                value={openSections}
                onValueChange={setOpenSections}
                className="gap-2.5"
                multiple
              >
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <AccordionItem
                      key={section.key}
                      value={section.key}
                      className="overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-[border-color,box-shadow] duration-200 ease-out hover:border-primary/25 hover:shadow-md data-[open]:border-primary/30 data-[open]:ring-1 data-[open]:ring-primary/10"
                    >
                      <AccordionTrigger className="min-h-[62px] gap-3 px-4 py-3 text-left hover:text-foreground sm:px-5">
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
                          <Icon className="size-[18px]" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold">
                            {section.title}
                          </span>
                          {section.complete && (
                            <span className="mt-0.5 block text-xs text-muted-foreground">
                              Details added
                            </span>
                          )}
                        </span>
                        {section.complete && (
                          <span className="mr-1 hidden size-5 place-items-center rounded-full bg-success/10 text-[11px] font-bold text-success sm:grid">
                            ✓
                          </span>
                        )}
                      </AccordionTrigger>
                      <AccordionContent className="border-t bg-background px-4 py-5 sm:px-5 sm:py-6">
                        {section.key === "personal" && (
                          <div className="space-y-7">
                            <PersonalInfoSection
                              info={resume.personalInfo}
                              onChange={(personalInfo) =>
                                changeResume({ ...resume, personalInfo })
                              }
                            />
                            <div className="border-t pt-6">
                              <ProfileSection
                                summary={resume.personalInfo.profileSummary}
                                onChange={(profileSummary) =>
                                  changeResume({
                                    ...resume,
                                    personalInfo: {
                                      ...resume.personalInfo,
                                      profileSummary,
                                    },
                                  })
                                }
                              />
                            </div>
                          </div>
                        )}
                        {section.key === "experience" && (
                          <ExperienceSection
                            experience={resume.experience}
                            onChange={(experience) =>
                              changeResume({ ...resume, experience })
                            }
                          />
                        )}
                        {section.key === "skills" && (
                          <SkillsSection
                            skills={resume.skills}
                            onChange={(skills) =>
                              changeResume({ ...resume, skills })
                            }
                          />
                        )}
                        {section.key === "projects" && (
                          <ProjectsSection
                            projects={resume.projects}
                            onChange={(projects) =>
                              changeResume({ ...resume, projects })
                            }
                          />
                        )}
                        {section.key === "education" && (
                          <EducationSection
                            education={resume.education}
                            onChange={(education) =>
                              changeResume({ ...resume, education })
                            }
                          />
                        )}
                        {section.key === "certifications" && (
                          <CertificationSection
                            certifications={resume.certifications}
                            onChange={(certifications) =>
                              changeResume({ ...resume, certifications })
                            }
                          />
                        )}
                        {section.key === "languages" && (
                          <LanguageSection
                            languages={resume.languages}
                            onChange={(languages) =>
                              changeResume({ ...resume, languages })
                            }
                          />
                        )}
                        {section.key === "internships" && (
                          <ExperienceSection
                            title="Internship"
                            experience={resume.internships}
                            onChange={(internships) =>
                              changeResume({ ...resume, internships })
                            }
                          />
                        )}
                        {section.key === "volunteering" && (
                          <VolunteeringSection
                            items={resume.volunteering}
                            onChange={(volunteering) =>
                              changeResume({ ...resume, volunteering })
                            }
                          />
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </section>

        <aside className="hidden min-h-0 flex-col bg-preview-stage xl:flex xl:h-full">
          <header className="z-30 flex min-h-[76px] shrink-0 items-center justify-between border-b border-border bg-background px-4 py-3 shadow-sm sm:px-6 xl:px-8">
            <div>
              <h2 className="text-base font-semibold">Preview</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Changes update as you edit
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full border bg-muted/40 px-3 py-1.5 text-[11px] font-semibold text-muted-foreground">
                A4 · Classic
              </span>
              <DownloadResumePdf resume={resume} />
            </div>
          </header>
          <div className="p-4 sm:p-7 xl:min-h-0 xl:flex-1 xl:overflow-y-auto xl:overscroll-contain xl:p-8">
            <ResumePreview resume={resume} />
          </div>
        </aside>
      </div>
      <MobileResumePreview
        resume={resume}
        downloadAction={<DownloadResumePdf resume={resume} />}
      />
    </main>
  );
}
