import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Anumula Ashok — Generative AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#faf7f0",
          color: "#1c2530",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, color: "#b8460f", letterSpacing: 2 }}>
          GENERATIVE AI ENGINEER · LLM AGENTS &amp; DISTRIBUTED SYSTEMS
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, marginTop: 28 }}>
          Anumula Ashok
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#566070", marginTop: 24, maxWidth: 900 }}>
          Production LLM agents (LangChain, RAG) and the fault-tolerant
          distributed systems (Temporal, Kubernetes) they run on.
        </div>
      </div>
    ),
    { ...size }
  );
}
