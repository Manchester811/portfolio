export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  verificationUrl?: string;
}

export const certificationsData: CertificationItem[] = [
  {
    id: "aws-cloud-practitioner",
    name: "AWS Cloud Practitioner Essentials",
    issuer: "AWS Training & Certification",
    issueDate: "Aug 2026",
  },
  {
    id: "qualcomm-ai-upselling",
    name: "AI Upskilling Certificate: Technical Foundation",
    issuer: "Qualcomm Academy",
    issueDate: "Aug 2026",
  },
  {
    id: "tcs-ion-career-edge",
    name: "TCS iON Career Edge — Young Professional",
    issuer: "Tata Consultancy Services",
    issueDate: "Aug 2026",
  },
  {
    id: "generative-ai-ibm",
    name: "Generative AI",
    issuer: "IBM SkillsNetwork / Adroit Pro Learn",
    issueDate: "2025",
    credentialId: "1568ecfcc98a4a2b98ea34c3642c1ad6",
  },
];
