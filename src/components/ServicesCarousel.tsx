"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Service = {
  lane: number;
  title: string;
  href: string;
  blurb: string;
  image?: string;
  imageAlt?: string;
};

/** Very slow so the page stays calm — one lane every 18 seconds. */
const INTERVAL_MS = 18000;
const TRANSITION_MS = 1400;

export function ServicesCarousel({ services }: { services: Service[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = services.length || 1;

  useEffect(() => {
    if (paused || services.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % services.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, index, services.length]);

  function goTo(next: number) {
    setIndex((next + services.length) % services.length);
  }

  return (
    <div className="mt-6">
      <div className="relative w-full overflow-x-hidden">
        <div
          className="flex items-stretch ease-in-out"
          style={{
            width: `${n * 100}%`,
            transform: `translateX(-${(index * 100) / n}%)`,
            transitionDuration: `${TRANSITION_MS}ms`,
            transitionProperty: "transform",
          }}
        >
          {services.map((s) => (
            <div
              key={s.lane}
              className="flex shrink-0 flex-col px-1"
              style={{ width: `${100 / n}%` }}
            >
              <div
                className="flex h-full flex-col items-center rounded-xl border-[3px] border-white bg-transparent px-6 py-6 text-center sm:px-10 sm:py-8"
                style={{ boxShadow: "0 0 0 5px #00539f" }}
              >
                <div className="flex w-full flex-col items-center">
                  <p
                    className="text-sm uppercase tracking-widest text-black sm:text-base"
                    style={{ fontWeight: 800 }}
                  >
                    Lane {s.lane}
                  </p>
                  <h3
                    className="mt-2 text-3xl leading-tight sm:text-4xl"
                    style={{ fontWeight: 800 }}
                  >
                    <Link
                      href={s.href}
                      className="transition hover:text-accent"
                      style={{ fontWeight: 800 }}
                    >
                      {s.title}
                    </Link>
                  </h3>
                  <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-muted sm:text-sm">
                    {s.blurb}
                  </p>
                </div>

                <div
                  className="mt-2 flex w-full flex-1 items-center justify-center rounded-lg border-[3px] border-white bg-white p-3"
                  style={{ boxShadow: "0 0 0 5px #00539f", minHeight: "16rem" }}
                >
                  {s.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={s.image}
                      alt={s.imageAlt ?? s.title}
                      width={800}
                      height={400}
                      className="mx-auto block h-full max-h-64 w-full object-contain"
                    />
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Previous lane"
          onClick={() => goTo(index - 1)}
          className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#0b2545]/85 text-lg font-bold text-white hover:bg-[#0b2545]"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next lane"
          onClick={() => goTo(index + 1)}
          className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#0b2545]/85 text-lg font-bold text-white hover:bg-[#0b2545]"
        >
          ›
        </button>

        <button
          type="button"
          aria-label={paused ? "Resume lane slideshow" : "Pause lane slideshow"}
          onClick={() => setPaused((p) => !p)}
          className="absolute bottom-3 right-3 z-20 rounded-md bg-[#0b2545]/85 px-2 py-1 text-xs font-semibold text-white hover:bg-[#0b2545]"
        >
          {paused ? "Play" : "Pause"}
        </button>
      </div>

      <div
        className="mt-3 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Choose lane"
      >
        {services.map((s, i) => (
          <button
            key={s.lane}
            type="button"
            role="tab"
            aria-label={`Show lane ${s.lane}`}
            aria-selected={i === index}
            onClick={() => goTo(i)}
            className={`h-2.5 w-2.5 rounded-full transition-colors ${
              i === index ? "bg-[#0b2545]" : "bg-[#0b2545]/30 hover:bg-[#0b2545]/55"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
