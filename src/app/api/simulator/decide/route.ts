import { NextResponse } from "next/server";
import { saveLatest, type CandidateSummary } from "@/lib/simulator-store";

/**
 * Challenge 3 brain. A fair coin flips the staked portion up or down once
 * each year. The candidate with the highest median path is the one whose
 * average log-growth is largest. The mean path is a different question, and
 * betting everything often wins the mean while losing the typical year.
 */
function logGrowth(f: number, u: number, d: number) {
  return 0.5 * Math.log(1 + u * f) + 0.5 * Math.log(1 - d * f);
}

function wealthAfter(buyIn: number, f: number, u: number, d: number, heads: number, years: number) {
  return buyIn * (1 + u * f) ** heads * (1 - d * f) ** (years - heads);
}

function solveGame(game: {
  upPct: number;
  downPct: number;
  horizonYears: number;
  buyIn: number;
  candidateFractions: number[];
}) {
  const u = game.upPct / 100;
  const d = game.downPct / 100;
  const years = game.horizonYears;
  const growth = game.candidateFractions.map((f) => logGrowth(f, u, d));
  const recommendedFraction = game.candidateFractions[growth.indexOf(Math.max(...growth))];

  const candidates: CandidateSummary[] = game.candidateFractions.map((fraction) => {
    const outcomes: { wealth: number; probability: number }[] = [];
    let choose = 1;
    for (let heads = 0; heads <= years; heads++) {
      outcomes.push({
        wealth: wealthAfter(game.buyIn, fraction, u, d, heads, years),
        probability: choose / 2 ** years,
      });
      choose = (choose * (years - heads)) / (heads + 1);
    }
    outcomes.sort((a, b) => a.wealth - b.wealth);
    const at = (q: number) => {
      let cum = 0;
      for (const outcome of outcomes) {
        cum += outcome.probability;
        if (cum >= q) return outcome.wealth;
      }
      return outcomes[outcomes.length - 1].wealth;
    };
    const probLoss = outcomes
      .filter((outcome) => outcome.wealth < game.buyIn)
      .reduce((sum, outcome) => sum + outcome.probability, 0);
    return {
      fraction,
      p5: at(0.05),
      p25: at(0.25),
      median: game.buyIn * Math.exp(years * logGrowth(fraction, u, d)),
      p75: at(0.75),
      p95: at(0.95),
      probLoss,
    };
  });

  const chosen = candidates.find((c) => c.fraction === recommendedFraction)!;
  return {
    answer: {
      recommendedFraction,
      medianFinalBalance: chosen.median,
      probLoss: chosen.probLoss,
      reasoning: `Stake ${recommendedFraction} of the balance each year. Among the candidates, that fraction has the highest median final balance, which is the typical path rather than the average path.`,
    },
    candidates,
  };
}

export async function POST(req: Request) {
  const game = await req.json().catch(() => null);
  if (
    !game ||
    game.type !== "investment-game" ||
    !Array.isArray(game.candidateFractions) ||
    game.candidateFractions.length === 0 ||
    !Number.isFinite(game.upPct) ||
    !Number.isFinite(game.downPct) ||
    !Number.isInteger(game.horizonYears) ||
    game.horizonYears < 1 ||
    game.horizonYears > 60 ||
    !Number.isFinite(game.buyIn)
  ) {
    return NextResponse.json(
      { error: "expected an investment-game with candidates, upPct, downPct, horizonYears, and buyIn" },
      { status: 400 }
    );
  }

  const { answer, candidates } = solveGame(game);
  try {
    await saveLatest(game, answer, candidates);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not save the latest game";
    return NextResponse.json({ error: message }, { status: 500 });
  }
  return NextResponse.json(answer);
}
