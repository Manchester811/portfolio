export interface LanguageItem {
  id: string;
  language: string;
  code: string;
  proficiency: string;
  description: string;
  level: "Native" | "Fluent" | "Intermediate" | "Basic";
  percentage: number;
}

export const languagesData: LanguageItem[] = [
  {
    id: "en",
    language: "English",
    code: "EN",
    proficiency: "Full Professional Proficiency",
    description: "Fluent written & spoken communication for technical documentation, research papers, and team collaboration.",
    level: "Fluent",
    percentage: 100
  },
  {
    id: "hi",
    language: "Hindi",
    code: "HI",
    proficiency: "Native Proficiency",
    description: "Native tongue with complete fluency in technical, casual, and formal discourse.",
    level: "Native",
    percentage: 100
  }
];
