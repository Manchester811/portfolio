export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: "Internship" | "Research" | "Academic Project";
  description: string;
  bullets: string[];
  technologies: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: "ai-research",
    role: "Machine Learning & Security Project Lead",
    organization: "VIT Vellore Research Initiative",
    location: "Vellore, India",
    period: "2024 - Present",
    type: "Research",
    description: "Leading research on applying unsupervised anomaly detection algorithms to industrial control network telemetry.",
    bullets: [
      "Engineered Deep Autoencoder and Isolation Forest architectures detecting cyber-physical attack vectors on SCADA protocols.",
      "Curated and preprocessed time-series telemetry from benchmark industrial datasets (SWaT & WADI).",
      "Drafted technical reports evaluating precision, latency, and false-alarm mitigation under high-throughput data streams."
    ],
    technologies: ["Python", "TensorFlow", "Scikit-Learn", "Pandas", "Time-Series Analysis"]
  },
  {
    id: "data-science-developer",
    role: "AI Developer & Open Source Contributor",
    organization: "Technical Club & Independent Projects",
    location: "Vellore, India",
    period: "2023 - 2024",
    type: "Academic Project",
    description: "Designed, trained, and deployed interactive AI applications leveraging multimodal LLMs and deep learning.",
    bullets: [
      "Built ResumeIQ utilizing the Gemini API and custom NLP pipelines to evaluate candidate resume compatibility against real job specs.",
      "Trained CNN-LSTM models for automated image caption generation with attention visualization.",
      "Containerized microservices with Docker and exposed REST APIs with FastAPI for responsive client-side consumption."
    ],
    technologies: ["Python", "FastAPI", "Gemini API", "Docker", "Next.js", "spaCy"]
  }
];
