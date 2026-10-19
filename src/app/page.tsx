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
        <div className="w-fit shrink-0 shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.photoPath}
            alt={profile.displayName}
            width={208}
            height={208}
            className="block h-52 w-52 object-contain"
          />
        </div>
        <div style={{ fontFamily: '"Times New Roman", Times, serif', color: "var(--ink)" }}>
          <h1 className="text-4xl font-bold" style={{ fontFamily: '"Times New Roman", Times, serif' }}>{profile.displayName}</h1>
          <p className="mt-6 text-2xl font-bold uppercase leading-[1.05] tracking-[0.22em] text-[#542614]">
            {profile.tagline}
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
            className="mt-5 max-w-prose text-lg font-medium leading-[1.5] text-ink"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            {profile.bio}
          </p>
          <p className="mt-4 text-sm text-muted">
            Roster visibility:{" "}
            <span className="font-semibold text-ink">{profile.rosterVisibility}</span>
          </p>
          <p className="mt-1 text-sm text-muted">
            Repo:{" "}
            <a
              href={profile.repoUrl}
              className="font-semibold text-ink transition hover:text-accent"
            >
              {profile.repoUrl}
            </a>
          </p>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">A few fun facts</h2>
        <ul className="mt-4 space-y-2">
          {profile.funFacts.map((fact) => (
            <li key={fact} className="flex gap-3">
              <span aria-hidden className="mt-1 text-accent">
                ✦
              </span>
              <span className="italic">{fact}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 rounded-xl border border-line bg-surface p-6">
        <h2 className="text-xl font-bold">A decision I&apos;m proud of</h2>
        <p className="mt-3 max-w-prose italic text-muted">
          &ldquo;{profile.decisionImProudOf}&rdquo;
        </p>
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
