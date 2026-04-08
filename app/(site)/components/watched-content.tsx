"use client";

import { useMemo, useState } from "react";

import FilmCard from "./film-card";

type WatchedFilm = {
  _id: string;
  title: string;
  slug?: string;
  status: "watched";
  year?: number;
  runtime?: number;
  posterUrl?: string;
  dateWatched?: string;
  cinemaLocation?: string;
  personalRating?: number;
  isSecretScreening?: boolean;
};

type WatchedContentProps = {
  films: WatchedFilm[];
  isAuthenticated: boolean;
};

export default function WatchedContent({ films, isAuthenticated: _ }: WatchedContentProps) {
  // Get unique years from watched films
  const availableYears = useMemo(() => {
    const years = films
      .filter(film => film.dateWatched)
      .map(film => new Date(film.dateWatched!).getFullYear())
      .filter((year, index, array) => array.indexOf(year) === index)
      .sort((a, b) => b - a); // Most recent first

    return years;
  }, [films]);

  const [selectedYear, setSelectedYear] = useState<number | "all">(
    availableYears.length > 0 ? availableYears[0] : "all",
  );

  // Filter films by selected year
  const filteredFilms = useMemo(() => {
    if (selectedYear === "all")
      return films;

    return films.filter((film) => {
      if (!film.dateWatched)
        return false;
      return new Date(film.dateWatched).getFullYear() === selectedYear;
    });
  }, [films, selectedYear]);

  return (
    <>
      {/* Year Filter Tabs */}
      {availableYears.length > 1 && (
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setSelectedYear("all")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  selectedYear === "all"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                All Years (
                {films.length}
                )
              </button>
              {availableYears.map((year) => {
                const yearCount = films.filter(film =>
                  film.dateWatched && new Date(film.dateWatched).getFullYear() === year,
                ).length;

                return (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      selectedYear === year
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {year}
                    {" "}
                    (
                    {yearCount}
                    )
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {filteredFilms && filteredFilms.length > 0
        ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFilms.map(film => (
                <FilmCard
                  key={film._id}
                  _id={film._id}
                  title={film.title}
                  slug={film.slug}
                  status={film.status}
                  year={film.year}
                  runtime={film.runtime}
                  posterUrl={film.posterUrl}
                  dateWatched={film.dateWatched}
                  cinemaLocation={film.cinemaLocation}
                  personalRating={film.personalRating}
                  isSecretScreening={film.isSecretScreening}
                />
              ))}
            </div>
          )
        : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {selectedYear === "all"
                  ? "No watched films yet."
                  : `No films watched in ${selectedYear}.`}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Mark films as watched from your wishlist or add them in Sanity Studio.
              </p>
            </div>
          )}
    </>
  );
}
