import { isAuthorisedUser } from "@/lib/server-auth";
import FilmsPageClient from "@/app/(site)/components/films-page-client";
import { sanityFetch } from "@/sanity/lib/live";
import { watchedFilmsQuery, wishlistFilmsQuery } from "@/sanity/lib/queries";

export default async function FilmsPage() {
  const isAuthenticated = await isAuthorisedUser();

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
      isAuthenticated={isAuthenticated}
    />
  );
}
