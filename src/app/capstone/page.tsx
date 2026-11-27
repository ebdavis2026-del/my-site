import { ComingSoon } from "@/components/ComingSoon";
import { HistoryChart } from "@/components/capstone/HistoryChart";
import { OutcomeChart } from "@/components/capstone/OutcomeChart";
import { RecipeDag } from "@/components/capstone/RecipeDag";
import { loadLatest } from "@/lib/capstone-store";

export const metadata = { title: "Capstone — staffing decision" };

export const dynamic = "force-dynamic";

export default async function CapstonePage() {
  const latest = await loadLatest();

  if (!latest) {
    return (
      <ComingSoon
        lane={5}
        title="Capstone: Live Decision Service"
        description="A full advocacy report on a staffing decision. Run try-capstone once so your own problem is saved, then refresh this page."
      />
    );
  }

  const { probe, answer } = latest;
  const choice =
    probe.candidates.find((c) => c.id === answer.action) ?? probe.candidates[0];
  const other =
    probe.candidates.find((c) => c.id !== answer.action) ?? probe.candidates[1];
  const chosen = answer.outcomes[answer.action];
  const otherOut = answer.outcomes[other.id];
  const unit = String(probe.scenario.params.unit ?? "result");
  const reader = String(probe.scenario.params.reader ?? "the reader");
  const shortIn100 = Math.round(chosen.chanceShort * 100);
  const otherShortIn100 = Math.round(otherOut.chanceShort * 100);
  const beatsIn100 = Math.round(answer.chanceActionBeatsOther * 100);
  const typical = Math.round(chosen.typical);
  const low = Math.round(chosen.low);
  const high = Math.round(chosen.high);

  const recommendation =
    `${reader} should choose ${choice.label}. That path keeps the chance of ` +
    `falling short at about ${shortIn100} in 100 runs, inside the allowed limit, ` +
    `with a typical result near ${typical.toLocaleString("en-US")} ${unit}.`;

  const uncertainty =
    `Across about 10,000 possible quarters, the likely band for ${choice.label} ` +
    `runs from ${low.toLocaleString("en-US")} to ${high.toLocaleString("en-US")} ${unit}. ` +
    `It beats ${other.label} in about ${beatsIn100} of 100 paired runs. ` +
    `${other.label} falls short about ${otherShortIn100} times in 100, which is above the limit.`;

  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
        Lane 5 · live decision report
      </p>
      <h1 className="mt-3 text-4xl font-bold">
        Choose {choice.label} for {reader}
      </h1>
      <p className="mt-4 max-w-prose text-muted">{probe.scenario.narrative}</p>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">The recommendation</h2>
        <p data-capstone="recommendation" className="mt-3 max-w-prose text-lg">
          {recommendation}
        </p>
        <ul className="mt-4 space-y-2 text-lg">
          <li>
            Action:{" "}
            <strong data-capstone="action" className="text-accent">
              {answer.action}
            </strong>{" "}
            ({choice.label})
          </li>
          <li>
            Typical result:{" "}
            <strong data-capstone="typical-result" className="text-accent">
              {typical.toLocaleString("en-US")}
            </strong>{" "}
            {unit}
          </li>
          <li>
            Chance of falling short:{" "}
            <strong data-capstone="chance-short" className="text-accent">
              {shortIn100} in 100
            </strong>
          </li>
        </ul>
        <p data-capstone="uncertainty" className="mt-4 max-w-prose text-muted">
          {uncertainty}
        </p>
        <p className="mt-3 max-w-prose text-muted">{answer.reasoning}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">What the history shows</h2>
        <p className="mt-2 max-w-prose text-muted">{probe.limit.plain}</p>
        <HistoryChart probe={probe} />
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">How the two options compare</h2>
        <p className="mt-2 max-w-prose text-muted">
          The bar is the likely range for each option. The dot is the typical
          result. The red line is the {probe.limit.atLeast.toLocaleString("en-US")}{" "}
          {unit} floor.
        </p>
        <OutcomeChart probe={probe} answer={answer} />
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold">The recipe behind the numbers</h2>
        <p className="mt-2 max-w-prose text-muted">
          Each box is one step in the story we replay thousands of times.
        </p>
        <RecipeDag probe={probe} />
      </section>
    </main>
  );
}
