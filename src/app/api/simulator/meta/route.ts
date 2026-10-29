import { NextResponse } from "next/server";

/**
 * Challenge 3 handshake. The grader knocks here before it sends games, and
 * the token proves this simulator belongs to this site.
 */
export async function GET() {
  return NextResponse.json({
    service: "simulator",
    specVersion: "1",
    studentToken: process.env.SITE_TOKEN,
  });
}
