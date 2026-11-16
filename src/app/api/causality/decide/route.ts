import { NextResponse } from "next/server";
import {
  adviceFor,
  classifyStructure,
  isCausal,
  naiveEffect,
  reasoningFor,
  stratifiedEffect,
  type CausalRow,
  type DomainFacts,
} from "@/lib/causal-math";

/**
 * Challenge 4 — Causality Audit Service.
 * POST a causality-audit probe; return structure, causal, advice, stratifiedEffect, reasoning.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || body.type !== "causality-audit") {
    return NextResponse.json(
      { error: 'expected a JSON probe with type "causality-audit"' },
      { status: 400 }
    );
  }

  const dataset = body.dataset as CausalRow[] | undefined;
  if (!Array.isArray(dataset) || dataset.length === 0) {
    return NextResponse.json({ error: "expected a non-empty dataset array" }, { status: 400 });
  }

  const facts = (body.context?.domainFacts ?? {
    zTiming: "before-x",
    zInfluencesX: false,
  }) as DomainFacts;

  const naive = naiveEffect(dataset);
  const strat = stratifiedEffect(dataset);
  const structure = classifyStructure(naive, strat, facts);
  const causal = isCausal(structure, strat);
  const advice = adviceFor(structure);

  return NextResponse.json({
    structure,
    causal,
    advice,
    stratifiedEffect: strat,
    reasoning: reasoningFor(structure, causal, advice),
  });
}
