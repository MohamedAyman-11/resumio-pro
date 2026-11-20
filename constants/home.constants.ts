import {
  Check,
  Download,
  FileText,
  LayoutTemplate,
  MonitorSmartphone,
  Moon,
  Sparkles,
} from "lucide-react";
import type {
  HomeFeature,
  HomeLink,
  HomeQuestion,
  HomeStep,
} from "@/types/home.types";

export const navigationLinks: HomeLink[] = [
  { label: "Create Resume", href: "/builder" },
  { label: "Your Resumes", href: "/resumes" },
];

export const footerLinks: HomeLink[] = [
  { label: "Home", href: "/" },
  { label: "Create Resume", href: "/builder" },
  { label: "Your Resumes", href: "/resumes" },
];

export const homeSteps: HomeStep[] = [
  {
    number: "01",
    title: "Bring your story",
    description:
      "Gather your experience, education, and the skills you want employers to remember.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Make it yours",
    description:
      "Arrange your strengths in a clean, professional layout that is easy to scan.",
    icon: LayoutTemplate,
  },
  {
    number: "03",
    title: "Get ready to apply",
    description:
      "Review your resume, then download a polished PDF that is ready to share.",
    icon: Download,
  },
];

export const homeFeatures: HomeFeature[] = [
  {
    title: "Free, always",
    description:
      "Create a professional resume without subscriptions, paywalls, or surprise fees.",
    icon: Check,
  },
  {
    title: "Easy from the first step",
    description:
      "Straightforward prompts help you focus on what to say, not how to design it.",
    icon: Sparkles,
  },
  {
    title: "Designed to be read",
    description:
      "Thoughtful typography and structure put your experience front and center.",
    icon: LayoutTemplate,
  },
  {
    title: "Ready to share",
    description:
      "Take a polished PDF with you, ready to send or print when opportunity calls.",
    icon: Download,
  },
  {
    title: "Your theme, your comfort",
    description: "Choose light or dark mode, or follow your device setting.",
    icon: Moon,
  },
  {
    title: "Fits your screen",
    description: "A comfortable experience on desktop, tablet, and mobile.",
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
      "This homepage does not accept resume information. We will explain how your data is handled before resume creation becomes available.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "You can explore the site without signing in. The resume creation experience is being designed to make getting started straightforward.",
  },
  {
    question: "Is the PDF actually good? Or is it a screenshot?",
    answer:
      "PDF export is part of the planned experience. The goal is a real document with selectable text—not an image of your resume.",
  },
  {
    question: "Are the resumes ATS-friendly?",
    answer:
      "The layouts use readable text and familiar section headings to make your experience clear. Applicant tracking systems vary, so no format can guarantee a particular result.",
  },
  {
    question: "How is this different from Canva or Zety?",
    answer:
      "ResumeKit keeps the focus on resumes: clear steps, professional layouts, and a free, straightforward experience.",
  },
  {
    question: "Does it work offline?",
    answer:
      "You will need an internet connection to visit the website. Offline resume building is not part of this release.",
  },
  {
    question: "Can I create multiple resumes?",
    answer:
      "Managing tailored resumes for different roles is part of the product direction. The resume library is not included in this release.",
  },
];
