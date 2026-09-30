export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  scoreLabel: string;
  highlights: string[];
  coursework: string[];
}

export const educationData: EducationItem[] = [
  {
    degree: "Bachelor of Technology",
    field: "Computer Science and Engineering (Data Science)",
    institution: "Vellore Institute of Technology (VIT)",
    location: "Vellore, Tamil Nadu, India",
    period: "2023 - 2027",
    score: "8.13",
    scoreLabel: "Current CGPA",
    highlights: [
      "Specializing in Data Science, Machine Learning algorithms, and Statistical Computing",
      "Active contributor in student tech teams and AI/ML project hackathons",
      "Hands-on research in neural network architectures and operational technology security"
    ],
    coursework: [
      "Data Structures & Algorithms",
      "Machine Learning & Pattern Recognition",
      "Database Management Systems",
      "Probability & Applied Statistics",
      "Deep Learning Foundations",
      "Object Oriented Programming (Java/Python)"
    ]
  }
];
