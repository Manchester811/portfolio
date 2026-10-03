export interface SkillItem {
  name: string;
  level?: string;
  iconName?: string;
  tag?: string;
  description?: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  description: string;
  icon: string;
  accentColor: "cyan" | "blue" | "purple" | "emerald" | "amber";
  skills: SkillItem[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "programming-databases",
    category: "Programming & Databases",
    description: "Languages and databases used for problem solving, data, and systems.",
    icon: "Code",
    accentColor: "cyan",
    skills: [
      { name: "Python" },
      { name: "SQL" },
      { name: "R" },
      { name: "Java" },
      { name: "MySQL" },
      { name: "PostgreSQL" },
    ],
  },
  {
    id: "data-science-ml",
    category: "Data Science & ML",
    description: "Data manipulation, statistical modeling, and machine learning.",
    icon: "Database",
    accentColor: "blue",
    skills: [
      { name: "Pandas" },
      { name: "NumPy" },
      { name: "Scikit-learn" },
      { name: "TensorFlow" },
      { name: "Keras" },
      { name: "Data Visualization" },
      { name: "EDA" },
    ],
  },
  {
    id: "generative-ai-nlp",
    category: "Generative AI & NLP",
    description: "Large language models, generative workflows, and natural language processing.",
    icon: "Brain",
    accentColor: "purple",
    skills: [
      { name: "Generative AI" },
      { name: "LLMs" },
      { name: "Google Gemini API" },
      { name: "Prompt Engineering" },
      { name: "NLP" },
      { name: "MCP" },
    ],
  },
  {
    id: "tools-deployment",
    category: "Tools & Deployment",
    description: "Version control, containers, and platforms for shipping AI work.",
    icon: "Server",
    accentColor: "emerald",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Docker" },
      { name: "Streamlit" },
      { name: "Gradio" },
      { name: "Hugging Face Spaces" },
      { name: "Google Colab" },
    ],
  },
];
