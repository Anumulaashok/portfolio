import { FIELD_SEED, pickTone, seededRandom } from "@/lib/field";

const WIDTH = 1600;
const HEIGHT = 1000;
const COUNT = 520;

const points = (() => {
  const rand = seededRandom(FIELD_SEED);
  return Array.from({ length: COUNT }, () => {
    // Denser toward the right so the text column on the left stays calm.
    const x = WIDTH * (0.08 + 0.92 * Math.sqrt(rand()));
    const y = HEIGHT * rand();
    const depth = rand();
    const tone = pickTone(rand());
    return {
      x: Math.round(x),
      y: Math.round(y),
      r: +(0.8 + depth * 2.2).toFixed(1),
      o: +(0.2 + depth * 0.55).toFixed(2),
      tone,
    };
  });
})();

export function FieldPoster() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
    >
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={`var(--field-${p.tone})`} opacity={p.o} />
      ))}
    </svg>
  );
}
