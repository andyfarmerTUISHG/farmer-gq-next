"use client";

import { useState } from "react";

import type { FilmSearchResult } from "@/lib/film-api/types";

import { searchFilmsAction } from "@/app/(site)/actions/film-actions";

export default function FilmSearchTest() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FilmSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim())
      return;

    setLoading(true);
    setError(null);

    try {
      const result = await searchFilmsAction(query);
      setDebugInfo(result); // Store full response for debugging
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

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Film Search Test</h2>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search for films..."
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

      {/* Debug info */}
      {debugInfo && (
        <details className="mb-4">
          <summary className="cursor-pointer text-sm text-gray-600">
            Debug: Raw API Response
          </summary>
          <pre className="mt-2 p-3 bg-gray-100 text-xs overflow-auto rounded">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </details>
      )}

      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Results (
            {results.length}
            )
          </h3>
          {results
            .filter((film, index, array) =>
              array.findIndex(f => f.imdbId === film.imdbId) === index,
            )
            .map(film => (
              <div key={film.imdbId} className="border rounded-lg p-4">
                <div className="flex gap-4">
                  {film.poster && film.poster !== "N/A" && (
                    <div className="w-16 h-24 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
                      <img
                        src={film.poster}
                        alt={`${film.title} poster`}
                        className="w-full h-full object-cover rounded"
                        onLoad={() => console.warn(`Image loaded: ${film.title}`)}
                        onError={(e) => {
                          console.warn(`Image failed to load (404): ${film.title}`, film.poster);
                          const target = e.currentTarget;
                          target.style.display = "none";
                          // Show fallback text
                          const fallback = document.createElement("div");
                          fallback.className = "text-xs text-gray-500 text-center p-1";
                          fallback.textContent = "No Image";
                          target.parentElement?.appendChild(fallback);
                        }}
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold">
                      {film.title}
                      {" "}
                      (
                      {film.year}
                      )
                    </h4>
                    <p className="text-sm text-gray-600">
                      IMDB ID:
                      {film.imdbId}
                    </p>
                    <p className="text-sm text-gray-600">
                      Type:
                      {film.type}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
