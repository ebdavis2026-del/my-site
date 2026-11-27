/**
 * Challenge 5 simulator. One run of the recipe, then 10,000 runs summarized
 * into a CapstoneAnswer. Uses only the helpers in capstone-helpers.ts.
 *
 * simulateRun draws every node in order for one possible quarter (or week
 * period). decideAll runs that many times, applies the problem's decision
 * rule, and builds the answer the grader checks.
 */

import {
  type CapstoneAnswer,
  type CapstoneProbe,
  RUNS,
  draw,
  seededRandom,
  summarize,
} from "@/lib/capstone-helpers";

/**
 * One full run of the recipe. Returns each option's result for that run
 * (cars fixed next quarter, revenue, etc.).
 */
export function simulateRun(
  probe: CapstoneProbe,
  rand: () => number
): Record<string, number> {
  const period = Number(probe.scenario.params.periodLength);
  if (!Number.isFinite(period) || period <= 0) {
    throw new Error("scenario.params.periodLength must be a positive number");
  }

  // "once" nodes: drawn once per run (shop averages, etc.).
  const once: Record<string, number> = {};
  for (const n of probe.dag.nodes) {
    if (n.repeat !== "once" || !n.draw) continue;
    once[n.id] = draw(probe, rand, n.id);
  }

  // "daily" / "weekly" nodes: drawn every step; sum them for the period.
  // Example: draw(probe, rand, "cars-shop-1-with", avg1With)
  const stepTotals: Record<string, number> = {};
  for (const n of probe.dag.nodes) {
    if (n.repeat === "daily" || n.repeat === "weekly") stepTotals[n.id] = 0;
  }

  for (let t = 0; t < period; t++) {
    for (const n of probe.dag.nodes) {
      if ((n.repeat !== "daily" && n.repeat !== "weekly") || !n.draw) continue;
      const center =
        typeof n.draw.mean === "string" ? once[n.draw.mean] : undefined;
      stepTotals[n.id] += draw(probe, rand, n.id, center);
    }
  }

  // "result" nodes: sum of the step totals that feed them (via DAG edges).
  const byOption: Record<string, number> = {};
  for (const n of probe.dag.nodes) {
    if (n.repeat !== "result" || !n.option) continue;
    const parents = probe.dag.edges
      .filter(([, to]) => to === n.id)
      .map(([from]) => from);
    byOption[n.option] = parents.reduce(
      (sum, id) => sum + (stepTotals[id] ?? once[id] ?? 0),
      0
    );
  }
  return byOption;
}

/** Run the recipe many times and apply the decision rule. */
export function decideAll(probe: CapstoneProbe): CapstoneAnswer {
  const runs = Number(probe.scenario.params.runs) || RUNS;
  const rand = seededRandom(probe.probeId);
  const ids = probe.candidates.map((c) => c.id);
  const series: Record<string, number[]> = Object.fromEntries(
    ids.map((id) => [id, [] as number[]])
  );

  for (let i = 0; i < runs; i++) {
    const one = simulateRun(probe, rand);
    for (const id of ids) {
      if (typeof one[id] !== "number") {
        throw new Error(`simulateRun did not return a result for option "${id}"`);
      }
      series[id].push(one[id]);
    }
  }

  const outcomes = Object.fromEntries(
    ids.map((id) => [id, summarize(series[id], probe.limit.atLeast)])
  );

  // Decision rule: among options with chanceShort <= maxChance, pick the
  // higher typical. If none qualify, pick the lowest chanceShort.
  const safe = ids.filter((id) => outcomes[id].chanceShort <= probe.limit.maxChance);
  let action: string;
  if (safe.length > 0) {
    action = safe.reduce((best, id) =>
      outcomes[id].typical > outcomes[best].typical ? id : best
    );
  } else {
    action = ids.reduce((best, id) =>
      outcomes[id].chanceShort < outcomes[best].chanceShort ? id : best
    );
  }

  const other = ids.find((id) => id !== action) ?? ids[0];
  let beats = 0;
  for (let i = 0; i < runs; i++) {
    if (series[action][i] > series[other][i]) beats += 1;
  }
  const chanceActionBeatsOther = beats / runs;

  const shortPct = Math.round(outcomes[action].chanceShort * 100);
  const otherShortPct = Math.round(outcomes[other].chanceShort * 100);
  const actionLabel =
    probe.candidates.find((c) => c.id === action)?.label ?? action;
  const otherLabel =
    probe.candidates.find((c) => c.id === other)?.label ?? other;

  const reasoning =
    `${actionLabel} falls short in about ${shortPct} of 100 runs; ` +
    `${otherLabel} falls short in about ${otherShortPct} of 100. ` +
    `Among options that stay within the reader's shortfall limit, ` +
    `${actionLabel} has the stronger typical result.`;

  return { action, outcomes, chanceActionBeatsOther, reasoning };
}

/**
 * Run the recipe many times (same seed every call). Used by the decide
 * route and the /capstone report. Returns null only if simulateRun is missing.
 */
export function simulateAll(
  probe: CapstoneProbe
): Record<string, number[]> | null {
  if (typeof simulateRun !== "function") return null;
  const runs = Number(probe.scenario.params.runs) || RUNS;
  const rand = seededRandom(probe.probeId);
  const results: Record<string, number[]> = Object.fromEntries(
    probe.candidates.map((c) => [c.id, [] as number[]])
  );
  for (let i = 0; i < runs; i++) {
    const run = simulateRun(probe, rand);
    for (const c of probe.candidates) {
      const v = run[c.id];
      if (typeof v !== "number" || !Number.isFinite(v)) {
        throw new Error(
          `simulateRun() gave no number for ${c.id} (Step 4b of the build guide)`
        );
      }
      results[c.id].push(v);
    }
  }
  return results;
}
