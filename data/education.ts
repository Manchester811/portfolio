export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  scoreLabel: string;
  coursework: string[];
  priorEducation?: { label: string; value: string }[];
}

export const educationData: EducationItem[] = [
  {
    degree: "B.Tech",
    field: "Computer Science and Engineering (Data Science)",
    institution: "Vellore Institute of Technology",
    location: "Vellore, Tamil Nadu",
    period: "Aug 2023 — May 2027",
    score: "8.13",
    scoreLabel: "CGPA / 10",
    coursework: [
      "Foundations of Data Science",
      "Data Structures & Algorithms",
      "Database Management Systems",
      "Machine Learning",
    ],
    priorEducation: [
      { label: "Class XII", value: "74.4%" },
      { label: "Class X", value: "92.4%" },
    ],
  },
];
