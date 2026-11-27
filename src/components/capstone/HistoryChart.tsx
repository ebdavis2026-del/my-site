import type { CapstoneProbe } from "@/lib/capstone-helpers";

/**
 * Scatter of past days: x = day index, y = cars (or the outcome field).
 * data-capstone="all-data-chart" must carry data-points=history.length.
 */
export function HistoryChart({ probe }: { probe: CapstoneProbe }) {
  const rows = probe.history;
  const values = rows.map((r) => {
    const n = Number(r.cars ?? r.y ?? r.sales ?? r.units ?? Object.values(r).find((v) => typeof v === "number"));
    return Number.isFinite(n) ? n : 0;
  });
  const w = 640;
  const h = 220;
  const pad = 28;
  const minY = Math.min(...values, 0);
  const maxY = Math.max(...values, 1);
  const x = (i: number) => pad + (i / Math.max(rows.length - 1, 1)) * (w - 2 * pad);
  const y = (v: number) => h - pad - ((v - minY) / (maxY - minY || 1)) * (h - 2 * pad);

  return (
    <div
      data-capstone="all-data-chart"
      data-points={rows.length}
      className="mt-3 overflow-x-auto rounded-lg border border-line bg-white p-3"
    >
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" role="img" aria-label="Past history for this decision">
        <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="#94a3b8" />
        <line x1={pad} y1={pad} x2={pad} y2={h - pad} stroke="#94a3b8" />
        {values.map((v, i) => (
          <circle key={i} cx={x(i)} cy={y(v)} r={3.5} fill="#0f766e" opacity={0.85} />
        ))}
      </svg>
      <p className="mt-2 text-sm text-muted">
        Each point is one past day from the history ({rows.length} days).
      </p>
    </div>
  );
}
