// Shared, deterministic point distribution for the hero poster and the WebGL field.

export type FieldTone = "slate" | "sage" | "warm" | "cool";

export function seededRandom(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pickTone(r: number): FieldTone {
  if (r < 0.05) return "warm";
  if (r < 0.1) return "cool";
  if (r < 0.56) return "slate";
  return "sage";
}

export const FIELD_SEED = 20251201;

// Mirrors the --field-* tokens in globals.css; the poster is a standalone SVG file so it can't read CSS variables.
const POSTER_TONES: Record<"dark" | "light", Record<FieldTone, string>> = {
  dark: { slate: "#8693a0", sage: "#96a89b", warm: "#e4b363", cool: "#8fb3d9" },
  light: { slate: "#7d8a93", sage: "#8a9a8f", warm: "#b9862c", cool: "#6f93bf" },
};

export function posterSvg(theme: "dark" | "light", width = 1600, height = 1000, count = 520) {
  const rand = seededRandom(FIELD_SEED);
  const circles: string[] = [];
  for (let i = 0; i < count; i++) {
    // Denser toward the right so the text column on the left stays calm.
    const x = Math.round(width * (0.08 + 0.92 * Math.sqrt(rand())));
    const y = Math.round(height * rand());
    const depth = rand();
    const fill = POSTER_TONES[theme][pickTone(rand())];
    circles.push(
      `<circle cx="${x}" cy="${y}" r="${(0.8 + depth * 2.2).toFixed(1)}" fill="${fill}" opacity="${(0.2 + depth * 0.55).toFixed(2)}"/>`
    );
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice">${circles.join("")}</svg>`;
}
