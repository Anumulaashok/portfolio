"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type SparkDot = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
};

type SparkRay = {
  angle: number;
  length: number;
  maxLength: number;
  growSpeed: number;
  life: number;
  maxLife: number;
  color: string;
  width: number;
};

type TrailDot = {
  x: number;
  y: number;
  life: number;
  maxLife: number;
};

type RocketBurst = {
  id: number;
  startTime: number;
  startX: number;
  startY: number;
  targetY: number;
  launchDuration: number;
  phase: "launch" | "burst";
  flash: number;
  burstX: number;
  burstY: number;
  trails: TrailDot[];
  rays: SparkRay[];
  dots: SparkDot[];
};

const COLORS = [
  "#ff5252",
  "#ff7043",
  "#ffb300",
  "#ffd54f",
  "#ef5350",
  "#ff8a65",
  "#ffc107",
  "#e53935",
];

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createBurst(x: number, y: number) {
  const rayCount = 32 + Math.floor(Math.random() * 16);
  const rays: SparkRay[] = [];

  for (let i = 0; i < rayCount; i++) {
    const angle = (i / rayCount) * Math.PI * 2 + randomBetween(-0.08, 0.08);
    rays.push({
      angle,
      length: 0,
      maxLength: randomBetween(50, 140),
      growSpeed: randomBetween(5, 9),
      life: 0,
      maxLife: randomBetween(28, 48),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      width: randomBetween(0.7, 1.8),
    });
  }

  const dots: SparkDot[] = [];
  const dotCount = 70 + Math.floor(Math.random() * 40);

  for (let i = 0; i < dotCount; i++) {
    const angle = randomBetween(0, Math.PI * 2);
    const speed = randomBetween(0.8, 5.5);
    dots.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: randomBetween(35, 75),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: randomBetween(1.2, 3.2),
    });
  }

  return { rays, dots };
}

function drawRocketHead(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  tick: number
) {
  const pulse = 0.85 + Math.sin(tick * 0.4) * 0.15;

  ctx.beginPath();
  ctx.arc(x, y, 3 * pulse, 0, Math.PI * 2);
  ctx.fillStyle = "#fff8e1";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x, y, 6 * pulse, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 183, 77, 0.35)";
  ctx.fill();
}

