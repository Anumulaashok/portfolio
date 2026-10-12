export function RagAgentDiagram() {
  return (
    <svg
      viewBox="0 0 640 220"
      role="img"
      aria-labelledby="rag-diagram-title rag-diagram-desc"
      className="w-full"
    >
      <title id="rag-diagram-title">LLM analytics agent architecture</title>
      <desc id="rag-diagram-desc">
        A user question flows from the UI to a LangChain agent. The agent
        queries a Pinecone vector store for relevant embedded data, reasons
        over the result, and streams its answer back to the UI over
        Server-Sent Events.
      </desc>
      <defs>
        <marker
          id="rag-arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--muted)" />
        </marker>
      </defs>

      {[
        { x: 10, y: 80, w: 120, h: 60, label: "UI", sub: "chart request" },
        { x: 180, y: 80, w: 150, h: 60, label: "LangChain agent", sub: "reasoning" },
        { x: 380, y: 10, w: 150, h: 60, label: "Pinecone", sub: "vector store" },
        { x: 380, y: 150, w: 150, h: 60, label: "ClickHouse", sub: "indexed data" },
        { x: 580, y: 80, w: 50, h: 60, label: "", sub: "" },
      ].map((box, i) =>
        box.label ? (
          <g key={i}>
            <rect
              x={box.x}
              y={box.y}
              width={box.w}
              height={box.h}
              rx={8}
              fill="var(--bg)"
              stroke="var(--muted)"
            />
            <text
              x={box.x + box.w / 2}
              y={box.y + box.h / 2 - 4}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="13"
              fill="var(--ink)"
            >
              {box.label}
            </text>
            <text
              x={box.x + box.w / 2}
              y={box.y + box.h / 2 + 14}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="10"
              fill="var(--muted)"
            >
              {box.sub}
            </text>
          </g>
        ) : null
      )}

      <line x1="130" y1="110" x2="178" y2="110" stroke="var(--muted)" markerEnd="url(#rag-arrow)" />
      <line x1="330" y1="95" x2="378" y2="45" stroke="var(--muted)" markerEnd="url(#rag-arrow)" />
      <line x1="330" y1="120" x2="378" y2="170" stroke="var(--muted)" markerEnd="url(#rag-arrow)" />
      <line x1="325" y1="150" x2="178" y2="130" stroke="var(--accent)" strokeDasharray="4 3" markerEnd="url(#rag-arrow)" />

      <text x="252" y="185" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="var(--accent)">
        SSE stream → UI
      </text>
    </svg>
  );
}
