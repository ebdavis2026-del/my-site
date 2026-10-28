import type { Metadata } from "next";
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { profile } from "@/profile";
import { resolvedTheme } from "@/theme";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.displayName} — Decision Services`,
  description: profile.tagline,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const theme = resolvedTheme();
  // Your palette and fonts become CSS variables here; globals.css maps them
  // into Tailwind utilities. One theme file, zero CSS edits.
  const themeVars = {
    "--paper": theme.paper,
    "--surface": theme.surface,
    "--ink": theme.ink,
    "--muted": theme.muted,
    "--line": theme.line,
    "--accent": theme.accent,
    "--accent-ink": theme.accentInk,
    "--heading-font": theme.headingFont,
    "--body-font": theme.bodyFont,
  } as CSSProperties;

  return (
    <html lang="en" className={fontVariables} style={themeVars}>
      <body className="flex min-h-screen flex-col">
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: "url(/stockholm-square.jpg)" }}
          />
          <div className="absolute inset-0 bg-white/10" />
        </div>
        <header className="bar-shade border-b border-line/70">
          <div className="flex items-center justify-between gap-4 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex shrink-0 flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/cyber-logo.svg"
                  alt="An original colorful emblem"
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-md border-[3px] border-[#0b2545] object-cover shadow-sm"
                />
                <span className="on-photo mt-1 text-center text-[10px] leading-none tracking-tight">
                  Cybersecurity
                </span>
              </div>
              <div className="flex shrink-0 flex-col items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/ud-campus-bright.jpg"
                  alt="University of Delaware"
                  width={88}
                  height={64}
                  className="h-14 w-20 rounded-md border-[3px] border-[#0b2545] object-cover shadow-sm"
                />
                <span className="on-photo mt-1 text-center text-[10px] leading-none tracking-tight">
                  UD
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start gap-1">
              <Link href="/" className="name-about on-photo text-lg">
                {profile.displayName}
              </Link>
              <nav className="on-photo flex gap-4 text-base">
                <Link href="/" className="transition hover:text-accent">
                  Home
                </Link>
                <Link href="/about" className="transition hover:text-accent">
                  About
                </Link>
              </nav>
            </div>
          </div>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="bar-shade border-t border-line/70">
          <div className="on-photo mx-auto max-w-3xl px-6 py-6 text-base">
            <p>
              {profile.displayName} · a portfolio of decision services ·{" "}
              <span>Good Decisions at Any Scale</span>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
