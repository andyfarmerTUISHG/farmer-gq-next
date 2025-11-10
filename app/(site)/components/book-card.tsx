import Image from "next/image";
import Link from "next/link";

import type { BookListItem } from "@/types";

import { urlForImage } from "@/sanity/lib/utils";

import RatingStars from "./rating-stars";

type BookCardProps = {
  book: BookListItem;
  className?: string;
};

export default function BookCard({ book, className = "" }: BookCardProps) {
  const imageUrl = book.coverImage
    ? urlForImage(book.coverImage as any)?.width(400).height(600).url()
    : null;

  return (
    <Link
      href={`/books/${book.slug?.current || book.slug}`}
      className={`group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${className}`}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-100">
        {imageUrl
          ? (
              <Image
                src={imageUrl}
                alt={book.coverImage?.alt || `Cover of ${book.title}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            )
          : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <svg
                  className="h-16 w-16 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            )}
      </div>

      <div className="p-4">
        <h3 className="font-header text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {book.title}
        </h3>

        <p className="font-body mt-1 text-sm text-gray-600">
          by
          {" "}
          {book.author}
        </p>

        {book.rating && (
          <div className="mt-3">
            <RatingStars rating={book.rating} />
          </div>
        )}

        {book.tags && book.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {book.tags.slice(0, 3).map(tag => (
              <span
                key={tag._id}
                className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
              >
                {tag.name}
              </span>
            ))}
            {book.tags.length > 3 && (
              <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                +
                {book.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {book.dateRead && (
          <p className="font-body mt-3 text-xs text-gray-500">
            Read:
            {" "}
            {new Date(book.dateRead).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            })}
          </p>
        )}
      </div>
    </Link>
  );
}
