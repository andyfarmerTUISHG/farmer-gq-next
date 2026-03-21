import { auth } from "@/lib/auth";
import { getAuthorizedEmails, isEmailAuthorized } from "@/lib/auth-helpers";
import FilmsPageClient from "@/app/(site)/components/films-page-client";
import { sanityFetch } from "@/sanity/lib/live";
import { watchedFilmsQuery, wishlistFilmsQuery } from "@/sanity/lib/queries";

export default async function FilmsPage() {
  const session = await auth();
  const authorisedEmails = getAuthorizedEmails(process.env.AUTHORIZED_EMAILS || "");
  const isAuthenticated = !!(session?.user?.email && isEmailAuthorized(session.user.email, authorisedEmails));

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
      isDraftMode={isAuthenticated}
    />
  );
}
