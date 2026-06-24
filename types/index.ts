// types/index.ts
import type { AllBooksQueryResult, Article, Book, BookReference, Chapter, ChapterReference, Profile, Quote, Settings, Sitelinks, Tags } from "../sanity/lib/sanity.types";

// BookListItem matches the shape returned by allBooksQuery / paginatedBooksQuery
export type BookListItem = AllBooksQueryResult[number] & { _type?: string; _rev?: string };

export type BookDetail = Book & {
  relatedBooks?: BookListItem[];
  chapters?: Array<Pick<Chapter, "_id" | "chapterNumber" | "title"> & { slug?: string | null }>;
  quotes?: Array<Pick<Quote, "_id" | "quoteText" | "context">>;
  tags?: Array<{ _id: string; name: string | null }> | null;
};

export type ChapterDetail = Chapter & {
  parentBook: BookReference & Pick<Book, "_id" | "title" | "author"> & { slug?: string | null };
  quotes?: Array<Pick<Quote, "_id" | "quoteText" | "context">>;
};

export type QuoteWithContext = Quote & {
  parentBook: BookReference & Pick<Book, "_id" | "title">;
  parentChapter?: ChapterReference & Pick<Chapter, "_id" | "title">;
};

// Re-export Sanity types for convenience
export type { Article, Book, Chapter, Profile, Quote, Settings, Sitelinks, Tags };
