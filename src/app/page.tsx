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
          border: 5px solid #00539f;
          box-shadow: 0 0 0 5px #ffd200;
        }
        .hero-copy .tagline-follow .journey-dateline,
        .hero-copy .tagline-follow .journey-copy {
          color: #000;
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
        <div className="mt-6 flex flex-col gap-1.5 sm:flex-row sm:items-start">
          <div className="flex w-fit shrink-0 flex-col">
            <div className="overflow-hidden rounded-lg border-4 border-black bg-[#0b2545] shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.photoPath}
                alt={profile.displayName}
                width={316}
                height={316}
                className="block h-[20.5rem] w-[20.5rem] object-contain object-center"
              />
            </div>
          </div>
          <div className="hero-copy min-w-0 flex-1 rounded-lg border-2 border-black p-4" style={{ backgroundColor: "rgba(243, 230, 200, 0.55)" }}>
            <div className="tagline-stack">
              <div className="headline-block">
                <h1 className="headline-name name-about">
                  <span>{profile.displayName.split(" ")[0]}</span>{" "}
                  <span>{profile.displayName.split(" ").slice(1).join(" ")}</span>
                </h1>
                <p className="headline-deck">
                  Making a difference,
                  <br />
                  one decision at a time
                </p>
              </div>
              <div className="tagline-follow">
                <p className="journey-dateline">{profile.hometown}</p>
                <p className="journey-copy">{profile.bio}</p>
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
            <div className="mt-4 border-t border-black pt-3 text-left">
              <p className="text-base font-bold text-black">
                Roster visibility: {profile.rosterVisibility}
              </p>
              <p className="mt-1 overflow-x-auto whitespace-nowrap text-sm text-black">
                <span className="font-bold">Repo:</span>{" "}
                <a
                  href={profile.repoUrl}
                  className="repo-link font-semibold text-blue-600 underline decoration-2 underline-offset-2 hover:text-blue-800"
                >
                  {profile.repoUrl}
                </a>
              </p>
              <p className="mt-1 overflow-x-auto whitespace-nowrap text-sm text-black">
                <span className="font-bold">Site:</span>{" "}
                <a
                  href={profile.siteUrl}
                  className="repo-link font-semibold text-blue-600 underline decoration-2 underline-offset-2 hover:text-blue-800"
                >
                  {profile.siteUrl}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid w-full grid-cols-2 gap-4 text-center">
          <figure className="relative aspect-[5/6] min-w-0 overflow-hidden rounded-2xl border-2 border-[#0b2545] shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/empire-state.jpg?v=3"
              alt="Empire State Building"
              width={400}
              height={480}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <figcaption
              className="place-label absolute bottom-2 left-1/2 z-10 m-0 w-fit -translate-x-1/2 text-sm"
              style={{ backgroundColor: "rgba(11, 37, 69, 0.88)", padding: "0.1rem 0.45rem", borderRadius: "0.35rem" }}
            >
              Empire State Building
            </figcaption>
          </figure>
          <figure className="relative aspect-[5/6] min-w-0 overflow-hidden rounded-2xl border-2 border-[#0b2545] shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/edge-observatory.jpg?v=3"
              alt="The Edge observatory glass deck at Hudson Yards"
              width={400}
              height={480}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <figcaption
              className="place-label absolute bottom-2 left-1/2 z-10 m-0 w-fit -translate-x-1/2 text-sm"
              style={{ backgroundColor: "rgba(11, 37, 69, 0.88)", padding: "0.1rem 0.45rem", borderRadius: "0.35rem" }}
            >
              The Edge Observatory
            </figcaption>
          </figure>
          <figure className="relative aspect-[4/3] min-w-0 overflow-hidden rounded-2xl border-2 border-[#0b2545] shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/telephone-pole-girl-standing.jpg"
              alt="A girl standing on top of a camp telephone pole"
              width={640}
              height={480}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <figcaption
              className="place-label absolute bottom-2 left-1/2 z-10 m-0 w-fit -translate-x-1/2 text-center text-sm"
              style={{ backgroundColor: "rgba(11, 37, 69, 0.88)", padding: "0.1rem 0.45rem", borderRadius: "0.35rem" }}
            >
              Telephone Pole Challenge
            </figcaption>
          </figure>
          <figure className="relative aspect-[4/3] min-w-0 overflow-hidden rounded-2xl border-2 border-[#0b2545] shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/treetop-fall-girl.jpg"
              alt="A girl in a harness walking a log between trees in fall colors"
              width={640}
              height={480}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <figcaption
              className="place-label absolute bottom-2 left-1/2 z-10 m-0 w-fit -translate-x-1/2 text-center text-sm"
              style={{ backgroundColor: "rgba(11, 37, 69, 0.88)", padding: "0.1rem 0.45rem", borderRadius: "0.35rem" }}
            >
              Tree-Top
              <br />
              Challenge
            </figcaption>
          </figure>
        </div>

      <section className="about-shade hue-line mt-8">
        <h2 className="text-center text-2xl">A few fun facts</h2>
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

      <section className="decision-glow mt-12 rounded-xl p-6">
        <div className="rounded-lg border-[3px] border-[#00539f] px-4 py-3">
          <h2
            className="text-center text-3xl font-extrabold tracking-wide text-black"
            style={{
              WebkitTextStroke: "1.5px #ffffff",
              paintOrder: "stroke fill",
              textShadow:
                "-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff",
            }}
          >
            A decision I&apos;m proud of:
          </h2>
          <blockquote className="mx-auto mt-3 max-w-full px-6 text-center text-xl font-bold leading-relaxed text-black">
            <span aria-hidden className="mr-1 text-xl font-bold text-black">&ldquo;</span>
            {profile.decisionImProudOf}
            <span aria-hidden className="ml-1 text-xl font-bold text-black">&rdquo;</span>
          </blockquote>
        </div>
        <div className="mt-5 grid w-full gap-4 sm:grid-cols-2">
          <figure className="relative aspect-[4/3] min-w-0 overflow-hidden rounded-2xl border-2 border-[#0b2545] shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ud-campus-bright.jpg"
              alt="University of Delaware campus green"
              width={640}
              height={400}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <figcaption
              className="place-label absolute bottom-2 left-1/2 z-10 m-0 w-fit -translate-x-1/2 text-sm"
              style={{ backgroundColor: "rgba(11, 37, 69, 0.88)", padding: "0.1rem 0.45rem", borderRadius: "0.35rem" }}
            >
              UD: Green
            </figcaption>
          </figure>
          <figure className="relative aspect-[4/3] min-w-0 overflow-hidden rounded-2xl border-2 border-[#0b2545] shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ud-morris-library.jpg"
              alt="Morris Library on the University of Delaware campus"
              width={640}
              height={400}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <figcaption
              className="place-label absolute bottom-2 left-1/2 z-10 m-0 w-fit -translate-x-1/2 text-sm"
              style={{ backgroundColor: "rgba(11, 37, 69, 0.88)", padding: "0.1rem 0.45rem", borderRadius: "0.35rem" }}
            >
              UD: Library
            </figcaption>
          </figure>
          <figure className="relative aspect-[4/3] min-w-0 overflow-hidden rounded-2xl border-2 border-[#0b2545] shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ud-stadium.jpg"
              alt="Aerial view over Delaware Stadium football field"
              width={640}
              height={400}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <figcaption
              className="place-label absolute bottom-2 left-1/2 z-10 m-0 w-fit -translate-x-1/2 text-sm"
              style={{ backgroundColor: "rgba(11, 37, 69, 0.88)", padding: "0.1rem 0.45rem", borderRadius: "0.35rem" }}
            >
              UD: Stadium
            </figcaption>
          </figure>
          <figure className="relative aspect-[4/3] min-w-0 overflow-hidden rounded-2xl border-2 border-[#0b2545] shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ud-interior.jpg"
              alt="Inside Trabant University Center at the University of Delaware"
              width={640}
              height={400}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <figcaption
              className="place-label absolute bottom-2 left-1/2 z-10 m-0 w-fit -translate-x-1/2 text-sm"
              style={{ backgroundColor: "rgba(11, 37, 69, 0.88)", padding: "0.1rem 0.45rem", borderRadius: "0.35rem" }}
            >
              UD: Trabant
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
