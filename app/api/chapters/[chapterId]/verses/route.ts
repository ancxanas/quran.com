import { NextResponse } from "next/server";
import { getSurahVerses } from "@/app/lib/quran-api";

export async function GET(request: Request, { params }: { params: { chapterId: string } }) {
  try {
    const { chapterId } = await params;
    const id = parseInt(chapterId);
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const perPage = parseInt(searchParams.get("per_page") || "10", 10);

    if (perPage > 50) {
      return NextResponse.json({ error: "per_page cannot exceed 50" }, { status: 400 });
    }

    const response = await getSurahVerses(id, page, perPage);

    return NextResponse.json({
      data: response.verses,
      pagination: response.pagination,
    });
  } catch (error) {
    console.error("Error from getSurahVerses", error);
    return NextResponse.json(
      {
        error: "Failed to fetch verses",
      },
      { status: 500 },
    );
  }
}
