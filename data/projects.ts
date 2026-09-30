export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  status: "BUILD COMPLETE" | "RESEARCH / DEMO" | "PRODUCTION READY";
  category: "AI / ML" | "Computer Vision" | "Cybersecurity & Data";
  description: string;
  longDescription: string[];
  keyHighlights: string[];
  technologies: string[];
  image: string;
  githubUrl: string;
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
    id: "resumeiq",
    title: "ResumeIQ",
    subtitle: "AI-Powered Resume Analyzer & ATS Matcher",
    badge: "AI & NLP",
    status: "BUILD COMPLETE",
    category: "AI / ML",
    description: "An intelligent ATS resume evaluator leveraging Google Gemini API and NLP to parse resumes, assess job compatibility, extract candidate competencies, and generate actionable feedback.",
    longDescription: [
      "ResumeIQ revolutionizes the hiring preparation workflow by combining large language models with rule-based natural language processing.",
      "The system extracts key competencies, parses unstructured PDF/DOCX resumes with high fidelity, cross-references requirements against job descriptions, and computes multi-dimensional match scores.",
      "Features interactive radar charts, ATS format warnings, and tailor-made prompt suggestions to optimize candidate resumes for competitive tech roles."
    ],
    keyHighlights: [
      "Gemini API multimodal document parsing & structured output generation",
      "Dynamic ATS compatibility analysis with semantic keyword matching",
      "Interactive radar chart visualization for 6 competency dimensions",
      "Actionable recommendations engine with real-time feedback"
    ],
    technologies: ["Python", "FastAPI", "Google Gemini API", "spaCy", "React", "Next.js", "Tailwind CSS"],
    image: "/assets/resumeiq.jpg",
    githubUrl: "https://github.com/rishabhjain/ResumeIQ",
    liveDemoUrl: "https://resume-iq-ai.vercel.app",
    architectureDetails: {
      modelType: "Gemini 1.5 Pro / Flash + Custom spaCy NER Pipeline",
      datasetOrInput: "Unstructured Resumes (PDF, DOCX) & Job Descriptions",
      metrics: "98% Entity Extraction Accuracy | Sub-second analysis latency",
      backendStack: "FastAPI REST API with asynchronous document worker"
    }
  },
  {
    id: "image-caption-generator",
    title: "Image Caption Generator",
    subtitle: "Deep Neural Vision-Language Model",
    badge: "Computer Vision",
    status: "BUILD COMPLETE",
    category: "Computer Vision",
    description: "End-to-end deep learning pipeline utilizing a CNN encoder (feature extraction) and LSTM decoder (sequential language generation) with attention mechanism to produce accurate natural language descriptions for unseen images.",
    longDescription: [
      "Developed a vision-to-language neural network architecture trained on benchmark image-caption pairs.",
      "A pre-trained Convolutional Neural Network extracts dense spatial feature vectors from images, while a recurrent Long Short-Term Memory (LSTM) network with Bahdanau attention generates contextually coherent sentence descriptions token by token.",
      "Implemented beam search decoding for improved sentence fluency, and deployed via a lightweight web interface for live image inference."
    ],
    keyHighlights: [
      "CNN (ResNet/VGG) feature extractor combined with LSTM recurrent decoder",
      "Attention mechanism dynamically highlighting relevant image regions during token generation",
      "Beam Search decoding algorithm maximizing semantic coherence",
      "Interactive Gradio/Streamlit web demo for instant image drag-and-drop captioning"
    ],
    technologies: ["TensorFlow", "Keras", "Python", "NumPy", "OpenCV", "Gradio", "Google Colab"],
    image: "/assets/caption_generator.jpg",
    githubUrl: "https://github.com/rishabhjain/Image-Caption-Generator",
    liveDemoUrl: "https://huggingface.co/spaces/rishabhjain/image-caption-generator",
    architectureDetails: {
      modelType: "CNN Encoder (Transfer Learning) + Attentive LSTM Decoder",
      datasetOrInput: "Flickr8k / MS-COCO Image-Text Pair Benchmark",
      metrics: "BLEU-4 Score: 0.32 | High Semantic Similarity on Validation",
      backendStack: "TensorFlow 2.x Inference Engine & OpenCV Image Pipeline"
    }
  },
  {
    id: "preemptive-cybersecurity-ot",
    title: "Preemptive Cybersecurity for OT Systems",
    subtitle: "Anomaly Detection & Threat Prevention for Industrial Networks",
    badge: "Industrial AI",
    status: "RESEARCH / DEMO",
    category: "Cybersecurity & Data",
    description: "An AI-driven cybersecurity framework tailored for Operational Technology (OT) and SCADA environments, utilizing unsupervised anomaly detection to identify industrial protocol intrusions before physical impact.",
    longDescription: [
      "Operational Technology (OT) and critical infrastructure systems face unique threat vectors where traditional IT security tools fail due to legacy protocols (Modbus, DNP3).",
      "This project implements machine learning models (Isolation Forests, Autoencoders, and Graph Neural Networks) to model baseline sensor telemetry and network packet flows.",
      "The system detects zero-day anomalies, sensor spoofing, and lateral movement in real time, triggering automated containment strategies before operational disruption occurs."
    ],
    keyHighlights: [
      "Unsupervised anomaly detection using Deep Autoencoders & Isolation Forests",
      "Real-time telemetry stream processing of industrial sensor readings",
      "Low false-positive rate optimized specifically for time-critical SCADA networks",
      "Interactive telemetry dashboard with severity-ranked incident alerts"
    ],
    technologies: ["Python", "Scikit-learn", "TensorFlow", "Pandas", "PostgreSQL", "Docker", "Streamlit"],
    image: "/assets/cybersecurity_ot.jpg",
    githubUrl: "https://github.com/rishabhjain/Preemptive-Cybersecurity-OT",
    liveDemoUrl: "https://ot-cybersecurity-demo.vercel.app",
    architectureDetails: {
      modelType: "Deep Autoencoder + Statistical Isolation Forest Ensemble",
      datasetOrInput: "SWaT & WADI Industrial Testbed Sensor Telemetry",
      metrics: "94.6% F1-Score on Zero-Day Intrusion Sequences",
      backendStack: "Time-series pipeline with PostgreSQL & Dockerized Microservices"
    }
  }
];
