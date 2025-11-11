import type { EncodeDataAttributeCallback } from "@sanity/react-loader";
import type { Metadata } from "next";

import { createDataAttribute } from "next-sanity";
import { draftMode } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { BookDetail } from "@/types";

import { studioUrl } from "@/sanity/lib/api";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { allBookSlugsQuery, bookBySlugQuery } from "@/sanity/lib/queries";
import { urlForImage } from "@/sanity/lib/utils";

import BookCard from "../../components/book-card";
import { CustomPortableText } from "../../components/global/custom-portable-text";
import QuoteCard from "../../components/quote-card";
import RatingStars from "../../components/rating-stars";

export type BookPageProps = {
  data: BookDetail | null;
  encodeDataAttribute?: EncodeDataAttributeCallback;
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(allBookSlugsQuery);

  return (slugs || []).map(slug => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: book } = await sanityFetch({
    query: bookBySlugQuery,
    params: { slug },
    stega: false,
  });

  if (!book) {
    return {
      title: "Book Not Found",
    };
  }

  const metaTitle = book.metaTitle || book.title;
  const metaDescription
    = book.metaDescription
      || (book.summary && book.summary.length > 0
        ? book.summary[0]?.children?.[0]?.text?.substring(0, 160)
        : `Read summary and insights from ${book.title} by ${book.author}`);

  const ogImageUrl = book.ogImage
    ? urlForImage(book.ogImage as any)?.width(1200).height(630).url()
    : book.coverImage
      ? urlForImage(book.coverImage as any)?.width(1200).height(630).url()
      : null;

  const coverImageUrl = book.coverImage
    ? urlForImage(book.coverImage as any)?.width(400).height(600).url()
    : null;

  // Schema.org structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": book.title,
    "author": {
      "@type": "Person",
      "name": book.author,
    },
    ...(book.rating && {
      aggregateRating: {
        "@type": "AggregateRating",
        "ratingValue": book.rating,
        "bestRating": 5,
        "worstRating": 1,
      },
    }),
    ...(coverImageUrl && { image: coverImageUrl }),
    ...(book.bookWebsite && { url: book.bookWebsite }),
  };

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: book.focusKeyword ? [book.focusKeyword] : undefined,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "book",
      images: ogImageUrl ? [{ url: ogImageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: ogImageUrl ? [ogImageUrl] : undefined,
    },
    other: {
      "script:ld+json": JSON.stringify(jsonLd),
    },
  };
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  const isDraftMode = (await draftMode()).isEnabled;

  const { data: book } = await sanityFetch({
    query: bookBySlugQuery,
    params: { slug },
    stega: isDraftMode,
  });

  if (!book?._id && !isDraftMode) {
    notFound();
  }

  const coverImageUrl = book?.coverImage
    ? urlForImage(book.coverImage as any)?.width(400).height(600).url()
    : null;

  const dataAttribute
    = book?._id && book._type
      ? createDataAttribute({
          baseUrl: studioUrl,
          id: book._id,
          type: book._type,
        })
      : null;

  return (
    <div className="bg-white">
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Book Header */}
        <div className="mb-8 grid gap-8 md:grid-cols-[300px_1fr] lg:grid-cols-[400px_1fr]">
          {/* Cover Image */}
          <div className="mx-auto w-full max-w-[300px] md:mx-0 md:max-w-none">
            {coverImageUrl
              ? (
                  <div
                    className="relative aspect-[2/3] w-full overflow-hidden rounded-lg shadow-lg"
                    data-sanity={dataAttribute?.("coverImage")}
                  >
                    <Image
                      src={coverImageUrl}
                      alt={`Cover of ${book.title}`}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 300px, 400px"
                    />
                  </div>
                )
              : (
                  <div className="flex aspect-[2/3] w-full items-center justify-center rounded-lg bg-gray-200 text-gray-400">
                    <span>No cover image</span>
                  </div>
                )}
          </div>

          {/* Book Metadata */}
          <div>
            <h1
              className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl"
              data-sanity={dataAttribute?.("title")}
            >
              {book?.title}
            </h1>
            <p
              className="mb-4 text-xl text-gray-600"
              data-sanity={dataAttribute?.("author")}
            >
              by
              {" "}
              {book?.author}
            </p>

            <div className="mb-4" data-sanity={dataAttribute?.("rating")}>
              <RatingStars rating={book?.rating || 0} />
            </div>

            {book?.dateRead && (
              <p
                className="mb-4 text-sm text-gray-500"
                data-sanity={dataAttribute?.("dateRead")}
              >
                Read on:
                {" "}
                {new Date(book.dateRead).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}

            {book?.tags && book.tags.length > 0 && (
              <div
                className="mb-6 flex flex-wrap gap-2"
                data-sanity={dataAttribute?.("tags")}
              >
                {book.tags.map(tag => (
                  <span
                    key={tag._id}
                    className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            {book?.isAiSummary && (
              <div
                className="mb-4 rounded-md bg-blue-50 p-3 text-sm text-blue-700"
                data-sanity={dataAttribute?.("isAiSummary")}
              >
                <span className="font-semibold">Note:</span>
                {" "}
                This summary was generated with AI assistance.
              </div>
            )}

            {/* Links */}
            <div className="flex flex-wrap gap-3">
              {book?.amazonAffiliateLink && (
                <a
                  href={book.amazonAffiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600"
                  data-sanity={dataAttribute?.("amazonAffiliateLink")}
                >
                  Buy on Amazon
                </a>
              )}
              {book?.bookWebsite && (
                <a
                  href={book.bookWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  data-sanity={dataAttribute?.("bookWebsite")}
                >
                  Official Website
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Summary Section */}
        {book?.summary && book.summary.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Summary</h2>
            <div
              className="prose prose-lg max-w-none"
              data-sanity={dataAttribute?.("summary")}
            >
              <CustomPortableText
                id={book._id}
                type={book._type}
                path={["summary"]}
                value={book.summary}
              />
            </div>
          </section>
        )}

        {/* Key Takeaways Section */}
        {book?.keyTakeaways && book.keyTakeaways.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Key Takeaways
            </h2>
            <div
              className="prose prose-lg max-w-none rounded-lg bg-purple-50 p-6"
              data-sanity={dataAttribute?.("keyTakeaways")}
            >
              <CustomPortableText
                id={book._id}
                type={book._type}
                path={["keyTakeaways"]}
                value={book.keyTakeaways}
              />
            </div>
          </section>
        )}

        {/* Personal Notes Section (Draft Mode Only) */}
        {isDraftMode && book?.personalNotes && (
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Personal Notes
              {" "}
              <span className="text-sm font-normal text-gray-500">
                (Visible only in draft mode)
              </span>
            </h2>
            <div
              className="rounded-lg border-2 border-yellow-300 bg-yellow-50 p-6"
              data-sanity={dataAttribute?.("personalNotes")}
            >
              <p className="whitespace-pre-wrap text-gray-800">
                {book.personalNotes}
              </p>
            </div>
          </section>
        )}

        {/* Quotes Section */}
        {book?.quotes && book.quotes.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Quotes & Highlights
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {book.quotes.map(quote => (
                <QuoteCard key={quote._id} quote={quote} />
              ))}
            </div>
          </section>
        )}

        {/* Chapters Section */}
        {book?.chapters && book.chapters.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Chapters</h2>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {book.chapters.map(chapter => (
                <Link
                  key={chapter._id}
                  href={`/books/${book.slug}/chapters/${chapter.slug}`}
                  className="group rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-purple-300 hover:shadow-md"
                >
                  <div className="mb-1 text-sm font-medium text-purple-600">
                    Chapter
                    {" "}
                    {chapter.chapterNumber}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600">
                    {chapter.title}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Books Section */}
        {book?.relatedBooks && book.relatedBooks.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Related Books
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {book.relatedBooks.map(relatedBook => (
                <BookCard key={relatedBook._id} book={relatedBook} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
