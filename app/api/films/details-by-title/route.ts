import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { filmService } from "@/lib/film-api/film-service";

export async function GET(request: NextRequest) {
  if (!filmService) {
    return NextResponse.json(
      { error: "Film service not available - OMDB_API_KEY not configured" },
      { status: 503 },
    );
  }

  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const year = searchParams.get("year");

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  try {
    const result = await filmService.getFilmDetailsByTitle(title, year ? Number.parseInt(year) : undefined);
    return NextResponse.json(result);
  }
  catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch film details" },
      { status: 500 },
    );
  }
}
