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
      <div className="rounded-3xl border border-black px-6 py-10 sm:px-8">
        <div
          className="flex flex-col gap-10 rounded-3xl px-6 py-10 sm:flex-row sm:px-8"
          style={{
            background:
              "linear-gradient(160deg, color-mix(in srgb, var(--accent) 38%, white), color-mix(in srgb, var(--accent) 14%, transparent) 62%, transparent)",
          }}
        >
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
            <h1 className="name-about text-3xl">{profile.displayName}</h1>
            <p className="mt-3 text-xl font-extrabold uppercase leading-[1.15] tracking-[0.06em] text-ink">
              {profile.tagline}
            </p>
            <p className="mt-2 text-lg font-semibold text-ink">
              {profile.hometown}
            </p>
            <p
              className="mt-5 max-w-prose font-semibold leading-[1.55] text-ink"
            >
              {profile.bio}
            </p>
          </div>
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

        <div className="mt-12 grid grid-cols-2 gap-4">
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/empire-state.jpg?v=3"
              alt="Empire State Building in the Manhattan skyline at sunset"
              width={400}
              height={260}
              className="h-44 w-full rounded-2xl object-cover object-center shadow-md"
            />
            <figcaption className="mt-2 text-sm font-semibold text-ink">Empire State Building</figcaption>
          </figure>
          <figure>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/edge-observatory.jpg?v=3"
              alt="The Edge at Hudson Yards with the skyline at sunset"
              width={400}
              height={260}
              className="h-44 w-full rounded-2xl object-cover object-center shadow-md"
            />
            <figcaption className="mt-2 text-sm font-semibold text-ink">The Edge observatory</figcaption>
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

        <section className="mt-12 rounded-xl border-8 border-double border-black bg-[#fffaf3] p-6 shadow-md">
          <h2 className="text-xl font-bold">A decision I&apos;m proud of:</h2>
          <blockquote className="name-resume mt-3 max-w-prose text-lg leading-snug text-ink">
            <span aria-hidden className="mr-1 text-2xl text-[#b4552d]">&ldquo;</span>
            {profile.decisionImProudOf}
          </blockquote>
        </section>
      </div>
    </main>
  );
}
