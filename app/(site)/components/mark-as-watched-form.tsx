"use client";

import { useEffect, useState } from "react";

import { markFilmAsWatchedAction } from "@/app/(site)/actions/film-actions";

type MarkAsWatchedFormProps = {
  filmId: string;
  filmTitle: string;
  currentWishlistDate?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
};

export default function MarkAsWatchedForm({
  filmId,
  filmTitle,
  currentWishlistDate,
  onSuccess,
  onCancel,
}: MarkAsWatchedFormProps) {
  const [dateWatched, setDateWatched] = useState(
    new Date().toISOString().split("T")[0], // Auto-populate with today's date
  );
  const [dateAddedToWishlist, setDateAddedToWishlist] = useState(
    currentWishlistDate || new Date().toISOString().split("T")[0],
  );
  const [cinemaLocation, setCinemaLocation] = useState("");
  const [personalRating, setPersonalRating] = useState<number>(3);
  const [personalNotes, setPersonalNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch default cinema on component mount
  useEffect(() => {
    const fetchDefaultCinema = async () => {
      try {
        const response = await fetch("/api/settings");
        const data = await response.json();
        if (data.defaultCinema) {
          setCinemaLocation(data.defaultCinema);
        }
      }
      catch (error) {
        // Silently fail - user can still enter cinema manually
        console.error("Failed to fetch default cinema:", error);
      }
    };

    fetchDefaultCinema();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dateWatched || !cinemaLocation || !personalRating || !dateAddedToWishlist) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await markFilmAsWatchedAction(
        filmId,
        dateWatched,
        cinemaLocation,
        personalRating,
        personalNotes,
        dateAddedToWishlist,
      );

      if (result.success) {
        onSuccess?.();
      }
      else {
        setError(result.error || "Failed to mark film as watched");
      }
    }
    catch (err) {
      setError(err instanceof Error ? err.message : "Failed to mark film as watched");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">
        Mark "
        {filmTitle}
        " as Watched
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="dateAddedToWishlist" className="block text-sm font-medium text-gray-700 mb-1">
            Date Added to Wishlist *
          </label>
          <input
            type="date"
            id="dateAddedToWishlist"
            value={dateAddedToWishlist}
            onChange={e => setDateAddedToWishlist(e.target.value)}
            max={dateWatched} // Can't be after watched date
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="dateWatched" className="block text-sm font-medium text-gray-700 mb-1">
            Date Watched *
          </label>
          <input
            type="date"
            id="dateWatched"
            value={dateWatched}
            onChange={e => setDateWatched(e.target.value)}
            max={new Date().toISOString().split("T")[0]} // Can't be in the future
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="cinemaLocation" className="block text-sm font-medium text-gray-700 mb-1">
            Cinema Location *
          </label>
          <input
            type="text"
            id="cinemaLocation"
            value={cinemaLocation}
            onChange={e => setCinemaLocation(e.target.value)}
            placeholder="e.g., Cineworld Birmingham Broad Street"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="personalRating" className="block text-sm font-medium text-gray-700 mb-1">
            Personal Rating * (
            {personalRating}
            /5)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              id="personalRating"
              min="1"
              max="5"
              value={personalRating}
              onChange={e => setPersonalRating(Number.parseInt(e.target.value))}
              className="flex-1"
            />
            <span className="text-lg">{"⭐".repeat(personalRating)}</span>
          </div>
        </div>

        <div>
          <label htmlFor="personalNotes" className="block text-sm font-medium text-gray-700 mb-1">
            Personal Notes (optional)
          </label>
          <textarea
            id="personalNotes"
            value={personalNotes}
            onChange={e => setPersonalNotes(e.target.value)}
            placeholder="Your thoughts about the film..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Mark as Watched"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
