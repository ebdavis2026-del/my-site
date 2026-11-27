import type { CapstoneAnswer, CapstoneProbe } from "@/lib/capstone-helpers";

/**
 * Side-by-side ranges for the two options: typical plus the likely band,
 * and a shortfall mark at the reader's limit.
 */
export function OutcomeChart({
  probe,
  answer,
}: {
  probe: CapstoneProbe;
  answer: CapstoneAnswer;
}) {
  const w = 640;
  const h = 200;
  const pad = 40;
  const outcomes = probe.candidates.map((c) => ({
    ...c,
    o: answer.outcomes[c.id],
  }));
  const lows = outcomes.map((c) => c.o?.low ?? 0);
  const highs = outcomes.map((c) => c.o?.high ?? 1);
  const minV = Math.min(...lows, probe.limit.atLeast);
  const maxV = Math.max(...highs, probe.limit.atLeast);
  const x = (v: number) =>
    pad + ((v - minV) / (maxV - minV || 1)) * (w - 2 * pad);
  const limitX = x(probe.limit.atLeast);
  const rowY = [70, 130];

  return (
    <div
      data-capstone="outcome-chart"
      className="mt-3 overflow-x-auto rounded-lg border border-line bg-white p-3"
    >
      <svg
        viewBox={`0 0 ${w} ${h}`}
        width="100%"
        role="img"
        aria-label="Likely results for each option"
      >
        <line x1={limitX} y1={30} x2={limitX} y2={h - 20} stroke="#b91c1c" strokeDasharray="4 3" />
        <text x={limitX + 4} y={24} fontSize="11" fill="#b91c1c">
          need {probe.limit.atLeast.toLocaleString("en-US")}
        </text>
        {outcomes.map((c, i) => {
          const o = c.o;
          if (!o) return null;
          const y = rowY[i] ?? 70 + i * 60;
          return (
            <g key={c.id}>
              <text x={12} y={y - 12} fontSize="13" fill="#0f172a">
                {c.label}
              </text>
              <line
                x1={x(o.low)}
                y1={y}
                x2={x(o.high)}
                y2={y}
                stroke="#0f766e"
                strokeWidth={6}
                strokeLinecap="round"
              />
              <circle cx={x(o.typical)} cy={y} r={7} fill="#0f766e" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
