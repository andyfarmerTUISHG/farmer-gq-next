import type { EncodeDataAttributeCallback } from "@sanity/react-loader";
import type { Metadata } from "next";

import { createDataAttribute } from "next-sanity";
import { draftMode } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { ChapterDetail } from "@/types";

import { studioUrl } from "@/sanity/lib/api";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { allChapterSlugsQuery, chapterBySlugQuery } from "@/sanity/lib/queries";

import { CustomPortableText } from "../../../../components/global/custom-portable-text";
import QuoteCard from "../../../../components/quote-card";

export type ChapterPageProps = {
  data: ChapterDetail | null;
  encodeDataAttribute?: EncodeDataAttributeCallback;
};

type Props = {
  params: Promise<{ slug: string; chapterSlug: string }>;
};

export async function generateStaticParams() {
  const chapters = await client.fetch<Array<{ slug: string; bookSlug: string }>>(
    allChapterSlugsQuery,
  );

  return (chapters || []).map(chapter => ({
    slug: chapter.bookSlug,
    chapterSlug: chapter.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { chapterSlug } = await params;
  const { data: chapter } = await sanityFetch({
    query: chapterBySlugQuery,
    params: { slug: chapterSlug },
    stega: false,
  });

  if (!chapter) {
    return {
      title: "Chapter Not Found",
    };
  }

  const metaTitle = `Chapter ${chapter.chapterNumber}: ${chapter.title} - ${chapter.parentBook.title}`;
  const metaDescription
    = chapter.summary && chapter.summary.length > 0
      ? chapter.summary[0]?.children?.[0]?.text?.substring(0, 160)
      : `Read chapter ${chapter.chapterNumber} summary from ${chapter.parentBook.title} by ${chapter.parentBook.author}`;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: metaTitle,
      description: metaDescription,
    },
  };
}

export default async function ChapterPage({ params }: Props) {
  const { chapterSlug } = await params;
  const isDraftMode = (await draftMode()).isEnabled;

  const { data: chapter } = await sanityFetch({
    query: chapterBySlugQuery,
    params: { slug: chapterSlug },
    stega: isDraftMode,
  });

  if (!chapter?._id && !isDraftMode) {
    notFound();
  }

  const dataAttribute
    = chapter._id && chapter._type
      ? createDataAttribute({
          baseUrl: studioUrl,
          id: chapter._id,
          type: chapter._type,
        })
      : null;

  return (
    <div className="bg-white">
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6 text-sm text-gray-600" aria-label="Breadcrumb">
          {/* TODO: This tailwind styling is a bit odd - need to fix this properly */}
          <ol className="flex items-center gap-2" style={{ listStyle: "none" }}>
            <li>
              <Link
                href="/books"
                className="hover:text-purple-600 transition-colors"
              >
                Books
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href={`/books/${chapter.parentBook.slug}`}
                className="hover:text-purple-600 transition-colors"
              >
                {chapter.parentBook.title}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">
              Chapter
              {" "}
              {chapter.chapterNumber}
            </li>
          </ol>
        </nav>

        {/* Chapter Header */}
        <div className="mb-8">
          <div
            className="mb-2 text-sm font-medium text-purple-600"
            data-sanity={dataAttribute?.("chapterNumber")}
          >
            Chapter
            {" "}
            {chapter.chapterNumber}
          </div>
          <h1
            className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl"
            data-sanity={dataAttribute?.("title")}
          >
            {chapter.title}
          </h1>
          <p className="text-lg text-gray-600">
            From
            {" "}
            <Link
              href={`/books/${chapter.parentBook.slug}`}
              className="font-medium text-purple-600 hover:text-purple-700 transition-colors"
            >
              {chapter.parentBook.title}
            </Link>
            {" "}
            by
            {" "}
            {chapter.parentBook.author}
          </p>
        </div>

        {/* Chapter Summary */}
        {chapter.summary && chapter.summary.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Summary</h2>
            <div
              className="prose prose-lg max-w-none"
              data-sanity={dataAttribute?.("summary")}
            >
              <CustomPortableText
                id={chapter._id}
                type={chapter._type}
                path={["summary"]}
                value={chapter.summary}
              />
            </div>
          </section>
        )}

        {/* Chapter Quotes */}
        {chapter.quotes && chapter.quotes.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Quotes & Highlights
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {chapter.quotes.map(quote => (
                <QuoteCard key={quote._id} quote={quote} />
              ))}
            </div>
          </section>
        )}

        {/* Back to Book Link */}
        <div className="mt-12 border-t border-gray-200 pt-6">
          <Link
            href={`/books/${chapter.parentBook.slug}`}
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors font-medium"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to
            {" "}
            {chapter.parentBook.title}
          </Link>
        </div>
      </main>
    </div>
  );
}
