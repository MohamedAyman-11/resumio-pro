import { TResume } from "@/types/resume";
import dayjs from "dayjs";

export { cn } from "cn";
export function getTodayDateValue() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatUpdatedAt(value?: string) {
  if (!value) return "Date unavailable";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return dayjs(date).format("MMM D, YYYY h:mm A");
}

export function getResumeDescription(resume: TResume) {
  const position = resume.personalInfo.position.trim();
  const company = resume.experience[0]?.company.trim();

  if (position && company) return `${position} · ${company}`;
  if (position) return position;
  if (company) return company;
  return "Add a role and experience to bring this resume to life.";
}
