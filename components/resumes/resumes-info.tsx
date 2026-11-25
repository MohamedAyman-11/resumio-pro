"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  FileText,
  Search,
  Trash2,
  X,
} from "lucide-react";
import type { TResume } from "@/types/resume";
import type { TInput } from "@/types";
import {
  deleteResume,
  getResumes,
  RESUMES_UPDATED_EVENT,
} from "@/lib/resume.storage";
import { CreateResume } from "@/components/builder/create-resume";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/ui/custom-input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function formatUpdatedAt(value?: string) {
  if (!value) return "Date unavailable";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function getResumeDescription(resume: TResume) {
  const position = resume.personalInfo.position.trim();
  const company = resume.experience[0]?.company.trim();

  if (position && company) return `${position} · ${company}`;
  if (position) return position;
  if (company) return company;
  return "Add a role and experience to bring this resume to life.";
}

const searchInput: TInput = {
  name: "resume-search",
  label: "",
  placeholder: "Search resumes...",
  type: "text",
};

function ResumeCard({
  resume,
  onDelete,
}: {
  resume: TResume;
  onDelete: (id: string) => void;
}) {
  return (
    <article className="group relative flex min-h-56 flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-foreground/[0.04] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/10">
            <FileText aria-hidden="true" className="size-5" />
          </span>
          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold tracking-tight text-card-foreground sm:text-lg">
              {resume.name}
            </h2>
            <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
              {getResumeDescription(resume)}
            </p>
          </div>
        </div>

        <AlertDialog>
          <AlertDialogTrigger
            render={
              <Button
                aria-label={`Delete ${resume.name}`}
                className="size-9 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                size="icon"
                variant="ghost"
              />
            }
          >
            <Trash2 aria-hidden="true" className="size-4" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogMedia className="bg-destructive/10 text-destructive">
                <Trash2 aria-hidden="true" />
              </AlertDialogMedia>
              <AlertDialogTitle>Delete this resume?</AlertDialogTitle>
              <AlertDialogDescription>
                “{resume.name}” will be removed from this browser. This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep resume</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                onClick={() => onDelete(resume.id)}
              >
                Delete resume
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <BriefcaseBusiness aria-hidden="true" className="size-3.5" />
          {resume.experience.length}{" "}
          {resume.experience.length === 1 ? "role" : "roles"}
        </span>
        <span>
          Last updated{" "}
          <time dateTime={resume.updatedAt}>
            {formatUpdatedAt(resume.updatedAt)}
          </time>
        </span>
      </div>

      <Link
        aria-label={`Open and edit ${resume.name}`}
        className="mt-auto inline-flex w-fit items-center gap-1.5 pt-5 text-sm font-semibold text-primary outline-none transition-colors hover:text-primary/80 focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring"
        href={`/editor/${resume.id}`}
      >
        Open resume
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>
    </article>
  );
}

const ResumesInfo = () => {
  const [resumes, setResumes] = useState<TResume[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const syncResumes = () => setResumes(getResumes());
    syncResumes();
    window.addEventListener(RESUMES_UPDATED_EVENT, syncResumes);
    window.addEventListener("storage", syncResumes);

    return () => {
      window.removeEventListener(RESUMES_UPDATED_EVENT, syncResumes);
      window.removeEventListener("storage", syncResumes);
    };
  }, []);

  const filteredResumes = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return resumes
      .filter((resume) => {
        if (!normalizedQuery) return true;
        return resume.name.toLocaleLowerCase().includes(normalizedQuery);
      })
      .sort((a, b) => {
        const aTime = a.updatedAt ? Date.parse(a.updatedAt) : 0;
        const bTime = b.updatedAt ? Date.parse(b.updatedAt) : 0;
        return bTime - aTime;
      });
  }, [query, resumes]);

  return (
    <main className="py-10 sm:py-14">
      <section className="relative overflow-hidden rounded-3xl border border-border bg-card px-5 py-7 shadow-sm sm:px-8 sm:py-9">
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Your workspace
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              My resumes
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Keep every version in one place. Pick up where you left off or
              create a fresh resume for your next opportunity.
            </p>
            <p className="mt-4 text-sm font-medium text-foreground">
              {resumes.length} {resumes.length === 1 ? "resume" : "resumes"}{" "}
              saved
            </p>
          </div>
          <div className="relative shrink-0">
            <CreateResume />
          </div>
        </div>
      </section>

      <section aria-label="Your resume library" className="mt-8 sm:mt-10">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Resume library
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Search by resume name.
            </p>
          </div>
          {resumes.length > 0 && (
            <div className="relative w-full sm:max-w-sm">
              <CustomInput
                aria-label="Search resumes"
                className="h-full pr-10"
                inputGroupClassName="h-11 rounded-xl bg-card"
                input={searchInput}
                onChange={(event) => setQuery(event.target.value)}
                startAdornment={
                  <Search className="size-4 text-muted-foreground" />
                }
                type="search"
                value={query}
              />
              {query && (
                <Button
                  aria-label="Clear search"
                  className="absolute right-1 top-1/2 size-8 -translate-y-1/2 text-muted-foreground"
                  onClick={() => setQuery("")}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  <X aria-hidden="true" className="size-4" />
                </Button>
              )}
            </div>
          )}
        </div>

        {resumes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-14 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <FileText aria-hidden="true" className="size-5" />
            </span>
            <h3 className="mt-4 text-lg font-semibold">
              Your library is ready
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Create your first resume and it will be saved in this browser for
              you to edit and download whenever you need it.
            </p>
            <div className="mt-5 inline-flex">
              <CreateResume />
            </div>
          </div>
        ) : filteredResumes.length > 0 ? (
          <>
            {query && (
              <p
                className="mb-4 text-xs text-muted-foreground"
                aria-live="polite"
              >
                Showing {filteredResumes.length} of {resumes.length}{" "}
                {resumes.length === 1 ? "resume" : "resumes"}
              </p>
            )}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredResumes.map((resume) => (
                <ResumeCard
                  key={resume.id}
                  onDelete={deleteResume}
                  resume={resume}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-12 text-center">
            <Search
              aria-hidden="true"
              className="mx-auto size-5 text-muted-foreground"
            />
            <h3 className="mt-3 font-semibold">No matching resumes</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try another name, job title, or company.
            </p>
            <Button
              className="mt-4"
              onClick={() => setQuery("")}
              type="button"
              variant="outline"
            >
              Clear search
            </Button>
          </div>
        )}
      </section>
    </main>
  );
};

export default ResumesInfo;
