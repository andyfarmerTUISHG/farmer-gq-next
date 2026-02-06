"use client";

import { useState } from "react";

import type { FilmSearchResult } from "@/lib/film-api/types";

import { addFilmAsWatchedAction, addFilmToWishlistAction, searchFilmsAction } from "@/app/(site)/actions/film-actions";

type AddFilmFormProps = {
  onSuccess?: () => void;
};

export default function AddFilmForm({ onSuccess }: AddFilmFormProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FilmSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState<string | null>(null);
  const [selectedFilm, setSelectedFilm] = useState<FilmSearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Mark as watched form state
  const [dateWatched, setDateWatched] = useState(new Date().toISOString().split("T")[0]);
  const [cinemaLocation, setCinemaLocation] = useState("");
  const [personalRating, setPersonalRating] = useState(3);
  const [personalNotes, setPersonalNotes] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim())
      return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await searchFilmsAction(query);
      if (result.error) {
        setError(result.error);
        setResults([]);
      }
      else {
        setResults(result.results);
      }
    }
    catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
      setResults([]);
    }
    finally {
      setLoading(false);
    }
  };

  const handleAddToWishlist = async (film: FilmSearchResult) => {
    setAdding(film.imdbId);
    setError(null);
    setSuccess(null);

    try {
      const result = await addFilmToWishlistAction(film.imdbId, film.title, film.year);

      if (result.success) {
        setSuccess(result.message || "Film added to wishlist");
        setResults(prev => prev.filter(f => f.imdbId !== film.imdbId));
        onSuccess?.();
      }
      else {
        setError(result.error || "Failed to add film");
      }
    }
    catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add film");
    }
    finally {
      setAdding(null);
    }
  };

  const handleMarkAsWatched = (film: FilmSearchResult) => {
    setSelectedFilm(film);
    setError(null);
    setSuccess(null);
  };

  const handleSubmitWatched = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFilm)
      return;

    setAdding(selectedFilm.imdbId);
    setError(null);
    setSuccess(null);

    try {
      const result = await addFilmAsWatchedAction(
        selectedFilm.imdbId,
        selectedFilm.title,
        selectedFilm.year,
        dateWatched,
        cinemaLocation,
        personalRating,
        personalNotes,
      );

      if (result.success) {
        setSuccess(result.message || "Film added as watched");
        setResults(prev => prev.filter(f => f.imdbId !== selectedFilm.imdbId));
        setSelectedFilm(null);
        setCinemaLocation("");
        setPersonalNotes("");
        setPersonalRating(3);
        onSuccess?.();
      }
      else {
        setError(result.error || "Failed to add film");
      }
    }
    catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add film");
    }
    finally {
      setAdding(null);
    }
  };

  const handleCancelWatched = () => {
    setSelectedFilm(null);
    setError(null);
  };

  // Show mark as watched form if a film is selected
  if (selectedFilm) {
    return (
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">
          Mark as Watched:
          {" "}
          {selectedFilm.title}
          {" "}
          (
          {selectedFilm.year}
          )
        </h3>

        <form onSubmit={handleSubmitWatched} className="space-y-4">
          <div>
            <label htmlFor="dateWatched" className="block text-sm font-medium mb-1">
              Date Watched
            </label>
            <input
              type="date"
              id="dateWatched"
              value={dateWatched}
              onChange={e => setDateWatched(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="cinemaLocation" className="block text-sm font-medium mb-1">
              Cinema Location
            </label>
            <input
              type="text"
              id="cinemaLocation"
              value={cinemaLocation}
              onChange={e => setCinemaLocation(e.target.value)}
              required
              placeholder="e.g. Eastbourne"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="personalRating" className="block text-sm font-medium mb-1">
              Rating:
              {" "}
              {personalRating}
              /5
            </label>
            <input
              type="range"
              id="personalRating"
              min="1"
              max="5"
              value={personalRating}
              onChange={e => setPersonalRating(Number(e.target.value))}
              className="w-full"
            />
            <div className="text-2xl text-center">
              {"⭐".repeat(personalRating)}
            </div>
          </div>

          <div>
            <label htmlFor="personalNotes" className="block text-sm font-medium mb-1">
              Notes (optional)
            </label>
            <textarea
              id="personalNotes"
              value={personalNotes}
              onChange={e => setPersonalNotes(e.target.value)}
              rows={3}
              placeholder="Your thoughts about the film..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={!!adding}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {adding ? "Adding..." : "Add as Watched"}
            </button>
            <button
              type="button"
              onClick={handleCancelWatched}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Add Film to Wishlist</h3>

      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search for films or enter IMDB ID (tt1234567)..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium">Select a film to add:</h4>
          {results
            .filter((film, index, array) =>
              array.findIndex(f => f.imdbId === film.imdbId) === index,
            )
            .map(film => (
              <div key={film.imdbId} className="flex items-center justify-between p-3 border rounded">
                <div className="flex gap-3">
                  {film.poster && film.poster !== "N/A" && (
                    <div className="w-12 h-16 bg-gray-200 rounded flex-shrink-0">
                      <img
                        src={film.poster}
                        alt={`${film.title} poster`}
                        className="w-full h-full object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                  <div>
                    <h5 className="font-medium">
                      {film.title}
                      {" "}
                      (
                      {film.year}
                      )
                    </h5>
                    <p className="text-sm text-gray-600">{film.type}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToWishlist(film)}
                    disabled={adding === film.imdbId}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    {adding === film.imdbId ? "Adding..." : "Add to Wishlist"}
                  </button>
                  <button
                    onClick={() => handleMarkAsWatched(film)}
                    disabled={adding === film.imdbId}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    Mark as Watched
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
