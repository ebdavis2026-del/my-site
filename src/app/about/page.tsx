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
      <div
        className="flex flex-col gap-10 rounded-3xl px-6 py-10 sm:flex-row sm:px-8"
        style={{
          background:
            "linear-gradient(160deg, color-mix(in srgb, var(--accent) 38%, white), color-mix(in srgb, var(--accent) 14%, transparent) 62%, transparent)",
        }}
      >
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
          <h1 className="text-3xl font-bold" style={{ fontFamily: '"Times New Roman", Times, serif' }}>{profile.displayName}</h1>
          <p className="mt-3 text-2xl font-bold uppercase leading-[1.05] tracking-[0.22em] text-[#542614]">
            {profile.tagline}
          </p>
          <p className="mt-2 text-lg font-semibold text-ink">
            {profile.hometown}
          </p>
          <p
            className="mt-5 max-w-prose font-medium leading-[1.5] text-ink"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            {profile.bio}
          </p>
        </div>
      </div>

      <section className="mt-12">
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

      <section className="mt-12 rounded-xl border border-line bg-surface p-6">
        <h2 className="text-xl font-bold">A decision I&apos;m proud of</h2>
        <p className="mt-3 max-w-prose italic text-muted">
          &ldquo;{profile.decisionImProudOf}&rdquo;
        </p>
      </section>
    </main>
  );
}
