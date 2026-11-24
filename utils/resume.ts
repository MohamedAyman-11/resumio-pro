import { TResume } from "@/types/resume";

export const createResume = (resumeName: string): TResume => {
  const newResume: TResume = {
    id: crypto.randomUUID(),
    name: resumeName,
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      position: "",
      profileSummary: "",
      socialLinks: [],
    },
    education: [],
    experience: [],
    internships: [],
    skills: [],
    projects: [],
    languages: [],
    certifications: [],
    volunteering: [],
  };

  return newResume;
};
