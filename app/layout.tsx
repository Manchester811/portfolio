import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Manrope, Geist_Mono } from "next/font/google";
import { personalConfig, siteConfig } from "@/data/config";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";
import "@/components/reactbits/SpotlightCard.css";
import "@/components/reactbits/GooeyNav.css";

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
  themeColor: "#070707",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  // Base for every relative URL below (canonical, OG image, sitemap).
  metadataBase: new URL(siteConfig.siteUrl),
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.siteUrl,
    siteName: "Rishabh Jain Portfolio",
    title: "Rishabh Jain — Computer Science Engineer · Data Science",
    description:
      "B.Tech CSE (Data Science) portfolio of Rishabh Jain — AI applications, developer tools, and data-driven systems.",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Rishabh Jain — Computer Science Engineer · Data Science",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishabh Jain — Computer Science Engineer · Data Science",
    description:
      "B.Tech CSE (Data Science) portfolio of Rishabh Jain — AI applications, developer tools, and data systems.",
    images: [siteConfig.ogImage],
  },
  /*
   * No `icons` entry on purpose: app/favicon.ico exists, and the App Router
   * file convention serves it at /favicon.ico with its own <link> tag, so an
   * explicit icons key would only duplicate it.
   */
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
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${manrope.variable} ${geistMono.variable}`}
    >
      <head>
        <script id="portfolio-theme" dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans antialiased selection:bg-[var(--accent-primary-muted)] selection:text-[var(--text-primary)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": `${siteConfig.siteUrl}#person`,
              name: siteConfig.name,
              url: siteConfig.siteUrl,
              image: new URL(personalConfig.avatarUrl, siteConfig.siteUrl).toString(),
              jobTitle: siteConfig.role,
              description: personalConfig.shortBio,
              email: siteConfig.email,
              telephone: siteConfig.phone,
              affiliation: {
                "@type": "CollegeOrUniversity",
                name: "Vellore Institute of Technology",
                alternateName: "VIT Vellore",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Vellore",
                addressRegion: "Tamil Nadu",
                addressCountry: "IN",
              },
              sameAs: [siteConfig.github, siteConfig.linkedin],
              knowsAbout: [
                "Data Science",
                "Generative AI",
                "Machine Learning",
                "Developer Tools",
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
