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
          <div className="flex h-full w-full">
            <div
              className="h-full w-1/3 bg-cover bg-center"
              style={{ backgroundImage: "url(/niagara-american.jpg)" }}
            />
            <div
              className="h-full w-1/3 bg-cover bg-center"
              style={{ backgroundImage: "url(/niagara-canadian.jpg)" }}
            />
            <div
              className="h-full w-1/3 bg-cover bg-center"
              style={{ backgroundImage: "url(/skylon-tower.jpg)" }}
            />
          </div>
          <div className="absolute inset-0 bg-white/78" />
        </div>
        <header className="border-b border-line bg-surface/90">
          <div className="mx-auto flex max-w-3xl items-baseline justify-between px-6 py-5">
            <Link href="/" className="text-base font-bold tracking-tight" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
              {profile.displayName}
            </Link>
            <nav className="flex gap-5 text-base font-medium text-muted">
              <Link href="/" className="transition hover:text-accent">
                Home
              </Link>
              <Link href="/about" className="transition hover:text-accent">
                About
              </Link>
            </nav>
          </div>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="border-t border-line">
          <div className="mx-auto max-w-3xl px-6 py-6 text-sm text-muted">
            <p>
              {profile.displayName} · a portfolio of decision services ·{" "}
              <span className="text-accent">Good Decisions at Any Scale</span>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
