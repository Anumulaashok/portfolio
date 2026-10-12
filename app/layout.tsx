import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { PortfolioShell } from "@/components/PortfolioShell";
import { site } from "@/content/profile";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono-plex",
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = "https://anumulaashokportfolio.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Anumula Ashok | Generative AI Engineer",
  description:
    "Portfolio of Anumula Ashok — Generative AI Engineer building production LLM agents (LangChain, RAG) and the fault-tolerant distributed systems (Temporal, Kubernetes) they run on.",
  keywords: [
    "Anumula Ashok",
    "Generative AI Engineer",
    "LLM Agents",
    "LangChain",
    "RAG",
    "Temporal",
    "Backend Engineer",
    "Spring Boot",
    "Node.js",
  ],
  authors: [{ name: "Anumula Ashok" }],
  openGraph: {
    title: "Anumula Ashok | Generative AI Engineer",
    description:
      "Production LLM agents (LangChain, RAG) and the fault-tolerant distributed systems (Temporal, Kubernetes) they run on.",
    url: siteUrl,
    siteName: "Anumula Ashok — Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anumula Ashok | Generative AI Engineer",
    description:
      "Production LLM agents (LangChain, RAG) and the fault-tolerant distributed systems (Temporal, Kubernetes) they run on.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Generative AI Engineer | Software Development Engineer",
  url: siteUrl,
  sameAs: [site.linkedin, site.github],
  email: site.email,
  knowsAbout: [
    "LangChain",
    "Retrieval-Augmented Generation",
    "Temporal",
    "Java",
    "Spring Boot",
    "Node.js",
    "Kubernetes",
  ],
  worksFor: {
    "@type": "Organization",
    name: "RagaAI",
  },
};

// Runs before paint to avoid a flash of the wrong theme. Reads only
// localStorage (a per-viewer convenience); the no-JS/no-storage state
// falls back to the prefers-color-scheme media query already in globals.css.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      document.documentElement.setAttribute("data-theme", stored);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VNLJB0DHR4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-VNLJB0DHR4');`}
        </Script>
      </head>
      <body className="antialiased">
        <PortfolioShell>{children}</PortfolioShell>
      </body>
    </html>
  );
}
