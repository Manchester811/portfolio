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

export const experienceData: ExperienceItem[] = [
  {
    id: "ibm-skillsnetwork",
    role: "Participant / Certified Learner",
    organization: "IBM SkillsNetwork",
    location: "Remote / India",
    period: "2025",
    type: "Learning Program",
    description:
      "Studied foundations of Generative AI including large language models, prompt engineering, and AI application development through IBM's structured learning program.",
    bullets: [
      "Completed hands-on labs using IBM Watson tools covering AI model deployment, data visualization, and machine learning workflows.",
    ],
    technologies: [
      "IBM Watson",
      "Generative AI",
      "Data Visualization",
      "Machine Learning",
    ],
  },
];
