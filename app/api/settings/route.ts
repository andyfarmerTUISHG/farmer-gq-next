import { NextResponse } from "next/server";

import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";

export async function GET() {
  try {
    const { data: settings } = await sanityFetch({
      query: settingsQuery,
    });

    return NextResponse.json({
      defaultCinema: settings?.defaultCinema || null,
    });
  }
  catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 },
    );
  }
}
