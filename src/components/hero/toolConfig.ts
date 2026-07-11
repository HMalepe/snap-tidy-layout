import scissors from "@/assets/tools/scissors.png";
import comb from "@/assets/tools/comb.png";
import razor from "@/assets/tools/razor.png";
import clipper from "@/assets/tools/clipper.png";
import towel from "@/assets/tools/towel.png";

export type ToolConfig = {
  id: string;
  src: string;
  aspect: number; // width / height
  size: number; // world units of longest side
  // Scatter (start)
  scatter: { x: number; y: number; rotation: number };
  // Target (assembled, symmetric around center)
  target: { x: number; y: number; rotation: number };
  overshoot: number; // back.out overshoot per tool
  delay: number; // 0..1 fraction of the scroll window
};

// Coordinates: world units, camera frames roughly [-5..5] on the smaller axis.
export const TOOLS: ToolConfig[] = [
  {
    id: "scissors",
    src: scissors,
    aspect: 1,
    size: 2.6,
    scatter: { x: -4.8, y: 3.2, rotation: -0.9 },
    target: { x: -3.2, y: 1.6, rotation: -0.35 },
    overshoot: 1.6,
    delay: 0.0,
  },
  {
    id: "comb",
    src: comb,
    aspect: 1,
    size: 2.4,
    scatter: { x: 5.0, y: 3.6, rotation: 1.3 },
    target: { x: 3.2, y: 1.6, rotation: 0.35 },
    overshoot: 2.1,
    delay: 0.09,
  },
  {
    id: "razor",
    src: razor,
    aspect: 1,
    size: 2.8,
    scatter: { x: -5.2, y: -3.4, rotation: 2.1 },
    target: { x: -3.4, y: -1.7, rotation: 0.45 },
    overshoot: 1.4,
    delay: 0.13,
  },
  {
    id: "clipper",
    src: clipper,
    aspect: 1,
    size: 2.7,
    scatter: { x: 4.6, y: -3.8, rotation: -1.6 },
    target: { x: 3.4, y: -1.7, rotation: -0.4 },
    overshoot: 1.9,
    delay: 0.08,
  },
  {
    id: "towel",
    src: towel,
    aspect: 1,
    size: 2.2,
    scatter: { x: 0.2, y: -5.0, rotation: 0.6 },
    target: { x: 0, y: -2.6, rotation: 0 },
    overshoot: 2.2,
    delay: 0.15,
  },
];
