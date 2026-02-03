import Link from "next/link";

type FilmCardProps = {
  _id?: string;
  title: string;
  slug?: string;
  status: "wishlist" | "watched";
  year?: number;
  runtime?: number;
  posterUrl?: string;
  dateWatched?: string;
  dateAddedToWishlist?: string;
  cinemaLocation?: string;
  personalRating?: number;
  isSecretScreening?: boolean;
  showMarkAsWatched?: boolean;
  onMarkAsWatched?: (filmId: string, filmTitle: string) => void;
};

export default function FilmCard({
  _id,
  title,
  slug,
  status,
  year,
  runtime,
  posterUrl,
  dateWatched,
  dateAddedToWishlist,
  cinemaLocation,
  personalRating,
  isSecretScreening,
  showMarkAsWatched,
  onMarkAsWatched,
}: FilmCardProps) {
  const statusIcon = status === "wishlist" ? "📋" : "✅";
  const secretIcon = isSecretScreening ? "🤫" : "";

  const cardContent = (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {posterUrl && (
          <div className="w-16 h-24 bg-gray-200 rounded flex-shrink-0">
            <img
              src={posterUrl}
              alt={`${title} poster`}
              className="w-full h-full object-cover rounded"
            />
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg leading-tight">{title}</h3>
            <div className="flex gap-1 text-sm">
              {secretIcon && <span title="Secret Screening">{secretIcon}</span>}
              <span title={status}>{statusIcon}</span>
            </div>
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            {year && (
              <p>
                Year:
                {year}
              </p>
            )}
            {runtime && (
              <p>
                Runtime:
                {runtime}
                min
              </p>
            )}

            {status === "watched" && (
              <>
                {dateWatched && (
                  <p>
                    Watched:
                    {new Date(dateWatched).toLocaleDateString("en-GB")}
                  </p>
                )}
                {cinemaLocation && (
                  <p>
                    Cinema:
                    {cinemaLocation}
                  </p>
                )}
                {personalRating && (
                  <p>
                    Rating:
                    {"⭐".repeat(personalRating)}
                    {" "}
                    (
                    {personalRating}
                    /5)
                  </p>
                )}
              </>
            )}

            {status === "wishlist" && dateAddedToWishlist && (
              <p>
                Added:
                {new Date(dateAddedToWishlist).toLocaleDateString("en-GB")}
              </p>
            )}
          </div>

          {/* Mark as Watched button for wishlist films when authenticated */}
          {showMarkAsWatched && status === "wishlist" && _id && (
            <div className="mt-3 pt-3 border-t">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onMarkAsWatched?.(_id, title);
                }}
                className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Mark as Watched
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // If we have a slug, wrap in Link, otherwise just return the card
  if (slug) {
    return (
      <Link href={`/films/${slug}`} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
