"use client";

import Link from "next/link";
import { useState } from "react";

import AddFilmForm from "@/app/(site)/components/add-film-form";
import LastFilmWatched from "@/app/(site)/components/last-film-watched-client";
import WatchedContent from "@/app/(site)/components/watched-content";
import WishlistContent from "@/app/(site)/components/wishlist-content";

type TabType = "watched" | "wishlist";

type FilmsPageClientProps = {
  recentFilms: any[];
  wishlistFilms: any[];
  allWatchedFilms: any[];
  isDraftMode: boolean;
};

export default function FilmsPageClient({
  wishlistFilms,
  allWatchedFilms,
  isDraftMode,
}: FilmsPageClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>("watched");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Films</h1>
          <div className="flex gap-4">
            <Link
              href="/films/wrapped"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Wrapped
            </Link>
          </div>
        </div>
        <p className="text-gray-600">
          Films watched with Cineworld Unlimited pass
        </p>
      </div>

      {/* Last Film Watched - Prominent display */}
      <div className="mb-8">
        <LastFilmWatched />
      </div>

      {/* Add to Wishlist Form - Only when authenticated */}
      {isDraftMode && (
        <div className="mb-8">
          <AddFilmForm />
        </div>
      )}

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {isDraftMode && (
              <button
                onClick={() => setActiveTab("watched")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "watched"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                All Watched (
                {allWatchedFilms?.length || 0}
                )
              </button>
            )}

            {isDraftMode && (
              <button
                onClick={() => setActiveTab("wishlist")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "wishlist"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Wishlist (
                {wishlistFilms?.length || 0}
                )
              </button>
            )}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "watched" && isDraftMode && (
        <WatchedContent films={allWatchedFilms} isDraftMode={isDraftMode} />
      )}

      {activeTab === "wishlist" && isDraftMode && (
        <WishlistContent films={wishlistFilms} isDraftMode={isDraftMode} />
      )}
    </div>
  );
}
