import type { Metadata } from "next";

import Link from "next/link";

import { auth } from "@/lib/auth";
import { getAuthorizedEmails, isEmailAuthorized } from "@/lib/auth-helpers";
import AddFilmForm from "@/app/(site)/components/add-film-form";
import WishlistContent from "@/app/(site)/components/wishlist-content";
import { sanityFetch } from "@/sanity/lib/live";
import { wishlistFilmsQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Film Wishlist | Cinema Tracking",
  description: "Films planned to watch with Cineworld Unlimited pass - upcoming cinema visits.",
  openGraph: {
    title: "Film Wishlist | Cinema Tracking",
    description: "Films planned to watch with Cineworld Unlimited pass - upcoming cinema visits.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Film Wishlist | Cinema Tracking",
    description: "Films planned to watch with Cineworld Unlimited pass - upcoming cinema visits.",
  },
};

export default async function WishlistPage() {
  const session = await auth();
  const authorisedEmails = getAuthorizedEmails(process.env.AUTHORIZED_EMAILS || "");
  const isAuthenticated = !!(session?.user?.email && isEmailAuthorized(session.user.email, authorisedEmails));

  const { data: films } = await sanityFetch({
    query: wishlistFilmsQuery,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Film Wishlist</h1>
          <div className="flex gap-4">
            <Link
              href="/films"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              All Films
            </Link>
            <Link
              href="/films/wrapped"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Wrapped
            </Link>
          </div>
        </div>
        <p className="text-gray-600">
          Films planned to watch at the cinema
        </p>
      </div>
      {/* Add Film Form - Only visible when authenticated */}
      {isAuthenticated && (
        <div className="mb-8">
          <AddFilmForm />
        </div>
      )}
      <WishlistContent films={films || []} isAuthenticated={isAuthenticated} />
    </div>
  );
}
