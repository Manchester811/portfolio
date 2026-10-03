export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  shortBio: string;
  aboutBio: string[];
  location: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  avatarUrl: string;
  status: string;
  stats: {
    label: string;
    value: string;
    subtext: string;
  }[];
}

export const personalData: PersonalInfo = {
  name: "Rishabh Jain",
  role: "Computer Science Engineer · Data Science",
  tagline:
    "B.Tech Computer Science and Engineering (Data Science) student building and deploying AI applications, developer tools, and data-driven systems.",
  shortBio:
    "I'm a Computer Science and Engineering student specializing in Data Science, with hands-on experience building AI applications, multimodal LLM workflows, and developer tools.",
  aboutBio: [],
  location: "Gwalior, Madhya Pradesh, India",
  phone: "+91-9630486633",
  email: "rishabhkanha007@gmail.com",
  github: "https://github.com/Manchester811",
  linkedin: "https://linkedin.com/in/Manchester811",
  resumeUrl: "/assets/Rishabh_Jain_Resume_5.pdf",
  avatarUrl: "/assets/avatar.jpg",
  status: "Computer Science & Data Science student",
  stats: [
    { label: "Domain", value: "Data Science", subtext: "B.Tech CSE" },
    { label: "Institution", value: "VIT Vellore", subtext: "Tamil Nadu, India" },
    { label: "CGPA", value: "8.13 / 10", subtext: "Current record" },
    { label: "Focus", value: "Applied AI", subtext: "AI apps & dev tools" },
  ],
};
