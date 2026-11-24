import {
  Download,
  Eye,
  FileText,
  FolderKanban,
  LockKeyhole,
  MonitorSmartphone,
  Rows3,
} from "lucide-react";
import type {
  HomeFeature,
  HomeLink,
  HomeQuestion,
  HomeStep,
} from "@/types/home.types";

export const navigationLinks: HomeLink[] = [
  { label: "Features", href: "/features" },
  { label: "Resume guide", href: "/resume-guide" },
  { label: "My resumes", href: "/resumes" },
];

export const footerLinks: HomeLink[] = [
  { label: "Features", href: "/features" },
  { label: "Resume guide", href: "/resume-guide" },
  { label: "My resumes", href: "/resumes" },
];

export const homeSteps: HomeStep[] = [
  {
    number: "01",
    title: "Start with your story",
    description:
      "Add your details once, from your contact information to the experience you want employers to notice.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Build it section by section",
    description:
      "Use focused fields, add the sections that fit your background, and review the live A4 preview as you go.",
    icon: Eye,
  },
  {
    number: "03",
    title: "Download and apply",
    description:
      "Save a real, searchable PDF with selectable text and working links, ready to send or print.",
    icon: Download,
  },
];

export const homeFeatures: HomeFeature[] = [
  {
    title: "A live preview",
    description:
      "See your resume take shape while you edit, with the same clean A4 layout from start to download.",
    icon: Eye,
  },
  {
    title: "All the sections you need",
    description:
      "Add experience, internships, skills, projects, education, certifications, languages, and volunteering.",
    icon: Rows3,
  },
  {
    title: "A real PDF download",
    description:
      "Export selectable, searchable text and clickable links instead of a screenshot of the page.",
    icon: Download,
  },
  {
    title: "Multiple resume versions",
    description:
      "Keep separate resumes for different roles in your personal resume library.",
    icon: FolderKanban,
  },
  {
    title: "Saved in your browser",
    description:
      "Your resume data stays in this browser’s local storage. No account is needed, and there is no cloud sync.",
    icon: LockKeyhole,
  },
  {
    title: "Simple, readable design",
    description:
      "A single-column A4 layout keeps the focus on your experience and makes every section easy to scan.",
    icon: MonitorSmartphone,
  },
];

export const homeQuestions: HomeQuestion[] = [
  {
    question: "Is this actually free? What's the catch?",
    answer:
      "Yes. ResumeKit is designed to keep resume creation free, with no subscriptions or surprise fees.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "Your resumes are stored in local storage in this browser. They are not synced to an account or cloud, so they stay available on this browser and device until its site data is cleared.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. You can create and manage resumes without signing up or sharing an email address.",
  },
  {
    question: "Is the downloaded PDF a screenshot?",
    answer:
      "It is a real A4 PDF with selectable, searchable text and clickable links—not a flattened screenshot.",
  },
  {
    question: "Does the resume work with applicant tracking systems?",
    answer:
      "The single-column layout uses readable text and familiar section headings. Applicant tracking systems vary, so no resume can guarantee a particular result.",
  },
  {
    question: "Can I create more than one resume?",
    answer:
      "Yes. Create separate versions for different roles and manage them from My resumes.",
  },
  {
    question: "Can I share or access a resume on another device?",
    answer:
      "Resume data is stored only in your current browser. Download the PDF to share it, and keep a copy if you need to use another device.",
  },
];
