export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  status?: string;
  category: string;
  description: string;
  longDescription: string[];
  keyHighlights: string[];
  technologies: string[];
  image?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  architectureDetails: {
    modelType: string;
    datasetOrInput: string;
    metrics: string;
    backendStack: string;
  };
}

export const projectsData: ProjectItem[] = [
  {
    id: "pcpilot",
    title: "PCPilot",
    subtitle: "AI File-Management MCP Server",
    badge: "MCP Server",
    category: "Developer Tools",
    description:
      "Secure Windows filesystem server built with Python and Model Context Protocol (MCP), enabling AI assistants to automate local file operations.",
    longDescription: [
      "PCPilot is a secure Windows filesystem server built with Python and Model Context Protocol (MCP). It lets AI assistants automate local file operations over a controlled, safety-checked interface.",
      "The server exposes 10 filesystem tools with directory allow-listing, path-traversal prevention, canonical-path validation, and protected-file guards. Reads are capped at 5 MB per file with file-type limits, and the whole experience ships as a one-click .mcpb extension with structured logging.",
    ],
    keyHighlights: [
      "10 filesystem tools",
      "Directory allow-listing",
      "Path-traversal prevention",
      "Canonical-path validation",
      "Protected-file guards",
      "5 MB read / file-type limits",
      "One-click .mcpb extension",
      "Structured logging",
    ],
    technologies: ["Python", "MCP", "pathlib"],
    architectureDetails: {
      modelType: "Python MCP filesystem server",
      datasetOrInput: "Local Windows filesystem",
      metrics: "10 filesystem tools",
      backendStack: "Model Context Protocol (.mcpb)",
    },
  },
  {
    id: "evalai",
    title: "EvalAI",
    subtitle: "AI-Powered Answer Sheet Evaluator",
    badge: "Multimodal AI",
    category: "Generative AI",
    description:
      "Multimodal AI application using Gemini 2.0 Flash to evaluate typed and handwritten answer sheets through image uploads.",
    longDescription: [
      "EvalAI is a multimodal AI application that uses Gemini 2.0 Flash to evaluate both typed and handwritten answer sheets through image uploads.",
      "It supports 8 subjects and returns structured JSON output covering grade, accuracy, concept coverage, and feedback. The app is deployed on Hugging Face Spaces.",
    ],
    keyHighlights: [
      "8 subjects supported",
      "Evaluates typed & handwritten sheets via image upload",
      "Structured JSON output: grade, accuracy, concept coverage, feedback",
      "Deployed on Hugging Face Spaces",
    ],
    technologies: ["Python", "Google Gemini API", "Streamlit", "Pillow"],
    architectureDetails: {
      modelType: "Gemini 2.0 Flash (multimodal)",
      datasetOrInput: "Answer-sheet image uploads",
      metrics: "8 subjects evaluated",
      backendStack: "Streamlit + Hugging Face Spaces",
    },
  },
];
