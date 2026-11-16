/**
 * Challenge 4 helpers: naive/stratified X→Y effects and structure classification.
 * Mirrors the course grader's causal-math rules used by try-causality.
 */

export type CausalStructure = "fork" | "pipe" | "collider" | "direct";

export type CausalRow = { x: number; z: number; y: number };

export type DomainFacts = {
  zTiming: "before-x" | "after-x" | string;
  zInfluencesX: boolean;
};

const VISIBLE = 0.35;

function mean(ys: number[]): number {
  return ys.reduce((a, b) => a + b, 0) / ys.length;
}

/** Overall mean(y|x=1) − mean(y|x=0). */
export function naiveEffect(rows: CausalRow[]): number {
  const y1 = rows.filter((r) => r.x === 1).map((r) => r.y);
  const y0 = rows.filter((r) => r.x === 0).map((r) => r.y);
  return mean(y1) - mean(y0);
}

/** Sample-size–weighted average of within-z naive effects. */
export function stratifiedEffect(rows: CausalRow[]): number {
  let weighted = 0;
  for (const z of [0, 1] as const) {
    const slice = rows.filter((r) => r.z === z);
    if (slice.length === 0) continue;
    weighted += naiveEffect(slice) * slice.length;
  }
  return weighted / rows.length;
}

/**
 * Step 4c rule table: combine effect pattern with domain facts.
 *
 * | naive | strat | timing / influences X | structure |
 * | large | ~0    | Z before X, Z→X       | fork      |
 * | large | ~0    | Z after X, not Z→X    | pipe      |
 * | ~0    | large | Z after X             | collider  |
 * | large | large | similar, not Z→X      | direct    |
 * | large | large | diverge, Z→X          | fork      |
 */
export function classifyStructure(
  naive: number,
  strat: number,
  facts: DomainFacts
): CausalStructure {
  const a = Math.abs(naive);
  const s = Math.abs(strat);
  const gap = Math.abs(naive - strat);

  // Collider: association appears only after stratifying
  if (a <= 0.15 && s >= 0.6) return "collider";

  // Direct: both large and nearly the same
  if (a >= 0.6 && s >= 0.6 && gap <= 0.15) return "direct";

  // Causal fork: both large but diverge (confounder + real X→Y)
  if (a >= 0.6 && s >= 0.6 && gap >= 0.4 && facts.zInfluencesX) return "fork";

  // Pure confound fork vs pipe: large naive, tiny stratified
  if (a >= 0.6 && s <= 0.15) {
    return facts.zInfluencesX ? "fork" : "pipe";
  }

  // Fallbacks from domain facts when numbers are borderline
  if (facts.zInfluencesX) return "fork";
  if (a <= VISIBLE && s > VISIBLE) return "collider";
  if (facts.zTiming === "after-x") return s >= a ? "collider" : "pipe";
  return "direct";
}

export function isCausal(structure: CausalStructure, strat: number): boolean {
  if (structure === "pipe" || structure === "direct") return true;
  if (structure === "fork") return Math.abs(strat) >= VISIBLE;
  return false; // collider
}

export function adviceFor(structure: CausalStructure): "stratify" | "do-not-stratify" {
  return structure === "fork" ? "stratify" : "do-not-stratify";
}

export function reasoningFor(
  structure: CausalStructure,
  causal: boolean,
  advice: "stratify" | "do-not-stratify"
): string {
  if (structure === "fork") {
    return causal
      ? "Z confounds X and Y but a stratified effect remains, so stratify to estimate the causal effect of X."
      : "Z is a common cause of X and Y; the naive gap shrinks when stratified, so stratify on Z.";
  }
  if (structure === "pipe") {
    return "Z is a mediator on the path from X to Y; do not stratify if you want the total effect of X.";
  }
  if (structure === "collider") {
    return "Z is a collider of X and Y; stratifying would invent an association that is not there.";
  }
  return "X affects Y directly and Z is unrelated noise; do not stratify — the naive and stratified effects agree.";
}
