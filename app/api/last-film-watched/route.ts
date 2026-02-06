import { NextResponse } from "next/server";

import { client } from "@/sanity/lib/client";
import { lastFilmWatchedQuery } from "@/sanity/lib/queries";

export async function GET() {
  try {
    const film = await client.fetch(lastFilmWatchedQuery);

    return NextResponse.json({ film });
  }
  catch (error) {
    console.error("Failed to fetch last film:", error);
    return NextResponse.json(
      { error: "Failed to fetch last film" },
      { status: 500 },
    );
  }
}
