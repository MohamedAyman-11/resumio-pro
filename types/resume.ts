export type Platform =
  | "LinkedIn"
  | "GitHub"
  | "Twitter"
  | "Medium"
  | "Portfolio"
  | "Other";

export type SocialLink = {
  id: string;
  platform: Platform;
  customPlatform?: string;
  url: string;
};

export type PersonalInfo = {
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  phone: string;
  address: string;
  profileSummary: string;
  socialLinks: SocialLink[];
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  location: string;
  gpa: string;
  startDate: string;
  endDate: string | null;
  present: boolean;
  description?: string;
  achievements?: string[];
};

export type Experience = {
  id: string;
  position: string;
  company: string;
  location: string;
  companyWebsite?: string;
  startDate: string;
  endDate: string | null;
  present: boolean;
  description?: string;
  achievements?: string[];
};

export type Internship = Experience;

export type Skill = {
  id: string;
  category: string;
  description: string;
};

export type ProjectLink = {
  id: string;
  label: string;
  url: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  links?: ProjectLink[];
  technologies: string;
  startDate: string;
  endDate: string | null;
  present: boolean;
  achievements?: string[];
};

export type LanguageLevel =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Fluent"
  | "Native";

export type Language = {
  id: string;
  name: string;
  level: LanguageLevel;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  url?: string;
  description?: string;
};

export type Volunteering = {
  id: string;
  organization: string;
  position: string;
  location: string;
  organizationWebsite?: string;
  startDate: string;
  endDate: string | null;
  present: boolean;
  description?: string;
  achievements: string[];
};

export type TResume = {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  internships: Internship[];
  skills: Skill[];
  projects: Project[];
  languages: Language[];
  certifications: Certification[];
  volunteering: Volunteering[];
};
