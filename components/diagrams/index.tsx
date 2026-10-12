import type { DiagramId } from "@/content/projects";
import { RagAgentDiagram } from "./RagAgentDiagram";
import { TemporalWorkflowDiagram } from "./TemporalWorkflowDiagram";
import { ChendaVasoolDiagram } from "./ChendaVasoolDiagram";

export const diagrams: Record<DiagramId, () => React.JSX.Element> = {
  ragAgent: RagAgentDiagram,
  temporalWorkflow: TemporalWorkflowDiagram,
  chendaVasool: ChendaVasoolDiagram,
};
