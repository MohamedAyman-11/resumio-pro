import type { LucideIcon } from "lucide-react";

export type HomeLink = {
  label: string;
  href: string;
};

export type HomeStep = {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type HomeFeature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type HomeQuestion = {
  question: string;
  answer: string;
};
