import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050814",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Rishabh Jain — Data Science Engineer | AI/ML Developer",
  description:
    "Portfolio of Rishabh Jain — B.Tech CSE (Data Science) at VIT Vellore. AI/ML engineering, deep learning, NLP pipelines, and production-grade intelligent systems.",
  keywords: [
    "Rishabh Jain",
    "Data Science Engineer",
    "AI Developer",
    "Machine Learning",
    "Deep Learning",
    "VIT Vellore",
    "NLP",
    "TensorFlow",
    "ResumeIQ",
    "Next.js Portfolio",
  ],
  authors: [{ name: "Rishabh Jain" }],
  creator: "Rishabh Jain",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-jd2s.vercel.app",
    title: "Rishabh Jain — Data Science Engineer | AI/ML Developer",
    description:
      "Futuristic portfolio of Rishabh Jain — machine learning systems, deep learning models, and practical AI applications.",
    siteName: "Rishabh Jain Portfolio",
    // Add real OG image: images: [{ url: "/og-image.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishabh Jain — Data Science Engineer | AI/ML Developer",
    description:
      "Futuristic portfolio of Rishabh Jain — ML systems, deep learning, and practical AI.",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#050814] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
