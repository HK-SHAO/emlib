import type { LucideIcon } from "lucide-react";
import {
  Binary,
  Braces,
  Calculator,
  Orbit,
  Waypoints,
  Workflow,
} from "lucide-react";

export type DiagramMode = "standard" | "pure";
export type LayoutMode = "dagre" | "elk";

export const DEFAULT_EXPRESSION = "exp(x) - ln(y)";
export const PURE_RENDER_LIMIT = 10000;

export type SectionHighlight = {
  icon: LucideIcon;
};

export const paperHighlights: SectionHighlight[] = [
  { icon: Binary },
  { icon: Waypoints },
  { icon: Orbit },
];

export const emlibCapabilities: SectionHighlight[] = [
  { icon: Braces },
  { icon: Workflow },
  { icon: Calculator },
];
