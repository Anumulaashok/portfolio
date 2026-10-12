// Single source of truth for portfolio copy. Edit here, not in components.
// Every fact below is sourced from Anumula_Ashok_Resume_GenAI_Engineer.pdf —
// do not add numbers, claims or links that aren't on the resume.

export const siteUrl = "https://anumulaashokportfolio.netlify.app";

export const site = {
  name: "Ashok Anumula",
  legalName: "Anumula Ashok",
  role: "Generative AI Engineer",
  tagline: "LLM Agents, RAG & Distributed Systems",
  description:
    "Generative AI Engineer building production LLM agents (LangChain, RAG, Pinecone) and the fault-tolerant distributed systems (Temporal, Kubernetes) they run on.",
  email: "anumulaashok85@gmail.com",
  phoneDisplay: "+91 81794 63267",
  phoneHref: "tel:+918179463267",
  location: "Bengaluru, India",
  linkedin: "https://www.linkedin.com/in/ashoksmart143",
  github: "https://github.com/Anumulaashok",
} as const;

// TODO(ashok): the Drive file is the older "Backend & Distributed Systems" resume — upload the GenAI version as a new version of this same file so these links stay valid.
export const resume = {
  viewUrl:
    "https://drive.google.com/file/d/1ZbHbBSdUzaft32zxKalK__ixA7t-nDsB/view?usp=sharing",
  downloadUrl:
    "https://drive.google.com/uc?export=download&id=1ZbHbBSdUzaft32zxKalK__ixA7t-nDsB",
} as const;

export type NavItem = { label: string; href: string; external?: boolean };

export const navItems: NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Resume", href: resume.viewUrl, external: true },
  { label: "Contact", href: "/#contact" },
];

export const hero = {
  intro: [
    "Generative AI engineer in Bengaluru.",
    "I build LLM agents, RAG pipelines and the fault-tolerant backends they run on.",
    "Currently Software Development Engineer at RagaAI.",
  ],
  headlineSans: "LLM Agents, RAG",
  headlineSerif: "& Distributed Systems",
  primaryCta: { label: "Let's talk", href: "#contact" },
  secondaryCta: { label: "View resume" },
} as const;

export const proof = [
  { value: "3.9", unit: "yrs", label: "building production systems" },
  { value: "~10×", unit: "", label: "faster analytics after the ClickHouse move" },
  { value: "~99%", unit: "", label: "faster batch processing" },
  { value: "3", unit: "", label: "engineers led at RagaAI" },
] as const;

export const about = {
  paragraphs: [
    "I'm a software engineer in Bengaluru with 3.9 years of building production systems in Java, Spring Boot, Node.js and TypeScript.",
    "I came to engineering from a commerce degree through Masai School's full-stack programme in 2022, and I'm now studying for an MCA alongside work.",
    "At RagaAI I own a healthcare collections platform end-to-end and lead a team of 3; before that I built a LangChain agent with RAG over Pinecone at Revlitix.",
    "Outside the day job I build and support two products used by real community groups, and I use Claude Code and Cursor every day.",
  ],
} as const;

export type Role = {
  title: string;
  period: string;
  highlights: string[];
};

export type Employer = {
  company: string;
  location: string;
  roles: Role[];
};

