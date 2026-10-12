// Single source of truth for portfolio copy. Edit here, not in components.
// Every fact below is sourced from Anumula_Ashok_Resume_GenAI_Engineer.pdf —
// do not add numbers, claims or links that aren't on the resume.

export const site = {
  name: "Anumula Ashok",
  role: "Generative AI Engineer",
  tagline: "LLM Agents & Distributed Systems",
  email: "anumulaashok85@gmail.com",
  phone: "+91 8179463267",
  location: "Bengaluru, India",
  linkedin: "https://www.linkedin.com/in/ashoksmart143",
  github: "https://github.com/Anumulaashok",
  resumeFile: "/Anumula_Ashok_Resume.pdf",
} as const;

export const hero = {
  eyebrow: "Generative AI Engineer · LLM Agents & Distributed Systems",
  name: "Anumula Ashok",
  supportingLine:
    "I build production LLM agents and the fault-tolerant backends they run on: a LangChain + RAG analytics agent at Revlitix, and Temporal workflow orchestration at RagaAI.",
  proofRow: [
    { value: "3.9", label: "years in production software" },
    { value: "10×", label: "faster analytics (ClickHouse)" },
    { value: "~99%", label: "faster batch processing" },
    { value: "3", label: "engineers led" },
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
          "Built configuration-driven, multi-tenant services on PostgreSQL, replacing tenant-specific code paths so new client behavior ships without code changes or redeploys.",
          "Debug and resolve production issues across microservices on Kubernetes (GKE); built internal tooling for DB migrations, audit logging and ops automation in a regulated domain.",
          "Lead a team of 3 engineers: break down features, guide implementation, and review every change before merge.",
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
      "Retrieval-Augmented Generation",
      "Embeddings",
      "Pinecone",
      "NL-to-chart agents",
      "Streaming LLM responses (SSE)",
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
      "MongoDB",
      "ClickHouse",
      "Prisma",
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
      "GCP",
      "Kubernetes (GKE)",
      "CI/CD",
      "Grafana",
      "Kibana",
    ],
  },
  {
    title: "Frontend & Mobile",
    skills: ["React", "Next.js", "NestJS", "Flutter", "JavaScript"],
  },
];

export type Education = {
  school: string;
  program: string;
  period: string;
  location: string;
  inProgress?: boolean;
};

export const education: Education[] = [
  {
    school: "Manipal University Jaipur",
    program: "Master of Computer Applications (Online)",
    period: "2025 — 2027",
    location: "Online",
    inProgress: true,
  },
  {
    school: "Masai School",
    program: "Full Stack Web Development",
    period: "2022",
    location: "Remote",
  },
  {
    school: "Government Degree College",
    program: "Bachelor of Commerce",
    period: "2017 — 2021",
    location: "Hyderabad, India",
  },
];

