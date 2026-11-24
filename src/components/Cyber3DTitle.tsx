"use client";

import { useEffect, useRef } from "react";

export default function Cyber3DTitle({ children = "cybersecurity" }: { children?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.transform = "perspective(600px) translateZ(20px) rotateX(12deg) scale(1.05)";
      return;
    }

    let playing = false;
    let wasVisible = false;

    const play = () => {
      if (playing) return;
      playing = true;

      const anim = el.animate(
        [
          {
            transform: "perspective(600px) translateZ(-48px) rotateX(28deg) scale(0.72)",
            opacity: 0.5,
            offset: 0,
          },
          {
            transform: "perspective(600px) translateZ(56px) rotateX(6deg) scale(1.32)",
            opacity: 1,
            offset: 0.38,
          },
          {
            transform: "perspective(600px) translateZ(-12px) rotateX(18deg) scale(0.9)",
            opacity: 1,
            offset: 0.68,
          },
          {
            transform: "perspective(600px) translateZ(22px) rotateX(12deg) scale(1.08)",
            opacity: 1,
            offset: 1,
          },
        ],
        {
          duration: 3000,
          easing: "cubic-bezier(0.22, 0.9, 0.28, 1)",
          fill: "forwards",
        }
      );

      anim.finished.finally(() => {
        playing = false;
      });
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(entry?.isIntersecting);
        if (visible && !wasVisible) {
          play(); // only when it newly comes into view
        }
        wasVisible = visible;
      },
      { threshold: 0.35, rootMargin: "0px" }
    );
    io.observe(el);

    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className="cyber-3d__text">
      {children}
    </span>
  );
}
