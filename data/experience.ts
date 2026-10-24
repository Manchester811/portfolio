export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: string;
  description: string;
  bullets: string[];
  technologies: string[];
}

/**
 * Learning programmes — not employment. This is why the section is labelled
 * "Learning" in the UI: it holds structured programmes, never a job title.
 *
 * The IBM SkillsNetwork programme below is also represented in
 * data/certifications.ts as a credential (it carries a credential ID). The two
 * entries deliberately describe different things — the programme and its labs
 * here, the credential and its verification there — so neither repeats the
 * other's scope.
 */
export const experienceData: ExperienceItem[] = [
  {
    id: "ibm-skillsnetwork",
    role: "Participant / Certified Learner",
    organization: "IBM SkillsNetwork",
    location: "Remote / India",
    period: "2025",
    type: "Learning Program",
    description:
      "Studied foundations of Generative AI — how large language models are built, prompted and applied — through IBM's structured learning programme.",
    bullets: [
      "Worked through hands-on labs in IBM Watson covering model deployment and machine learning workflows.",
    ],
    technologies: ["IBM Watson", "Generative AI", "Machine Learning"],
  },
];
