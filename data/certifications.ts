export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  // credentialId intentionally removed — never fabricate IDs
  verificationUrl?: string; // Only add when you have the real URL
  badge: string;
  skills: string[];
}

export const certificationsData: CertificationItem[] = [
  {
    id: "dl-spec",
    name: "Deep Learning Specialization",
    issuer: "DeepLearning.AI (Coursera)",
    issueDate: "2024",
    // verificationUrl: "[ADD REAL VERIFICATION URL]",
    badge: "Deep Learning",
    skills: ["CNNs", "RNNs / LSTMs", "Hyperparameter Tuning", "Attention Models", "TensorFlow"],
  },
  {
    id: "tf-dev",
    name: "TensorFlow Developer Certificate",
    issuer: "DeepLearning.AI / Google",
    issueDate: "2024",
    // verificationUrl: "[ADD REAL VERIFICATION URL]",
    badge: "Computer Vision & NLP",
    skills: ["TensorFlow 2.x", "Image Classification", "NLP", "Time Series Forecasting"],
  },
  {
    id: "ml-spec",
    name: "Machine Learning Specialization",
    issuer: "Stanford Online & DeepLearning.AI",
    issueDate: "2023",
    // verificationUrl: "[ADD REAL VERIFICATION URL]",
    badge: "Supervised & Unsupervised ML",
    skills: ["Linear & Logistic Regression", "Decision Trees", "SVMs", "Clustering", "Scikit-Learn"],
  },
  {
    id: "gcp-cloud",
    name: "Google Cloud Computing Foundations",
    issuer: "Google Cloud Skills Boost",
    issueDate: "2024",
    // verificationUrl: "[ADD REAL VERIFICATION URL]",
    badge: "Cloud & Infrastructure",
    skills: ["GCP Compute Engine", "BigQuery", "Cloud Storage", "Containerized Workloads"],
  },
];
