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
      <style>{`
        .about-squiggle {
          background-color: rgba(243, 230, 200, 0.45);
        }
        .about-squiggle .about-shade,
        .about-squiggle .decision-glow {
          background-color: rgba(243, 230, 200, 0.45);
        }
        .about-squiggle .decision-glow {
          box-shadow: none;
        }
        .about-shade p.tagline-outline {
          border-color: #0b2545;
        }
      `}</style>
      <div className="about-squiggle rounded-3xl px-6 py-10 sm:px-8">
        <figure className="mx-auto flex h-12 w-full items-stretch overflow-hidden rounded-md border-4 border-[#ff7a18] shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cyber-color.jpg"
            alt=""
            width={80}
            height={48}
            className="h-full w-20 shrink-0 object-cover"
          />
          <figcaption className="flex flex-1 items-center justify-center bg-black px-3 text-sm font-bold tracking-[0.28em] text-[#ff7a18] uppercase">
            cybersecurity
          </figcaption>
        </figure>
        <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:items-start">
          <div className="flex w-fit shrink-0 flex-col items-center gap-4">
            <div className="overflow-hidden rounded-3xl shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.photoPath}
                alt={profile.displayName}
                width={272}
                height={272}
                className="block h-[17rem] w-[17rem] object-cover"
                style={{ objectPosition: "50% 38%" }}
              />
            </div>
          </div>
          <div className="about-shade hue-line min-w-0 flex-1">
            <h1 className="name-about name-navy inline-flex max-w-full items-baseline gap-3 text-3xl font-bold">
              <span>{profile.displayName.split(" ")[0]}</span>
              <span>{profile.displayName.split(" ").slice(1).join(" ")}</span>
            </h1>
            <div className="tagline-stack">
              <p className="tagline-outline mt-1 text-2xl uppercase leading-[1.05] tracking-[0.04em]">
                Making a
                <br />
                difference,
                <br />
                one decision
                <br />
                at a time
              </p>
              <div className="tagline-follow">
                <p className="mt-3 text-xl">{profile.hometown}</p>
                <p className="mt-5 text-xl leading-relaxed">{profile.bio}</p>
              </div>
            </div>
            <p className="mt-4 text-lg">
              <a
                href={`mailto:${profile.email}`}
                className="text-blue-600 underline decoration-2 underline-offset-2 hover:text-blue-800"
              >
                {profile.email}
              </a>
            </p>
          </div>
        </div>
        <div className="about-shade hue-line mt-6">
          <p className="text-base">
            Roster visibility: {profile.rosterVisibility}
          </p>
          <p className="mt-1 text-base">
            Repo:{" "}
            <a
              href={profile.repoUrl}
              className="repo-link text-lg underline decoration-2 underline-offset-2"
            >
              {profile.repoUrl}
            </a>
          </p>
          <p className="mt-1 text-base">
            Site:{" "}
            <a
              href={profile.siteUrl}
              className="repo-link break-all text-lg underline decoration-2 underline-offset-2"
            >
              {profile.siteUrl}
            </a>
          </p>
        </div>

        <div className="mt-6 grid w-full grid-cols-2 gap-4 text-center">
          <figure className="min-w-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/empire-state.jpg?v=3"
              alt="Empire State Building"
              width={400}
              height={260}
              className="h-72 w-full rounded-2xl border-2 border-[#0b2545] object-cover object-top shadow-md"
            />
            <figcaption
              className="place-label mx-auto mt-2 block w-fit text-sm"
              style={{ backgroundColor: "rgba(11, 37, 69, 0.88)", padding: "0.1rem 0.45rem", borderRadius: "0.35rem" }}
            >
              Empire State Building
            </figcaption>
          </figure>
          <figure className="min-w-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/edge-observatory.jpg?v=3"
              alt="The Edge observatory glass deck at Hudson Yards"
              width={400}
              height={260}
              className="h-72 w-full rounded-2xl border-2 border-[#0b2545] object-cover object-top shadow-md"
            />
            <figcaption
              className="place-label mx-auto mt-2 block w-fit text-sm"
              style={{ backgroundColor: "rgba(11, 37, 69, 0.88)", padding: "0.1rem 0.45rem", borderRadius: "0.35rem" }}
            >
              The Edge observatory
            </figcaption>
          </figure>
        </div>
        <div className="mt-4 grid w-full grid-cols-2 gap-4 text-center">
          <figure className="min-w-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/telephone-pole-girl-standing.jpg"
              alt="A girl standing on top of a camp telephone pole"
              width={640}
              height={360}
              className="aspect-video w-full rounded-2xl border-2 border-[#0b2545] object-cover object-center shadow-md"
            />
            <figcaption
              className="place-label mx-auto mt-2 block w-fit text-center text-sm"
              style={{ backgroundColor: "rgba(11, 37, 69, 0.88)", padding: "0.1rem 0.45rem", borderRadius: "0.35rem" }}
            >
              Telephone pole challenge
            </figcaption>
          </figure>
          <figure className="min-w-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/treetop-fall-girl.jpg"
              alt="A girl in a harness walking a log between trees in fall colors"
              width={640}
              height={360}
              className="aspect-video w-full rounded-2xl border-2 border-[#0b2545] object-cover object-center shadow-md"
            />
            <figcaption
              className="place-label mx-auto mt-2 block w-fit text-center text-sm"
              style={{ backgroundColor: "rgba(11, 37, 69, 0.88)", padding: "0.1rem 0.45rem", borderRadius: "0.35rem" }}
            >
              Treetop challenge
            </figcaption>
          </figure>
        </div>

      <section className="about-shade hue-line mt-8">
        <h2 className="text-2xl">A few fun facts</h2>
        <ul className="mt-4 space-y-2">
          {profile.funFacts.map((fact) => (
            <li key={fact} className="flex gap-3">
              <span aria-hidden className="mt-1">
                ✦
              </span>
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="decision-glow mt-12 rounded-xl border-8 border-double border-[#4169E1] p-6">
        <h2 className="text-center text-3xl font-extrabold tracking-wide text-black">
          A decision I&apos;m proud of:
        </h2>
        <blockquote className="mx-auto mt-3 max-w-full px-6 text-center text-xl font-bold leading-relaxed text-black">
          <span aria-hidden className="mr-1 text-xl font-bold text-black">&ldquo;</span>
          To commit to moral progress to make a difference in the world, and choosing to have experiences on the University of Delaware campus.
          <span aria-hidden className="ml-1 text-xl font-bold text-black">&rdquo;</span>
        </blockquote>
        <div className="mt-5 grid w-full gap-4 sm:grid-cols-2">
          <figure className="min-w-0 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ud-campus-bright.jpg"
              alt="University of Delaware campus green"
              width={640}
              height={400}
              className="aspect-[4/3] w-full rounded-2xl border-2 border-[#0b2545] object-cover object-center shadow-md"
            />
            <figcaption
              className="place-label mx-auto mt-2 inline-block text-sm"
              style={{ backgroundColor: "rgba(11, 37, 69, 0.88)", padding: "0.1rem 0.45rem", borderRadius: "0.35rem" }}
            >
              The Green
            </figcaption>
          </figure>
          <figure className="min-w-0 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ud-morris-library.jpg"
              alt="Morris Library on the University of Delaware campus"
              width={640}
              height={400}
              className="aspect-[4/3] w-full rounded-2xl border-2 border-[#0b2545] object-cover object-center shadow-md"
            />
            <figcaption
              className="place-label mx-auto mt-2 inline-block text-sm"
              style={{ backgroundColor: "rgba(11, 37, 69, 0.88)", padding: "0.1rem 0.45rem", borderRadius: "0.35rem" }}
            >
              Library
            </figcaption>
          </figure>
          <figure className="min-w-0 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ud-stadium.jpg"
              alt="Aerial view over Delaware Stadium football field"
              width={640}
              height={400}
              className="aspect-[4/3] w-full rounded-2xl border-2 border-[#0b2545] object-cover object-center shadow-md"
            />
            <figcaption
              className="place-label mx-auto mt-2 inline-block text-sm"
              style={{ backgroundColor: "rgba(11, 37, 69, 0.88)", padding: "0.1rem 0.45rem", borderRadius: "0.35rem" }}
            >
              Stadium
            </figcaption>
          </figure>
          <figure className="min-w-0 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ud-interior.jpg"
              alt="Inside Trabant University Center at the University of Delaware"
              width={640}
              height={400}
              className="aspect-[4/3] w-full rounded-2xl border-2 border-[#0b2545] object-cover object-center shadow-md"
            />
            <figcaption
              className="place-label mx-auto mt-2 inline-block text-sm"
              style={{ backgroundColor: "rgba(11, 37, 69, 0.88)", padding: "0.1rem 0.45rem", borderRadius: "0.35rem" }}
            >
              Trabant
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Portfolio of decision services ───────────────────────────── */}
      <section className="about-shade hue-line mt-14">
        <h2 className="text-2xl">A portfolio of decision services</h2>
        <p className="mt-2 max-w-prose">
          Over the semester this site grows one live decision service per lane. Here&apos;s
          what&apos;s coming:
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <li key={s.lane} className="rounded-xl border border-line bg-transparent p-5 transition duration-200 hover:-translate-y-1">
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
      <section className="about-shade hue-line mt-14">
        <h2 className="text-2xl">Guestbook</h2>
        <p className="mt-2 max-w-prose">
          Signed entries live in my own database: proof this site does a real round-trip.
        </p>
        <Guestbook />
      </section>
      </div>
    </main>
  );
}
