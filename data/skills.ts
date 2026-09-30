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
    id: "programming",
    category: "Programming Languages",
    description: "Core languages for algorithmic problem solving, backend systems, and data pipelines.",
    icon: "Code",
    accentColor: "cyan",
    skills: [
      { name: "Python", tag: "Primary", description: "NumPy, SciPy, OOP, AsyncIO, PyTorch/TF ecosystem" },
      { name: "Java", tag: "Core", description: "Data Structures, Algorithms, Object-Oriented Design" },
      { name: "C", tag: "Foundational", description: "Memory management, pointers, systems programming" },
      { name: "SQL", tag: "Database", description: "Complex joins, indexing, query optimization, schemas" }
    ]
  },
  {
    id: "ai-ml",
    category: "Artificial Intelligence & Machine Learning",
    description: "Neural network architectures, statistical modeling, NLP pipelines, and LLM integrations.",
    icon: "Brain",
    accentColor: "purple",
    skills: [
      { name: "TensorFlow", tag: "Deep Learning", description: "Sequential & functional APIs, custom training loops" },
      { name: "Keras", tag: "Framework", description: "High-level neural layer compositions, transfer learning" },
      { name: "Scikit-learn", tag: "Classic ML", description: "Classification, regression, clustering, model pipelines" },
      { name: "spaCy", tag: "NLP", description: "Named entity recognition, tokenization, POS tagging" },
      { name: "Hugging Face", tag: "Transformers", description: "BERT, RoBERTa, pipeline inference, tokenizers" },
      { name: "Google Gemini API", tag: "Generative AI", description: "Multimodal prompts, structured outputs, agent tool calling" }
    ]
  },
  {
    id: "data-engineering",
    category: "Data Engineering & Analytics",
    description: "High-volume data manipulation, statistical analysis, and relational data warehousing.",
    icon: "Database",
    accentColor: "blue",
    skills: [
      { name: "Pandas", tag: "Manipulation", description: "DataFrame operations, ETL workflows, aggregations" },
      { name: "NumPy", tag: "Computation", description: "Vectorized linear algebra, tensor broadcasting, matrix ops" },
      { name: "PostgreSQL", tag: "RDBMS", description: "ACID compliance, JSONB support, relational modeling" },
      { name: "MySQL", tag: "Relational", description: "Normalized schemas, transactional queries, performance tuning" }
    ]
  },
  {
    id: "web-deployment",
    category: "Web & Model Deployment",
    description: "Full-stack interfaces, microservice APIs, containerization, and interactive AI demos.",
    icon: "Server",
    accentColor: "emerald",
    skills: [
      { name: "FastAPI", tag: "Backend API", description: "High-throughput asynchronous REST endpoints for ML models" },
      { name: "Next.js", tag: "Frontend", description: "React 19 App Router, SSR, Server Actions, modern UI" },
      { name: "React", tag: "UI Library", description: "Component state, custom hooks, interactive dashboards" },
      { name: "Docker", tag: "Containers", description: "Multi-stage Dockerfiles, microservice containerization" },
      { name: "Streamlit", tag: "Rapid Prototyping", description: "Quick interactive ML dashboard prototyping & charts" },
      { name: "Gradio", tag: "Demo Apps", description: "Web UI wrappers for vision & NLP model demos" }
    ]
  },
  {
    id: "developer-tools",
    category: "Developer Tools & AI Ecosystem",
    description: "Version control, agentic protocols, prompt engineering, and collaborative tooling.",
    icon: "Wrench",
    accentColor: "amber",
    skills: [
      { name: "Git", tag: "VCS", description: "Branching workflows, rebasing, version management" },
      { name: "GitHub", tag: "Collaboration", description: "Actions CI/CD, issue tracking, open-source repos" },
      { name: "VS Code", tag: "IDE", description: "Configured debugging, extensions, remote containers" },
      { name: "Google Colab", tag: "Cloud GPU", description: "T4/A100 GPU acceleration for training deep models" },
      { name: "MCP", tag: "Agent Protocol", description: "Model Context Protocol for autonomous AI tooling" },
      { name: "Prompt Engineering", tag: "LLM Techniques", description: "Few-shot prompting, chain-of-thought, system prompts" }
    ]
  }
];
