import type { Metadata } from "next";
import "./globals.css";
import { PortfolioShell } from "@/components/PortfolioShell";

const siteUrl = "https://anumulaashok.dev";

export const metadata: Metadata = {
  title: "Ashok Anumula | Full Stack Software Engineer",
  description:
    "Portfolio of Ashok Anumula — Software Development Engineer at RAGA AI. Previously at Revlitix. Java, Node.js, React, LangChain, RAG, Temporal, ClickHouse, and scalable data platforms.",
  keywords: [
    "Ashok Anumula",
    "Full Stack Software Engineer",
    "Revlitix",
    "RAGA AI",
    "LangChain",
    "RAG",
    "Temporal",
    "ClickHouse",
    "Spring Boot",
    "Node.js",
  ],
  authors: [{ name: "Ashok Anumula" }],
  openGraph: {
    title: "Ashok Anumula | Full Stack Software Engineer",
    description:
      "Building scalable data-driven apps, AI agents, and analytics platforms at Revlitix and RAGA AI.",
    url: siteUrl,
    siteName: "Ashok Anumula Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Ashok Anumula — Full Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashok Anumula | Full Stack Software Engineer",
    description:
      "Building scalable data-driven apps, AI agents, and analytics platforms at Revlitix and RAGA AI.",
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
  jobTitle: "Full Stack Software Engineer",
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
    "RAG",
    "Temporal",
    "ClickHouse",
    "MongoDB",
    "AI Agents",
    "Microservices",
  ],
  worksFor: {
    "@type": "Organization",
    name: "RAGA AI",
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
