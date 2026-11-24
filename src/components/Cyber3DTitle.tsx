"use client";

import { useEffect, useRef } from "react";

export default function Cyber3DTitle({ children = "cybersecurity" }: { children?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.transform = "scale(1.08)";
      return;
    }

    const play = () => {
      if (started.current) return;
      started.current = true;

      el.animate(
        [
          {
            transform: "scale(0.5)",
            letterSpacing: "0.1em",
            opacity: 0.35,
            offset: 0,
          },
          {
            transform: "scale(1.4)",
            letterSpacing: "0.36em",
            opacity: 1,
            offset: 0.45,
          },
          {
            transform: "scale(1.08)",
            letterSpacing: "0.28em",
            opacity: 1,
            offset: 1,
          },
        ],
        {
          duration: 2600,
          easing: "cubic-bezier(0.12, 0.7, 0.2, 1)",
          fill: "forwards",
        }
      );
    };

    const inView = () => {
      const r = el.getBoundingClientRect();
      return r.bottom > 20 && r.top < window.innerHeight - 20 && r.width > 0;
    };

    let delayTimer: number | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) play();
      },
      { threshold: 0.1 }
    );
    io.observe(el);

    if (inView()) {
      delayTimer = window.setTimeout(play, 80);
    }

    return () => {
      io.disconnect();
      if (delayTimer) window.clearTimeout(delayTimer);
    };
  }, []);

  return (
    <span ref={ref} className="cyber-3d__text">
      {children}
    </span>
  );
}
