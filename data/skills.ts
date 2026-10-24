export interface SkillItem {
  name: string;
  level?: string;
  iconName?: string;
  tag?: string;
  description?: string;
  /**
   * Set while the skill has no matching project in data/projects.ts. Renders a
   * small marker so the gap is visible; clear it once you add a project or
   * decide the skill stays on its own merit.
   */
  flagged?: boolean;
}

export interface SkillCategory {
  id: string;
  category: string;
  description: string;
  icon: string;
  accentColor: "cyan" | "blue" | "purple" | "emerald" | "amber";
  skills: SkillItem[];
}

/*
 * ─────────────────────────────────────────────────────────────────────────────
 * "Data Visualization" and "EDA" were removed: they are activities/practices,
 * not tools, so they did not belong in a stack list.
 *
 * TODO(you) — skills with NO matching project in data/projects.ts are marked
 * with `flagged: true` below. They are kept for now so you can decide:
 *   Programming & Databases : R, MySQL, PostgreSQL
 *   Data Science & ML       : TensorFlow, Keras
 *   Generative AI & NLP     : NLP
 *   Tools & Deployment      : Docker, Gradio, Google Colab
 * Either add a project that uses them, drop them, or keep them (coursework and
 * daily use are legitimate evidence even without a public repo).
 * Clear the `flagged` flag once you have decided.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const skillCategories: SkillCategory[] = [
  {
    id: "programming-databases",
    category: "Programming & Databases",
    description: "Languages and databases used for problem solving, data, and systems.",
    icon: "Code",
    accentColor: "cyan",
    skills: [
      { name: "Java" },
      { name: "Python" },
      { name: "SQL" },
      { name: "R", flagged: true },
      { name: "MySQL", flagged: true },
      { name: "PostgreSQL", flagged: true },
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
      { name: "TensorFlow", flagged: true },
      { name: "Keras", flagged: true },
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
      { name: "MCP" },
      { name: "NLP", flagged: true },
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
      { name: "Streamlit" },
      { name: "Hugging Face Spaces" },
      { name: "Docker", flagged: true },
      { name: "Gradio", flagged: true },
      { name: "Google Colab", flagged: true },
    ],
  },
];
