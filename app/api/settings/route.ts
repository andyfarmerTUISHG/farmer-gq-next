import { NextResponse } from "next/server";

import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/lib/queries";

export async function GET() {
  try {
    const { data: settings } = await sanityFetch({
      query: settingsQuery,
    });

    // Sanitize the default cinema value to remove any invisible characters
    const defaultCinema = settings?.defaultCinema 
      ? settings.defaultCinema
          .trim()
          .replace(/[\u200B-\u200D\uFEFF]/g, "")
          .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
      : null;

    return NextResponse.json({
      defaultCinema,
    });
  }
  catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch settings ${error}` },
      { status: 500 },
    );
  }
}
