"use client";

import { useEffect, useRef } from "react";
import { BANNER_MOTION_MS, startBannerMotion } from "@/lib/banner-motion";

const SPARKLE_SPOTS = [
  { top: "-14px", left: "2%", delay: 80, size: 26 },
  { top: "-18px", left: "22%", delay: 200, size: 32 },
  { top: "-10px", left: "48%", delay: 140, size: 24 },
  { top: "-16px", left: "72%", delay: 280, size: 30 },
  { top: "-8px", left: "92%", delay: 360, size: 28 },
  { top: "18%", left: "-6%", delay: 420, size: 22 },
  { top: "12%", left: "38%", delay: 500, size: 20 },
  { top: "22%", left: "58%", delay: 180, size: 26 },
  { top: "8%", left: "98%", delay: 440, size: 24 },
  { top: "48%", left: "-4%", delay: 560, size: 28 },
  { top: "42%", left: "96%", delay: 320, size: 30 },
  { top: "72%", left: "6%", delay: 600, size: 26 },
  { top: "78%", left: "28%", delay: 480, size: 22 },
  { top: "68%", left: "52%", delay: 240, size: 28 },
  { top: "80%", left: "76%", delay: 520, size: 24 },
  { top: "70%", left: "94%", delay: 380, size: 32 },
];

/** Second wave — offset positions so it reads as a fresh burst */
const SPARKLE_SPOTS_2 = [
  { top: "-6px", left: "12%", delay: 60, size: 22 },
  { top: "-20px", left: "34%", delay: 160, size: 28 },
  { top: "4%", left: "56%", delay: 100, size: 20 },
  { top: "-14px", left: "82%", delay: 220, size: 26 },
  { top: "28%", left: "4%", delay: 300, size: 24 },
  { top: "16%", left: "46%", delay: 140, size: 18 },
  { top: "34%", left: "70%", delay: 260, size: 22 },
  { top: "58%", left: "88%", delay: 200, size: 28 },
  { top: "64%", left: "18%", delay: 340, size: 24 },
  { top: "84%", left: "40%", delay: 180, size: 20 },
  { top: "76%", left: "62%", delay: 280, size: 26 },
  { top: "88%", left: "90%", delay: 120, size: 22 },
];

const SPARKLE_KEYS = [
  { opacity: 0, transform: "scale(0.15) rotate(-25deg)" },
  { opacity: 1, transform: "scale(1.8) rotate(10deg)", offset: 0.14 },
  { opacity: 1, transform: "scale(1.4) rotate(14deg)", offset: 0.48 },
  { opacity: 0, transform: "scale(0.4) rotate(32deg)" },
] as Keyframe[];

export default function Cyber3DTitle({ children = "cybersecurity" }: { children?: string }) {
  const textRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const sparkleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sparkle2Refs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = textRef.current;
    const wrap = wrapRef.current;
    if (!el || !wrap) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.transform = "perspective(600px) translateZ(20px) rotateX(12deg) scale(1.05)";
      return;
    }

    let playing = false;
    let wasVisible = false;

    const playWave = (
      nodes: (HTMLSpanElement | null)[],
      spots: typeof SPARKLE_SPOTS,
      waveStart: number,
      waveEnd: number
    ) => {
      nodes.forEach((node, i) => {
        if (!node) return;
        const spotDelay = spots[i]?.delay ?? 0;
        const delay = waveStart + spotDelay;
        const duration = Math.max(900, waveEnd - delay);
        node.animate(SPARKLE_KEYS, {
          duration,
          delay,
          easing: "ease-out",
          fill: "forwards",
        });
      });
    };

    const playSparkles = () => {
      // Yellow first burst, then cool second burst — both clear by BANNER_MOTION_MS
      const mid = Math.round(BANNER_MOTION_MS * 0.42);
      playWave(sparkleRefs.current, SPARKLE_SPOTS, 0, mid + 400);
      playWave(sparkle2Refs.current, SPARKLE_SPOTS_2, mid, BANNER_MOTION_MS);
    };

    const play = () => {
      if (playing) return;
      playing = true;
      startBannerMotion();
      playSparkles();

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
          duration: BANNER_MOTION_MS,
          easing: "cubic-bezier(0.22, 0.85, 0.28, 1)",
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
          play();
        }
        wasVisible = visible;
      },
      { threshold: 0.2, rootMargin: "0px" }
    );
    io.observe(wrap);

    requestAnimationFrame(() => {
      const rect = wrap.getBoundingClientRect();
      const onScreen = rect.top < window.innerHeight && rect.bottom > 0;
      if (onScreen && !wasVisible) {
        wasVisible = true;
        play();
      }
    });

    return () => io.disconnect();
  }, []);

  return (
    <span ref={wrapRef} className="cyber-3d__wrap">
      <span ref={textRef} className="cyber-3d__text">
        {children}
      </span>
      {SPARKLE_SPOTS.map((s, i) => (
        <span
          key={`a-${i}`}
          ref={(node) => {
            sparkleRefs.current[i] = node;
          }}
          className="cyber-3d__sparkle"
          aria-hidden
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            fontSize: s.size,
          }}
        >
          ✦
        </span>
      ))}
      {SPARKLE_SPOTS_2.map((s, i) => (
        <span
          key={`b-${i}`}
          ref={(node) => {
            sparkle2Refs.current[i] = node;
          }}
          className="cyber-3d__sparkle cyber-3d__sparkle--cool"
          aria-hidden
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            fontSize: s.size,
          }}
        >
          ✦
        </span>
      ))}
    </span>
  );
}
