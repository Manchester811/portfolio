export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  shortBio: string;
  aboutBio: string[];
  location: string;
  email: string;        // [TODO: replace with your real email]
  github: string;       // [TODO: replace with your real GitHub profile URL]
  linkedin: string;     // [TODO: replace with your real LinkedIn URL]
  resumeUrl: string;    // [TODO: replace public/assets/Rishabh_Jain_Resume.pdf with your real CV]
  avatarUrl: string;    // [TODO: replace /assets/avatar.jpg with your professional photo]
  skillsHandUrl: string;
  status: string;
  stats: {
    label: string;
    value: string;
    subtext: string;
  }[];
}

export const personalData: PersonalInfo = {
  name: "Rishabh Jain",
  role: "Data Science Engineer / AI & ML Developer",
  tagline:
    "Building intelligent systems with data, deep learning & scalable AI architectures.",
  shortBio:
    "Data Science undergraduate passionate about machine learning, predictive analytics, and deploying practical AI solutions that transform complex data into impactful insights.",
  aboutBio: [
    "I am a Computer Science & Engineering (Data Science) undergraduate at VIT Vellore with a strong focus on Machine Learning, Natural Language Processing, and Computer Vision.",
    "My technical journey revolves around developing end-to-end AI applications — from data preprocessing, exploratory data analysis, and feature engineering to training deep neural architectures and deploying scalable APIs.",
    "I thrive at the intersection of mathematical foundations and engineering execution, constantly exploring LLM agents, cybersecurity anomaly detection, and modern web integrations to deliver production-ready intelligent software.",
  ],
  location: "Vellore, India",

  // ── Placeholders — replace with real values ──────────────────────────
  email: "rishabh.jain@example.com",            // [ADD REAL EMAIL]
  github: "https://github.com/Manchester811",    // updated to your GitHub
  linkedin: "https://linkedin.com/in/rishabhjain", // [ADD REAL LINKEDIN URL]
  // ─────────────────────────────────────────────────────────────────────

  resumeUrl: "/assets/Rishabh_Jain_Resume.pdf",
  avatarUrl: "/assets/avatar.jpg",
  skillsHandUrl: "/assets/skills_hand.jpg",
  status: "Open to AI/ML Opportunities & Collaborations",
  stats: [
    { label: "Specialization", value: "Data Science", subtext: "AI & ML Engineering" },
    { label: "Education",      value: "VIT Vellore",  subtext: "B.Tech CSE (DS) '27" },
    { label: "CGPA",           value: "8.13",         subtext: "Academic Standing" },
    { label: "Focus",          value: "Practical AI", subtext: "Production-ready Models" },
  ],
};
