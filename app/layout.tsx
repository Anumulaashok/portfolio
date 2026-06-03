import type { Metadata } from "next";
import "./globals.css";
import { PortfolioShell } from "@/components/PortfolioShell";

const siteUrl = "https://anumulaashok.dev";

export const metadata: Metadata = {
  title: "Ashok Anumula | Backend & AI Agent Engineer",
  description:
    "Portfolio of Ashok Anumula — Backend Engineer and AI Agent Engineer building scalable systems, intelligent agents, and data-driven products.",
  keywords: [
    "Ashok Anumula",
    "Backend Engineer",
    "AI Agent Engineer",
    "Software Engineer",
    "LangChain",
    "Spring Boot",
    "Node.js",
  ],
  authors: [{ name: "Ashok Anumula" }],
  openGraph: {
    title: "Ashok Anumula | Backend & AI Agent Engineer",
    description:
      "Building scalable backend systems, AI agents, and data-driven products.",
    url: siteUrl,
    siteName: "Ashok Anumula Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Ashok Anumula — Backend & AI Agent Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashok Anumula | Backend & AI Agent Engineer",
    description:
      "Building scalable backend systems, AI agents, and data-driven products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ashok Anumula",
  jobTitle: "Backend Engineer | AI Agent Engineer",
  url: siteUrl,
  sameAs: [
    "https://www.linkedin.com/in/ashoksmart143",
    "https://github.com/Anumulaashok",
  ],
  email: "anumulaashok85@gmail.com",
  knowsAbout: [
    "Java",
    "Spring Boot",
    "Node.js",
    "React",
    "LangChain",
    "AI Agents",
    "Microservices",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Revlitix",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <PortfolioShell>{children}</PortfolioShell>
      </body>
    </html>
  );
}
