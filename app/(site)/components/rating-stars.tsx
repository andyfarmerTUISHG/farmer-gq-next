"use client";

import { useId } from "react";

type RatingStarsProps = {
  rating: number;
  maxRating?: number;
  className?: string;
};

export default function RatingStars({
  rating,
  maxRating = 5,
  className = "",
}: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  const starId = useId();

  return (
    <div className={`flex items-center gap-1 ${className}`} aria-label={`Rating: ${rating} out of ${maxRating} stars`}>
      {Array.from({ length: fullStars }, (_, i) => (
        <svg
          key={`full-${starId}-${i}`}
          className="h-5 w-5 fill-yellow-400 text-yellow-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg
          key={`half-${starId}`}
          className="h-5 w-5 text-yellow-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <defs>
            <linearGradient id={`half-star-${starId}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#half-star-${starId})`}
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          />
        </svg>
      )}
      {Array.from({ length: emptyStars }, (_, i) => (
        <svg
          key={`empty-${starId}-${i}`}
          className="h-5 w-5 text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
      <span className="ml-1 text-sm text-gray-600">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}
