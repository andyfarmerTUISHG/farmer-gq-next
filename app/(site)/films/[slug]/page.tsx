import type { Metadata } from "next";

import { draftMode } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

import { auth } from "@/lib/auth";
import { getAuthorizedEmails, isEmailAuthorized } from "@/lib/auth-helpers";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { allFilmSlugsQuery, filmBySlugQuery } from "@/sanity/lib/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(allFilmSlugsQuery);

  return slugs?.map((slug: string) => ({ slug })) || [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: film } = await sanityFetch({
    query: filmBySlugQuery,
    params: { slug },
  });

  if (!film) {
    return {
      title: "Film Not Found",
    };
  }

  const title = `${film.title}${film.year ? ` (${film.year})` : ""} | Films`;
  const description = film.status === "watched"
    ? `Watched at ${film.cinemaLocation || "cinema"} - Rating: ${film.personalRating || "Not rated"}/5`
    : `On wishlist - Added ${film.dateAddedToWishlist ? new Date(film.dateAddedToWishlist).toLocaleDateString("en-GB") : "recently"}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function FilmDetailPage({ params }: Props) {
  const { slug } = await params;

  // Check authentication status
  let isDraftMode = false;
  try {
    isDraftMode = (await draftMode()).isEnabled;
  }
  catch (error) {
    console.error("Error checking draft mode:", error);
    isDraftMode = false;
  }

  const session = await auth();
  const authorisedEmails = getAuthorizedEmails(process.env.AUTHORIZED_EMAILS || "");
  const isAuthenticated = !!(session?.user?.email && isEmailAuthorized(session.user.email, authorisedEmails));

  const { data: film } = await sanityFetch({
    query: filmBySlugQuery,
    params: { slug },
    stega: isDraftMode,
  });

  if (!film) {
    notFound();
  }

  const statusIcon = film.status === "wishlist" ? "📋" : "✅";
  const secretIcon = film.isSecretScreening ? "🤫" : "";

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <Link href="/films" className="text-blue-600 hover:text-blue-800">
          Films
        </Link>
        {film.status === "wishlist" && (
          <>
            {" > "}
            <Link href="/films/wishlist" className="text-blue-600 hover:text-blue-800">
              Wishlist
            </Link>
          </>
        )}
        <span className="text-gray-500">
          {" "}
          {film.title}
        </span>
      </nav>

      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {film.title}
                {film.year && (
                  <span className="text-gray-600">
                    {" "}
                    (
                    {film.year}
                    )
                  </span>
                )}
              </h1>
              <div className="flex items-center gap-2 text-lg">
                {secretIcon && <span title="Secret Screening">{secretIcon}</span>}
                <span title={`Status: ${film.status}`}>{statusIcon}</span>
                <span className="capitalize text-gray-600">{film.status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Film Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Viewing Details for Watched Films */}
            {film.status === "watched" && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Viewing Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {film.dateWatched && (
                    <div>
                      <h3 className="font-medium text-gray-700">Date Watched</h3>
                      <p>{new Date(film.dateWatched).toLocaleDateString("en-GB")}</p>
                    </div>
                  )}
                  {film.cinemaLocation && (
                    <div>
                      <h3 className="font-medium text-gray-700">Cinema</h3>
                      <p>{film.cinemaLocation}</p>
                    </div>
                  )}
                  {film.personalRating && (
                    <div>
                      <h3 className="font-medium text-gray-700">Personal Rating</h3>
                      <p>
                        {"⭐".repeat(film.personalRating)}
                        {" "}
                        (
                        {film.personalRating}
                        /5)
                      </p>
                    </div>
                  )}
                  {film.dateAddedToWishlist && film.dateWatched && (
                    <div>
                      <h3 className="font-medium text-gray-700">Wait Time</h3>
                      <p>
                        {Math.ceil(
                          (new Date(film.dateWatched).getTime()
                            - new Date(film.dateAddedToWishlist).getTime())
                          / (1000 * 60 * 60 * 24),
                        )}
                        {" "}
                        days
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Wishlist Details */}
            {film.status === "wishlist" && film.dateAddedToWishlist && (
              <div className="bg-blue-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Wishlist Details</h2>
                <div>
                  <h3 className="font-medium text-gray-700">Added to Wishlist</h3>
                  <p>{new Date(film.dateAddedToWishlist).toLocaleDateString("en-GB")}</p>
                </div>
              </div>
            )}

            {/* Personal Notes - Only show if notes exist and user is authenticated */}
            {isAuthenticated && film.personalNotes && film.personalNotes.trim() && (
              <div className="bg-yellow-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Personal Notes</h2>
                <div className="whitespace-pre-wrap">{film.personalNotes}</div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Poster */}
            {film.posterUrl && (
              <div className="bg-white border rounded-lg p-6">
                <img
                  src={film.posterUrl}
                  alt={`${film.title} poster`}
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            )}

            {/* Film Info */}
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Film Information</h2>
              <div className="space-y-3">
                {film.plot && (
                  <div>
                    <h3 className="font-medium text-gray-700">Synopsis</h3>
                    <p className="text-sm">{film.plot}</p>
                  </div>
                )}
                {film.year && (
                  <div>
                    <h3 className="font-medium text-gray-700">Release Year</h3>
                    <p>{film.year}</p>
                  </div>
                )}
                {film.runtime && (
                  <div>
                    <h3 className="font-medium text-gray-700">Runtime</h3>
                    <p>
                      {film.runtime}
                      {" "}
                      minutes
                    </p>
                  </div>
                )}
                {film.imdbId && (
                  <div>
                    <h3 className="font-medium text-gray-700">IMDB</h3>
                    <a
                      href={`https://www.imdb.com/title/${film.imdbId}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      View on IMDB
                    </a>
                  </div>
                )}
                {film.isSecretScreening && (
                  <div>
                    <h3 className="font-medium text-gray-700">Special</h3>
                    <p>🤫 Secret Screening</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
