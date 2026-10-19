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
  hometown: "Pennsylvania, United States.",

  /**
   * 2 to 4 fun facts (the grader checks the count!). Real ones: they're
   * how classmates find something to say hello about.
   */
  funFacts: [
    "I have been to both sides of Niagara Falls: The American side, also known as the American Falls, and the Canadian side, also known as the Horseshoe Falls.",
    "I visited a Sweden in the summer of 2018. I was fascinated by the country and the people. Sweden's National Freedom Day is called the National Day of Sweden.",
    "People will forget what you said, but people will never forget how you made them feel. — Maya Angelou",
    "The only way to do great work is to love what you do. — Steve Jobs",
  ],

  /** One decision you're proud of, in a sentence. */
  decisionImProudOf:
    "To make a decision to commit to moral progress..",

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
