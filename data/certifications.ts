export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  /**
   * Public verification link for the credential. When present the card renders
   * a "Verify ↗" link. Leave undefined until you have the real URL — nothing
   * is rendered rather than a dead link.
   *
   * TODO(you): paste the four verification URLs below.
   */
  verificationUrl?: string;
}

export const certificationsData: CertificationItem[] = [
  {
    id: "aws-cloud-practitioner",
    name: "AWS Cloud Practitioner Essentials",
    issuer: "AWS Training & Certification",
    issueDate: "Aug 2026",
    // TODO(you): AWS Skill Builder / Credly verification URL.
    verificationUrl: undefined,
  },
  {
    id: "qualcomm-ai-upselling",
    name: "AI Upskilling Certificate: Technical Foundation",
    issuer: "Qualcomm Academy",
    issueDate: "Aug 2026",
    // TODO(you): Qualcomm Academy / Credly verification URL.
    verificationUrl: undefined,
  },
  {
    id: "tcs-ion-career-edge",
    name: "TCS iON Career Edge — Young Professional",
    issuer: "Tata Consultancy Services",
    issueDate: "Aug 2026",
    // TODO(you): TCS iON verification URL.
    verificationUrl: undefined,
  },
  {
    id: "generative-ai-ibm",
    name: "Generative AI",
    issuer: "IBM SkillsNetwork / Adroit Pro Learn",
    issueDate: "2025",
    credentialId: "1568ecfcc98a4a2b98ea34c3642c1ad6",
    // TODO(you): IBM SkillsNetwork / Adroit Pro Learn verification URL.
    verificationUrl: undefined,
  },
];
