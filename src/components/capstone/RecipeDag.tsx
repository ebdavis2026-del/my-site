import type { CapstoneProbe } from "@/lib/capstone-helpers";

/** Simple SVG of the recipe nodes. data-nodes must match dag.nodes.length. */
export function RecipeDag({ probe }: { probe: CapstoneProbe }) {
  const nodes = probe.dag.nodes;
  const cols = 2;
  const w = 640;
  const rowH = 56;
  const h = Math.max(160, Math.ceil(nodes.length / cols) * rowH + 40);

  return (
    <div
      data-capstone="dag"
      data-nodes={nodes.length}
      className="mt-3 overflow-x-auto rounded-lg border border-line bg-white p-3"
    >
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" role="img" aria-label="Recipe for this decision">
        {nodes.map((n, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          const x = 24 + col * (w / cols);
          const y = 28 + row * rowH;
          return (
            <g key={n.id}>
              <rect
                x={x}
                y={y}
                width={w / cols - 40}
                height={40}
                rx={6}
                fill="#ecfeff"
                stroke="#0f766e"
              />
              <text x={x + 10} y={y + 24} fontSize="12" fill="#0f172a">
                {n.plain.length > 42 ? `${n.plain.slice(0, 40)}…` : n.plain}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
