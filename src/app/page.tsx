import Link from "next/link";
import { profile } from "@/profile";
import { Guestbook } from "@/components/Guestbook";

/**
 * Your home page. It's already personalized: everything here reads from
 * src/profile.ts. The "portfolio of decision services" section below is the
 * scaffold the course expects: each lane's challenge fills in one slot.
 */

const SERVICES = [
  {
    lane: 2,
    title: "Reasoning & Uncertainty",
    href: "/reasoning",
    blurb: "Audits syllogisms, updates on base rates, reads Bernoulli businesses.",
  },
  {
    lane: 3,
    title: "Decision Simulator",
    href: "/simulator",
    blurb: "Simulates investment games and recommends the growth-optimal stake.",
  },
  {
    lane: 4,
    title: "Causality Audit",
    href: "/causality",
    blurb: "Tells forks from pipes from colliders, and when to stratify.",
  },
  {
    lane: 5,
    title: "Capstone: Live Decision Service",
    href: "/capstone",
    blurb: "A full advocacy report on a real decision domain, backed by data.",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-14">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-10 py-24 sm:flex-row sm:items-start sm:py-36">
        <div className="w-fit shrink-0 overflow-hidden rounded-3xl shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.photoPath}
            alt={profile.displayName}
            width={208}
            height={208}
            className="block h-52 w-52 object-cover"
            style={{ objectPosition: "50% 38%" }}
          />
        </div>
        <div style={{ color: "var(--ink)" }}>
          <h1 className="name-about text-4xl">{profile.displayName}</h1>
          <p className="mt-6 text-2xl font-extrabold uppercase leading-[1.15] tracking-[0.06em] text-ink">
            {profile.tagline.split(",")[0]},
            <br />
            {profile.tagline.split(",")[1]?.trim()}
          </p>
          <p className="mt-3 text-lg text-ink">
            <a href={`mailto:${profile.email}`} className="font-semibold text-ink transition hover:text-accent">
              {profile.email}
            </a>
            <span className="mx-2" aria-hidden>
              ·
            </span>
            {profile.hometown}
          </p>
          <p
            className="mt-5 max-w-prose text-lg font-semibold leading-[1.55] text-ink"
          >
            {profile.bio}
          </p>
          <p className="mt-4 text-base text-ink">
            Roster visibility: {profile.rosterVisibility}
          </p>
          <p className="mt-1 text-base text-ink">
            Repo:{" "}
            <a
              href={profile.repoUrl}
              className="text-base font-bold text-blue-700 underline decoration-2 underline-offset-2 transition hover:text-blue-900"
            >
              {profile.repoUrl}
            </a>
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/empire-state.jpg?v=3"
              alt="Empire State Building"
              width={400}
              height={260}
              className="h-72 w-full rounded-2xl object-cover object-top shadow-md"
            />
            <figcaption className="mt-2 text-sm text-muted">Empire State Building</figcaption>
          </figure>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/edge-observatory.jpg?v=3"
              alt="The Edge observatory glass deck at Hudson Yards"
              width={400}
              height={260}
              className="h-72 w-full rounded-2xl object-cover object-top shadow-md"
            />
            <figcaption className="mt-2 text-sm text-muted">The Edge observatory</figcaption>
          </figure>
      </div>

      <section className="mt-8">
        <h2 className="text-2xl font-bold">A few fun facts</h2>
        <ul className="mt-4 space-y-2">
          {profile.funFacts.map((fact) => (
            <li key={fact} className="flex gap-3">
              <span aria-hidden className="mt-1 text-accent">
                ✦
              </span>
              <span className="font-semibold text-ink">{fact}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="decision-glow mt-14 rounded-xl border-8 border-double border-black p-6">
        <h2 className="text-xl font-bold text-red-700">A decision I&apos;m proud of:</h2>
        <blockquote className="decision-text mt-3 max-w-prose text-lg font-normal leading-relaxed text-red-700">
          <span aria-hidden className="mr-1 text-2xl text-red-700">&ldquo;</span>
          {profile.decisionImProudOf}
        </blockquote>
      </section>

      {/* ── Portfolio of decision services ───────────────────────────── */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold">A portfolio of decision services</h2>
        <p className="mt-2 max-w-prose text-muted">
          Over the semester this site grows one live decision service per lane. Here&apos;s
          what&apos;s coming:
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <li key={s.lane} className="rounded-xl border border-line bg-surface p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                Lane {s.lane}
              </p>
              <h3 className="mt-1 font-bold">
                <Link href={s.href} className="transition hover:text-accent">
                  {s.title}
                </Link>
              </h3>
              <p className="mt-1.5 text-sm text-muted">{s.blurb}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Guestbook: the live database round-trip ──────────────────── */}
      <section className="mt-14">
        <h2 className="text-2xl font-bold">Guestbook</h2>
        <p className="mt-2 max-w-prose text-muted">
          Signed entries live in my own database: proof this site does a real round-trip.
        </p>
        <Guestbook />
      </section>
    </main>
  );
}
