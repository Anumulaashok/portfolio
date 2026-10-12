import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { PortfolioShell } from "@/components/PortfolioShell";
import { site, siteUrl } from "@/content/profile";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["500", "600"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400"],
  display: "swap",
  preload: false,
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: "400",
  style: "italic",
  display: "swap",
  preload: false,
});

const title = `${site.name} — ${site.role}`;
const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Ashok Anumula — Generative AI Engineer building LLM agents, RAG and distributed systems",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: site.description,
  alternates: { canonical: "/" },
  keywords: [
    "Ashok Anumula",
    "Anumula Ashok",
    "Generative AI Engineer",
    "LLM Agents",
    "LangChain",
    "RAG",
    "Pinecone",
    "Temporal",
    "AI Backend Engineer",
  ],
  authors: [{ name: site.name, url: siteUrl }],
  openGraph: {
    title,
    description: site.description,
    url: siteUrl,
    siteName: `${site.name} — Portfolio`,
    locale: "en_US",
    type: "website",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: [ogImage.url],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1c211f" },
    { media: "(prefers-color-scheme: light)", color: "#f2f3ef" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.legalName,
  jobTitle: "Generative AI Engineer",
  url: siteUrl,
  image: `${siteUrl}/og-image.png`,
  sameAs: [site.linkedin, site.github],
  email: `mailto:${site.email}`,
  telephone: "+918179463267",
  address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
  knowsAbout: [
    "LangChain",
    "Retrieval-Augmented Generation",
    "Pinecone",
    "Temporal",
    "Kubernetes",
    "PostgreSQL",
    "Node.js",
    "Java",
  ],
  worksFor: { "@type": "Organization", name: "RagaAI" },
};

// Applies the stored theme before paint; dark is the default.
const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.setAttribute("data-theme",t==="light"?"light":"dark")}catch(e){document.documentElement.setAttribute("data-theme","dark")}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${interTight.variable} ${inter.variable} ${jetbrains.variable} ${instrument.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <PortfolioShell>{children}</PortfolioShell>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VNLJB0DHR4"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-VNLJB0DHR4');`}
        </Script>
      </body>
    </html>
  );
}
