"use client";

import { useEffect, useState } from "react";

type Photo = {
  src: string;
  alt: string;
  caption: string;
  object: "object-top" | "object-center";
  /** Index into the funFacts array this photo lines up with */
  factIndex: number;
};

const PHOTOS: Photo[] = [
  {
    src: "/empire-state.jpg?v=3",
    alt: "Empire State Building",
    caption: "Empire State Building",
    object: "object-top",
    factIndex: 0,
  },
  {
    src: "/empire-state-street.jpg?v=1",
    alt: "Empire State Building viewed from the street",
    caption: "Empire State from the Street",
    object: "object-center",
    factIndex: 0,
  },
  {
    src: "/empire-state-night.jpg",
    alt: "Empire State Building lit up at night",
    caption: "Empire State at Night",
    object: "object-center",
    factIndex: 0,
  },
  {
    src: "/empire-state-night-color.jpg?v=2",
    alt: "Tip of the Empire State Building lit in colored lights at night",
    caption: "Empire State Top in Color",
    object: "object-top",
    factIndex: 0,
  },
  {
    src: "/ny-bridge-night-empire.jpg",
    alt: "New York bridge at night seen from the Empire State Building",
    caption: "NY Bridge at Night from Empire State",
    object: "object-center",
    factIndex: 0,
  },
  {
    src: "/edge-observatory.jpg?v=3",
    alt: "The Edge observatory glass deck at Hudson Yards",
    caption: "The Edge Observatory",
    object: "object-top",
    factIndex: 0,
  },
  {
    src: "/edge-from-top.jpg?v=1",
    alt: "View from the top of The Edge over New York City",
    caption: "Edge: View from the Top",
    object: "object-center",
    factIndex: 0,
  },
  {
    src: "/images/maya-angelou-quote.jpg?v=4",
    alt: "Maya Angelou's Quote",
    caption: "Maya Angelou's Quote",
    object: "object-center",
    factIndex: 1,
  },
  {
    src: "/stockholm-square.jpg",
    alt: "Stockholm square during the day",
    caption: "Stockholm Square",
    object: "object-center",
    factIndex: 2,
  },
  {
    src: "/stockholm-square-night.jpg",
    alt: "Stockholm square at night",
    caption: "Stockholm Square at Night",
    object: "object-center",
    factIndex: 2,
  },
  {
    src: "/sweden-bridge.jpg?v=2",
    alt: "Overhead view of a bridge in Sweden",
    caption: "Sweden Bridge Overhead",
    object: "object-center",
    factIndex: 2,
  },
  {
    src: "/stockholm-night.jpg",
    alt: "Stockholm waterfront at night",
    caption: "Stockholm at Night",
    object: "object-center",
    factIndex: 2,
  },
  {
    src: "/telephone-pole-girl-standing.jpg",
    alt: "A girl standing on top of a camp telephone pole",
    caption: "Telephone Pole Challenge",
    object: "object-center",
    factIndex: 3,
  },
  {
    src: "/treetop-fall-girl.jpg",
    alt: "A girl in a harness walking a log between trees in fall colors",
    caption: "Tree-Top Challenge",
    object: "object-center",
    factIndex: 3,
  },
];

const INTERVAL_MS = 5000;

export function PhotoCarousel({ facts }: { facts: string[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const activeFactIndex = PHOTOS[index]?.factIndex ?? -1;

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % PHOTOS.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, index]);

  function goTo(next: number) {
    setIndex((next + PHOTOS.length) % PHOTOS.length);
  }

  const n = PHOTOS.length || 1;

  return (
    <div className="mt-6 w-full max-w-xl mx-auto">
      <div className="relative overflow-x-hidden rounded-2xl border-2 border-[#0b2545] shadow-md">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            width: `${n * 100}%`,
            transform: `translateX(-${(index * 100) / n}%)`,
          }}
        >
          {PHOTOS.map((photo) => (
            <figure
              key={photo.src}
              className="relative aspect-[4/3] shrink-0"
              style={{ width: `${100 / n}%` }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt}
                width={640}
                height={480}
                className={`absolute inset-0 h-full w-full object-cover ${photo.object}`}
              />
              <figcaption
                className="place-label absolute bottom-2 left-1/2 z-10 m-0 w-fit -translate-x-1/2 text-center text-sm"
                style={{
                  backgroundColor: "rgba(11, 37, 69, 0.88)",
                  padding: "0.1rem 0.45rem",
                  borderRadius: "0.35rem",
                }}
              >
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <div
          className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5"
          role="tablist"
          aria-label="Choose photo"
        >
          {PHOTOS.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              role="tab"
              aria-label={`Show ${photo.caption}`}
              aria-selected={i === index}
              onClick={() => goTo(i)}
              className={`h-2 w-2 rounded-full border border-white/80 transition-colors ${
                i === index ? "bg-white" : "bg-[#0b2545]/70 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => goTo(index - 1)}
          className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#0b2545]/85 text-lg font-bold text-white hover:bg-[#0b2545]"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => goTo(index + 1)}
          className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[#0b2545]/85 text-lg font-bold text-white hover:bg-[#0b2545]"
        >
          ›
        </button>

        <button
          type="button"
          aria-label={paused ? "Resume slideshow" : "Pause slideshow"}
          onClick={() => setPaused((p) => !p)}
          className="absolute bottom-2 right-2 z-20 rounded-md bg-[#0b2545]/85 px-2 py-1 text-xs font-semibold text-white hover:bg-[#0b2545]"
        >
          {paused ? "Play" : "Pause"}
        </button>

        <p className="pointer-events-none absolute left-2 top-2 z-20 rounded-md bg-[#0b2545]/85 px-2 py-1 text-xs font-semibold text-white">
          {index + 1} / {n}
        </p>
      </div>

      <ul className="mt-4 space-y-2" aria-live="polite">
        {facts.map((fact, i) => {
          const aligned = i === activeFactIndex;
          return (
            <li
              key={fact}
              className={`flex gap-3 rounded-lg px-3 py-2 transition-colors ${
                aligned
                  ? "bg-[#00539f]/15 ring-2 ring-[#00539f]"
                  : "opacity-70"
              }`}
            >
              <span aria-hidden className="mt-1">
                ✦
              </span>
              <span className={aligned ? "font-medium" : undefined}>{fact}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
