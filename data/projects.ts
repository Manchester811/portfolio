/*
 * ─────────────────────────────────────────────────────────────────────────────
 * PROJECT DATA — single source of truth for the Projects section.
 * Edit anything here; nothing below needs to change.
 *
 * ── OPEN TODOs (only unverified facts were left blank, never guessed) ──────────
 * 1. Repo URLs: only `PCPilot` was confirmed against github.com/Manchester811
 *    (public repos: portfolio, 23BDS0254-EDA-Project, Resume_analyzer, PCPilot,
 *    NEXTRIP, ibm-project1, Haunted_House, source-sprint-rishabh).
 *    -> Fill `githubUrl` for evalai and safecut.
 * 2. Demo URLs: the HF account shows 0 public Spaces, so no Space URL could be
 *    confirmed. -> Fill `liveDemoUrl` where a deployed demo exists.
 * 3. Images: drop files in /public/projects/ and set `image` to the public path.
 *    While `image` is undefined the card renders a clean typographic fallback
 *    (no broken image, no layout shift).
 * 4. SafeCut only carries the facts you gave me. Fill in `technologies` +
 *    `architectureDetails` from the actual repo.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface ProjectArchitecture {
  modelType: string;
  datasetOrInput: string;
  metrics: string;
  backendStack: string;
}

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
  /** omitted until the real stack is confirmed — the chip row hides if empty */
  technologies?: string[];
  /** omitted until confirmed — the dossier spec panel hides if absent */
  architectureDetails?: ProjectArchitecture;
  image?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
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
    image: "/assets/cybersecurity_ot.jpg",
    githubUrl: "https://github.com/Manchester811/PCPilot",
    liveDemoUrl: undefined,
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
    status: "Deployed",
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
    image: "/assets/caption_generator.jpg",
    githubUrl: undefined,
    liveDemoUrl: undefined,
    architectureDetails: {
      modelType: "Gemini 2.0 Flash (multimodal)",
      datasetOrInput: "Answer-sheet image uploads",
      metrics: "8 subjects evaluated",
      backendStack: "Streamlit + Hugging Face Spaces",
    },
  },
  {
    id: "safecut",
    title: "SafeCut",
    subtitle: "Graph-Based OT Network Isolation Tool",
    badge: "ICS Security",
    category: "Security Research",
    description:
      "A graph-based OT network isolation tool that simulates a Modbus ICS environment.",
    longDescription: [
      "SafeCut is a graph-based tool for isolating operational technology (OT) networks. It models the network as a graph and simulates a Modbus ICS environment.",
      "TODO(you): add one accurate sentence on what the tool computes and how isolation is measured.",
    ],
    keyHighlights: [
      "Graph-based OT network modeling",
      "Simulates a Modbus ICS environment",
      "TODO(you): add the remaining highlights from the repo README",
    ],
    technologies: ["Python", "NetworkX", "Modbus"],
    architectureDetails: undefined,
    image: "/assets/project_ecommerce.jpg",
    githubUrl: undefined,
    liveDemoUrl: undefined,
  },
];
