import { resume, site } from "./profile";

export type Command = {
  id: string;
  label: string;
  group: "Jump to" | "Contact" | "Resume" | "Preferences";
  hint?: string;
} & (
  | { kind: "navigate"; href: string }
  | { kind: "external"; href: string }
  | { kind: "copy"; value: string; toast: string }
  | { kind: "theme" }
);

export const commands: Command[] = [
  { id: "work", label: "Selected work", group: "Jump to", kind: "navigate", href: "/#work" },
  { id: "experience", label: "Experience", group: "Jump to", kind: "navigate", href: "/#experience" },
  { id: "skills", label: "Skills", group: "Jump to", kind: "navigate", href: "/#skills" },
  { id: "about", label: "About", group: "Jump to", kind: "navigate", href: "/#about" },
  { id: "contact", label: "Contact form", group: "Jump to", kind: "navigate", href: "/#contact" },
  {
    id: "copy-email",
    label: "Copy email address",
    hint: site.email,
    group: "Contact",
    kind: "copy",
    value: site.email,
    toast: "Email copied to clipboard",
  },
  { id: "email", label: "Send an email", hint: site.email, group: "Contact", kind: "external", href: `mailto:${site.email}` },
  { id: "call", label: "Call phone", hint: site.phoneDisplay, group: "Contact", kind: "external", href: site.phoneHref },
  { id: "linkedin", label: "Open LinkedIn", group: "Contact", kind: "external", href: site.linkedin },
  { id: "github", label: "Open GitHub", group: "Contact", kind: "external", href: site.github },
  { id: "resume-view", label: "Open resume", hint: "Google Drive", group: "Resume", kind: "external", href: resume.viewUrl },
  { id: "resume-download", label: "Download resume (PDF)", group: "Resume", kind: "external", href: resume.downloadUrl },
  { id: "theme", label: "Toggle light / dark theme", group: "Preferences", kind: "theme" },
];
