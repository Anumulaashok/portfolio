/** Bundled portrait (works on localhost + Netlify without external requests) */
/** Primary portrait from portfolio-backup/images/image.png */
export const LOCAL_HERO_PORTRAIT = "/hero/portrait.jpg";
export const LOCAL_HERO_PORTRAIT_FALLBACK = "/hero/portrait.png";

/** Google Drive share link (use via NEXT_PUBLIC_HERO_PORTRAIT_URL if needed) */
export const DEFAULT_HERO_PORTRAIT_SHARE_URL =
  "https://drive.google.com/file/d/1IInLTcd08AEmnU40b_z0ZO8Su2cQNfUq/view?usp=sharing";

const DEFAULT_DRIVE_FILE_ID = "1IInLTcd08AEmnU40b_z0ZO8Su2cQNfUq";

/** Drive thumbnail — may be blocked in some browsers; prefer LOCAL_HERO_PORTRAIT */
export const DRIVE_HERO_PORTRAIT_URL = `https://drive.google.com/thumbnail?id=${DEFAULT_DRIVE_FILE_ID}&sz=w800`;

/**
 * 1. NEXT_PUBLIC_HERO_PORTRAIT_URL if set (local path, URL, or Drive share link)
 * 2. Local /hero/portrait.jpg (reliable default)
 */
export function getHeroPortraitSrc(): string {
  const fromEnv = process.env.NEXT_PUBLIC_HERO_PORTRAIT_URL?.trim();
  if (fromEnv) {
    return resolveHeroPortraitUrl(fromEnv);
  }
  return LOCAL_HERO_PORTRAIT;
}

export function resolveHeroPortraitUrl(raw: string): string {
  if (raw.startsWith("/")) {
    return raw;
  }

  const driveIdMatch = raw.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (driveIdMatch) {
    return `https://drive.google.com/thumbnail?id=${driveIdMatch[1]}&sz=w800`;
  }

  return raw;
}

export function isExternalPortraitSrc(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}
