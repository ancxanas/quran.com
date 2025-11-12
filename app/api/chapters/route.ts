import { NextResponse } from "next/server";
import { getSurahList } from "@/app/lib/quran-api";

export async function GET() {
  try {
    const surahs = await getSurahList();
    return NextResponse.json({ data: surahs });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch surahs" },
      {
        status: error instanceof Error && error.message.includes("Authentication") ? 401 : 500,
      },
    );
  }
}
