import Image from "next/image";
import Link from "next/link";

import type { BookListItem } from "@/types";

import { urlForImage } from "@/sanity/lib/utils";

import RatingStars from "./rating-stars";

type BookCardProps = {
  book: BookListItem;
};

export default function BookCard({ book }: BookCardProps) {
  const coverImageUrl = book.coverImage
    ? urlForImage(book.coverImage as any)?.width(300).height(450).url()
    : null;

  return (
    <Link
      href={`/books/${book.slug}`}
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-gray-100">
        {coverImageUrl
          ? (
              <Image
                src={coverImageUrl}
                alt={`Cover of ${book.title}`}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            )
          : (
              <div className="flex h-full items-center justify-center bg-gray-200 text-gray-400">
                <span className="text-sm">No cover</span>
              </div>
            )}
      </div>
      <div className="p-4">
        <h3 className="mb-1 line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-purple-600">
          {book.title}
        </h3>
        <p className="mb-2 text-sm text-gray-600">
          by
          {" "}
          {book.author}
        </p>
        <RatingStars rating={book.rating || 0} className="mb-2" />
        {book.tags && book.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {book.tags.map(tag => (
              <span
                key={tag._id}
                className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
