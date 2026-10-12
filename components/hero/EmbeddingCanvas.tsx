"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { FIELD_SEED, pickTone, seededRandom, type FieldTone } from "@/lib/field";
import { THEME_EVENT, currentTheme } from "@/lib/theme";

declare global {
  interface Window {
    __fieldFrames?: number;
  }
}

const COUNT = 5000;
const DEPTH = 16;
const CAMERA_Z = 6;
const FOV = 55;
const TONES: FieldTone[] = ["slate", "sage", "warm", "cool"];

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uPull;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aSeed;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 p = position;
    p.z = mod(p.z + uTime * (0.10 + aSeed * 0.12), ${DEPTH.toFixed(1)}) - 12.0;
    p.x += sin(uTime * 0.13 + aSeed * 6.2831) * 0.12;
    p.y += cos(uTime * 0.11 + aSeed * 6.2831) * 0.12;

    // Nearest-neighbour metaphor: points near the cursor ray drift gently toward it.
    float scale = (${CAMERA_Z.toFixed(1)} - p.z) / ${CAMERA_Z.toFixed(1)};
    vec2 target = uPointer * scale;
    vec2 delta = target - p.xy;
    float reach = 2.2 * scale;
    float pull = uPull * (1.0 - smoothstep(0.0, reach, length(delta))) * 0.32;
    p.xy += delta * pull;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * (0.55 + aSeed * 0.9) * uPixelRatio / -mv.z;

    vAlpha = smoothstep(-12.0, -7.5, p.z) * (1.0 - smoothstep(2.0, 3.6, p.z)) * (0.35 + 0.65 * pull / 0.32 + 0.4 * aSeed);
    vColor = aColor;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = (1.0 - smoothstep(0.18, 0.5, d)) * clamp(vAlpha, 0.0, 1.0) * uOpacity;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor, a);
  }
`;

function readPalette(): Record<FieldTone, THREE.Color> {
  const style = getComputedStyle(document.documentElement);
  return Object.fromEntries(
    TONES.map((tone) => [tone, new THREE.Color(style.getPropertyValue(`--field-${tone}`).trim() || "#7e8f84")])
  ) as Record<FieldTone, THREE.Color>;
}

function Field() {
  const { size, gl } = useThree();
  const pointer = useRef({ x: 0, y: 0, active: false });

  const { geometry, tones } = useMemo(() => {
    const rand = seededRandom(FIELD_SEED);
    const positions = new Float32Array(COUNT * 3);
    const seeds = new Float32Array(COUNT);
    const toneList: FieldTone[] = [];
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (rand() * 2 - 1) * 11;
      positions[i * 3 + 1] = (rand() * 2 - 1) * 6.5;
      positions[i * 3 + 2] = rand() * DEPTH;
      seeds[i] = rand();
      toneList.push(pickTone(rand()));
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geo.setAttribute("aColor", new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3));
    return { geometry: geo, tones: toneList };
  }, []);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uPointer: { value: new THREE.Vector2(0, 0) },
          uPull: { value: 0 },
          uSize: { value: 34 },
          uPixelRatio: { value: 1 },
          uOpacity: { value: 0.9 },
        },
      }),
    []
  );

  useEffect(() => {
    const applyTheme = () => {
      const palette = readPalette();
      const attr = geometry.getAttribute("aColor") as THREE.BufferAttribute;
      tones.forEach((tone, i) => {
        const c = palette[tone];
        attr.setXYZ(i, c.r, c.g, c.b);
      });
      attr.needsUpdate = true;
      material.uniforms.uOpacity.value = currentTheme() === "light" ? 0.8 : 1;
    };
    applyTheme();
    window.addEventListener(THEME_EVENT, applyTheme);
    return () => window.removeEventListener(THEME_EVENT, applyTheme);
  }, [geometry, material, tones]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
        active: true,
      };
    };
    const onLeave = () => {
      pointer.current.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((_, delta) => {
    const u = material.uniforms;
    const halfHeight = Math.tan(THREE.MathUtils.degToRad(FOV / 2)) * CAMERA_Z;
    const halfWidth = halfHeight * (size.width / size.height);
    const ease = 1 - Math.exp(-delta * 3);
    u.uTime.value += Math.min(delta, 0.05);
    u.uPixelRatio.value = gl.getPixelRatio();
    u.uPointer.value.x += (pointer.current.x * halfWidth - u.uPointer.value.x) * ease;
    u.uPointer.value.y += (pointer.current.y * halfHeight - u.uPointer.value.y) * ease;
    u.uPull.value += ((pointer.current.active ? 1 : 0) - u.uPull.value) * ease;
    window.__fieldFrames = (window.__fieldFrames ?? 0) + 1;
  });

  return <points geometry={geometry} material={material} />;
}

export default function EmbeddingCanvas() {
  const wrapper = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hero = wrapper.current?.closest("[data-hero]");
    if (ready) hero?.setAttribute("data-field", "live");
    return () => hero?.removeAttribute("data-field");
  }, [ready]);

  return (
    <div
      ref={wrapper}
      aria-hidden="true"
      data-field-canvas
      data-running={visible ? "true" : "false"}
      className={`absolute inset-0 transition-opacity duration-700 ease-out ${ready ? "opacity-100" : "opacity-0"}`}
    >
      <Canvas
        dpr={[1, 1.5]}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0, CAMERA_Z], fov: FOV, near: 0.1, far: 40 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        onCreated={() => window.requestAnimationFrame(() => setReady(true))}
        style={{ pointerEvents: "none" }}
      >
        <Field />
      </Canvas>
    </div>
  );
}
