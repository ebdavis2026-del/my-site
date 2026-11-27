"use client";

import { useEffect, useRef } from "react";

/** Slow continuous lap around the about intro */
const DURATION_MS = 48000;
/** Align path with the outer double-black frame edge */
const INSET = 1;
const BIT_FLIP_MS = 420;

export default function AboutBitOrbit() {
  const frameRef = useRef<HTMLDivElement>(null);
  const byteRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);
  const playingRef = useRef(false);
  const wasVisibleRef = useRef(false);
  const flipIdRef = useRef<number | null>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const byte = byteRef.current;
    if (!frame || !byte) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      frame.style.display = "none";
      return;
    }

    const bits = [...byte.querySelectorAll<HTMLSpanElement>("span")];

    const stopFlip = () => {
      if (flipIdRef.current != null) {
        window.clearInterval(flipIdRef.current);
        flipIdRef.current = null;
      }
    };

    const paintBits = () => {
      bits.forEach((bit) => {
        bit.dataset.bit = Math.random() < 0.55 ? "1" : "0";
      });
    };

    const placePath = () => {
      const w = frame.clientWidth;
      const h = frame.clientHeight;
      if (w < 40 || h < 40) return "";
      return `path("M ${INSET} ${INSET} H ${w - INSET} V ${h - INSET} H ${INSET} Z")`;
    };

    const playLoop = () => {
      if (playingRef.current) return;
      const path = placePath();
      if (!path) return;

      playingRef.current = true;
      frame.classList.remove("about-bit-orbit--done");
      frame.style.opacity = "1";

      byte.style.offsetPath = path;
      byte.style.offsetRotate = "auto";
      paintBits();
      stopFlip();
      flipIdRef.current = window.setInterval(paintBits, BIT_FLIP_MS);

      animRef.current?.cancel();
      animRef.current = byte.animate(
        [{ offsetDistance: "0%" }, { offsetDistance: "100%" }],
        {
          duration: DURATION_MS,
          easing: "linear",
          iterations: Infinity,
        }
      );
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(entry?.isIntersecting);
        if (visible && !wasVisibleRef.current) {
          playLoop();
        }
        wasVisibleRef.current = visible;
      },
      { threshold: 0.15 }
    );
    io.observe(frame);

    const ro = new ResizeObserver(() => {
      const path = placePath();
      if (!path) return;
      if (playingRef.current) {
        byte.style.offsetPath = path;
      } else if (wasVisibleRef.current || frame.getBoundingClientRect().height > 40) {
        wasVisibleRef.current = true;
        playLoop();
      }
    });
    ro.observe(frame);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const rect = frame.getBoundingClientRect();
        const onScreen = rect.top < window.innerHeight && rect.bottom > 0;
        if (onScreen) {
          wasVisibleRef.current = true;
          playLoop();
        }
      });
    });

    return () => {
      io.disconnect();
      ro.disconnect();
      stopFlip();
      animRef.current?.cancel();
      playingRef.current = false;
    };
  }, []);

  return (
    <div ref={frameRef} className="about-bit-orbit" aria-hidden>
      <div className="about-bit-orbit__rail" />
      <div ref={byteRef} className="about-bit-orbit__byte">
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}
