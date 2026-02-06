import { draftMode } from "next/headers";

import FilmsPageClient from "@/app/(site)/components/films-page-client";
import { sanityFetch } from "@/sanity/lib/live";
import { watchedFilmsQuery, wishlistFilmsQuery } from "@/sanity/lib/queries";

export default async function FilmsPage() {
  // Check authentication status
  let isDraftMode = false;
  try {
    isDraftMode = (await draftMode()).isEnabled;
  }
  catch (error) {
    console.error("Error checking draft mode:", error);
    isDraftMode = false;
  }

  const { data: recentFilms } = await sanityFetch({
    query: watchedFilmsQuery,
  });

  const { data: wishlistFilms } = await sanityFetch({
    query: wishlistFilmsQuery,
  });

  const { data: allWatchedFilms } = await sanityFetch({
    query: watchedFilmsQuery,
  });

  return (
    <FilmsPageClient
      recentFilms={recentFilms}
      wishlistFilms={wishlistFilms}
      allWatchedFilms={allWatchedFilms}
      isDraftMode={isDraftMode}
    />
  );
}
