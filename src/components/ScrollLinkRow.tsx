"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  label: string;
  href: string;
  tone?: "blue" | "green";
};

export default function ScrollLinkRow({ label, href, tone = "blue" }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [thumb, setThumb] = useState({ width: 100, left: 0, needed: false });

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const update = () => {
      const { clientWidth, scrollWidth, scrollLeft } = el;
      const needed = scrollWidth > clientWidth + 1;
      const width = needed ? Math.max(18, (clientWidth / scrollWidth) * clientWidth) : clientWidth;
      const maxLeft = Math.max(0, clientWidth - width);
      const left = needed
        ? (scrollLeft / Math.max(1, scrollWidth - clientWidth)) * maxLeft
        : 0;
      setThumb({ width, left, needed });
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [href]);

  return (
    <div className={`roster-link-wrap roster-link-wrap--${tone} mt-1 min-w-0`}>
      <div ref={viewportRef} className="roster-link-row">
        <span className="font-bold">{label}:</span>{" "}
        <a
          href={href}
          className="repo-link font-semibold text-blue-600 underline decoration-2 underline-offset-2 hover:text-blue-800"
        >
          {href}
        </a>
      </div>
      <div
        className="roster-link-track"
        aria-hidden="true"
        onClick={(e) => {
          const el = viewportRef.current;
          if (!el || !thumb.needed) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const ratio = (e.clientX - rect.left) / rect.width;
          el.scrollLeft = ratio * (el.scrollWidth - el.clientWidth);
        }}
      >
        <div
          className="roster-link-thumb"
          style={{ width: `${thumb.width}px`, transform: `translateX(${thumb.left}px)` }}
        />
      </div>
    </div>
  );
}
