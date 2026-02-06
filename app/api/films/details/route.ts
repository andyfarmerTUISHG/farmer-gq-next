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
  const imdbId = searchParams.get("imdbId");

  if (!imdbId) {
    return NextResponse.json({ error: "IMDB ID is required" }, { status: 400 });
  }

  try {
    const result = await filmService.getFilmDetails(imdbId);
    return NextResponse.json(result);
  }
  catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch film details" },
      { status: 500 },
    );
  }
}
