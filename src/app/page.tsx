import { profile } from "@/profile";
import { Guestbook } from "@/components/Guestbook";
import { PhotoCarousel } from "@/components/PhotoCarousel";
import { ServicesCarousel } from "@/components/ServicesCarousel";
import ScrollLinkRow from "@/components/ScrollLinkRow";
import Cyber3DTitle from "@/components/Cyber3DTitle";

/**
 * Your home page. It's already personalized: everything here reads from
 * src/profile.ts. The "portfolio of decision services" section below is the
 * scaffold the course expects: each lane's challenge fills in one slot.
 */

const SERVICES = [
  {
    lane: 1,
    title: "Tech Foundations",
    href: "/",
    blurb: "Put your work in code. A live site that keeps deciding while you sleep.",
    image: "/images/lane1.svg",
    imageAlt: "Code to deploy to live site",
  },
  {
    lane: 2,
    title: "Reasoning & Uncertainty",
    href: "/reasoning",
    blurb: "Audits syllogisms, updates on base rates, reads Bernoulli businesses.",
    image: "/images/reasoning.svg",
    imageAlt: "Prior to evidence to posterior belief update",
  },
  {
    lane: 3,
    title: "Decision Simulator",
    href: "/simulator",
    blurb: "Simulates investment games and recommends the growth-optimal stake.",
    image: "/images/dag.png",
    imageAlt: "Decision simulator DAG diagram",
  },
  {
    lane: 4,
    title: "Causality Audit",
    href: "/causality",
    blurb: "Tells forks from pipes from colliders, and when to stratify.",
    image: "/images/causality/fork.png",
    imageAlt: "Causality fork diagram",
  },
  {
    lane: 5,
    title: "Capstone: Live Decision Service",
    href: "/capstone",
    blurb: "A full advocacy report on a real decision domain, backed by data.",
    image: "/images/capstone.svg",
    imageAlt: "Analysis to visualization to action",
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
        .about-squiggle .fun-facts-panel {
          background-color: rgba(229, 231, 235, 0.7) !important;
          border: 3px solid #00a0df !important;
          box-shadow: inset 0 0 0 3px #ffd200, 0 0 0 3px #00a0df;
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
        <figure className="cyber-3d mx-auto flex h-12 w-full items-stretch overflow-visible rounded-md border-4 border-[#ff7a18] shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cyber-color.jpg"
            alt=""
            width={80}
            height={48}
            className="h-full w-20 shrink-0 object-cover"
          />
          <figcaption className="relative flex flex-1 items-center justify-center overflow-visible bg-[#00539f] px-3 text-xl font-extrabold tracking-[0.28em] uppercase sm:text-2xl">
            <Cyber3DTitle />
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
              <span className="font-bold text-black">Email:</span>{" "}
              <a
                href={`mailto:${profile.email}`}
                className="text-blue-600 underline decoration-2 underline-offset-2 hover:text-blue-800"
              >
                {profile.email}
              </a>
            </p>
            <div className="mt-4 min-w-0 border-t border-black pt-3 text-left">
              <p className="text-base font-bold text-black">
                Roster visibility: {profile.rosterVisibility}
              </p>
              <ScrollLinkRow label="Repo" href={profile.repoUrl} tone="blue" />
              <ScrollLinkRow label="Site" href={profile.siteUrl} tone="green" />
            </div>
          </div>
        </div>

      <section className="decision-glow mt-8 rounded-xl p-6">
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
          <div
            className="decision-banner"
            aria-label="Choosing the University of Delaware. Committing to Moral Progress, One Decision at a Time. Making a meaningful difference. Building lasting memories on the UD campus."
          >
            <div className="decision-banner__track">
              <p className="decision-banner__item">
                Choosing the University of Delaware. Committing to Moral Progress, One Decision at a Time. Making a meaningful difference. Building lasting memories on the UD campus.
              </p>
              <p className="decision-banner__item" aria-hidden="true">
                Choosing the University of Delaware. Committing to Moral Progress, One Decision at a Time. Making a meaningful difference. Building lasting memories on the UD campus.
              </p>
            </div>
          </div>
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
      <section className="about-shade hue-line mt-12">
        <h2 className="text-center text-2xl underline decoration-2 underline-offset-4">
          A Portfolio Of Decision Services
        </h2>
        <p className="mx-auto mt-2 max-w-prose text-center">
          Over the semester this site grows one live decision service per lane. Here&apos;s
          what&apos;s coming:
        </p>
        <ServicesCarousel services={SERVICES} />
      </section>

      <section className="fun-facts-panel hue-line mt-14 rounded-[1rem] px-6 py-5">
        <h2 className="text-center text-4xl font-extrabold tracking-wide text-black">
          A few fun facts
        </h2>
        <PhotoCarousel facts={profile.funFacts} />
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
