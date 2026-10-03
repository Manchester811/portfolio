import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Rishabh Jain — Computer Science Engineer · Data Science",
  description:
    "Portfolio of Rishabh Jain — B.Tech CSE (Data Science) at VIT Vellore. Building and deploying AI applications, developer tools, and data-driven systems.",
  keywords: [
    "Rishabh Jain",
    "Computer Science",
    "Data Science",
    "Machine Learning",
    "Generative AI",
    "VIT Vellore",
    "PCPilot",
    "EvalAI",
    "Next.js Portfolio",
  ],
  authors: [{ name: "Rishabh Jain" }],
  creator: "Rishabh Jain",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-jd2s.vercel.app",
    title: "Rishabh Jain — Computer Science Engineer · Data Science",
    description:
      "B.Tech CSE (Data Science) portfolio of Rishabh Jain — AI applications, developer tools, and data-driven systems.",
    siteName: "Rishabh Jain Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishabh Jain — Computer Science Engineer · Data Science",
    description:
      "B.Tech CSE (Data Science) portfolio of Rishabh Jain — AI applications, developer tools, and data systems.",
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    /*
     * No `scroll-smooth` here: Lenis already owns scroll easing, and a CSS
     * scroll-behavior on the document makes the two compete for the same
     * gesture. It also fights browser/OS reduced-motion preferences.
     */
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans antialiased selection:bg-[var(--accent-primary-muted)] selection:text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
