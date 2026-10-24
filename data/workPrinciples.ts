export interface WorkPrinciple {
  id: string;
  title: string;
  description: string;
}

export const workPrinciples: WorkPrinciple[] = [
  {
    id: "ground-work-in-data",
    title: "Ground work in data",
    description:
      "Treat data, models, and structured workflows as the starting point for intelligent systems.",
  },
  {
    id: "keep-systems-useful",
    title: "Keep systems useful",
    description:
      "Focus AI applications and developer tools on a clear, practical use.",
  },
  {
    id: "make-behavior-explicit",
    title: "Make behavior explicit",
    description:
      "Use validation, safe operations, structured logging, and meaningful errors where they fit the system.",
  },
  {
    id: "learn-by-building",
    title: "Learn by building",
    description:
      "Pair structured study with hands-on labs and project work.",
  },
];
