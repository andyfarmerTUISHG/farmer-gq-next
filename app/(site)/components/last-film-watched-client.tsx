"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type LastFilmData = {
  _id: string;
  title: string;
  slug: string;
  status: "watched";
  isSecretScreening?: boolean;
  year?: number;
  dateWatched: string;
  cinemaLocation?: string;
  personalRating?: number;
  watchedYear: string;
};

type LastFilmWatchedClientProps = {
  className?: string;
};

export default function LastFilmWatchedClient({ className = "" }: LastFilmWatchedClientProps) {
  const [film, setFilm] = useState<LastFilmData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLastFilm() {
      try {
        const response = await fetch("/api/last-film-watched");
        if (response.ok) {
          const data = await response.json();
          setFilm(data.film);
        }
      }
      catch (error) {
        console.error("Failed to fetch last film:", error);
      }
      finally {
        setLoading(false);
      }
    }

    fetchLastFilm();
  }, []);

  if (loading) {
    return (
      <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-2 w-32"></div>
          <div className="h-4 bg-gray-200 rounded mb-4 w-24"></div>
          <div className="h-8 bg-gray-200 rounded mb-3 w-48"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </div>
      </div>
    );
  }

  if (!film) {
    return null;
  }

  const currentYear = new Date().getFullYear().toString();
  const isCurrentYear = film.watchedYear === currentYear;
  const contextText = isCurrentYear ? "Just watched" : "Last watched";

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            🎬
            {" "}
            {contextText}
          </h3>
          <p className="text-sm text-gray-600">
            {isCurrentYear ? "Latest cinema visit" : `From ${film.watchedYear}`}
          </p>
        </div>
        {film.isSecretScreening && (
          <span className="text-lg" title="Secret Screening">🤫</span>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <Link
            href={`/films/${film.slug}`}
            className="text-xl font-bold text-blue-700 hover:text-blue-900 transition-colors"
          >
            {film.title}
          </Link>
          {film.year && (
            <span className="text-gray-600 ml-2">
              (
              {film.year}
              )
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-gray-700">
          {film.dateWatched && (
            <div className="flex items-center gap-1">
              <span>📅</span>
              <span>{new Date(film.dateWatched).toLocaleDateString("en-GB")}</span>
            </div>
          )}

          {film.cinemaLocation && (
            <div className="flex items-center gap-1">
              <span>🏢</span>
              <span className="truncate max-w-48">{film.cinemaLocation}</span>
            </div>
          )}

          {film.personalRating && (
            <div className="flex items-center gap-1">
              <span>{"⭐".repeat(film.personalRating)}</span>
              <span>
                (
                {film.personalRating}
                /5)
              </span>
            </div>
          )}
        </div>

        <div className="pt-2">
          <Link
            href="/films"
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            View all films →
          </Link>
        </div>
      </div>
    </div>
  );
}
