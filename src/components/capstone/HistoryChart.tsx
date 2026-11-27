import type { CapstoneProbe, Row } from "@/lib/capstone-helpers";

const COLORS = ["#0f766e", "#1d4ed8", "#b45309", "#7c3aed", "#be123c", "#047857"];

/** Numeric outcome on a history row (cars, sales, etc.). */
function outcomeValue(row: Row): number {
  for (const key of ["cars", "sales", "units", "revenue", "y", "demand", "profit"]) {
    const n = Number(row[key]);
    if (Number.isFinite(n)) return n;
  }
  for (const v of Object.values(row)) {
    if (typeof v === "number" && Number.isFinite(v)) return v;
  }
  return 0;
}

/** Group label for one history row, by domain shape. */
function groupFor(probe: CapstoneProbe, row: Row): { id: string; label: string } {
  if (row.shop !== undefined && row.patrick !== undefined) {
    const shop = Number(row.shop);
    const withPatrick = Number(row.patrick) === 1;
    return {
      id: `shop-${shop}-${withPatrick ? "with" : "without"}`,
      label: `Shop ${shop}, ${withPatrick ? "Patrick there" : "Patrick away"}`,
    };
  }
  if (row.price !== undefined) {
    return { id: `price-${row.price}`, label: `Price ${row.price}` };
  }
  if (row.channel !== undefined) {
    const spend =
      row.spend !== undefined
        ? `, spend ${row.spend}`
        : row.cost !== undefined
          ? `, cost ${row.cost}`
          : "";
    return { id: `channel-${row.channel}${spend}`, label: `Channel ${row.channel}${spend}` };
  }
  if (row.bakery !== undefined || probe.domain === "inventory") {
    return { id: "bakery", label: "Bakery history" };
  }
  return { id: "all", label: "All past days" };
}

/**
 * One dot per history row, grouped the way the history is structured.
 * Required: data-capstone="all-data-chart" and data-points={history.length}.
 */
export function HistoryChart({ probe }: { probe: CapstoneProbe }) {
  const rows = probe.history;
  const points = rows.map((row, i) => ({
    i,
    value: outcomeValue(row),
    ...groupFor(probe, row),
  }));

  const groups = [...new Map(points.map((p) => [p.id, p.label])).entries()].map(
    ([id, label], gi) => ({
      id,
      label,
      color: COLORS[gi % COLORS.length],
      points: points.filter((p) => p.id === id),
    })
  );

  const values = points.map((p) => p.value);
  const minY = Math.min(...values, 0);
  const maxY = Math.max(...values, 1);
  const w = Math.max(640, groups.length * 140);
  const h = 280;
  const padL = 40;
  const padR = 20;
  const padT = 24;
  const padB = 96;
  const colW = (w - padL - padR) / Math.max(groups.length, 1);
  const y = (v: number) =>
    h - padB - ((v - minY) / (maxY - minY || 1)) * (h - padT - padB);

  return (
    <div
      data-capstone="all-data-chart"
      data-points={rows.length}
      className="mt-3 overflow-x-auto rounded-lg border-2 border-[#0b2545] bg-white p-4 shadow-md"
    >
      <svg
        viewBox={`0 0 ${w} ${h}`}
        width="100%"
        role="img"
        aria-label="Past history, one dot per day, grouped"
      >
        <line x1={padL} y1={h - padB} x2={w - padR} y2={h - padB} stroke="#94a3b8" />
        <line x1={padL} y1={padT} x2={padL} y2={h - padB} stroke="#94a3b8" />
        <text x={8} y={padT + 4} fontSize="11" fill="#64748b">
          {Math.round(maxY)}
        </text>
        <text x={8} y={h - padB} fontSize="11" fill="#64748b">
          {Math.round(minY)}
        </text>

        {groups.map((g, gi) => {
          const cx0 = padL + colW * (gi + 0.5);
          return (
            <g key={g.id}>
              {g.points.map((p, j) => {
                const jitter = ((j % 7) - 3) * 4;
                return (
                  <circle
                    key={p.i}
                    cx={cx0 + jitter}
                    cy={y(p.value)}
                    r={4}
                    fill={g.color}
                    opacity={0.85}
                  />
                );
              })}
              {(() => {
                const parts = g.label.split(", ");
                return parts.map((line, li) => (
                  <text
                    key={li}
                    x={cx0}
                    y={h - padB + 16 + li * 14}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="600"
                    fill="#0f172a"
                  >
                    {line}
                  </text>
                ));
              })()}
              <text
                x={cx0}
                y={h - 14}
                textAnchor="middle"
                fontSize="10"
                fill="#64748b"
              >
                {g.points.length} days
              </text>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-sm text-muted">
        Each dot is one past day ({rows.length} days total), grouped by how the
        history is recorded.
      </p>
    </div>
  );
}
