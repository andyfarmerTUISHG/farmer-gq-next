import { NextResponse } from "next/server";

import { filmService } from "@/lib/film-api/film-service";

export async function GET(request: Request) {
  if (!filmService) {
    return NextResponse.json(
      { error: "Film service not available - OMDB_API_KEY not configured" },
      { status: 503 },
    );
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 },
    );
  }

  try {
    const result = await filmService.searchFilms(query);
    return NextResponse.json(result);
  }
  catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Search failed" },
      { status: 500 },
    );
  }
}
