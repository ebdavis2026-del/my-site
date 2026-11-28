import type { CapstoneProbe, DagNode } from "@/lib/capstone-helpers";

type Pos = { x: number; y: number; w: number; h: number; cx: number; cy: number };

/**
 * Short names shown inside each box (SVG text does not wrap).
 * Edit these plain words — not ids, formulas, or draw-field numbers.
 * Full plain sentences are listed under the drawing with matching numbers.
 */
const SHORT_NAME: Record<string, string> = {
  "avg-shop-1-with": "Shop 1's average, with Patrick",
  "avg-shop-2-without": "Shop 2's average, without him",
  "avg-shop-1-without": "Shop 1's average, without him",
  "avg-shop-2-with": "Shop 2's average, with Patrick",
  "cars-shop-1-with": "Shop 1's day, with Patrick",
  "cars-shop-2-without": "Shop 2's day, without him",
  "cars-shop-1-without": "Shop 1's day, without him",
  "cars-shop-2-with": "Shop 2's day, with Patrick",
  "total-shop-1": "Total if he works at Shop 1",
  "total-shop-2": "Total if he works at Shop 2",
};

/** Patrick middle-row order: each result's two feeders sit together, no crossings. */
const PATRICK_MIDDLE = [
  "cars-shop-1-with",
  "cars-shop-2-without",
  "cars-shop-1-without",
  "cars-shop-2-with",
] as const;

function rowOf(n: DagNode): number {
  if (n.repeat === "once") return 0;
  if (n.repeat === "daily" || n.repeat === "weekly") return 1;
  return 2;
}

function shortName(n: DagNode): string {
  if (SHORT_NAME[n.id]) return SHORT_NAME[n.id];
  // Other domains: plain words from the id, never draw-field numbers.
  const words = n.id.replace(/-/g, " ");
  return words.length > 28 ? `${words.slice(0, 26)}…` : words;
}