// The first two highlights of each role are shown by default; the rest sit behind "Show details".
export const experience: Employer[] = [
  {
    company: "RagaAI",
    location: "Bengaluru · Healthcare AI",
    roles: [
      {
        title: "Software Development Engineer",
        period: "Dec 2025 — Present",
        highlights: [
          "Own the Collections platform end-to-end: payment workflows, patient reminders, analytics, and eClinicalWorks (EHR) sync, from feature design through production support.",
          "Integrate enterprise systems and external APIs (Stripe, Stedi EDI, EHR, RPA) through fault-tolerant Temporal workflows with retries, concurrency control and idempotency — the same orchestration patterns apply to agentic, long-running AI workflows.",
          "Lead a team of 3 engineers: break down features, guide implementation, and review every change before merge.",
          "Built configuration-driven, multi-tenant services on PostgreSQL, replacing tenant-specific code paths so new client behavior ships without code changes or redeploys.",
          "Debug and resolve production issues across microservices on Kubernetes (GKE) on GCP; built internal tooling for DB migrations, audit logging and ops automation in a regulated domain.",
        ],
      },
    ],
  },
  {
    company: "Revlitix India Pvt. Ltd.",
    location: "Bengaluru · Marketing Analytics SaaS",
    roles: [
      {
        title: "Software Engineer",
        period: "Dec 2023 — Dec 2025",
        highlights: [
          "Owned the full lifecycle of a LangChain-based AI agent framework that turns natural-language questions into charts and analysis over customer marketing data, with real-time SSE streaming to the UI.",
          "Built retrieval and semantic search over platform data using embeddings and a Pinecone vector store to ground agent responses.",
          "Refactored and migrated Java microservices to Node.js and moved reporting to ClickHouse, delivering ~10× faster analytics at lower infra cost.",
          "Designed fault-tolerant data pipelines handling 100K+ daily inserts/updates with RabbitMQ, MongoDB and Redis caching.",
          "Owned backend code review as a quality gate, raising release reliability ~20%; led design reviews (+15% architectural compliance) and mentored junior engineers.",
        ],
      },
      {
        title: "Associate Software Engineer",
        period: "Dec 2022 — Dec 2023",
        highlights: [
          "Cut batch processing time ~99% (10 minutes to seconds) through batch inserts, query optimization and indexing on hot fields.",
          "Built ETL pipelines integrating 12+ external platforms (Google Ads, Meta Ads, LinkedIn, Salesforce, HubSpot, GA4, GSC) — the data-ingestion foundation later used by the AI agent.",
          "Built a reporting engine with 15+ custom chart types and scheduled email insights that lifted platform traffic ~10%.",
        ],
      },
    ],
  },
];

export type SkillGroup = {
  title: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "GenAI",
    skills: [
      "LangChain agents",
      "RAG",
      "Embeddings",
      "Pinecone",
      "NL-to-chart agents",
      "SSE streaming",
      "Claude Code / Cursor",
    ],
  },
  {
    title: "Backend & Data",
    skills: [
      "Java",
      "Spring Boot",
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "MongoDB",
      "ClickHouse",
      "MySQL",
      "REST APIs",
      "Microservices",
    ],
  },
  {
    title: "Infra & Cloud",
    skills: [
      "Temporal",
      "Kafka",
      "RabbitMQ",
      "Redis",
      "Hazelcast",
      "GCP",
      "Kubernetes (GKE)",
      "CI/CD",
      "Vercel",
      "Grafana",
      "Kibana",
    ],
  },
  {
    title: "Mobile / Frontend",
    skills: ["Flutter", "React", "Next.js", "NestJS", "JavaScript"],
  },
];

export type Education = {
  school: string;
  program: string;
  period: string;
  inProgress?: boolean;
};

export const education: Education[] = [
  {
    school: "Manipal University Jaipur",
    program: "Master of Computer Applications (Online)",
    period: "2025 — 2027",
    inProgress: true,
  },
  {
    school: "Masai School",
    program: "Full Stack Web Development",
    period: "2022",
  },
  {
    school: "Government Degree College, Hyderabad",
    program: "Bachelor of Commerce",
    period: "2017 — 2021",
  },
];

export const certificates = [
  {
    name: "Prompt Design in Vertex AI Skill Badge",
    issuer: "Google Cloud",
  },
] as const;

export const contact = {
  heading: "Let's talk",
  intro:
    "Hiring for a Generative AI or AI-focused backend role? Send a note or reach me directly.",
  successMessage: "Thanks — I'll reply within 24 hours.",
  errorMessage:
    "Something went wrong sending your message. It's still here — try again, or email me directly.",
} as const;

export const footer = {
  line: "Let's build something",
} as const;
