import type { CapstoneProbe, DagNode } from "@/lib/capstone-helpers";

type Pos = { x: number; y: number; w: number; h: number; cx: number; cy: number };

function layerOf(n: DagNode): number {
  if (n.repeat === "once") return 0;
  if (n.repeat === "daily" || n.repeat === "weekly") return 1;
  return 2;
}

/** Short box title from the node id (plain words sit in the SVG title tooltip). */
function boxTitle(n: DagNode): string[] {
  const words = n.id.split("-");
  if (words.length <= 2) return [words.join(" ")];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

/**
 * One box per recipe node, one arrow per edge. Drawn as a real DAG (not a
 * tree list): result nodes can take two parents, e.g. Patrick's Shop-1
 * quarter total needs both "Shop 1 with him" and "Shop 2 without him".
 */
export function RecipeDag({ probe }: { probe: CapstoneProbe }) {
  const nodes = probe.dag.nodes;
  const edges = probe.dag.edges;

  const layers: DagNode[][] = [[], [], []];
  for (const n of nodes) layers[Math.min(layerOf(n), 2)].push(n);

  const boxW = 128;
  const boxH = 48;
  const gapX = 72;
  const gapY = 22;
  const padX = 32;
  const padTop = 20;
  const padBottom = 56;
  const maxInLayer = Math.max(1, ...layers.map((L) => L.length));
  const w = padX * 2 + 3 * boxW + 2 * gapX;
  const h = padTop + padBottom + maxInLayer * boxH + (maxInLayer - 1) * gapY;

  const pos = new Map<string, Pos>();
  layers.forEach((layer, li) => {
    const colH = layer.length * boxH + Math.max(0, layer.length - 1) * gapY;
    const startY = padTop + (h - padTop - padBottom - colH) / 2;
    layer.forEach((n, ni) => {
      const x = padX + li * (boxW + gapX);
      const y = startY + ni * (boxH + gapY);
      pos.set(n.id, {
        x,
        y,
        w: boxW,
        h: boxH,
        cx: x + boxW / 2,
        cy: y + boxH / 2,
      });
    });
  });

  const fillFor = (n: DagNode) =>
    n.repeat === "result" ? "#ffedd5" : n.repeat === "once" ? "#ecfeff" : "#e0e7ff";
  const strokeFor = (n: DagNode) =>
    n.repeat === "result" ? "#c2410c" : n.repeat === "once" ? "#0f766e" : "#3730a3";

  return (
    <div
      data-capstone="dag"
      data-nodes={nodes.length}
      className="mt-3 overflow-x-auto rounded-lg border-2 border-[#0b2545] bg-white p-4 shadow-md"
    >
      <svg
        viewBox={`0 0 ${w} ${h}`}
        width="100%"
        role="img"
        aria-label="Recipe as a directed graph: one box per step, one arrow per link"
      >
        <defs>
          <marker
            id="recipe-arrow"
            viewBox="0 0 10 10"
            refX="10"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
          </marker>
        </defs>

        {/* Edges first so boxes sit on top */}
        {edges.map(([from, to], i) => {
          const a = pos.get(from);
          const b = pos.get(to);
          if (!a || !b) return null;
          const x1 = a.x + a.w;
          const y1 = a.cy;
          const x2 = b.x;
          const y2 = b.cy;
          const mx = (x1 + x2) / 2;
          return (
            <path
              key={`${from}->${to}-${i}`}
              d={`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`}
              fill="none"
              stroke="#475569"
              strokeWidth={2}
              markerEnd="url(#recipe-arrow)"
            />
          );
        })}

        {nodes.map((n) => {
          const p = pos.get(n.id);
          if (!p) return null;
          const lines = boxTitle(n);
          return (
            <g key={n.id}>
              <title>{n.plain}</title>
              <rect
                x={p.x}
                y={p.y}
                width={p.w}
                height={p.h}
                rx={8}
                fill={fillFor(n)}
                stroke={strokeFor(n)}
                strokeWidth={2}
              />
              {lines.map((line, li) => (
                <text
                  key={li}
                  x={p.cx}
                  y={p.cy + (li - (lines.length - 1) / 2) * 13}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill="#0f172a"
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        <text x={padX} y={h - 28} fontSize="12" fill="#334155">
          One box per step, one arrow per link — not a list.
        </text>
        <text x={padX} y={h - 12} fontSize="12" fill="#334155">
          A quarter total can take two arrows (both shops), so both matter.
        </text>
      </svg>
    </div>
  );
}