function drawTrails(ctx: CanvasRenderingContext2D, trails: TrailDot[]) {
  for (const trail of trails) {
    trail.life += 1;
    const t = trail.life / trail.maxLife;
    if (t >= 1) continue;

    ctx.beginPath();
    ctx.arc(trail.x, trail.y, 2 * (1 - t), 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 167, 38, ${(1 - t) * 0.7})`;
    ctx.fill();
  }
}

type FireworkCanvasProps = {
  bursts: RocketBurst[];
  onComplete: (id: number) => void;
};

function FireworkCanvas({ bursts, onComplete }: FireworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const burstsRef = useRef(bursts);
  const completedRef = useRef<Set<number>>(new Set());

  burstsRef.current = bursts;

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    const ctx = canvas.getContext("2d");
    if (!ctx) return false;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    ctx.clearRect(0, 0, w, h);

    const now = performance.now();
    let hasActive = false;

    for (const burst of burstsRef.current) {
      const elapsed = now - burst.startTime;

      if (elapsed < 0) {
        hasActive = true;
        continue;
      }

      if (burst.phase === "launch") {
        hasActive = true;
        const progress = Math.min(elapsed / burst.launchDuration, 1);
        const eased = 1 - Math.pow(1 - progress, 2.6);
        const rocketY = burst.startY + (burst.targetY - burst.startY) * eased;
        const wobble = Math.sin(elapsed * 0.012) * 4;
        const rocketX = burst.startX + wobble;

        burst.trails.push({
          x: rocketX + randomBetween(-1, 1),
          y: rocketY + randomBetween(2, 8),
          life: 0,
          maxLife: randomBetween(12, 22),
        });

        if (burst.trails.length > 40) {
          burst.trails.splice(0, burst.trails.length - 40);
        }

        drawTrails(ctx, burst.trails);
        drawRocketHead(ctx, rocketX, rocketY, elapsed);

        if (progress >= 1) {
          burst.phase = "burst";
          burst.flash = 1;
          burst.burstX = rocketX;
          burst.burstY = rocketY;
          const { rays, dots } = createBurst(rocketX, rocketY);
          burst.rays = rays;
          burst.dots = dots;
        }

        continue;
      }

      if (burst.flash > 0) {
        hasActive = true;
        ctx.beginPath();
        ctx.arc(
          burst.burstX,
          burst.burstY,
          24 + (1 - burst.flash) * 48,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 236, 179, ${burst.flash * 0.25})`;
        ctx.fill();
        burst.flash -= 0.1;
      }

      let aliveRays = 0;

      for (const ray of burst.rays) {
        ray.life += 1;
        if (ray.life >= ray.maxLife) continue;

        aliveRays += 1;
        ray.length = Math.min(ray.maxLength, ray.length + ray.growSpeed);

        const t = ray.life / ray.maxLife;
        const alpha = (1 - t) * 0.9;
        const x2 = burst.burstX + Math.cos(ray.angle) * ray.length;
        const y2 = burst.burstY + Math.sin(ray.angle) * ray.length;

        ctx.globalAlpha = alpha;
        ctx.strokeStyle = ray.color;
        ctx.lineWidth = ray.width;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(burst.burstX, burst.burstY);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x2, y2, ray.width, 0, Math.PI * 2);
        ctx.fillStyle = ray.color;
        ctx.fill();
      }

      let aliveDots = 0;

      for (const dot of burst.dots) {
        dot.life += 1;
        if (dot.life >= dot.maxLife) continue;

        aliveDots += 1;
        dot.vx *= 0.98;
        dot.vy *= 0.98;
        dot.vy += 0.04;
        dot.x += dot.vx;
        dot.y += dot.vy;

        const t = dot.life / dot.maxLife;
        const alpha = (1 - t) * 0.85;

        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size * (1 - t * 0.35), 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      if (aliveRays > 0 || aliveDots > 0 || burst.flash > 0) {
        hasActive = true;
      } else if (!completedRef.current.has(burst.id)) {
        completedRef.current.add(burst.id);
        onComplete(burst.id);
      }
    }

    return hasActive;
  }, [onComplete]);

  useEffect(() => {
    let frameId = 0;
    let running = true;

    const loop = () => {
      if (!running) return;
      const active = animate();
      if (active || burstsRef.current.length > 0) {
        frameId = requestAnimationFrame(loop);
      }
    };

    frameId = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(frameId);
    };
  }, [animate, bursts]);

  if (bursts.length === 0) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9998]"
      aria-hidden
    />
  );
}

export type CrackerBurst = RocketBurst;

export function createCrackerBursts(count: 1 | 2): CrackerBurst[] {
  const w = typeof window !== "undefined" ? window.innerWidth : 1200;
  const h = typeof window !== "undefined" ? window.innerHeight : 800;

  return Array.from({ length: count }, (_, i) => ({
    id: Date.now() + i + Math.random() * 1000,
    startTime: performance.now() + i * 320,
    startX: w * randomBetween(0.18, 0.82),
    startY: h + 24,
    targetY: h * randomBetween(0.12, 0.42),
    launchDuration: randomBetween(850, 1150),
    phase: "launch" as const,
    flash: 0,
    burstX: 0,
    burstY: 0,
    trails: [],
    rays: [],
    dots: [],
  }));
}

export function getRandomCrackerCount(): 1 | 2 {
  return Math.random() < 0.5 ? 1 : 2;
}

type OverlayProps = {
  bursts: CrackerBurst[];
  onComplete: (id: number) => void;
};

export function CrackerBurstOverlay({ bursts, onComplete }: OverlayProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || bursts.length === 0) return null;

  return createPortal(
    <FireworkCanvas bursts={bursts} onComplete={onComplete} />,
    document.body
  );
}
