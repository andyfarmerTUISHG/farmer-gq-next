"use client";

import { useState } from "react";

import type { FilmSearchResult } from "@/lib/film-api/types";

import { addFilmToWishlistAction, searchFilmsAction } from "@/app/(site)/actions/film-actions";

type AddFilmFormProps = {
  onSuccess?: () => void;
};

export default function AddFilmForm({ onSuccess }: AddFilmFormProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FilmSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState<string | null>(null); // Track which film is being added
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
        // Remove the added film from results
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
                <button
                  onClick={() => handleAddToWishlist(film)}
                  disabled={adding === film.imdbId}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {adding === film.imdbId ? "Adding..." : "Add to Wishlist"}
                </button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
