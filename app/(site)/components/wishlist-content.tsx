"use client";

import { useState } from "react";

import FilmCard from "@/app/(site)/components/film-card";
import MarkAsWatchedForm from "@/app/(site)/components/mark-as-watched-form";

type WishlistFilm = {
  _id: string;
  title: string;
  slug: string;
  status: "wishlist";
  year?: number;
  dateAddedToWishlist?: string;
  isSecretScreening?: boolean;
};

type WishlistContentProps = {
  films: WishlistFilm[];
  isDraftMode: boolean;
};

export default function WishlistContent({ films, isDraftMode }: WishlistContentProps) {
  const [selectedFilm, setSelectedFilm] = useState<{ id: string; title: string; wishlistDate?: string } | null>(null);

  const handleMarkAsWatched = (filmId: string, filmTitle: string) => {
    const film = films.find(f => f._id === filmId);
    setSelectedFilm({
      id: filmId,
      title: filmTitle,
      wishlistDate: film?.dateAddedToWishlist,
    });
  };

  const handleSuccess = () => {
    setSelectedFilm(null);
    // Page will auto-refresh due to revalidatePath in the server action
  };

  const handleCancel = () => {
    setSelectedFilm(null);
  };

  if (selectedFilm) {
    return (
      <div className="container mx-auto px-4 py-8">
        <MarkAsWatchedForm
          filmId={selectedFilm.id}
          filmTitle={selectedFilm.title}
          currentWishlistDate={selectedFilm.wishlistDate}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  return (
    <>
      {films && films.length > 0
        ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {films.map(film => (
                <FilmCard
                  key={film._id}
                  _id={film._id}
                  title={film.title}
                  slug={film.slug}
                  status={film.status}
                  year={film.year}
                  runtime={film.runtime}
                  posterUrl={film.posterUrl}
                  dateAddedToWishlist={film.dateAddedToWishlist}
                  isSecretScreening={film.isSecretScreening}
                  showMarkAsWatched={isDraftMode}
                  onMarkAsWatched={handleMarkAsWatched}
                />
              ))}
            </div>
          )
        : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No films on wishlist yet.</p>
              <p className="text-gray-400 text-sm mt-2">
                Add some films in Sanity Studio to get started.
              </p>
            </div>
          )}
    </>
  );
}
