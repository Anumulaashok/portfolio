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
