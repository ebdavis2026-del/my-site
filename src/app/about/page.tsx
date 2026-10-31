import { profile } from "@/profile";

export const metadata = { title: `About — ${profile.displayName}` };

/**
 * The human-facing twin of /api/profile. Because both read from
 * src/profile.ts, they agree by construction, which is exactly what the
 * course's "/about matches the API" check verifies.
 */
export default function AboutPage() {
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
      `}</style>
      <div className="about-squiggle rounded-3xl px-6 py-10 sm:px-8">
        <div className="flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/tulips.jpg"
            alt="A bed of colorful tulips"
            width={112}
            height={112}
            className="h-28 w-28 rounded-2xl border-2 border-[#0b2545] object-cover shadow-md"
          />
        </div>
        <div className="flex flex-col gap-10 rounded-3xl px-6 py-10 sm:flex-row sm:px-8">
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
          <div className="about-shade hue-line">
            <h1 className="name-about name-navy text-4xl">{profile.displayName}</h1>
            <div className="tagline-stack">
              <p className="tagline-outline mt-3 text-2xl uppercase leading-[1.2] tracking-[0.04em]">
                {profile.tagline.split(",")[0]},
                <br />
                {profile.tagline.split(",")[1]?.trim()}
              </p>
              <div className="tagline-follow">
                <p className="mt-3 text-xl">
                  {profile.hometown}
                </p>
                <p className="mt-5 text-xl leading-relaxed">
                  {profile.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 text-center">
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/empire-state.jpg?v=3"
              alt="Empire State Building in the Manhattan skyline at sunset"
              width={400}
              height={260}
              className="h-72 w-full rounded-2xl border-2 border-[#0b2545] object-cover object-top shadow-md"
            />
            <figcaption
              className="place-label mt-2 inline-block text-sm"
              style={{ backgroundColor: "rgba(11, 37, 69, 0.88)", padding: "0.1rem 0.45rem", borderRadius: "0.35rem" }}
            >
              Empire State Building
            </figcaption>
          </figure>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/edge-observatory.jpg?v=3"
              alt="The Edge at Hudson Yards with the skyline at sunset"
              width={400}
              height={260}
              className="h-72 w-full rounded-2xl border-2 border-[#0b2545] object-cover object-top shadow-md"
            />
            <figcaption
              className="place-label mt-2 inline-block text-sm"
              style={{ backgroundColor: "rgba(11, 37, 69, 0.88)", padding: "0.1rem 0.45rem", borderRadius: "0.35rem" }}
            >
              The Edge observatory
            </figcaption>
          </figure>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 text-center">
          <figure>
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
          <figure>
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

        <section className="decision-glow mt-12 rounded-xl border-8 border-double border-[#15803d] p-6">
          <h2 className="text-center text-3xl font-extrabold tracking-wide text-black">
            A decision I&apos;m proud of:
          </h2>
          <blockquote className="mx-auto mt-3 max-w-full px-6 text-center text-xl font-bold leading-relaxed text-black">
            <span aria-hidden className="mr-1 text-xl font-bold text-black">&ldquo;</span>
            To commit to moral progress to make a difference in the world.
          </blockquote>
        </section>
      </div>
    </main>
  );
}
