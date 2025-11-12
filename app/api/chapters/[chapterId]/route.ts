import { NextResponse } from "next/server";
import { getSurahDetails } from "@/app/lib/quran-api";

export async function GET(_request: Request, { params }: { params: { chapterId: string } }) {
  try {
    const { chapterId } = await params;
    const id = parseInt(chapterId, 10);
    const surahs = await getSurahDetails(id);
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
