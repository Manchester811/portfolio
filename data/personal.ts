import { personalConfig } from "./config";

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

export const personalData: PersonalInfo = personalConfig;
