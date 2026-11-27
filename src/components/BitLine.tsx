"use client";

import { useEffect, useRef } from "react";
import {
  BANNER_MOTION_EVENT,
  BANNER_MOTION_MS,
  getBannerMotionGeneration,
} from "@/lib/banner-motion";

const WAVE_PATH =
  "M0 14 H18 L22 10 L24 14 H30 L33 3 L36 25 L39 8 L41 14 H58 L61 11 L63 14 H80 " +
  "H98 L102 10 L104 14 H110 L113 3 L116 25 L119 8 L121 14 H138 L141 11 L143 14 H160 " +
  "H178 L182 10 L184 14 H190 L193 3 L196 25 L199 8 L201 14 H218 L221 11 L223 14 H240 " +
  "H258 L262 10 L264 14 H270 L273 3 L276 25 L279 8 L281 14 H298 L301 11 L303 14 H320 " +
  "H338 L342 10 L344 14 H350 L353 3 L356 25 L359 8 L361 14 H378 L381 11 L383 14 H400";

/** Slightly faster than the opener so the pulse lands as sparkles finish */
const HEARTBEAT_MS = Math.round(BANNER_MOTION_MS * 0.92);

export default function BitLine() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<SVGCircleElement>(null);
  const endTimerRef = useRef<number | null>(null);
  const fadeAnimRef = useRef<Animation | null>(null);
  const seenGenerationRef = useRef(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const ball = ballRef.current;
    if (!wrap || !ball) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const playSynced = () => {
      const generation = getBannerMotionGeneration();
      if (generation > 0) {
        seenGenerationRef.current = generation;
      }

      if (endTimerRef.current != null) {
        window.clearTimeout(endTimerRef.current);
        endTimerRef.current = null;
      }
      fadeAnimRef.current?.cancel();

      wrap.classList.remove("bit-line--done");
      wrap.style.visibility = "visible";
      wrap.style.opacity = "1";
      wrap.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 180,
        easing: "ease-out",
        fill: "forwards",
      });

      ball.querySelector("animateMotion")?.remove();
      const motion = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "animateMotion"
      );
      motion.setAttribute("path", WAVE_PATH);
      motion.setAttribute("dur", `${HEARTBEAT_MS / 1000}s`);
      motion.setAttribute("fill", "freeze");
      motion.setAttribute("repeatCount", "1");
      ball.appendChild(motion);
      (motion as SVGAnimationElement).beginElement();

      endTimerRef.current = window.setTimeout(() => {
        fadeAnimRef.current = wrap.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 280,
          easing: "ease-out",
          fill: "forwards",
        });
        fadeAnimRef.current.finished.then(() => {
          wrap.classList.add("bit-line--done");
          wrap.style.opacity = "0";
          ball.querySelector("animateMotion")?.remove();
        });
        endTimerRef.current = null;
      }, BANNER_MOTION_MS);
    };

    window.addEventListener(BANNER_MOTION_EVENT, playSynced);

    // If the 3D title already fired before this listener attached, catch up.
    if (getBannerMotionGeneration() > seenGenerationRef.current) {
      playSynced();
    }

    return () => {
      window.removeEventListener(BANNER_MOTION_EVENT, playSynced);
      if (endTimerRef.current != null) window.clearTimeout(endTimerRef.current);
      fadeAnimRef.current?.cancel();
    };
  }, []);

  return (
    <div ref={wrapRef} className="bit-line" aria-hidden>
      <svg
        className="bit-line__svg"
        viewBox="0 0 400 28"
        preserveAspectRatio="none"
      >
        <path className="bit-line__wave" d={WAVE_PATH} fill="none" />
        <circle
          ref={ballRef}
          className="bit-line__ball"
          r="3.4"
          cx="0"
          cy="14"
          fill="#ffd200"
        />
      </svg>
    </div>
  );
}
