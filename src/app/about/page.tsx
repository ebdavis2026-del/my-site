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
      <div className="about-squiggle rounded-3xl px-6 py-10 sm:px-8">
        <div
          className="flex flex-col gap-10 rounded-3xl px-6 py-10 sm:flex-row sm:px-8"
          style={{
            background:
              "linear-gradient(160deg, color-mix(in srgb, var(--accent) 38%, white), color-mix(in srgb, var(--accent) 14%, transparent) 62%, transparent)",
          }}
        >
          <div className="flex w-fit shrink-0 flex-col items-center gap-4">
            <div className="overflow-hidden rounded-3xl shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={profile.photoPath}
                alt={profile.displayName}
                width={256}
                height={256}
                className="block h-64 w-64 object-cover"
                style={{ objectPosition: "50% 38%" }}
              />
            </div>
            <div className="overflow-hidden rounded-3xl shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/cyber-logo.svg"
                alt="An original colorful emblem"
                width={160}
                height={160}
                className="block h-40 w-40 object-cover"
              />
            </div>
          </div>
          <div style={{ color: "var(--ink)" }}>
            <h1 className="name-about name-navy text-4xl">{profile.displayName}</h1>
            <p className="mt-3 text-3xl font-extrabold uppercase leading-[1.15] tracking-[0.06em] text-ink">
              {profile.tagline.split(",")[0]},
              <br />
              {profile.tagline.split(",")[1]?.trim()}
            </p>
            <p className="mt-3 text-xl font-semibold text-ink">
              {profile.hometown}
            </p>
            <p className="mt-5 text-xl font-semibold leading-relaxed text-ink">
              {profile.bio}
            </p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/empire-state.jpg?v=3"
              alt="Empire State Building in the Manhattan skyline at sunset"
              width={400}
              height={260}
              className="h-72 w-full rounded-2xl object-cover object-top shadow-md"
            />
            <figcaption className="mt-2 text-sm font-bold text-ink">Empire State Building</figcaption>
          </figure>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/edge-observatory.jpg?v=3"
              alt="The Edge at Hudson Yards with the skyline at sunset"
              width={400}
              height={260}
              className="h-72 w-full rounded-2xl object-cover object-top shadow-md"
            />
            <figcaption className="mt-2 text-sm font-bold text-ink">The Edge observatory</figcaption>
          </figure>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3">
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/telephone-pole.jpg"
              alt="A person high on a telephone pole"
              width={240}
              height={180}
              className="h-28 w-full rounded-2xl object-cover object-center shadow-md sm:h-36"
            />
            <figcaption className="mt-2 text-xs font-semibold text-ink sm:text-sm">Telephone pole</figcaption>
          </figure>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/treetop-challenge.jpg"
              alt="A treetop walkway used for an overcoming-fear challenge"
              width={240}
              height={180}
              className="h-28 w-full rounded-2xl object-cover object-center shadow-md sm:h-36"
            />
            <figcaption className="mt-2 text-xs font-semibold text-ink sm:text-sm">Treetop challenge</figcaption>
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

        <section className="decision-glow mt-12 rounded-xl border-8 border-double border-[#15803d] p-6">
          <h2 className="text-center text-xl font-bold text-black">A decision I&apos;m proud of:</h2>
          <blockquote className="mt-3 text-center text-xl font-bold leading-relaxed text-black">
            <span aria-hidden className="mr-1 text-xl font-bold text-black">&ldquo;</span>
            To commit to moral progress
            <br />
            to make a difference in the world.
          </blockquote>
        </section>
      </div>
    </main>
  );
}
