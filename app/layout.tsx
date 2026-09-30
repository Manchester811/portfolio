import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#050814",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Rishabh Jain | Data Science Engineer & AI/ML Developer",
  description:
    "Portfolio of Rishabh Jain - B.Tech CSE (Data Science) undergraduate at VIT Vellore. Showcasing AI/ML engineering, deep neural networks, NLP pipelines, and practical machine learning applications.",
  keywords: [
    "Rishabh Jain",
    "Data Science Engineer",
    "AI Developer",
    "Machine Learning Engineer",
    "VIT Vellore",
    "ResumeIQ",
    "Deep Learning",
    "TensorFlow",
    "Next.js Portfolio",
  ],
  authors: [{ name: "Rishabh Jain" }],
  creator: "Rishabh Jain",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rishabhjain-portfolio.vercel.app",
    title: "Rishabh Jain | Data Science Engineer & AI/ML Developer",
    description:
      "Futuristic portfolio of Rishabh Jain, showcasing machine learning systems, deep learning models, and practical AI applications.",
    siteName: "Rishabh Jain Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishabh Jain | Data Science Engineer & AI/ML Developer",
    description:
      "Futuristic portfolio of Rishabh Jain, showcasing machine learning systems, deep learning models, and practical AI applications.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen bg-[#050814] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
