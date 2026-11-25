import { TResume } from "@/types/resume";

const RESUMES_STORAGE_KEY = "resumes";
export const RESUMES_UPDATED_EVENT = "resumio:resumes-updated";

const notifyResumesUpdated = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(RESUMES_UPDATED_EVENT));
  }
};

export const getResumes = (): TResume[] => {
  if (typeof window === "undefined") return [];

  const resumes = localStorage.getItem(RESUMES_STORAGE_KEY);
  if (!resumes) return [];

  const parsedResumes = JSON.parse(resumes) as TResume[];
  const needsTimestamp = parsedResumes.some((resume) => !resume.updatedAt);

  if (!needsTimestamp) return parsedResumes;

  const timestamp = new Date().toISOString();
  const migratedResumes = parsedResumes.map((resume) =>
    resume.updatedAt ? resume : { ...resume, updatedAt: timestamp },
  );
  localStorage.setItem(RESUMES_STORAGE_KEY, JSON.stringify(migratedResumes));

  return migratedResumes;
};

export const saveResumes = (resume: TResume) => {
  if (typeof window === "undefined") return;
  const resumes = getResumes();
  const now = new Date().toISOString();
  resumes.unshift({ ...resume, createdAt: now, updatedAt: now });
  localStorage.setItem(RESUMES_STORAGE_KEY, JSON.stringify(resumes));
  notifyResumesUpdated();
};

export const updateResume = (updatedResume: TResume) => {
  if (typeof window === "undefined") return;

  const resumes = getResumes().map((resume) => {
    if (resume.id !== updatedResume.id) return resume;

    return {
      ...updatedResume,
      createdAt: resume.createdAt,
      updatedAt: new Date().toISOString(),
    };
  });
  localStorage.setItem(RESUMES_STORAGE_KEY, JSON.stringify(resumes));
  notifyResumesUpdated();
};

export const deleteResume = (resumeId: string) => {
  if (typeof window === "undefined") return;

  const resumes = getResumes().filter((resume) => resume.id !== resumeId);
  localStorage.setItem(RESUMES_STORAGE_KEY, JSON.stringify(resumes));
  notifyResumesUpdated();
};