export type CaseStudy = {
  slug: string;
  title: string;
  company: string;
  summary: string;
  context: string;
  problem: string;
  role: string;
  architecture: string;
  decisions: string[];
  results: string[];
  stack: string[];
  nextSteps: string;
  diagram: "ragAgent" | "temporalWorkflow" | "chendaVasool";
  liveUrl?: string;
  storeUrl?: string;
  storeLabel?: string;
  storeNote?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "llm-analytics-agent",
    title: "LLM analytics agent with RAG",
    company: "Revlitix",
    summary:
      "A LangChain agent that turns natural-language questions into charts over customer marketing data, grounded with RAG over a Pinecone vector store.",
    context:
      "Revlitix is a marketing analytics SaaS platform. Customers had raw campaign data from 12+ ad and CRM platforms but no fast way to ask questions of it without waiting on a dashboard or an analyst.",
    problem:
      "Build a conversational interface where a marketer could type a plain-language question and get back the right chart, grounded in that customer's actual data — not a hallucinated answer.",
    role:
      "Owned the full lifecycle of the agent framework: design, implementation, and production operation.",
    architecture:
      "A LangChain-based agent sits between the UI and the data layer. User questions are embedded and matched against a Pinecone vector store holding indexed platform data, so the agent retrieves only the relevant slice of a customer's data before reasoning over it. The agent's response streams back to the UI over Server-Sent Events, so chart data renders incrementally instead of waiting on a single blocking response. The retrieval layer sits on top of the same data pipelines built during the ETL/ClickHouse work, so the agent reasons over already fast, already-indexed data rather than re-querying raw sources.",
    decisions: [
      "Chose RAG over fine-tuning: customer data changes constantly, so retrieval over a vector store kept answers current without retraining.",
      "Streamed responses over SSE instead of waiting for a complete answer, since chart-building queries could take several seconds end-to-end and a blank screen reads as broken.",
      "Grounded retrieval in per-customer data boundaries so one tenant's agent session could never surface another tenant's data.",
    ],
    results: [
      "Reporting workloads this agent reads from moved to ClickHouse, delivering ~10× faster analytics at lower infra cost.",
      "Shipped and operated in production as part of Revlitix's analytics product.",
    ],
    stack: ["LangChain", "Pinecone", "Embeddings", "SSE", "Node.js", "ClickHouse"],
    nextSteps:
      "TODO(ashok): add anything you'd do differently now — e.g. evaluation/observability for agent responses, or a second retrieval index — if there's a concrete next step you want recorded here.",
    diagram: "ragAgent",
  },
  {
    slug: "temporal-workflow-platform",
    title: "Fault-tolerant workflow platform on Temporal",
    company: "RagaAI",
    summary:
      "A Temporal-orchestrated Collections platform integrating payments, EHR sync and EDI claims processing with retries, concurrency control and idempotency.",
    context:
      "RagaAI's Collections platform handles healthcare billing workflows: patient payment collection, reminders, and syncing with eClinicalWorks (EHR). These workflows touch external systems (Stripe, Stedi EDI, EHR, RPA) that can fail, rate-limit, or respond slowly — and in a regulated healthcare domain, workflows can't silently fail or double-charge a patient.",
    problem:
      "Build an orchestration layer where a multi-step billing workflow — spanning several third-party systems — either completes correctly or fails safely, with every step auditable and no duplicate side effects on retry.",
    role:
      "Own the Collections platform end-to-end — architecture, feature design, and production support — and lead a team of 3 engineers on it.",
    architecture:
      "Temporal workflows coordinate multi-step processes (payment collection, reminders, EHR sync) across external systems, with built-in retries, concurrency control and idempotency so a failed step can be safely retried without re-triggering side effects like a duplicate charge. Tenant-specific behavior is config-driven on top of multi-tenant PostgreSQL, so new client behavior ships without code changes or redeploys. The whole system runs on Kubernetes (GKE), with internal tooling for DB migrations and audit logging to support traceability in a regulated domain.",
    decisions: [
      "Used Temporal instead of hand-rolled retry/queue logic, since workflows needed durable state across steps that could take minutes to hours (e.g. waiting on an EHR sync).",
      "Made tenant behavior config-driven rather than branching in code, so onboarding a new client's payment/reminder rules doesn't require a deploy.",
      "Built idempotency into each workflow step deliberately, since a retried step touching Stripe or an EDI clearinghouse must never double-execute.",
    ],
    results: [
      "Replaced tenant-specific code paths with configuration, so new client behavior ships without code changes or redeploys.",
      "Currently in production, under active ownership and support.",
    ],
    stack: ["Temporal", "PostgreSQL", "Kubernetes (GKE)", "Stripe", "Stedi EDI", "GCP"],
    nextSteps:
      "TODO(ashok): add anything you'd do differently now, or a planned next step for this platform, if you want it recorded here.",
    diagram: "temporalWorkflow",
  },
  {
    slug: "chenda-vasool",
    title: "Chenda Vasool — digital collection platform",
    company: "Independent — live product",
    summary:
      "A Flutter + Next.js collection and account-book app for community organizations, with UPI QR collections, numbered PDF receipts, and a multi-org RBAC model.",
    context:
      "Community organizations (chit funds, associations) collect cash and UPI payments from members by hand, with paper receipt books and no shared record of who paid what.",
    problem:
      "Give field collectors a mobile app to record collections on the spot, and give treasurers a web dashboard with a single source of truth — without either side re-entering data.",
    role:
      "Independently designed, built and shipped the full product — mobile app, web app, and backend — and support live organizations using it.",
    architecture:
      "A Flutter Android app (currently in Google Play's testing track) lets field collectors record cash and UPI QR collections on the spot. A Next.js web app, deployed on Vercel, gives treasurers a live dashboard, expense tracking, and CSV/PDF reports. Both clients share one NestJS + Prisma + PostgreSQL backend, with a multi-org data model and role-based access control (owner, admin, collector, accountant) so each organization's data stays isolated.",
    decisions: [
      "Shared one backend across the Flutter and Next.js clients instead of building separate APIs, to keep collection records and receipts consistent across both surfaces.",
      "Modeled organizations as first-class tenants with RBAC from the start, since the product needed to onboard multiple independent organizations, not just one.",
      "Generated numbered PDF receipts server-side so a receipt number can never be reused or skipped across devices.",
    ],
    results: [
      "Live and in use by real organizations, with ongoing onboarding and support.",
      "Web app live at chendavasool.com; Android app in Google Play's testing track.",
    ],
    stack: ["Flutter", "Next.js", "NestJS", "Prisma", "PostgreSQL"],
    nextSteps:
      "TODO(ashok): add anything you'd do differently now, or a planned next feature, if you want it recorded here.",
    diagram: "chendaVasool",
    liveUrl: "https://chendavasool.com",
    storeUrl: "https://play.google.com/apps/testing/com.chendavasool.chenda_vasool",
    storeLabel: "Join Android beta (Google Play testing)",
    storeNote: "Opt in with your Google account, then install from Play Store.",
  },
];

export type OtherProject = {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  note?: string;
};

export const otherProjects: OtherProject[] = [
  {
    title: "Youth Management (People's Youth)",
    description:
      "Multi-tenant SaaS for youth associations and self-help groups to manage contributions, pooled funds and group loans. Rule-driven dues/penalty engine, loan approval and repayment, PDF receipts, audit trail, Excel export, and automated WhatsApp/email reminders via scheduled cron jobs.",
    tags: ["Next.js", "NextAuth", "Prisma", "PostgreSQL", "Upstash Redis"],
    liveUrl: "https://youthmanagment.com",
    note: "Used by live groups — 350+ payments and 20 loans tracked.",
  },
  {
    title: "AI Agent Platform",
    description:
      "Multi-agent orchestration platform with LangChain, enabling autonomous task execution, tool use and conversational workflows.",
    tags: ["LangChain", "Node.js", "RAG", "AI Agents"],
    note: "Company project — architecture under NDA, no public link.",
  },
  {
    title: "Analytics Engine",
    description:
      "Real-time analytics pipeline processing high-volume event streams with custom dashboards.",
    tags: ["Java", "Spring Boot", "MongoDB", "React"],
    note: "Company project — architecture under NDA, no public link.",
  },
  {
    title: "Workflow Builder",
    description:
      "Visual workflow automation tool for designing, deploying and monitoring business processes without code.",
    tags: ["Node.js", "React", "REST APIs", "Automation"],
    note: "Company project — architecture under NDA, no public link.",
  },
];

export const certificates = [
  {
    name: "Prompt Design in Vertex AI Skill Badge",
    issuer: "Google Cloud",
  },
] as const;
