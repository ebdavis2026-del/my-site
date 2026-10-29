import { ComingSoon } from "@/components/ComingSoon";
import { CandidateOutcomes } from "@/components/simulator/CandidateOutcomes";
import { loadLatest } from "@/lib/simulator-store";

export const metadata = { title: "Decision Simulator" };
export const dynamic = "force-dynamic";

export default async function SimulatorPage() {
  const latest = await loadLatest();
  if (!latest) {
    return (
      <ComingSoon
        lane={3}
        title="Decision Simulator"
        description="A service that simulates investment games and recommends the growth-optimal stake. Built after Lane 3."
      />
    );
  }

  const answer = latest.answer;
  const buyIn = Number(latest.problem.buyIn);

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
        Lane 3 · live decision service
      </p>
      <h1 className="mt-3 text-4xl font-bold">Decision Simulator</h1>
      <p className="mt-4 max-w-prose text-lg">
        This service picks the stake fraction whose typical, median path grows the most.
      </p>

      <section className="about-shade hue-line mt-8">
        <h2 className="text-2xl">Latest recommendation</h2>
        <p className="mt-3 text-lg">{String(latest.problem.scenario ?? "")}</p>
        <p className="mt-4 text-lg">
          Recommended stake:{" "}
          <strong data-simulator="recommended-fraction">{String(answer.recommendedFraction)}</strong>
        </p>
        <p className="mt-2 text-lg">
          Median final balance:{" "}
          <strong data-simulator="median-final">{String(answer.medianFinalBalance)}</strong>
        </p>
        <p className="mt-2 text-lg">
          Probability of ending below the buy-in:{" "}
          <strong data-simulator="prob-loss">{String(answer.probLoss)}</strong>
        </p>
        <p className="mt-4 max-w-prose">{String(answer.reasoning ?? "")}</p>
      </section>

      <CandidateOutcomes
        candidates={latest.candidates}
        buyIn={buyIn}
        recommended={Number(answer.recommendedFraction)}
      />

      <figure className="mt-8">
        <img
          data-simulator="dag"
          src="/images/dag.png"
          alt="Diagram of the stake decision and the two possible yearly outcomes"
          className="w-full rounded-2xl border-2 border-[#0b2545] bg-white"
        />
      </figure>
    </main>
  );
}
