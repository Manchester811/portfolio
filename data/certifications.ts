export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  badge: string;
  skills: string[];
}

export const certificationsData: CertificationItem[] = [
  {
    id: "dl-spec",
    name: "Deep Learning Specialization",
    issuer: "DeepLearning.AI (Coursera)",
    issueDate: "2024",
    credentialId: "DL-AI-2024-8841",
    credentialUrl: "https://coursera.org/verify/specialization",
    badge: "Deep Learning",
    skills: ["CNNs", "RNNs/LSTMs", "Hyperparameter Tuning", "Attention Models", "TensorFlow"]
  },
  {
    id: "tf-dev",
    name: "TensorFlow Developer Certificate",
    issuer: "DeepLearning.AI / Google",
    issueDate: "2024",
    credentialId: "TF-CERT-90412",
    credentialUrl: "https://coursera.org/verify",
    badge: "Computer Vision & NLP",
    skills: ["TensorFlow 2.x", "Image Classification", "NLP", "Time Series Forecasting"]
  },
  {
    id: "ml-spec",
    name: "Machine Learning Specialization",
    issuer: "Stanford Online & DeepLearning.AI",
    issueDate: "2023",
    credentialId: "ML-STANFORD-319",
    credentialUrl: "https://coursera.org/verify",
    badge: "Supervised & Unsupervised ML",
    skills: ["Linear & Logistic Regression", "Decision Trees", "SVMs", "Clustering", "Scikit-Learn"]
  },
  {
    id: "gcp-cloud-engineer",
    name: "Google Cloud Computing Foundations",
    issuer: "Google Cloud Skills Boost",
    issueDate: "2024",
    credentialId: "GCP-CSB-4192",
    credentialUrl: "https://cloudskillsboost.google",
    badge: "Cloud & Infrastructure",
    skills: ["GCP Compute Engine", "BigQuery", "Cloud Storage", "Containerized Workloads"]
  }
];