function boxLines(num: number, n: DagNode): string[] {
  const name = shortName(n);
  const head = `${num}. ${name}`;
  if (head.length <= 24) return [head];
  const parts = name.split(", ");
  if (parts.length === 2) return [`${num}. ${parts[0]},`, parts[1]];
  const words = head.split(" ");
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

/**
 * Three rows from probe.dag: once → daily/weekly → result.
 * Order so each result sits under the nodes that feed it.
 */
function orderRows(probe: CapstoneProbe): DagNode[][] {
  const byId = new Map(probe.dag.nodes.map((n) => [n.id, n]));
  const parentsOf = (childId: string) =>
    probe.dag.edges.filter(([, to]) => to === childId).map(([from]) => from);

  const results = probe.candidates
    .map((c) => probe.dag.nodes.find((n) => n.repeat === "result" && n.option === c.id))
    .filter((n): n is DagNode => Boolean(n));
  const resultNodes =
    results.length > 0 ? results : probe.dag.nodes.filter((n) => n.repeat === "result");

  const hasPatrick = PATRICK_MIDDLE.every((id) => byId.has(id));
  let middleIds: string[];
  if (hasPatrick) {
    middleIds = [...PATRICK_MIDDLE];
  } else {
    middleIds = [];
    for (const r of resultNodes) {
      for (const p of parentsOf(r.id)) {
        const n = byId.get(p);
        if (n && rowOf(n) === 1 && !middleIds.includes(p)) middleIds.push(p);
      }
    }
    for (const n of probe.dag.nodes) {
      if (rowOf(n) === 1 && !middleIds.includes(n.id)) middleIds.push(n.id);
    }
  }

  const topIds: string[] = [];
  for (const midId of middleIds) {
    for (const id of parentsOf(midId)) {
      if (byId.get(id)?.repeat === "once" && !topIds.includes(id)) topIds.push(id);
    }
  }
  for (const n of probe.dag.nodes) {
    if (n.repeat === "once" && !topIds.includes(n.id)) topIds.push(n.id);
  }

  return [
    topIds.map((id) => byId.get(id)!).filter(Boolean),
    middleIds.map((id) => byId.get(id)!).filter(Boolean),
    resultNodes,
  ];
}

/**
 * Recipe as a DAG in plain SVG: one box per node, one arrow per edge,
 * three rows (once / daily|weekly / result), numbered short names in
 * boxes, full plain sentences listed under the drawing.
 */
export function RecipeDag({ probe }: { probe: CapstoneProbe }) {
  const nodes = probe.dag.nodes;
  const edges = probe.dag.edges;
  const rows = orderRows(probe);

  const boxW = 140;
  const boxH = 48;
  const gapX = 16;
  const gapY = 56;
  const padX = 24;
  const padTop = 20;
  const padBottom = 40;
  const slotCount = Math.max(rows[0].length, rows[1].length, 1);
  const slotW = boxW + gapX;
  const rowSpan = slotCount * boxW + (slotCount - 1) * gapX;
  const w = padX * 2 + rowSpan;
  const h = padTop + padBottom + 3 * boxH + 2 * gapY;
  const originX = padX;

  const numberOf = new Map<string, number>();
  let nextNum = 1;
  for (const row of rows) {
    for (const n of row) numberOf.set(n.id, nextNum++);
  }

  const pos = new Map<string, Pos>();

  const placeInSlots = (row: DagNode[], ri: number) => {
    const y = padTop + ri * (boxH + gapY);
    row.forEach((n, ni) => {
      let slot = ni;
      if (ri === 0 && rows[1].length > 0) {
        const midIdx = rows[1].findIndex(
          (m) =>
            edges.some(([from, to]) => from === n.id && to === m.id) ||
            m.id.replace(/^cars/, "avg") === n.id
        );
        if (midIdx >= 0) slot = midIdx;
      }
      const x = originX + slot * slotW;
      pos.set(n.id, {
        x,
        y,
        w: boxW,
        h: boxH,
        cx: x + boxW / 2,
        cy: y + boxH / 2,
      });
    });
  };

  placeInSlots(rows[0], 0);
  placeInSlots(rows[1], 1);

  const yResult = padTop + 2 * (boxH + gapY);
  for (const r of rows[2]) {
    const feeders = edges
      .filter(([, to]) => to === r.id)
      .map(([from]) => pos.get(from))
      .filter((p): p is Pos => Boolean(p));
    const cx =
      feeders.length > 0
        ? feeders.reduce((s, p) => s + p.cx, 0) / feeders.length
        : w / 2;
    const x = cx - boxW / 2;
    pos.set(r.id, { x, y: yResult, w: boxW, h: boxH, cx, cy: yResult + boxH / 2 });
  }

  const fillFor = (n: DagNode) =>
    n.repeat === "result" ? "#ffedd5" : n.repeat === "once" ? "#ecfeff" : "#e0e7ff";
  const strokeFor = (n: DagNode) =>
    n.repeat === "result" ? "#c2410c" : n.repeat === "once" ? "#0f766e" : "#3730a3";

  const legend = [...numberOf.entries()]
    .sort((a, b) => a[1] - b[1])
    .map(([id, num]) => {
      const n = nodes.find((x) => x.id === id)!;
      return { num, plain: n.plain };
    });

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
        aria-label="Recipe as a directed graph: once on top, daily in the middle, result at the bottom"
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

        {edges.map(([from, to], i) => {
          const a = pos.get(from);
          const b = pos.get(to);
          if (!a || !b) return null;
          const x1 = a.cx;
          const y1 = a.y + a.h;
          const x2 = b.cx;
          const y2 = b.y;
          const my = (y1 + y2) / 2;
          return (
            <path
              key={`${from}->${to}-${i}`}
              d={`M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`}
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
          const num = numberOf.get(n.id) ?? 0;
          const lines = boxLines(num, n);
          return (
            <g key={n.id}>
              <title>{`${num}. ${n.plain}`}</title>
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
                  fontSize="11"
                  fontWeight="600"
                  fill="#0f172a"
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </svg>

      <ol className="mt-4 list-none space-y-2 text-sm text-[#0f172a]">
        {legend.map((item) => (
          <li key={item.num}>
            <span className="font-semibold">{item.num}.</span> {item.plain}
          </li>
        ))}
      </ol>
    </div>
  );
}
