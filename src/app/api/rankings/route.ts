import { NextResponse } from "next/server";
import { getWeeklyRankings } from "@/lib/youtube";

export const revalidate = 3600;

export async function GET() {
  try {
    const result = await getWeeklyRankings();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to load weekly rankings", error);
    return NextResponse.json(
      { error: "Failed to load weekly rankings" },
      { status: 500 }
    );
  }
}
