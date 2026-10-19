/**
 * ═══════════════════════════════════════════════════════════════════════
 *  YOUR PROFILE — this is the main file you edit. (The other one is
 *  src/theme.ts, where you pick your look.)
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Everything here flows automatically to:
 *   - /api/whoami and /api/profile  (what the course platform reads)
 *   - your home page and /about     (what humans read)
 *
 * Because both pages and APIs read from THIS one object, they can never
 * disagree, and "pages match the API" is one of the graded checks.
 *
 * Fill in every field, replace the placeholder photo, and you're done.
 */

export const profile = {
  /** Your name as you want it to appear everywhere. */
  displayName: "Ebony B. Davis",

  /** Your UD email — must match the one you signed into the course with. */
  email: "ebdavis@udel.edu",

  /** Where you're from. Shows on your roster card and /about. */
  hometown: "I live in Pennsylvania, USA.",

  /**
   * 2 to 4 fun facts (the grader checks the count!). Real ones: they're
   * how classmates find something to say hello about.
   */
  funFacts: [
    "I have visited both the top of the Empire State Building and the Observation Deck at Edge in New York City, both of which are over 1,100 feet high and shows off the best of New York City and the Hudson River.",
    "One of my favorite quotes is 'Do the best you can until you know better. Then when you know better, do better.' — Maya Angelou",
    "I have been to Skylon Tower Niagra Falls Restaurant and Observatory on New Year's Eve. It offers an iconic and breathtaking views and rotates 360 degrees every hour.",
    "I have walked accross a tree top and climbed up a telephone pole then fell backwards with just a harness and a rope on as a part of a overcoming fear challenge.",
  ],

  /** One decision you're proud of, in a sentence. */
  decisionImProudOf:
    "To commit to moral progress to make a difference in the world.",

  /**
   * Your photo. Replace public/photo.svg with a real photo of you
   * (e.g. put photo.jpg in the public/ folder and change this to "/photo.jpg").
   * It must be a real image file: the grader fetches it and checks.
   */
  photoPath: "/photo.jpg",

  /**
   * Who can see your roster card:
   *   "class"          — your classmates and the professor (recommended)
   *   "professor-only" — just the professor
   */
  rosterVisibility: "class" as "class" | "professor-only",

  /** A one-line tagline for your home page. Make it yours. */
  tagline: "Making a difference, one decision at a time.",

  /**
   * A short bio for your home page: two or three sentences, written like
   * a person, not a resume. What are you studying? What do you care about?
   */
  bio: "I'm so excited to share my journey as a Cybersecurity student at the University of Delaware, I'm passionate about learning how to make thoughtful, impactful decisions at every level. This site is a hands-on portfolio demonstrating my journey. It is meant to bring  to life my acts of service and my inspirations in life. Thank you so much for taking the time out of your day to check it out!",

  /**
   * Your GitHub repo URL. The course platform reads this from /api/health to
   * verify you have ≥ 5 commits spread over days (not one bulk dump).
   * Example: "https://github.com/your-username/your-repo"
   */
  repoUrl: "https://github.com/ebdavis2026-del/my-site",
};
